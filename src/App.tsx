import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ExamplesLayout from './layouts/ExamplesLayout'
import ReaderLayout from './layouts/ReaderLayout'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/examples/*" element={<ExamplesLayout />} />
        <Route path="/*" element={<ReaderLayout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
