import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, NgForm} from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../shared/services';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  UserForm: FormGroup;
  id: string;

  constructor(
    private formBuilder: FormBuilder, 
    private activeAouter: ActivatedRoute, 
    private router: Router, 
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.getDetail(this.activeAouter.snapshot.params['id']);
    this.UserForm = this.formBuilder.group({
      first_name: ['', Validators.compose([Validators.required])],
      last_name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      avatar: ['', Validators.compose([Validators.required])],
    });    
  }
  
  getDetail(id) {
    this.userService.getUser(id)
      .subscribe(data => {
        this.id = data.id;
        this.UserForm.controls['first_name'].setValue(data.first_name);
        this.UserForm.controls['last_name'].setValue(data.last_name);
        this.UserForm.controls['email'].setValue(data.email);
        this.UserForm.controls['avatar'].setValue(data.avatar);
      });

  }
  updateUser(form: NgForm) {
    this.userService.updateUser(this.id, form)
      .subscribe(res => {
        this.router.navigate(['/']);
      }, (err) => {
        console.log(err);
      }
      );
  }
  
 
}