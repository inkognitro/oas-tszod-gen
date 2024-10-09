import {
  z_Deleted_terminal_Configuration,
  z_Error,
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

export const deleteTerminalConfigurationsConfigurationEndpointSchema = {
  path: '/v1/terminal/configurations/{configuration}',
  method: 'delete',
  supportedSecuritySchemas: [],
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
          zodSchema: z_Deleted_terminal_Configuration,
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

export type DeleteTerminalConfigurationsConfigurationRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    configuration: string;
  }
>;

export type DeleteTerminalConfigurationsConfigurationResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Deleted_terminal_Configuration>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteTerminalConfigurationsConfigurationRequestResult =
  RequestResult<
    DeleteTerminalConfigurationsConfigurationRequest,
    DeleteTerminalConfigurationsConfigurationResponse
  >;

export function deleteTerminalConfigurationsConfiguration(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteTerminalConfigurationsConfigurationRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteTerminalConfigurationsConfigurationRequestResult> {
  return requestHandler.execute(
    createRequest(
      deleteTerminalConfigurationsConfigurationEndpointSchema,
      payload
    ),
    config
  );
}
