import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { FormsModule } from '@angular/forms';
import { ServiceAdvisorsModule } from './ServiceAdvisors/service-advisors.module';
import { LoginComponent } from './login/login.component';
import { NavlogComponent } from './navlog/navlog.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavlogComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,AdminModule,FormsModule,ServiceAdvisorsModule,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
