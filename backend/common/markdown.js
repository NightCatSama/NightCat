import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import linkify from 'markdown-it-linkscheme/dist/markdown-it-linkscheme.min'

let md = new MarkdownIt({
  linkify  : true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
              hljs.highlight(lang, str, true).value +
              '</code></pre>'
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
  }
})

export default md
