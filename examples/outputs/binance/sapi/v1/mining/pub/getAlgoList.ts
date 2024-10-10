import {
  Request,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '../../../../core';
import {Error} from '../../../../';

export const getAlgoListEndpointSchema = {
  path: '/sapi/v1/mining/pub/algoList',
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
  },
};

export type GetAlgoListRequest = Request;

export type GetAlgoListResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          msg: string;
          data: {
            algoName: string;
            algoId: number; // int
            poolIndex: number; // int
            unit: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetAlgoListRequestResult = RequestResult<
  GetAlgoListRequest,
  GetAlgoListResponse
>;

export function getAlgoList(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetAlgoListRequestResult> {
  return requestHandler.execute(
    createRequest(getAlgoListEndpointSchema),
    config
  );
}
