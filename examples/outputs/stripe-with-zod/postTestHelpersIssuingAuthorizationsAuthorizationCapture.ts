import {z_Issuing_Authorization, Issuing_Authorization} from './issuing';
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

export const postTestHelpersIssuingAuthorizationsAuthorizationCaptureEndpointSchema =
  {
    path: '/v1/test_helpers/issuing/authorizations/{authorization}/capture',
    method: 'post',
    supportedSecuritySchemas: [],
    pathParamsZodSchema: z.object({
      authorization: z.string(),
    }),
    bodyByContentType: {
      'application/x-www-form-urlencoded': {
        zodSchema: z.object({
          capture_amount: z.number().int().safe().finite().optional(),
          close_authorization: z.boolean().optional(),
          expand: z.array(z.string()).optional(),
          purchase_details: z
            .object({
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
                    .enum([
                      'full_service',
                      'non_fuel_transaction',
                      'self_service',
                    ])
                    .optional(),
                })
                .optional(),
              flight: z
                .object({
                  departure_at: z.number().int().safe().finite().optional(),
                  passenger_name: z.string().optional(),
                  refundable: z.boolean().optional(),
                  segments: z
                    .array(
                      z.object({
                        arrival_airport_code: z.string().optional(),
                        carrier: z.string().optional(),
                        departure_airport_code: z.string().optional(),
                        flight_number: z.string().optional(),
                        service_class: z.string().optional(),
                        stopover_allowed: z.boolean().optional(),
                      })
                    )
                    .optional(),
                  travel_agency: z.string().optional(),
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
              lodging: z
                .object({
                  check_in_at: z.number().int().safe().finite().optional(),
                  nights: z.number().int().safe().finite().optional(),
                })
                .optional(),
              receipt: z
                .array(
                  z.object({
                    description: z.string().optional(),
                    quantity: z.string().optional(),
                    total: z.number().int().safe().finite().optional(),
                    unit_cost: z.number().int().safe().finite().optional(),
                  })
                )
                .optional(),
              reference: z.string().optional(),
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

export type PostTestHelpersIssuingAuthorizationsAuthorizationCaptureRequest =
  RequestUnion<
    RequestBodyData<
      'application/x-www-form-urlencoded',
      {
        capture_amount?: number; // int
        close_authorization?: boolean;
        expand?: string[];
        purchase_details?: {
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
          flight?: {
            departure_at?: number; // int
            passenger_name?: string;
            refundable?: boolean;
            segments?: {
              arrival_airport_code?: string;
              carrier?: string;
              departure_airport_code?: string;
              flight_number?: string;
              service_class?: string;
              stopover_allowed?: boolean;
            }[];
            travel_agency?: string;
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
          lodging?: {
            check_in_at?: number; // int
            nights?: number; // int
          };
          receipt?: {
            description?: string;
            quantity?: string; // decimal
            total?: number; // int
            unit_cost?: number; // int
          }[];
          reference?: string;
        };
      }
    >,
    {
      authorization: string;
    }
  >;

export type PostTestHelpersIssuingAuthorizationsAuthorizationCaptureResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Issuing_Authorization>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersIssuingAuthorizationsAuthorizationCaptureRequestResult =
  RequestResult<
    PostTestHelpersIssuingAuthorizationsAuthorizationCaptureRequest,
    PostTestHelpersIssuingAuthorizationsAuthorizationCaptureResponse
  >;

export function postTestHelpersIssuingAuthorizationsAuthorizationCapture(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersIssuingAuthorizationsAuthorizationCaptureRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersIssuingAuthorizationsAuthorizationCaptureRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersIssuingAuthorizationsAuthorizationCaptureEndpointSchema,
      payload
    ),
    config
  );
}
