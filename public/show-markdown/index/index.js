/**
 * 引用资源转换。将 markdown 中引用的 相对路径资源和不带网址的绝对路径资源 转换为 带网址的绝对路径资源
 * @param markdown markdown文本
 * @param base
 * @return {string | * | void}
 */
function sourceTransformInMarkdown(markdown, base) {
  const reg = /(!\[[\s\S]*?\])\((((\.\/)|(\/)).*)\)/g;
  return markdown.replace(reg, function ($0, $1, $2) {
    return `${$1}(${(new URL($2, base)).href})`;
  });
}

/**
 * markdown 转换为 html
 * @param markdown
 * @return {*}
 */
function markdown2html(markdown) {
  return marked(markdown);
}

const app = new Vue({
  el: '#app',
  data: function () {
    return {
      useSourceTransform: false,   // 是否启用引用资源转换
      showing: 'page',              // 当前的显示类型 'markdown';'html';'page'
      markdownUrl: '',              // markdown 地址
      markdown: '',                 // 加载到的markdown文本
      error: '',                     // 错误提示
      isLoading: false,             // 是否正在加载markdown
    };
  },
  mounted() {
    // 获取参数
    const pageLocation = new URL(window.location.href);
    this.markdownUrl = pageLocation.searchParams.get('markdown_url');
    if (!this.markdownUrl) {
      this.error = '未输入markdown地址';
      return;
    }
    this.useSourceTransform = pageLocation.searchParams.get('use_source_transform') === 'false' ? false : true;

    // 加载
    this.isLoading = true;
    axios.get('/getByUrl', {params: {url: encodeURIComponent(this.markdownUrl)}}).then(({data}) => {
      this.markdown = data;
    }, error => {
      this.error = '加载markdown文档失败';
    }).finally(() => {
      this.isLoading = false;
    });
  },
  computed: {
    // 转换的html文本
    html: function () {
      if (!this.markdown || !this.markdownUrl) {
        return '';
      }

      let markdown = this.markdown;
      if (this.useSourceTransform) {
        markdown = sourceTransformInMarkdown(markdown, this.markdownUrl);
      }
      return markdown2html(markdown);
    }
  },
  methods: {
    handleChangeShowing(showing) {
      this.showing = showing;
    },
  },
});



