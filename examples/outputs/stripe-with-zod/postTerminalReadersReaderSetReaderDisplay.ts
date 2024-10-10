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

export const postTerminalReadersReaderSetReaderDisplayEndpointSchema = {
  path: '/v1/terminal/readers/{reader}/set_reader_display',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    reader: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        cart: z
          .object({
            currency: z.string(),
            line_items: z.array(
              z.object({
                amount: z.number().int().safe().finite(),
                description: z.string(),
                quantity: z.number().int().safe().finite(),
              })
            ),
            tax: z.number().int().safe().finite().optional(),
            total: z.number().int().safe().finite(),
          })
          .optional(),
        expand: z.array(z.string()).optional(),
        type: z.enum(['cart']),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Terminal_Reader,
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

export type PostTerminalReadersReaderSetReaderDisplayRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      cart?: {
        currency: string;
        line_items: {
          amount: number; // int
          description: string;
          quantity: number; // int
        }[];
        tax?: number; // int
        total: number; // int
      };
      expand?: string[];
      type: 'cart';
    }
  >,
  {
    reader: string;
  }
>;

export type PostTerminalReadersReaderSetReaderDisplayResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Terminal_Reader>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTerminalReadersReaderSetReaderDisplayRequestResult =
  RequestResult<
    PostTerminalReadersReaderSetReaderDisplayRequest,
    PostTerminalReadersReaderSetReaderDisplayResponse
  >;

export function postTerminalReadersReaderSetReaderDisplay(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTerminalReadersReaderSetReaderDisplayRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTerminalReadersReaderSetReaderDisplayRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTerminalReadersReaderSetReaderDisplayEndpointSchema,
      payload
    ),
    config
  );
}
