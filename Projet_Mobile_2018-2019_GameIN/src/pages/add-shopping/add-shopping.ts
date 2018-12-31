import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';

@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

  // Creation d'un nouvel objet 
  shoppingItem = {} as ShoppingItem;

  shoppingItemRef$: FirebaseListObservable<ShoppingItem[]>

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    this.shoppingItemRef$ = this.database.list('shopping-list');

  }
  
  addShoppingItem(shoppingItem: ShoppingItem) {
    /*
      Créer un objet anonyme et convertir itemNumber à un numéro.
      Envoyez ceci à notre base de données Firebase sous le noeud 'shopping-list'.
    */
    this.shoppingItemRef$.push({
      itemName: this.shoppingItem.itemName,
      itemDetail: this.shoppingItem.itemDetail,
      itemNumber: Number(this.shoppingItem.itemNumber)
    });

    // Réinitialiser notre ShoppingItem
    this.shoppingItem = {} as ShoppingItem;

    // Revenez à l'utilisateur jusqu'à la page ShoppingList
    this.navCtrl.pop();
  }

}
