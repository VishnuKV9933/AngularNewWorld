import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { SignUpJson, UserSignup } from 'src/app/customTypes';

@Component({
  selector: 'app-usersignup',
  templateUrl: './usersignup.component.html',
  styleUrls: ['./usersignup.component.css']
})
export class UsersignupComponent {
  @ViewChild('errorMessage') errorElement!:ElementRef;

  signUpForm!:FormGroup;
  constructor(private authService:AuthServiceService,private render:Renderer2){}
  submitStatus:boolean=this.signUpForm?.valid;
 

  
  ngOnInit(): void {
    try {
      
      this.signUpForm=new FormGroup({
        'name':new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(50)]),
        'email':new FormControl(null,[Validators.required,Validators.email]),
        'mobile':new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]{10}$/)]),
        'password':new FormControl(null,[Validators.required,Validators.minLength(6)]),
      })
    } catch (error) {
      console.log(error);
      
    }
  }

  StatusChange(){
    this.submitStatus=this.signUpForm?.valid;
    
  }

  displayError(error:string){
    this.render.setStyle(this.errorElement.nativeElement,'display','block')
    this.render.setProperty( this.errorElement.nativeElement,'textContent',error)
    setTimeout(() => {
    this.render.setStyle(this.errorElement.nativeElement,'display','none')
    }, 2000);
    
  }

  onSubmit():void{
    try {
      
    const { email, password,name,mobile } = this.signUpForm.controls;
     
     let formData:UserSignup={
        name:name.value,
        email:email.value,
        mobile:mobile.value,
        password:password.value
      }
      this.authService.UserSignup(formData).subscribe((data:SignUpJson)=>{

        if(data.created){

        }else{
          if(data.error.email) return this.displayError(data.error.email)
          if(data.error.mobile) return this.displayError(data.error.mobile)
        }
      })
    } catch (error) {
      console.log(error);
      
    }
  }
}
