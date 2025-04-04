import { Routes } from '@angular/router';
import {ChatbotComponent} from './shared/components/chatbot/chatbot.component';
import {AdminMessageComponent} from './features/admin-message/admin-message.component';


export const routes: Routes = [
  {path: 'user', component: ChatbotComponent},
  {path: 'admin', component: AdminMessageComponent}
];
