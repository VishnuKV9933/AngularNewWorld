import { Component, EventEmitter, Input, Output } from '@angular/core';
import { switchMap } from 'rxjs';
import { ReplyComment, comment, post } from 'src/app/customTypes';
import { NotificationService } from 'src/app/service/notification.service';
import { PostServiceService } from 'src/app/service/postservice.service';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {

  constructor(private postService:PostServiceService,
    private notificationService:NotificationService
    ){}

  @Input() Inputcomment!:comment
  @Input() InputPost!:post
  @Output() Commentdelete:EventEmitter<void>=new EventEmitter()
  @Output() deleteCommentEvent:EventEmitter<void>=new EventEmitter()

  replyOpen:boolean=false

  replyComment:string=''

  AllReplyComments:ReplyComment[]=[]

  userId:string|null=localStorage.getItem('user')

  

  ngOnInit(){
   this.getReplyComment()
    
  }

  setreplyOpen(){
    this.replyOpen=!this.replyOpen
  }

  getReplyComment(){
    this.postService.getReplyComments(this.Inputcomment._id).subscribe((data)=>{
     
      this.AllReplyComments=data.replyComments
     
      
    })
  }
  
  deleteComment(){
  if( this.userId!==this.InputPost.userId && this.userId !==this.Inputcomment.userId) return
    this.postService.deleteComment(this.Inputcomment.postId,this.Inputcomment._id).subscribe((data)=>{
      console.log(data);
     this.Commentdelete.emit()
     this.deleteCommentEvent.emit()
    })
  }

  deleteReply(replyId:string,userId:string){
    if( this.userId !==this.InputPost.userId && this.userId !==this.Inputcomment.userId && this.userId==userId) return
    this.postService.deleteReply(this.Inputcomment._id,replyId).subscribe((data)=>{
      this.getReplyComment()
    })
  }

  addReply(){

    if(this.replyComment.trim()!==""){

      let Obj:post=this.InputPost
      Obj.commenderId=this.userId
      Obj.commentOwner=this.Inputcomment.userId
      Obj.reply=this.replyComment
     
      this.postService.addReplyComment(this.userId,this.Inputcomment._id,this.replyComment)
      .pipe(switchMap((data)=>{
        return this.notificationService.addReplyNotification(Obj)
      }))
      .subscribe((data)=>{
        this.replyComment=''
        this.getReplyComment()

      })
    }

  }

}
