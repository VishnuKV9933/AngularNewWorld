import { Component, EventEmitter, Output } from '@angular/core';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { switchMap } from 'rxjs';
import { NotificationService } from 'src/app/service/notification.service';
import { PostServiceService } from 'src/app/service/postservice.service';

@Component({
  selector: 'postform',
  templateUrl: './postform.component.html',
  styleUrls: ['./postform.component.css']
})
export class PostformComponent {
  constructor(
    private postService: PostServiceService,
    private notificationService: NotificationService
  ) {}

  @Output() postEvent: EventEmitter<void> = new EventEmitter();
  Image = faImage;

  selectedFile: File | null = null;
  postTest: string = '';

  getFile(event: Event) {
    try {
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
        if (inputElement.files[0].type.startsWith('image/')) {
          this.selectedFile = inputElement.files[0];
        }
        console.log('Selected file:', this.selectedFile);
      }
    } catch (error) {
      console.log(error);
    }
  }

  getTest(event: Event) {
    try {
      const inputElement = event.target as HTMLInputElement;
      this.postTest = inputElement.value;
    } catch (error) {
      console.log(error);
    }
  }

  Onsubmit(): void {
    try {
      const formData = new FormData();

      if (!this.selectedFile && this.postTest.trim() === '') return;

      const jwt: string | null = localStorage.getItem('userToken');

      if (this.selectedFile && this.postTest.trim() === '') {
        console.log('1');

        formData.append('image', this.selectedFile);
      } else if (!this.selectedFile && this.postTest.trim() !== '') {
        console.log('2');
        console.log(this.selectedFile);
        console.log(this.postTest);

        formData.append('description', this.postTest);
      } else if (this.selectedFile && this.postTest.trim() !== '') {
        console.log('3');

        formData.append('image', this.selectedFile);
        formData.append('description', this.postTest);
      }

      this.postService
        .postUpload(formData, jwt)
        .pipe(
          switchMap((data) => {
            return this.notificationService.addPostNotification(data);
          })
        )
        .subscribe((data) => {
          this.postEvent.emit();
        });

      this.postTest = '';
      this.selectedFile = null;
    } catch (error) {
      console.log(error);
    }
  }
}
