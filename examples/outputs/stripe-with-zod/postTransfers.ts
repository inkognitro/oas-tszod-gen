import {z_Transfer, z_Error, Transfer, Error} from './schemas';
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

export const postTransfersEndpointSchema = {
  path: '/v1/transfers',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amount: z.number().int().safe().finite().optional(),
        currency: z.string(),
        description: z.string().optional(),
        destination: z.string(),
        expand: z.array(z.string()).optional(),
        metadata: z.record(z.string()).optional(),
        source_transaction: z.string().optional(),
        source_type: z.enum(['bank_account', 'card', 'fpx']).optional(),
        transfer_group: z.string().optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Transfer,
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

export type PostTransfersRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount?: number; // int
      currency: string;
      description?: string;
      destination: string;
      expand?: string[];
      metadata?: {
        [key: string]: string;
      };
      source_transaction?: string;
      source_type?: 'bank_account' | 'card' | 'fpx';
      transfer_group?: string;
    }
  >
>;

export type PostTransfersResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Transfer>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTransfersRequestResult = RequestResult<
  PostTransfersRequest,
  PostTransfersResponse
>;

export function postTransfers(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostTransfersRequest, 'contentType' | 'body', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostTransfersRequestResult> {
  return requestHandler.execute(
    createRequest(postTransfersEndpointSchema, payload),
    config
  );
}
