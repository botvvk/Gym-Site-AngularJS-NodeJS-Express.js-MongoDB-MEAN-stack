import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { ClassService } from "../classmanagement/class.service";
import { Class } from "../../class.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-classesc',
  templateUrl: './classesc.component.html',
  styleUrls: ['./classesc.component.css']
})
export class ClassescComponent implements OnInit {
  private classId: string;
  private mode = "create";
  isLoading = false;
  class: Class;
  form: FormGroup;
  constructor(public route: ActivatedRoute,public classService: ClassService) {
  }


  ngOnInit(): void {

    this.route.paramMap.subscribe(  (paramMap: ParamMap)  =>{
      if (paramMap.has('classId')){
        this.mode = "edit";
        this.classId = paramMap.get('classId');
        this.isLoading = true;
        this.classService.getClass(this.classId).subscribe( classData => {
           this.isLoading = false;
           this.class = {
                id: classData._id,
                classname: classData.classname,
                description: classData.description,
                day: classData.day,
                time: classData.time
              };
          });
      } else {
          this.mode = "create";
          this.classId = null;
        }
      });
  }

  onSaveorUpdate(form:NgForm){
    this.isLoading = true;
    if (this.mode === "create") {
      this.classService.createClass(
        form.value.classname,
        form.value.description,
        form.value.day,
        form.value.time
      );
    } else {
      this.classService.updateClass(
        this.classId,
        form.value.classname,
        form.value.description,
        form.value.day,
        form.value.time
      );
    }
  }


}

