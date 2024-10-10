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

export const postTestHelpersIssuingCardsCardShippingFailEndpointSchema = {
  path: '/v1/test_helpers/issuing/cards/{card}/shipping/fail',
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

export type PostTestHelpersIssuingCardsCardShippingFailRequest = RequestUnion<
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

export type PostTestHelpersIssuingCardsCardShippingFailResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Issuing_Card>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersIssuingCardsCardShippingFailRequestResult =
  RequestResult<
    PostTestHelpersIssuingCardsCardShippingFailRequest,
    PostTestHelpersIssuingCardsCardShippingFailResponse
  >;

export function postTestHelpersIssuingCardsCardShippingFail(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersIssuingCardsCardShippingFailRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersIssuingCardsCardShippingFailRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersIssuingCardsCardShippingFailEndpointSchema,
      payload
    ),
    config
  );
}
