'use client';

import { messages } from '@app/lib/messages';

export default function Error({ error }: { error: Error }) {
  return (
    <div role="alert">
      <p>{messages.errors.oops}</p>
      <p> {error.message}</p>
    </div>
  );
}
