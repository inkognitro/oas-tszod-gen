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

export const getTopupsEndpointSchema = {
  path: '/v1/topups',
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

export type GetTopupsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    amount?: (
      | {
          gt?: number; // int
          gte?: number; // int
          lt?: number; // int
          lte?: number; // int
        }
      | number
    ) &
      Partial<{
        gt?: number; // int
        gte?: number; // int
        lt?: number; // int
        lte?: number; // int
      }>;
    created?: (
      | {
          gt?: number; // int
          gte?: number; // int
          lt?: number; // int
          lte?: number; // int
        }
      | number
    ) &
      Partial<{
        gt?: number; // int
        gte?: number; // int
        lt?: number; // int
        lte?: number; // int
      }>;
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
    status?: 'canceled' | 'failed' | 'pending' | 'succeeded';
  }
>;

export type GetTopupsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Topup[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTopupsRequestResult = RequestResult<
  GetTopupsRequest,
  GetTopupsResponse
>;

export function getTopups(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTopupsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTopupsRequestResult> {
  return requestHandler.execute(
    createRequest(getTopupsEndpointSchema, payload),
    config
  );
}
