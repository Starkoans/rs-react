'use client';

import { messages } from '@app/lib/messages';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div role="alert">
      <p>{messages.errors.oops}</p>
      <p> {error.message}</p>
      <button
        onClick={() => {
          reset();
        }}
      >
        {messages.buttons.reload}
      </button>
    </div>
  );
}
