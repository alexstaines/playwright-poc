import { test, expect } from "@playwright/test";
import { LoginPage } from "./page/login-page";
import { LoginAPI } from "./page/login-api";
import { testData, demoSite, mfaMethod } from "./test-data";

test("TOTP_ui - login and input totp code (Selenium Base)", async ({ page }) => {
  const loginPage = new LoginPage(page, demoSite.SB, mfaMethod.TOTP);

  loginPage.navigate(testData.sb.url);
  await expect(page).toHaveTitle(/MFA/);

  loginPage.login(testData.sb.username, testData.sb.password, demoSite.SB, mfaMethod.TOTP);
  await expect(page).toHaveTitle(/Welcome/);
});

test("TOTP_api - login and input totp code (Authentication Test)", async ({ request }) => {
  const loginAPI = new LoginAPI(request);

  const loginRequest = await loginAPI.loginTotpRequest("totp@authenticationtest.com", "pa$$w0rd");
  expect(loginRequest.url()).toMatch(/loginSuccess/);
});

test("Question_ui - login and input security question (Authentication Test)", async ({ page }) => {
  const loginPage = new LoginPage(page, demoSite.AT, mfaMethod.QUESTION);

  await loginPage.navigate(testData.at.urlQuestion);
  await expect(loginPage.btnLogin).toBeVisible();

  await loginPage.login(testData.at.emailQuestion, testData.at.password, demoSite.AT, mfaMethod.QUESTION);
  expect(page.url()).toMatch(/loginSuccess/);
});
