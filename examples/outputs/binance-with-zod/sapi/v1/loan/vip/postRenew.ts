import {z_Error, Error} from '../../../../';
import {z} from 'zod';
import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../../core';

export const postRenewEndpointSchema = {
  path: '/sapi/v1/loan/vip/renew',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    orderId: z.number().int().safe().finite().optional(),
    loanTerm: z.number().int().safe().finite().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            loanAccountId: z.string(),
            loanCoin: z.string(),
            loanAmount: z.string(),
            collateralAccountId: z.string(),
            collateralCoin: z.string(),
            loanTerm: z.string(),
          }),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type PostRenewRequest = RequestUnion<
  any,
  any,
  {
    orderId?: number; // int
    loanTerm?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostRenewResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          loanAccountId: string;
          loanCoin: string;
          loanAmount: string;
          collateralAccountId: string;
          collateralCoin: string;
          loanTerm: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostRenewRequestResult = RequestResult<
  PostRenewRequest,
  PostRenewResponse
>;

export function postRenew(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostRenewRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostRenewRequestResult> {
  return requestHandler.execute(
    createRequest(postRenewEndpointSchema, payload),
    config
  );
}
