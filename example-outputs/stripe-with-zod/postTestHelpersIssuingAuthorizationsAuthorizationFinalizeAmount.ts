import {
  z_Issuing_Authorization,
  z_Error,
  Issuing_Authorization,
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

export const postTestHelpersIssuingAuthorizationsAuthorizationFinalizeAmountEndpointSchema =
  {
    path: '/v1/test_helpers/issuing/authorizations/{authorization}/finalize_amount',
    method: 'post',
    supportedSecuritySchemas: [],
    pathParamsZodSchema: z.object({
      authorization: z.string(),
    }),
    bodyByContentType: {
      'application/x-www-form-urlencoded': {
        zodSchema: z.object({
          expand: z.array(z.string()).optional(),
          final_amount: z.number().int().safe().finite(),
          fleet: z
            .object({
              cardholder_prompt_data: z
                .object({
                  driver_id: z.string().optional(),
                  odometer: z.number().int().safe().finite().optional(),
                  unspecified_id: z.string().optional(),
                  user_id: z.string().optional(),
                  vehicle_number: z.string().optional(),
                })
                .optional(),
              purchase_type: z
                .enum([
                  'fuel_and_non_fuel_purchase',
                  'fuel_purchase',
                  'non_fuel_purchase',
                ])
                .optional(),
              reported_breakdown: z
                .object({
                  fuel: z
                    .object({
                      gross_amount_decimal: z.string().optional(),
                    })
                    .optional(),
                  non_fuel: z
                    .object({
                      gross_amount_decimal: z.string().optional(),
                    })
                    .optional(),
                  tax: z
                    .object({
                      local_amount_decimal: z.string().optional(),
                      national_amount_decimal: z.string().optional(),
                    })
                    .optional(),
                })
                .optional(),
              service_type: z
                .enum(['full_service', 'non_fuel_transaction', 'self_service'])
                .optional(),
            })
            .optional(),
          fuel: z
            .object({
              industry_product_code: z.string().optional(),
              quantity_decimal: z.string().optional(),
              type: z
                .enum([
                  'diesel',
                  'other',
                  'unleaded_plus',
                  'unleaded_regular',
                  'unleaded_super',
                ])
                .optional(),
              unit: z
                .enum([
                  'charging_minute',
                  'imperial_gallon',
                  'kilogram',
                  'kilowatt_hour',
                  'liter',
                  'other',
                  'pound',
                  'us_gallon',
                ])
                .optional(),
              unit_cost_decimal: z.string().optional(),
            })
            .optional(),
        }),
      },
    },
    responseByStatus: {
      '200': {
        bodyByContentType: {
          'application/json': {
            zodSchema: z_Issuing_Authorization,
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
