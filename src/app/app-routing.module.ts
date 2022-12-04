import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalInfoComponent } from '../components/personal-info/personal-info.component';
import { HomeComponent } from '../components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'post/1',
    component: PersonalInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
