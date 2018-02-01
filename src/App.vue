<template>
  <div id="app">
    <page-head></page-head>
    <router-view/>
  </div>
</template>

<script>
import PageHead from '@/components/PageHead';

export default {
  name: 'App',
  components: { PageHead },
};
</script>

<style src="./index.scss" lang="scss"></style>
