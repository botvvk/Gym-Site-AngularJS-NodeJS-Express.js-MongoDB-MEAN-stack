import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent   {

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

}
