import { like as likeApi } from '~/apis/articles/like'

export interface Props {
  id: number
  likes: number | null
  liked: boolean | number | null
  comments: number
}

export const usePageSidebar = (
  props: Props,
  emit: (event: 'update:likes' | 'update:liked', ...args: any[]) => void
) => {
  const likes = computed({
    get() {
      return props.likes || 0
    },
    set(value) {
      console.log(value)

      emit('update:likes', value)
    }
  })
  const liked = computed({
    get() {
      return Boolean(props.liked)
    },
    set(value) {
      emit('update:liked', value)
    }
  })

  const like = async () => {
    !liked.value ? likes.value++ : likes.value--

    liked.value = !liked.value
    const res = await likeApi(props.id)
    if (res.status != 200) {
      liked.value = res.data?.liked || liked.value
      return message.error('点赞失败')
    }
  }

  const show = ref(true)
  document.body.addEventListener('touchstart', () => {
    show.value = false
  })
  document.body.addEventListener('touchend', () => {
    show.value = true
  })

  return {
    props,
    emit,
    likes,
    liked,
    like,
    show
  }
}
