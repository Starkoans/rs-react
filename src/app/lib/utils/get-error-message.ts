import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { SerializedError } from '@reduxjs/toolkit/react';
import { messages } from '../messages';

export const getErrorMessage = (
  err: FetchBaseQueryError | SerializedError
): string => {
  if ('message' in err && typeof err.message !== 'undefined')
    return err.message;
  if ('error' in err) return err.error;
  if ('data' in err && typeof err.data !== 'undefined') return String(err.data);

  return messages.errors.default;
};
