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
import {Setup_attempt, Error} from './schemas';

export const getSetupAttemptsEndpointSchema = {
  path: '/v1/setup_attempts',
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

export type GetSetupAttemptsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
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
    setup_intent: string;
    starting_after?: string;
  }
>;

export type GetSetupAttemptsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Setup_attempt[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetSetupAttemptsRequestResult = RequestResult<
  GetSetupAttemptsRequest,
  GetSetupAttemptsResponse
>;

export function getSetupAttempts(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSetupAttemptsRequest,
    'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSetupAttemptsRequestResult> {
  return requestHandler.execute(
    createRequest(getSetupAttemptsEndpointSchema, payload),
    config
  );
}
