import { ContactformComponent } from './contact/contactform/contactform.component';
import { PostsModule } from './posts/posts.module';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostDashboardComponent } from './posts/post-dashboard/post-dashboard.component';

const routes: Routes = [
    { path: 'blog', component: PostListComponent },
    { path: 'blog/:id', component: PostDetailComponent },
    { path: 'dashboard', component: PostDashboardComponent},
    { path: 'contact', component: ContactformComponent },
    { path: '', redirectTo: 'blog', pathMatch:'full'}  
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            PostsModule],
  exports: [RouterModule, PostsModule]
})
export class AppRoutingModule { }
