import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1SubAccountSubaccountapiIprestrictionEndpointSchema = {
  path: '/sapi/v1/sub-account/subAccountApi/ipRestriction',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    email: z.string(),
    subAccountApiKey: z.string(),
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
            ipRestrict: z.string(),
            ipList: z.array(z.string()),
            updateTime: z.number().int().safe().finite(),
            apiKey: z.string(),
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

export type GetSapiV1SubAccountSubaccountapiIprestrictionPayload = {
  queryParams: {
    email: string;
    subAccountApiKey: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1SubAccountSubaccountapiIprestrictionResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          ipRestrict: string;
          ipList: string[];
          updateTime: number; // int
          apiKey: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SubAccountSubaccountapiIprestrictionRequestResult =
  RequestResult<Request, GetSapiV1SubAccountSubaccountapiIprestrictionResponse>;

export function getSapiV1SubAccountSubaccountapiIprestriction(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1SubAccountSubaccountapiIprestrictionPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SubAccountSubaccountapiIprestrictionRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema:
        getSapiV1SubAccountSubaccountapiIprestrictionEndpointSchema,
    }),
    config
  );
}
