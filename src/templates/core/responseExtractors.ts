import {RequestResult, Response, ResponseBody} from './core';

type ExtractContentTypeResponse<
  TRes extends Response,
  TContentType extends string,
> = Extract<TRes, {contentType: TContentType}>;

type ExtractStatusResponse<
  TRes extends Response,
  TStatus extends number,
> = Extract<TRes, {status: TStatus}>;

type ExtractResponse<
  TRequestResult extends RequestResult,
  TStatus extends NonNullable<TRequestResult['response']>['status'],
  TContentType extends ExtractStatusResponse<
    NonNullable<TRequestResult['response']>,
    TStatus
  >['contentType'],
> = ExtractContentTypeResponse<
  ExtractStatusResponse<NonNullable<TRequestResult['response']>, TStatus>,
  TContentType
>;

type ExtractRequestResultFromPromise<T> = T extends Promise<RequestResult> &
  Promise<infer RR>
  ? RR
  : never;

type RevealedResponse<TRes extends Response> = {
  body: TRes['revealBody'] extends () => Promise<infer B> ? B : never;
} & Omit<TRes, 'revealBody'>;

type ExtractResponseFromPromise<
  FetchPromise extends Promise<RequestResult>,
  TStatus extends NonNullable<TRequestResult['response']>['status'],
  TContentType extends ExtractStatusResponse<
    NonNullable<TRequestResult['response']>,
    TStatus
  >['contentType'],
  TRequestResult extends RequestResult = Awaited<FetchPromise>,
> = ExtractContentTypeResponse<
  ExtractStatusResponse<NonNullable<TRequestResult['response']>, TStatus>,
  TContentType
>;

export class NoMatchingResponseWasFoundError extends Error {
  public readonly name: string;
  public readonly requestResult: RequestResult;

  constructor(
    requestResult: RequestResult,
    status: number,
    contentType: string,
    ...params: any[]
  ) {
    super(...params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NoMatchingResponseWasFoundError);
    }
    this.name = 'OAS_TSZOD_GEN_NoMatchingResponseWasFoundError';
    this.requestResult = requestResult;
    this.message = NoMatchingResponseWasFoundError.createMessage(
      requestResult,
      status,
      contentType
    );
  }

  private static createMessage(
    requestResult: RequestResult,
    status: number,
    contentType: string
  ): string {
    const messageParts: string[] = [
      `Response does not match with ${status} and contentType ${contentType}:`,
      `\nrequest url: ${requestResult.request.url}`,
      `\nrequest method: ${requestResult.request.endpointSchema.method}`,
      `\nactual status: ${requestResult.response?.status}`,
      `\nactual contentType: ${requestResult.response?.contentType}`,
    ];
    return messageParts.join(' ');
  }
}

export async function findResponse<
  TStatus extends NonNullable<TRequestResult['response']>['status'],
  TContentType extends ExtractStatusResponse<
    NonNullable<TRequestResult['response']>,
    TStatus
  >['contentType'],
  FetchPromise extends Promise<RequestResult>,
  TRequestResult extends ExtractRequestResultFromPromise<FetchPromise>,
>(
  status: TStatus extends NonNullable<TRequestResult['response']>['status']
    ? TStatus
    : never,
  contentType: TContentType extends ExtractStatusResponse<
    NonNullable<TRequestResult['response']>,
    TStatus
  >['contentType']
    ? TContentType
    : never,
  fetchPromise: FetchPromise
): Promise<null | ExtractResponse<TRequestResult, TStatus, TContentType>> {
  return new Promise(resolve => {
    fetchPromise.then(rr => {
      if (
        !rr.response ||
        rr.response.status !== status ||
        rr.response.contentType !== contentType
      ) {
        return resolve(null);
      }
      return resolve(rr.response);
    });
  });
}

export async function getResponseOrReject<
  TStatus extends NonNullable<TRequestResult['response']>['status'],
  TContentType extends ExtractStatusResponse<
    NonNullable<TRequestResult['response']>,
    TStatus
  >['contentType'],
  FetchPromise extends Promise<RequestResult>,
  TRequestResult extends ExtractRequestResultFromPromise<FetchPromise>,
>(
  status: TStatus extends NonNullable<TRequestResult['response']>['status']
    ? TStatus
    : never,
  contentType: TContentType extends ExtractStatusResponse<
    NonNullable<TRequestResult['response']>,
    TStatus
  >['contentType']
    ? TContentType
    : never,
  fetchPromise: FetchPromise
): Promise<ExtractResponse<TRequestResult, TStatus, TContentType>> {
  return new Promise((resolve, reject) => {
    fetchPromise.then(rr => {
      if (
        !rr.response ||
        rr.response.status !== status ||
        rr.response.contentType !== contentType
      ) {
        return reject(
          new NoMatchingResponseWasFoundError(rr, status, contentType)
        );
      }
      return resolve(rr.response);
    });
  });
}

export async function findRevealedResponse<
  TStatus extends number,
  TContentType extends string,
  FetchPromise extends Promise<RequestResult>,
  TRequestResult extends ExtractRequestResultFromPromise<FetchPromise>,
>(
  status: TStatus extends NonNullable<TRequestResult['response']>['status']
    ? TStatus
    : never,
  contentType: TContentType extends ExtractStatusResponse<
    NonNullable<TRequestResult['response']>,
    TStatus
  >['contentType']
    ? TContentType
    : never,
  fetchPromise: FetchPromise
): Promise<null | RevealedResponse<
  ExtractResponseFromPromise<FetchPromise, TStatus, TContentType>
>> {
  return new Promise(resolve => {
    fetchPromise.then(rr => {
      if (
        !rr.response ||
        rr.response.status !== status ||
        rr.response.contentType !== contentType
      ) {
        return resolve(null);
      }
      const {revealBody, ...responseProps} = rr.response;
      rr.response.revealBody().then((body: ResponseBody) => {
        resolve({
          ...responseProps,
          body,
        });
      });
    });
  });
}

export async function getRevealedResponseOrReject<
  TStatus extends number,
  TContentType extends string,
  FetchPromise extends Promise<RequestResult>,
  TRequestResult extends ExtractRequestResultFromPromise<FetchPromise>,
>(
  status: TStatus extends NonNullable<TRequestResult['response']>['status']
    ? TStatus
    : never,
  contentType: TContentType extends ExtractStatusResponse<
    NonNullable<TRequestResult['response']>,
    TStatus
  >['contentType']
    ? TContentType
    : never,
  fetchPromise: FetchPromise
): Promise<
  RevealedResponse<
    ExtractResponseFromPromise<FetchPromise, TStatus, TContentType>
  >
> {
  return new Promise((resolve, reject) => {
    fetchPromise.then(rr => {
      if (
        !rr.response ||
        rr.response.status !== status ||
        rr.response.contentType !== contentType
      ) {
        return reject(
          new NoMatchingResponseWasFoundError(rr, status, contentType)
        );
      }
      const {revealBody, ...responseProps} = rr.response;
      rr.response.revealBody().then((body: ResponseBody) => {
        resolve({
          ...responseProps,
          body,
        });
      });
    });
  });
}
