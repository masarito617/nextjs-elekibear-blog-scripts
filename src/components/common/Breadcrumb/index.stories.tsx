import { Meta } from '@storybook/react';
import BreadcrumbItem from './BreadcrumbItem';
import Breadcrumb from './index';

export default { title: 'Molecules/Breadcrumb' } as Meta<typeof Breadcrumb>;

export const Standard = () => (
  <Breadcrumb>
    <BreadcrumbItem>テスト</BreadcrumbItem>
  </Breadcrumb>
);

export const Home = () => <Breadcrumb />;
