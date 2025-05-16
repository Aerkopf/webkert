import { Injectable } from '@angular/core';
import { Route } from '../interfaces/route';
import { Routes } from '../../../assets/constants/routes';
import { addDoc, doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { firstValueFrom, take } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class PublicTransportStorageService {

  private savedTransports: Route[] = [];

  constructor(private firestore:Firestore, private authService: AuthService) {    
   }

   async getSavedTransport():Promise<Route[]> {

    try{
        const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
        if(!user) {
          throw new Error('Nincs bejelentkezve felhasználó!');
        }

        const userDocRef = doc(this.firestore, 'Users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if(userDoc.exists()) {
          const userData = userDoc.data() as User;
          const jaratok = userData.jaratok || [];
          if(jaratok){
            for(let id of jaratok){
              this.savedTransports = Routes.filter(route => jaratok.includes(route.route_id));
            }
          }
        }
      } catch(error){
        console.error("Hiba a lekéréskor:", error);
        throw error;
      }

    return this.savedTransports;
   }

  async addVehicle(id: number): Promise<void>{
    if(id){
      try{
        const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
        if(!user) {
          throw new Error('Nincs bejelentkezve felhasználó!');
        }

        const userDocRef = doc(this.firestore, 'Users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if(userDoc.exists()) {
          const userData = userDoc.data() as User;
          const jaratok = userData.jaratok || [];
          if(!jaratok.includes(id)){
            jaratok.push(id);
            await updateDoc(userDocRef, { jaratok });
          }
        }
      } catch(error){
        console.error("Hiba a mentéskor:", error);
        throw error;
      }
    }
  }

    


  async removeVehicle(id: number): Promise<void>{
     try{
      console.log(id);
      setInterval(() => {

      }, 3000);
        const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
        if(!user) {
          throw new Error('Nincs bejelentkezve felhasználó!');
        }

        const userDocRef = doc(this.firestore, 'Users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if(userDoc.exists()) {
          const userData = userDoc.data() as User;
          var jaratok = userData.jaratok || [];
          jaratok = jaratok.filter(r_id => r_id != id)
          await updateDoc(userDocRef, {jaratok})
          this.savedTransports = Routes.filter(route => jaratok.includes(route.route_id));
        }
      } catch(error){
        console.error("Hiba a lekéréskor:", error);
        throw error;
      }
  }

  async removeAll():Promise<void>{
    try{
        const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
        if(!user) {
          throw new Error('Nincs bejelentkezve felhasználó!');
        }

        const userDocRef = doc(this.firestore, 'Users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if(userDoc.exists()) {
          const userData = userDoc.data() as User;
          var jaratok = userData.jaratok || [];
          if(jaratok){
            jaratok = []
            await updateDoc(userDocRef, {jaratok})
            this.savedTransports = [];
          }
        }
      } catch(error){
        console.error("Hiba a lekéréskor:", error);
        throw error;
      }
  }
}
