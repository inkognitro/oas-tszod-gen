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

export const postTestHelpersIssuingCardsCardShippingReturnEndpointSchema = {
  path: '/v1/test_helpers/issuing/cards/{card}/shipping/return',
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
