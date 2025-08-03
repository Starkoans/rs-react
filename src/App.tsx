import { ErrorBoundary } from './components/error-boundary/error-boundary';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ThemeProvider } from './theme/theme-context';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
