import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { cadastroRoutes } from './pages/cadastro/cadastro.routes';

export const routes: Routes = [
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'cadastro',
    children: cadastroRoutes,
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
