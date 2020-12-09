import { Probot } from "probot";
import { URLSearchParams } from "url";
import fetch from "node-fetch";

export = async ({ app }: { app: Probot }): Promise<void> => {
  app.on(`issue_comment.created`, async (context) => {
    const comment = context.payload.comment;
    const bodyArr = comment.body.split(` `);

    const analyzeCmd = bodyArr.findIndex((value) => value === `!analyze`);
    const cmdType = bodyArr[analyzeCmd];
    const searchType = bodyArr[analyzeCmd + 1];
    if (!cmdType && !searchType) return;
    const analyzeTarget = bodyArr[analyzeCmd + 2];

    type VTURLRes = {
      id: ``;
      type: ``;
    } | null;

    try {
      const resObj: VTURLRes = (await VTURLReq(analyzeTarget)).data;
      console.log(resObj);
      if (!resObj?.id) return;

      const analysisRes = await VTIDAnalysis(resObj?.id);
      console.log(analysisRes.data.attributes.stats);
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
  // });
};

const VTURLReq = async (url: string) => {
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

const VTIDAnalysis = async (id: string) => {
  return await (
    await fetch(`https://www.virustotal.com/api/v3/analyses/${id}`, {
      method: `GET`,
      headers: {
        "x-apikey": process.env.VIRUS_TOTAL_KEY as string,
      },
    })
  ).json();
};
