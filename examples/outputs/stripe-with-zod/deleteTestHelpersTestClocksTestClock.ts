import {
  z_Deleted_test_helpers_Test_clock,
  Deleted_test_helpers_Test_clock,
} from './deleted_test_helpers';
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

export const deleteTestHelpersTestClocksTestClockEndpointSchema = {
  path: '/v1/test_helpers/test_clocks/{test_clock}',
  method: 'delete',
  supportedSecuritySchemas: [],
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
          zodSchema: z_Deleted_test_helpers_Test_clock,
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
