import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileService } from 'src/app/Service/profile-service.service';
import { StateSevice } from 'src/app/Service/stateservice.service';
import { EditProfileData, user } from 'src/app/customTypes';
import { PostServiceService } from 'src/app/service/postservice.service';

@Component({
  selector: 'profileditmodal',
  templateUrl: './profileeditmodal.component.html',
  styleUrls: ['./profileeditmodal.component.css']
})
export class ProfileEditModalComponent {
  constructor(private stateService: StateSevice,
    private userService: PostServiceService,
    private profilService: ProfileService
    ){}

    @Input() modalOpen!: boolean;

    @Output() modalCloserEvent: EventEmitter<void> = new EventEmitter();
  
   
  
    userId: string | null = localStorage.getItem('user');
    user!: user;
    name!:string
    city!:string
    school!:string
    bio!:string


    modalCloser(event:Event){

      try {
        let element = event.target as HTMLElement;
        let attribute = element.getAttribute('id');
        if (attribute === 'wrapper') {
          this.modalCloserEvent.emit()
          this.getUser();
        }
      } catch (error) {
        console.log(error);
      }
    }

    ngOnInit() {
      try {
        this.getUser();
      } catch (error) {
        console.log(error);
      }
    }
     
    getUser() {
      try {
        this.userService.getUser(this.userId).subscribe((data) => {
          this.user = data;
          console.log('user',this.user);
         this.name=this.user.username
          if(this.user.city) {this.city=this.user.city }else this.city='place'
          if(this.user.school) {this.school=this.user.school }else this.school='school'
          if(this.user.bio) {this.bio=this.user.bio }else this.bio='bio'
        });
        
      } catch (error) {
        console.log(error);
        
      }
    }

    submit(){
      const data: EditProfileData = {
        city: this.city,
        school: this.school,
        name: this.name,
        bio: this.bio,
        userId: this.userId,
    };

     
      this.profilService.updateProfile(data).subscribe((data:EditProfileData)=>{
        console.log(data);
        
      })

      this.modalCloserEvent.emit()

    }
  
  
}


