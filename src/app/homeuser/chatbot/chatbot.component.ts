import { Component } from '@angular/core';
import { ChatbotService } from 'src/app/service/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  question!: string;
  answer!: string;
  chatMessages: { text: string; isBot: boolean }[] = []; // Store chat messages

  constructor(private chatService: ChatbotService) { }

  askQuestion() {
    this.chatService.chat(this.question).subscribe(
      (response) => {
        this.answer = response.answer;
        this.addMessage(this.question, false); // User message
        this.addMessage(this.answer, true); // Bot message
        this.question = ''; // Clear the input field
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  addMessage(text: string, isBot: boolean) {
    this.chatMessages.push({ text, isBot });
  }


}
