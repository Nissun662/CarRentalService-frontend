import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) {}


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: [''],
      password:['']
    })
  }

  login(): void {
    const user = this.loginForm.value;
    //console.log(user);
    this.userService.login(user).subscribe((user: User) => {
      if(user.role === 'EMPLOYEE'){   // put == EMPLOYEE/CUSTOMER
        //alert('Login success')
        this.router.navigate(['vechile-list'])
        
      } else if(user.role === 'CUSTOMER') {
        this.router.navigate(['list'])
      } else {
        alert('Invalid username or passoword');
      }
    })
    

  }




  

}