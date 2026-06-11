import { expect, type Locator, type Page } from '@playwright/test';
export class BrightHRPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly companyName: Locator;
  readonly logoutLink: Locator;
  readonly employeeHubButton: Locator;
  readonly employeeSearchInput: Locator;
  readonly employeeProfileLink: Locator;
  readonly employeeNameHeading: Locator;
  readonly addAnnualLeaveButton: Locator
  readonly annualLeaveStartDateInput: Locator;
  readonly annualLeaveNotesInput: Locator;
  readonly addAbsenceButton: Locator;
  readonly successMessage: Locator;
  readonly annualLeaveRow: Locator;
  readonly deleteAnnualLeaveButton: Locator;
  readonly confirmDeleteButton: Locator;
  readonly annualLeaveDate: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByRole('textbox', { name: 'Email address' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password visibility' });
        this.loginButton = page.getByTestId('login-button');
        this.companyName = page.getByRole('heading', { name: 'victoria\'s test' });
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
        this.employeeHubButton = page.getByRole('link', { name: 'Employees' });
        this.employeeSearchInput = page.getByRole('textbox', { name: 'Find' });
        this.employeeProfileLink = page.getByTestId('profile-link');
        this.employeeNameHeading = page.getByRole('heading', { name: 'Daysfixed Employee' });
        this.addAnnualLeaveButton = page.getByRole('button', { name: 'Add annual leave' });
        this.annualLeaveStartDateInput = page.getByRole('textbox', { name: 'Date picker - start date' });
        this.annualLeaveNotesInput = page.getByPlaceholder('Notes regarding the absence');
        this.addAbsenceButton = page.getByRole('button', { name: 'Add absence' });
        this.successMessage = page.getByText('You have added this annual leave for Daysfixed. Daysfixed will be off on Mon 13 Jul and 1 day will be deducted from their entitlement.');
        this.annualLeaveRow = page.getByRole('row', { name: 'Annual leave Mon 13 Jul 2026' });
        this.deleteAnnualLeaveButton = this.annualLeaveRow.getByTestId('delete-icon');
        this.confirmDeleteButton = page.getByTestId('delete-button');
        this.annualLeaveDate = page.getByText('Mon 13 Jul');
    }
}

