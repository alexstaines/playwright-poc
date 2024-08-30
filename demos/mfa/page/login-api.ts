import { APIRequestContext } from "@playwright/test";
import { TOTPControl } from "./util-mfa";
import { testData } from "../test-data";

export class LoginAPI {
  private totpControl: TOTPControl;

  constructor(public readonly request: APIRequestContext) {
    this.totpControl = new TOTPControl();
  }

  async loginTotpRequest(email: string, password: string) {
    await this.totpControl.setSecret(process.env.DEMO_TOTP_AT_SECRET ?? "");

    return await this.request.post(testData.at.uriTotp, {
      form: {
        email: email,
        password: password,
        totpmfa: await this.totpControl.getToken(),
      },
    });
  }
}
