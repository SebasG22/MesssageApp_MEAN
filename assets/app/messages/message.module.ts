import { NgModule } from '@angular/core';
import { MessageComponent } from "./message.component";
import { MessageListComponent } from "./message-list.component";
import { MessageInputComponent } from "./message-input.component";
import { MessagesComponent } from "./messages.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MessageService } from "./message.service";


@NgModule({
    imports: [CommonModule, FormsModule],
    exports: [],
    declarations: [MessageComponent,
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent],
    providers: [MessageService],
})
export class MessageModule { }
