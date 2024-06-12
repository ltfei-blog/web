import { on } from '~/utils/eventbus'

/**
 * 视图层事件处理
 */
export const useViewLayerEvent = () => {
  on('error_axios', (data) => {
    message.error('网络异常' + data)
  })
}
