import {Component, Input, OnInit} from '@angular/core';
import {CategoryWithTypeType} from "../../../../types/category-with-type.type";
import {ActivatedRoute, Router} from "@angular/router";
import {ActiveParamsType} from "../../../../types/active-params.type";
import configNames from "../../../config/configNames";
import {ActiveParamsUtil} from "../../utils/active-params.util";

@Component({
  selector: 'category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {

  @Input() categoryWithTypes: CategoryWithTypeType | null = null;
  @Input() type: string | null = null;
  open = false;
  activeParams: ActiveParamsType = {types: []};

  to: number | null = null;
  from: number | null = null;

  get title(): string {
    if (this.categoryWithTypes) {
      return this.categoryWithTypes.name;
    } else if (this.type) {
      if (this.type === 'height') {
        return 'Высота';
      } else if (this.type === 'diameter') {
        return 'Диаметр';
      }
    }

    return '';
  }

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
        this.activeParams = ActiveParamsUtil.processParams(params);
        if (this.type) {
          if (this.type === 'height') {
            if (this.activeParams.heightFrom || this.activeParams.heightTo) {
              this.open = true;
            }
            this.from = this.activeParams.heightFrom ? +this.activeParams.heightFrom : null;
            this.to = this.activeParams.heightTo ? +this.activeParams.heightTo : null;
          } else if (this.type === 'diameter') {
            if (this.activeParams.diameterFrom || this.activeParams.diameterTo) {
              this.open = true;
            }
            this.from = this.activeParams.diameterFrom ? +this.activeParams.diameterFrom : null;
            this.to = this.activeParams.diameterTo ? +this.activeParams.diameterTo : null;
          }
        } else {
          if (params[configNames.types]) {
            this.activeParams.types = Array.isArray(params[configNames.types]) ? params[configNames.types] : [params[configNames.types]];
          }

          if (this.categoryWithTypes && this.categoryWithTypes.types && this.categoryWithTypes.types.length > 0 &&
            this.categoryWithTypes.types.some(type => this.activeParams.types.includes(type.url))) {
            this.open = true;
          }
        }
      });
  }

  toggle(): void {
    this.open = !this.open;
  }

  updateFilterParam(url: string, checked: boolean) {

    if (this.activeParams.types && this.activeParams.types.length > 0) {
      const existingTypeInParams = this.activeParams.types.find(item => item === url);
      if (existingTypeInParams && !checked) {
        this.activeParams.types = this.activeParams.types.filter(item => item !== url);
      } else if (!existingTypeInParams && checked) {
        // this.activeParams.types.push(url);
        this.activeParams.types = [...this.activeParams.types, url];
      }
    } else if (checked) {
      this.activeParams.types = [url];
    }
    this.activeParams.page = 1;
    this.router.navigate(['/catalog'], {
      queryParams: this.activeParams
    }).then();
  }

  updateFilterParamFromTo(param: string, value: string) {
    if (param === 'heightFrom' || param === 'heightTo' || param === 'diameterFrom' || param === 'diameterTo') {
      if (this.activeParams[param] && !value) {
        delete this.activeParams[param];
      } else {
        this.activeParams[param] = value;
      }
      this.activeParams.page = 1;
      this.router.navigate(['/catalog'], {
        queryParams: this.activeParams
      }).then();
    }
  }
}
