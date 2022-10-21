import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { Class } from "../../class.model";
import { ClassService } from './class.service';

@Component({
  selector: 'app-classmanagement',
  templateUrl: './classmanagement.component.html',
  styleUrls: ['./classmanagement.component.css']
})
export class ClassmanagementComponent implements OnInit {
  isLoading = false;
  class: Class;
  classes: Class[] = [];
  form: FormGroup;
  totalClasses = 0;
  private mode = "create";
  private classId: string;
  private classesSub: Subscription;


  constructor(public classesService: ClassService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.classesService.getClasses();
    this.classesSub = this.classesService
      .getClassUpdateListener()
      .subscribe((classData: { classes: Class[]; classCount: number }) => {
        this.isLoading = false;
        this.totalClasses = classData.classCount;
        this.classes = classData.classes;
        this.isLoading = false;
      });
  }





}
