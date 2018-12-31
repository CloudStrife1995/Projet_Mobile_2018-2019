import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { AddShoppingPage } from '../add-shopping/add-shopping';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { EditShoppingItemPage } from '../edit-shopping-item/edit-shopping-item';
//import { User } from 'firebase/app';
import { User } from '../../models/user';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  user = {} as User;
  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>

  constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: AngularFireDatabase,
    private actionSheetCtrl: ActionSheetController) {
    /*
      Pointage de shoppingListRef $ sur Firebase -> noeud 'shopping-list' .
      Cela signifie que nous pouvons non seulement pousser les éléments de cette référence vers la base de données, mais nous avons aussi accès à tout ce qui se trouve à l'intérieur de ce noeud. 
    */
    this.shoppingListRef$ = this.database.list('shopping-list');
  }

async login(user: User) {
  try{
    const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    console.log(result);
    if(result){
      this.navCtrl.setRoot(HomePage);
    }
  }
  catch(e){
    console.error(e);
  }
}

  register() {

    this.navCtrl.push(RegisterPage);
  }
  /*
    Affichez une feuille d'action qui offre à l'utilisateur les options suivantes:

    1. Editer le ShoppingItem
    2. Supprimer le ShoppingItem
    3. Annuler la sélection
  */
  selectShoppingItem(shoppingItem: ShoppingItem) {
    this.actionSheetCtrl.create({
      title: `${shoppingItem.itemName}`,
      buttons: [
        {
          text: 'Modifier',
          handler: () => {
            // Envoyez l'utilisateur à EditShoppingItemPage et transmettez la clé en tant que paramètre
            this.navCtrl.push(EditShoppingItemPage,
              { shoppingItemId: shoppingItem.$key });
            
          }
        },
        {
          text: 'Supprimer',
          role: 'destructive',
          handler: () => {
            // Supprimer le ShoppingItem actuel, transmis via le paramètre
            this.shoppingListRef$.remove(shoppingItem.$key);
          }
        },
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log("The user has selected the cancel button");
          }
        }
      ]
    }).present();
  }


  navigateToAddShoppingPage() {
    // Naviguer l'utilisateur vers AddShoppingPage
    this.navCtrl.push(AddShoppingPage);
  }

}
