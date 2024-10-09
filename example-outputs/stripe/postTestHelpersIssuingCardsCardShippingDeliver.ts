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

export const postTestHelpersIssuingCardsCardShippingDeliverEndpointSchema = {
  path: '/v1/test_helpers/issuing/cards/{card}/shipping/deliver',
  method: 'post',
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

export type PostTestHelpersIssuingCardsCardShippingDeliverRequest =
  RequestUnion<
    RequestBodyData<
      'application/x-www-form-urlencoded',
      {
        expand?: string[];
      }
    >,
    {
      card: string;
    }
  >;

export type PostTestHelpersIssuingCardsCardShippingDeliverResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Issuing_Card>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersIssuingCardsCardShippingDeliverRequestResult =
  RequestResult<
    PostTestHelpersIssuingCardsCardShippingDeliverRequest,
    PostTestHelpersIssuingCardsCardShippingDeliverResponse
  >;

export function postTestHelpersIssuingCardsCardShippingDeliver(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersIssuingCardsCardShippingDeliverRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersIssuingCardsCardShippingDeliverRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersIssuingCardsCardShippingDeliverEndpointSchema,
      payload
    ),
    config
  );
}
