import {ActiveParamsType} from "../../../types/active-params.type";
import configNames from "../../config/configNames";
import {Params} from "@angular/router";

export class ActiveParamsUtil {
  static processParams(params: Params): ActiveParamsType {
    const activeParams: ActiveParamsType = {types: []};
    if (params.hasOwnProperty(configNames.types)) {
      activeParams.types = Array.isArray(params[configNames.types]) ? params[configNames.types] : [params[configNames.types]];
    }
    if (params.hasOwnProperty(configNames.heightFrom)) {
      activeParams.heightFrom = params[configNames.heightFrom];
    }
    if (params.hasOwnProperty(configNames.heightTo)) {
      activeParams.heightTo = params[configNames.heightTo];
    }
    if (params.hasOwnProperty(configNames.diameterFrom)) {
      activeParams.diameterFrom = params[configNames.diameterFrom];
    }
    if (params.hasOwnProperty(configNames.diameterTo)) {
      activeParams.diameterTo = params[configNames.diameterTo];
    }
    if (params.hasOwnProperty('sort')) {
      activeParams.sort = params['sort'];
    }
    if (params.hasOwnProperty('page')) {
      activeParams.page = +params['page'];
    }
    return activeParams;
  }
}
