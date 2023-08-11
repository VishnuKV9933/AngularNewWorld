import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { LoginData, LoginJson } from 'src/app/customTypes';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent {

  @ViewChild('errorMessage') errorElement!:ElementRef

  constructor(private authService:AuthServiceService,private render:Renderer2,private router:Router){}
  loginForm!:FormGroup;
  submitStatus:boolean=this.loginForm?.valid;
  

ngOnInit(): void {
  try {
    
    this.loginForm=new FormGroup({
      'email':new FormControl("vishnu@gmail.com",[Validators.email,Validators.required]),
      "password":new FormControl("123456",[Validators.required,Validators.minLength(6)])
    })
  
  } catch (error) {
    console.log(error);
    
  }
}

StatusChange(){
  this.submitStatus=this.loginForm?.valid;
  
}

displayError(error:string){
  this.render.setStyle(this.errorElement.nativeElement,'display','block')
  this.render.setProperty( this.errorElement.nativeElement,'textContent',error)
  setTimeout(() => {
  this.render.setStyle(this.errorElement.nativeElement,'display','none')
  }, 2000);
  
}

  onSubmit(){

    try {
      const { email, password } = this.loginForm.controls;
    
     
     let FormData:LoginData={
      email:email.value,
      password:password.value
     }
      
  
      this.authService.UserLogin(FormData).subscribe((data:LoginJson)=>{
        
        

       console.log(data);
       

        if(data.errors){
          if(data.errors.email) return this.displayError(data.errors.email)
          if(data.errors.password) return this.displayError(data.errors.password)
          if(data.errors.block) return this.displayError(data.errors.block)
        }else{
          localStorage.setItem('user', data.user._id);
          localStorage.setItem('userToken',data.token)
          this.router.navigate(['/'])

        }
        

      })
      
    } catch (error) {
      
    }
    

  }
}

