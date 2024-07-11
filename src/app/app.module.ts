import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckouUserProfileComponent } from './checkou-user-profile/checkou-user-profile.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './Auth/sign-in/sign-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './Auth/profile/profile.component';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from "@auth0/angular-jwt";
import { CommonModule } from '@angular/common';
import { AuthInterceptor } from './auth.interceptor';
import { LikedListComponent } from './liked-list/liked-list.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { OrdersComponent } from './orders/orders.component';
export function tokenGetter() {
  return localStorage.getItem("access_token");
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookListComponent,
    BookDetailComponent,
    CartComponent,
    CheckoutComponent,
    CheckouUserProfileComponent,
    HeaderComponent,
    FooterComponent,
    SignUpComponent,
    SignInComponent,
    ProfileComponent,
    LikedListComponent,
    ProfileDetailsComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["example.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
