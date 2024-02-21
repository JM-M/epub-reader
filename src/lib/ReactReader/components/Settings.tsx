import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import type { IReactReaderStyle } from '../style'

type Props = {
  readerStyles: IReactReaderStyle
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
const Settings = ({
  fontFamilies = [],
  fontFamily = '',
  setFontFamily = () => null,
  fontSize,
  decreaseFontSize = () => null,
  increaseFontSize = () => null,
  lineHeight,
  increaseLineHeight = () => null,
  decreaseLineHeight = () => null,
}: Props) => {
  const closeDropdown = () => {
    const elem = document.activeElement as HTMLElement
    if (elem) elem?.blur()
  }

  return (
    <div className="absolute -right-[256px] left-[unset] top-0 inset-0 z-0 w-[256px]  h-full overflow-y-auto [webkit-overflow-scrolling:touch] ml-2 py-3 custom-scrollbar">
      <div className="mb-3">
        <div className="dropdown dropdown-end w-full">
          <div
            tabIndex={0}
            role="button"
            className="btn block text-left rounded-md text-xs px-3 py-1 m-0 min-h-[unset] h-fit w-full bg-transparent text-neutral-500"
          >
            <div className="mb-1">FONT FACE</div>
            <div className="text-white">{fontFamily}</div>
          </div>
          <div
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-md w-52"
          >
            <ul>
              {fontFamilies.map((fontFamily) => (
                <li
                  key={fontFamily}
                  onClick={() => {
                    closeDropdown()
                    setFontFamily(fontFamily)
                  }}
                >
                  <a>{fontFamily}</a>
                </li>
              ))}
            </ul>
            <div></div>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="btn hover:bg-transparent hover:border-transparent cursor-default block text-left rounded-md text-xs px-3 py-1 m-0 min-h-[unset] h-fit w-full bg-transparent text-neutral-500">
          <div className="mb-1">FONT SIZE</div>
          <div className="text-white flex justify-between items-center">
            <button
              className="btn block p-1 w-fit min-h-[unset] h-fit rounded-md"
              onClick={() => decreaseFontSize()}
              disabled={fontSize <= 50}
            >
              <MinusIcon className="w-4" />
            </button>
            <span className="text-neutral-200">{fontSize}%</span>
            <button
              className="btn block p-1 w-fit min-h-[unset] h-fit rounded-md"
              onClick={() => increaseFontSize()}
              disabled={fontSize >= 200}
            >
              <PlusIcon className="w-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div className="btn hover:bg-transparent hover:border-transparent cursor-default block text-left rounded-md text-xs px-3 py-1 m-0 min-h-[unset] h-fit w-full bg-transparent text-neutral-500">
          <div className="mb-1">LINE HEIGHT</div>
          <div className="text-white flex justify-between items-center">
            <button
              className="btn block p-1 w-fit min-h-[unset] h-fit rounded-md"
              onClick={() => decreaseLineHeight()}
              disabled={fontSize <= 50}
            >
              <MinusIcon className="w-4" />
            </button>
            <span className="text-neutral-200">{lineHeight}%</span>
            <button
              className="btn block p-1 w-fit min-h-[unset] h-fit rounded-md"
              onClick={() => increaseLineHeight()}
              disabled={fontSize >= 200}
            >
              <PlusIcon className="w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Settings
