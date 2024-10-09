import {
  z_Issuing_Card,
  z_Error,
  Issuing_Card,
  Error,
} from '@example-outputs/stripe-with-zod';
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
} from '@example-outputs/stripe-with-zod/core';

export const postTestHelpersIssuingCardsCardShippingFailEndpointSchema = {
  path: '/v1/test_helpers/issuing/cards/{card}/shipping/fail',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    card: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Issuing_Card,
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
