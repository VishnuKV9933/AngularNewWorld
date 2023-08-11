import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,catchError} from 'rxjs';
import { EditProfileData, ProfilePicJson, post, userPostJson } from '../customTypes';

@Injectable({
  providedIn: 'root'
})
export class ProfileService{

  constructor(private http:HttpClient) { }

  UpdateProfilePicture(userId:string|null,data:FormData):Observable<ProfilePicJson>{
      return this.http.post<ProfilePicJson>(`users/profilpictureupdate/${userId}`,data)
  }
  removeProfilePicture(userId:string|null):Observable<ProfilePicJson>{
    return this.http.put<ProfilePicJson>(`users/removeprofilpicture/${userId}`,{})
    .pipe(
      catchError((error)=>{
        console.log(error);
        throw error
        
      })
    )
}

updateProfile(data:EditProfileData):Observable<EditProfileData>{
  return this.http.put<EditProfileData>(`users/updateprofile`, data)
  .pipe(
    catchError((error)=>{
    console.log(error);
    throw error
  }))
}

getUserPosts(userId:string|null):Observable<userPostJson>{
  
  return this.http.get<userPostJson>(`users/userpost/${userId}`)
  .pipe(
    catchError((error)=>{
    console.log(error);
    throw error
  }))
}
  
}
