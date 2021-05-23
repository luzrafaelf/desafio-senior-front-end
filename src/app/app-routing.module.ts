import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalheComponent } from './views/detalhe/detalhe.component';
import { ListaComponent } from './views/lista/lista.component';

const routes: Routes = [
  {
    path: '',
    component: ListaComponent
  },
  {
    path: ':uuid', 
    component: DetalheComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
