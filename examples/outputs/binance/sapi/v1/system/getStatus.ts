import {
  Request,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '../../../core';

export const getStatusEndpointSchema = {
  path: '/sapi/v1/system/status',
  method: 'get',
  supportedSecuritySchemas: [],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type GetStatusRequest = Request;

export type GetStatusResponse = ResponseUnion<
  200,
  ResponseBodyData<
    'application/json',
    {
      status: number; // int
      msg: string;
    }
  >
>;

export type GetStatusRequestResult = RequestResult<
  GetStatusRequest,
  GetStatusResponse
>;

export function getStatus(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetStatusRequestResult> {
  return requestHandler.execute(createRequest(getStatusEndpointSchema), config);
}
