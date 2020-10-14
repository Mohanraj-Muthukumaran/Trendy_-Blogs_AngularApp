import { RouterModule } from '@angular/router';
import { PostService } from './post.service';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostDashboardComponent } from './post-dashboard/post-dashboard.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';


@NgModule({
  declarations: [PostDashboardComponent, PostDetailComponent, PostListComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [PostDashboardComponent, PostDetailComponent, PostListComponent],
  providers: [ PostService ]

})
export class PostsModule { }
