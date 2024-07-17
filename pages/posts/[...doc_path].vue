<template>
  <div class="markdown-body" v-html="docContent"></div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "posts",
});

const route = useRoute();

const { data: docContent } = await useFetch(
  `/api/post_content?doc_path=${(route.params.doc_path as string[]).join("/")}`
);
</script>

<style>
@import url("~/assets/css/github-markdown.css");
</style>
