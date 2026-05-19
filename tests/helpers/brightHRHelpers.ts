import { expect, APIRequestContext } from '@playwright/test';

const BRIGHTHR_LOGIN_URL = 'https://sandbox-login.brighthr.com/connect/token';
const BRIGHTHR_API_URL = 'https://sandbox-api.brighthr.com';
const EMPLOYEE_ID = '1301514';
const HOLIDAY_DATE = '2026-07-13';

const env =
  (globalThis as { process?: { env?: Record<string, string | undefined> } })
    .process?.env ?? {};

const AUTH_FORM = {
  client_id: env.BRIGHTHR_CLIENT_ID ?? 'blip-android',
  client_secret: env.BRIGHTHR_CLIENT_SECRET ?? 'R0ck5uper*',
  grant_type: 'password',
  username: env.BRIGHTHR_USERNAME ?? 'victoriauk7@getnada.com',
  password: env.BRIGHTHR_PASSWORD ?? 'A123456789',
};

function extractAccessToken(body: Record<string, unknown>): string {
  const token = body.access_token ?? body.accessToken ?? body.token;
  expect(typeof token).toBe('string');
  return token as string;
}

export async function getBrightHRToken(
  request: APIRequestContext,
): Promise<string> {
  const response = await request.post(BRIGHTHR_LOGIN_URL, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: AUTH_FORM,
  });

  expect(response.status()).toBe(200);
  return extractAccessToken(await response.json());
}

export async function addHoliday(
  request: APIRequestContext,
  token: string,
): Promise<{ id: string }> {
  const response = await request.post(
    `${BRIGHTHR_API_URL}/absence/request/holiday/part/employee/${EMPLOYEE_ID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        startLocalDate: HOLIDAY_DATE,
        endLocalDate: HOLIDAY_DATE,
        userId: EMPLOYEE_ID,
        startPartOfDay: 'FullDay',
        endPartOfDay: 'FullDay',
      },
    },
  );

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty('id');
  expect(typeof body.id).toBe('string');
  return { id: body.id as string };
}

export async function deleteHoliday(
  request: APIRequestContext,
  token: string,
  holidayId: string,
): Promise<void> {
  const deleteResponse = await request.delete(
    `${BRIGHTHR_API_URL}/absence/employee/${EMPLOYEE_ID}/holiday/${holidayId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  expect(deleteResponse.status()).toBe(204);
}
