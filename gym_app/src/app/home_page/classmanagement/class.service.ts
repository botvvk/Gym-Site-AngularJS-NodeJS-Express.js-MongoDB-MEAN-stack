import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Class } from "../../class.model";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";



const BACKEND_URL = environment.apiUrl + "/classes";

@Injectable({ providedIn: "root" })
export class ClassService {
private classes: Class[] = [];
private classesUpdated = new Subject<{ classes: Class[]; classCount: number }>();


constructor(private http: HttpClient, private router: Router) {}
getClassUpdateListener() {
  return this.classesUpdated.asObservable();
}

getClasses() {
  this.http
    .get<{ classes: any;maxClasses:number }>(
      BACKEND_URL
    ).pipe(
      map(classData => {
        return {
          classes: classData.classes.map(classroom => {
            return {
              id: classroom._id,
              classname: classroom.classname,
              description: classroom.description,
              day: classroom.day,
              time: classroom.time
            };
          }),
          maxClasses: classData.maxClasses
        };
      })
    )
    .subscribe(transformedClassData => {
      this.classes = transformedClassData.classes;
      this.classesUpdated.next({
        classes: [...this.classes],
        classCount: transformedClassData.maxClasses
      });
    });
}

getClass(id: string) {
  return this.http.get<{
    _id: string,
    classname: string,
    description: string,
    day: string,
    time: string
  }>(BACKEND_URL + "/"+ id);
}

createClass( classname: string, description: string, day: string, time: string)
{
  const classData : Class ={
    id: null,
    classname: classname,
    description: description,
    day: day,
    time: time}

  this.http.post(BACKEND_URL, classData).subscribe({ next:() => {
    window.alert("Class was created.");
  },
  error:() => {
    window.alert("ERROR...Class was NOT created.");
    }
  }
  );
  window.location.reload();
 }


deleteClass(classId: string) {
  return this.http.delete(BACKEND_URL +"/"+ classId);
}

updateClass(id: string, classname: string, description: string, day: string, time: string) {
  let classData: Class | FormData;
  classData = {
    id: id,
    classname: classname,
    description: description,
    day: day,
    time: time
    };

  this.http
  .put(BACKEND_URL + "/"+ id, classData).subscribe({
    next: ()  => {
      window.alert("Class was updated.")
      window.location.reload();
  }, error: ()=> {
    window.alert("Error on class update.");
  }
  });

}




}
