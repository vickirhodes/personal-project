import { test, expect } from '@playwright/test';
import {
  addHoliday,
  deleteHoliday,
  getBrightHRToken,
} from '../helpers/brightHRHelpers';

test('Add holiday to fixed days employee', async ({ request }) => {
  const tokenResponse = await getBrightHRToken(request);
  expect(tokenResponse.status).toBe(200);

  const token = tokenResponse.body.access_token ?? tokenResponse.body.accessToken ?? tokenResponse.body.token;
  expect(typeof token).toBe('string');

  let holidayId: string | undefined;

  try {
    const holidayResponse = await addHoliday(request, token as string);
    expect(holidayResponse.status).toBe(200);
    expect(holidayResponse.body).toHaveProperty('id');
    expect(typeof holidayResponse.body.id).toBe('string');
    holidayId = holidayResponse.body.id as string;
  } finally {
    if (holidayId) {
      const deleteResponse = await deleteHoliday(request, token as string, holidayId);
      expect(deleteResponse.status).toBe(204);
    }
  }
});