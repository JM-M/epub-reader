import { XMarkIcon, ListBulletIcon } from '@heroicons/react/24/outline'

type Props = { toggleToc: Function; expandedToc: boolean }
const TocToggle = ({ toggleToc, expandedToc }: Props) => {
  return (
    <button
      className="btn bg-transparent text-white hover:bg-neutral-700 hover:border-0 w-8 min-h-8 h-8 p-0 m-0"
      onClick={() => toggleToc()}
    >
      {expandedToc ? (
        <XMarkIcon className="w-6" />
      ) : (
        <ListBulletIcon className="w-6" />
      )}
    </button>
  )
}
export default TocToggle
