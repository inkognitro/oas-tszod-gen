import {
  z_Treasury_Financial_account_features,
  Treasury_Financial_account_features,
} from './treasury';
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

export const getTreasuryFinancialAccountsFinancialAccountFeaturesEndpointSchema =
  {
    path: '/v1/treasury/financial_accounts/{financial_account}/features',
    method: 'get',
    supportedSecuritySchemas: [],
    queryParamsZodSchema: z.object({
      expand: z.array(z.string()).optional(),
    }),
    pathParamsZodSchema: z.object({
      financial_account: z.string(),
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
            zodSchema: z_Treasury_Financial_account_features,
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

export type GetTreasuryFinancialAccountsFinancialAccountFeaturesRequest =
  RequestUnion<
    RequestBodyData<'application/x-www-form-urlencoded', {}>,
    {
      financial_account: string;
    },
    {
      expand?: string[];
    }
  >;

export type GetTreasuryFinancialAccountsFinancialAccountFeaturesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Financial_account_features>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryFinancialAccountsFinancialAccountFeaturesRequestResult =
  RequestResult<
    GetTreasuryFinancialAccountsFinancialAccountFeaturesRequest,
    GetTreasuryFinancialAccountsFinancialAccountFeaturesResponse
  >;

export function getTreasuryFinancialAccountsFinancialAccountFeatures(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryFinancialAccountsFinancialAccountFeaturesRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryFinancialAccountsFinancialAccountFeaturesRequestResult> {
  return requestHandler.execute(
    createRequest(
      getTreasuryFinancialAccountsFinancialAccountFeaturesEndpointSchema,
      payload
    ),
    config
  );
}
