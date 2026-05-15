import { test, expect, APIRequestContext } from '@playwright/test';

async function getBrightHRToken(request: APIRequestContext): Promise<string> {
  const response = await request.post('https://sandbox-login.brighthr.com/connect/token', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: {
      client_id: 'blip-android',
      client_secret: 'R0ck5uper*',
      grant_type: 'password',
      username: 'victoriauk7@getnada.com',
      password: 'A123456789',
    },
  });

  expect(response.status()).toBe(200);
  const { access_token } = await response.json();
  return access_token;
}

test('Add holiday to fixed days employee', async ({ request }) => {
  const token = await getBrightHRToken(request);

  const response = await request.post(
    'https://sandbox-api.brighthr.com/absence/request/holiday/part/employee/1301514',
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        startLocalDate: '2026-07-13',
        endLocalDate: '2026-07-13',
        userId: '1301514',
        startPartOfDay: 'FullDay',
        endPartOfDay: 'FullDay',
      },
    },
  );

  expect(response.status()).toBe(200);
  
  const body = await response.json();
  const { id } = body;
  expect(body).toHaveProperty('id');

  const deleteResponse = await request.delete(
    `https://sandbox-api.brighthr.com/absence/employee/1301514/holiday/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  expect(deleteResponse.status()).toBe(204);
});