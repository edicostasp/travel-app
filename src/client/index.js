import './styles/style.scss'

import { updateUI } from './js/updateUI'
import { handleSubmit } from './js/app'

document.getElementById('generate').addEventListener('click', handleSubmit)

export {
    updateUI,
    handleSubmit
}