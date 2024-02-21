const body = window.document.querySelector('body')
const head = window.document.querySelector('head')

const preconnectLinks = [
  document.createElement('link'),
  document.createElement('link'),
]
preconnectLinks.forEach((link, i) => {
  link.rel = 'preconnect'
  if (i === 0) link.href = 'https://fonts.googleapis.com'
  if (i === 1) {
    link.href = 'https://fonts.gstatic.com'
    link.setAttribute('crossorigin', '')
  }
  head.appendChild(link)
})

const addGoogleFont = (fontFamily) => {
  const link = document.createElement('link')
  link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replaceAll(
    ' ',
    '+'
  )}&display=swap`
  link.rel = 'stylesheet'
  head.appendChild(link)
}

const fonts = [
  'IBM Plex Sans',
  'Josefin Sans',
  'Comfortaa',
  'Roboto',
  'Noto Sans',
  'Noto Serif',
  'EB Garamond',
]
fonts.forEach((fontFamily) => addGoogleFont(fontFamily))

window.addEventListener('message', function (event) {
  const { fontFamily, lineHeight } = event.data || {}
  if (lineHeight) body.style.lineHeight = `${lineHeight}%`
})
