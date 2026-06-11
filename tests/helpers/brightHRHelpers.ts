import { APIRequestContext } from '@playwright/test';
import { buildAuthPayload, buildHolidayPayload } from '../factories/brightHR.factory';

const BRIGHTHR_LOGIN_URL = 'https://sandbox-login.brighthr.com/connect/token';
const BRIGHTHR_API_URL = 'https://sandbox-api.brighthr.com';
const EMPLOYEE_ID = '1301514';
const HOLIDAY_DATE = '2026-07-13';

export async function getBrightHRToken(
  request: APIRequestContext,
): Promise<{ status: number; body: Record<string, unknown> }> {
  const response = await request.post(BRIGHTHR_LOGIN_URL, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: buildAuthPayload(),
  });

  return { status: response.status(), body: await response.json() };
}

export async function addHoliday(
  request: APIRequestContext,
  token: string,
): Promise<{ status: number; body: Record<string, unknown> }> {
  const response = await request.post(
    `${BRIGHTHR_API_URL}/absence/request/holiday/part/employee/${EMPLOYEE_ID}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: buildHolidayPayload(EMPLOYEE_ID, HOLIDAY_DATE),
    },
  );

  return { status: response.status(), body: await response.json() };
}

export async function deleteHoliday(
  request: APIRequestContext,
  token: string,
  holidayId: string,
): Promise<{ status: number }> {
  const response = await request.delete(
    `${BRIGHTHR_API_URL}/absence/employee/${EMPLOYEE_ID}/holiday/${holidayId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return { status: response.status() };
}
