import { XMarkIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

type Props = { toggleSettings: Function; expandedSettings: boolean }
const SettingsToggle = ({ toggleSettings, expandedSettings }: Props) => {
  return (
    <button
      tabIndex={0}
      role="button"
      className="btn bg-transparent text-white hover:bg-neutral-700 hover:border-0 w-8 min-h-8 h-8 p-0 m-0"
      onClick={() => toggleSettings()}
    >
      {expandedSettings ? (
        <XMarkIcon className="w-6" />
      ) : (
        <Cog6ToothIcon className="w-6" />
      )}
    </button>
  )
}
export default SettingsToggle
