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
import {Error} from '../../../../';

export const getGetallEndpointSchema = {
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

export type GetGetallRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetGetallResponse =
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

export type GetGetallRequestResult = RequestResult<
  GetGetallRequest,
  GetGetallResponse
>;

export function getGetall(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetGetallRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetGetallRequestResult> {
  return requestHandler.execute(
    createRequest(getGetallEndpointSchema, payload),
    config
  );
}
