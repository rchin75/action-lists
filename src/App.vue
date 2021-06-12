<template>
  <f7-app v-bind="f7params">

    <f7-view main url="/" theme-dark color-theme="orange"></f7-view>

  </f7-app>
</template>

<script>
  import routes from './routes.js';

  export default {
    data() {
      return {
        f7params: {
          routes,
          name: 'Action Lists',
          id: 'nl.roychin.action-lists'
        }
      }
    }
  }

</script>

<style>

</style>
