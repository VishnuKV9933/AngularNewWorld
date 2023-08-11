import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,of} from 'rxjs';
import { ReplyComment, ReplyCommentJson, comment, post, user, userPosts } from '../customTypes';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  constructor(private http:HttpClient) { }

  
  postUpload(formData: FormData, jwt: string | null): Observable<post> {
    const headers = new HttpHeaders({
      'jwt': jwt || ''
    });

    return this.http.post<post>('users/userpost', formData, { headers: headers })
      .pipe(
        catchError(error => {
          console.log(error);
          throw error;
        })
      );
  }

  getUser(userId:string|null):Observable<user>{
    
    return this.http.post<user>(`users/getuser`,{userId:userId})
    .pipe(
      catchError(error => {
        console.log(error);
        throw error;
      })
    );
  }

  getUserPosts(userId:string|null):Observable<userPosts>{

    return this.http.get<userPosts>(`users/getposts/${userId}`)
    .pipe(
      catchError(error => {
        console.log(error);
        throw error;
      })
    );
  }

  likeUnlike(userId:string|null,postId:string,Obj:post):Observable<any>{
    return this.http.put<userPosts>(`users/like/${userId}/unlike`,{ postId: postId})
    .pipe(
      catchError(error => {
        console.log(error);
        throw error;
      })
    );
  }

  getComments(postId:string):Observable<comment[]>{
    return this.http.post<comment[]>(`users/getcomments`,{postId})
    .pipe(
      catchError(error => {
        console.log(error);
        throw error;
      })
    );
  }

  getReplyComments(commentId:string):Observable<ReplyCommentJson>{
    return this.http.get<ReplyCommentJson>(`users/getreplycomments/${commentId}`)
    .pipe(
      catchError(error => {
        console.log(error);
        throw error;
      })
    );
  }

  addComment(userId:string|null,postId:string,comment:string):Observable<comment>{
    const data={
      userId: userId,
      postId: postId,
      comment: comment
    }
 
    return this.http.put<comment>(`users/addcomment`,data)
    .pipe(
      catchError(error => {
        console.log(error);
        throw error;
      })
    );
  }

  addReplyComment(userId:string|null,commentId:string,replyComment:string):Observable<ReplyComment>{
    const data={
      userId: userId,
        commentId:commentId,
        reply:replyComment,
    }
    return this.http.put<ReplyComment>(`users/addreplycomments`,data)
    .pipe(
      catchError(error => {
        console.log(error);
        throw error;
      })
    );
  }

  deleteComment(postId:string,commentId:string):Observable<any>{
    return this.http.delete<comment>(`users/delete/${postId}/comment/${commentId}`)
    .pipe(
      catchError(error => {
        console.log(error);
        throw error;
      })
    );
  }

  deleteReply(commentId:string,replyId:string):Observable<comment>{
    return this.http.delete<comment>(`users/deletereply/${commentId}/comment/${replyId}`)
    .pipe(
      catchError(error => {
        console.log(error);
        throw error;
      })
    );
  }

  deletePost(postId:string):Observable<any>{
    return this.http.delete<any>(`users/deletepost/${postId}`)
    .pipe(
      catchError(error => {
        console.log(error);
        throw error;
      })
    );
  }

  editPost(data:FormData):Observable<void>{
    
    return this.http.post<void>(`users/postupdate`,data)
    .pipe(
      catchError(error => {
        console.log(error);
        throw error;
      })
    );
  }


}
