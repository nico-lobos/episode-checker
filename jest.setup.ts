// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import 'cross-fetch/polyfill';
import { TextEncoder, TextDecoder } from 'util';
if (!globalThis.TextEncoder) globalThis.TextEncoder = TextEncoder;
if (!globalThis.TextDecoder) globalThis.TextDecoder = TextDecoder;

import '@testing-library/jest-dom';
import { server } from './app/mock/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close()); 