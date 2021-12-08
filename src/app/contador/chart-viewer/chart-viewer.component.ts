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

  outcomesAmounts: Array<any> = [];
  amountOutcome = 0;

  incomesAmounts: Array<any> = [];
  amountIncome = 0;

  budget = this.amountIncome - this.amountOutcome;

  today = new Date();
  month = new Date().getMonth();
  monthsData = this.getMonths();

  startingFromThisMonth = this.month;
  labels: Array<any> = [this.getMonth(this.startingFromThisMonth)];
  chart: any = undefined;
  constructor(private elementRef: ElementRef) {
  }

  getGraphContainer(domElement: string) {
    let htmlRef = this.elementRef.nativeElement.querySelector(domElement);
    return htmlRef;
  }
  setGraph(graphContainer: any, config: any) {
    return new Chart(
      graphContainer,
      config
    );
  }
  async setView(indexMonth: number) {
    this.outcomesAmounts = []
    this.incomesAmounts = []
    this.startingFromThisMonth = this.month - indexMonth + 1
    await this.setLabelsToLastXMonths(this.startingFromThisMonth)
    let options = {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      layout: {
        padding: 10
      }
    }
    let config = {
      type: 'bar' as ChartType,
      data: await this.setDataForChart(this.labels),
      options: options
    };

    this.chart.destroy()
    this.chart = this.setGraph(this.getGraphContainer("#myChart"), config);

  }
  ngOnInit() {
    (async () => {

      this.outcomesAmounts = []
      this.incomesAmounts = []
      this.chart = this.getGraphContainer('#myChart');

      await this.setLabelsToLastXMonths(1);
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
        data: await this.setDataForChart(this.labels),
        options: options
      };
      this.chart = this.setGraph(this.chart, config);

    })()
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
  private async setDataForChart(labels: any = [this.getMonth(this.today.getMonth())]) {
    if (labels == null || labels.length == 0) return;

    this.startingFromThisMonth = this.today.getMonth() + 1 - labels.length;

    await this.setOutcomesFromThisMonth(this.startingFromThisMonth);
    await this.setIncomesFromThisMonth(this.startingFromThisMonth);

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
  private async setOutcomesFromThisMonth(indexMonth: number) {
    if (!this.validateParameter(indexMonth)) return
    if (indexMonth > this.today.getMonth()) return

    const db = getFirestore();
    const outcomesRef = collection(db, 'outcomes');
    const q = query(outcomesRef,
      where('status', '==', 1),
      where('monthYear', '>=', this.getMonthYearId(indexMonth)),
      where('monthYear', '<=', this.getMonthYearId(this.today.getMonth())),
      orderBy('monthYear', 'asc'),
      orderBy('date_outcome', 'asc'));
    try {
      this.amountOutcome = 0;
      // inicializar con la cantidad de meses correcta
      for (let indexStart = indexMonth; indexStart <= this.today.getMonth(); indexStart++) this.outcomesAmounts.push(0)

      const querySnapshot = await getDocs(q);
      let indexLabel = 0;
      let startingID = this.getMonthYearId(indexMonth)
      let monthYearId: number;

      querySnapshot.forEach((outcomeRef: any) => {
        let outcome = outcomeRef.data();

        monthYearId = outcome.monthYear;
        indexLabel = monthYearId - startingID

        this.outcomesAmounts[indexLabel] += outcome.amount

        monthYearId = outcome.monthYear;
        this.amountOutcome += Number(outcome.amount)
      });
    } catch (e) {
      console.log("Error querying: ", e);
    }
    // Dinero disponible
    this.budget = Number(this.amountIncome) - Number(this.amountOutcome)
  }
  private async setIncomesFromThisMonth(indexMonth: number) {
    if (!this.validateParameter(indexMonth)) return
    if (indexMonth > this.today.getMonth()) return

    const db = getFirestore();
    const incomesRef = collection(db, 'incomes');
    const q = query(incomesRef,
      where('monthYear', '>=', this.getMonthYearId(indexMonth)),
      where('monthYear', '<=', this.getMonthYearId(this.today.getMonth())),
      orderBy('monthYear', 'asc'),
      orderBy('date_income', 'asc'));

    try {
      this.amountIncome = 0;
      // inicializar con la cantidad de meses correcta
      for (let indexStart = indexMonth; indexStart <= this.today.getMonth(); indexStart++) this.incomesAmounts.push(0)
      const querySnapshot = await getDocs(q);
      let indexLabel: number = 0;
      let startingID = this.getMonthYearId(indexMonth)
      let monthYearId: number;

      querySnapshot.forEach((incomeRef: any) => {
        let income = incomeRef.data();

        monthYearId = income.monthYear;
        indexLabel = monthYearId - startingID

        this.incomesAmounts[indexLabel] += income.amount

        monthYearId = income.monthYear;
        this.amountIncome += Number(income.amount)
      });
    } catch (e) {
      console.log("Error querying: ", e);
    }
    // Dinero disponible
    this.budget = Number(this.amountIncome) - Number(this.amountOutcome)
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
  public getMonths() {
    let months = [];
    for (let i = 0; i <= this.month; i++) {
      months.push(this.getMonth(i))
    }
    // debugger
    return months;
  }
}
