import {MockServerEndpointSchema} from './httpMockServer';
import {stringify} from 'qs';

export const getPlainTextEndpointSchema: MockServerEndpointSchema = {
  path: '/plain-text',
  method: 'get',
  responseStatus: 200,
  responseContentType: 'text/plain',
  responseBody: 'pong',
};

export const postPlainTextEndpointSchema: MockServerEndpointSchema = {
  path: '/plain-text',
  method: 'post',
  expectedRequestBody: {
    contentType: 'text/plain',
    content: 'ping',
  },
  responseStatus: 200,
  responseContentType: 'text/plain',
  responseBody: 'pong',
};

export const getJsonEndpointSchema: MockServerEndpointSchema = {
  path: '/json',
  method: 'get',
  responseStatus: 200,
  responseContentType: 'application/json',
  responseBody: {foo: 'bar'},
};

export const postJsonEndpointSchema: MockServerEndpointSchema = {
  path: '/json',
  method: 'post',
  expectedRequestBody: {
    contentType: 'application/json',
    content: {foo: 'bar'},
  },
  responseStatus: 200,
  responseContentType: 'application/json',
  responseBody: {foo: 'bar'},
};

export const getFormUrlEncodedDataEndpointSchema: MockServerEndpointSchema = {
  path: '/form-urlencoded',
  method: 'get',
  responseStatus: 200,
  responseContentType: 'application/x-www-form-urlencoded',
  responseBody: stringify({foo: 'bar'}),
};

export const postFormUrlEncodedDataEndpointSchema: MockServerEndpointSchema = {
  path: '/form-urlencoded',
  method: 'post',
  expectedRequestBody: {
    contentType: 'application/x-www-form-urlencoded',
    content: {foo: 'bar'},
  },
  responseStatus: 200,
  responseContentType: 'application/x-www-form-urlencoded',
  responseBody: stringify({foo: 'bar'}),
};

const formDataBoundary = 'SomeRandomBullshit';

function createFormDataContentTypeHeader(): string {
  return `multipart/form-data; boundary=${formDataBoundary}`;
}

function createFormDataString(values: Record<string, string>) {
  const allFields: string[] = [];
  const newLine = '\r\n';
  for (const key in values) {
    const parts: string[] = [];
    parts.push(`Content-Disposition: form-data; name="${key}"`);
    parts.push(''); // new line
    parts.push(values[key]);
    allFields.push(`${parts.join(newLine)}`);
  }
  const parts: string[] = [
    `--${formDataBoundary}`,
    `${allFields.join(`${newLine}--${formDataBoundary}`)}`,
    `--${formDataBoundary}--`,
  ];
  return parts.join(newLine);
}

export const getFormDataEndpointSchema: MockServerEndpointSchema = {
  path: '/form-data',
  method: 'get',
  responseStatus: 200,
  responseContentType: createFormDataContentTypeHeader(),
  responseBody: createFormDataString({foo: 'bar'}),
};

export const postFormDataEndpointSchema: MockServerEndpointSchema = {
  path: '/form-data',
  method: 'post',
  expectedRequestBody: {
    contentType: 'multipart/form-data',
    content: {foo: 'bar'},
  },
  responseStatus: 200,
  responseContentType: createFormDataContentTypeHeader(),
  responseBody: createFormDataString({foo: 'bar'}),
};

type MockBlob = Blob & {
  lastModifiedDate?: string;
  name?: string;
};

const pdfBlob: MockBlob = new Blob(['foo'], {type: 'application/pdf'});
pdfBlob.name = 'foo.pdf';
pdfBlob.lastModifiedDate = new Date().toString();
export const mockPdfBlob = pdfBlob;

export const getBlobEndpointSchema: MockServerEndpointSchema = {
  path: '/blob',
  method: 'get',
  responseStatus: 200,
  responseContentType: 'application/pdf',
  responseBody: mockPdfBlob,
};

export const postBlobEndpointSchema: MockServerEndpointSchema = {
  path: '/blob',
  method: 'post',
  responseStatus: 200,
  expectedRequestBody: {
    contentType: 'application/pdf',
  },
  responseContentType: 'application/pdf',
  responseBody: mockPdfBlob,
};
