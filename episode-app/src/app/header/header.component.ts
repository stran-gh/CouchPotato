import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isUserAuthenticated = false;
  private authListenerSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authListenerSubscription = this.authService.getAuthStatusListener().subscribe((isAuthenticated) =>{
      this.isUserAuthenticated = isAuthenticated;
    });
  }

  ngOnDestroy() {
    this.authListenerSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }

}
