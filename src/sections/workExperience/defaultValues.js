import * as generalFieldsObj from "./fieldsNames";
import { objectFlip } from "../../utils/helpers";

export function getBlancDefaults() {
  let defaults = objectFlip(generalFieldsObj);
  for (let prop in defaults) {
    defaults[prop] = "";
  }
  return defaults;
}

export function getDataDefaults(data) {
  let defaults = objectFlip(generalFieldsObj);
  for (let prop in defaults) {
    defaults[prop] = data[prop];
  }
  return {
    ...defaults,
    [generalFieldsObj.START_DATE_MONTH]: data["startDate"] ? data["startDate"][0] : "",
    [generalFieldsObj.START_DATE_YEAR]: data["startDate"] ? data["startDate"][1] : "",
    [generalFieldsObj.END_DATE_MONTH]: data["endDate"] ? data["endDate"][0] : "",
    [generalFieldsObj.END_DATE_YEAR]: data["endDate"] ? data["endDate"][1] : "",
  };
}
