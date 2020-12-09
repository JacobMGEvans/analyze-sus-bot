import { Context } from "probot";
import { VTURLReq, VTIDAnalysis } from "../api/virus-total";

/**
 *
 * @param Context Probot
 */
export async function urlManualAnalysis(context: Context): Promise<void> {
  const comment = context.payload.comment;
  const bodyArr = comment.body.split(` `);

  const analyzeCmdIndex = bodyArr.findIndex(
    (value: string) => value === `!analyze`
  );
  const cmdType = bodyArr[analyzeCmdIndex];
  const searchType = bodyArr[analyzeCmdIndex + 1];
  if (!cmdType && !searchType) return;
  const analyzeTarget = bodyArr[analyzeCmdIndex + 2];

  type VTURLRes = {
    id: ``;
    type: ``;
  } | null;

  try {
    const resObj: VTURLRes = (await VTURLReq(analyzeTarget)).data;
    if (!resObj?.id) return;

    const analysisRes = await VTIDAnalysis(resObj?.id);

    const issueComment = context.issue({
      body: `**URL Analysis:**
      ${JSON.stringify(analysisRes.data.attributes.stats, null, 2)}
      `,
    });
    await context.octokit.issues.createComment(issueComment);
  } catch (er) {
    console.debug(er.response, `ERROR`);
  }
}
