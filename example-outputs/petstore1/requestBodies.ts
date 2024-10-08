import {RequestBodyData} from '@example-outputs/petstore1/core';

export type PostObjectBodyRequestBody = RequestBodyData<
  'application/json',
  {
    expand?: boolean;
    passports?: string[];
  }
>;

export const postObjectBodyRequestBodySchema = {
  'application/json': {},
};

export type PassportsRequestBody = RequestBodyData<
  'application/json',
  {
    passports?: string[];
  }
>;

export const passportsRequestBodySchema = {
  'application/json': {},
};
