import { Component } from '@angular/core';
import { ProfileService } from 'src/app/Service/profile-service.service';
import { StateSevice } from 'src/app/Service/stateservice.service';
import { post, user } from 'src/app/customTypes';
import { PostServiceService } from 'src/app/service/postservice.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserProfileComponent {
  constructor(private stateServie:StateSevice,
    private userService:PostServiceService,
    private ProfileService:ProfileService
    ){}

userId:string|null=localStorage.getItem("user")
user!:user
defaultPrfieUrl:string=this.stateServie.defaultProfileImageUrl

profiPicEditOpen:boolean=false;
profileEditOpen:boolean=false;

Userposts!:post[]


name!:string
city!:string|null
school!:string|null
bio!:string|null

ngOnInit(){
try {
  
  this.getUser()
  this.getUserPosts()
} catch (error) {
  console.log(error);
  
}
}
getUser(){

try {
  
  this.userService.getUser(this.userId).subscribe((data)=>{
    this.user=data
    if(this.user.profilePicture){
      this.defaultPrfieUrl=this.user.profilePicture
    }
    this.name=this.user.username
    if(this.user.city) {this.city=this.user.city }else this.city='Place not added'
    if(this.user.school) {this.school=this.user.school }else this.school='School not added'
    if(this.user.bio) {this.bio=this.user.bio }else this.bio='Bio not added'
    console.log(this.bio);
    
  })
} catch (error) {
  console.log(error);
  
}


}

updateProilePic(url:string){
try {
  this.defaultPrfieUrl=url
  
} catch (error) {
  console.log(error);
  
}
}

profilePicModalHandler(){
try {
  this.profiPicEditOpen=!this.profiPicEditOpen
  
} catch (error) {
  console.log(error);
  
}
}

profileEditModalHandler(){
try {
  
  this.profileEditOpen=!this.profileEditOpen
} catch (error) {
  console.log(error);
  
}
}

profileEditModalCloser(){
try {
  
  this.profileEditOpen=!this.profileEditOpen
  this.getUser()
} catch (error) {
  console.log(error);
  
}
}

getUserPosts():void{
try {
  
  this.ProfileService.getUserPosts(this.userId).subscribe((data)=>{
    this.Userposts=data.posts
  })
} catch (error) {
  console.log(error);
  
}
}

}

