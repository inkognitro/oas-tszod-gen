import {z_Issuing_Cardholder, Issuing_Cardholder} from './issuing';
import {z_Error, Error} from './schemas';
import {z} from 'zod';
import {
  RequestUnion,
  RequestBodyData,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from './core';

export const getIssuingCardholdersCardholderEndpointSchema = {
  path: '/v1/issuing/cardholders/{cardholder}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    cardholder: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Issuing_Cardholder,
        },
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type GetIssuingCardholdersCardholderRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    cardholder: string;
  },
  {
    expand?: string[];
  }
>;

export type GetIssuingCardholdersCardholderResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Issuing_Cardholder>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetIssuingCardholdersCardholderRequestResult = RequestResult<
  GetIssuingCardholdersCardholderRequest,
  GetIssuingCardholdersCardholderResponse
>;

export function getIssuingCardholdersCardholder(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetIssuingCardholdersCardholderRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetIssuingCardholdersCardholderRequestResult> {
  return requestHandler.execute(
    createRequest(getIssuingCardholdersCardholderEndpointSchema, payload),
    config
  );
}
