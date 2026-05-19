import { test, expect } from '@playwright/test';
import { BrightHRPage } from '../pages/brightHR.page';

test('Add an Annual Leave on BrightHR', async ({ page }) => {

// Log in to BrightHR
    const brightHRPage = new BrightHRPage(page);
    await brightHRPage.page.goto('https://sandbox-app.brighthr.com/dashboard');
    await brightHRPage.emailInput.fill('victoriauk7@getnada.com');
    await brightHRPage.passwordInput.fill('A123456789');
    await brightHRPage.loginButton.click();
    await page.waitForTimeout(3000);

// verify login was successful
    await expect(brightHRPage.companyName).toBeVisible();
    await expect(brightHRPage.logoutLink).toBeVisible();

//Go to Employee Profile
    await brightHRPage.employeeHubButton.click();
    await brightHRPage.employeeSearchInput.fill('daysfixed employee');
    await brightHRPage.employeeProfileLink.click();

// Verify Employee Profile page is displayed
    await expect(brightHRPage.employeeNameHeading).toBeVisible();
    await expect(brightHRPage.addAnnualLeaveButton).toBeVisible();

// Add Annual Leave
    await brightHRPage.addAnnualLeaveButton.click();
    await brightHRPage.annualLeaveStartDateInput.fill('13/07/2026');
    await brightHRPage.annualLeaveNotesInput.fill('this is a note');
    await brightHRPage.addAbsenceButton.click();
    await page.waitForTimeout(3000);

// Verify Annual Leave was added successfully
    await expect(brightHRPage.successMessage).toBeVisible();

// Delete the Annual Leave
     await brightHRPage.employeeHubButton.click();
    await brightHRPage.employeeSearchInput.fill('daysfixed employee');
    await brightHRPage.employeeProfileLink.click();
    await brightHRPage.deleteAnnualLeaveButton.click();
    await brightHRPage.confirmDeleteButton.click();

// Verify Annual Leave was deleted successfully
    await expect(brightHRPage.annualLeaveDate).not.toBeVisible();
});