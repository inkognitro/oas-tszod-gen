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

export const postTransfersIdReversalsEndpointSchema = {
  path: '/v1/transfers/{id}/reversals',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    id: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amount: z.number().int().safe().finite().optional(),
        description: z.string().optional(),
        expand: z.array(z.string()).optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        refund_application_fee: z.boolean().optional(),
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

export type PostTransfersIdReversalsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount?: number; // int
      description?: string;
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      refund_application_fee?: boolean;
    }
  >,
  {
    id: string;
  }
>;

export type PostTransfersIdReversalsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Transfer_reversal>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTransfersIdReversalsRequestResult = RequestResult<
  PostTransfersIdReversalsRequest,
  PostTransfersIdReversalsResponse
>;

export function postTransfersIdReversals(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTransfersIdReversalsRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTransfersIdReversalsRequestResult> {
  return requestHandler.execute(
    createRequest(postTransfersIdReversalsEndpointSchema, payload),
    config
  );
}
