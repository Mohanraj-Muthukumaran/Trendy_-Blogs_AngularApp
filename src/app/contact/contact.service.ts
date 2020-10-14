import { Contact } from './contact';
import { Injectable } from '@angular/core';


import { 
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactCollection: AngularFirestoreCollection<Contact>;
  contactDoc: AngularFirestoreDocument;

  constructor(private afsc: AngularFirestore) { 
    this.contactCollection = this.afsc.collection('contacts', ref =>
      ref.orderBy('date')
    );
  }

  
  create(data: Contact){
    this.contactCollection.add(data);
  }
}
