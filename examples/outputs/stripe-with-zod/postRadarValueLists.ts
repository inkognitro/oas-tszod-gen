import {z_Radar_Value_list, Radar_Value_list} from './radar';
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

export const postRadarValueListsEndpointSchema = {
  path: '/v1/radar/value_lists',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        alias: z.string(),
        expand: z.array(z.string()).optional(),
        item_type: z
          .enum([
            'card_bin',
            'card_fingerprint',
            'case_sensitive_string',
            'country',
            'customer_id',
            'email',
            'ip_address',
            'sepa_debit_fingerprint',
            'string',
            'us_bank_account_fingerprint',
          ])
          .optional(),
        metadata: z.record(z.string()).optional(),
        name: z.string(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Radar_Value_list,
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

export type PostRadarValueListsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      alias: string;
      expand?: string[];
      item_type?:
        | 'card_bin'
        | 'card_fingerprint'
        | 'case_sensitive_string'
        | 'country'
        | 'customer_id'
        | 'email'
        | 'ip_address'
        | 'sepa_debit_fingerprint'
        | 'string'
        | 'us_bank_account_fingerprint';
      metadata?: {
        [key: string]: string;
      };
      name: string;
    }
  >
>;

export type PostRadarValueListsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Radar_Value_list>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostRadarValueListsRequestResult = RequestResult<
  PostRadarValueListsRequest,
  PostRadarValueListsResponse
>;

export function postRadarValueLists(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostRadarValueListsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostRadarValueListsRequestResult> {
  return requestHandler.execute(
    createRequest(postRadarValueListsEndpointSchema, payload),
    config
  );
}
