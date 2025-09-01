import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./pages/cadastro/cadastro').then((m) => m.Cadastro),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/pagina-nao-encontrada/pagina-nao-encontrada').then(
        (m) => m.PaginaNaoEncontrada
      ),
  },
];
