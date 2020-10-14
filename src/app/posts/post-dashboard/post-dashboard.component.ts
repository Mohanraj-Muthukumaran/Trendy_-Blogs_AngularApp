import { Observable } from 'rxjs/Observable';
import { PostService } from './../post.service';
import { AuthService } from './../../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage'
import { __await } from 'tslib';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {
  file: any
  title: string
  image: string = null
  content: string

  authorname: string =this.auth.authState.displayName || this.auth.authState.email
  buttonText: string ='Create Post'

  uploadPercent: Observable<number> = null
  downloadURL: Observable<string>

  constructor(private auth: AuthService, private postService:PostService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }

  createPost(){
    const data={
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      content: this.content,
      image: this.image,
      published: new Date(),
      title: this.title
    }
    this.postService.create(data)
    this.title =''
    this.content =''
    this.buttonText = 'Post Created!'
    this.file = ''
    this.image = null
    this.uploadPercent = null
    setTimeout(() => this.buttonText = 'Create Post', 2000);
  }

  async uploadImage(event){
      const file = event.target.files[0]
      const path = `posts/${file.name}`
      if(file.type.split('/')[0] !== 'image'){
          this.file = ''
          this.image = null
          this.uploadPercent = null
          return alert('Only Image Files are Allowed!')
          
      }
      else{
        const task = this.storage.upload(path, file);
        const ref = this.storage.ref(path);
        this.uploadPercent = task.percentageChanges();
        console.log('Image uploaded!');
        task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = ref.getDownloadURL()
          this.downloadURL.subscribe(url => (this.image = url));
        })
        )
        .subscribe();
        }
  }
}
