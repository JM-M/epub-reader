import ReaderPage from '../pages/ReaderPage'

type Props = {}
const ReaderLayout = (props: Props) => {
  return (
    <div className="bg-black min-h-screen min-w-screen text-white">
      <main className="container mx-auto">
        <ReaderPage />
      </main>
    </div>
  )
}
export default ReaderLayout
