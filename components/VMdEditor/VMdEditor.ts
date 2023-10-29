import VMdEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

// highlightjs
import hljs from 'highlight.js'

VMdEditor.use(vuepressTheme, {
  Hljs: hljs
})

export default VMdEditor
