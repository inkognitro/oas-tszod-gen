import {z_Terminal_Configuration, Terminal_Configuration} from './terminal';
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

export const getTerminalConfigurationsEndpointSchema = {
  path: '/v1/terminal/configurations',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    is_account_default: z.boolean().optional(),
    limit: z.number().int().safe().finite().optional(),
    starting_after: z.string().optional(),
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
          zodSchema: z.object({
            data: z.array(z_Terminal_Configuration),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string().regex(/\^\/v1\/terminal\/configurations/),
          }),
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

export type GetTerminalConfigurationsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    ending_before?: string;
    expand?: string[];
    is_account_default?: boolean;
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetTerminalConfigurationsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Terminal_Configuration[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTerminalConfigurationsRequestResult = RequestResult<
  GetTerminalConfigurationsRequest,
  GetTerminalConfigurationsResponse
>;

export function getTerminalConfigurations(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTerminalConfigurationsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTerminalConfigurationsRequestResult> {
  return requestHandler.execute(
    createRequest(getTerminalConfigurationsEndpointSchema, payload),
    config
  );
}
