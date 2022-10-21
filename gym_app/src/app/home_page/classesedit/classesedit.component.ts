import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { ClassService } from "../classmanagement/class.service";
import { Class } from "../../class.model";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";


@Component({
  selector: 'app-classesedit',
  templateUrl: './classesedit.component.html',
  styleUrls: ['./classesedit.component.css']
})
export class ClasseseditComponent implements OnInit {

  private classId: string;
  isLoading = false;
  class: Class;
  form: FormGroup;
  constructor(public route: ActivatedRoute,public classesService: ClassService,  private router: Router) {
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(  (paramMap: ParamMap)  =>{
      if (paramMap.has('classId')){
        this.classId = paramMap.get('classId');
      };
    });
    this.classesService.getClass(this.classId).subscribe( classData => {
      this.isLoading = false;
      this.class = {
        id: classData._id,
        description: classData.description,
        classname: classData.classname,
        day: classData.day,
        time: classData.time
      };
    });
  }
  onUpdate(form:NgForm){


    this.classesService.updateClass(
      this.classId,
      form.value.classname,
      form.value.description,

      form.value.day,
      form.value.time
    );
  }

  onDelete(classId: string) {
    this.isLoading = true;
    this.classesService.deleteClass(classId).subscribe({
      next: ()  => {
        window.alert("Class was deleted!")
        this.router.navigate(["/classmanagement"]);
    }, error: ()=> {
      window.alert("Change on admin is prohibited! Please contact the creator.");
      this.isLoading = false;
    }
    });
  }


}
