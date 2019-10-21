import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Rutas
import { APP_ROUTING } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DictComponent } from './components/dict/dict.component';
import { ArrayComponent } from './components/array/array.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { services } from './services/services';
import { HttpClientModule } from '@angular/common/http';  
import { JwPaginationComponent } from 'jw-angular-pagination';

@NgModule({
  declarations: [
    AppComponent,
    ArrayComponent,
    HomeComponent,
    DictComponent,
    NavbarComponent,
    JwPaginationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    APP_ROUTING,
  ],
  providers: [services],
  bootstrap: [AppComponent]
})
export class AppModule { }
