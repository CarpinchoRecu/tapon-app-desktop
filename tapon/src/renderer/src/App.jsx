import Home from './components/Home.jsx'
import { DatosProvider } from './context/DatosContextFile.jsx'
import style from './style/main.scss'

function App() {
  return (
    <DatosProvider>
      <Home />
    </DatosProvider>
  )
}

export default App
