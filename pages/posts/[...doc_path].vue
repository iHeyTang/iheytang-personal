<template>
  <div
    style="
      position: sticky;
      top: 0;
      background-color: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(4px);
      z-index: 100;
      height: 64px;
    "
  >
    <div
      class="px-10 py-4"
      style="display: flex; align-items: center; gap: 24px"
    >
      <UAvatar src="/avatar.png" class="w-auto h-6" />
      <div>iHeyTang</div>
    </div>
    <UDivider />
  </div>

  <div style="display: flex; align-items: start; position: relative">
    <div
      class="px-10 py-4"
      style="
        min-width: 300px;
        height: calc(100vh - 64px);
        overflow: scroll;
        position: sticky;
        top: 64px;
      "
    >
      <NavigationTree :links="navigationTree" default-open :multiple="false" />
    </div>
    <div class="px-10 py-4">
      <div class="markdown-body" v-html="docContent"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NavigationTreeLink } from "~/components/NavigationTree/index.vue";
import type { TreeNode } from "~/server/api/post_list";

const route = useRoute();

const { data: postList } = await useFetch(`/api/post_list`);
const navigationTree = traversePostList(postList.value || []);

const { data: docContent } = await useFetch(
  `/api/post_content?doc_path=${(route.params.doc_path as string[]).join("/")}`
);

/**
 * 遍历postList，需要下钻
 * @param postList
 */
function traversePostList(postList: TreeNode[]) {
  const result: NavigationTreeLink[] = [];

  for (const post of postList) {
    const node: NavigationTreeLink = {
      label: post.name,
      replace: true,
      to: `/posts/${post.path}`.replace(/\.md$/, ""),
    };
    result.push(node);
    if (post.children) {
      node.children = traversePostList(post.children);
    }
  }
  return result;
}
</script>

<style>
@import url("~/assets/css/github-markdown.css");
</style>
