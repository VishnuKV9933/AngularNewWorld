import { Component } from '@angular/core';
import { NotificationData } from 'src/app/customTypes';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {

  constructor(private notificationService:NotificationService){}

  userId:string|null=localStorage.getItem('user')
  notifications:NotificationData[]=[]

  ngOnInit(){
  this.getNotifications()
  }

   notsean:string='w-full h-12 rounded bg-blue-300 flex items-center gap-2 mt-4 ' 
   seaned:string='w-full h-12 rounded bg-blue-200 flex items-center gap-2 mt-4 ' 

  getNotifications():void{
    try {
      
      this.notificationService.getNotifications(this.userId).subscribe((data)=>{
        this.notifications=data
        console.log(this.notifications);
      })

    } catch (error) {
      console.log(error);
      
    }
  }

  readNotice(Id:string){
    try {
      
      this.notificationService.readNotification(Id).subscribe((data)=>{
        this.getNotifications()
      })
    } catch (error) {
      console.log(error);
      
    }
  }

  clearNotification(){
    try {
      this.notificationService.clearNotification(this.userId).subscribe(()=>{
        this.getNotifications()
      })
      
    } catch (error) {
      console.log(error);
      
    }

  }
  

}
