import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor( private firestore: AngularFirestore) { }
  /* Obtener desayuno */
    public getMenu(tipoDeHorario: string) {
      
      return this.firestore.collection('menu', ref => ref.where('horario', '==', tipoDeHorario)).snapshotChanges();
    }
  /* Obtener menu del resto del día */
  public getOther() {
    return this.firestore;
  }
  }

