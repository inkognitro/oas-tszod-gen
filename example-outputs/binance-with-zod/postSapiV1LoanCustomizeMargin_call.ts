import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const postSapiV1LoanCustomizeMargin_callEndpointSchema = {
  path: '/sapi/v1/loan/customize/margin_call',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    orderId: z.number().int().safe().finite().optional(),
    collateralCoin: z.string().optional(),
    marginCall: z.number().safe().finite(),
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
            rows: z.array(
              z.object({
                orderId: z.string(),
                collateralCoin: z.string(),
                preMarginCall: z.string(),
                afterMarginCall: z.string(),
                customizeTime: z.number().int().safe().finite(),
              })
            ),
            total: z.number().int().safe().finite(),
          }),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
  },
};

export type PostSapiV1LoanCustomizeMargin_callPayload = {
  queryParams: {
    orderId?: number; // int
    collateralCoin?: string;
    marginCall: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1LoanCustomizeMargin_callResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            rows: {
              orderId: string;
              collateralCoin: string;
              preMarginCall: string;
              afterMarginCall: string;
              customizeTime: number; // int
            }[];
            total: number; // int
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1LoanCustomizeMargin_callRequestResult = RequestResult<
  Request,
  PostSapiV1LoanCustomizeMargin_callResponse
>;

export function postSapiV1LoanCustomizeMargin_call(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1LoanCustomizeMargin_callPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LoanCustomizeMargin_callRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1LoanCustomizeMargin_callEndpointSchema,
    }),
    config
  );
}
