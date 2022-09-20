import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';
import { DataStorageService } from '../shared/service/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userObj: Subscription;
  isAuthenticated = false;

  constructor(
    private dataStorageService: DataStorageService, 
    private authService: AuthService) { }

  ngOnInit(): void {
    this.userObj = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    })
  }
  
  onSaveData() {
    this.dataStorageService.toSaveData();
  }

  onFetchData() {
    this.dataStorageService.toFetchdata().subscribe();
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userObj.unsubscribe();
  }
}
