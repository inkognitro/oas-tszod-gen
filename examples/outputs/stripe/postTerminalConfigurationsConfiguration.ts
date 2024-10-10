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
import {Terminal_Configuration} from './terminal';
import {Deleted_terminal_Configuration} from './deleted_terminal';
import {Error} from './schemas';

export const postTerminalConfigurationsConfigurationEndpointSchema = {
  path: '/v1/terminal/configurations/{configuration}',
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

export type PostTerminalConfigurationsConfigurationRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      bbpos_wisepos_e?: (
        | {
            splashscreen?: string | '';
          }
        | ''
      ) &
        Partial<{
          splashscreen?: string | '';
        }>;
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
      reboot_window?: (
        | {
            end_hour: number; // int
            start_hour: number; // int
          }
        | ''
      ) &
        Partial<{
          end_hour: number; // int
          start_hour: number; // int
        }>;
      stripe_s700?: (
        | {
            splashscreen?: string | '';
          }
        | ''
      ) &
        Partial<{
          splashscreen?: string | '';
        }>;
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
      verifone_p400?: (
        | {
            splashscreen?: string | '';
          }
        | ''
      ) &
        Partial<{
          splashscreen?: string | '';
        }>;
    }
  >,
  {
    configuration: string;
  }
>;

export type PostTerminalConfigurationsConfigurationResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        (Terminal_Configuration | Deleted_terminal_Configuration) &
          (Partial<Terminal_Configuration> &
            Partial<Deleted_terminal_Configuration>)
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTerminalConfigurationsConfigurationRequestResult =
  RequestResult<
    PostTerminalConfigurationsConfigurationRequest,
    PostTerminalConfigurationsConfigurationResponse
  >;

export function postTerminalConfigurationsConfiguration(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTerminalConfigurationsConfigurationRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTerminalConfigurationsConfigurationRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTerminalConfigurationsConfigurationEndpointSchema,
      payload
    ),
    config
  );
}
