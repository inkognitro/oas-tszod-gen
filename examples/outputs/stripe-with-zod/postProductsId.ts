import {z_Product, z_Error, Product, Error} from './schemas';
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

export const postProductsIdEndpointSchema = {
  path: '/v1/products/{id}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    id: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        active: z.boolean().optional(),
        default_price: z.string().optional(),
        description: z.union([z.string(), z.enum([''])]).optional(),
        expand: z.array(z.string()).optional(),
        images: z.union([z.array(z.string()), z.enum([''])]).optional(),
        marketing_features: z
          .union([
            z.array(
              z.object({
                name: z.string(),
              })
            ),
            z.enum(['']),
          ])
          .optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        name: z.string().optional(),
        package_dimensions: z
          .union([
            z.object({
              height: z.number().safe().finite(),
              length: z.number().safe().finite(),
              weight: z.number().safe().finite(),
              width: z.number().safe().finite(),
            }),
            z.enum(['']),
          ])
          .optional(),
        shippable: z.boolean().optional(),
        statement_descriptor: z.string().optional(),
        tax_code: z.union([z.string(), z.enum([''])]).optional(),
        unit_label: z.union([z.string(), z.enum([''])]).optional(),
        url: z.union([z.string(), z.enum([''])]).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Product,
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

export type PostProductsIdRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      active?: boolean;
      default_price?: string;
      description?: string | '';
      expand?: string[];
      images?: string[] | '';
      marketing_features?:
        | {
            name: string;
          }[]
        | '';
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      name?: string;
      package_dimensions?: (
        | {
            height: number;
            length: number;
            weight: number;
            width: number;
          }
        | ''
      ) &
        Partial<{
          height: number;
          length: number;
          weight: number;
          width: number;
        }>;
      shippable?: boolean;
      statement_descriptor?: string;
      tax_code?: string | '';
      unit_label?: string | '';
      url?: string | '';
    }
  >,
  {
    id: string;
  }
>;

export type PostProductsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Product>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostProductsIdRequestResult = RequestResult<
  PostProductsIdRequest,
  PostProductsIdResponse
>;

export function postProductsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostProductsIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostProductsIdRequestResult> {
  return requestHandler.execute(
    createRequest(postProductsIdEndpointSchema, payload),
    config
  );
}
