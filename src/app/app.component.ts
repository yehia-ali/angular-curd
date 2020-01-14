import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsersService } from './shared/services';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  model: any = {};
  dataFromServer: any = [];

  closeResult: string;
  UserForm: FormGroup;
  returnUrl: string;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private authService: AuthService
  ) { }
  
  ngOnInit() {
    this.UserForm = this.formBuilder.group({
      first_name: ['', Validators.compose([Validators.required])],
      last_name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      avatar: ['', Validators.compose([Validators.required])],
    });

    // 
    this.getSomePrivateStuff();
  }
  getSomePrivateStuff() {
    this.model.action = 'stuff';
    this.authService.getData(this.model).subscribe(response => {
       if (response.status === 'success') {
        this.dataFromServer = response['data']['Coords'];
       }
    }, error => {
      this.authService.logout();
    });
  }

  logout(){
    this.authService.logout();
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
  
}
