import { I18n } from "i18n-js";
import { getLocales } from "expo-localization";

export function useTranslation({ fr, en }: { fr: Object; en: Object }) {
  const i18n = new I18n({ fr, en });
  i18n.locale = getLocales()[0].languageCode ?? "en";
  i18n.enableFallback = true;
  const t = i18n.t.bind(i18n);
  return { ...i18n, t };
}
