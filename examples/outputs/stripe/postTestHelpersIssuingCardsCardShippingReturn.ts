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
import {Issuing_Card} from './issuing';
import {Error} from './schemas';

export const postTestHelpersIssuingCardsCardShippingReturnEndpointSchema = {
  path: '/v1/test_helpers/issuing/cards/{card}/shipping/return',
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

export type PostTestHelpersIssuingCardsCardShippingReturnRequest = RequestUnion<
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

export type PostTestHelpersIssuingCardsCardShippingReturnResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Issuing_Card>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersIssuingCardsCardShippingReturnRequestResult =
  RequestResult<
    PostTestHelpersIssuingCardsCardShippingReturnRequest,
    PostTestHelpersIssuingCardsCardShippingReturnResponse
  >;

export function postTestHelpersIssuingCardsCardShippingReturn(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersIssuingCardsCardShippingReturnRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersIssuingCardsCardShippingReturnRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersIssuingCardsCardShippingReturnEndpointSchema,
      payload
    ),
    config
  );
}
