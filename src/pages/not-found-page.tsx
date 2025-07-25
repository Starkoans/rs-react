import { ROUTES } from '@/router';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(ROUTES.home);
  };

  return (
    <div>
      <h1>Page Not Found</h1>
      <button onClick={handleBack}>To main page</button>
    </div>
  );
};
