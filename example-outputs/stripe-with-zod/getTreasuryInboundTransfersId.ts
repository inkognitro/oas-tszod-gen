import {
  z_Treasury_Inbound_transfer,
  z_Error,
  Treasury_Inbound_transfer,
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

export const getTreasuryInboundTransfersIdEndpointSchema = {
  path: '/v1/treasury/inbound_transfers/{id}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    id: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Treasury_Inbound_transfer,
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

export type GetTreasuryInboundTransfersIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTreasuryInboundTransfersIdResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Inbound_transfer>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryInboundTransfersIdRequestResult = RequestResult<
  GetTreasuryInboundTransfersIdRequest,
  GetTreasuryInboundTransfersIdResponse
>;

export function getTreasuryInboundTransfersId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryInboundTransfersIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryInboundTransfersIdRequestResult> {
  return requestHandler.execute(
    createRequest(getTreasuryInboundTransfersIdEndpointSchema, payload),
    config
  );
}
