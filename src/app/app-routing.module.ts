import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookListComponent } from './book-list/book-list.component';
import { CartComponent } from './cart/cart.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { SignInComponent } from './Auth/sign-in/sign-in.component';
import { ProfileComponent } from './Auth/profile/profile.component';
import { AuthGuard } from './guard/auth.guard';
import { LikedListComponent } from './liked-list/liked-list.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'books',component:BookListComponent},
  {path:'bookDetails/:id',component:BookDetailComponent},
  {path:'orders',component:CartComponent, canActivate: [AuthGuard] },
  // {path:'liked-list',component:LikedListComponent, canActivate: [AuthGuard] },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: 'details', component: ProfileDetailsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'liked-items', component: LikedListComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
