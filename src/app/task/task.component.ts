import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  name = '';
  task = '';
  duration = '';
  status = '';

  employees:any[] = [];

  ngOnInit(){
    const savedData = localStorage.getItem('employees');
    if(savedData){
      this.employees = JSON.parse(savedData);
    }
  }

  saveData(){
    localStorage.setItem('employees', JSON.stringify(this.employees));
  }

  addEmployee(){
    if(this.name && this.task && this.duration && this.status){

      this.employees.push({
        name: this.name,
        task: this.task,
        duration: this.duration,
        status: this.status
      });

      this.name='';
      this.task='';
      this.duration='';
      this.status='';

      this.saveData();
    }
  }

  deleteEmployee(index:number){
    this.employees.splice(index,1);
    this.saveData();
  }

  toggleStatus(index:number){
    if(this.employees[index].status === "Pending"){
      this.employees[index].status = "Completed";
    } else {
      this.employees[index].status = "Pending";
    }

    this.saveData();
  }

  exportToExcel() {

  let csvData = "Name,Task,Duration,Status\n";

  this.employees.forEach((emp:any) => {
    csvData += `${emp.name},${emp.task},${emp.duration},${emp.status}\n`;
  });

  const blob = new Blob([csvData], { type: 'text/csv' });

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = "employee_tasks.csv";
  a.click();

}


}
