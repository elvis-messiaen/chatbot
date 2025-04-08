import { Routes } from '@angular/router';

import { LoginComponent } from './features/login/login.component';
import { ChatbotComponent } from './shared/components/chatbot/chatbot.component';
import { AdminMessageComponent } from './features/admin-message/admin-message.component';
import {authGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'user', component: ChatbotComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminMessageComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
