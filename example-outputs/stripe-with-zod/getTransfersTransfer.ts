import {
  z_Transfer,
  z_Error,
  Transfer,
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

export const getTransfersTransferEndpointSchema = {
  path: '/v1/transfers/{transfer}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
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

export type GetTransfersTransferRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    transfer: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTransfersTransferResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Transfer>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTransfersTransferRequestResult = RequestResult<
  GetTransfersTransferRequest,
  GetTransfersTransferResponse
>;

export function getTransfersTransfer(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTransfersTransferRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTransfersTransferRequestResult> {
  return requestHandler.execute(
    createRequest(getTransfersTransferEndpointSchema, payload),
    config
  );
}
