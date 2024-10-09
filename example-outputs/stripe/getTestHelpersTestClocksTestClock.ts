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
} from '@example-outputs/stripe/core';
import {Test_helpers_Test_clock, Error} from '@example-outputs/stripe';

export const getTestHelpersTestClocksTestClockEndpointSchema = {
  path: '/v1/test_helpers/test_clocks/{test_clock}',
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

export type GetTestHelpersTestClocksTestClockRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    test_clock: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTestHelpersTestClocksTestClockResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Test_helpers_Test_clock>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTestHelpersTestClocksTestClockRequestResult = RequestResult<
  GetTestHelpersTestClocksTestClockRequest,
  GetTestHelpersTestClocksTestClockResponse
>;

export function getTestHelpersTestClocksTestClock(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTestHelpersTestClocksTestClockRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTestHelpersTestClocksTestClockRequestResult> {
  return requestHandler.execute(
    createRequest(getTestHelpersTestClocksTestClockEndpointSchema, payload),
    config
  );
}
