import { Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from './components/register/register.component';
import { ProductListComponent } from "./components/product/product-list/product-list.component";
import { ProductAddEditComponent } from "./components/product/product-add-edit/product-add-edit.component";
import { ProductDetailComponent } from "./components/product/product-detail/product-detail.component";
import { NavbarComponent } from "./components/navbar/navbar.component";

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Navbar layout parent
  {
    path: '',
    component: NavbarComponent,   // Navbar always visible
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductListComponent },
      { path: 'product/add', component: ProductAddEditComponent },
      { path: 'product/edit/:id', component: ProductAddEditComponent },
      { path: 'product/:id', component: ProductDetailComponent },
      { path: '', redirectTo: 'products', pathMatch: 'full' }, // fixed redirect
    ]
  },

  { path: '**', redirectTo: 'login', pathMatch: 'full' },  // catch-all
];
