import { Routes } from '@angular/router';

import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Dashboard } from './components/dashboard/dashboard';
import { Transactions } from './components/transactions/transactions';
import { Budgets } from './components/budgets/budgets';
import { Reports } from './components/reports/reports';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },

  { path: 'register', component: Register },

  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },

{ path: 'transactions', component: Transactions, canActivate: [authGuard] },

{ path: 'budgets', component: Budgets, canActivate: [authGuard] },

{ path: 'reports', component: Reports, canActivate: [authGuard] },

  { path: '**', redirectTo: 'login' }

];