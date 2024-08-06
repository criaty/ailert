import { BaseSvgIcon, BaseSvgIconProps } from '@blockium/ui';

type ColorScheme =
  | 'green-green-gray-white'
  | 'green-gray-green-white'
  | 'green-gray-gray-white'
  | 'green-white-green-white'
  | 'green-white-gray-white'
  | 'gray-white-gray-green'
  | 'gray-white-white-green'
  | 'green-white-green-gray'
  | 'green-white-white-gray'
  | 'white-green-white-gray'
  | 'white-green-green-gray'
  | 'white-gray-white-gray'
  | 'green-gray-green-gray'
  | 'transparent-gray-gray-transparent'
  | 'transparent-green-green-transparent'
  | 'green-gray-gray-transparent'
  | 'green-gray-green-transparent'
  | 'green-gray-white-transparent'
  | 'green-green-gray-transparent'
  | 'green-green-white-transparent';

interface AppLogoProps extends BaseSvgIconProps {
  colorScheme?: ColorScheme;
  full?: boolean;
}

type ColorSet = {
  color1: string;
  color2: string;
  color3: string;
  color4: string;
};

type Colors = {
  [key in ColorScheme]: ColorSet;
};

const colors: Colors = {
  'green-green-gray-white': {
    color1: '#329273',
    color2: '#329273',
    color3: '#030b09',
    color4: '#fff',
  },
  'green-gray-green-white': {
    color1: '#329273',
    color2: '#030b09',
    color3: '#329273',
    color4: '#fff',
  },
  'green-gray-gray-white': {
    color1: '#329273',
    color2: '#030b09',
    color3: '#030b09',
    color4: '#fff',
  },
  'green-white-green-white': {
    color1: '#329273',
    color2: '#fff',
    color3: '#329273',
    color4: '#fff',
  },
  'green-white-gray-white': {
    color1: '#329273',
    color2: '#fff',
    color3: '#030b09',
    color4: '#fff',
  },
  'gray-white-gray-green': {
    color1: '#030b09',
    color2: '#fff',
    color3: '#030b09',
    color4: '#329273',
  },
  'gray-white-white-green': {
    color1: '#030b09',
    color2: '#fff',
    color3: '#fff',
    color4: '#329273',
  },
  'green-white-green-gray': {
    color1: '#329273',
    color2: '#fff',
    color3: '#329273',
    color4: '#030b09',
  },
  'green-white-white-gray': {
    color1: '#329273',
    color2: '#fff',
    color3: '#fff',
    color4: '#030b09',
  },
  'white-green-white-gray': {
    color1: '#fff',
    color2: '#329273',
    color3: '#fff',
    color4: '#030b09',
  },
  'white-green-green-gray': {
    color1: '#fff',
    color2: '#329273',
    color3: '#329273',
    color4: '#030b09',
  },
  'white-gray-white-gray': {
    color1: '#fff',
    color2: '#030b09',
    color3: '#fff',
    color4: '#030b09',
  },
  'green-gray-green-gray': {
    color1: '#329273',
    color2: '#030b09',
    color3: '#329273',
    color4: '#030b09',
  },
  'transparent-gray-gray-transparent': {
    color1: 'transparent',
    color2: '#030b09',
    color3: '#030b09',
    color4: 'transparent',
  },
  'transparent-green-green-transparent': {
    color1: 'transparent',
    color2: '#329273',
    color3: '#329273',
    color4: 'transparent',
  },
  'green-gray-gray-transparent': {
    color1: '#329273',
    color2: '#030b09',
    color3: '#030b09',
    color4: '#transparent',
  },
  'green-gray-green-transparent': {
    color1: '#329273',
    color2: '#030b09',
    color3: '#329273',
    color4: '#transparent',
  },
  'green-gray-white-transparent': {
    color1: '#329273',
    color2: '#030b09',
    color3: '#fff',
    color4: '#transparent',
  },
  'green-green-gray-transparent': {
    color1: '#329273',
    color2: '#329273',
    color3: '#030b09',
    color4: '#transparent',
  },
  'green-green-white-transparent': {
    color1: '#329273',
    color2: '#329273',
    color3: '#fff',
    color4: '#transparent',
  },
};

export const AppLogo: React.FC<AppLogoProps> = ({
  colorScheme = 'green-green-gray-white',
  full = true,
  ...props
}) => {
  const { color1, color2, color3, color4 } = colors[colorScheme];
  return (
    <BaseSvgIcon
      width="100%"
      height="100%"
      viewBox={`0 0 ${full ? '512' : '230'} 200`}
      {...props}
    >
      <g fill="none" fillRule="evenodd">
        <path d="m0 0h512v200h-512z" fill={color4} />
        <g fillRule="nonzero">
          <path
            d="m68.48909 136.97818c-37.82548 0-68.48909-30.66361-68.48909-68.48909s30.66361-68.48909 68.48909-68.48909 68.48909 30.66361 68.48909 68.48909c-.072061 37.795591-30.693499 68.417029-68.48909 68.48909zm0-133.96623149c-36.1620267 0-65.47714149 29.31511479-65.47714149 65.47714149 0 36.162027 29.31511479 65.477141 65.47714149 65.477141 36.162027 0 65.477141-29.315114 65.477141-65.477141 0-36.1620267-29.315114-65.47714149-65.477141-65.47714149z"
            fill={color1}
            transform="translate(47 31)"
          />
          <path
            d="m1.50777498 1.1158759c.23911627-.11955813 61.33332172-.95646506 61.57243792-.71734879 1.3151395 1.31513945 2.1520464 12.67316199 2.3911627 26.66146339-19.8466499-2.0324882-28.3352773-17.09681284-28.3352773-17.21637097-2.0324882-3.58674396-7.5321623-2.15204637-7.5321623 2.03248827v64.322275c0 4.0649765 5.3801159 5.7387903 7.6517204 1.793372 1.0760232-1.793372 9.6842087-15.0643247 28.0961611-16.9772548-.3586744 13.3905108-1.0760232 23.9116264-1.9129302 24.8680915-2.6302789 2.1520463-60.61597286 2.749837-62.17022858 0-2.39116264-4.4236509-.11955813-84.64715747.23911626-84.7667156z"
            fill={color2}
            transform="translate(82.251307 55.824873)"
          />
          {full && (
            <path
              d="m53.9317415 56.308077c-5.4567704 4.9286959-12.7618018 7.4810562-20.9469574 7.4810562-17.2504356 0-32.12453558-12.9378266-32.12453558-31.6844734s14.87409998-31.68447341 32.12453558-31.68447341c8.0971432 0 15.3141621 2.64037279 20.5949077 7.30503137l-7.7450935 8.71323024c-3.2564598-2.2883231-7.6570811-3.9605592-12.1457148-3.9605592-11.0895657 0-19.4507462 8.1851556-19.4507462 19.626771s8.3611805 19.626771 19.4507462 19.626771c4.6646586 0 9.2413047-1.7602485 12.5857769-4.4006213zm36.0850947-39.869629c1.1441616 0 2.2003107 0 3.3444722.2640372v12.0577024c-1.0561491-.2640373-2.1122982-.2640373-2.9924225-.2640373-8.4491929 0-15.4021745 6.0728574-16.1942864 14.8741001v19.5387586h-12.5857769v-45.7664616h12.5857769v11.4416154c2.0242858-6.9529817 7.5690687-12.1457148 15.8422367-12.1457148zm23.1472678-15.75422433v10.73751603h-12.585777v-10.73751603zm0 16.45832373v45.7664616h-12.585777v-45.7664616zm42.950064 0h12.585777v45.7664616h-12.585777v-5.6327953c-.264037 1.8482609-4.752671 6.5129195-12.673789 6.5129195-10.473479 0-22.619194-7.5690686-22.619194-23.8513675 0-15.7542242 12.145715-23.5873302 22.619194-23.5873302 7.921118 0 12.409752 4.9286959 12.673789 5.8968326zm-10.913541 35.4690077c6.16087 0 11.529628-4.2245964 11.529628-12.6737894 0-8.1851556-5.368758-12.409752-11.529628-12.409752-6.336894 0-12.145714 4.3126088-12.145714 12.409752 0 8.3611805 5.80882 12.6737894 12.145714 12.6737894zm53.511556-.2640373c2.376335 0 4.136584-.2640372 6.072857-.9681367v10.5614912c-1.936273.8801242-4.928696 1.4962112-9.329317 1.4962112-7.129007 0-13.113852-2.4643479-13.113852-15.4021745v-20.5068953h-6.424907v-10.3854663h6.424907v-10.73751603h12.585777v10.73751603h9.76938v10.3854663h-9.76938v20.4188828c0 2.1122983.616087 4.4006213 3.784535 4.4006213zm50.695157-35.3809953h12.585777l-27.987952 62.6648474h-12.585776l8.36118-18.3065846-19.802796-44.3582628h12.585777l13.377889 30.8043492z"
              fill={color3}
              transform="translate(201.886859 59.490941)"
            />
          )}
        </g>
      </g>
    </BaseSvgIcon>
  );
};

export default AppLogo;
