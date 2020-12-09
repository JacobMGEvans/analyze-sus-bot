import { Probot } from "probot";
import { URLSearchParams } from "url";
import fetch from "node-fetch";

export = async ({ app }: { app: Probot }): Promise<void> => {
  app.on(`issue_comment.created`, async (context) => {
    const comment = context.payload.comment;
    const bodyArr = comment.body.split(` `);

    const analyzeCmd = bodyArr.findIndex((value) => value === `!analyze`);
    if (!bodyArr[analyzeCmd]) return;

    // const cmdType = bodyArr[analyzeCmd];
    // const searchType = bodyArr[analyzeCmd + 1];
    const analyzeTarget = bodyArr[analyzeCmd + 2];
    const response = virusTotalURLReqs(analyzeTarget);
    try {
      console.log(await response);
    } catch (er) {
      console.log(er.response, `ERROR`);
    }
    // const issueComment = context.issue({
    //   body: "Thanks for opening this issue!",
    // });
    // await context.octokit.issues.createComment(issueComment);
  });

  // app.on("pull_request_review_comment.created", async (context) => {
  //   console.log(context);
  //   // const issueComment = context.issue({
  //   //   body: "Thanks for opening this issue!",
  //   // });
  //   // await context.octokit.issues.createComment(issueComment);
  // });
};
// type urlRes = {
//   data: {
//     id: ``;
//     type: ``;
//   };
// };
const virusTotalURLReqs = async (url: string) => {
  const formStruct = new URLSearchParams();
  formStruct.append(`url`, url);
  return (
    await fetch(`https://www.virustotal.com/api/v3/urls`, {
      method: `POST`,
      body: formStruct,
      headers: {
        "x-apikey": process.env.VIRUS_TOTAL_KEY as string,
      },
    })
  ).json();
};
