import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getSapiV1CapitalConfigGetallEndpointSchema = {
  path: '/sapi/v1/capital/config/getall',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {},
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
