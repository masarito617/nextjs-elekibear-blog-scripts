import { Meta, StoryFn } from '@storybook/react';
import PostCard from '.';

export default {
  title: 'Home／PostCard',
} as Meta<typeof PostCard>;

const Template: StoryFn<typeof PostCard> = (args) => <PostCard {...args} />;
export const SamplePostCard = Template.bind({});
SamplePostCard.args = {
  src: 'dummy/_dummy.png',
  category: 'Unity',
  title: '【Unity】第一回 シェーダープログラミング入門',
  date: '2023-08-01',
};
