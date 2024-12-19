import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PasswordRepeatDirective} from "./directives/password-repeat.directive";
import {ProductCardComponent} from './components/product-card/product-card.component';
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CategoryFilterComponent} from './components/category-filter/category-filter.component';
import { ProductsCarouselComponent } from './components/products-carousel/products-carousel.component';
import {CarouselModule} from "ngx-owl-carousel-o";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CountSelectorComponent } from './components/count-selector/count-selector.component';
import { LoaderComponent } from './components/loader/loader.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { FavouriteProductComponent } from './components/favourite-product/favourite-product.component';


@NgModule({
  declarations: [
    PasswordRepeatDirective,
    ProductCardComponent,
    CategoryFilterComponent,
    ProductsCarouselComponent,
    NotFoundComponent,
    CountSelectorComponent,
    LoaderComponent,
    FavouriteProductComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        CarouselModule,
        MatProgressSpinnerModule
    ],
  exports: [
    PasswordRepeatDirective,
    ProductCardComponent,
    CategoryFilterComponent,
    ProductsCarouselComponent,
    CountSelectorComponent,
    LoaderComponent,
    FavouriteProductComponent
  ]
})
export class SharedModule {
}
