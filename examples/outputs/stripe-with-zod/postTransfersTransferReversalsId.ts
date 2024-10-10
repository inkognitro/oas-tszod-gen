import {
  z_Transfer_reversal,
  z_Error,
  Transfer_reversal,
  Error,
} from './schemas';
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

export const postTransfersTransferReversalsIdEndpointSchema = {
  path: '/v1/transfers/{transfer}/reversals/{id}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    id: z.string(),
    transfer: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Transfer_reversal,
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

export type PostTransfersTransferReversalsIdRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
    }
  >,
  {
    id: string;
    transfer: string;
  }
>;

export type PostTransfersTransferReversalsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Transfer_reversal>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTransfersTransferReversalsIdRequestResult = RequestResult<
  PostTransfersTransferReversalsIdRequest,
  PostTransfersTransferReversalsIdResponse
>;

export function postTransfersTransferReversalsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTransfersTransferReversalsIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTransfersTransferReversalsIdRequestResult> {
  return requestHandler.execute(
    createRequest(postTransfersTransferReversalsIdEndpointSchema, payload),
    config
  );
}
