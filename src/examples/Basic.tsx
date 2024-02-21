import { useState, useRef, useEffect } from 'react'
import { ReactReader } from '../lib/index'
import type { Contents, Rendition } from 'epubjs'

import { DEMO_URL, DEMO_NAME } from '../components/config'
import { Example } from '../components/Example'

export const Basic = () => {
  const [largeText, setLargeText] = useState(false)
  const rendition = useRef<Rendition | undefined>(undefined)
  const [location, setLocation] = useState<string | number>(0)
  useEffect(() => {
    rendition.current?.themes.fontSize(largeText ? '140%' : '100%')
  }, [largeText])

  useEffect(() => {
    let observer: MutationObserver | null = null
    if (rendition.current) {
      // const epubIframe = document
      //   .querySelector('.epub-view')
      //   ?.querySelector('iframe')
      // epubIframe?.contentWindow?.postMessage({ font: 'IBM Plex Sans' }, '*')

      const epubContainer = document.querySelector('.epub-container')
      if (!epubContainer) return
      observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          // Check if nodes were added to the target element
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            // Loop through the added nodes
            mutation.addedNodes.forEach(function (node) {
              // Check if the added node is an element
              if (node.nodeType === Node.ELEMENT_NODE) {
                console.log(
                  (node as HTMLElement).className.includes('epub-view')
                )
                // console.log(
                //   'A child element was appended to the target element.'
                // )
                // Do something with the added child element
              }
            })
          }
        })
      })
      const observerConfig = { childList: true }
      observer.observe(epubContainer, observerConfig)
    }
    return () => {
      observer && observer.disconnect()
    }
  }, [rendition.current])

  return (
    <Example
      title="Basic example"
      actions={
        <>
          <button onClick={() => setLargeText(!largeText)} className="btn">
            Toggle font-size
          </button>
        </>
      }
    >
      <ReactReader
        url={DEMO_URL}
        title={DEMO_NAME}
        location={location}
        locationChanged={(loc: string) => setLocation(loc)}
        getRendition={(_rendition: Rendition) => {
          rendition.current = _rendition
          rendition.current.settings.allowScriptedContent = true
          rendition.current.settings.script = `
                window.addEventListener('message', function(event) {
                  console.log('Received message from parent window:', event.data);
                });`

          _rendition.hooks.content.register((contents: Contents) => {
            const head = contents.window.document.querySelector('head')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = '/scripts/iframe.js'
            head?.appendChild(script)
          })
        }}
        // epubOptions={{
        //   script: `
        //         window.addEventListener('message', function(event) {
        //           if (event.origin !== 'http://example.com') {
        //               return;
        //           }
        //           console.log('Received message from parent window:', event.data);
        //         });`,
        //   allowScriptedContent: true,
        // }}
      />
    </Example>
  )
}
