import {
  z_Transfer_reversal,
  z_Error,
  Transfer_reversal,
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

export const getTransfersTransferReversalsIdEndpointSchema = {
  path: '/v1/transfers/{transfer}/reversals/{id}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    id: z.string(),
    transfer: z.string(),
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

export type GetTransfersTransferReversalsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
    transfer: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTransfersTransferReversalsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Transfer_reversal>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTransfersTransferReversalsIdRequestResult = RequestResult<
  GetTransfersTransferReversalsIdRequest,
  GetTransfersTransferReversalsIdResponse
>;

export function getTransfersTransferReversalsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTransfersTransferReversalsIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTransfersTransferReversalsIdRequestResult> {
  return requestHandler.execute(
    createRequest(getTransfersTransferReversalsIdEndpointSchema, payload),
    config
  );
}
