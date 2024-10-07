import {
  z_RepaymentInfo,
  z_RepaymentInfo2,
  z_Error,
  RepaymentInfo,
  RepaymentInfo2,
  Error,
} from '@example-outputs/binance-with-zod';
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
} from '@example-outputs/binance-with-zod/core';

export const postSapiV1LoanRepayEndpointSchema = {
  path: '/sapi/v1/loan/repay',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    orderId: z.number().int().safe().finite(),
    amount: z.number().safe().finite(),
    type: z.number().int().safe().finite().optional(),
    collateralReturn: z.boolean().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.union([z_RepaymentInfo, z_RepaymentInfo2]),
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

export type PostSapiV1LoanRepayRequest = RequestUnion<
  any,
  any,
  {
    orderId: number; // int
    amount: number;
    type?: number; // int
    collateralReturn?: boolean;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1LoanRepayResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', RepaymentInfo | RepaymentInfo2>
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1LoanRepayRequestResult = RequestResult<
  PostSapiV1LoanRepayRequest,
  PostSapiV1LoanRepayResponse
>;

export function postSapiV1LoanRepay(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV1LoanRepayRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LoanRepayRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1LoanRepayEndpointSchema, payload),
    config
  );
}
