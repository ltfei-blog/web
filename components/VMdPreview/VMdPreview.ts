import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

// highlightjs
import hljs from 'highlight.js'

VMdPreview.use(vuepressTheme, {
  Hljs: hljs
})

export default VMdPreview
