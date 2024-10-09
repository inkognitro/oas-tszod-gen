import {
  z_Terminal_Configuration,
  z_Deleted_terminal_Configuration,
  z_Error,
  Terminal_Configuration,
  Deleted_terminal_Configuration,
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

export const getTerminalConfigurationsConfigurationEndpointSchema = {
  path: '/v1/terminal/configurations/{configuration}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    configuration: z.string(),
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
          zodSchema: z.union([
            z_Terminal_Configuration,
            z_Deleted_terminal_Configuration,
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

export type GetTerminalConfigurationsConfigurationRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    configuration: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTerminalConfigurationsConfigurationResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        (Terminal_Configuration | Deleted_terminal_Configuration) &
          (Partial<Terminal_Configuration> &
            Partial<Deleted_terminal_Configuration>)
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTerminalConfigurationsConfigurationRequestResult = RequestResult<
  GetTerminalConfigurationsConfigurationRequest,
  GetTerminalConfigurationsConfigurationResponse
>;

export function getTerminalConfigurationsConfiguration(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTerminalConfigurationsConfigurationRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTerminalConfigurationsConfigurationRequestResult> {
  return requestHandler.execute(
    createRequest(
      getTerminalConfigurationsConfigurationEndpointSchema,
      payload
    ),
    config
  );
}
