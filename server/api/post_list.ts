import fs from "node:fs";

export type TreeNode = {
  path: string;
  name: string;
  isDir: boolean;
  children?: TreeNode[];
};

export default defineEventHandler(() => {
  try {
    const tree: TreeNode[] = [];
    const files = fs.readdirSync(`./assets/posts`);
    files.forEach((file) => {
      const stat = fs.statSync(`./assets/posts/${file}`);
      if (stat.isDirectory()) {
        const subFiles = fs.readdirSync(`./assets/posts/${file}`);
        const subTree = subFiles.map((subFile) => {
          return {
            path: `${file}/${subFile}`,
            name: subFile,
            isDir: false,
          };
        });
        tree.push({
          path: file,
          name: file,
          isDir: true,
          children: subTree,
        });
      } else {
        tree.push({
          path: file,
          name: file,
          isDir: false,
        });
      }
    });
    return tree;
  } catch (e) {
    return [];
  }
});
