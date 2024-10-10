import {
  z_Treasury_Inbound_transfer,
  Treasury_Inbound_transfer,
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

export const postTestHelpersTreasuryInboundTransfersIdReturnEndpointSchema = {
  path: '/v1/test_helpers/treasury/inbound_transfers/{id}/return',
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

export type PostTestHelpersTreasuryInboundTransfersIdReturnRequest =
  RequestUnion<
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

export type PostTestHelpersTreasuryInboundTransfersIdReturnResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Inbound_transfer>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersTreasuryInboundTransfersIdReturnRequestResult =
  RequestResult<
    PostTestHelpersTreasuryInboundTransfersIdReturnRequest,
    PostTestHelpersTreasuryInboundTransfersIdReturnResponse
  >;

export function postTestHelpersTreasuryInboundTransfersIdReturn(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersTreasuryInboundTransfersIdReturnRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersTreasuryInboundTransfersIdReturnRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersTreasuryInboundTransfersIdReturnEndpointSchema,
      payload
    ),
    config
  );
}
