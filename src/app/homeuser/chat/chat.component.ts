import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Pusher from 'pusher-js';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  username = localStorage.getItem('fname');
  message = '';
  messages:any[] = [];
  constructor(private http: HttpClient){}

  ngOnInit(): void {
    Pusher.logToConsole = true;

    const pusher = new Pusher('e99edca4c943d312b3e9', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: any) => {
      console.log('Received message:', data);
      this.messages.push(data);
    });
  }

  submit(): void {
    debugger;
    console.log('Sending message:', this.message);
  
    this.http.post('https://localhost:8000/api/messages', {
  username: this.username,
  message: this.message
}).subscribe(
  (response) => {
    console.log('Message sent successfully', response);
    this.message = '';
  },
  (error) => {
    console.error('Error sending message:', error);
  }
);


  }
  

}
