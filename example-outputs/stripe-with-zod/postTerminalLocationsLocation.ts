import {
  z_Terminal_Location,
  z_Deleted_terminal_Location,
  z_Error,
  Terminal_Location,
  Deleted_terminal_Location,
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

export const postTerminalLocationsLocationEndpointSchema = {
  path: '/v1/terminal/locations/{location}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    location: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        address: z
          .object({
            city: z.string().optional(),
            country: z.string().optional(),
            line1: z.string().optional(),
            line2: z.string().optional(),
            postal_code: z.string().optional(),
            state: z.string().optional(),
          })
          .optional(),
        configuration_overrides: z.union([z.string(), z.enum([''])]).optional(),
        display_name: z.string().optional(),
        expand: z.array(z.string()).optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.union([
            z_Terminal_Location,
            z_Deleted_terminal_Location,
          ]),
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

export type PostTerminalLocationsLocationRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      address?: {
        city?: string;
        country?: string;
        line1?: string;
        line2?: string;
        postal_code?: string;
        state?: string;
      };
      configuration_overrides?: string | '';
      display_name?: string;
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
    }
  >,
  {
    location: string;
  }
>;

export type PostTerminalLocationsLocationResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        (Terminal_Location | Deleted_terminal_Location) &
          (Partial<Terminal_Location> & Partial<Deleted_terminal_Location>)
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTerminalLocationsLocationRequestResult = RequestResult<
  PostTerminalLocationsLocationRequest,
  PostTerminalLocationsLocationResponse
>;

export function postTerminalLocationsLocation(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTerminalLocationsLocationRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTerminalLocationsLocationRequestResult> {
  return requestHandler.execute(
    createRequest(postTerminalLocationsLocationEndpointSchema, payload),
    config
  );
}
