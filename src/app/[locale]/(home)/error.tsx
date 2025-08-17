'use client';

import { ROUTES } from '@app/lib/constants';
import { messages } from '@app/lib/messages';
import { redirect } from 'next/navigation';

export default function Error({ error }: { error: Error }) {
  return (
    <div role="alert">
      <p>{messages.errors.oops}</p>
      <p> {error.message}</p>
      <button
        onClick={() => {
          redirect(ROUTES.home);
        }}
      >
        {messages.buttons.reload}
      </button>
    </div>
  );
}
