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

export const getTestHelpersTestClocksEndpointSchema = {
  path: '/v1/test_helpers/test_clocks',
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

export type GetTestHelpersTestClocksRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetTestHelpersTestClocksResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Test_helpers_Test_clock[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTestHelpersTestClocksRequestResult = RequestResult<
  GetTestHelpersTestClocksRequest,
  GetTestHelpersTestClocksResponse
>;

export function getTestHelpersTestClocks(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTestHelpersTestClocksRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTestHelpersTestClocksRequestResult> {
  return requestHandler.execute(
    createRequest(getTestHelpersTestClocksEndpointSchema, payload),
    config
  );
}
