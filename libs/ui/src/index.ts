import { addResourceBundles } from '@blockium/i18n';
import en from './lib/locales/en/translation.json';
import pt_BR from './lib/locales/pt-BR/translation.json';

addResourceBundles([
  { lng: 'en', ns: 'ui', resources: en },
  { lng: 'pt-BR', ns: 'ui', resources: pt_BR },
]);

export * from './lib/camera';
export * from './lib/gemini';
export * from './lib/hooks';
export * from './lib/loading';
export * from './lib/logo';
export * from './lib/utils';
