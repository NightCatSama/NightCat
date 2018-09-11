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
      getImages() {
        let children = this.$refs.content.children;
        for (let i = 0; i < children.length; i++) {
          let subChildren = children[i].children;
          if (subChildren.length > 0) {
            for (let j = 0; j < subChildren.length; j++) {
              if (subChildren[j].hasAttribute("src")) {
                subChildren[j].setAttribute('preview', 1)
              }
            }
          }
        }
      }
    },
    mounted () {
      this.getImages();
    }
  }
</script>

<style lang="scss">

</style>
