import {z_Person, z_Error, Person, Error} from './schemas';
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

export const postAccountsAccountPeopleEndpointSchema = {
  path: '/v1/accounts/{account}/people',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    account: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        additional_tos_acceptances: z
          .object({
            account: z
              .object({
                date: z.number().int().safe().finite().optional(),
                ip: z.string().optional(),
                user_agent: z.union([z.string(), z.enum([''])]).optional(),
              })
              .optional(),
          })
          .optional(),
        address: z
          .object({
            city: z.string().optional(),
            country: z.string().optional(),
            line1: z.string().optional(),
            line2: z.string().optional(),
            postal_code: z.string().optional(),
            state: z.string().optional(),
          })
          .optional(),
        address_kana: z
          .object({
            city: z.string().optional(),
            country: z.string().optional(),
            line1: z.string().optional(),
            line2: z.string().optional(),
            postal_code: z.string().optional(),
            state: z.string().optional(),
            town: z.string().optional(),
          })
          .optional(),
        address_kanji: z
          .object({
            city: z.string().optional(),
            country: z.string().optional(),
            line1: z.string().optional(),
            line2: z.string().optional(),
            postal_code: z.string().optional(),
            state: z.string().optional(),
            town: z.string().optional(),
          })
          .optional(),
        dob: z
          .union([
            z.object({
              day: z.number().int().safe().finite(),
              month: z.number().int().safe().finite(),
              year: z.number().int().safe().finite(),
            }),
            z.enum(['']),
          ])
          .optional(),
        documents: z
          .object({
            company_authorization: z
              .object({
                files: z.array(z.union([z.string(), z.enum([''])])).optional(),
              })
              .optional(),
            passport: z
              .object({
                files: z.array(z.union([z.string(), z.enum([''])])).optional(),
              })
              .optional(),
            visa: z
              .object({
                files: z.array(z.union([z.string(), z.enum([''])])).optional(),
              })
              .optional(),
          })
          .optional(),
        email: z.string().optional(),
        expand: z.array(z.string()).optional(),
        first_name: z.string().optional(),
        first_name_kana: z.string().optional(),
        first_name_kanji: z.string().optional(),
        full_name_aliases: z
          .union([z.array(z.string()), z.enum([''])])
          .optional(),
        gender: z.string().optional(),
        id_number: z.string().optional(),
        id_number_secondary: z.string().optional(),
        last_name: z.string().optional(),
        last_name_kana: z.string().optional(),
        last_name_kanji: z.string().optional(),
        maiden_name: z.string().optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        nationality: z.string().optional(),
        person_token: z.string().optional(),
        phone: z.string().optional(),
        political_exposure: z.string().optional(),
        registered_address: z
          .object({
            city: z.string().optional(),
            country: z.string().optional(),
            line1: z.string().optional(),
            line2: z.string().optional(),
            postal_code: z.string().optional(),
            state: z.string().optional(),
          })
          .optional(),
        relationship: z
          .object({
            director: z.boolean().optional(),
            executive: z.boolean().optional(),
            legal_guardian: z.boolean().optional(),
            owner: z.boolean().optional(),
            percent_ownership: z
              .union([z.number().safe().finite(), z.enum([''])])
              .optional(),
            representative: z.boolean().optional(),
            title: z.string().optional(),
          })
          .optional(),
        ssn_last_4: z.string().optional(),
        verification: z
          .object({
            additional_document: z
              .object({
                back: z.string().optional(),
                front: z.string().optional(),
              })
              .optional(),
            document: z
              .object({
                back: z.string().optional(),
                front: z.string().optional(),
              })
              .optional(),
          })
          .optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Person,
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

export type PostAccountsAccountPeopleRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      additional_tos_acceptances?: {
        account?: {
          date?: number; // int
          ip?: string;
          user_agent?: string | '';
        };
      };
      address?: {
        city?: string;
        country?: string;
        line1?: string;
        line2?: string;
        postal_code?: string;
        state?: string;
      };
      address_kana?: {
        city?: string;
        country?: string;
        line1?: string;
        line2?: string;
        postal_code?: string;
        state?: string;
        town?: string;
      };
      address_kanji?: {
        city?: string;
        country?: string;
        line1?: string;
        line2?: string;
        postal_code?: string;
        state?: string;
        town?: string;
      };
      dob?: (
        | {
            day: number; // int
            month: number; // int
            year: number; // int
          }
        | ''
      ) &
        Partial<{
          day: number; // int
          month: number; // int
          year: number; // int
        }>;
      documents?: {
        company_authorization?: {
          files?: (string | '')[];
        };
        passport?: {
          files?: (string | '')[];
        };
        visa?: {
          files?: (string | '')[];
        };
      };
      email?: string;
      expand?: string[];
      first_name?: string;
      first_name_kana?: string;
      first_name_kanji?: string;
      full_name_aliases?: string[] | '';
      gender?: string;
      id_number?: string;
      id_number_secondary?: string;
      last_name?: string;
      last_name_kana?: string;
      last_name_kanji?: string;
      maiden_name?: string;
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      nationality?: string;
      person_token?: string;
      phone?: string;
      political_exposure?: string;
      registered_address?: {
        city?: string;
        country?: string;
        line1?: string;
        line2?: string;
        postal_code?: string;
        state?: string;
      };
      relationship?: {
        director?: boolean;
        executive?: boolean;
        legal_guardian?: boolean;
        owner?: boolean;
        percent_ownership?: number | '';
        representative?: boolean;
        title?: string;
      };
      ssn_last_4?: string;
      verification?: {
        additional_document?: {
          back?: string;
          front?: string;
        };
        document?: {
          back?: string;
          front?: string;
        };
      };
    }
  >,
  {
    account: string;
  }
>;

export type PostAccountsAccountPeopleResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Person>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostAccountsAccountPeopleRequestResult = RequestResult<
  PostAccountsAccountPeopleRequest,
  PostAccountsAccountPeopleResponse
>;

export function postAccountsAccountPeople(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostAccountsAccountPeopleRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostAccountsAccountPeopleRequestResult> {
  return requestHandler.execute(
    createRequest(postAccountsAccountPeopleEndpointSchema, payload),
    config
  );
}
