import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-realtimetest',
  templateUrl: './realtimetest.component.html',
  styleUrls: ['./realtimetest.component.css']
})
export class RealtimetestComponent implements OnInit {
  idDataGame: any;
  p1: any;
  p2: any;
  container: any;
  minMax = [0, 90];
  speed: number = 9;

  p1X: any;
  p1Y: any;
  p2X: any;
  p2Y: any;

  handleKeyBind: (event: KeyboardEvent) => void;
  store: AngularFirestore;
  playersPositions: any;

  constructor(store: AngularFirestore, private storage: AngularFireStorage) {
    this.store = store;
    this.playersPositions = this.store.collection('realtimetest').valueChanges({
      idField: 'id',
    });
    this.playersPositions.forEach((playerPosition: any) => {
      this.p1X = playerPosition[0].p1X
      this.p1Y = playerPosition[0].p1Y
      this.p2X = playerPosition[0].p2X
      this.p2Y = playerPosition[0].p2Y
      this.idDataGame = playerPosition[0].id;
    });
    this.handleKeyBind = this.handleKey.bind(this);
    document.addEventListener('keydown', this.handleKeyBind, false);
  }
  
  ngOnInit(): void {

  }

  ngAfterViewInit(){
    this.p1 = (document.getElementById('p1'));
      this.p1.style.top = this.p1Y +'%';
      this.p1.style.left = this.p1X + '%';
    this.p2 = document.getElementById('p2');
      this.p2.style.top = this.p2Y + '%';
      this.p2.style.left = this.p2X +'%';
    this.container = document.getElementById('container');
  }

  private handleKey(event: KeyboardEvent) {
    event.preventDefault();
    switch (event.keyCode) {
      // Player 1
      case 37: //left
        this.p1Left();
        break; 
      case 38: //up
        this.p1Up();
        break;
      case 39: //right
        this.p1Right();
        break;
      case 40: //down
        this.p1Down();
        break;
      
      // Player 2
      case 65: //A (left)
        this.p2Left();
        break;
      case 87: //W (up)
        this.p2Up();
        break;
      case 68: //D (right)
        this.p2Right();
        break;
      case 83: //S (down)
        this.p2Down();
        break;
    }
  }
  
  //Player 1
  p1Up(){
    if(this.p1Y > this.minMax[0]){      
      const updatedDoc = this.store.collection('realtimetest');
      updatedDoc.doc(this.idDataGame).update({p1Y: Number(this.p1Y) - this.speed}).then(()=>{
        
        this.p1.style.top = this.p1Y + '%';
      });
    }
  }  
  p1Down(){
    if(this.p1Y < this.minMax[1]){      
      const updatedDoc = this.store.collection('realtimetest');
      updatedDoc.doc(this.idDataGame).update({p1Y: Number(this.p1Y) + this.speed}).then(()=>{
        
        this.p1.style.top = this.p1Y + '%';
      });
    }
  }  
  p1Left(){
    if(this.p1X > this.minMax[0]){      
      const updatedDoc = this.store.collection('realtimetest');
      updatedDoc.doc(this.idDataGame).update({p1X: Number(this.p1X) - this.speed}).then(()=>{
        
        this.p1.style.left = this.p1X + '%';
      });
    }
  }  
  p1Right(){
    if(this.p1X < this.minMax[1]){      
      const updatedDoc = this.store.collection('realtimetest');
      updatedDoc.doc(this.idDataGame).update({p1X: Number(this.p1X) + this.speed}).then(()=>{
        
        this.p1.style.left = this.p1X + '%';
      });
    }
  }  

  //Player 2
  p2Up(){
    if(this.p2Y > this.minMax[0]){      
      const updatedDoc = this.store.collection('realtimetest');
      updatedDoc.doc(this.idDataGame).update({p2Y: Number(this.p2Y) - this.speed}).then(()=>{
        this.p2.style.top = this.p2Y + '%';
      });
    }
  }  
  p2Down(){
    if(this.p2Y < this.minMax[1]){      
        const updatedDoc = this.store.collection('realtimetest');
      updatedDoc.doc(this.idDataGame).update({p2Y: Number(this.p2Y) + this.speed}).then(()=>{
        
        this.p2.style.top = this.p2Y + '%';
      });
    }
  }  
  p2Left(){
    if(this.p2X > this.minMax[0]){      
        const updatedDoc = this.store.collection('realtimetest');
      updatedDoc.doc(this.idDataGame).update({p2X: Number(this.p2X) - this.speed}).then(()=>{
        
        this.p2.style.left = this.p2X + '%';
      });
    }
  }  
  p2Right(){
    if(this.p2X < this.minMax[1]){      
        const updatedDoc = this.store.collection('realtimetest');
      updatedDoc.doc(this.idDataGame).update({p2X: Number(this.p2X) + this.speed}).then(()=>{
        
        this.p2.style.left = this.p2X + '%';
      });
    }
  }  

}
