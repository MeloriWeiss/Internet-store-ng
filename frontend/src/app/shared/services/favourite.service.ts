import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {FavouriteType} from "../../../types/favourite.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {AuthService} from "../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProductType} from "../../../types/product.type";

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor(private http: HttpClient,
              private authService: AuthService,
              private _snackBar: MatSnackBar) {
  }

  getFavourites(): Observable<FavouriteType[] | DefaultResponseType> {
    return this.http.get<FavouriteType[] | DefaultResponseType>(environment.api + 'favorites');
  }

  removeFavourite(productId: string): Observable<DefaultResponseType> {
    return this.http.delete<DefaultResponseType>(environment.api + 'favorites', {body: {productId}});
  }

  addFavourite(productId: string): Observable<FavouriteType | DefaultResponseType> {
    return this.http.post<FavouriteType | DefaultResponseType>(environment.api + 'favorites', {productId});
  }

  updateFavourite(product: ProductType): ProductType {
    if (!this.authService.getIsLoggedIn()) {
      this._snackBar.open('Для добавления в избранное необходимо авторизоваться');
      return product;
    }
    if (product.isInFavourite) {
      this.removeFavourite(product.id)
        .subscribe((data: DefaultResponseType) => {
          if (data.error) {
            throw new Error(data.message);
          }
          product.isInFavourite = false;
        });
    } else {
      this.addFavourite(product.id)
        .subscribe((data: FavouriteType | DefaultResponseType) => {
          if ((data as DefaultResponseType).error !== undefined) {
            throw new Error((data as DefaultResponseType).message);
          }
          product.isInFavourite = true;
        });
    }
    return product;
  }
}
