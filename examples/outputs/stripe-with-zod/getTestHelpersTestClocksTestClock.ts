import {
  z_Test_helpers_Test_clock,
  Test_helpers_Test_clock,
} from './test_helpers';
import {z_Error, Error} from './schemas';
import {z} from 'zod';
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

export const getTestHelpersTestClocksTestClockEndpointSchema = {
  path: '/v1/test_helpers/test_clocks/{test_clock}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    test_clock: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Test_helpers_Test_clock,
        },
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
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
