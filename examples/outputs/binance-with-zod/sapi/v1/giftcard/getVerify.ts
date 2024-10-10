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

export const getVerifyEndpointSchema = {
  path: '/sapi/v1/giftcard/verify',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    referenceNo: z.string(),
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
            code: z.string(),
            message: z.string(),
            data: z.object({
              valid: z.boolean(),
              token: z.string(),
              amount: z.string(),
            }),
            success: z.boolean(),
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

export type GetVerifyRequest = RequestUnion<
  any,
  any,
  {
    referenceNo: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetVerifyResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: string;
          message: string;
          data: {
            valid: boolean;
            token: string;
            amount: string;
          };
          success: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetVerifyRequestResult = RequestResult<
  GetVerifyRequest,
  GetVerifyResponse
>;

export function getVerify(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetVerifyRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetVerifyRequestResult> {
  return requestHandler.execute(
    createRequest(getVerifyEndpointSchema, payload),
    config
  );
}
