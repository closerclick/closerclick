<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import mundialLogo from './assets/apps/mundial.svg'
import chatLogo from './assets/apps/chat.svg'
import messengerLogo from './assets/apps/messenger.svg'
import qrshareLogo from './assets/apps/qrshare.svg'
import chessLogo from './assets/apps/chess.svg'
import cuarentaLogo from './assets/apps/cuarenta.svg'
import ecuavoleyLogo from './assets/apps/ecuavoley.svg'
import padelLogo from './assets/apps/padel.svg'
import gridgameLogo from './assets/apps/gridgame.svg'
import gymbroLogo from './assets/apps/gymbro.svg'
import diamondsLogo from './assets/apps/diamonds.svg'
import faviconLogo from './assets/apps/favicon.svg'
import androidLauncherLogo from './assets/apps/android-launcher.svg'
import triviaLogo from './assets/apps/trivia.svg'
import truequeLogo from './assets/apps/trueque.svg'
import ecoLogo from './assets/apps/eco.svg'
import { useBackLayer } from '@closerclick/closer-click-nav/vue'

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
    nav: { apps: 'Aplicaciones', service: 'Servicio', api: 'API', community: 'Suma un nodo', install: 'Instalar App' },
    tabs: { todas: 'Todas', social: 'Social', apps: 'Apps', deportes: 'Deportes', juegos: 'Juegos', android: 'Android', wip: 'En Desarrollo' },
    subtabs: { solo: 'Un jugador', multi: 'Multijugador', config: 'Configurables' },
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
      download: 'Descargar APK',
      fullHome: '¿Qué es CloserClick?',
      info: 'Ver descripción',
      close: 'Cerrar',
    },
    service: {
      title: 'Servicio',
      text: 'Comunicación por WebSocket ligero que enruta mensajes entre clientes mediante tokens cortos, sin almacenar conversaciones ni requerir cuentas.',
    },
    api: {
      title: 'API',
      text: 'Una sola conexión WebSocket. Mensajes JSON. Sin endpoints HTTP, sin SDK obligatorio.',
    },
    community: {
      title: 'Suma tu nodo',
      intro: 'El ecosistema lo sostiene una red de nodos que cualquiera puede correr. Los servicios son livianos y vienen dockerizados, con imágenes en GHCR (multi-arch, también para Raspberry Pi).',
      services: [
        { name: 'proxy', desc: 'transporte federado', img: 'ghcr.io/closerclick/simple-websocket-proxy' },
        { name: 'geo', desc: 'descubrimiento georreferenciado', img: 'ghcr.io/closerclick/closer-click-geo' },
        { name: 'reputation', desc: 'reputación firmada', img: 'ghcr.io/closerclick/closer-click-reputation' },
      ],
      cmd: 'docker compose up -d',
      cmdNote: 'Baja la imagen y arranca con TLS automático (Caddy).',
      steps: [
        'Levanta el nodo con un comando.',
        'Federa: cruza PROXY_PEERS con otros nodos (solo el proxy).',
        'Anúnciate: agrega tu nodo a nodes.json (un PR) y los clientes lo descubren solos.',
      ],
      note: 'DNS directo (sin nube naranja) y diversifica proveedor/región — eso hace la descentralización real.',
      cta: 'Cómo colaborar',
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
    nav: { apps: 'Applications', service: 'Service', api: 'API', community: 'Run a node', install: 'Install App' },
    tabs: { todas: 'All', social: 'Social', apps: 'Apps', deportes: 'Sports', juegos: 'Games', android: 'Android', wip: 'In Development' },
    subtabs: { solo: 'Single player', multi: 'Multiplayer', config: 'Configurable' },
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
      download: 'Download APK',
      fullHome: 'What is CloserClick?',
      info: 'View description',
      close: 'Close',
    },
    service: {
      title: 'Service',
      text: 'Lightweight WebSocket communication that routes messages between clients via short tokens, without storing conversations or requiring accounts.',
    },
    api: {
      title: 'API',
      text: 'A single WebSocket connection. JSON messages. No HTTP endpoints, no mandatory SDK.',
    },
    community: {
      title: 'Run a node',
      intro: 'The ecosystem runs on a network of nodes anyone can host. The services are lightweight and shipped as Docker images on GHCR (multi-arch, Raspberry Pi included).',
      services: [
        { name: 'proxy', desc: 'federated transport', img: 'ghcr.io/closerclick/simple-websocket-proxy' },
        { name: 'geo', desc: 'georeferenced discovery', img: 'ghcr.io/closerclick/closer-click-geo' },
        { name: 'reputation', desc: 'signed reputation', img: 'ghcr.io/closerclick/closer-click-reputation' },
      ],
      cmd: 'docker compose up -d',
      cmdNote: 'Pulls the image and starts with automatic TLS (Caddy).',
      steps: [
        'Bring up the node with one command.',
        'Federate: cross PROXY_PEERS with other nodes (proxy only).',
        'Announce it: add your node to nodes.json (a PR) and clients discover it on their own.',
      ],
      note: 'Direct DNS (no orange cloud) and diversify provider/region — that makes decentralization real.',
      cta: 'How to contribute',
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

type TabKey = 'todas' | 'social' | 'apps' | 'deportes' | 'juegos' | 'android' | 'wip'
const TAB_ORDER: TabKey[] = ['todas', 'social', 'apps', 'deportes', 'juegos', 'android', 'wip']
const activeTab = ref<TabKey>('todas')
const tabApps = (tab: TabKey) =>
  tab === 'wip'
    ? apps.filter((a) => a.wip)
    : tab === 'todas'
      ? apps.filter((a) => !a.wip)
      : apps.filter((a) => !a.wip && a.cat === tab)
const visibleTabs = computed(() => TAB_ORDER.filter((tab) => tabApps(tab).length > 0))

// Subcategorías del tab "Juegos": solo / multijugador / configurables
type SubKey = 'solo' | 'multi' | 'config'
const SUB_ORDER: SubKey[] = ['solo', 'multi', 'config']
const activeSub = ref<SubKey>('solo')
const subApps = (sub: SubKey) => tabApps('juegos').filter((a) => (a.sub ?? 'solo') === sub)
const visibleSubs = computed(() => SUB_ORDER.filter((sub) => subApps(sub).length > 0))

const visibleApps = computed(() => {
  if (activeTab.value !== 'juegos') return tabApps(activeTab.value)
  return subApps(activeSub.value)
})

// Al entrar al tab Juegos, asegurar una subcategoría visible seleccionada
watch(activeTab, (tab) => {
  if (tab === 'juegos' && !visibleSubs.value.includes(activeSub.value)) {
    activeSub.value = visibleSubs.value[0] ?? 'solo'
  }
})

type AppEntry = { name: string; repo: string; url: string; logo: string; cat: 'social' | 'apps' | 'deportes' | 'juegos' | 'android'; sub?: SubKey; desc: { es: string; en: string }; wip?: boolean; apk?: string }
const apps: AppEntry[] = [
  {
    name: 'Pronóstico Mundialista',
    url: 'https://mundial.closer.click/',
    logo: mundialLogo,
    repo: 'closerclick/pronostico-mundialista',
    cat: 'juegos',
    sub: 'multi',
    desc: {
      es: 'Arma tu pronóstico del Mundial 2026 (48 selecciones) en tres modos (simple, gana/pierde o con marcador), compite con tus amigos y lleva tu tabla de aciertos.',
      en: 'Build your 2026 World Cup predictions (48 teams) in three modes (simple, win/lose or with scoreline), compete with your friends and track your hit table.',
    },
  },
  {
    name: 'Closer Click Chat',
    url: 'https://chat.closer.click/',
    logo: chatLogo,
    repo: 'closerclick/simple-websocket-chat',
    cat: 'social',
    desc: {
      es: 'Chat en tiempo real con salas públicas y mensajes directos.',
      en: 'Real-time chat with public rooms and direct messages.',
    },
  },
  {
    name: 'Closer Click Messenger',
    url: 'https://messenger.closer.click/',
    logo: messengerLogo,
    repo: 'closerclick/closerclick_messenger',
    cat: 'social',
    desc: {
      es: 'Mensajería privada 1-a-1 con cifrado de extremo a extremo; recibe mensajes aunque estés desconectado. PWA instalable y extensión de Chrome.',
      en: 'Private one-to-one messaging with end-to-end encryption; receive messages even while you are offline. Installable PWA and Chrome extension.',
    },
  },
  {
    name: 'Trueque',
    url: 'https://trueque.closer.click/',
    logo: truequeLogo,
    repo: 'closerclick/trueque',
    cat: 'social',
    desc: {
      es: 'Anuncios georreferenciados <strong>efímeros</strong> (vendo / regalo / busco) cerca de ti: descubre por radio con un <strong>radar de proximidad</strong> y cierra el trato por mensaje. Caducan en 24 h y tu ubicación no se guarda.',
      en: 'Georeferenced <strong>ephemeral</strong> listings (sell / give away / looking for) near you: discover by radius with a <strong>proximity radar</strong> and close the deal by message. They expire in 24 h and your location is never stored.',
    },
  },
  {
    name: 'Eco',
    url: 'https://eco.closer.click/',
    logo: ecoLogo,
    repo: 'closerclick/eco',
    cat: 'social',
    desc: {
      es: 'Microblogging <strong>efímero y georreferenciado</strong>: publicas un eco (texto, enlaces y tags) y quien lo tenga en su <strong>radio de escucha</strong> lo descubre. A las <strong>24 h muere en la red</strong>. Tu voz, en tu zona, bajo tus reglas.',
      en: 'Ephemeral, <strong>georeferenced microblogging</strong>: post an eco (text, links and tags) and whoever has it in their <strong>listening radius</strong> discovers it. After <strong>24 h it dies on the network</strong>. Your voice, in your radius, under your rules.',
    },
  },
  {
    name: 'QRShare',
    url: 'https://qrshare.closer.click/',
    logo: qrshareLogo,
    repo: 'closerclick/qrshare',
    cat: 'apps',
    desc: {
      es: 'Transferencia de archivos directa entre dispositivos, sin pasar por un servidor. Comparte por QR.',
      en: 'Direct device-to-device file transfer, without going through a server. Share by QR.',
    },
  },
  {
    name: 'Closer Click Chess',
    url: 'https://chess.closer.click/',
    logo: chessLogo,
    repo: 'closerclick/simple-websocket-chess',
    cat: 'juegos',
    sub: 'multi',
    desc: {
      es: 'Ajedrez online multijugador. Crea partidas públicas o privadas y juega con un lobby en tiempo real.',
      en: 'Online multiplayer chess. Create public or private games and play with a real-time lobby.',
    },
  },
  {
    name: 'Cuarenta (40)',
    url: 'https://cuarenta.closer.click/',
    logo: cuarentaLogo,
    repo: 'closerclick/cuarenta',
    cat: 'juegos',
    sub: 'multi',
    desc: {
      es: 'El <strong>Cuarenta</strong>, el juego de naipes tradicional del Ecuador, en línea para <strong>2 ó 4 jugadores</strong>.',
      en: 'The <strong>Cuarenta</strong> (40), Ecuador\'s traditional card game, online for <strong>2 or 4 players</strong>.',
    },
  },
  {
    name: 'Contador Ecuavóley',
    url: 'https://ecuavoley.closer.click/',
    logo: ecuavoleyLogo,
    repo: 'closerclick/ecuavoley-contador',
    cat: 'deportes',
    desc: {
      es: 'Marcador para partidos de ecuavóley: dos paneles táctiles, indicador de saque, deshacer, cambio y reinicio. Gana el primero en llegar a 15.',
      en: 'Scoreboard for ecuavóley matches: two touch panels, serve indicator, undo, switch and reset. First to reach 15 wins.',
    },
  },
  {
    name: 'Contador Pádel',
    url: 'https://padel.closer.click/',
    logo: padelLogo,
    repo: 'closerclick/padel-contador',
    cat: 'deportes',
    desc: {
      es: 'Marcador para partidos de pádel con puntuación de tenis (0/15/30/40, juegos y sets): dos paneles táctiles, indicador de saque, tie-break, punto de oro opcional, deshacer y reinicio.',
      en: 'Scoreboard for padel matches with tennis scoring (0/15/30/40, games and sets): two touch panels, serve indicator, tie-break, optional golden point, undo and reset.',
    },
  },
  {
    name: 'GymBro Timer',
    url: 'https://gymbro.closer.click/',
    logo: gymbroLogo,
    repo: 'closerclick/gymbro',
    cat: 'deportes',
    desc: {
      es: 'Timer por intervalos para el gimnasio: define tu tiempo de entrenamiento y de descanso, una cuenta atrás de preparación y el número de rondas. Avisos sonoros, vibración, notificaciones en segundo plano y pantalla siempre encendida. Funciona sin conexión.',
      en: 'Interval timer for the gym: set your work and rest times, a prep countdown and the number of rounds. Sound cues, vibration, background notifications and always-on screen. Works offline.',
    },
  },
  {
    name: 'Diamonds',
    url: 'https://diamonds.closer.click/',
    logo: diamondsLogo,
    repo: 'closerclick/diamonds',
    cat: 'juegos',
    sub: 'solo',
    desc: {
      es: 'Juego casual de combinar diamantes (match-3): intercambia gemas adyacentes para alinear 3 o más del mismo color, encadena combos en cascada con multiplicador y supera tu récord. Avisos sonoros, vibración y funcionamiento sin conexión. PWA instalable; la partida y el récord viven solo en tu navegador.',
      en: 'Casual match-3 game: swap adjacent gems to line up 3 or more of the same color, chain cascading combos with a multiplier and beat your high score. Sound cues, vibration and offline support. Installable PWA; your game and high score live only in your browser.',
    },
  },
  {
    name: 'Trivia',
    url: 'https://trivia.closer.click/',
    logo: triviaLogo,
    repo: 'closerclick/trivia',
    cat: 'juegos',
    sub: 'config',
    desc: {
      es: 'Trivia configurable: pega tu <code>JSON</code> de preguntas (o genéralo con IA desde un prompt listo para copiar), elige un color del que se deriva toda la paleta, modo claro/oscuro, tu logo y fondos para móvil y web. Modos quiz con puntaje, verdadero/falso y flashcards; eliges cuántas preguntas mostrar y publicas un enlace limpio para jugar. PWA instalable; tus trivias viven en tu navegador.',
      en: 'Configurable trivia: paste your <code>JSON</code> of questions (or generate it with AI from a ready-to-copy prompt), pick one color that derives the whole palette, light/dark mode, your logo and backgrounds for mobile and web. Quiz (scored), true/false and flashcard modes; choose how many questions to show and publish a clean link to play. Installable PWA; your trivias live in your browser.',
    },
  },
  {
    name: 'GridGame',
    url: 'https://gridgame.closer.click/',
    logo: gridgameLogo,
    repo: 'closerclick/gridgame',
    cat: 'juegos',
    sub: 'multi',
    wip: true,
    desc: {
      es: 'Sandbox multijugador cooperativo en un grid. Mundo subjetivo: cada jugador crea su entorno y se explora un mundo procedural infinito con props, ítems, personajes y enemigos programables.',
      en: 'Cooperative multiplayer sandbox on a grid. Subjective world: each player creates their environment and explores an endless procedural world with programmable props, items, characters and enemies.',
    },
  },
  {
    name: 'Favicon Generator',
    url: 'https://favicon.closer.click/',
    logo: faviconLogo,
    repo: 'closerclick/favicon-generator',
    cat: 'apps',
    desc: {
      es: 'Genera favicons e íconos <code>.ico</code> compatibles con Windows a partir de una imagen PNG/JPG, listos para tu sitio o PWA. Todo en el navegador, sin subir nada a un servidor.',
      en: 'Generate favicons and Windows-compatible <code>.ico</code> icons from a PNG/JPG image, ready for your site or PWA. All in the browser, without uploading anything to a server.',
    },
  },
  {
    name: 'Android Launcher',
    url: 'https://github.com/closerclick/android-launcher/releases/latest/download/android-launcher.apk',
    apk: 'https://github.com/closerclick/android-launcher/releases/latest/download/android-launcher.apk',
    logo: androidLauncherLogo,
    repo: 'closerclick/android-launcher',
    cat: 'android',
    desc: {
      es: 'Launcher de Android nativo: carrusel de apps paginado por letra con índice lateral, recientes y dock. Permite <strong>ocultar apps</strong> detrás de tu huella o patrón, con un atajo camuflado. APK firmado, instalable por sideload (Android 8+).',
      en: 'Native Android launcher: app carousel paginated by letter with a side index, recents and dock. Lets you <strong>hide apps</strong> behind your fingerprint or pattern, via a disguised shortcut. Signed APK, sideload-installable (Android 8+).',
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
        { h: 'Ephemeral geo discovery', p: 'A fourth pillar, <code>geo.closer.click</code>, lets an identity publish a signed georeferenced pin (lat/lng + payload) queryable by radius (PostGIS). Pure discovery: the pin carries the pubkey to contact the identity through the proxy, where the transaction happens. Ephemeral by design — one pin per identity (overwrite, no history), max 24 h TTL matching the offline window. No location trails are stored.' },
      ]
    : [
        { h: 'Tokens efímeros', p: 'Al conectar se asigna un token corto (4 caracteres). Sirve como dirección lógica del cliente y se libera al desconectar.' },
        { h: 'Canales públicos', p: 'Cualquier cliente puede publicarse en un canal nombrado, listarlo o consultar el número de miembros. TTL de 20 min y hasta 100 tokens por canal.' },
        { h: 'Firma ECDSA P-256', p: 'Las operaciones sobre canales se firman con clave pública JWK (curva P-256). El proxy verifica la firma antes de aceptar publish/unpublish/list.' },
        { h: 'Sin estado persistente', p: 'El proxy no guarda mensajes en disco ni tiene base de datos. Solo memoria viva: conexiones, pares activos y entradas de canal.' },
        { h: 'WebRTC con fallback al proxy', p: 'El cliente intenta abrir un <code>RTCDataChannel</code> con cada peer (señalización por el propio proxy, STUN público). Si la negociación tiene éxito los mensajes viajan P2P; si falla, siguen por el proxy de forma transparente.' },
        { h: 'Cola offline 24 h + multi-instancia', p: 'Tras un <code>identify</code> firmado, los clientes pueden direccionar mensajes por <code>to_publickey</code>. Si hay varias instancias online (web + extensión + segunda pestaña…) el proxy hace <strong>fan-out</strong> a todas. Si todas están offline, retiene en memoria hasta 24 h (200 msgs / 1 MB por pubkey) y entrega al primer reconnect.' },
        { h: 'Vaults compartidos', p: 'Dos subdominios estáticos guardan estado del usuario en su propio <code>localStorage</code> y son accedidos por todas las apps vía iframe + <code>postMessage</code>: <code>id.closer.click</code> (claves, contactos, ratings) y <code>store.closer.click</code> (hilos de DMs). Mismos contactos y mismos mensajes en cualquier app del ecosistema dentro del mismo navegador.' },
        { h: 'Descubrimiento geo efímero', p: 'Un cuarto pilar, <code>geo.closer.click</code>, permite que una identidad publique un pin georreferenciado firmado (lat/lng + payload) consultable por radio (PostGIS). Puro descubrimiento: el pin lleva el pubkey para contactar a la identidad por el proxy, donde ocurre la transacción. Efímero por diseño — un pin por identidad (overwrite, sin historial), TTL máx 24 h igual que la ventana offline. No se guardan rastros de ubicación.' },
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

// Vistas: home = página simplificada (root oficial '/', solo apps),
// about = "¿Qué es CloserClick?" ('/que-es', toda la info del home sin la
// sección de apps). Routing real: la vista about tiene URL propia enlazable e
// indexable. `aboutOpen` se registra como capa de closer-click-nav (ver
// useBackLayer abajo) con { url } para reflejar la ruta; el "atrás" del
// navegador / chevron vuelve a la página de apps antes de salir del sitio.
const ABOUT_PATH = '/que-es'
// Vista inicial derivada de la URL (deep-link directo a /que-es, p. ej. desde
// la versión estática que-es.html que sirve GitHub Pages con 200; acepta también
// /que-es.html y barra final).
const aboutOpen = ref(/\/que-es(\.html)?\/?$/.test(window.location.pathname))
const compact = computed(() => !aboutOpen.value)

// Mantén el <title> acorde a la vista en navegación cliente (los títulos de la
// carga inicial los ponen index.html / que-es.html, ya correctos para crawlers).
watch(aboutOpen, (open) => {
  document.title = open
    ? '¿Qué es CloserClick? — Filosofía y arquitectura'
    : 'Closer Click - Ecosistema de Aplicaciones'
})

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

const infoApp = ref<AppEntry | null>(null)
const openInfo = (a: AppEntry) => {
  infoApp.value = a
}
const closeInfo = () => {
  infoApp.value = null
}

// Volver unificado (@closerclick/closer-click-nav): el botón físico / chevron
// cierra el modal de info o el menú móvil, luego la vista "¿Qué es CloserClick?"
// (vuelve a la página de apps), y solo después abandona el sitio.
useBackLayer(infoApp, { onClose: () => { infoApp.value = null } })
useBackLayer(menuOpen)
useBackLayer(aboutOpen, { url: ABOUT_PATH })

// Navega entre la página de apps (root) y "¿Qué es CloserClick?". El cambio de
// vista y la URL los gestiona la capa de back (aboutOpen + { url }); al volver a
// home con una capa abierta, closer-click-nav restaura la URL solo. El
// replaceState es solo la red de seguridad del deep-link directo a /que-es
// (donde no hay capa que cerrar) para que la barra vuelva a '/'.
const navTo = (target: 'home' | 'about', sectionId?: string) => {
  menuOpen.value = false
  const wasAbout = aboutOpen.value
  aboutOpen.value = target === 'about'
  if (target === 'home' && wasAbout && window.location.pathname !== '/') {
    window.history.replaceState(window.history.state, '', '/')
  }
  requestAnimationFrame(() => {
    const element = sectionId ? document.getElementById(sectionId) : null
    if (element) element.scrollIntoView({ behavior: 'smooth' })
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

const showFullHome = () => navTo('about')

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const scrollToSection = (sectionId: string) => {
  if (sectionId === 'aplicaciones') {
    navTo('home', 'aplicaciones')
  } else {
    navTo('about', sectionId)
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
  window.addEventListener('appinstalled', onAppInstalled)
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
          <closer-click-back class="cc-back"></closer-click-back>
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
          <a @click="scrollToSection('comunidad')" class="nav-link">{{ t.nav.community }}</a>
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
          href="https://ko-fi.com/closerclick"
          repo="closerclick/closerclick"
          discord="https://discord.gg/D648uq7cth"
          :lang="locale"
        ></closer-click-support>
      </div>

      <div class="mobile-menu" :class="{ open: menuOpen }">
        <a @click="scrollToSection('aplicaciones')" class="nav-link">{{ t.nav.apps }}</a>
        <a @click="scrollToSection('servicio')" class="nav-link">{{ t.nav.service }}</a>
        <a @click="scrollToSection('api')" class="nav-link">{{ t.nav.api }}</a>
        <a @click="scrollToSection('comunidad')" class="nav-link">{{ t.nav.community }}</a>
      </div>
    </nav>

    <section v-if="!compact" class="hero">
      <div class="hero-glow" aria-hidden="true"></div>
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
      v-if="compact"
      id="aplicaciones"
      class="section aplicaciones-section apps-only"
    >
      <div class="section-content">
        <h2 class="section-title">{{ t.apps.title }}</h2>
        <p class="section-text">{{ t.apps.text }}</p>
        <div class="apps-tabs" role="tablist">
          <button
            v-for="tab in visibleTabs"
            :key="tab"
            type="button"
            role="tab"
            :aria-selected="activeTab === tab"
            :class="['apps-tab', { active: activeTab === tab, wip: tab === 'wip' }]"
            @click="activeTab = tab"
          >{{ t.tabs[tab] }}</button>
        </div>

        <div
          v-if="activeTab === 'juegos' && visibleSubs.length > 1"
          class="apps-subtabs"
          role="tablist"
        >
          <button
            v-for="sub in visibleSubs"
            :key="sub"
            type="button"
            role="tab"
            :aria-selected="activeSub === sub"
            :class="['apps-subtab', { active: activeSub === sub }]"
            @click="activeSub = sub"
          >{{ t.subtabs[sub] }}</button>
        </div>

        <div class="apps-grid" :class="{ 'wip-grid': activeTab === 'wip' }">
          <div
            class="app-card"
            :class="{ wip: a.wip }"
            v-for="a in visibleApps"
            :key="a.url"
          >
            <button
              v-if="compact"
              type="button"
              class="app-info-btn"
              :aria-label="t.apps.info + ': ' + a.name"
              @click="openInfo(a)"
            >i</button>
            <a
              :href="a.url"
              :target="a.apk ? '_blank' : '_self'"
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

    <section v-if="!compact" id="comunidad" class="section comunidad-section">
      <div class="section-content">
        <h2 class="section-title">{{ t.community.title }}</h2>
        <p class="section-text">{{ t.community.intro }}</p>
        <div class="community-services">
          <a
            v-for="(s, i) in t.community.services"
            :key="i"
            class="community-service"
            :href="`https://github.com/closerclick/${s.img.split('/').pop()}`"
            target="_blank"
            rel="noopener"
          >
            <h3>{{ s.name }}</h3>
            <p>{{ s.desc }}</p>
            <code>{{ s.img }}</code>
          </a>
        </div>
        <div class="community-quickstart">
          <code>{{ t.community.cmd }}</code>
          <span>{{ t.community.cmdNote }}</span>
        </div>
        <ol class="community-steps">
          <li v-for="(step, i) in t.community.steps" :key="i">{{ step }}</li>
        </ol>
        <p class="community-note">{{ t.community.note }}</p>
        <a
          class="community-cta"
          href="https://github.com/closerclick/closerclick#colabora-suma-tu-nodo-autohosteo"
          target="_blank"
          rel="noopener"
        >{{ t.community.cta }}</a>
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

    <div v-if="infoApp" class="info-modal-overlay" @click.self="closeInfo">
      <div class="info-modal" role="dialog" aria-modal="true">
        <button
          type="button"
          class="info-modal-x"
          :aria-label="t.apps.close"
          @click="closeInfo"
        >×</button>
        <img class="info-modal-logo" :src="infoApp.logo" :alt="infoApp.name" width="72" height="72" />
        <h3 class="info-modal-title">{{ infoApp.name }}</h3>
        <p class="info-modal-desc" v-html="infoApp.desc[locale]"></p>
        <div class="info-modal-actions">
          <a
            :href="infoApp.url"
            :target="infoApp.apk ? '_blank' : '_self'"
            rel="noopener"
            class="app-button"
          >{{ infoApp.apk ? t.apps.download : t.apps.open }}</a>
          <button type="button" class="info-modal-close" @click="closeInfo">{{ t.apps.close }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ─────────────────────────────────────────────────────────────────────────
   Closer Click — home. Estética "panel soberano": tinta profunda + acento
   lima, atmósfera 100% CSS (grilla tipo blueprint + glows + grano), sin fotos
   ni parallax. Tipografía: Bricolage Grotesque (display) + Hanken Grotesk
   (texto) + JetBrains Mono (código). Todo autohospedado.
   ───────────────────────────────────────────────────────────────────────── */

.app {
  position: relative;
  z-index: 0;
  isolation: isolate;
  min-height: 100vh;
  font-family: var(--font-body);
  color: var(--text);
  overflow-x: hidden;
}
/* Atmósfera fija: grilla blueprint + dos glows suaves (lima + frío). */
.app::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -2;
  background:
    radial-gradient(60rem 40rem at 78% -8%, rgba(200, 247, 81, 0.10), transparent 60%),
    radial-gradient(50rem 38rem at 8% 12%, rgba(70, 120, 150, 0.12), transparent 62%),
    linear-gradient(180deg, #0b0f15, var(--ink) 38%);
}
/* Grilla técnica tenue, con desvanecido radial hacia los bordes. */
.app::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  background-image:
    linear-gradient(var(--line) 1px, transparent 1px),
    linear-gradient(90deg, var(--line) 1px, transparent 1px);
  background-size: 64px 64px;
  -webkit-mask-image: radial-gradient(120% 90% at 50% 0%, #000 30%, transparent 78%);
          mask-image: radial-gradient(120% 90% at 50% 0%, #000 30%, transparent 78%);
  opacity: 0.5;
  pointer-events: none;
}

/* ───────────────────────── Navbar ───────────────────────── */
.navbar {
  position: fixed; top: 0; width: 100%;
  background: rgba(9, 12, 17, 0.55);
  backdrop-filter: blur(16px) saturate(120%);
  -webkit-backdrop-filter: blur(16px) saturate(120%);
  z-index: 1000;
  border-bottom: 1px solid transparent;
  transition: background 0.3s ease, border-color 0.3s ease;
}
.navbar.scrolled {
  background: rgba(9, 12, 17, 0.82);
  border-bottom-color: var(--line);
}
.nav-container { max-width: 1240px; margin: 0 auto; padding: 0.85rem 2rem; display: flex; align-items: center; gap: 1rem; }
.logo { display: flex; align-items: center; gap: 0.6rem; }
.cc-back { color: var(--text); --cc-back-size: 34px; margin-left: -6px; }
.logo-img { height: 34px; width: auto; border-radius: 8px; }
.logo-text {
  font-family: var(--font-display);
  font-size: 1.35rem; font-weight: 700; letter-spacing: -0.02em; color: var(--text);
}
.nav-actions { display: flex; align-items: center; gap: 0.6rem; margin-left: auto; }

.nav-links { display: flex; gap: 1.8rem; }
.nav-link {
  color: var(--text-dim); text-decoration: none; cursor: pointer;
  font-size: 0.92rem; font-weight: 500; letter-spacing: 0.01em;
  position: relative; transition: color 0.2s ease;
}
.nav-link:hover { color: var(--text); }
.nav-link::after {
  content: ''; position: absolute; bottom: -6px; left: 0; width: 0; height: 2px;
  background: var(--accent); transition: width 0.25s ease;
}
.nav-link:hover::after { width: 100%; }

.lang-selector {
  display: inline-flex; border: 1px solid var(--line-2); border-radius: 8px;
  overflow: hidden; background: var(--surface);
}
.lang-selector button {
  background: transparent; color: var(--text-dim); border: none;
  padding: 0.38rem 0.7rem; font-family: var(--font-mono); font-size: 0.72rem; font-weight: 600;
  letter-spacing: 0.04em; cursor: pointer; transition: color 0.2s ease, background 0.2s ease;
}
.lang-selector button:hover { color: var(--text); }
.lang-selector button.on { background: var(--accent); color: var(--accent-ink); }

.install-btn {
  background: var(--accent); color: var(--accent-ink); border: none;
  padding: 0.5rem 1.05rem; font-family: var(--font-body); font-size: 0.86rem; font-weight: 700;
  border-radius: 8px; cursor: pointer; white-space: nowrap;
  transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
}
.install-btn:hover { background: var(--accent-press); transform: translateY(-1px); box-shadow: 0 6px 22px rgba(200, 247, 81, 0.22); }

.hamburger {
  display: none; flex-direction: column; justify-content: space-between;
  width: 26px; height: 18px; background: transparent; border: none; cursor: pointer; padding: 0;
}
.hamburger span { display: block; height: 2px; width: 100%; background: var(--text); border-radius: 2px; transition: transform 0.3s, opacity 0.3s; }
.hamburger.open span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

.mobile-menu {
  display: none; flex-direction: column;
  background: rgba(9, 12, 17, 0.96); border-top: 1px solid var(--line);
  max-height: 0; overflow: hidden; transition: max-height 0.3s ease;
}
.mobile-menu.open { max-height: 320px; }
.mobile-menu .nav-link { padding: 1rem 2rem; border-bottom: 1px solid var(--line); color: var(--text); }
.mobile-menu .nav-link::after { display: none; }

@media (max-width: 820px) {
  .nav-container { padding: 0.7rem 1rem; flex-wrap: wrap; row-gap: 0.55rem; }
  .desktop-links { display: none; }
  .hamburger { display: flex; }
  .mobile-menu { display: flex; }
  .logo-text { font-size: 1.15rem; }
  .logo { order: 1; }
  .nav-support { order: 2; margin-left: auto; }
  .hamburger { order: 3; margin-left: 0.8rem; }
  .nav-actions { order: 4; flex-basis: 100%; justify-content: flex-start; margin-left: 0; }
}

/* ───────────────────────── Hero (vista /que-es) ───────────────────────── */
.hero {
  position: relative; min-height: 92vh;
  display: flex; align-items: center; justify-content: center;
  padding: 8rem 2rem 4rem; overflow: hidden;
}
.hero-glow {
  position: absolute; top: -10%; left: 50%; transform: translateX(-50%);
  width: min(80rem, 120%); height: 60rem; pointer-events: none; z-index: 0;
  background: radial-gradient(closest-side, rgba(200, 247, 81, 0.16), transparent 70%);
  filter: blur(8px);
}
.hero-content { position: relative; z-index: 2; text-align: center; max-width: 880px; }
.hero-content::before {
  content: '// tu información · tu servidor · tus reglas';
  display: inline-block; margin-bottom: 1.6rem;
  font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--accent);
  padding: 0.4rem 0.9rem; border: 1px solid var(--accent-soft); border-radius: 50px; background: var(--accent-soft);
}
.hero-title {
  font-family: var(--font-display); font-weight: 800;
  font-size: clamp(3rem, 9vw, 6.2rem); line-height: 0.95; letter-spacing: -0.04em;
  color: var(--text); margin-bottom: 1.4rem;
}
.hero-subtitle { font-size: clamp(1.1rem, 2.4vw, 1.5rem); line-height: 1.5; color: var(--text-dim); margin-bottom: 1.6rem; max-width: 680px; margin-inline: auto; }
.hero-manifesto { font-size: 1.02rem; line-height: 1.75; max-width: 600px; margin: 0 auto 2.5rem; color: var(--text-dim); }
.hero-manifesto strong { display: block; color: var(--text); font-family: var(--font-display); font-weight: 700; font-size: 1.25rem; letter-spacing: -0.01em; margin-bottom: 0.5rem; }
.hero-manifesto em { font-style: normal; font-weight: 600; color: var(--accent); }
.cta-button {
  background: var(--accent); color: var(--accent-ink); border: none;
  padding: 0.95rem 2.2rem; font-family: var(--font-body); font-size: 1.02rem; font-weight: 700;
  border-radius: 10px; cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
  box-shadow: 0 8px 30px rgba(200, 247, 81, 0.18);
}
.cta-button:hover { background: var(--accent-press); transform: translateY(-2px); box-shadow: 0 12px 38px rgba(200, 247, 81, 0.28); }

.compact-spacer { height: 64px; }

/* ───────────────────────── Secciones ───────────────────────── */
.section { position: relative; padding: 5.5rem 2rem; display: flex; justify-content: center; }
.aplicaciones-section { padding-top: 7rem; }
.section-content { position: relative; z-index: 2; width: 100%; max-width: 1180px; text-align: center; }
.section-title { font-family: var(--font-display); font-weight: 800; font-size: clamp(2rem, 5vw, 3rem); letter-spacing: -0.03em; color: var(--text); margin-bottom: 1rem; }
.section-text { font-size: 1.1rem; line-height: 1.7; color: var(--text-dim); max-width: 680px; margin: 0 auto 2.5rem; }
code, .section-text code, .info-modal-desc code, .service-item code, .api-item code, .community-service code {
  font-family: var(--font-mono); font-size: 0.85em;
  background: rgba(200, 247, 81, 0.08); color: var(--accent);
  padding: 0.12em 0.42em; border-radius: 5px; border: 1px solid rgba(200, 247, 81, 0.14);
}

/* Modo compacto (home /): solo logo + nombre. */
.aplicaciones-section.apps-only .section-title,
.aplicaciones-section.apps-only > .section-content > .section-text,
.aplicaciones-section.apps-only .app-card > p,
.aplicaciones-section.apps-only .app-repo { display: none; }
.aplicaciones-section.apps-only .app-card { padding: 1.6rem 1rem; gap: 0.85rem; }
.aplicaciones-section.apps-only .apps-grid { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.1rem; }

.full-home-button {
  margin-top: 3rem; background: transparent; color: var(--text);
  border: 1px solid var(--line-2); padding: 0.8rem 1.9rem; font-family: var(--font-body);
  font-size: 0.95rem; font-weight: 600; border-radius: 10px; cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease, transform 0.15s ease;
}
.full-home-button:hover { background: var(--surface-2); border-color: var(--accent); color: var(--text); transform: translateY(-2px); }

/* ───────────────────────── Tabs ───────────────────────── */
.apps-tabs {
  display: inline-flex; flex-wrap: wrap; justify-content: center; gap: 0.25rem;
  margin: 2.2rem auto 0; padding: 0.3rem;
  background: var(--surface); border: 1px solid var(--line); border-radius: 12px;
}
.apps-tab {
  background: transparent; color: var(--text-dim); border: none; border-radius: 8px;
  padding: 0.5rem 1.15rem; font-family: var(--font-body); font-size: 0.92rem; font-weight: 600;
  cursor: pointer; white-space: nowrap; transition: color 0.2s ease, background 0.2s ease;
}
.apps-tab:hover { color: var(--text); background: var(--surface-2); }
.apps-tab.active { color: var(--accent-ink); background: var(--accent); }
.apps-tab.wip.active { background: var(--mint); color: #06231c; }

.apps-subtabs { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.5rem; margin-top: 1.2rem; }
.apps-subtab {
  background: var(--surface); color: var(--text-dim); border: 1px solid var(--line-2);
  border-radius: 50px; padding: 0.34rem 1rem; font-family: var(--font-mono); font-size: 0.78rem; font-weight: 500;
  letter-spacing: 0.02em; cursor: pointer; white-space: nowrap;
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}
.apps-subtab:hover { color: var(--text); border-color: var(--line-2); background: var(--surface-2); }
.apps-subtab.active { color: var(--accent); border-color: var(--accent); background: var(--accent-soft); }

/* ───────────────────────── Grid de apps ───────────────────────── */
.apps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.4rem; margin-top: 2.4rem; }
.apps-grid.wip-grid { grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); }
.app-card {
  position: relative; display: flex; flex-direction: column; align-items: center; text-align: center;
  padding: 2rem 1.6rem; gap: 0; background: var(--surface); border: 1px solid var(--line);
  border-radius: 16px; overflow: hidden;
  transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
}
.app-card::before {
  content: ''; position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity 0.25s ease;
  background: radial-gradient(50% 60% at 50% 0%, rgba(200, 247, 81, 0.10), transparent 70%);
}
.app-card:hover {
  transform: translateY(-6px); border-color: var(--line-2); background: var(--surface-2);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.4);
}
.app-card:hover::before { opacity: 1; }
.app-card.wip { border-color: rgba(110, 231, 200, 0.4); }
.app-card.wip h3 { color: var(--mint); }
.app-logo-link { display: inline-block; line-height: 0; cursor: pointer; border-radius: 18px; outline: none; -webkit-tap-highlight-color: transparent; }
.app-logo-link:focus, .app-logo-link:active, .app-logo-link:focus-visible { outline: none; }
.app-logo { width: 80px; height: 80px; margin-bottom: 1.2rem; border-radius: 18px; box-shadow: 0 10px 26px rgba(0, 0, 0, 0.4); transition: transform 0.3s ease, box-shadow 0.3s ease; }
.app-card:hover .app-logo { transform: scale(1.05) rotate(-2deg); }
.app-logo-link:hover .app-logo { box-shadow: 0 14px 32px rgba(200, 247, 81, 0.28); }
.app-card h3 { font-family: var(--font-display); font-weight: 700; letter-spacing: -0.02em; font-size: 1.32rem; color: var(--text); margin-bottom: 0.75rem; }
.app-card p { line-height: 1.62; color: var(--text-dim); font-size: 0.96rem; margin-bottom: 1.4rem; }
.app-button {
  margin-top: auto; background: var(--accent); color: var(--accent-ink); border: none;
  padding: 0.65rem 1.7rem; font-family: var(--font-body); font-size: 0.92rem; font-weight: 700;
  border-radius: 9px; cursor: pointer; text-decoration: none; display: inline-block;
  transition: background 0.2s ease, transform 0.15s ease;
}
.app-button:hover { background: var(--accent-press); transform: translateY(-2px); }
.app-repo { display: block; margin-top: 0.85rem; color: var(--text-faint); font-family: var(--font-mono); font-size: 0.76rem; text-decoration: none; word-break: break-all; transition: color 0.2s ease; }
.app-repo:hover { color: var(--accent); }

.app-info-btn {
  position: absolute; top: 0.6rem; right: 0.6rem; width: 26px; height: 26px;
  display: flex; align-items: center; justify-content: center; padding: 0;
  background: rgba(0, 0, 0, 0.35); color: var(--text-dim); border: 1px solid var(--line-2);
  border-radius: 50%; font-family: var(--font-display); font-style: italic; font-weight: 700;
  font-size: 0.92rem; line-height: 1; cursor: pointer; z-index: 3; transition: all 0.2s ease;
}
.app-info-btn:hover { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); }

/* ───────────────────────── Modal de info ───────────────────────── */
.info-modal-overlay { position: fixed; inset: 0; z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 1.5rem; background: rgba(5, 7, 10, 0.7); backdrop-filter: blur(6px); }
.info-modal { position: relative; width: 100%; max-width: 440px; max-height: 85vh; overflow-y: auto; background: var(--ink-2); border: 1px solid var(--line-2); border-radius: 18px; padding: 2.2rem 1.8rem 1.8rem; text-align: center; box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6); }
.info-modal-x { position: absolute; top: 0.7rem; right: 0.7rem; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; background: transparent; color: var(--text-dim); border: none; border-radius: 50%; font-size: 1.5rem; line-height: 1; cursor: pointer; transition: all 0.2s ease; }
.info-modal-x:hover { background: var(--surface-2); color: var(--text); }
.info-modal-logo { width: 72px; height: 72px; border-radius: 18px; box-shadow: 0 10px 26px rgba(0, 0, 0, 0.4); margin-bottom: 1rem; }
.info-modal-title { font-family: var(--font-display); font-weight: 700; letter-spacing: -0.02em; font-size: 1.5rem; color: var(--text); margin-bottom: 1rem; }
.info-modal-desc { line-height: 1.65; margin-bottom: 1.75rem; color: var(--text-dim); text-align: left; }
.info-modal-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; }
.info-modal-close { background: transparent; color: var(--text); border: 1px solid var(--line-2); padding: 0.65rem 1.6rem; font-family: var(--font-body); font-size: 0.95rem; font-weight: 600; border-radius: 9px; cursor: pointer; transition: all 0.2s ease; }
.info-modal-close:hover { background: var(--surface-2); border-color: var(--line-2); }
.info-modal-actions .app-button { margin-top: 0; }

/* ───────────────────────── Servicio / API / Comunidad ───────────────────────── */
.service-features, .api-features { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.2rem; margin-top: 3rem; text-align: left; }
.service-item, .api-item { background: var(--surface); backdrop-filter: blur(4px); padding: 1.6rem; border-radius: 14px; border: 1px solid var(--line); transition: border-color 0.2s ease, transform 0.2s ease; }
.service-item:hover, .api-item:hover { border-color: var(--line-2); transform: translateY(-3px); }
.service-item h3, .api-item h3 { font-family: var(--font-display); font-weight: 700; color: var(--text); margin-bottom: 0.7rem; font-size: 1.18rem; }
.service-item h3 { color: var(--mint); }
.api-item h3 { color: var(--accent); }
.service-item p, .api-item p { line-height: 1.6; color: var(--text-dim); font-size: 0.95rem; }

.comunidad-section { }
.community-services { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.2rem; margin: 2.5rem 0; text-align: left; }
.community-service { display: block; text-decoration: none; color: var(--text); background: var(--surface); padding: 1.5rem; border-radius: 14px; border: 1px solid var(--line); transition: transform 0.2s ease, border-color 0.2s ease; }
.community-service:hover { transform: translateY(-4px); border-color: var(--accent); }
.community-service h3 { font-family: var(--font-display); font-weight: 700; color: var(--text); font-size: 1.18rem; margin-bottom: 0.4rem; }
.community-service p { color: var(--text-dim); margin-bottom: 0.9rem; font-size: 0.95rem; }
.community-quickstart { display: flex; flex-direction: column; align-items: center; gap: 0.6rem; margin: 1.5rem 0; }
.community-quickstart code { background: rgba(0, 0, 0, 0.4); padding: 0.6rem 1.2rem; border-radius: 9px; font-family: var(--font-mono); font-size: 0.95rem; color: var(--accent); border: 1px solid var(--line); }
.community-quickstart span { color: var(--text-dim); font-size: 0.92rem; }
.community-steps { max-width: 640px; margin: 1.5rem auto; text-align: left; line-height: 1.7; padding-left: 1.4rem; color: var(--text-dim); }
.community-steps li { margin-bottom: 0.6rem; }
.community-note { color: var(--text-faint); font-style: italic; margin: 1.5rem auto; max-width: 640px; }
.community-cta { display: inline-block; margin-top: 1rem; background: var(--accent); color: var(--accent-ink); text-decoration: none; padding: 0.75rem 1.9rem; border-radius: 10px; font-family: var(--font-body); font-weight: 700; transition: background 0.2s ease, transform 0.15s ease; }
.community-cta:hover { background: var(--accent-press); transform: translateY(-2px); }

/* ───────────────────────── Footer ───────────────────────── */
.footer { text-align: center; padding: 4rem 2rem 2.5rem; border-top: 1px solid var(--line); }
.footer-content { max-width: 1000px; margin: 0 auto; }
.footer-philosophy-title { font-family: var(--font-display); font-weight: 700; letter-spacing: -0.02em; font-size: 1.6rem; color: var(--text); margin-bottom: 2rem; }
.footer-pillars { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.2rem; margin-bottom: 2rem; text-align: left; }
.footer-pillar { background: var(--surface); border: 1px solid var(--line); border-radius: 14px; padding: 1.5rem; }
.footer-pillar h4 { font-family: var(--font-display); font-weight: 700; color: var(--accent); font-size: 1.08rem; margin-bottom: 0.6rem; }
.footer-pillar p { line-height: 1.6; color: var(--text-dim); font-size: 0.94rem; }
.footer-tagline { font-size: 1.02rem; line-height: 1.7; max-width: 640px; margin: 0 auto 2rem; color: var(--text-dim); }
.footer-copy { font-size: 0.86rem; color: var(--text-faint); font-family: var(--font-mono); }

/* ───────────────────────── Animación de entrada ───────────────────────── */
@keyframes cc-rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
.hero-content > * { animation: cc-rise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
.hero-content::before { animation: cc-rise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
.hero-title { animation-delay: 0.06s; }
.hero-subtitle { animation-delay: 0.12s; }
.hero-manifesto { animation-delay: 0.18s; }
.cta-button { animation-delay: 0.24s; }
@media (prefers-reduced-motion: reduce) {
  .hero-content > *, .hero-content::before { animation: none; }
}

/* ───────────────────────── Responsive ───────────────────────── */
@media (max-width: 768px) {
  .section { padding: 4rem 1.2rem; }
  .service-features, .api-features, .community-services, .footer-pillars { grid-template-columns: 1fr; }
  .aplicaciones-section.apps-only .apps-grid { grid-template-columns: repeat(3, 1fr); gap: 0.8rem; }
  .aplicaciones-section.apps-only .app-card { padding: 1rem 0.5rem; }
  .aplicaciones-section.apps-only .app-logo { width: 58px; height: 58px; margin-bottom: 0; }
  .aplicaciones-section.apps-only .app-card h3 { font-size: 0.95rem; margin-bottom: 0; }
}
@media (max-width: 480px) {
  .section-content { padding: 0; }
  .aplicaciones-section.apps-only .apps-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
