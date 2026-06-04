import { createApp } from 'vue'
import './style.css'
import '@closerclick/closer-click-support'
import '@closerclick/closer-click-install'
import { createBackNav } from '@closerclick/closer-click-nav'
import App from './App.vue'

// Navegación "volver" unificada del ecosistema (cierra modal de info / menú; el
// hub es closer.click, así que sin nada abierto el volver va a la página previa).
createBackNav()

createApp(App).mount('#app')
