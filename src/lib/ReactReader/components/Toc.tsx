import { type CSSProperties } from 'react'
import { type NavItem } from 'epubjs'
import { type IReactReaderStyle } from '../style'

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
        className="select-none appearance-none bg-none border-0 border-b border-b-neutral-700 [border-image:initial] block w-full text-xs text-left py-3 px-4 outline-none cursor-pointer"
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

type Props = {
  toc: NavItem[]
  readerStyles: IReactReaderStyle
  expandedToc?: boolean
  toggleToc: Function
  setLocation: Function
}
const Toc = ({
  readerStyles,
  toc,
  expandedToc,
  toggleToc,
  setLocation,
}: Props) => {
  return (
    <div>
      <div className="absolute -left-[256px] top-0 inset-0 z-0 w-[256px]  h-full overflow-y-auto [webkit-overflow-scrolling:touch] py-3 custom-scrollbar">
        <div style={readerStyles.toc} className="mr-2">
          {toc.map((item, i) => (
            <TocItem
              data={item}
              key={i}
              setLocation={(loc) => setLocation(loc)}
              styles={readerStyles.tocAreaButton}
            />
          ))}
        </div>
      </div>
      {expandedToc && (
        <div style={readerStyles.tocBackground} onClick={() => toggleToc()} />
      )}
    </div>
  )
}
export default Toc
