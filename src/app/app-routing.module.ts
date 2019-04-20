import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReaderListComponent } from './reader-list/reader-list.component';
import { TextPageComponent } from './text-page/text-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppConfigComponent } from './app-config/app-config.component';

const routes: Routes = [
  { path: 'page/:id', component: TextPageComponent },
  {
    path: 'pages',
    component: ReaderListComponent,
    data: { title: 'Reader List' }
  },
  {
    path: 'config',
    component: AppConfigComponent,
    data: { title: 'Reader Configuration' }
  },
  {
    path: '',
    redirectTo: '/pages',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
