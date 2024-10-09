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

export const getIssuingCardsEndpointSchema = {
  path: '/v1/issuing/cards',
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

export type GetIssuingCardsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    cardholder?: string;
    created?: (
      | {
          gt?: number; // int
          gte?: number; // int
          lt?: number; // int
          lte?: number; // int
        }
      | number
    ) &
      Partial<{
        gt?: number; // int
        gte?: number; // int
        lt?: number; // int
        lte?: number; // int
      }>;
    ending_before?: string;
    exp_month?: number; // int
    exp_year?: number; // int
    expand?: string[];
    last4?: string;
    limit?: number; // int
    personalization_design?: string;
    starting_after?: string;
    status?: 'active' | 'canceled' | 'inactive';
    type?: 'physical' | 'virtual';
  }
>;

export type GetIssuingCardsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Issuing_Card[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetIssuingCardsRequestResult = RequestResult<
  GetIssuingCardsRequest,
  GetIssuingCardsResponse
>;

export function getIssuingCards(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetIssuingCardsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetIssuingCardsRequestResult> {
  return requestHandler.execute(
    createRequest(getIssuingCardsEndpointSchema, payload),
    config
  );
}
