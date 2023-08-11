import { Component } from '@angular/core';
import { StateSevice } from 'src/app/Service/stateservice.service';
import { post, user, userPosts } from 'src/app/customTypes';
import { PostServiceService } from 'src/app/service/postservice.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent {
  constructor(private postServise:PostServiceService,private stateService:StateSevice){}
  userId:string|null=null
  Userposts:post[]=[]
  user!:user
  ngOnInit(){
    this.userId=localStorage.getItem('user')
    this.getUser()
    this.getUserPost()
  }


  getUser(){
      this.postServise.getUser(this.userId).subscribe((data)=>{
        this.user=data;
        this.stateService.updatCurrentUser(this.user)
        this.stateService.currentUser$.subscribe((data)=>{
        })
      })
  }

  getUserPost(){
    this.postServise.getUserPosts(this.userId).subscribe((data:userPosts)=>{
      this.Userposts=data.posts;
    })
  }


}
