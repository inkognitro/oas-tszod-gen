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
import {Issuing_Authorization} from './issuing';
import {Error} from './schemas';

export const postTestHelpersIssuingAuthorizationsAuthorizationFinalizeAmountEndpointSchema =
  {
    path: '/v1/test_helpers/issuing/authorizations/{authorization}/finalize_amount',
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

export type PostTestHelpersIssuingAuthorizationsAuthorizationFinalizeAmountRequest =
  RequestUnion<
    RequestBodyData<
      'application/x-www-form-urlencoded',
      {
        expand?: string[];
        final_amount: number; // int
        fleet?: {
          cardholder_prompt_data?: {
            driver_id?: string;
            odometer?: number; // int
            unspecified_id?: string;
            user_id?: string;
            vehicle_number?: string;
          };
          purchase_type?:
            | 'fuel_and_non_fuel_purchase'
            | 'fuel_purchase'
            | 'non_fuel_purchase';
          reported_breakdown?: {
            fuel?: {
              gross_amount_decimal?: string; // decimal
            };
            non_fuel?: {
              gross_amount_decimal?: string; // decimal
            };
            tax?: {
              local_amount_decimal?: string; // decimal
              national_amount_decimal?: string; // decimal
            };
          };
          service_type?:
            | 'full_service'
            | 'non_fuel_transaction'
            | 'self_service';
        };
        fuel?: {
          industry_product_code?: string;
          quantity_decimal?: string; // decimal
          type?:
            | 'diesel'
            | 'other'
            | 'unleaded_plus'
            | 'unleaded_regular'
            | 'unleaded_super';
          unit?:
            | 'charging_minute'
            | 'imperial_gallon'
            | 'kilogram'
            | 'kilowatt_hour'
            | 'liter'
            | 'other'
            | 'pound'
            | 'us_gallon';
          unit_cost_decimal?: string; // decimal
        };
      }
    >,
    {
      authorization: string;
    }
  >;

export type PostTestHelpersIssuingAuthorizationsAuthorizationFinalizeAmountResponse =

    | ResponseUnion<
        200,
        ResponseBodyData<'application/json', Issuing_Authorization>
      >
    | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersIssuingAuthorizationsAuthorizationFinalizeAmountRequestResult =
  RequestResult<
    PostTestHelpersIssuingAuthorizationsAuthorizationFinalizeAmountRequest,
    PostTestHelpersIssuingAuthorizationsAuthorizationFinalizeAmountResponse
  >;

export function postTestHelpersIssuingAuthorizationsAuthorizationFinalizeAmount(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersIssuingAuthorizationsAuthorizationFinalizeAmountRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersIssuingAuthorizationsAuthorizationFinalizeAmountRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersIssuingAuthorizationsAuthorizationFinalizeAmountEndpointSchema,
      payload
    ),
    config
  );
}
