import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoggedInMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static: true}) alertHost: PlaceholderDirective;
  private closeObs: Subscription;

  constructor(
    private authService: AuthService, 
    private route: Router,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  switchTo() {
    this.isLoggedInMode = !this.isLoggedInMode;
  }

  onSubmit(authForm: NgForm) {
    if(!authForm.valid) {
      return;
    }

    const email = authForm.value.email;
    const password = authForm.value.password
    this.isLoading = true;

    let authObs: Observable<AuthResponseData>

    if(this.isLoggedInMode) {
      authObs = this.authService.login(email, password)
    } else {
      authObs = this.authService.onSignUp(email, password)
    }

    authObs.subscribe((response: AuthResponseData) => {
      console.log('response', response);
      this.isLoading = false;
      this.route.navigateByUrl('/recipes')
    }, errMsg => {
      this.isLoading = false;
      this.error = errMsg;
      this.showErrorAlert(errMsg);
      console.log(errMsg);
    });
    authForm.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(errMsg) {
    const alertCompFacResolver = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostContainerRef = this.alertHost.viewContainerRef;
    hostContainerRef.clear();
    const componetRef = hostContainerRef.createComponent(alertCompFacResolver);
    componetRef.instance.message = errMsg;
    this.closeObs = componetRef.instance.close.subscribe(() => {
      this.closeObs.unsubscribe();
      hostContainerRef.clear();
    })
  }

  ngOnDestroy(): void {
    if(this.closeObs) {
      this.closeObs.unsubscribe();
    }
  }

 }
