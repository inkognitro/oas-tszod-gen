import {
  z_Test_helpers_Test_clock,
  z_Error,
  Test_helpers_Test_clock,
  Error,
} from '@example-outputs/stripe-with-zod';
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
} from '@example-outputs/stripe-with-zod/core';

export const postTestHelpersTestClocksEndpointSchema = {
  path: '/v1/test_helpers/test_clocks',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        frozen_time: z.number().int().safe().finite(),
        name: z.string().optional(),
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

export type PostTestHelpersTestClocksRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      frozen_time: number; // int
      name?: string;
    }
  >
>;

export type PostTestHelpersTestClocksResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Test_helpers_Test_clock>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersTestClocksRequestResult = RequestResult<
  PostTestHelpersTestClocksRequest,
  PostTestHelpersTestClocksResponse
>;

export function postTestHelpersTestClocks(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersTestClocksRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersTestClocksRequestResult> {
  return requestHandler.execute(
    createRequest(postTestHelpersTestClocksEndpointSchema, payload),
    config
  );
}
