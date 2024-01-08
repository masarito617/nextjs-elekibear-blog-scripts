import { css } from '@emotion/react';
import { Meta, StoryFn } from '@storybook/react';
import SideWidgetBase from '.';

export default {
  title: 'Widgets／SideWidgetBase',
  argTypes: {
    children: {
      description: '表示する子要素',
    },
    title: {
      control: { type: 'text' },
      description: 'タイトル',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} as Meta<typeof SideWidgetBase>;

// 親のサイズに影響を受けるため外側でラップして幅を指定
const styleSideWidgetWrapper = css`
  width: 300px;
`;
const Template: StoryFn<typeof SideWidgetBase> = (args) => (
  <div css={styleSideWidgetWrapper}>
    <SideWidgetBase {...args}>テストテストテスト</SideWidgetBase>
  </div>
);

export const SampleSideWidget = Template.bind({});
SampleSideWidget.args = {
  title: 'Sample',
};
