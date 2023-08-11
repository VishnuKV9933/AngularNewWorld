import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCaretDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { post } from 'src/app/customTypes';
import { NotificationService } from 'src/app/service/notification.service';
import { PostServiceService } from 'src/app/service/postservice.service';

@Component({
  selector: 'postcard',
  templateUrl: './postcard.component.html',
  styleUrls: ['./postcard.component.css']
})
export class PostcardComponent implements OnInit {

  constructor(private postServise:PostServiceService,
    private noticationService:NotificationService
    ){}

  @Input() post!:post
  userId:string|null=localStorage.getItem('user')

  @Output() postCaller:EventEmitter<void>= new EventEmitter()

  Liked!:boolean
  likeCount!:number

  commentModalOpen:boolean=false

  postEditModalOpen:boolean=false

  OptionsIcon=faCaretDown
  OptionsCloseIcon=faXmark

  OptionsOpen:boolean=false

  ngOnInit(){
    this.likeCount=this.post?.like.length
    this.isLiked()
  }

  setOptionsOpen():void{
    this.OptionsOpen=!this.OptionsOpen
  }

  setPostEditModalOpen():void{
    this.postEditModalOpen=!this.postEditModalOpen    
  }

  setPostModalOpen():void{
    
    this.commentModalOpen=true
    
  }

  setCommentModalClose():void{
    this.commentModalOpen=false
    this.callPost()
  }

  isLiked():void{
    const Id=this.userId?.toString()

    this.post.like
    for (const elem of this.post.like){
      if(elem===this.userId){
        this.Liked=true
      }else{
        this.Liked=false
      }
    } 
  }

  likeUnlike(action:string):void{
    let Obj:post=this.post
    Obj.likerId=this.userId
    this.postServise.likeUnlike(this.userId,this.post._id,Obj).subscribe((data)=>{
     if(action==='like'){
      this.likeCount++
      this.noticationService.addLikeNotification(Obj).subscribe((data)=>{
        
      })
     }else{
      this.likeCount--
     }
      this.Liked=!this.Liked
    })
  }

  deletePost():void{
    this.postServise.deletePost(this.post._id).subscribe((data)=>{
     this.postCaller.emit()
    })
  }

  callPost(){
    this.postCaller.emit()
  }
}
