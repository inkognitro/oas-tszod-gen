import {z_Error, Error} from '../../../';
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

export const postBorrowEndpointSchema = {
  path: '/sapi/v1/loan/borrow',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    loanCoin: z.string(),
    loanAmount: z.number().safe().finite().optional(),
    collateralCoin: z.string(),
    collateralAmount: z.number().safe().finite().optional(),
    loanTerm: z.number().int().safe().finite(),
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
            loanCoin: z.string(),
            loanAmount: z.string(),
            collateralCoin: z.string(),
            collateralAmount: z.string(),
            hourlyInterestRate: z.string(),
            orderId: z.string(),
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

export type PostBorrowRequest = RequestUnion<
  any,
  any,
  {
    loanCoin: string;
    loanAmount?: number;
    collateralCoin: string;
    collateralAmount?: number;
    loanTerm: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostBorrowResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          loanCoin: string;
          loanAmount: string;
          collateralCoin: string;
          collateralAmount: string;
          hourlyInterestRate: string;
          orderId: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostBorrowRequestResult = RequestResult<
  PostBorrowRequest,
  PostBorrowResponse
>;

export function postBorrow(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostBorrowRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostBorrowRequestResult> {
  return requestHandler.execute(
    createRequest(postBorrowEndpointSchema, payload),
    config
  );
}
