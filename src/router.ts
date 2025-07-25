import { AboutPage } from '@/pages/about-page/about-page';
import { HomePage } from '@/pages/home-page/home-page';
import { NotFoundPage } from '@/pages/not-found-page';
import { Layout } from '@components/layout/layout';

import { createBrowserRouter } from 'react-router-dom';

export const ROUTES = {
  about: 'about',
  home: '/',
};

export const router = createBrowserRouter([
  {
    path: ROUTES.home,
    Component: Layout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: ROUTES.about,
        Component: AboutPage,
      },
    ],
  },
  { path: '*', Component: NotFoundPage },
]);
