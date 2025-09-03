import { Routes } from '@angular/router';

export const cadastroRoutes: Routes = [
  {
    path: 'fornecedor',
    loadComponent: () => import('./fornecedor/fornecedor').then((m) => m.Fornecedor),
  },
  {
    path: 'pessoa-fisica',
    loadComponent: () => import('./pessoa-fisica/pessoa-fisica').then((m) => m.PessoaFisica),
  },
  {
    path: 'sucesso',
    loadComponent: () => import('./sucesso/sucesso').then((m) => m.Sucesso),
  },
  { path: '', loadComponent: () => import('./cadastro').then((m) => m.Cadastro) },
];
