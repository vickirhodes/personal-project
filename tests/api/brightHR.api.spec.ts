import { test } from '@playwright/test';
import {
  addHoliday,
  deleteHoliday,
  getBrightHRToken,
} from '../helpers/brightHRHelpers';

test('Add holiday to fixed days employee', async ({ request }) => {
  const token = await getBrightHRToken(request);
  let holidayId: string | undefined;

  try {
    const createdHoliday = await addHoliday(request, token);
    holidayId = createdHoliday.id;
  } finally {
    if (holidayId) {
      await deleteHoliday(request, token, holidayId);
    }
  }
});