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
import diamondsLogo from './assets/apps/diamonds.svg'
import faviconLogo from './assets/apps/favicon.svg'
import androidLauncherLogo from './assets/apps/android-launcher.svg'
import triviaLogo from './assets/apps/trivia.svg'
import truequeLogo from './assets/apps/trueque.svg'
import ecoLogo from './assets/apps/eco.svg'

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
    nav: { apps: 'Aplicaciones', service: 'Servicio', api: 'API', community: 'Sumá un nodo', install: 'Instalar App' },
    tabs: { todas: 'Todas', apps: 'Apps', deportes: 'Deportes', juegos: 'Juegos', android: 'Android', wip: 'En Desarrollo' },
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
      fullHome: 'Ver home completo',
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
      title: 'Sumá tu nodo',
      intro: 'El ecosistema lo sostiene una red de nodos que cualquiera puede correr. Los servicios son livianos y vienen dockerizados, con imágenes en GHCR (multi-arch, también para Raspberry Pi).',
      services: [
        { name: 'proxy', desc: 'transporte federado', img: 'ghcr.io/closerclick/simple-websocket-proxy' },
        { name: 'geo', desc: 'descubrimiento georreferenciado', img: 'ghcr.io/closerclick/closer-click-geo' },
        { name: 'reputation', desc: 'reputación firmada', img: 'ghcr.io/closerclick/closer-click-reputation' },
      ],
      cmd: 'docker compose up -d',
      cmdNote: 'Baja la imagen y arranca con TLS automático (Caddy).',
      steps: [
        'Levantá el nodo con un comando.',
        'Federá: cruzá PROXY_PEERS con otros nodos (solo el proxy).',
        'Anunciate: agregá tu nodo a nodes.json (un PR) y los clientes lo descubren solos.',
      ],
      note: 'DNS directo (sin nube naranja) y diversificá proveedor/región — eso hace la descentralización real.',
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
    tabs: { todas: 'All', apps: 'Apps', deportes: 'Sports', juegos: 'Games', android: 'Android', wip: 'In Development' },
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
      fullHome: 'Show full home',
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

type TabKey = 'todas' | 'apps' | 'deportes' | 'juegos' | 'android' | 'wip'
const TAB_ORDER: TabKey[] = ['todas', 'apps', 'deportes', 'juegos', 'android', 'wip']
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

type AppEntry = { name: string; repo: string; url: string; logo: string; cat: 'apps' | 'deportes' | 'juegos' | 'android'; sub?: SubKey; desc: { es: string; en: string }; wip?: boolean; apk?: string }
const apps: AppEntry[] = [
  {
    name: 'Pronóstico Mundialista',
    url: 'https://mundial.closer.click/',
    logo: mundialLogo,
    repo: 'closerclick/pronostico-mundialista',
    cat: 'juegos',
    sub: 'multi',
    desc: {
      es: 'Arma tu pronóstico del Mundial 2026 (48 selecciones) en tres modos (simple, gana/pierde o con marcador), compite con tus amigos y lleva tu tabla de aciertos. Se codifica completo en una cadena corta, se firma con tu identidad ECDSA del vault <code>id.closer.click</code> y se comparte por QR.',
      en: 'Build your 2026 World Cup predictions (48 teams) in three modes (simple, win/lose or with scoreline), compete with your friends and track your hit table. It is fully encoded in a short string, signed with your ECDSA identity from the <code>id.closer.click</code> vault and shared by QR.',
    },
  },
  {
    name: 'Closer Click Chat',
    url: 'https://chat.closer.click/',
    logo: chatLogo,
    repo: 'closerclick/simple-websocket-chat',
    cat: 'apps',
    desc: {
      es: 'Chat en tiempo real con salas públicas, descubrimiento de canales y mensajería P2P por WebRTC con caída automática al proxy WebSocket.',
      en: 'Real-time chat with public rooms, channel discovery and P2P messaging over WebRTC with automatic fallback to the WebSocket proxy.',
    },
  },
  {
    name: 'Closer Click Messenger',
    url: 'https://messenger.closer.click/',
    logo: messengerLogo,
    repo: 'closerclick/closerclick_messenger',
    cat: 'apps',
    desc: {
      es: 'Mensajería 1-a-1 con cifrado E2E (ECDH+AES-GCM), contactos compartidos entre apps del ecosistema, hilos persistidos en <code>store.closer.click</code> (mismos mensajes en web + extensión), mensajes offline (proxy retiene 24 h) y ranking integrado. PWA instalable + extensión Chrome MV3 reusando la PWA via iframe.',
      en: 'One-to-one messaging with E2E encryption (ECDH+AES-GCM), contacts shared across ecosystem apps, threads persisted in <code>store.closer.click</code> (same messages on web + extension), offline messages (proxy holds them for 24 h) and built-in ratings. Installable PWA + Chrome MV3 extension reusing the PWA via iframe.',
    },
  },
  {
    name: 'Trueque',
    url: 'https://trueque.closer.click/',
    logo: truequeLogo,
    repo: 'closerclick/trueque',
    cat: 'apps',
    desc: {
      es: 'Anuncios georreferenciados <strong>efímeros</strong> (vendo / regalo / busco) cerca tuyo. Publicás un pin firmado con tu identidad del vault que vive máx 24 h (sin historial), descubrís por radio con un <strong>radar de proximidad</strong> sin mapas de terceros, y cerrás el trato por el messenger (contacto vía proxy). Estrena el pilar de descubrimiento geo <code>geo.closer.click</code>: tu ubicación no se guarda.',
      en: 'Georeferenced <strong>ephemeral</strong> listings (sell / give away / looking for) near you. Publish a pin signed with your vault identity that lives up to 24 h (no history), discover by radius with a <strong>proximity radar</strong> with no third-party maps, and close the deal over the messenger (contact via proxy). Debuts the geo discovery pillar <code>geo.closer.click</code>: your location is never stored.',
    },
  },
  {
    name: 'Eco',
    url: 'https://eco.closer.click/',
    logo: ecoLogo,
    repo: 'closerclick/eco',
    cat: 'apps',
    desc: {
      es: 'Microblogging <strong>efímero y georreferenciado</strong>: publicás un eco (texto + enlaces + tags) con tu ubicación, quien lo tenga en su <strong>radio de escucha</strong> lo descubre por <code>geo.closer.click</code>, lo recibe y lo <strong>archiva localmente</strong>. A las <strong>24 h muere en la red</strong> y nunca se re-emite (solo sobrevive tu copia local); reps y replies <strong>rehidratan</strong> el original. El orden del feed (recencia · afinidad · reputación · tags · geo) se calcula <strong>100 % en tu cliente</strong>. Tu voz, en tu zona, bajo tus reglas.',
      en: 'Ephemeral, <strong>georeferenced microblogging</strong>: post an eco (text + links + tags) with your location; whoever has it in their <strong>listening radius</strong> discovers it via <code>geo.closer.click</code>, receives it and <strong>archives it locally</strong>. After <strong>24 h it dies on the network</strong> and is never re-broadcast (only your local copy survives); reposts and replies <strong>rehydrate</strong> the original. Feed order (recency · affinity · reputation · tags · geo) is computed <strong>100% on your client</strong>. Your voice, in your radius, under your rules.',
    },
  },
  {
    name: 'QRShare',
    url: 'https://qrshare.closer.click/',
    logo: qrshareLogo,
    repo: 'closerclick/qrshare',
    cat: 'apps',
    desc: {
      es: 'Transferencia de archivos P2P por WebRTC. El proxy solo descubre los peers; los archivos viajan directamente entre dispositivos. Comparte por QR.',
      en: 'P2P file transfer over WebRTC. The proxy only discovers peers; files travel directly between devices. Share by QR.',
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
      es: 'Ajedrez online multijugador con transporte P2P por WebRTC cuando es posible. Crea partidas públicas o privadas; el lobby se actualiza en tiempo real con los eventos del proxy.',
      en: 'Online multiplayer chess with P2P transport over WebRTC when possible. Create public or private games; the lobby updates in real time from the proxy events.',
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
      es: 'Trivia configurable: pegá tu <code>JSON</code> de preguntas (o generalo con IA desde un prompt listo para copiar), elegí un color del que se deriva toda la paleta, modo claro/oscuro, tu logo y fondos para móvil y web. Modos quiz con puntaje, verdadero/falso y flashcards; elegís cuántas preguntas mostrar y publicás un enlace limpio para jugar. PWA instalable; tus trivias viven en tu navegador.',
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
      es: 'Sandbox multijugador cooperativo en un grid. Mundo subjetivo: cada peer hostea lo que crea y carga el entorno alrededor a medida que se mueve. Ground procedural determinista, props/items/personajes/enemigos programables vía DSL, resolución de conflictos por reputación (web-of-trust de identity) y recencia. Loot no-exclusivo, summon de enemigos por turnos ponderados por reputación.',
      en: 'Cooperative multiplayer sandbox on a grid. Subjective world: each peer hosts what it creates and loads the surrounding environment as it moves. Deterministic procedural ground, props/items/characters/enemies programmable via DSL, conflict resolution by reputation (identity web-of-trust) and recency. Non-exclusive loot, enemy summoning in turns weighted by reputation.',
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

const infoApp = ref<AppEntry | null>(null)
const openInfo = (a: AppEntry) => {
  infoApp.value = a
}
const closeInfo = () => {
  infoApp.value = null
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
          href="https://github.com/closerclick/closerclick#colaborá-sumá-tu-nodo-autohosteo"
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
            target="_blank"
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
.aplicaciones-section { align-items: flex-start; }
.aplicaciones-section > .section-content { padding-top: 7rem; }
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

.apps-tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.25rem;
  margin-top: 2.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
}
.apps-tab {
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
  border: none;
  border-bottom: 3px solid transparent;
  margin-bottom: -1px;
  padding: 0.7rem 1.6rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  white-space: nowrap;
}
.apps-tab:hover { color: #fff; background: rgba(255, 255, 255, 0.06); }
.apps-tab.active {
  color: #fff;
  border-bottom-color: #3498db;
}
.apps-tab.wip.active {
  border-bottom-color: #2ecc71;
}

.apps-subtabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.25rem;
}
.apps-subtab {
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 50px;
  padding: 0.4rem 1.1rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  white-space: nowrap;
}
.apps-subtab:hover { color: #fff; background: rgba(255, 255, 255, 0.12); }
.apps-subtab.active {
  color: #fff;
  background: #3498db;
  border-color: #3498db;
}

.apps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; margin-top: 2rem; }
.apps-grid.wip-grid { grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); }
.app-card.wip { border-color: rgba(46, 204, 113, 0.45); box-shadow: 0 0 0 1px rgba(46, 204, 113, 0.15) inset; }
.app-card.wip h3 { color: #2ecc71; }
.app-card { position: relative; background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); padding: 2rem; border-radius: 15px; border: 1px solid rgba(255, 255, 255, 0.2); transition: transform 0.3s ease; display: flex; flex-direction: column; align-items: center; text-align: center; }
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

/* Botón (i) en la esquina de la card (modo compacto) */
.app-info-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: rgba(0, 0, 0, 0.3);
  color: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  font-family: Georgia, 'Times New Roman', serif;
  font-style: italic;
  font-weight: 700;
  font-size: 0.95rem;
  line-height: 1;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 3;
}
.app-info-btn:hover { background: #3498db; color: #fff; border-color: #3498db; }

/* Modal de info de la app */
.info-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
}
.info-modal {
  position: relative;
  width: 100%;
  max-width: 440px;
  max-height: 85vh;
  overflow-y: auto;
  background: #243140;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 16px;
  padding: 2rem 1.75rem 1.75rem;
  text-align: center;
  color: #fff;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}
.info-modal-x {
  position: absolute;
  top: 0.6rem;
  right: 0.6rem;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  transition: all 0.2s ease;
}
.info-modal-x:hover { background: rgba(255, 255, 255, 0.12); color: #fff; }
.info-modal-logo { width: 72px; height: 72px; border-radius: 16px; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35); margin-bottom: 1rem; }
.info-modal-title { font-size: 1.4rem; color: #3498db; margin-bottom: 1rem; }
.info-modal-desc { line-height: 1.6; margin-bottom: 1.75rem; opacity: 0.95; text-align: left; }
.info-modal-desc code { background: rgba(0,0,0,0.35); padding: 0.1rem 0.4rem; border-radius: 4px; font-family: 'Consolas','Monaco',monospace; font-size: 0.9em; }
.info-modal-actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem; }
.info-modal-close {
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 0.75rem 1.75rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.info-modal-close:hover { background: rgba(255, 255, 255, 0.1); border-color: #fff; }

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

.comunidad-section { background: linear-gradient(135deg, #1a2733 0%, #16222b 100%); }
.community-services { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin: 2.5rem 0; }
.community-service { display: block; text-decoration: none; color: white; background: rgba(255, 255, 255, 0.08); backdrop-filter: blur(10px); padding: 1.5rem; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.15); transition: transform 0.2s ease, border-color 0.2s ease; }
.community-service:hover { transform: translateY(-4px); border-color: #3498db; }
.community-service h3 { color: #3498db; font-size: 1.3rem; margin-bottom: 0.4rem; }
.community-service p { opacity: 0.85; margin-bottom: 0.9rem; }
.community-service code { display: inline-block; background: rgba(0,0,0,0.4); padding: 0.3rem 0.5rem; border-radius: 6px; font-family: 'Consolas','Monaco',monospace; font-size: 0.78rem; word-break: break-all; }
.community-quickstart { display: flex; flex-direction: column; align-items: center; gap: 0.6rem; margin: 1.5rem 0; }
.community-quickstart code { background: rgba(0,0,0,0.45); padding: 0.6rem 1.2rem; border-radius: 8px; font-family: 'Consolas','Monaco',monospace; font-size: 1rem; color: #2ecc71; }
.community-quickstart span { opacity: 0.8; font-size: 0.95rem; }
.community-steps { max-width: 640px; margin: 1.5rem auto; text-align: left; line-height: 1.7; padding-left: 1.4rem; }
.community-steps li { margin-bottom: 0.6rem; }
.community-note { opacity: 0.85; font-style: italic; margin: 1.5rem auto; max-width: 640px; }
.community-cta { display: inline-block; margin-top: 1rem; background: #3498db; color: white; text-decoration: none; padding: 0.8rem 2rem; border-radius: 30px; font-weight: 600; transition: background 0.2s ease; }
.community-cta:hover { background: #2980b9; }

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
