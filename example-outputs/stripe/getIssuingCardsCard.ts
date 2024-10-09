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
} from '@example-outputs/stripe/core';
import {Issuing_Card, Error} from '@example-outputs/stripe';

export const getIssuingCardsCardEndpointSchema = {
  path: '/v1/issuing/cards/{card}',
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

export type GetIssuingCardsCardRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    card: string;
  },
  {
    expand?: string[];
  }
>;

export type GetIssuingCardsCardResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Issuing_Card>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetIssuingCardsCardRequestResult = RequestResult<
  GetIssuingCardsCardRequest,
  GetIssuingCardsCardResponse
>;

export function getIssuingCardsCard(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetIssuingCardsCardRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetIssuingCardsCardRequestResult> {
  return requestHandler.execute(
    createRequest(getIssuingCardsCardEndpointSchema, payload),
    config
  );
}
