import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import pl from "../translations/pl.json";
import en from "../translations/en.json";

i18n.use(initReactI18next).init({
  debug: true,
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: {
      translation: en,
    },
    pl: {
      translation: pl,
    },
  },
});

export default i18n;
