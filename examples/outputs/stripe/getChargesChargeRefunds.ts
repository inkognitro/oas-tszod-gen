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
import {Refund, Error} from './schemas';

export const getChargesChargeRefundsEndpointSchema = {
  path: '/v1/charges/{charge}/refunds',
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

export type GetChargesChargeRefundsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    charge: string;
  },
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetChargesChargeRefundsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Refund[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetChargesChargeRefundsRequestResult = RequestResult<
  GetChargesChargeRefundsRequest,
  GetChargesChargeRefundsResponse
>;

export function getChargesChargeRefunds(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetChargesChargeRefundsRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetChargesChargeRefundsRequestResult> {
  return requestHandler.execute(
    createRequest(getChargesChargeRefundsEndpointSchema, payload),
    config
  );
}
