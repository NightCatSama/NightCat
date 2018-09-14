<template>
  <div ref="content" class="markdown-body content" v-html="content"></div>
</template>

<script>

  export default {
    name: 'ArticleContent',
    props: ['content'],
    data () {
      return {

      }
    },
    methods: {
      // https://github.com/826327700/vue-photo-preview
      addPreviewAttrForAllImgs() {
        let imgDOMs = this.$refs.content.querySelectorAll('img');
        for (let i = 0; i< imgDOMs.length; i++) {
          imgDOMs[i].setAttribute('preview', 1);
        }
      }
    },
    mounted () {
      this.addPreviewAttrForAllImgs();
    }
  }
</script>

<style lang="scss">

</style>
