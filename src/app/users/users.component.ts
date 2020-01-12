import { Component, OnInit } from '@angular/core';
import { IUser } from '../shared/models';
import { UsersService } from '../shared/services';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: IUser[] = [];
  id: string;

  constructor(
    private usersService: UsersService,
  ) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe(
      data => {
        this.users = data;
      },
      err => {
        console.error(err.message);
      }
    );
  }

  deleteUser(id, index) {
    this.usersService.deleteUser(id)
      .subscribe(res => {
        this.users.splice(index, 1);
      }, (err) => {
        console.log(err);
      }
      );
  }

}
