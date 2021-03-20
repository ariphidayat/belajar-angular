import { AuthGuard } from './auth-guard.service';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { PostComponent } from "./posts/post/post.component";
import { PostsComponent } from "./posts/posts.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'posts', children: [
    { path: '', canActivate: [AuthGuard], component: PostsComponent },
    { path: ':id', component: PostComponent }
  ]}
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}
