## Login Authentication and MFA
An implementation of login with multi-factor authentication using methods including time-based one-time password (TOTP) and security question.

#### Demo Websites Used: 
https://seleniumbase.io/realworld/login \
https://authenticationtest.com

---

#### Packages
node-2fa: 2-Factor integration for Nodejs, utilising an implementation of TOTP.
https://npm.runkit.com/node-2fa \
`node-2fa` will then generate the TOTP token during test run.
- See `util-totp.ts`

--- 

#### How to run

For TOTP testing, ensure you add these keys to your (dotenvx) .env:
*Both keys are meant for testing and demo purposes and can each be found on its corresponding site.
```
# secret key for https://seleniumbase.io/realworld/signup
DEMO_TOTP_SB_SECRET="GAXG2MTEOR3DMMDG"
# secret key for https://authenticationtest.com/totpChallenge/
DEMO_TOTP_AT_SECRET="I65VU7K5ZQL7WB4E"
```
```
npm run mfa-tests
```
- Completes tests for TOTP token login, via UI and API request.
- Completes test for handling of secret security question.