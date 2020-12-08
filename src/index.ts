import { Probot } from "probot";

export = ({ app }: { app: Probot }) => {
  app.on(`issue_comment.created`, async (context) => {
    const comment = context.payload.comment;
    const body = comment.body;
    // its grabbing "!"
    const analyzeCmd = body.search(`!analyze`);
    if (!body[analyzeCmd]) return;
    // grabbing "a"
    const searchType = body[analyzeCmd + 1];
    const analyzeTarget = body[analyzeCmd + 2];
    console.log(body[analyzeCmd]);
    console.log({ searchType, analyzeTarget });
    // const issueComment = context.issue({
    //   body: "Thanks for opening this issue!",
    // });
    // await context.octokit.issues.createComment(issueComment);
    return;
  });

  // app.on("pull_request_review_comment.created", async (context) => {
  //   console.log(context);
  //   // const issueComment = context.issue({
  //   //   body: "Thanks for opening this issue!",
  //   // });
  //   // await context.octokit.issues.createComment(issueComment);
  // });
};
