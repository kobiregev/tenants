import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import BaseButton from './components/ui/BaseButton.vue'
import BaseInput from './components/ui/BaseInput.vue'
import BaseDialog from './components/ui/BaseDialog.vue'
import BaseCard from './components/ui/BaseCard.vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('BaseButton', BaseButton)
app.component('BaseDialog', BaseDialog)
app.component('BaseCard', BaseCard)
app.component('BaseInput', BaseInput)

app.mount('#app')
