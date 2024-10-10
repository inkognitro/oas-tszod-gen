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
import {Person, Error} from './schemas';

export const postAccountsAccountPersonsPersonEndpointSchema = {
  path: '/v1/accounts/{account}/persons/{person}',
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

export type PostAccountsAccountPersonsPersonRequest = RequestUnion<
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
    person: string;
  }
>;

export type PostAccountsAccountPersonsPersonResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Person>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostAccountsAccountPersonsPersonRequestResult = RequestResult<
  PostAccountsAccountPersonsPersonRequest,
  PostAccountsAccountPersonsPersonResponse
>;

export function postAccountsAccountPersonsPerson(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostAccountsAccountPersonsPersonRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostAccountsAccountPersonsPersonRequestResult> {
  return requestHandler.execute(
    createRequest(postAccountsAccountPersonsPersonEndpointSchema, payload),
    config
  );
}
