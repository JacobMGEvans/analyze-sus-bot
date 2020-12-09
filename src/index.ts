import { Probot } from "probot";
import { urlManualAnalysis } from "./commands/urlAnalysis";

export = async ({ app }: { app: Probot }): Promise<void> => {
  app.on(`issue_comment.created`, urlManualAnalysis);
};
