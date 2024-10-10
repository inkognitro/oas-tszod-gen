import {
  z_RepaymentInfo,
  z_RepaymentInfo2,
  z_Error,
  RepaymentInfo,
  RepaymentInfo2,
  Error,
} from '../../../';
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
} from '../../../core';

export const postRepayEndpointSchema = {
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

export type PostRepayRequest = RequestUnion<
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

export type PostRepayResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', RepaymentInfo | RepaymentInfo2>
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostRepayRequestResult = RequestResult<
  PostRepayRequest,
  PostRepayResponse
>;

export function postRepay(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostRepayRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostRepayRequestResult> {
  return requestHandler.execute(
    createRequest(postRepayEndpointSchema, payload),
    config
  );
}
