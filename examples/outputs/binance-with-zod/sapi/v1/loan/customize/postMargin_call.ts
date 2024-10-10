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

export const postMargin_callEndpointSchema = {
  path: '/sapi/v1/loan/customize/margin_call',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
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

export type PostMargin_callRequest = RequestUnion<
  any,
  any,
  {
    orderId?: number; // int
    collateralCoin?: string;
    marginCall: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostMargin_callResponse =
  | ResponseUnion<
      200,
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostMargin_callRequestResult = RequestResult<
  PostMargin_callRequest,
  PostMargin_callResponse
>;

export function postMargin_call(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostMargin_callRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostMargin_callRequestResult> {
  return requestHandler.execute(
    createRequest(postMargin_callEndpointSchema, payload),
    config
  );
}
