import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const HTTP_STATUS_CODE_MESSAGES: Record<number, string> = {
  200: 'OK',
  201: 'CREATED',
  202: 'ACCEPTED',
  204: 'NO CONTENT',
  400: 'BAD REQUEST',
  401: 'UNAUTHORIZED',
  402: 'PAYMENT REQUIRED',
  403: 'FORBIDDEN',
  404: 'NOT FOUND',
  405: 'METHOD NOT ALLOWED',
  406: 'NOT ACCEPTABLE',
  409: 'CONFLICT',
  422: 'UNPROCESSABLE ENTITY',
  429: 'TOO MANY REQUESTS',
  500: 'INTERNAL SERVER ERROR',
};

export function ApiCommonResponses(
  code: number[] = [200, 201, 204, 400, 401, 403, 404, 409, 500],
) {
  const decorators = [];
  for (const c of code) {
    decorators.push(
      ApiResponse({
        status: c,
        description: capitalizeSentence(HTTP_STATUS_CODE_MESSAGES[c]),
      }),
    );
  }
  return applyDecorators(...decorators);
}

export function capitalizeSentence(sentence: string) {
  return sentence
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
