import '@emotion/react';

declare module '@emotion/react' {
  interface Theme {
    colors: Colors;
    zindex: Zindex;
  }
}

interface Colors {
  primaryYellow: string;
  primaryDarkGray: string;
  primaryLightGray: string;
  primaryWhite: string;
  primaryBlue: string;
  simpleWhite: string;
  simpleBlack: string;
  darkBlue: string;
  blue: string;
  speechLeftBackColor: string;
  speechLeftBorderColor: string;
  speechRightBackColor: string;
  speechRightBorderColor: string;
}

interface Zindex {
  titleLogo: number;
  main: number;
  fixedHeader: number;
  categorySubMenu: number;
  humburgerSubMenu: number;
  humburgerMenuButton: number;
  imagePopup: number;
}
