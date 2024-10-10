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
import {Issuing_Cardholder} from './issuing';
import {Error} from './schemas';

export const getIssuingCardholdersCardholderEndpointSchema = {
  path: '/v1/issuing/cardholders/{cardholder}',
  method: 'get',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {},
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
