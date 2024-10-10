import {z_Terminal_Reader, Terminal_Reader} from './terminal';
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

export const getTerminalReadersEndpointSchema = {
  path: '/v1/terminal/readers',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    device_type: z
      .enum([
        'bbpos_chipper2x',
        'bbpos_wisepad3',
        'bbpos_wisepos_e',
        'mobile_phone_reader',
        'simulated_wisepos_e',
        'stripe_m2',
        'stripe_s700',
        'verifone_P400',
      ])
      .optional(),
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    location: z.string().optional(),
    serial_number: z.string().optional(),
    starting_after: z.string().optional(),
    status: z.enum(['offline', 'online']).optional(),
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
            data: z.array(z_Terminal_Reader),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string(),
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

export type GetTerminalReadersRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    device_type?:
      | 'bbpos_chipper2x'
      | 'bbpos_wisepad3'
      | 'bbpos_wisepos_e'
      | 'mobile_phone_reader'
      | 'simulated_wisepos_e'
      | 'stripe_m2'
      | 'stripe_s700'
      | 'verifone_P400';
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    location?: string;
    serial_number?: string;
    starting_after?: string;
    status?: 'offline' | 'online';
  }
>;

export type GetTerminalReadersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Terminal_Reader[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTerminalReadersRequestResult = RequestResult<
  GetTerminalReadersRequest,
  GetTerminalReadersResponse
>;

export function getTerminalReaders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTerminalReadersRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTerminalReadersRequestResult> {
  return requestHandler.execute(
    createRequest(getTerminalReadersEndpointSchema, payload),
    config
  );
}
