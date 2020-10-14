import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { 
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  } from '@angular/fire/firestore';
import { Post } from './post';
import { Timestamp } from 'rxjs-compat';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postsCollection: AngularFirestoreCollection<Post>;
  postDoc: AngularFirestoreDocument;

  constructor(private afs: AngularFirestore) { 
    this.postsCollection = this.afs.collection('posts', ref =>
      ref.orderBy('published','desc')
    );
  }

  getPosts(){
    return this.postsCollection.snapshotChanges().map(actions =>{
        return actions.map(a =>{
            const data = a.payload.doc.data() as Post;
            const id = a.payload.doc.id;
            return {id, ...data}
        })
    })
  }

  getPostData(id: string){
      this.postDoc = this.afs.doc<Post>(`posts/${id}`);
      return this.postDoc.valueChanges();
  }

  create(data: Post){
      this.postsCollection.add(data);
  }

  getPost(id: string){
    return this.afs.doc<Post>(`posts/${id}`);
  }

  delete(id: string){
    return this.getPost(id).delete();
  }

  update(id: string, formData){
    return this.getPost(id).update(formData);
  }

}
