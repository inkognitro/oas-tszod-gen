import {
  z_Treasury_Outbound_payment,
  Treasury_Outbound_payment,
} from './treasury';
import {z_Error, Error} from './schemas';
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
} from './core';

export const postTestHelpersTreasuryOutboundPaymentsIdPostEndpointSchema = {
  path: '/v1/test_helpers/treasury/outbound_payments/{id}/post',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    id: z.string(),
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

export type PostTestHelpersTreasuryOutboundPaymentsIdPostRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    id: string;
  }
>;

export type PostTestHelpersTreasuryOutboundPaymentsIdPostResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Outbound_payment>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersTreasuryOutboundPaymentsIdPostRequestResult =
  RequestResult<
    PostTestHelpersTreasuryOutboundPaymentsIdPostRequest,
    PostTestHelpersTreasuryOutboundPaymentsIdPostResponse
  >;

export function postTestHelpersTreasuryOutboundPaymentsIdPost(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersTreasuryOutboundPaymentsIdPostRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersTreasuryOutboundPaymentsIdPostRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersTreasuryOutboundPaymentsIdPostEndpointSchema,
      payload
    ),
    config
  );
}
