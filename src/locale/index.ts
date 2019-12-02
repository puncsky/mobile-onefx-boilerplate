import * as Locatization from "expo-localization";
import i18n from "i18n-js";
import { en } from "./en";
import { zh } from "./zh";
i18n.fallbacks = true;
i18n.translations = { zh, en };
i18n.locale = Locatization.locale;
export default i18n;
