const app = new Vue({
  el: '#app',
  data: function () {
    return {
      markdownUrl: '',
      useSourceTransform: true,
    };
  },
  methods: {
    handleGo() {
      window.location.href = `/show-markdown/index/index.html?markdown_url=${encodeURIComponent(this.markdownUrl)}&use_source_transform=${this.useSourceTransform}`;
    },
  },
});





