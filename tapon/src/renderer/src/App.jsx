import Editar from './components/Editar.jsx'
import Eliminar from './components/Eliminar.jsx'
import Footer from './components/Footer.jsx'
import Home from './components/Home.jsx'
import { DatosProvider } from './context/DatosContextFile.jsx'
import style from './style/main.scss'


function App() {

  return(
    <DatosProvider>
      <Home />
    </DatosProvider>
  ) 
}

export default App
