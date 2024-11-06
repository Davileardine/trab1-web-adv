import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', 
})
export class ChatService {
    
  private baseUrl = 'http://localhost:3000/chats';

  constructor(private http: HttpClient) {}

  
  getChats(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

}

