import { Page, Locator } from "@playwright/test";
import { SecurityQuestionControl, TOTPControl } from "./util-mfa";
import { locators } from "./login-page-locators";
import { testData, mfaMethod, demoSite } from "../test-data";

export class LoginPage {
  readonly inputUsername: Locator;
  readonly inputPassword: Locator;
  readonly labelMfa: Locator;
  readonly inputMfa: Locator;
  readonly btnLogin: Locator;

  constructor(public readonly page: Page, site: demoSite, mfa: mfaMethod) {
    if (site == demoSite.SB) {
      this.inputUsername = this.page.locator(locators.sb.username);
      this.inputPassword = this.page.locator(locators.sb.password);
      this.inputMfa = this.page.locator(locators.sb.mfa);
      this.btnLogin = this.page.locator(locators.sb.signin);
    }
    if (site == demoSite.AT) {
      this.inputUsername = this.page.locator(locators.at.username);
      this.inputPassword = this.page.locator(locators.at.password);
      this.btnLogin = this.page.locator(locators.at.login);
      if (mfa == mfaMethod.QUESTION) {
        this.labelMfa = this.page.locator(locators.at.answerMfaLabel);
        this.inputMfa = this.page.locator(locators.at.answerMfa);
      }
      if (mfa == mfaMethod.TOTP) {
        this.inputMfa = this.page.locator(locators.at.totpMfa);
      }
    }
  }

  async navigate(url: string) {
    await this.page.goto(url);
    await this.page.waitForLoadState("domcontentloaded");
  }

  async login(username: string, password: string, site: demoSite, mfa: mfaMethod) {
    await this.inputUsername.fill(username);
    await this.inputPassword.fill(password);

    if (mfa == mfaMethod.QUESTION) {
      const securityQuestionControl = new SecurityQuestionControl();
      await securityQuestionControl.initialiseDemoQuestionsAnswers(this.page);
      const question: string = (await this.labelMfa.textContent()).toLowerCase() ?? "No question found";
      await this.inputMfa.fill(await securityQuestionControl.getAnswer(question));
    }
    if (mfa == mfaMethod.TOTP) {
      const totpControl = new TOTPControl();
      if (site == demoSite.AT) totpControl.setSecret(testData.at.totpSecret);
      if (site == demoSite.SB) totpControl.setSecret(testData.sb.totpSecret);

      await this.inputMfa.fill(await totpControl.getToken());
    }

    await this.btnLogin.click();
  }
}
