import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';

import { ShoppingItem } from './../../models/shopping-item/shopping-item.interface';

@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {

  shoppingItemSubscription: Subscription;
  shoppingItemRef$: FirebaseObjectObservable<ShoppingItem>;
  shoppingItem = {} as ShoppingItem;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private database: AngularFireDatabase) {
    
    // Capturer l'ID d'élément d'achat en tant que paramètre de navigation
    const shoppingItemId = this.navParams.get('shoppingItemId');

    // Déconnectez-vous du NavParam
    console.log(shoppingItemId);

    // Définissez l'étendue de notre objet Firebase égale à l'élément sélectionné
    this.shoppingItemRef$ = this.database.object(`shopping-list/${shoppingItemId}`);

    // Abonnez-vous à l'objet et assignez le résultat à this.shoppingItem
    this.shoppingItemSubscription =
      this.shoppingItemRef$.subscribe(
      shoppingItem => this.shoppingItem = shoppingItem);
  }

  editShoppingItem(shoppingItem: ShoppingItem) {
    // Mettre à jour notre noeud Firebase avec les nouvelles données des éléments
    this.shoppingItemRef$.update(shoppingItem);

    // Renvoyer l'utilisateur à la ShoppingListPage
    this.navCtrl.pop();
  }

  ionViewWillLeave() {
    // Se désabonner de l'Observable en quittant la page
    this.shoppingItemSubscription.unsubscribe();
  }

}
