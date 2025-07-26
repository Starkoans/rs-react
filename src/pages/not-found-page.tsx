import { ROUTES } from '@/router';
import { messages } from '@/sources/messages';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(ROUTES.home);
  };

  return (
    <div>
      <h1>{messages.headers.notFound}</h1>
      <button onClick={handleBack}>{messages.buttons.toMainPage}</button>
    </div>
  );
};
