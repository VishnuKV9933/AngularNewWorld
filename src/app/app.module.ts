import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditpostComponent } from './Modal/editpost/editpost.component';
import { CommentModalComponent } from './Modal/commentmodal/commentmodal.component';
import { ProfileEditModalComponent } from './Modal/profileeditmodal/profileeditmodal.component';
import { ProfilePictureEditModalComponent } from './Modal/profilepictureeditmodal/profilepictureeditmodal.component';
import { NotificationComponent } from './User/Pages/notification/notification.component';
import { UserhomeComponent } from './User/Pages/userhome/userhome.component';
import { UserloginComponent } from './User/Pages/userlogin/userlogin.component';
import { UsersignupComponent } from './User/Pages/usersignup/usersignup.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MainInterceptor } from './Interceptor/main.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './User/Pages/profile/profile.component';
import { CommentComponent } from './User/Components/comment/comment.component';
import { PostcardComponent } from './User/Components/postcard/postcard.component';
import { PostformComponent } from './User/Components/postform/postform.component';
import { UsersidebarComponent } from './User/Components/usersidebar/usersidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    CommentModalComponent,
    EditpostComponent,
    ProfileEditModalComponent,
    ProfilePictureEditModalComponent,
    NotificationComponent,
    UserhomeComponent,
    UserloginComponent,
    UsersignupComponent,
    ProfileComponent,
    CommentComponent,
    PostcardComponent,
    PostformComponent,
    UsersidebarComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:MainInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
