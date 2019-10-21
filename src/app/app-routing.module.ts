import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ArrayComponent } from './components/array/array.component';
import { HomeComponent } from './components/home/home.component';
import { DictComponent } from './components/dict/dict.component';

const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'array', component: ArrayComponent },
  { path: 'dict', component: DictComponent   },


];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true});
