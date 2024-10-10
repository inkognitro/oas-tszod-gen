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
import {Test_helpers_Test_clock} from './test_helpers';
import {Error} from './schemas';

export const postTestHelpersTestClocksTestClockAdvanceEndpointSchema = {
  path: '/v1/test_helpers/test_clocks/{test_clock}/advance',
  method: 'post',
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

export type PostTestHelpersTestClocksTestClockAdvanceRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      frozen_time: number; // int
    }
  >,
  {
    test_clock: string;
  }
>;

export type PostTestHelpersTestClocksTestClockAdvanceResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Test_helpers_Test_clock>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersTestClocksTestClockAdvanceRequestResult =
  RequestResult<
    PostTestHelpersTestClocksTestClockAdvanceRequest,
    PostTestHelpersTestClocksTestClockAdvanceResponse
  >;

export function postTestHelpersTestClocksTestClockAdvance(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersTestClocksTestClockAdvanceRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersTestClocksTestClockAdvanceRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersTestClocksTestClockAdvanceEndpointSchema,
      payload
    ),
    config
  );
}
