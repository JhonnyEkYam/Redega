import { Component, ElementRef, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Chart, { ChartType } from 'chart.js/auto';
import { Observable } from 'rxjs';
import { collection, getDocs, getFirestore, orderBy, where, limit, query } from "firebase/firestore";


@Component({
  selector: 'app-chart-viewer',
  templateUrl: './chart-viewer.component.html',
  styleUrls: ['./chart-viewer.component.css']
})
export class ChartViewerComponent implements OnInit {

  // outcomes: Observable<any[]>;
  private store: AngularFirestore;

  outcomesAmounts: Array<any> = [];
  amountOutcome = 0;

  incomesAmounts: Array<any> = [];
  amountIncome = 0;

  budget = this.amountIncome - this.amountOutcome;
  total: number = 0;

  today = new Date();
  month = new Date().getMonth();

  labels: Array<any> = ['1', '2', '3', '4'];
  data = {
    labels: this.labels,
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: '#f0f412',
        borderColor: '#414441',
        data: [0, 10, 5, 2, 2, 3, 5],
      }, {
        label: 'My Second dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 0, 20)',
        data: [3, 3, 7, 4, 9, 0, 4],
      }
    ]
  };
  options = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    layout: {
      padding: 20
    }
  }
  config = {
    type: 'bar' as ChartType,
    data: this.data,
    options: this.options
  };


  constructor(private elementRef: ElementRef, store: AngularFirestore) {
    // Conexion a Firestore
    this.store = store
    // Obtener ID AÑOFECHA 
    let monthYear = this.getMonthYearId(this.today.getMonth());
    // Dinero TOTAL disponible o 'budget'
    let collectionOutcomes: Observable<any[]> = this.store.collection('outcomes', ref => ref
      .where('status', '==', 1)
      .where('monthYear', '>=', monthYear)
      .where('monthYear', '<', Number((Number(this.getCurrentYear()) + 1) + '00'))
      .orderBy('monthYear', 'asc')
      .orderBy('date_outcome', 'asc')
    ).valueChanges();
    let collectionIncomes: Observable<any[]> = this.store.collection('incomes', ref => ref
      .where('monthYear', '>=', monthYear)
      .where('monthYear', '<', Number((Number(this.getCurrentYear()) + 1) + '00'))
      .orderBy('monthYear', 'asc')
      .orderBy('date_income', 'asc')
    ).valueChanges();
    // Suma de todos los gastos
    collectionOutcomes.forEach(res => {
      this.amountOutcome = 0;
      res.forEach((outcome) => {
        this.amountOutcome += Number(outcome.amount)
      })
      // Dinero disponible
      this.budget = this.amountIncome - this.amountOutcome
    })
    // Suma de todos los ingresos
    collectionIncomes.forEach(res => {
      this.amountIncome = 0;
      res.forEach((income) => {
        this.amountIncome += Number(income.amount)
      })
      // Dinero disponible
      this.budget = this.amountIncome - this.amountOutcome
    })
  }

  getGraphContainer() {
    let htmlRef = this.elementRef.nativeElement.querySelector(`#myChart`);
    return htmlRef;
  }

  setGraph(graphContainer: any, config: any) {
    return new Chart(
      graphContainer,
      config
    );
  }

  ngOnInit() {
    // (async () => {
      this.setLabelsToLastXMonths(1);
      this.setDataForChart(this.labels, 1)
      
      // let data = this.setDataForChart(this.labels, 1)
      console.log(this.incomesAmounts)
      console.log(this.outcomesAmounts)
    // })()
    let data = {
      labels: this.labels,
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#f0f412',
          borderColor: '#410041',
          data: [0, 10, 5, 2, 2, 3, 5],
        }, {
          label: 'My Second dataset',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 0, 20)',
          data: [3, 3, 7, 4, 9, 0, 4],
        }
      ]
    };
    let options = {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      layout: {
        padding: 20
      }
    }
    let config = {
      type: 'bar' as ChartType,
      data: data,
      options: options
    };
    // let graphingChart = this.setGraph(graphContainer, this.config);
  }


  private setLabelsToLastXMonths(lastXMonths: number = 1): any {
    this.labels = [];
    // Si se introduce un valor invalido retorna el mes actual
    if (lastXMonths == null || lastXMonths <= 0 || isNaN(lastXMonths) || lastXMonths > this.today.getMonth() + 1) { this.labels.push(this.getMonth(this.today.getMonth())); return; }
    // Si es enero solo mostrará enero
    if (this.today.getMonth() == 0) { this.labels.push(this.getMonth(0)); return; }
    // Añade un objeto con el mes y su posición en el calendario
    if (lastXMonths <= this.today.getMonth() + 1) {
      let startFromThisMonth = this.today.getMonth() + 1 - lastXMonths;
      for (let indexMonth = startFromThisMonth; indexMonth < this.today.getMonth() + 1; indexMonth++) {
        const month = this.getMonth(indexMonth);
        this.labels.push(month)
      }
      return;
    }
  }

  private setDataForChart(labels: any = [this.getMonth(this.today.getMonth())], lastXMonths: number = 1) {
    if (labels == null || labels.length == 0) return;
    if (lastXMonths == null || lastXMonths <= 0 || isNaN(lastXMonths) || lastXMonths > this.today.getMonth() + 1) return;

    let startingFromThisMonth = this.today.getMonth() + 1 - lastXMonths;
    this.setOutcomesFromThisMonth(startingFromThisMonth);
    this.setIncomesFromThisMonth(startingFromThisMonth);

    // Incomes configuration
    const legendForIncomes = 'Ingresos';
    const incomesBackgroundColor = '#2342cb';
    const incomesBorderColor = '#2342cb';
    // Outcomes configuration
    const legendForOutcomes = 'Gastos';
    const outcomesBackgroundColor = '#cb2342';
    const outcomesBorderColor = '#cb2342';

    let dataBody = {
      labels: labels as any[],
      datasets: [
        {
          label: legendForIncomes,
          backgroundColor: incomesBackgroundColor,
          borderColor: incomesBorderColor,
          data: this.incomesAmounts as number[],
        }, {
          label: legendForOutcomes,
          backgroundColor: outcomesBackgroundColor,
          borderColor: outcomesBorderColor,
          data: this.outcomesAmounts as number[],
        }
      ]
    };
    return dataBody;
  }
  private setOutcomesFromThisMonth(indexMonth: number) {
    if (!this.validateParameter(indexMonth)) return
    // const db = getFirestore();
    // const outcomesRef = collection(db, 'outcomes');
    
    // const q = query(outcomesRef, 
    //   orderBy('amount'), 
    //   limit(10), 
    //   where('status', '==', 1), 
    //   where('amount', '>', 250));
    // try {
    //   const querySnapshot = await getDocs(q);
    //   querySnapshot.forEach((outcome: any) => {
    //   });
    // } catch (e) {
    //   console.log("Error querying: ", e);
    // }

    let collectionOutcomes: Observable<any[]> = this.store.collection('outcomes', ref => ref
      .where('status', '==', 1)
      .where('monthYear', '>=', this.getMonthYearId(indexMonth))
      .where('monthYear', '<=', this.getMonthYearId(this.today.getMonth()))
      .orderBy('monthYear', 'asc')
      .orderBy('date_outcome', 'asc')
    ).valueChanges();

    collectionOutcomes.forEach(res => {
      this.amountOutcome = 0;
      let indexLabel = 0;
      let newMonthYearId;
      let previousMonthYearId = 0;
      this.outcomesAmounts = [];

      res.forEach((outcome) => {
        newMonthYearId = outcome.monthYear;
        if (this.outcomesAmounts.length == 0) {
          this.outcomesAmounts.push(outcome.amount);
        }
        if (previousMonthYearId == newMonthYearId) this.outcomesAmounts[indexLabel] += outcome.amount
        else {
          this.outcomesAmounts.push(outcome.amount);
          indexLabel++;
        }
        previousMonthYearId = outcome.monthYear;
        this.amountOutcome += Number(outcome.amount)
      })
    })
    // Dinero disponible
    this.budget = this.amountIncome - this.amountOutcome
  }
  private setIncomesFromThisMonth(indexMonth: number) {
    if (!this.validateParameter(indexMonth)) return
    let collectionIncomes: Observable<any[]> = this.store.collection('incomes', ref => ref
      .where('monthYear', '>=', this.getMonthYearId(indexMonth))
      .where('monthYear', '<=', this.getMonthYearId(this.today.getMonth()))
      .orderBy('monthYear', 'asc')
      .orderBy('date_income', 'asc')
    ).valueChanges();

    // Suma de todos los ingresos
    collectionIncomes.forEach(res => {
      this.amountIncome = 0;

      let indexLabel = 0;
      let newMonthYearId;
      let previousMonthYearId = 0;
      this.incomesAmounts = [];

      res.forEach((income) => {
        newMonthYearId = income.monthYear;
        if (this.incomesAmounts.length == 0) {
          this.incomesAmounts.push(income.amount);
        }
        if (previousMonthYearId == newMonthYearId) this.incomesAmounts[indexLabel] += income.amount
        else {
          this.incomesAmounts.push(income.amount);
          indexLabel++;
        }
        previousMonthYearId = income.monthYear;
        this.amountIncome += Number(income.amount)
      })
    })
    // Dinero disponible
    this.budget = this.amountIncome - this.amountOutcome
  }
  private validateParameter(parameter: number) {
    return parameter != null && parameter >= 0 && !isNaN(parameter);
  }
  public getMonth(monthIndex: number): string {
    let month;

    // Obtener month
    switch (monthIndex) {
      case 0:
        month = 'Enero';
        break;
      case 1:
        month = 'Febrero';
        break;
      case 2:
        month = 'Marzo';
        break;
      case 3:
        month = 'Abril';
        break;
      case 4:
        month = 'Mayo';
        break;
      case 5:
        month = 'Junio';
        break;
      case 6:
        month = 'Julio';
        break;
      case 7:
        month = 'Agosto';
        break;
      case 8:
        month = 'Septiembre';
        break;
      case 9:
        month = 'Octubre';
        break;
      case 10:
        month = 'Noviembre';
        break;
      case 11:
        month = 'Diciembre';
        break;
      default:
        month = 'Invalido';
        break;
    }

    return month;
  }
  public getCurrentYear() {
    return this.today.getFullYear();
  }
  private getMonthYearId(indexMonth: number): number {
    let monthYear = Number(
      this.today.getFullYear()
      + '' + ((Number(indexMonth) + 1) < 10 ? '0' : '') + '' +
      (Number(indexMonth) + 1)
    );
    return monthYear;
  }
}
