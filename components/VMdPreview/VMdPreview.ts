import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

import Prism from 'prismjs'
import 'prismjs/components/prism-json'

VMdPreview.use(vuepressTheme, {
  Prism
})

export default VMdPreview
