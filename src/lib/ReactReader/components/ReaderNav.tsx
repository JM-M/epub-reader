import SettinsToggle from './SettingsToggle'
import TocToggle from './TocToggle'

type Props = {
  title: string | boolean
  expandedToc: boolean
  toggleToc: Function
  expandedSettings: boolean
  toggleSettings: Function
}
const ReaderNav = ({
  title,
  toggleToc,
  expandedToc,
  toggleSettings,
  expandedSettings,
}: Props) => {
  return (
    <div className="flex items-center justify-between h-20 px-5">
      <TocToggle toggleToc={toggleToc} expandedToc={expandedToc} />
      {title && <div className="text-white/50">{title}</div>}
      <SettinsToggle
        toggleSettings={toggleSettings}
        expandedSettings={expandedSettings}
      />
    </div>
  )
}
export default ReaderNav
