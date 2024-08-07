import { addResourceBundles } from '@blockium/i18n';
import en from './lib/locales/en/translation.json';
import pt_BR from './lib/locales/pt-BR/translation.json';

addResourceBundles([
  { lng: 'en', ns: 'model-types', resources: en },
  { lng: 'pt-BR', ns: 'model-types', resources: pt_BR },
]);

export * from './lib/data';
