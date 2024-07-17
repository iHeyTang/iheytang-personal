import fs from "node:fs";

export type TreeNode = {
  path: string;
  name: string;
  isDir: boolean;
  children?: TreeNode[];
};

export default defineEventHandler(() => {
  return fetchTraverseFiles({ entryDir: "", base: "./public/posts" });
});

/**
 * 遍历文件夹并返回树状结构
 * @param entryDir
 * @returns
 */
const fetchTraverseFiles = (params: { entryDir: string; base: string }) => {
  const root = fs.readdirSync(`${params.base}${params.entryDir}`);
  const tree: TreeNode[] = [];

  root.forEach((file) => {
    if (file === "index.md") return;
    const path = `${params.base}${params.entryDir}/${file}`;
    const stat = fs.statSync(path);
    const title = getFileTitle(path);

    // 如果是一个目录，递归遍历
    const children = stat.isDirectory()
      ? fetchTraverseFiles({
          entryDir: `${params.entryDir}/${file}`,
          base: params.base,
        })
      : undefined;

    tree.push({
      path: `${params.entryDir}/${file}${stat.isDirectory() ? "/index" : ""}`,
      name: title,
      isDir: stat.isDirectory(),
      children,
    });
  });

  return tree;
};

/**
 * 获取标题名
 *
 * 即文件内容第一个大标题作为名称，如果是目录的话找目录下的index.md
 * 如果找不到标题名，就使用文件名作为标题名
 * @param path
 */
const getFileTitle = (path: string) => {
  const filename = path.split("/").pop()!;

  const stat = fs.statSync(path);
  const p = stat.isDirectory() ? getDirDefaultEntryFile(path) : path;
  if (!p) return filename;

  const content = fs.readFileSync(p, "utf-8");
  const match = content.match(/^#\s+(.+)/);
  if (match?.[1]) return match[1];

  return filename;
};

const getDirDefaultEntryFile = (path: string) => {
  if (fs.existsSync(`${path}/index.md`)) {
    return `${path}/index.md`;
  }
};
