<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import mundialLogo from './assets/apps/mundial.svg'
import chatLogo from './assets/apps/chat.svg'
import messengerLogo from './assets/apps/messenger.svg'
import qrshareLogo from './assets/apps/qrshare.svg'
import chessLogo from './assets/apps/chess.svg'
import ecuavoleyLogo from './assets/apps/ecuavoley.svg'
import padelLogo from './assets/apps/padel.svg'
import gridgameLogo from './assets/apps/gridgame.svg'
import gymbroLogo from './assets/apps/gymbro.svg'
import faviconLogo from './assets/apps/favicon.svg'

const isScrolled = ref(false)
const menuOpen = ref(false)

/* ---------------- i18n (ES / EN) ---------------- */
type Locale = 'es' | 'en'
const LANG_KEY = 'closerclick.lang'

const detectLocale = (): Locale => {
  const saved = localStorage.getItem(LANG_KEY)
  if (saved === 'es' || saved === 'en') return saved
  return (navigator.language || 'es').toLowerCase().startsWith('en') ? 'en' : 'es'
}

const locale = ref<Locale>(detectLocale())

const messages = {
  es: {
    htmlLang: 'es',
    nav: { apps: 'Aplicaciones', service: 'Servicio', api: 'API', install: 'Instalar App' },
    install: {
      ios: 'Para instalar: pulsa el botón Compartir y luego "Añadir a pantalla de inicio".',
      other: 'Tu navegador todavía no permite la instalación automática. Usa el menú del navegador para instalar la app.',
    },
    langToggle: 'EN',
    langLabel: 'Cambiar idioma a inglés',
    hero: {
      subtitle:
        'Un ecosistema de aplicaciones que corren del lado del cliente, conectándose a través de un proxy descentralizado para gestionar y compartir contenido',
      manifestoStrong: 'Tu información, en tu servidor, bajo tus reglas.',
      manifestoRest:
        ' Lo que es tuyo, se queda contigo: tú decides qué compartes, cómo lo compartes y cuándo lo compartes. Sin intermediarios, sin nubes ajenas, sin letra pequeña.',
      cta: 'Descubre Más',
    },
    apps: {
      title: 'Aplicaciones',
      text: 'Aplicaciones que usan el proxy de Closer Click.',
      open: 'Abrir aplicación',
      fullHome: 'Ver home completo',
    },
    service: {
      title: 'Servicio',
      text: 'Comunicación por WebSocket ligero que enruta mensajes entre clientes mediante tokens cortos, sin almacenar conversaciones ni requerir cuentas.',
    },
    api: {
      title: 'API',
      text: 'Una sola conexión WebSocket. Mensajes JSON. Sin endpoints HTTP, sin SDK obligatorio.',
    },
    footer: {
      title: 'La filosofía Closer Click',
      what: { h: 'Qué comparto', p: 'Solo la información que decido exponer, nada más.' },
      how: { h: 'Cómo lo comparto', p: 'Con el formato, el acceso y las condiciones que yo defino.' },
      when: { h: 'Cuándo lo comparto', p: 'En el momento que quiero, y lo retiro cuando quiero.' },
      tagline: 'Todo sobre infraestructura que tú controlas. Eso es autohosteo. Eso es soberanía digital.',
      copy: '© 2024 Team Closer Click. Todos los derechos reservados.',
    },
  },
  en: {
    htmlLang: 'en',
    nav: { apps: 'Applications', service: 'Service', api: 'API', install: 'Install App' },
    install: {
      ios: 'To install: tap the Share button and then "Add to Home Screen".',
      other: 'Your browser does not support automatic installation yet. Use the browser menu to install the app.',
    },
    langToggle: 'ES',
    langLabel: 'Switch language to Spanish',
    hero: {
      subtitle:
        'An ecosystem of client-side applications that connect through a decentralized proxy to manage and share content',
      manifestoStrong: 'Your data, on your server, under your rules.',
      manifestoRest:
        ' What is yours stays with you: you decide what you share, how you share it and when you share it. No middlemen, no third-party clouds, no fine print.',
      cta: 'Learn More',
    },
    apps: {
      title: 'Applications',
      text: 'Applications that use the Closer Click proxy.',
      open: 'Open app',
      fullHome: 'Show full home',
    },
    service: {
      title: 'Service',
      text: 'Lightweight WebSocket communication that routes messages between clients via short tokens, without storing conversations or requiring accounts.',
    },
    api: {
      title: 'API',
      text: 'A single WebSocket connection. JSON messages. No HTTP endpoints, no mandatory SDK.',
    },
    footer: {
      title: 'The Closer Click philosophy',
      what: { h: 'What I share', p: 'Only the information I choose to expose, nothing more.' },
      how: { h: 'How I share it', p: 'With the format, access and conditions that I define.' },
      when: { h: 'When I share it', p: 'The moment I want, and I take it back whenever I want.' },
      tagline: 'All on infrastructure you control. That is self-hosting. That is digital sovereignty.',
      copy: '© 2024 Team Closer Click. All rights reserved.',
    },
  },
} as const

const t = computed(() => messages[locale.value])

type AppEntry = { name: string; repo: string; url: string; logo: string; desc: { es: string; en: string } }
const apps: AppEntry[] = [
  {
    name: 'Pronóstico Mundialista',
    url: 'https://mundial.closer.click/',
    logo: mundialLogo,
    repo: 'seyacat/pronostico-mundialista',
    desc: {
      es: 'Arma tu pronóstico del Mundial 2026 (48 selecciones) en tres modos (simple, gana/pierde o con marcador), compite con tus amigos y lleva tu tabla de aciertos. Se codifica completo en una cadena corta, se firma con tu identidad ECDSA del vault <code>id.closer.click</code> y se comparte por QR.',
      en: 'Build your 2026 World Cup predictions (48 teams) in three modes (simple, win/lose or with scoreline), compete with your friends and track your hit table. It is fully encoded in a short string, signed with your ECDSA identity from the <code>id.closer.click</code> vault and shared by QR.',
    },
  },
  {
    name: 'Closer Click Chat',
    url: 'https://chat.closer.click/',
    logo: chatLogo,
    repo: 'seyacat/simple-websocket-chat',
    desc: {
      es: 'Chat en tiempo real con salas públicas, descubrimiento de canales y mensajería P2P por WebRTC con caída automática al proxy WebSocket.',
      en: 'Real-time chat with public rooms, channel discovery and P2P messaging over WebRTC with automatic fallback to the WebSocket proxy.',
    },
  },
  {
    name: 'Closer Click Messenger',
    url: 'https://messenger.closer.click/',
    logo: messengerLogo,
    repo: 'seyacat/closerclick_messenger',
    desc: {
      es: 'Mensajería 1-a-1 con cifrado E2E (ECDH+AES-GCM), contactos compartidos entre apps del ecosistema, hilos persistidos en <code>store.closer.click</code> (mismos mensajes en web + extensión), mensajes offline (proxy retiene 24 h) y ranking integrado. PWA instalable + extensión Chrome MV3 reusando la PWA via iframe.',
      en: 'One-to-one messaging with E2E encryption (ECDH+AES-GCM), contacts shared across ecosystem apps, threads persisted in <code>store.closer.click</code> (same messages on web + extension), offline messages (proxy holds them for 24 h) and built-in ratings. Installable PWA + Chrome MV3 extension reusing the PWA via iframe.',
    },
  },
  {
    name: 'QRShare',
    url: 'https://qrshare.closer.click/',
    logo: qrshareLogo,
    repo: 'seyacat/qrshare',
    desc: {
      es: 'Transferencia de archivos P2P por WebRTC. El proxy solo descubre los peers; los archivos viajan directamente entre dispositivos. Comparte por QR.',
      en: 'P2P file transfer over WebRTC. The proxy only discovers peers; files travel directly between devices. Share by QR.',
    },
  },
  {
    name: 'Closer Click Chess',
    url: 'https://chess.closer.click/',
    logo: chessLogo,
    repo: 'seyacat/simple-websocket-chess',
    desc: {
      es: 'Ajedrez online multijugador con transporte P2P por WebRTC cuando es posible. Crea partidas públicas o privadas; el lobby se actualiza en tiempo real con los eventos del proxy.',
      en: 'Online multiplayer chess with P2P transport over WebRTC when possible. Create public or private games; the lobby updates in real time from the proxy events.',
    },
  },
  {
    name: 'Contador Ecuavóley',
    url: 'https://ecuavoley.closer.click/',
    logo: ecuavoleyLogo,
    repo: 'seyacat/ecuavoley-contador',
    desc: {
      es: 'Marcador para partidos de ecuavóley: dos paneles táctiles, indicador de saque, deshacer, cambio y reinicio. Gana el primero en llegar a 15.',
      en: 'Scoreboard for ecuavóley matches: two touch panels, serve indicator, undo, switch and reset. First to reach 15 wins.',
    },
  },
  {
    name: 'Contador Pádel',
    url: 'https://padel.closer.click/',
    logo: padelLogo,
    repo: 'seyacat/padel-contador',
    desc: {
      es: 'Marcador para partidos de pádel con puntuación de tenis (0/15/30/40, juegos y sets): dos paneles táctiles, indicador de saque, tie-break, punto de oro opcional, deshacer y reinicio.',
      en: 'Scoreboard for padel matches with tennis scoring (0/15/30/40, games and sets): two touch panels, serve indicator, tie-break, optional golden point, undo and reset.',
    },
  },
  {
    name: 'GymBro Timer',
    url: 'https://gymbro.closer.click/',
    logo: gymbroLogo,
    repo: 'seyacat/gymbro',
    desc: {
      es: 'Timer por intervalos para el gimnasio: define tu tiempo de entrenamiento y de descanso, una cuenta atrás de preparación y el número de rondas. Avisos sonoros, vibración, notificaciones en segundo plano y pantalla siempre encendida. Funciona sin conexión.',
      en: 'Interval timer for the gym: set your work and rest times, a prep countdown and the number of rounds. Sound cues, vibration, background notifications and always-on screen. Works offline.',
    },
  },
  {
    name: 'GridGame',
    url: 'https://gridgame.closer.click/',
    logo: gridgameLogo,
    repo: 'seyacat/gridgame',
    desc: {
      es: 'Sandbox multijugador cooperativo en un grid. Mundo subjetivo: cada peer hostea lo que crea y carga el entorno alrededor a medida que se mueve. Ground procedural determinista, props/items/personajes/enemigos programables vía DSL, resolución de conflictos por reputación (web-of-trust de identity) y recencia. Loot no-exclusivo, summon de enemigos por turnos ponderados por reputación.',
      en: 'Cooperative multiplayer sandbox on a grid. Subjective world: each peer hosts what it creates and loads the surrounding environment as it moves. Deterministic procedural ground, props/items/characters/enemies programmable via DSL, conflict resolution by reputation (identity web-of-trust) and recency. Non-exclusive loot, enemy summoning in turns weighted by reputation.',
    },
  },
  {
    name: 'Favicon Generator',
    url: 'https://favicon.closer.click/',
    logo: faviconLogo,
    repo: 'seyacat/favicon-generator',
    desc: {
      es: 'Genera favicons e íconos <code>.ico</code> compatibles con Windows a partir de una imagen PNG/JPG, listos para tu sitio o PWA. Todo en el navegador, sin subir nada a un servidor.',
      en: 'Generate favicons and Windows-compatible <code>.ico</code> icons from a PNG/JPG image, ready for your site or PWA. All in the browser, without uploading anything to a server.',
    },
  },
]

const serviceItems = computed(() =>
  locale.value === 'en'
    ? [
        { h: 'Ephemeral tokens', p: 'On connect, a short token (4 characters) is assigned. It acts as the client\'s logical address and is released on disconnect.' },
        { h: 'Public channels', p: 'Any client can publish itself in a named channel, list it or query its member count. 20 min TTL and up to 100 tokens per channel.' },
        { h: 'ECDSA P-256 signatures', p: 'Channel operations are signed with a public JWK key (P-256 curve). The proxy verifies the signature before accepting publish/unpublish/list.' },
        { h: 'No persistent state', p: 'The proxy stores no messages on disk and has no database. Only live memory: connections, active peers and channel entries.' },
        { h: 'WebRTC with proxy fallback', p: 'The client tries to open an <code>RTCDataChannel</code> with each peer (signaling through the proxy itself, public STUN). If negotiation succeeds messages travel P2P; if it fails, they keep flowing through the proxy transparently.' },
        { h: '24 h offline queue + multi-instance', p: 'After a signed <code>identify</code>, clients can address messages by <code>to_publickey</code>. If several instances are online (web + extension + second tab…) the proxy does a <strong>fan-out</strong> to all of them. If they are all offline, it holds them in memory for up to 24 h (200 msgs / 1 MB per pubkey) and delivers on the first reconnect.' },
        { h: 'Shared vaults', p: 'Two static subdomains keep user state in their own <code>localStorage</code> and are accessed by all apps via iframe + <code>postMessage</code>: <code>id.closer.click</code> (keys, contacts, ratings) and <code>store.closer.click</code> (DM threads). Same contacts and same messages in any ecosystem app within the same browser.' },
      ]
    : [
        { h: 'Tokens efímeros', p: 'Al conectar se asigna un token corto (4 caracteres). Sirve como dirección lógica del cliente y se libera al desconectar.' },
        { h: 'Canales públicos', p: 'Cualquier cliente puede publicarse en un canal nombrado, listarlo o consultar el número de miembros. TTL de 20 min y hasta 100 tokens por canal.' },
        { h: 'Firma ECDSA P-256', p: 'Las operaciones sobre canales se firman con clave pública JWK (curva P-256). El proxy verifica la firma antes de aceptar publish/unpublish/list.' },
        { h: 'Sin estado persistente', p: 'El proxy no guarda mensajes en disco ni tiene base de datos. Solo memoria viva: conexiones, pares activos y entradas de canal.' },
        { h: 'WebRTC con fallback al proxy', p: 'El cliente intenta abrir un <code>RTCDataChannel</code> con cada peer (señalización por el propio proxy, STUN público). Si la negociación tiene éxito los mensajes viajan P2P; si falla, siguen por el proxy de forma transparente.' },
        { h: 'Cola offline 24 h + multi-instancia', p: 'Tras un <code>identify</code> firmado, los clientes pueden direccionar mensajes por <code>to_publickey</code>. Si hay varias instancias online (web + extensión + segunda pestaña…) el proxy hace <strong>fan-out</strong> a todas. Si todas están offline, retiene en memoria hasta 24 h (200 msgs / 1 MB por pubkey) y entrega al primer reconnect.' },
        { h: 'Vaults compartidos', p: 'Dos subdominios estáticos guardan estado del usuario en su propio <code>localStorage</code> y son accedidos por todas las apps vía iframe + <code>postMessage</code>: <code>id.closer.click</code> (claves, contactos, ratings) y <code>store.closer.click</code> (hilos de DMs). Mismos contactos y mismos mensajes en cualquier app del ecosistema dentro del mismo navegador.' },
      ]
)

const apiItems = computed(() =>
  locale.value === 'en'
    ? [
        { h: 'Direct message', p: '<code>{ to: ["TKN1","TKN2"], message: ... }</code> — delivers to one or several tokens. The receiver gets <code>{ type: "message", from, message }</code>.' },
        { h: 'publish / unpublish', p: '<code>{ type: "publish", channel: { data, signature } }</code> makes the client visible in a channel. Notifies join/leave to the other members.' },
        { h: 'list / list_channels / channel_count', p: 'Discovery: tokens in a channel, channels by prefix, count. Useful for building lobbies or public rooms.' },
        { h: 'disconnect', p: '<code>{ type: "disconnect", target }</code> breaks the logical pair with another token and notifies both parties.' },
      ]
    : [
        { h: 'Mensaje directo', p: '<code>{ to: ["TKN1","TKN2"], message: ... }</code> — entrega a uno o varios tokens. El receptor recibe <code>{ type: "message", from, message }</code>.' },
        { h: 'publish / unpublish', p: '<code>{ type: "publish", channel: { data, signature } }</code> hace visible al cliente en un canal. Notifica join/leave a los demás miembros.' },
        { h: 'list / list_channels / channel_count', p: 'Descubrimiento: tokens en un canal, canales por prefijo, conteo. Útil para construir lobbies o salas públicas.' },
        { h: 'disconnect', p: '<code>{ type: "disconnect", target }</code> rompe el par lógico con otro token y notifica a ambas partes.' },
      ]
)

watch(
  locale,
  (l) => {
    localStorage.setItem(LANG_KEY, l)
    document.documentElement.lang = l
  },
  { immediate: true }
)

const VISITED_KEY = 'closerclick.visited'
const compact = ref(localStorage.getItem(VISITED_KEY) === '1')

// PWA install prompt
let deferredPrompt: any = null
const isStandalone = ref(
  window.matchMedia('(display-mode: standalone)').matches ||
  (navigator as any).standalone === true
)
const canInstall = ref(!isStandalone.value)

const onBeforeInstallPrompt = (e: Event) => {
  e.preventDefault()
  deferredPrompt = e
  canInstall.value = true
}

const onAppInstalled = () => {
  deferredPrompt = null
  canInstall.value = false
  isStandalone.value = true
}

const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream

const installApp = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    deferredPrompt = null
    canInstall.value = false
    return
  }
  if (isIOS) {
    alert(t.value.install.ios)
  } else {
    alert(t.value.install.other)
  }
}

const showFullHome = () => {
  compact.value = false
  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const scrollToSection = (sectionId: string) => {
  menuOpen.value = false
  if (compact.value && sectionId !== 'aplicaciones') {
    compact.value = false
  }
  requestAnimationFrame(() => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
  window.addEventListener('appinstalled', onAppInstalled)
  localStorage.setItem(VISITED_KEY, '1')
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
  window.removeEventListener('appinstalled', onAppInstalled)
})
</script>

<template>
  <div class="app">
    <nav :class="['navbar', { 'scrolled': isScrolled }]">
      <div class="nav-container">
        <div class="logo">
          <img src="/images/logo.png" alt="Closer Click Logo" class="logo-img" />
          <span class="logo-text">Closer Click</span>
        </div>

        <div class="nav-actions">
          <div class="lang-selector" role="group" :aria-label="t.langLabel">
            <button
              :class="{ on: locale === 'es' }"
              @click="locale = 'es'"
              aria-label="Español"
            >ES</button>
            <button
              :class="{ on: locale === 'en' }"
              @click="locale = 'en'"
              aria-label="English"
            >EN</button>
          </div>

          <button
            v-if="!isStandalone"
            @click="installApp"
            class="install-btn"
          >{{ t.nav.install }}</button>
        </div>

        <div class="nav-links desktop-links">
          <a @click="scrollToSection('aplicaciones')" class="nav-link">{{ t.nav.apps }}</a>
          <a @click="scrollToSection('servicio')" class="nav-link">{{ t.nav.service }}</a>
          <a @click="scrollToSection('api')" class="nav-link">{{ t.nav.api }}</a>
        </div>

        <button
          class="hamburger"
          :class="{ open: menuOpen }"
          @click="menuOpen = !menuOpen"
          aria-label="Menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <closer-click-support
          class="nav-support"
          href="https://ko-fi.com/seyacat"
          repo="seyacat/closerclick"
          discord="https://discord.gg/GGn6NXNQMp"
          :lang="locale"
        ></closer-click-support>
      </div>

      <div class="mobile-menu" :class="{ open: menuOpen }">
        <a @click="scrollToSection('aplicaciones')" class="nav-link">{{ t.nav.apps }}</a>
        <a @click="scrollToSection('servicio')" class="nav-link">{{ t.nav.service }}</a>
        <a @click="scrollToSection('api')" class="nav-link">{{ t.nav.api }}</a>
      </div>
    </nav>

    <section v-if="!compact" class="hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">Closer Click</h1>
        <p class="hero-subtitle">{{ t.hero.subtitle }}</p>
        <p class="hero-manifesto">
          <strong>{{ t.hero.manifestoStrong }}</strong>{{ t.hero.manifestoRest }}
        </p>
        <button @click="scrollToSection('aplicaciones')" class="cta-button">
          {{ t.hero.cta }}
        </button>
      </div>
    </section>

    <div v-if="compact" class="compact-spacer"></div>

    <section
      id="aplicaciones"
      class="section aplicaciones-section"
      :class="{ 'apps-only': compact }"
    >
      <div class="parallax-bg aplicaciones-bg"></div>
      <div class="section-content">
        <h2 class="section-title">{{ t.apps.title }}</h2>
        <p class="section-text">{{ t.apps.text }}</p>
        <div class="apps-grid">
          <div class="app-card" v-for="a in apps" :key="a.url">
            <a
              :href="a.url"
              target="_blank"
              rel="noopener"
              class="app-logo-link"
              :aria-label="t.apps.open + ': ' + a.name"
            >
              <img class="app-logo" :src="a.logo" :alt="a.name" width="120" height="120" />
            </a>
            <h3>{{ a.name }}</h3>
            <p v-html="a.desc[locale]"></p>
            <a
              :href="'https://github.com/' + a.repo"
              target="_blank"
              rel="noopener"
              class="app-repo"
            >github.com/{{ a.repo }}</a>
          </div>
        </div>

        <button
          v-if="compact"
          @click="showFullHome"
          class="full-home-button"
        >{{ t.apps.fullHome }}</button>
      </div>
    </section>

    <section v-if="!compact" id="servicio" class="section servicio-section">
      <div class="parallax-bg servicio-bg"></div>
      <div class="section-content">
        <h2 class="section-title">{{ t.service.title }}</h2>
        <p class="section-text">{{ t.service.text }}</p>
        <div class="service-features">
          <div class="service-item" v-for="(item, i) in serviceItems" :key="i">
            <h3>{{ item.h }}</h3>
            <p v-html="item.p"></p>
          </div>
        </div>
      </div>
    </section>

    <section v-if="!compact" id="api" class="section api-section">
      <div class="parallax-bg api-bg"></div>
      <div class="section-content">
        <h2 class="section-title">{{ t.api.title }}</h2>
        <p class="section-text">{{ t.api.text }}</p>
        <div class="api-features">
          <div class="api-item" v-for="(item, i) in apiItems" :key="i">
            <h3>{{ item.h }}</h3>
            <p v-html="item.p"></p>
          </div>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="footer-content">
        <h3 class="footer-philosophy-title">{{ t.footer.title }}</h3>
        <div class="footer-pillars">
          <div class="footer-pillar">
            <h4>{{ t.footer.what.h }}</h4>
            <p>{{ t.footer.what.p }}</p>
          </div>
          <div class="footer-pillar">
            <h4>{{ t.footer.how.h }}</h4>
            <p>{{ t.footer.how.p }}</p>
          </div>
          <div class="footer-pillar">
            <h4>{{ t.footer.when.h }}</h4>
            <p>{{ t.footer.when.p }}</p>
          </div>
        </div>
        <p class="footer-tagline">{{ t.footer.tagline }}</p>
        <p class="footer-copy">{{ t.footer.copy }}</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
* { margin: 0; padding: 0; box-sizing: border-box; }
.app { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; overflow-x: hidden; }

.navbar {
  position: fixed; top: 0; width: 100%; background: #2c3e50;
  backdrop-filter: blur(10px); z-index: 1000; transition: all 0.3s ease;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.navbar.scrolled { background: #2c3e50; box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3); }
.nav-container { max-width: 1200px; margin: 0 auto; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; }
.logo { display: flex; align-items: center; gap: 0.5rem; }
.logo-img { height: 40px; width: auto; }
.logo-text { font-size: 1.5rem; font-weight: bold; color: #ffffff; }
.nav-actions { display: flex; align-items: center; gap: 0.75rem; }
.nav-links { display: flex; gap: 2rem; }
.nav-link { color: #ffffff; text-decoration: none; font-weight: 500; cursor: pointer; transition: color 0.3s ease; position: relative; }
.nav-link:hover { color: #3498db; }
.nav-link::after { content: ''; position: absolute; bottom: -5px; left: 0; width: 0; height: 2px; background: #3498db; transition: width 0.3s ease; }
.nav-link:hover::after { width: 100%; }

.lang-selector {
  display: inline-flex;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 50px;
  overflow: hidden;
}
.lang-selector button {
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  border: none;
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}
.lang-selector button:hover { color: #fff; background: rgba(255, 255, 255, 0.1); }
.lang-selector button.on {
  background: #3498db;
  color: #fff;
}

.install-btn {
  background: #3498db;
  color: #fff;
  border: none;
  padding: 0.5rem 1.1rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 2px 10px rgba(52, 152, 219, 0.35);
  white-space: nowrap;
}
.install-btn:hover { background: #2980b9; transform: translateY(-1px); }

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 26px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}
.hamburger span {
  display: block;
  height: 2px;
  width: 100%;
  background: #fff;
  border-radius: 2px;
  transition: transform 0.3s, opacity 0.3s;
}
.hamburger.open span:nth-child(1) { transform: translateY(9px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-9px) rotate(-45deg); }

.mobile-menu {
  display: none;
  flex-direction: column;
  background: #2c3e50;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}
.mobile-menu.open { max-height: 300px; }
.mobile-menu .nav-link {
  padding: 1rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  color: #fff;
}
.mobile-menu .nav-link::after { display: none; }

@media (max-width: 768px) {
  .nav-container {
    padding: 0.75rem 1rem;
    flex-wrap: wrap;
    row-gap: 0.6rem;
  }
  .desktop-links { display: none; }
  .hamburger { display: flex; }
  .mobile-menu { display: flex; }
  .install-btn {
    padding: 0.4rem 0.9rem;
    font-size: 0.85rem;
  }
  .logo-text { font-size: 1.1rem; }
  .logo-img { height: 32px; }

  /* Fila 1: logo … moneda | burger. Fila 2: idioma + instalar. */
  .logo { order: 1; }
  .nav-support { order: 2; margin-left: auto; }
  .hamburger { order: 3; margin-left: 1rem; }
  .nav-actions {
    order: 4;
    flex-basis: 100%;
    justify-content: flex-start;
  }
}

.hero {
  height: 100vh;
  background: linear-gradient(rgba(44, 62, 80, 0.7), rgba(44, 62, 80, 0.7)),
              url('/images/oficina/desk-593327_1920.jpg') center/cover;
  display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;
  -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 95%, transparent 100%);
          mask-image: linear-gradient(to bottom, #000 0%, #000 95%, transparent 100%);
}
.hero-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.3); }
.hero-content { text-align: center; color: white; z-index: 2; max-width: 800px; padding: 0 2rem; }
.hero-title { font-size: 4rem; font-weight: 700; margin-bottom: 1.5rem; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); }
.hero-subtitle { font-size: 1.4rem; line-height: 1.6; margin-bottom: 1.5rem; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); }
.hero-manifesto {
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  opacity: 0.95;
}
.hero-manifesto strong { display: block; color: #3498db; font-size: 1.2rem; margin-bottom: 0.5rem; }
.hero-manifesto em { font-style: normal; font-weight: 600; color: #fff; }
.cta-button {
  background: #3498db; color: white; border: none; padding: 1rem 2.5rem; font-size: 1.1rem; font-weight: 600;
  border-radius: 50px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
}
.cta-button:hover { background: #2980b9; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4); }

.compact-spacer { height: 80px; }

.aplicaciones-section.apps-only .section-title,
.aplicaciones-section.apps-only > .section-content > .section-text,
.aplicaciones-section.apps-only .app-card > p,
.aplicaciones-section.apps-only .app-repo {
  display: none;
}
.aplicaciones-section.apps-only .app-card {
  padding: 1.5rem;
  gap: 0.75rem;
}
.aplicaciones-section.apps-only .apps-grid {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}
.full-home-button {
  margin-top: 3rem;
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 0.85rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.full-home-button:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
  transform: translateY(-2px);
}

.app { background: #1b2533; }
.section { min-height: 100vh; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; }
.parallax-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 5%, #000 95%, transparent 100%);
          mask-image: linear-gradient(to bottom, transparent 0%, #000 5%, #000 95%, transparent 100%);
}
.section-content { position: relative; }
.section-content { width: 100%; max-width: 1000px; padding: 4rem 2rem; text-align: center; color: white; z-index: 2; box-sizing: border-box; }
.section-title { font-size: 3rem; font-weight: 700; margin-bottom: 2rem; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); }
.section-text { font-size: 1.2rem; line-height: 1.8; margin-bottom: 3rem; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); }

.aplicaciones-bg {
  background: linear-gradient(rgba(52, 73, 94, 0.8), rgba(52, 73, 94, 0.8)),
              url('/images/comunicacion/social-3408791_1920.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-top: 3rem; }
.feature-card { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); padding: 2rem; border-radius: 15px; border: 1px solid rgba(255, 255, 255, 0.2); transition: transform 0.3s ease; }
.feature-card:hover { transform: translateY(-5px); }
.feature-card h3 { font-size: 1.5rem; margin-bottom: 1rem; color: #3498db; }
.feature-card p { line-height: 1.6; }

.apps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; margin-top: 3rem; }
.app-card { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); padding: 2rem; border-radius: 15px; border: 1px solid rgba(255, 255, 255, 0.2); transition: transform 0.3s ease; display: flex; flex-direction: column; align-items: center; text-align: center; }
.app-card:hover { transform: translateY(-5px); }
.app-logo-link { display: inline-block; line-height: 0; cursor: pointer; border-radius: 20px; outline: none; -webkit-tap-highlight-color: transparent; -webkit-touch-callout: none; }
.app-logo-link:focus, .app-logo-link:active, .app-logo-link:focus-visible { outline: none; }
.app-logo { width: 84px; height: 84px; margin-bottom: 1.25rem; border-radius: 20px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3); transition: transform 0.3s ease, box-shadow 0.3s ease; }
.app-card:hover .app-logo { transform: scale(1.06) rotate(-3deg); }
.app-logo-link:hover .app-logo { transform: scale(1.1) rotate(-3deg); box-shadow: 0 12px 32px rgba(52, 152, 219, 0.45); }
.app-card h3 { font-size: 1.5rem; margin-bottom: 1rem; color: #3498db; }
.app-card p { line-height: 1.6; margin-bottom: 1.5rem; }
.app-button { background: #3498db; color: white; border: none; padding: 0.75rem 2rem; font-size: 1rem; font-weight: 600; border-radius: 50px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3); text-decoration: none; display: inline-block; }
.app-button:hover { background: #2980b9; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4); }
.app-repo { display: block; margin-top: 0.85rem; color: rgba(255, 255, 255, 0.85); font-size: 0.9rem; text-decoration: none; word-break: break-all; }
.app-repo:hover { color: #fff; text-decoration: underline; }

.servicio-bg {
  background: linear-gradient(rgba(44, 62, 80, 0.8), rgba(44, 62, 80, 0.8)),
              url('/images/oficina/building-4803602_1920.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.service-features { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-top: 3rem; }
.service-item { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); padding: 1.5rem; border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.2); }
.service-item h3 { color: #2ecc71; margin-bottom: 1rem; font-size: 1.3rem; }
.service-item p { line-height: 1.55; }
.service-item code, .api-item code, .section-text code { background: rgba(0,0,0,0.35); padding: 0.1rem 0.4rem; border-radius: 4px; font-family: 'Consolas','Monaco',monospace; font-size: 0.9em; }

.api-bg {
  background: linear-gradient(rgba(41, 128, 185, 0.8), rgba(41, 128, 185, 0.8)),
              url('/images/oficina/work-4166471_1920.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.api-features { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-top: 3rem; }
.api-item { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); padding: 1.5rem; border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.2); }
.api-item h3 { color: #e74c3c; margin-bottom: 1rem; font-size: 1.3rem; }

.footer { background: #2c3e50; color: white; text-align: center; padding: 3rem 2rem 2rem; -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 5%, #000 100%); mask-image: linear-gradient(to bottom, transparent 0%, #000 5%, #000 100%); }
.footer-content { max-width: 1000px; margin: 0 auto; }
.footer-philosophy-title { font-size: 1.6rem; color: #3498db; margin-bottom: 2rem; }
.footer-pillars { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
.footer-pillar { background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 12px; padding: 1.5rem; }
.footer-pillar h4 { color: #2ecc71; font-size: 1.1rem; margin-bottom: 0.6rem; }
.footer-pillar p { line-height: 1.55; opacity: 0.9; }
.footer-tagline { font-size: 1.05rem; line-height: 1.7; max-width: 640px; margin: 0 auto 2rem; opacity: 0.95; }
.footer-copy { font-size: 0.9rem; opacity: 0.7; }

@media (max-width: 768px) {
  .hero-title { font-size: 2.5rem; }
  .hero-subtitle { font-size: 1.1rem; }
  .section-title { font-size: 2rem; }
  .nav-container { padding: 1rem; }
  .nav-links { gap: 1rem; }
  .logo-text { font-size: 1.2rem; }
  .features-grid, .service-features, .api-features { grid-template-columns: 1fr; }

  /* Modo compacto: 3 tarjetas por fila en mobile (logo + nombre) */
  .aplicaciones-section.apps-only .apps-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  .aplicaciones-section.apps-only .app-card { padding: 1rem 0.5rem; }
  .aplicaciones-section.apps-only .app-logo { width: 64px; height: 64px; margin-bottom: 0; }
  .aplicaciones-section.apps-only .app-card h3 { font-size: 1rem; margin-bottom: 0; }
}

@media (max-width: 480px) {
  .hero-title { font-size: 2rem; }
  .section-content { padding: 2rem 1rem; }
  .nav-links { flex-direction: column; gap: 0.5rem; }
}
</style>
