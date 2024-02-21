import React, {
  type CSSProperties,
  type ReactNode,
  useState,
  useRef,
  useEffect,
  createRef,
} from 'react'
import { type SwipeableProps, useSwipeable } from 'react-swipeable'
import { EpubView, type IEpubViewStyle, type IEpubViewProps } from '..'
import {
  ReactReaderStyle as defaultStyles,
  type IReactReaderStyle,
} from './style'
import { type NavItem } from 'epubjs'
import ReaderNav from './components/ReaderNav'
import Toc from './components/Toc'
import Settings from './components/Settings'

type SwipeWrapperProps = {
  children: ReactNode
  swipeProps: Partial<SwipeableProps>
}

const SwipeWrapper = ({ children, swipeProps }: SwipeWrapperProps) => {
  const handlers = useSwipeable(swipeProps)
  return <div {...handlers}>{children}</div>
}

type TocItemProps = {
  data: NavItem
  setLocation: (value: string) => void
  styles?: CSSProperties
}

const TocItem = ({ data, setLocation }: TocItemProps) => {
  return (
    <div>
      <button
        onClick={() => setLocation(data.href)}
        className="select-none appearance-none bg-none border-0 border-b border-b-neutral-700 [border-image:initial] block w-full text-sm text-left py-3 px-4 outline-none cursor-pointer"
      >
        {data.label}
      </button>
      {data.subitems && data.subitems.length > 0 && (
        <div style={{ paddingLeft: 10 }}>
          {data.subitems.map((item, i) => (
            <TocItem key={i} data={item} setLocation={setLocation} />
          ))}
        </div>
      )}
    </div>
  )
}

export type IReactReaderProps = IEpubViewProps & {
  title?: string
  showToc?: boolean
  showNavArrows?: boolean
  readerStyles?: IReactReaderStyle
  epubViewStyles?: IEpubViewStyle
  swipeable?: boolean
  fontFamilies?: string[]
  fontFamily?: string
  setFontFamily?: Function
  fontSize: number
  decreaseFontSize: Function
  increaseFontSize: Function
  lineHeight: number
  increaseLineHeight: Function
  decreaseLineHeight: Function
}

export const ReactReader: React.FC<IReactReaderProps> = ({
  title = true,
  showNavArrows = false,
  tocChanged: _tocChanged,
  locationChanged: _locationChanged,
  readerStyles = defaultStyles,
  loadingView,
  epubViewStyles,
  swipeable,
  fontFamilies,
  fontFamily,
  setFontFamily,
  fontSize,
  increaseFontSize,
  decreaseFontSize,
  lineHeight,
  increaseLineHeight,
  decreaseLineHeight,
  ...props
}) => {
  const [expandedToc, setExpandedToc] = useState<boolean>(false)
  const [expandedSettings, setExpandedSettings] = useState<boolean>(false)
  const [location, setLocation] = useState<string>()
  const [toc, setToc] = useState<NavItem[]>([])

  const readerRef = createRef<EpubView>()
  const tocChanged = useRef(_tocChanged).current
  const locationChanged = useRef(_locationChanged).current

  const toggleToc = () => setExpandedToc((v) => !v)
  const toggleSettings = () => setExpandedSettings((v) => !v)

  const next = () => {
    const node = readerRef.current
    if (node && node.nextPage) {
      node.nextPage()
    }
  }

  const prev = () => {
    const node = readerRef.current
    if (node && node.prevPage) {
      node.prevPage()
    }
  }

  const onTocChange = (toc: NavItem[]) => setToc(toc)
  useEffect(() => {
    tocChanged && tocChanged(toc)
  }, [toc])

  useEffect(() => {
    setExpandedToc(false)
    if (location) locationChanged && locationChanged(location)
  }, [location, locationChanged])

  return (
    <div style={readerStyles.container}>
      <div
        style={Object.assign(
          {},
          readerStyles.readerArea,
          expandedToc ? readerStyles.containerExpandedRight : {},
          expandedSettings ? readerStyles.containerExpandedLeft : {}
        )}
      >
        <ReaderNav
          title={title}
          expandedToc={expandedToc}
          toggleToc={toggleToc}
          expandedSettings={expandedSettings}
          toggleSettings={toggleSettings}
        />
        <SwipeWrapper
          swipeProps={{
            onSwipedRight: prev,
            onSwipedLeft: next,
            trackMouse: true,
          }}
        >
          <div style={readerStyles.reader} className="z-0 mt-5">
            <EpubView
              ref={readerRef}
              loadingView={
                loadingView === undefined ? (
                  <div style={readerStyles.loadingView}>Loading…</div>
                ) : (
                  loadingView
                )
              }
              epubViewStyles={epubViewStyles}
              tocChanged={onTocChange}
              locationChanged={locationChanged}
              epubOptions={{
                flow: 'scrolled',
                manager: 'continuous',
              }}
              {...props}
            />
            {swipeable && <div style={readerStyles.swipeWrapper} />}
          </div>
        </SwipeWrapper>
        {expandedSettings && (
          <Settings
            readerStyles={readerStyles}
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
        )}
        {expandedToc && toc && (
          <Toc
            toc={toc}
            readerStyles={readerStyles}
            expandedToc={expandedToc}
            toggleToc={toggleToc}
            setLocation={setLocation}
          />
        )}
      </div>
    </div>
  )
}
