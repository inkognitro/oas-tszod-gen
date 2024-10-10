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
import {Funding_instructions, Error} from './schemas';

export const postCustomersCustomerFundingInstructionsEndpointSchema = {
  path: '/v1/customers/{customer}/funding_instructions',
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

export type PostCustomersCustomerFundingInstructionsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      bank_transfer: {
        eu_bank_transfer?: {
          country: string;
        };
        requested_address_types?: ('iban' | 'sort_code' | 'spei' | 'zengin')[];
        type:
          | 'eu_bank_transfer'
          | 'gb_bank_transfer'
          | 'jp_bank_transfer'
          | 'mx_bank_transfer'
          | 'us_bank_transfer';
      };
      currency: string;
      expand?: string[];
      funding_type: 'bank_transfer';
    }
  >,
  {
    customer: string;
  }
>;

export type PostCustomersCustomerFundingInstructionsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Funding_instructions>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostCustomersCustomerFundingInstructionsRequestResult =
  RequestResult<
    PostCustomersCustomerFundingInstructionsRequest,
    PostCustomersCustomerFundingInstructionsResponse
  >;

export function postCustomersCustomerFundingInstructions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostCustomersCustomerFundingInstructionsRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostCustomersCustomerFundingInstructionsRequestResult> {
  return requestHandler.execute(
    createRequest(
      postCustomersCustomerFundingInstructionsEndpointSchema,
      payload
    ),
    config
  );
}
