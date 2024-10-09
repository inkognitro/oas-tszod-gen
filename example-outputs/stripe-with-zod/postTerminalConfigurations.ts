import {
  z_Terminal_Configuration,
  z_Error,
  Terminal_Configuration,
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

export const postTerminalConfigurationsEndpointSchema = {
  path: '/v1/terminal/configurations',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        bbpos_wisepos_e: z
          .object({
            splashscreen: z.union([z.string(), z.enum([''])]).optional(),
          })
          .optional(),
        expand: z.array(z.string()).optional(),
        name: z.string().optional(),
        offline: z
          .union([
            z.object({
              enabled: z.boolean(),
            }),
            z.enum(['']),
          ])
          .optional(),
        reboot_window: z
          .object({
            end_hour: z.number().int().safe().finite(),
            start_hour: z.number().int().safe().finite(),
          })
          .optional(),
        stripe_s700: z
          .object({
            splashscreen: z.union([z.string(), z.enum([''])]).optional(),
          })
          .optional(),
        tipping: z
          .union([
            z.object({
              aud: z
                .object({
                  fixed_amounts: z
                    .array(z.number().int().safe().finite())
                    .optional(),
                  percentages: z
                    .array(z.number().int().safe().finite())
                    .optional(),
                  smart_tip_threshold: z
                    .number()
                    .int()
                    .safe()
                    .finite()
                    .optional(),
                })
                .optional(),
              cad: z
                .object({
                  fixed_amounts: z
                    .array(z.number().int().safe().finite())
                    .optional(),
                  percentages: z
                    .array(z.number().int().safe().finite())
                    .optional(),
                  smart_tip_threshold: z
                    .number()
                    .int()
                    .safe()
                    .finite()
                    .optional(),
                })
                .optional(),
              chf: z
                .object({
                  fixed_amounts: z
                    .array(z.number().int().safe().finite())
                    .optional(),
                  percentages: z
                    .array(z.number().int().safe().finite())
                    .optional(),
                  smart_tip_threshold: z
                    .number()
                    .int()
                    .safe()
                    .finite()
                    .optional(),
                })
                .optional(),
              czk: z
                .object({
                  fixed_amounts: z
                    .array(z.number().int().safe().finite())
                    .optional(),
                  percentages: z
                    .array(z.number().int().safe().finite())
                    .optional(),
                  smart_tip_threshold: z
                    .number()
                    .int()
                    .safe()
                    .finite()
                    .optional(),
                })
                .optional(),
              dkk: z
                .object({
                  fixed_amounts: z
                    .array(z.number().int().safe().finite())
                    .optional(),
                  percentages: z
                    .array(z.number().int().safe().finite())
                    .optional(),
                  smart_tip_threshold: z
                    .number()
                    .int()
                    .safe()
                    .finite()
                    .optional(),
                })
                .optional(),
              eur: z
                .object({
                  fixed_amounts: z
                    .array(z.number().int().safe().finite())
                    .optional(),
                  percentages: z
                    .array(z.number().int().safe().finite())
                    .optional(),
                  smart_tip_threshold: z
                    .number()
                    .int()
                    .safe()
                    .finite()
                    .optional(),
                })
                .optional(),
              gbp: z
                .object({
                  fixed_amounts: z
                    .array(z.number().int().safe().finite())
                    .optional(),
                  percentages: z
                    .array(z.number().int().safe().finite())
                    .optional(),
                  smart_tip_threshold: z
                    .number()
                    .int()
                    .safe()
                    .finite()
                    .optional(),
                })
                .optional(),
              hkd: z
                .object({
                  fixed_amounts: z
                    .array(z.number().int().safe().finite())
                    .optional(),
                  percentages: z
                    .array(z.number().int().safe().finite())
                    .optional(),
                  smart_tip_threshold: z
                    .number()
                    .int()
                    .safe()
                    .finite()
                    .optional(),
                })
                .optional(),
              myr: z
                .object({
                  fixed_amounts: z
                    .array(z.number().int().safe().finite())
                    .optional(),
                  percentages: z
                    .array(z.number().int().safe().finite())
                    .optional(),
                  smart_tip_threshold: z
                    .number()
                    .int()
                    .safe()
                    .finite()
                    .optional(),
                })
                .optional(),
              nok: z
                .object({
                  fixed_amounts: z
                    .array(z.number().int().safe().finite())
                    .optional(),
                  percentages: z
                    .array(z.number().int().safe().finite())
                    .optional(),
                  smart_tip_threshold: z
                    .number()
                    .int()
                    .safe()
                    .finite()
                    .optional(),
                })
                .optional(),
              nzd: z
                .object({
                  fixed_amounts: z
                    .array(z.number().int().safe().finite())
                    .optional(),
                  percentages: z
                    .array(z.number().int().safe().finite())
                    .optional(),
                  smart_tip_threshold: z
                    .number()
                    .int()
                    .safe()
                    .finite()
                    .optional(),
                })
                .optional(),
              sek: z
                .object({
                  fixed_amounts: z
                    .array(z.number().int().safe().finite())
                    .optional(),
                  percentages: z
                    .array(z.number().int().safe().finite())
                    .optional(),
                  smart_tip_threshold: z
                    .number()
                    .int()
                    .safe()
                    .finite()
                    .optional(),
                })
                .optional(),
              sgd: z
                .object({
                  fixed_amounts: z
                    .array(z.number().int().safe().finite())
                    .optional(),
                  percentages: z
                    .array(z.number().int().safe().finite())
                    .optional(),
                  smart_tip_threshold: z
                    .number()
                    .int()
                    .safe()
                    .finite()
                    .optional(),
                })
                .optional(),
              usd: z
                .object({
                  fixed_amounts: z
                    .array(z.number().int().safe().finite())
                    .optional(),
                  percentages: z
                    .array(z.number().int().safe().finite())
                    .optional(),
                  smart_tip_threshold: z
                    .number()
                    .int()
                    .safe()
                    .finite()
                    .optional(),
                })
                .optional(),
            }),
            z.enum(['']),
          ])
          .optional(),
        verifone_p400: z
          .object({
            splashscreen: z.union([z.string(), z.enum([''])]).optional(),
          })
          .optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Terminal_Configuration,
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

export type PostTerminalConfigurationsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      bbpos_wisepos_e?: {
        splashscreen?: string | '';
      };
      expand?: string[];
      name?: string;
      offline?: (
        | {
            enabled: boolean;
          }
        | ''
      ) &
        Partial<{
          enabled: boolean;
        }>;
      reboot_window?: {
        end_hour: number; // int
        start_hour: number; // int
      };
      stripe_s700?: {
        splashscreen?: string | '';
      };
      tipping?: (
        | {
            aud?: {
              fixed_amounts?: number[]; // item: int
              percentages?: number[]; // item: int
              smart_tip_threshold?: number; // int
            };
            cad?: {
              fixed_amounts?: number[]; // item: int
              percentages?: number[]; // item: int
              smart_tip_threshold?: number; // int
            };
            chf?: {
              fixed_amounts?: number[]; // item: int
              percentages?: number[]; // item: int
              smart_tip_threshold?: number; // int
            };
            czk?: {
              fixed_amounts?: number[]; // item: int
              percentages?: number[]; // item: int
              smart_tip_threshold?: number; // int
            };
            dkk?: {
              fixed_amounts?: number[]; // item: int
              percentages?: number[]; // item: int
              smart_tip_threshold?: number; // int
            };
            eur?: {
              fixed_amounts?: number[]; // item: int
              percentages?: number[]; // item: int
              smart_tip_threshold?: number; // int
            };
            gbp?: {
              fixed_amounts?: number[]; // item: int
              percentages?: number[]; // item: int
              smart_tip_threshold?: number; // int
            };
            hkd?: {
              fixed_amounts?: number[]; // item: int
              percentages?: number[]; // item: int
              smart_tip_threshold?: number; // int
            };
            myr?: {
              fixed_amounts?: number[]; // item: int
              percentages?: number[]; // item: int
              smart_tip_threshold?: number; // int
            };
            nok?: {
              fixed_amounts?: number[]; // item: int
              percentages?: number[]; // item: int
              smart_tip_threshold?: number; // int
            };
            nzd?: {
              fixed_amounts?: number[]; // item: int
              percentages?: number[]; // item: int
              smart_tip_threshold?: number; // int
            };
            sek?: {
              fixed_amounts?: number[]; // item: int
              percentages?: number[]; // item: int
              smart_tip_threshold?: number; // int
            };
            sgd?: {
              fixed_amounts?: number[]; // item: int
              percentages?: number[]; // item: int
              smart_tip_threshold?: number; // int
            };
            usd?: {
              fixed_amounts?: number[]; // item: int
              percentages?: number[]; // item: int
              smart_tip_threshold?: number; // int
            };
          }
        | ''
      ) &
        Partial<{
          aud?: {
            fixed_amounts?: number[]; // item: int
            percentages?: number[]; // item: int
            smart_tip_threshold?: number; // int
          };
          cad?: {
            fixed_amounts?: number[]; // item: int
            percentages?: number[]; // item: int
            smart_tip_threshold?: number; // int
          };
          chf?: {
            fixed_amounts?: number[]; // item: int
            percentages?: number[]; // item: int
            smart_tip_threshold?: number; // int
          };
          czk?: {
            fixed_amounts?: number[]; // item: int
            percentages?: number[]; // item: int
            smart_tip_threshold?: number; // int
          };
          dkk?: {
            fixed_amounts?: number[]; // item: int
            percentages?: number[]; // item: int
            smart_tip_threshold?: number; // int
          };
          eur?: {
            fixed_amounts?: number[]; // item: int
            percentages?: number[]; // item: int
            smart_tip_threshold?: number; // int
          };
          gbp?: {
            fixed_amounts?: number[]; // item: int
            percentages?: number[]; // item: int
            smart_tip_threshold?: number; // int
          };
          hkd?: {
            fixed_amounts?: number[]; // item: int
            percentages?: number[]; // item: int
            smart_tip_threshold?: number; // int
          };
          myr?: {
            fixed_amounts?: number[]; // item: int
            percentages?: number[]; // item: int
            smart_tip_threshold?: number; // int
          };
          nok?: {
            fixed_amounts?: number[]; // item: int
            percentages?: number[]; // item: int
            smart_tip_threshold?: number; // int
          };
          nzd?: {
            fixed_amounts?: number[]; // item: int
            percentages?: number[]; // item: int
            smart_tip_threshold?: number; // int
          };
          sek?: {
            fixed_amounts?: number[]; // item: int
            percentages?: number[]; // item: int
            smart_tip_threshold?: number; // int
          };
          sgd?: {
            fixed_amounts?: number[]; // item: int
            percentages?: number[]; // item: int
            smart_tip_threshold?: number; // int
          };
          usd?: {
            fixed_amounts?: number[]; // item: int
            percentages?: number[]; // item: int
            smart_tip_threshold?: number; // int
          };
        }>;
      verifone_p400?: {
        splashscreen?: string | '';
      };
    }
  >
>;

export type PostTerminalConfigurationsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Terminal_Configuration>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTerminalConfigurationsRequestResult = RequestResult<
  PostTerminalConfigurationsRequest,
  PostTerminalConfigurationsResponse
>;

export function postTerminalConfigurations(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTerminalConfigurationsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTerminalConfigurationsRequestResult> {
  return requestHandler.execute(
    createRequest(postTerminalConfigurationsEndpointSchema, payload),
    config
  );
}
