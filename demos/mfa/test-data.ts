// ALL TEST DATA INCLUDING PASSWORDS AND MFA SECRET KEYS ARE FOR DEMO & TESTING PURPOSES
export const testData = {
  sb: {
    url: "https://seleniumbase.io/realworld/login",
    username: "demo_user",
    password: "secret_pass",
    totpSecret: process.env.DEMO_TOTP_SB_SECRET,
  },
  at: {
    urlQuestion: "https://authenticationtest.com/questionChallenge/",
    urlTotp: "https://authenticationtest.com/totpChallenge/",
    uriTotp: "https://authenticationtest.com/login/?mode=totpChallenge",
    emailQuestion: "question@authenticationtest.com",
    emailTotp: "totp@authenticationtest.com",
    password: "pa$$w0rd",
    totpSecret: process.env.DEMO_TOTP_AT_SECRET,
    securityQAs: {
      "what city were you born in?": "chicago",
      "what make was your first car?": "bentley",
      "who did you take to the prom?": "nobody",
    },
  },
};
// ENUMS
export enum mfaMethod {
  TOTP,
  QUESTION,
}
export enum demoSite {
  SB,
  AT,
}
