import { Injectable } from '@angular/core';
import { Auth, 
  authState, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut, 
  User as FirebaseUser,
  UserCredential } from '@angular/fire/auth';
import {
  Firestore,
  doc,
  setDoc,
  collection
} from '@angular/fire/firestore'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {User} from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: Observable<FirebaseUser | null>;

  constructor(private auth:Auth, private router:Router, private firestore:Firestore) {
    this.currentUser = authState(this.auth);
   }

   signIn(email: string, password:string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
   }

   signOut(): Promise<void>{
    localStorage.setItem('isLoggedIn', 'false');
    return signOut(this.auth).then(() => {
      this.router.navigateByUrl('/home');
    });
   }

   async signup(email: string, password: string, userData: Partial<User>): Promise<UserCredential>{
    try{
      const userCredential = await createUserWithEmailAndPassword(
        this.auth, email, password
      );
      await this.createUserData(userCredential.user.uid, {
        id: userCredential.user.uid,
        email: email,
        jaratok: []
      });

      return userCredential;
    } catch (error) {
      console.error('Hiba a regisztráció során: '+error);
      throw error;
    }
   }

   private async createUserData(userId: string, userData: Partial<User>): Promise<void>{
    const userRef = doc(collection(this.firestore, 'Users'), userId);

    return setDoc(userRef, userData);
   }

   isLoggedIn():Observable<FirebaseUser | null>{
    return this.currentUser;
   }

   updateLoginStatus(isLoggedIn: boolean): void{
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true': 'false');
   }
}
