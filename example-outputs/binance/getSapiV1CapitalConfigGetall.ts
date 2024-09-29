import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1CapitalConfigGetallEndpointSchema = {
  path: '/sapi/v1/capital/config/getall',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type GetSapiV1CapitalConfigGetallPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1CapitalConfigGetallResponse =
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1CapitalConfigGetallRequestResult = RequestResult<
  Request,
  GetSapiV1CapitalConfigGetallResponse
>;

export function getSapiV1CapitalConfigGetall(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1CapitalConfigGetallPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1CapitalConfigGetallRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1CapitalConfigGetallEndpointSchema,
    }),
    config
  );
}
