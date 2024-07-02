import { HttpStatus } from '@nestjs/common';
import { ResponseJson } from '@/utils/response-json';
export function dateToEpoch(date: Date | number) {
  return new Date(date).getTime();
}
export const epochToDate = (epoch: number) => new Date(epoch);

export const dateFormat = (date: Date) =>
  date.toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'medium' });

export const debugConsole = (payload: any) => {
  process.env.NODE_ENV === 'development' && console.log(payload);
};

export const response500 = (): ResponseJson => ({
  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  statusMessage: 'INTERNAL SERVER ERROR',
});
