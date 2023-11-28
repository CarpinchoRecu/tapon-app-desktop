import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { MdCancel } from 'react-icons/md'

const BtnAtras = ({ set1, set2, set3, set4, cancelType }) => {
  const cancel = cancelType

  const handleAtras = () => {
    set1(false)
    set2(false)
    set3(false)
    set4(false)
  }

  return (
    <div onClick={handleAtras} className={cancel === true ? "btn__cerrar" :"btn__volver"}>
      {cancel === true ? <MdCancel /> : <FaRegArrowAltCircleLeft />}
    </div>
  )
}

export default BtnAtras
