import { ContactService } from './../contact.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styleUrls: ['./contactform.component.css']
})
export class ContactformComponent implements OnInit {
  successText: string = ''
  buttontext: string = 'Send';
  name: string ;
  email: string;
  phone?: string =null;
  message: string;

  constructor(private contact: ContactService) { 
    
  }

  ngOnInit(): void {
  
  }
  
  createContactData(){
    const data={
          name: this.name,
          email: this.email,
          phone: this.phone,
          message: this.message,
          date: new Date()
    }

  this.contact.create(data);
  this.name = '';
  this.email = '';
  this.phone = '';
  this.message = '';
  this.buttontext = 'Response Recieving...'
  setTimeout(() => this.buttontext = 'Recieved!', 2000);
  setTimeout(() => this.buttontext = 'Send', 3000);
  setTimeout(() => this.successText='Thank you for writing to us! Will get back to you ASAP! For Urgent Queries write to us at feedwithcode@gmail.com! We are Happy to help you!',4000);
  
  }
}
