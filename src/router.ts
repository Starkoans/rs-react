import { Layout } from '@components/layout';
import { AboutPage } from '@pages/about-page';
import { HomePage } from '@pages/home-page';

import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: '/about',
        Component: AboutPage,
      },
    ],
  },
]);
