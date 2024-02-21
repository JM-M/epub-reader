import { useState, useRef, useEffect } from 'react'
import { ReactReader } from '../lib/index'
import type { Contents, Rendition } from 'epubjs'
import cx from 'classnames'

import { DEMO_URL, DEMO_NAME, DEMO_URL_2 } from '../components/config'
import { Example } from '../components/Example'

type ITextSelection = {
  text: string
  cfiRange: string
}

const fontFamilies: string[] = [
  'IBM Plex Sans',
  'Josefin Sans',
  'Comfortaa',
  'Roboto',
  'Noto Sans',
  'Noto Serif',
  'EB Garamond',
]

type ITheme = 'light' | 'dark'

function updateTheme(rendition: Rendition, theme: ITheme) {
  const themes = rendition.themes
  switch (theme) {
    case 'dark': {
      themes.override('color', '#fff')
      themes.override('background', '#000')
      break
    }
    case 'light': {
      rendition.hooks.content.register((contents: Contents) => {
        const body = contents.window.document.querySelector('body')
        if (body) body.style.color = 'red'
      })
      themes.override('color', '#000')
      themes.override('background', '#fff')
      break
    }
  }
}

const Reader = () => {
  const [selections, setSelections] = useState<ITextSelection[]>([])
  const [rendition, setRendition] = useState<Rendition | undefined>(undefined)
  const [location, setLocation] = useState<string | number>(0)
  const [theme, setTheme] = useState<ITheme>('dark')
  const [fontFamily, setFontFamily] = useState<string>('IBM Plex Sans')
  const [fontSize, setFontSize] = useState<number>(100)
  const [lineHeight, setLineHeight] = useState<number>(150)

  const pageObservers = useRef<MutationObserver[]>([])

  useEffect(() => {
    if (rendition) {
      updateTheme(rendition, theme)
    }
  }, [theme])

  useEffect(() => {
    if (rendition) {
      function setRenderSelection(cfiRange: string, contents: Contents) {
        if (rendition) {
          setSelections((list) =>
            list.concat({
              text: rendition.getRange(cfiRange).toString(),
              cfiRange,
            })
          )
          rendition.annotations.add(
            'highlight',
            cfiRange,
            {},
            (e: Event) => console.log(e.target),
            'hl',
            {
              fill: '#333',
              stroke: '#facc15',
              borderRadius: '6px',
              'fill-opacity': '0.5',
              'mix-blend-mode': 'multiply',
            }
          )
          const selection = contents.window.getSelection()
          setTimeout(() => selection?.removeAllRanges(), 300)
        }
      }
      rendition.on('selected', setRenderSelection)
      return () => {
        rendition?.off('selected', setRenderSelection)
      }
    }
  }, [setSelections, rendition])

  useEffect(() => {
    if (rendition) {
      if (fontFamily) {
        const pageIframe = document
          .querySelector('.epub-view')
          ?.querySelector('iframe')
        pageIframe?.contentWindow?.postMessage(
          { fontFamily: 'IBM Plex Sans' },
          '*'
        )
        rendition.themes.font(fontFamily)
      }
    }
  }, [rendition, fontFamily])

  useEffect(() => {
    if (rendition) {
      if (fontSize) rendition.themes.fontSize(`${fontSize}%`)
    }
  }, [rendition, fontSize])

  useEffect(() => {
    if (pageObservers.current?.length) {
      pageObservers.current.forEach((observer) => observer.disconnect())
      pageObservers.current = []
    }
    let observer: MutationObserver | null = null
    if (rendition) {
      const handlePage = (page: HTMLElement) => {
        var observer = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            if (
              mutation.type === 'childList' &&
              mutation.addedNodes.length > 0
            ) {
              // Loop through the added nodes
              mutation.addedNodes.forEach(function (node) {
                // Check if the added node is an element
                if (node.nodeType === Node.ELEMENT_NODE) {
                  const element = node as HTMLElement
                  if (element?.tagName.toLowerCase() === 'iframe') {
                    setTimeout(() => {
                      ;(
                        element as HTMLIFrameElement
                      )?.contentWindow?.postMessage({ lineHeight }, '*')
                    }, 250)
                  }
                }
              })
            }
          })
        })

        var observerConfig = { childList: true }

        // Start observing the parent element
        observer.observe(page, observerConfig)
        pageObservers.current.push(observer)
      }
      setTimeout(() => {
        const pageContainer = document.querySelector('.epub-container')
        if (!pageContainer) return
        const pages = Array.from(pageContainer.querySelectorAll('.epub-view'))
        pages.forEach((page) => {
          handlePage(page as HTMLElement)
          const pageIframe = page.querySelector('iframe')
          pageIframe?.contentWindow?.postMessage({ lineHeight }, '*')
        })
        observer = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            // Check if nodes were added to the target element
            if (
              mutation.type === 'childList' &&
              mutation.addedNodes.length > 0
            ) {
              // Loop through the added nodes
              mutation.addedNodes.forEach(function (node) {
                // Check if the added node is an element
                if (node.nodeType === Node.ELEMENT_NODE) {
                  const isEpubView = (node as HTMLElement).className.includes(
                    'epub-view'
                  )
                  const page = isEpubView ? (node as HTMLElement) : null
                  if (page) handlePage(page as HTMLElement)
                }
              })
            }
          })
        })
        const observerConfig = { childList: true }
        observer.observe(pageContainer, observerConfig)
      }, 250)
    }
    return () => {
      observer && observer.disconnect()
    }
  }, [rendition, lineHeight])

  const increaseFontSize = () => {
    if (fontSize < 200) setFontSize((v) => v + 10)
  }

  const decreaseFontSize = () => {
    if (fontSize > 50) setFontSize((v) => v - 10)
  }

  const increaseLineHeight = () => {
    if (fontSize < 200) setLineHeight((v) => v + 10)
  }

  const decreaseLineHeight = () => {
    if (fontSize > 50) setLineHeight((v) => v - 10)
  }

  return (
    <div className="h-screen">
      <ReactReader
        url={DEMO_URL_2}
        title={DEMO_NAME}
        location={location}
        locationChanged={(loc: string) => setLocation(loc)}
        getRendition={(_rendition: Rendition) => {
          setRendition(_rendition)
          updateTheme(_rendition, theme)
          _rendition.settings.allowScriptedContent = true
          _rendition.settings.stylesheet = '/styles/rendition.css'
          _rendition.hooks.content.register((contents: Contents) => {
            const head = contents.window.document.querySelector('head')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = '/scripts/iframe.js'
            head?.appendChild(script)
          })
        }}
        epubOptions={{
          flow: 'scrolled-continuous',
          manager: 'continuous',
          stylesheet: '/test.css',
        }}
        fontFamilies={fontFamilies}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
        fontSize={fontSize}
        increaseFontSize={increaseFontSize}
        decreaseFontSize={decreaseFontSize}
        lineHeight={lineHeight}
        increaseLineHeight={increaseLineHeight}
        decreaseLineHeight={decreaseLineHeight}
      />
    </div>
  )
}

export default Reader
