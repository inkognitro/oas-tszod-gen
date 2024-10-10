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

export const postTransfersTransferEndpointSchema = {
  path: '/v1/transfers/{transfer}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    transfer: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        description: z.string().optional(),
        expand: z.array(z.string()).optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
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

export type PostTransfersTransferRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      description?: string;
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
    }
  >,
  {
    transfer: string;
  }
>;

export type PostTransfersTransferResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Transfer>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTransfersTransferRequestResult = RequestResult<
  PostTransfersTransferRequest,
  PostTransfersTransferResponse
>;

export function postTransfersTransfer(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTransfersTransferRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTransfersTransferRequestResult> {
  return requestHandler.execute(
    createRequest(postTransfersTransferEndpointSchema, payload),
    config
  );
}
