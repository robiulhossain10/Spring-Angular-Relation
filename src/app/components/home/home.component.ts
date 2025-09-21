import { Component } from '@angular/core';
import {UpperCasePipe} from "@angular/common";
import {NavbarComponent} from "../navbar/navbar.component";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    UpperCasePipe,
    NavbarComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  name = 'Robiul Hossain';




}
