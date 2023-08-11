import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProfileService } from 'src/app/Service/profile-service.service';
import { StateSevice } from 'src/app/Service/stateservice.service';
import { user } from 'src/app/customTypes';
import { PostServiceService } from 'src/app/service/postservice.service';

@Component({
  selector: 'profilepiceditmodal',
  templateUrl: './profilepictureeditmodal.component.html',
  styleUrls: ['./profilepictureeditmodal.component.css']
})
export class ProfilePictureEditModalComponent implements OnInit {
  constructor(
    private stateService: StateSevice,
    private userService: PostServiceService,
    private profilService: ProfileService
  ) {}
  @Input() modalOpen!: boolean;

  @Output() modalCloer: EventEmitter<void> = new EventEmitter();

  @Output() newProfilePic: EventEmitter<string> = new EventEmitter();

  userId: string | null = localStorage.getItem('user');
  user!: user;

  selectedFile!: File | null;

  profilePictureUrl!: string;

  ngOnInit() {
    try {
      this.getUser();
    } catch (error) {
      console.log(error);
    }
  }

  picInitilizer() {
    try {
      if (!this.user?.profilePicture) {
        this.profilePictureUrl = this.stateService.defaultProfileImageUrl;
      } else {
        this.profilePictureUrl = this.user.profilePicture;
      }
    } catch (error) {
      console.log(error);
    }
  }

  removeProfilePic() {
    try {
      this.profilService.removeProfilePicture(this.userId).subscribe((data) => {
        this.selectedFile = null;
        this.newProfilePic.emit(this.stateService.defaultProfileImageUrl);
        this.modalCloer.emit();
        this.ngOnInit();
      });
    } catch (error) {
      console.log(error);
    }
  }

  submit() {
    try {
      if (this.selectedFile) {
        const data = new FormData();
        data.append('image', this.selectedFile);
        this.profilService
          .UpdateProfilePicture(this.userId, data)
          .subscribe((data) => {
            this.newProfilePic.emit(data.profilePictureUrl);
          });
      }
      this.modalCloer.emit();
    } catch (error) {
      console.log(error);
    }
  }

  Update(event: Event) {
    try {
      let inputElement = event.target as HTMLInputElement;

      if (inputElement.files && inputElement.files.length > 0) {
        this.selectedFile = inputElement.files[0];

        if (this.selectedFile.type.startsWith('image/')) {
          let imageURL = URL.createObjectURL(this.selectedFile);

          this.profilePictureUrl = imageURL;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  getUser() {
    this.userService.getUser(this.userId).subscribe((data) => {
      this.user = data;
      this.picInitilizer();
    });
  }

  modalCloser(event: Event) {
    try {
      let element = event.target as HTMLElement;
      let attribute = element.getAttribute('id');
      if (attribute === 'wrapper') {
        this.modalCloer.emit();
        this.selectedFile = null;
        this.ngOnInit();
      }
    } catch (error) {
      console.log(error);
    }
  }
}
