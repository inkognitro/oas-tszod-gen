import {
  z_Treasury_Outbound_payment,
  z_Error,
  Treasury_Outbound_payment,
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

export const postTestHelpersTreasuryOutboundPaymentsIdEndpointSchema = {
  path: '/v1/test_helpers/treasury/outbound_payments/{id}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    id: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        tracking_details: z.object({
          ach: z
            .object({
              trace_id: z.string(),
            })
            .optional(),
          type: z.enum(['ach', 'us_domestic_wire']),
          us_domestic_wire: z
            .object({
              chips: z.string().optional(),
              imad: z.string().optional(),
              omad: z.string().optional(),
            })
            .optional(),
        }),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Treasury_Outbound_payment,
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

export type PostTestHelpersTreasuryOutboundPaymentsIdRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      tracking_details: {
        ach?: {
          trace_id: string;
        };
        type: 'ach' | 'us_domestic_wire';
        us_domestic_wire?: {
          chips?: string;
          imad?: string;
          omad?: string;
        };
      };
    }
  >,
  {
    id: string;
  }
>;

export type PostTestHelpersTreasuryOutboundPaymentsIdResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Outbound_payment>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersTreasuryOutboundPaymentsIdRequestResult =
  RequestResult<
    PostTestHelpersTreasuryOutboundPaymentsIdRequest,
    PostTestHelpersTreasuryOutboundPaymentsIdResponse
  >;

export function postTestHelpersTreasuryOutboundPaymentsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersTreasuryOutboundPaymentsIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersTreasuryOutboundPaymentsIdRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersTreasuryOutboundPaymentsIdEndpointSchema,
      payload
    ),
    config
  );
}
