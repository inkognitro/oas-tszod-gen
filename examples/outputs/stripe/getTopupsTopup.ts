import {
  RequestUnion,
  RequestBodyData,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from './core';
import {Topup, Error} from './schemas';

export const getTopupsTopupEndpointSchema = {
  path: '/v1/topups/{topup}',
  method: 'get',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type GetTopupsTopupRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    topup: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTopupsTopupResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Topup>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTopupsTopupRequestResult = RequestResult<
  GetTopupsTopupRequest,
  GetTopupsTopupResponse
>;

export function getTopupsTopup(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTopupsTopupRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTopupsTopupRequestResult> {
  return requestHandler.execute(
    createRequest(getTopupsTopupEndpointSchema, payload),
    config
  );
}
