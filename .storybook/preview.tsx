import React from 'react';
import type { Preview } from '@storybook/react';
import { Global, ThemeProvider, css } from '@emotion/react';
import { elekibear } from '../src/theme/theme';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

// グローバルのスタイル
const styleGlobal = css`
  html,
  body,
  textarea {
    margin: 0;
    padding: 0;
    font-family: 'Helvetica Neue', Arial, 'Hiragino Kaku Gothic ProN',
      'Hiragino Sans', 'BIZ UDPGothic', Meiryo, sans-serif;
  }
`;

export const decorators = [
  (Story) => (
    <ThemeProvider theme={elekibear}>
      <Global styles={styleGlobal} />
      <Story />
    </ThemeProvider>
  ),
];

export default preview;
