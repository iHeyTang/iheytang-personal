import fs from "node:fs";
import md from "markdown-it";

export default defineEventHandler((event) => {
  try {
    const url = getRequestURL(event);
    const docPath = url.searchParams.get("doc_path");
    const docFile = fs.readFileSync(`public/posts/${docPath}.md`, "utf-8");
    const docContent = md({ html: true }).render(docFile);
    return docContent;
  } catch (e) {
    return;
  }
});
