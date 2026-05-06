import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  systolic:  number = 0;
  diastolic: number = 0;
  pulse: number = 0;

  clearForm() {
    this.systolic = 0;
    this.diastolic = 0;
    this.pulse = 0;
    this.status = '';
  }

  status: string = '';
  checkBloodPressure() {
    if (this.systolic < 120 && this.diastolic < 80) {
      this.status = 'Normal';
    } else if (this.systolic < 130 && this.diastolic < 80) {
      this.status = 'Elevated';
    } else {
      this.status = 'High';
    }

     // 👉 Save the reading
    this.readings.unshift({
      systolic: this.systolic,
      diastolic: this.diastolic,
      pulse: this.pulse,
      status: this.status,
      date: new Date()
    });
    localStorage.setItem('bpReadings', JSON.stringify(this.readings));

  }
  getStatusClass() {
      if (this.status === 'Normal') return 'normal';
      if (this.status === 'Elevated') return 'elevated';
      if (this.status === 'High') return 'high';
      return '';
    }
    readings: any[] = [];
    ngOnInit(){
      const saved = localStorage.getItem('bpReadings');

      if (saved) {
        this.readings = JSON.parse(saved).map((r: any) =>({
          ...r,
          date: new Date(r.date)
        }));
      }
    }
    clearHistory(){
      this.readings = [];
      localStorage.removeItem('bpReadings');
    }
    deleteReading(index: number){
      this.readings.splice(index, 1);
      localStorage.setItem('bpReadings', JSON.stringify(this.readings));
    }
    getAverageSystolic(){
      if(this.readings.length === 0) return 0;
      const total = this.readings.reduce((sum, reading) =>{
        return sum + reading.systolic;
      }, 0);

      return Math.round(total / this.readings.length);
    }
    getAverageDiastolic(){
      if(this.readings.length === 0) return 0;
      const total = this.readings.reduce((sum, reading) =>{
        return sum + reading.diastolic;
      }, 0);

      return Math.round(total / this.readings.length);
    }
}

