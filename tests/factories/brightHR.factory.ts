const env = process.env;

export function buildAuthPayload() {
  return {
    client_id: env.BRIGHTHR_CLIENT_ID ?? '',
    client_secret: env.BRIGHTHR_CLIENT_SECRET ?? '',
    grant_type: 'password',
    username: env.BRIGHTHR_USERNAME ?? '',
    password: env.BRIGHTHR_PASSWORD ?? '',
  };
}

export function buildHolidayPayload(employeeId: string, date: string) {
  return {
    startLocalDate: date,
    endLocalDate: date,
    userId: employeeId,
    startPartOfDay: 'FullDay',
    endPartOfDay: 'FullDay',
  };
}
