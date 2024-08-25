import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Mocked users for simplicity
  signup(username: string, password: string): boolean {
    // Check if user exists
    if (localStorage.getItem(username)) {
      return false; // User already exists
    }

    // Store user details
    localStorage.setItem(username, JSON.stringify({ username, password }));
    return true;
  }

  login(username: string, password: string): boolean {
    const user = localStorage.getItem(username);
    
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.password === password) {
        // Set the session in localStorage
        localStorage.setItem('session', JSON.stringify({ username }));
        return true;
      }
    }

    return false; // Invalid username or password
  }

  logout(): void {
    localStorage.removeItem('session');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('session'); // Check if session exists
  }

  getCurrentUser(): string | null {
    const session = localStorage.getItem('session');
    return session ? JSON.parse(session).username : null;
  }
}
