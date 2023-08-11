import { Component, EventEmitter, Input, Output } from '@angular/core';
import { post } from 'src/app/customTypes';
import { PostServiceService } from 'src/app/service/postservice.service';

@Component({
  selector: 'editpostModal',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent {

  constructor(private postService:PostServiceService){}

  @Input() ModalOpen!:boolean;

  @Input() post!:post;

  @Output() editPostModalCloser:EventEmitter<void>=new EventEmitter()

  @Output() postCaller:EventEmitter<void>=new EventEmitter()



  description!:string;

  ngOnInit(){
    this.description=this.post?.description;

  }

  modalCloser(event:Event){
    try {
      let inputEvent:HTMLElement =event.target as HTMLElement
      let attribute= inputEvent.getAttribute('id')
  
      if(attribute==="wrapper") this.editPostModalCloser.emit()
    } catch (error) {
      console.log(error);
      
    }

  }

  editPost(){
    try {
      
      let formData= new FormData()
      
      if(this.description.trim()!==''){

        formData.append('description',this.description)
        formData.append('post',this.post._id)

        this.postService.editPost(formData).subscribe(()=>{
          this.postCaller.emit()
        })

      }
      this.editPostModalCloser.emit()

    } catch (error) {
      console.log(error);
      
    }
  }

}
