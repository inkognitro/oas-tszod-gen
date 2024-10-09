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

export const postTestHelpersIssuingCardsCardShippingShipEndpointSchema = {
  path: '/v1/test_helpers/issuing/cards/{card}/shipping/ship',
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

export type PostTestHelpersIssuingCardsCardShippingShipRequest = RequestUnion<
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

export type PostTestHelpersIssuingCardsCardShippingShipResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Issuing_Card>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersIssuingCardsCardShippingShipRequestResult =
  RequestResult<
    PostTestHelpersIssuingCardsCardShippingShipRequest,
    PostTestHelpersIssuingCardsCardShippingShipResponse
  >;

export function postTestHelpersIssuingCardsCardShippingShip(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersIssuingCardsCardShippingShipRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersIssuingCardsCardShippingShipRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersIssuingCardsCardShippingShipEndpointSchema,
      payload
    ),
    config
  );
}
