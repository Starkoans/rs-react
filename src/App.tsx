import { ErrorBoundary } from './components/error-boundary/error-boundary';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;
