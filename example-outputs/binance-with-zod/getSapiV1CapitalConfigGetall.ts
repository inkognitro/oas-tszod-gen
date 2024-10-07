import {z_Error, Error} from '@example-outputs/binance-with-zod';
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

export const getSapiV1CapitalConfigGetallEndpointSchema = {
  path: '/sapi/v1/capital/config/getall',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(
            z.object({
              coin: z.string(),
              depositAllEnable: z.boolean(),
              free: z.string(),
              freeze: z.string(),
              ipoable: z.string(),
              ipoing: z.string(),
              isLegalMoney: z.boolean(),
              locked: z.string(),
              name: z.string(),
              networkList: z.array(
                z.object({
                  addressRegex: z.string(),
                  coin: z.string(),
                  depositDesc: z.string(),
                  depositEnable: z.boolean(),
                  isDefault: z.boolean(),
                  memoRegex: z.string(),
                  minConfirm: z.number().int().safe().finite(),
                  name: z.string(),
                  network: z.string(),
                  specialTips: z.string(),
                  unLockConfirm: z.number().int().safe().finite(),
                  withdrawDesc: z.string(),
                  withdrawEnable: z.boolean(),
                  withdrawFee: z.string(),
                  withdrawIntegerMultiple: z.string(),
                  withdrawMax: z.string(),
                  withdrawMin: z.string(),
                  sameAddress: z.boolean(),
                })
              ),
              storage: z.string(),
              trading: z.boolean(),
              withdrawAllEnable: z.boolean(),
              withdrawing: z.string(),
            })
          ),
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

export type GetSapiV1CapitalConfigGetallRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1CapitalConfigGetallResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          coin: string;
          depositAllEnable: boolean;
          free: string;
          freeze: string;
          ipoable: string;
          ipoing: string;
          isLegalMoney: boolean;
          locked: string;
          name: string;
          networkList: {
            addressRegex: string;
            coin: string;
            depositDesc: string;
            depositEnable: boolean;
            isDefault: boolean;
            memoRegex: string;
            minConfirm: number; // int
            name: string;
            network: string;
            specialTips: string;
            unLockConfirm: number; // int
            withdrawDesc: string;
            withdrawEnable: boolean;
            withdrawFee: string;
            withdrawIntegerMultiple: string;
            withdrawMax: string;
            withdrawMin: string;
            sameAddress: boolean;
          }[];
          storage: string;
          trading: boolean;
          withdrawAllEnable: boolean;
          withdrawing: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1CapitalConfigGetallRequestResult = RequestResult<
  GetSapiV1CapitalConfigGetallRequest,
  GetSapiV1CapitalConfigGetallResponse
>;

export function getSapiV1CapitalConfigGetall(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1CapitalConfigGetallRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1CapitalConfigGetallRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1CapitalConfigGetallEndpointSchema, payload),
    config
  );
}
