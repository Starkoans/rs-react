'use client';

import { messages } from './lib/messages';

export default function NotFoundPage() {
  // const navigate = useNavigate();

  // const handleBack = () => {
  //   navigate(ROUTES.home);
  // };

  return (
    <section>
      <h1>{messages.headers.notFound}</h1>
      {/* <button onClick={handleBack}>{messages.buttons.toMainPage}</button> */}
    </section>
  );
}
