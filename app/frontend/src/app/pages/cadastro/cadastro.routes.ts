import { Routes } from '@angular/router';

export const cadastroRoutes: Routes = [
  {
    path: 'fornecedor',
    loadComponent: () => import('./fornecedor/fornecedor').then((m) => m.Fornecedor),
  },
  { path: '', loadComponent: () => import('./cadastro').then((m) => m.Cadastro) },
];
