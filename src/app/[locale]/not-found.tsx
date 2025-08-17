'use client';

import { useRouter } from 'next/navigation';
import { messages } from '../lib/messages';
import { ROUTES } from '../lib/constants';

export default function NotFoundPage() {
  const { replace } = useRouter();

  const handleBack = () => {
    replace(ROUTES.home);
  };

  return (
    <section>
      <h1>{messages.headers.notFound}</h1>
      <button onClick={handleBack}>{messages.buttons.toMainPage}</button>
    </section>
  );
}
