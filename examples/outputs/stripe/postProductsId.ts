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
import {Product, Error} from './schemas';

export const postProductsIdEndpointSchema = {
  path: '/v1/products/{id}',
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
