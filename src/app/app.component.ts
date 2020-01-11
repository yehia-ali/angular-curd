import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsersService } from '../app/users/users.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  closeResult: string;
  UserForm: FormGroup;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router,
    private usersService: UsersService
  ) { }
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.UserForm = this.formBuilder.group({
      first_name: ['', Validators.compose([Validators.required])],
      last_name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      avatar: ['', Validators.compose([Validators.required])],
    });
  }
  addUser() {
    const payload = {
      first_name: this.UserForm.controls.first_name.value,
      last_name: this.UserForm.controls.last_name.value,
      email: this.UserForm.controls.email.value,
      avatar: this.UserForm.controls.avatar.value,
    };

    this.usersService.addUser(payload)
      .subscribe(res => {
        const id = res['_id'];
        this.router.navigate(['/']);
      }, (err) => {
        console.log(err);
      });
  }

}
