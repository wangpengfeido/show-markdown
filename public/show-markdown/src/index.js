function sourceTransformInMarkdown(markdown, base) {
  const reg = /!\[[\s\S]*\]\((.*)\)/g;
  return markdown.replace(reg, function () {

  });
}

function markdown2html(markdown) {
  return marked(markdown);
}

const app = new Vue({
  el: '#app',
  data: function () {
    return {
      useSourceTransform: false,
      showing: 'page',              // 'markdown';'html';'page'
      markdownUrl: '',
      markdown: '',
      html: '',
    };
  },
  mounted() {
    this.markdownUrl = 'http://localhost:20000/test/test.md';
    axios.get('/getByUrl', {params: {url: encodeURIComponent(this.markdownUrl)}}).then(({data}) => {
      this.markdown = data;
    }, error => {
      alert('加载markdown文档失败');
    });
  },
  watch: {
    markdown() {
      this.html = markdown2html(this.markdown);
    }
  },
  methods: {
    handleChangeShowing(showing) {
      this.showing = showing;
    },
  },
});



