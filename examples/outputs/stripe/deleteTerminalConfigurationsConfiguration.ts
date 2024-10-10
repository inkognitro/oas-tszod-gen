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
import {Deleted_terminal_Configuration} from './deleted_terminal';
import {Error} from './schemas';

export const deleteTerminalConfigurationsConfigurationEndpointSchema = {
  path: '/v1/terminal/configurations/{configuration}',
  method: 'delete',
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
