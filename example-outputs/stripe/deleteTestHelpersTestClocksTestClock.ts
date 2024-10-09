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
import {Deleted_test_helpers_Test_clock, Error} from '@example-outputs/stripe';

export const deleteTestHelpersTestClocksTestClockEndpointSchema = {
  path: '/v1/test_helpers/test_clocks/{test_clock}',
  method: 'delete',
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

export type DeleteTestHelpersTestClocksTestClockRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    test_clock: string;
  }
>;

export type DeleteTestHelpersTestClocksTestClockResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Deleted_test_helpers_Test_clock>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteTestHelpersTestClocksTestClockRequestResult = RequestResult<
  DeleteTestHelpersTestClocksTestClockRequest,
  DeleteTestHelpersTestClocksTestClockResponse
>;

export function deleteTestHelpersTestClocksTestClock(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteTestHelpersTestClocksTestClockRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteTestHelpersTestClocksTestClockRequestResult> {
  return requestHandler.execute(
    createRequest(deleteTestHelpersTestClocksTestClockEndpointSchema, payload),
    config
  );
}
