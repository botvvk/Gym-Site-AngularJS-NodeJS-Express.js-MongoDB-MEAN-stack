import { Component, OnInit } from '@angular/core';
import { ReservationsService } from "./reservations.service";
import { FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { Class } from "../../class.model";
import { ClassService } from './../classmanagement/class.service';
import { UserService } from "../usermanagement/user.service";
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { AuthService } from 'src/app/auth/auth.service';
import { User} from "../../user.model";
const moment = _moment;

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  isLoading = false;
  userId : string;
  user: User;
  class: Class;
  classes: Class[] = [];
  form: FormGroup;
  totalClasses = 0;
  private classId: string;
  private classesSub: Subscription;
  unique : any[];


  //availableday : Array<any> = this.classes[0].classname

  date = moment();
  selDate: string;
  selDay: string;
  selMonth: string;
  selYear: string;

  selectedProgram: string ;
  selectedTime: string   ;
  selectedDate = moment();
  minDate = new Date();
  maxDate =  moment(this.minDate).add(14, "days");
  //zumbaday : Array<String>  = ['Tuesday',"Monday"];

  constructor(public reservationsService: ReservationsService,
              public userService : UserService,
              public classesService: ClassService,
              private authService: AuthService ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.classesService.getClasses();
    this.userId = this.authService.getUserId();
    this.userService.getUser(this.userId).subscribe( userData => {
      this.isLoading = false;
      this.user = {
        id: userData._id,
        password: userData.password,
        email: userData.email,
        username: userData.username,
        mobile: userData.mobile,
        role: userData.role
      };
      console.log(this.user);
    });
    this.classesSub = this.classesService
      .getClassUpdateListener()
      .subscribe((classData: { classes: Class[]; classCount: number }) => {
        this.isLoading = false;
        this.totalClasses = classData.classCount;
        this.classes = classData.classes;
        this.isLoading = false;
        this.unique = [...new Set(this.classes.map(item => item.classname))];
        //μοναδικα προγραμματα
      });


  }



  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.date = moment(event.value);
    this.selDate = this.date.format('DD');
    this.selDay = this.date.format('dddd');
    this.selMonth = this.date.format('MMMM');
    this.selYear = this.date.format('YYYY');
  }




  AddRes(){

        this.reservationsService.addReservation(
          this.userId,
          this.selectedProgram,
          this.selectedDate.format('DD/MM/YYYY'),
          this.selDay,
          this.selectedTime,
          this.user.email);

  }


  myFilter = (date: Date ): boolean => {
    const day = moment(new Date(date)).format('dddd');
    const programdays = []
    for(let i = 0; i < this.classes.length; i++){
      if (this.classes[i].classname == this.selectedProgram ){
        programdays.push(this.classes[i].day)
      };
      }
    // εφοσον εχουμε επιλεξει προγραμμα τοτε μπορουμε να φιλτραρουμε τις κλασσεις
    // με βάση το επιλεγμενο προγραμμα και να διαλέξουμε όλες τις ημέρες που έχει το
    // συγκεκριμενο προγραμμα. Γυρίσει τις ημέρες που έιναι μέσα στις μέρες του προγραμματος.
    return programdays.includes(day) //!== 0 && day !== 6 && day !== 5
  };


  classfilter(classes: Class[]): any[] {
    return classes.filter(cl => cl.classname == this.selectedProgram
                            && cl.day == this.selectedDate.format('dddd') );
  }


}
