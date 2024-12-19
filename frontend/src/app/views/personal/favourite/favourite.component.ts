import {Component, OnInit} from '@angular/core';
import {FavouriteService} from "../../../shared/services/favourite.service";
import {FavouriteType} from "../../../../types/favourite.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {CartType} from "../../../../types/cart.type";
import {CartService} from "../../../shared/services/cart.service";

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {

  products: FavouriteType[] = [];
  cart: CartType | null = null;

  constructor(private favouriteService: FavouriteService,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartService.getCart()
      .subscribe((data: CartType | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          throw new Error((data as DefaultResponseType).message);
        }
        this.cart = data as CartType;
        if (this.cart && this.cart.items && this.cart.items.length) {
          this.favouriteService.getFavourites()
            .subscribe((data: FavouriteType[] | DefaultResponseType) => {
              if ((data as DefaultResponseType).error !== undefined) {
                const error = (data as DefaultResponseType).message;
                throw new Error(error);
              }
              this.products = data as FavouriteType[];
              this.products.forEach(product => {
                const productInCart = this.cart?.items.find(item => item.product.id === product.id);
                if (productInCart) {
                  product.countInCart = productInCart.quantity;
                }
              });
            });
        }
      });
  }

  removeFromFavourites(productId: string) {
    this.products = this.products.filter(item => item.id !== productId);
  }
}
