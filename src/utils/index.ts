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

export const response404 = (message?: string): ResponseJson => ({
  statusCode: HttpStatus.NOT_FOUND,
  statusMessage: 'NOT FOUND',
  message: message || 'Data not found',
});
export const response409 = (): ResponseJson => ({
  statusCode: HttpStatus.CONFLICT,
  statusMessage: 'CONFLICT',
  message: 'Data already exist',
});

export const response200 = ({
  data,
  message,
}: {
  data?: any;
  message?: any;
}): ResponseJson => ({
  statusCode: HttpStatus.OK,
  statusMessage: 'OK',
  message: message || 'OK',
  data,
});

export const response201 = (data: any): ResponseJson => ({
  statusCode: HttpStatus.CREATED,
  statusMessage: 'CREATED',
  message: 'Data created',
  data,
});

export const getOffset = (page: number, limit: number) => (page - 1) * limit;
export const getTotalPage = (total: number, limit: number) =>
  Math.ceil(total / limit);
