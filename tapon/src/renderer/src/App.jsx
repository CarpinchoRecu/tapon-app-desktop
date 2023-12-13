import Home from './screens/Home.jsx'
import { DatosProvider } from './context/DatosContextFile.jsx'
import './style/main.scss'

function App() {
  return (
    <DatosProvider>
      <Home />
    </DatosProvider>
  )
}

export default App
