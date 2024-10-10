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

export const postTestHelpersTestClocksTestClockAdvanceEndpointSchema = {
  path: '/v1/test_helpers/test_clocks/{test_clock}/advance',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    test_clock: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        frozen_time: z.number().int().safe().finite(),
      }),
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
