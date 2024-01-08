import { SerializedStyles, css } from '@emotion/react';

/** レスポンシブブレークポイント */

export const xl = (childen: SerializedStyles) => {
  return css`
    @media (max-width: 1280px) {
      ${css(childen)}
    }
  `;
};

export const lg = (childen: SerializedStyles) => {
  return css`
    @media (max-width: 1024px) {
      ${css(childen)}
    }
  `;
};

export const md = (childen: SerializedStyles) => {
  return css`
    @media (max-width: 768px) {
      ${css(childen)}
    }
  `;
};

export const sm = (childen: SerializedStyles) => {
  return css`
    @media (max-width: 640px) {
      ${css(childen)}
    }
  `;
};

export const xlWidth = 1280;
export const lgWidth = 1024;
export const mdWidth = 768;
export const smWidth = 640;
