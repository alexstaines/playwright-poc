export const locators = {
  sb: {
    username: "//input[@id='username']",
    password: "//input[@id='password']",
    mfa: "//input[@id='totpcode']",
    signin: "//a[@id='log-in']",
  },
  at: {
    username: "//input[@id='email']",
    password: "//input[@id='password']",
    totpMfa: "//input[@id='totpmfa']",
    answerMfaLabel: "//label[@for='answer']",
    answerMfa: "//input[@id='answer']",
    login: "//input[@value='Log In']",
  },
};
