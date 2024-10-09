import {
  z_Terminal_Location,
  z_Error,
  Terminal_Location,
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

export const postTerminalLocationsEndpointSchema = {
  path: '/v1/terminal/locations',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        address: z.object({
          city: z.string().optional(),
          country: z.string(),
          line1: z.string().optional(),
          line2: z.string().optional(),
          postal_code: z.string().optional(),
          state: z.string().optional(),
        }),
        configuration_overrides: z.string().optional(),
        display_name: z.string(),
        expand: z.array(z.string()).optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Terminal_Location,
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

export type PostTerminalLocationsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      address: {
        city?: string;
        country: string;
        line1?: string;
        line2?: string;
        postal_code?: string;
        state?: string;
      };
      configuration_overrides?: string;
      display_name: string;
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
    }
  >
>;

export type PostTerminalLocationsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Terminal_Location>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTerminalLocationsRequestResult = RequestResult<
  PostTerminalLocationsRequest,
  PostTerminalLocationsResponse
>;

export function postTerminalLocations(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTerminalLocationsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTerminalLocationsRequestResult> {
  return requestHandler.execute(
    createRequest(postTerminalLocationsEndpointSchema, payload),
    config
  );
}
