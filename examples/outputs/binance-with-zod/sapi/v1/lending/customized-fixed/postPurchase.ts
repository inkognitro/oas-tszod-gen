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

export const postPurchaseEndpointSchema = {
  path: '/sapi/v1/lending/customizedFixed/purchase',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    projectId: z.string(),
    lot: z.string(),
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
            purchaseId: z.string(),
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

export type PostPurchaseRequest = RequestUnion<
  any,
  any,
  {
    projectId: string;
    lot: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostPurchaseResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          purchaseId: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostPurchaseRequestResult = RequestResult<
  PostPurchaseRequest,
  PostPurchaseResponse
>;

export function postPurchase(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostPurchaseRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostPurchaseRequestResult> {
  return requestHandler.execute(
    createRequest(postPurchaseEndpointSchema, payload),
    config
  );
}
