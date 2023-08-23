type Theme = {
  light: {
    [key: string]: string
  }
  [name: string]: {
    [key: string]: string
  }
}

export const useThemes = (themes: Theme) => {
  const mode = useColorMode()
  watch(
    mode,
    (mode) => {
      if (mode == 'auto') {
        mode = 'light'
      }
      Object.keys(themes[mode]).forEach((e) => {
        useCssVar(`--${e}`, null).value = themes[mode][e]
      })
    },
    {
      immediate: true
    }
  )
  useCssVar(`--test`, null).value = 'red'

  return mode
}
