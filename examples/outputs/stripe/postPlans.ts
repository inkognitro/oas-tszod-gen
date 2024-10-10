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
import {Plan, Error} from './schemas';

export const postPlansEndpointSchema = {
  path: '/v1/plans',
  method: 'post',
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

export type PostPlansRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      active?: boolean;
      aggregate_usage?: 'last_during_period' | 'last_ever' | 'max' | 'sum';
      amount?: number; // int
      amount_decimal?: string; // decimal
      billing_scheme?: 'per_unit' | 'tiered';
      currency: string;
      expand?: string[];
      id?: string;
      interval: 'day' | 'month' | 'week' | 'year';
      interval_count?: number; // int
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      meter?: string;
      nickname?: string;
      product?: (
        | {
            active?: boolean;
            id?: string;
            metadata?: {
              [key: string]: string;
            };
            name: string;
            statement_descriptor?: string;
            tax_code?: string;
            unit_label?: string;
          }
        | string
      ) &
        Partial<{
          active?: boolean;
          id?: string;
          metadata?: {
            [key: string]: string;
          };
          name: string;
          statement_descriptor?: string;
          tax_code?: string;
          unit_label?: string;
        }>;
      tiers?: {
        flat_amount?: number; // int
        flat_amount_decimal?: string; // decimal
        unit_amount?: number; // int
        unit_amount_decimal?: string; // decimal
        up_to: 'inf' | number;
      }[];
      tiers_mode?: 'graduated' | 'volume';
      transform_usage?: {
        divide_by: number; // int
        round: 'down' | 'up';
      };
      trial_period_days?: number; // int
      usage_type?: 'licensed' | 'metered';
    }
  >
>;

export type PostPlansResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Plan>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPlansRequestResult = RequestResult<
  PostPlansRequest,
  PostPlansResponse
>;

export function postPlans(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostPlansRequest, 'contentType' | 'body', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostPlansRequestResult> {
  return requestHandler.execute(
    createRequest(postPlansEndpointSchema, payload),
    config
  );
}
