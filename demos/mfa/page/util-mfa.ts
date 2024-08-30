import { Page } from "@playwright/test";
const twoFactor = require("node-2fa");

export class SecurityQuestionControl {
  private questionsAndAnswers: { [key: string]: string } = {};

  async getAnswer(question: string) {
    const answer: string = this.questionsAndAnswers[question.toLowerCase()] ?? "No answer found";
    return answer;
  }

  setQuestionsAnswers(questions: string[], answers: string[]) {
    let result: { [key: string]: string } = {};

    questions.forEach((key, index) => {
      key = key.toLowerCase();
      result[key] = answers[index];
    });

    this.questionsAndAnswers = result;
    return this.questionsAndAnswers;
  }

  // Fetches the questions and associated answers from Authentication Test demo site
  // using evaluate() in order to execute JS to read from text nodes.
  async initialiseDemoQuestionsAnswers(page: Page) {
    let questions: string[];
    let answers: string[];

    const questionsAnswers = await page.evaluate(() => {
      questions = $("strong:contains('Questions:')")
        .nextUntil()
        .contents()
        .text()
        .toLowerCase()
        .split(".....")
        .splice(1);
      answers = $("div.alert.alert-primary")
        .contents()
        .filter((index, el) => el.nodeType == Node.TEXT_NODE && index > 14)
        .text()
        .toLowerCase()
        .replaceAll(/\n.*\t/g, "")
        .split(" ")
        .splice(1);

      return [questions, answers];
    });

    this.setQuestionsAnswers(questionsAnswers[0], questionsAnswers[1]);
  }
}

export class TOTPControl {
  private secret: string = process.env.DEMO_TOTP_GENERATE_SECRET ?? "";

  async getToken() {
    // destructure as generateToken returns object { token: "..." }
    const { token } = (await twoFactor.generateToken(this.secret)) ?? { token: "" };
    return token;
  }

  async setSecret(secret: string) {
    this.secret = secret;
  }
}
