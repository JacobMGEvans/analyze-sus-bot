import { Probot } from "probot";

export = ({ app }: { app: Probot }) => {
  app.on(`issue_comment.created`, async (context) => {
    const comment = context.payload.comment;
    const analyzeCmd = comment.body.search(`!analyze`);
    if (!analyzeCmd) return;
    console.log(comment.body);
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
