import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FavouriteType} from "../../../../types/favourite.type";
import {environment} from "../../../../environments/environment";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {CartType} from "../../../../types/cart.type";
import {FavouriteService} from "../../services/favourite.service";
import {CartService} from "../../services/cart.service";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
  selector: 'favourite-product',
  templateUrl: './favourite-product.component.html',
  styleUrls: ['./favourite-product.component.scss']
})
export class FavouriteProductComponent implements OnInit {

  @Input() product!: FavouriteType;
  @Output() removedProductId: EventEmitter<string> = new EventEmitter<string>();
  count: number = 1;
  serverStaticPath = environment.serverStaticPath;

  constructor(private favouriteService: FavouriteService,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    if (this.product.countInCart) {
      this.count = this.product.countInCart;
    }
  }

  removeFromFavourites() {
    this.favouriteService.removeFavourite(this.product.id)
      .subscribe((data: DefaultResponseType) => {
        if (data.error) {
          throw new Error(data.message);
        }
        this.removedProductId.emit(this.product.id);
      });
  }

  addToCart() {
    this.cartService.updateCart(this.product.id, this.count)
      .subscribe((data: CartType | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          throw new Error((data as DefaultResponseType).message);
        }
        this.product.countInCart = this.count;
      });
  }

  updateCount(count: number) {
    this.count = count;
    if (this.product.countInCart) {
      this.cartService.updateCart(this.product.id, this.count)
        .subscribe((data: CartType | DefaultResponseType) => {
          if ((data as DefaultResponseType).error !== undefined) {
            throw new Error((data as DefaultResponseType).message);
          }
          this.product.countInCart = this.count;
        });
    }
  }

  removeFromCart() {
    this.cartService.updateCart(this.product.id, 0)
      .subscribe((data: CartType | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          throw new Error((data as DefaultResponseType).message);
        }
        this.product.countInCart = 0;
        this.count = 1;
      });
  }
}
