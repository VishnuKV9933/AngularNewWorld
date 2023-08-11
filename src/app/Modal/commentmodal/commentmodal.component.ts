import {  Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { comment, post } from 'src/app/customTypes';
import { switchMap } from 'rxjs/operators';
import { PostServiceService } from 'src/app/service/postservice.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'commentmodal',
  templateUrl: './commentmodal.component.html',
  styleUrls: ['./commentmodal.component.css']
})
export class CommentModalComponent  implements OnInit {
  constructor(private postService:PostServiceService,
    private notificationService:NotificationService){}
  @Input()ModalOpen!:boolean

  @Input() post!:post;

  @Output() closeModal:EventEmitter<void>=new EventEmitter() 
  @Output() postCaller:EventEmitter<void>=new EventEmitter() 
  userId:string|null=localStorage.getItem('user')
  comment:string=''
  allComment:comment[]=[]

  ngOnInit(): void {
    this.getComments()
   
  }
  
  getComments(){

    try {
     
      this.postService.getComments(this.post._id).subscribe((data)=>{
        console.log(data);
        this.allComment=data
      })
      
    } catch (error) {
      console.log(error);
      
    }
    
  }
 
  commentModalClose(event:Event){
    try {
      const clickedElement = event.target as HTMLElement;
      const idAttribute=clickedElement.getAttribute('id')
      if(idAttribute==='wrapper') this.closeModal.emit()
    } catch (error) {
      console.log(error);
    }

  }

  getTest(event:Event){
    const inputElement = event.target as HTMLInputElement;
    this.comment=inputElement.value
  }
    

  addComment(){
    
    
    if(this.comment.trim()!==''){
      let Obj:post=this.post
      Obj.commenderId=this.userId
      Obj.comment=this.comment
      this.postService.addComment(this.userId,this.post._id,this.comment)
      .pipe(
        switchMap((data)=>{
          this.getComments()
          return this.notificationService.addCommentNotification(Obj)
        })
      ).subscribe((data)=>{
        console.log(data);
        
      })
    }
    this.comment=''
  }

  callPost(){
    this.postCaller.emit()
  }

  
}

