import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UsersComponent } from './users/users.component';
// import { AddUserComponent } from './add-user/add-user.component';
import { NotfoundedComponent } from './notfounded/notfounded.component';


const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: { title: 'list Users' }
  },
  // {
  //   path: 'user/add',
  //   component: AddUserComponent,
  //   data: { title: 'Add user' }
  // },
  {
    path: 'user/edit/:id',
    component: EditUserComponent,
    data: { title: 'Edit user' }
  },
  {
    path: '*.*',
    component: NotfoundedComponent,
    data: { title: 'error 404' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
