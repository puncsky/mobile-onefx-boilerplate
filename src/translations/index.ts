import * as Locatization from "expo-localization";
import i18n from "i18n-js";
import { en } from "./en";
import { zh } from "./zh";

if (i18n) {
  i18n.fallbacks = true;
  i18n.translations = { zh, en };
  i18n.locale = Locatization.locale;
}

export { i18n };
