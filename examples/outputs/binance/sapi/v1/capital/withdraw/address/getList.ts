import {
  Request,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '../../../../../core';
import {Error} from '../../../../../';

export const getListEndpointSchema = {
  path: '/sapi/v1/capital/withdraw/address/list',
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

export type GetListRequest = Request;

export type GetListResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          address: string;
          addressTag: string;
          coin: string;
          name: string;
          network: string;
          origin: string;
          originType: string;
          whiteStatus: boolean;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetListRequestResult = RequestResult<
  GetListRequest,
  GetListResponse
>;

export function getList(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetListRequestResult> {
  return requestHandler.execute(createRequest(getListEndpointSchema), config);
}
