import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { ClassService } from "../classmanagement/class.service";
import { Class } from "../../class.model";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

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

