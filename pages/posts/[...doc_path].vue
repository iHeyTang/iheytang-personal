<template>
  <UHeader>
    <template #logo>
      <UAvatar src="/avatar.png" class="w-auto h-6" />
    </template>
  </UHeader>

  <UContainer>
    <UPage>
      <template #left>
        <UAside>
          <UNavigationTree
            :links="navigationTree"
            default-open
            :multiple="false"
          />
        </UAside>
      </template>

      <template #default>
        <div class="my-4 p-4 rounded-lg bg-white">
          <div v-html="docContent"></div>
        </div>
      </template>
    </UPage>
  </UContainer>
</template>

<script setup lang="ts">
import type { NavigationTree } from "@nuxt/ui-pro/types";
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
  const result: NavigationTree[] = [];

  for (const post of postList) {
    const node: NavigationTree = {
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
h1 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
</style>
