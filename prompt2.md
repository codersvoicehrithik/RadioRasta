You are now responsible for taking the existing RadioRasta repository from its
CURRENT STATE to a COMPLETE, POLISHED, PRODUCTION-READY WEBSITE.

DO NOT merely suggest changes.

DO NOT give me another implementation plan.

DO NOT stop after fixing individual components.

DO NOT ask me to implement obvious parts manually.

Inspect the existing repository, understand what has already been built, and
then comprehensively redesign, refactor, replace, and finish the application.

The final result must feel like a real, memorable, interactive product.

============================================================
1. PRODUCT IDENTITY
============================================================

PRODUCT NAME:

RadioRasta

PARENT / CREATOR BRAND:

Codersvoice

Official product hierarchy:

Codersvoice
    ↓
RadioRasta
    ↓
Interactive Music Worlds

Never use:

Radio Rasta
Desi Radio
Baithak
Sunao
Safarnama
RadioRasta Music

The exact product name is:

RadioRasta

The exact creator brand spelling is:

Codersvoice

Do not write:

CodersVoice
CODERSVOICE
Coders Voice

============================================================
2. THE MOST IMPORTANT PRODUCT PRINCIPLE
============================================================

RadioRasta is NOT a normal music streaming website.

It is NOT a Spotify clone.

It is NOT a playlist dashboard.

It is NOT an image gallery with a music player.

It is an:

INTERACTIVE INDIAN MUSIC UNIVERSE.

The user should feel:

"I didn't open a website.
I entered a place."

The core concept is:

Music + Place + Memory + Mood + Journey

The user chooses a WORLD.

The world responds to the music.

The UI responds to the world.

The environment responds to the user.

The music player belongs to the world.

Interactions belong to the world.

Every world should feel like a tiny living memory from Indian everyday life,
especially the nostalgic atmosphere associated with 90s / early-2000s India.

============================================================
3. CURRENT IMPLEMENTATION MUST BE TRANSFORMED
============================================================

The current implementation is too static.

Current problems that MUST be fixed:

- dead typography
- generic RadioRasta text treatment
- generic navigation
- almost no meaningful motion
- static world cards
- generic gradients/placeholders
- weak hover states
- weak transitions
- no feeling of entering a world
- login unnecessarily prominent
- footer feels like a generic template
- Codersvoice is almost invisible
- worlds do not feel sufficiently distinct
- current visual design does not resemble the emotional quality of the supplied
  inspiration
- the page currently feels like a website ABOUT immersive music instead of
  actually BEING immersive music

Do not patch these one by one.

Rework the design system and experience holistically.

============================================================
4. NO LOGIN-FIRST EXPERIENCE
============================================================

RadioRasta MUST be usable without an account.

There must be NO prominent "Log in" button in the primary navigation.

The default experience is:

OPEN WEBSITE
↓
EXPLORE
↓
ENTER WORLD
↓
LISTEN
↓
ENJOY

No login required.

Anonymous users should be able to:

- browse worlds
- enter worlds
- complete rituals
- listen to available music
- create temporary listening state
- generate a journey ticket
- experience animations
- use contextual interactions
- share public experiences where appropriate

Authentication architecture may remain available for future use.

If authentication already exists, preserve it as an optional feature.

Do NOT delete working authentication architecture unnecessarily.

But move account functionality into:

- subtle profile/account area
- optional sign-in prompt
- library/profile page
- future personalization

Do not interrupt the core experience with authentication.

The product must work beautifully without signing in.

============================================================
5. RADIO RASTA BRANDING
============================================================

The current "RadioRasta" text in a plain font is unacceptable.

Create a distinctive wordmark treatment.

The brand should visually communicate:

RADIO + RASTA + INDIAN NOSTALGIA + MUSIC + JOURNEY

Use a creative typographic lockup.

Possible direction:

RADIO

in a Devanagari-inspired / vintage radio-inspired typographic treatment

RASTA

in a contrasting expressive English display typeface.

Do NOT literally make the whole brand Devanagari.

The final lockup should feel like a real identity.

Example conceptual structure:

RADIO
रास्ता / RASTA

or a visually integrated:

RADIOरास्ता

or another stronger solution.

The exact visual treatment is your design decision.

IMPORTANT:

Do not put generated text into the background artwork.

The actual brand typography must be HTML/CSS and remain sharp.

Create a reusable:

RadioRastaLogo

component.

It should work in:

- desktop header
- mobile header
- loading screen
- footer
- share cards
- world experience
- favicon/brand mark where appropriate

============================================================
6. CODERSVOICE BRAND IDENTITY
============================================================

Codersvoice must NOT simply appear as:

"An experience by Codersvoice"

at the bottom of a giant empty generic footer.

That is insufficient.

Codersvoice should feel like the CREATOR of this experimental digital experience.

However:

RadioRasta remains the consumer-facing primary brand.

Create an elegant creator-brand relationship.

Possible visual relationship:

RadioRasta
crafted by
[Codersvoice mark]

or:

A RadioRasta experience
from Codersvoice

or a small interactive Codersvoice creator mark.

Do NOT blindly copy another Codersvoice website.

Instead create something better suited to RadioRasta.

IMPORTANT:

If the Codersvoice website URL or logo already exists in the project
configuration, use it.

If it does not exist, do NOT invent a URL.

Use configurable:

siteConfig.brand.companyName = "Codersvoice"

siteConfig.brand.productName = "RadioRasta"

siteConfig.brand.companyUrl

siteConfig.brand.companyLogo

etc.

============================================================
7. CODERSVOICE CREATOR BUTTON
============================================================

Create a subtle but memorable Codersvoice creator interaction.

For example:

A small Codersvoice mark in the corner/footer.

On hover:

"Built by Codersvoice"

On click:

navigate to the configured Codersvoice website.

If no URL is configured, do not create a broken link.

The interaction should feel like a small developer/creator signature.

It should NOT dominate the RadioRasta experience.

Think:

"Someone made this beautiful thing."

not:

"THIS IS A CORPORATE SITE."

============================================================
8. VISUAL ART DIRECTION
============================================================

The supplied reference screenshots demonstrate the emotional direction.

The final design should communicate:

90s India
small-town India
Indian road culture
old radio
bus stations
truck cabins
chai stalls
barber shops
railway journeys
monsoon
street lights
old signage
paper tickets
painted typography
film grain
warm light
dust
imperfection
humanity
nostalgia

But the implementation must remain modern.

The product should feel:

nostalgic inside
modern underneath

NOT:

old website

NOT:

retro CSS from 2005

NOT:

generic glassmorphism

NOT:

generic SaaS.

============================================================
9. GENERATED BACKGROUND ART
============================================================

Background images will be generated separately.

The application must be completely prepared for them.

DO NOT generate UI into the backgrounds.

Background artwork represents only the environment.

The real UI is rendered by React/HTML/CSS.

Use placeholder assets until the final Cloudinary images are supplied.

Do not redesign components later just because backgrounds are added.

Create a strict asset contract.

============================================================
10. WORLD COUNT
============================================================

There MUST be exactly 9 initial worlds.

1. Bus Wala
2. Truck Driver
3. Chai Tapri
4. Deluxe Saloon
5. Train Radio
6. Dhaba Radio
7. Baarish Wali Khidki
8. 2AM Rooftop
9. Mohalle Wala Pyaar

"Mohalle Wala Pyaar" is mandatory.

Every world must feel visually and behaviorally different.

Do not use the same generic placeholder artwork or same interaction pattern
for every world.

============================================================
11. WORLD PHILOSOPHY
============================================================

Each world needs:

- identity
- ritual
- environment
- music rules
- motion
- atmosphere
- contextual interactions
- typography treatment
- player styling
- transitions
- visual details

Worlds should not simply be cards with different colors.

The user should know which world they are in even if the title is hidden.

============================================================
12. BUS WALA
============================================================

Theme:

Old Indian bus stand.
Red/cream bus.
Chai stall.
Passengers.
Luggage.
Conductor.
Road.
Dust.
Warm sunset.
Distant mountains where appropriate.

Mood:

Window seat.
Highway ahead.
Songs for the road.

ENTRY RITUAL:

Ask for:

From
To
Passenger name
Optional seat

Make it visually resemble an old-school bus ticket interaction.

Do not make it look like a modern form.

After completion:

animate a physical-looking digital ticket.

Then:

"Your bus is leaving."

Transition into the world.

INTERACTION:

Horn.

The user presses:

"हॉर्न बजाओ"

Create a short visual/audio response.

The world should react.

============================================================
13. TRUCK DRIVER
============================================================

Theme:

Long highway.
Decorated Indian truck.
Truck cabin.
Windshield.
Dashboard.
Distant mountains/desert/highway depending on asset.
Sunset/night.

Entry:

Driver name
From
To
Night drive?
Road mood

Generate:

TRIP CARD / LOG

Interaction:

Air horn.

Visual:

Headlight flash
small screen vibration
road atmosphere reaction

Night mode should feel especially beautiful.

============================================================
14. CHAI TAPRI
============================================================

Theme:

Indian roadside tea stall.

Visual details:

kettle
glass
steam
bench
newspaper
hanging bulb
biscuits
street
people
warm evening

ENTRY RITUAL:

"चाय कैसी होगी?"

Options:

Cutting
Full Glass
Adrak
Elaichi
Strong

Selection should trigger:

cup animation
steam
pour animation
subtle sound

Then:

"बैठो... गाना सुनते हैं."

Music starts.

============================================================
15. DELUXE SALOON
============================================================

Theme:

90s neighbourhood barber shop.

Visual details:

mirror
barber chair
scissors
comb
shaving brush
old radio
newspaper
small shop
street outside

ENTRY RITUAL:

"आज क्या सुनेंगे?"

Options:

90s Classics
Romantic
Sad
Old School
Neighbourhood Radio

Optional haircut choice:

Classic
Fade
Trim
Old School

Interaction:

scissors.

Small scissors animation/sound.

The world should feel intimate and nostalgic.

============================================================
16. TRAIN RADIO
============================================================

Theme:

Indian railway station / train window.

Visual:

window seat
passing scenery
station
bench
railway signs
warm lights
night train

ENTRY:

From
To
Train name optional
Coach optional
Seat optional

Generate:

old-school railway-style journey ticket.

Interaction:

train horn.

Music environment changes as the journey progresses.

============================================================
17. DHABA RADIO
============================================================

Theme:

Highway dhaba.

Visual:

charpai
steel glasses
truck parking
yellow bulbs
cook/fire
highway
old radio

ENTRY RITUAL:

"Table for?"

1
2
4
Truck Full

Then:

Highway Hits
Desi Classics
Late Night
Old Radio

Interaction:

dhaba bell / steel glass / chai.

============================================================
18. BAARISH WALI KHIDKI
============================================================

Theme:

Rainy Indian window.

Visual:

rain drops
blurred street lights
window glass
balcony
old buildings
wet streets

NO FORM.

Entry should simply feel like:

"बारिश हो रही है."

"बस बैठो."

Then music.

Interaction:

touch/tap window.

Rain reacts.

============================================================
19. 2AM ROOFTOP
============================================================

Theme:

Indian rooftop at 2AM.

Visual:

water tank
charpai
city lights
stars
telephone wires
moon
distant buildings
cool night atmosphere

Entry:

No form.

Simple:

"2:00 AM.
Everyone's asleep.
You aren't."

CTA:

"Stay a while."

Interaction:

look at stars / radio / rooftop light.

============================================================
20. MOHALLE WALA PYAAR
============================================================

This world must feel extremely nostalgic.

Theme:

Old neighbourhood / mohalla.

Visual possibilities:

narrow street
scooter
old house
balcony
terrace
children playing
kirana shop
parked cycles
neighbours talking
festival decorations where appropriate
evening light

Emotional idea:

"The songs that played while the whole mohalla was still awake."

Music:

90s Bollywood
romantic classics
family songs
old TV/radio nostalgia

Entry ritual:

Do not use a generic form.

Create a small nostalgic interaction such as:

"किसके घर जा रहे हो?"

Options:

"बस ऐसे ही"
"दोस्त के घर"
"वो सामने वाली गली..."
"मम्मी ने बुलाया है"

This is intentionally playful.

Interaction:

street light
doorbell
scooter horn
window/balcony light

============================================================
21. WORLD ENTRY MUST FEEL LIKE ENTERING
============================================================

When user clicks a world:

DO NOT simply navigate to another normal page.

Create an immersive transition.

Example:

card expands
background scales
colors transition
typography enters
ambient elements fade in
player appears
world-specific UI emerges

The user should feel:

"I entered Bus Wala."

Use Framer Motion.

Do not overanimate.

============================================================
22. BACKGROUND MOTION
============================================================

Backgrounds should have subtle life.

Depending on world:

Bus:
moving dust / passing light / slight parallax

Truck:
road movement / headlights / sky movement

Chai:
steam / light flicker / subtle people movement if possible

Saloon:
fan / light / mirror reflection

Train:
passing scenery

Rain:
rain drops

Rooftop:
stars / subtle clouds

Mohalla:
lights turning on / subtle movement

Use CSS and lightweight motion.

Do NOT require large videos for MVP.

============================================================
23. GLOBAL TIME-OF-DAY SYSTEM
============================================================

World appearance should react to time.

Morning
Afternoon
Evening
Night

The application can select appropriate background variants.

Do not cause hydration issues.

Use client-side context after hydration where necessary.

============================================================
24. MUSIC → VISUAL SYSTEM
============================================================

THIS IS A CORE FEATURE.

When music changes, the world should respond.

Track metadata:

mood
energy
genre
era
tempo
language

Theme engine calculates:

overlay
brightness
saturation
motion intensity
lighting
particle intensity
background treatment
player style

Example:

Romantic:

warm
soft
slow

Sad:

dark
rain
muted

Energetic:

stronger movement
more active equalizer

Night:

cooler
darker
lights

Transitions should interpolate smoothly.

============================================================
25. MUSIC PLAYER
============================================================

Create a beautiful persistent player.

It should feel like a part of RadioRasta.

Not a generic Spotify clone.

Features:

play
pause
previous
next
seek
volume
mute
shuffle
repeat
queue
favorite
current world
current track

Desktop:

floating/persistent bottom player.

Mobile:

compact bottom player + expandable full player.

The player design should dynamically adapt to the current world.

============================================================
26. PLAYLIST ARCHITECTURE
============================================================

IMPORTANT:

Do not hardcode playlists into components.

Each world should have configurable playlist/source settings.

Create world music configuration.

For example conceptually:

worldMusicConfig:

{
  worldSlug: "bus-wala",
  sourceType: "youtube",
  sourceUrl: "...",
  playlistId: "...",
  enabled: true
}

Do not blindly copy this exact structure.

Choose the cleanest implementation.

============================================================
27. ENVIRONMENT-CONFIGURABLE MUSIC SOURCES
============================================================

The project owner wants to be able to configure music without modifying
application code.

Provide environment/configuration support.

For example:

RADIORASTA_BUS_WALA_PLAYLIST_URL=
RADIORASTA_TRUCK_DRIVER_PLAYLIST_URL=
RADIORASTA_CHAI_TAPRI_PLAYLIST_URL=
RADIORASTA_DELUXE_SALOON_PLAYLIST_URL=
RADIORASTA_TRAIN_RADIO_PLAYLIST_URL=
RADIORASTA_DHABA_RADIO_PLAYLIST_URL=
RADIORASTA_BAARISH_WALI_KHIDKI_PLAYLIST_URL=
RADIORASTA_2AM_ROOFTOP_PLAYLIST_URL=
RADIORASTA_MOHALLE_WALA_PYAAR_PLAYLIST_URL=

BUT:

Do not expose secrets.

Do not assume every provider can legally or technically provide raw audio
through a playlist URL.

The music provider integration must respect provider terms and copyright.

Do not scrape or rip audio.

Build an adapter architecture.

For example:

MusicSourceAdapter

Possible implementations:

YouTube/embed-compatible source
OwnedAudioSource
DemoAudioSource

The actual provider must be configurable.

If the current project already has a working provider integration, preserve it
and improve the architecture.

============================================================
28. YOUTUBE / EXTERNAL PLAYBACK
============================================================

If YouTube playlist URLs are used:

Do not download the music.

Do not proxy the audio.

Do not extract copyrighted audio.

Use permitted embed/player mechanisms.

Build the UI so the provider integration can be swapped later.

If autoplay is blocked by browser policy, gracefully handle it.

User interaction should start playback.

============================================================
29. DEMO CONTENT
============================================================

The site must still work if no external playlist URLs are configured.

Use safe demo/placeholder content.

The rest of the world must remain fully functional.

Do not show a broken player.

Provide a clear fallback state.

============================================================
30. DISCOVER PAGE
============================================================

The current Discover page is too static.

Rebuild it.

Instead of:

"Find the feeling first."

followed by generic cards,

make Discover itself feel like a visual journey.

Possible sections:

"आज कहाँ चलें?"

"रास्ते जो याद आते हैं"

"शाम के बाद"

"90s वाली दुनिया"

"एक कप चाय के साथ"

"रात की आखिरी बस"

"मोहल्ले की गली"

"बारिश में खिड़की"

Use dynamic horizontal rails, overlapping cards, marquee elements,
micro-interactions and world-specific previews.

============================================================
31. WORLD CARDS
============================================================

World cards MUST NOT look like generic SaaS cards.

Use the generated artwork when available.

Until then use placeholders that preserve composition.

Hover:

- slight scale
- image movement
- title movement
- visual overlay
- directional arrow
- atmospheric effect

Do NOT just use:

transform: scale(1.02)

and call it animation.

Create meaningful motion.

Possible:

image parallax
text slide
mask reveal
light sweep
grain shift
arrow movement
background color transition

============================================================
32. SCROLL EXPERIENCE
============================================================

The current scroll experience feels dead.

Fix it.

Use:

- section reveal
- staggered entrances
- horizontal rails
- image parallax
- typography movement
- sticky sections where useful
- world previews
- subtle scroll-linked transitions

Do NOT turn the entire page into a scroll animation demo.

Motion should support storytelling.

============================================================
33. HERO
============================================================

The current hero is too empty and generic.

Rebuild it.

RadioRasta's hero should immediately communicate:

music
India
journey
nostalgia
worlds

Potential copy:

"आज कहाँ चलें?"

"Not a playlist.
A place to disappear into."

This type of copy is acceptable but the final wording can be refined.

The visual hierarchy should be:

RadioRasta identity
↓
emotional statement
↓
world invitation
↓
primary action

The hero should have real environmental artwork once supplied.

============================================================
34. HERO MOTION
============================================================

The hero should have subtle continuous life.

Examples:

slow background movement
light shift
floating grain
moving typography
small atmospheric details
animated route line

No seizure-inducing effects.

No constant bouncing buttons.

============================================================
35. HEADER
============================================================

Current header:

RadioRasta | Home | Discover | Journeys | Search | Login

is too generic.

Redesign.

Primary:

RadioRasta brand mark

Navigation:

Home
Discover
Journeys

Search can be a minimal icon/search trigger.

Account should NOT dominate.

Possible right side:

Search
small profile/optional account
subtle Codersvoice creator mark

Header should blend into the environment.

On world pages, header should adapt to the world.

============================================================
36. SEARCH
============================================================

Search should feel integrated with the RadioRasta identity.

Search:

tracks
artists
worlds
playlists

Use a visually polished command/search overlay.

Keyboard shortcut can be:

/

where appropriate.

============================================================
37. JOURNEYS PAGE
============================================================

Create a dedicated Journey experience.

Show:

current/previous journeys
tickets
completed journeys
journey soundtrack

Do not make it look like an admin table.

Use:

ticket stacks
route lines
travel cards
stamps
maps/abstract route graphics

============================================================
38. TICKET DESIGN
============================================================

Tickets must feel like physical nostalgic objects.

Use:

paper texture
perforation
stamp
serial number
route
date
passenger

But:

THE TICKET MUST CLEARLY BE A DIGITAL/ENTERTAINMENT EXPERIENCE.

It is not a real transport ticket.

Do not create anything that could reasonably be mistaken for a valid real ticket.

============================================================
39. JOURNEY PROGRESSION
============================================================

Journey can progress based on listening duration.

Example:

Departure
↓
Highway
↓
Chai Stop
↓
Mountains
↓
Arrival

This is fictional and visual.

No GPS required.

Show progression elegantly.

============================================================
40. ANONYMOUS-FIRST DATA
============================================================

Because login is optional, anonymous users should still receive a good
experience.

Use anonymous session identifiers where useful.

Do not require account creation for core listening.

Store only necessary data.

============================================================
41. AUTHENTICATION
============================================================

Keep Better Auth if already implemented.

But authentication should become an enhancement rather than a gate.

Authenticated users can have:

favorites
history
saved playlists
saved tickets
profile
personalized worlds

Anonymous users can still use the core platform.

============================================================
42. FAVORITES
============================================================

Users can favorite:

tracks
worlds
playlists

For anonymous users:

use local state/localStorage where appropriate.

For authenticated users:

persist to Neon.

============================================================
43. PLAYER PERSISTENCE
============================================================

Player must survive route navigation.

Do not stop music simply because user navigates:

Home
→ Discover
→ World
→ Search

Use a global music provider.

============================================================
44. MOBILE
============================================================

The current design must be reconsidered for mobile.

Mobile should NOT be desktop compressed.

World pages should become immersive vertical experiences.

Player:

bottom sheet

Navigation:

bottom or compact overlay

Tickets:

portrait-first

World artwork:

mobile-specific positioning

Interactions:

large touch targets

============================================================
45. FOOTER — COMPLETE REDESIGN
============================================================

The current footer is one of the weakest parts of the site.

Do NOT preserve it.

Do NOT simply change its colors.

Rebuild it from scratch.

The footer should feel like the FINAL SCENE of RadioRasta.

Possible experience:

Large RadioRasta wordmark.

Then:

"रास्ता खत्म नहीं होता.
बस अगला गाना शुरू होता है."

or another emotionally appropriate line.

Then visual route lines / stars / road markings / ticket fragments / radio
details.

Navigation can be present but should NOT dominate.

Use sections such as:

RadioRasta
Worlds
Journeys
About
Privacy
Terms

But integrate them into the visual story.

Codersvoice creator mark should be interactive and memorable.

Footer should have depth.

Maybe the route visually continues into the footer.

Do not leave huge dead empty space.

The footer should feel intentionally designed.

============================================================
46. CODERSVOICE FOOTER SIGNATURE
============================================================

Create an actual visual creator signature.

Example conceptual interaction:

[small Codersvoice symbol]

hover:
"Made with curiosity by Codersvoice"

click:
Codersvoice website

Or another tasteful implementation.

Make it feel like a creator's signature.

Not:

"An experience by Codersvoice"

sitting alone in a random paragraph.

============================================================
47. 404 PAGE
============================================================

Make the 404 page fit RadioRasta.

Example:

"लगता है गलत रास्ते पर आ गए."

Then:

"चलो वापस चलते हैं."

with a visual road/world element.

============================================================
48. LOADING EXPERIENCE
============================================================

Create a RadioRasta loading state.

Possible:

radio tuning
frequency line
route animation
station sign
"Finding your rasta..."

Use it sparingly.

============================================================
49. EMPTY STATES
============================================================

All empty states should feel contextual.

Examples:

No journeys:

"अभी कोई सफर शुरू नहीं हुआ."

No favorites:

"कोई गाना दिल में नहीं उतरा अभी."

No playlist:

"पहले रास्ता चुनो."

============================================================
50. INTERACTION DESIGN
============================================================

Every clickable thing needs:

hover
focus
pressed
disabled
loading

states.

Use micro-interactions.

Examples:

buttons:
arrow moves

cards:
image shifts

links:
underline grows

player:
controls respond

ticket:
stamp appears

world:
transition begins

============================================================
51. CUSTOM CURSOR
============================================================

A subtle custom cursor may be used on desktop if it improves the experience.

Examples:

normal
pointer
music
enter-world

But:

- do not use it on mobile
- do not make it annoying
- preserve accessibility
- do not replace normal cursor behavior completely

============================================================
52. GRAIN / TEXTURE
============================================================

Use subtle film grain/noise.

It should be:

very subtle
performance-conscious
responsive

Do not use enormous transparent PNG overlays.

Prefer CSS or lightweight optimized assets.

============================================================
53. COLOR SYSTEM
============================================================

Create a centralized design token system.

Base:

warm cream
deep brown
burnt orange
dusty red
muted blue
paper beige
charcoal

Worlds can override accents.

Do not make everything orange.

Each world gets a palette.

============================================================
54. TYPOGRAPHY SYSTEM
============================================================

Typography is critical.

Use a strong display serif or expressive display face for major headlines.

Use a clean sans-serif for UI.

Support Devanagari properly.

Worlds may have contextual typography treatment.

RadioRasta logo should have custom treatment.

Do not use one boring font everywhere.

============================================================
55. UI SYSTEM
============================================================

Build a reusable design system.

Components:

Button
IconButton
WorldCard
TrackCard
TrackRow
Player
Modal
Drawer
Ticket
Badge
Tooltip
SearchOverlay
SectionHeader
Navigation
Toast
Skeleton
EmptyState

But every component must fit RadioRasta.

Avoid generic shadcn-looking UI unless substantially customized.

============================================================
56. DATABASE
============================================================

Use:

Neon PostgreSQL
Drizzle ORM

Preserve working schema where possible.

Ensure schema supports:

users
sessions
accounts

worlds
worldAssets
worldThemes
worldInteractions

artists
albums
tracks
playlists
playlistTracks

favorites
userPlaylists
userPlaylistTracks

listeningSessions
listeningHistory

journeys
journeyTickets
journeyEvents

worldReactions

admin role information

Use proper foreign keys.

Add indexes based on actual queries.

============================================================
57. WORLD CONFIGURATION
============================================================

Worlds MUST remain data-driven.

Do not create nine completely independent page implementations.

Use:

/world/[slug]

with configuration from database.

============================================================
58. ADMIN
============================================================

Keep the admin system.

Admin must be able to manage:

worlds
assets
tracks
playlists
music source configuration
theme configuration
interactions
onboarding

Do not make the admin UI visually identical to the consumer website.

It can be practical and dashboard-like.

============================================================
59. CLOUDINARY
============================================================

Cloudinary is the persistent asset storage system.

Create configuration support.

Assets:

world backgrounds
world covers
track covers
props
textures
share images

Use optimized Cloudinary delivery.

Never expose API secret.

============================================================
60. REQUIRED ASSET CONTRACT
============================================================

Create/update:

ASSET_CONTRACT.md

This document must contain the FINAL EXACT asset inventory.

For every world specify:

exact filename
purpose
recommended dimensions
aspect ratio
mobile crop requirement
composition
UI-safe area
lighting
visual style

Use predictable names.

For example:

worlds/bus-wala/hero-sunset.webp
worlds/bus-wala/hero-day.webp
worlds/bus-wala/hero-night.webp

etc.

IMPORTANT:

The asset contract must be written so the developer can upload generated
assets to Cloudinary and simply configure/use them.

============================================================
61. ASSET NAMING
============================================================

Use a predictable exact naming scheme.

For example:

radio-rasta/
  worlds/
    bus-wala/
      hero-day.webp
      hero-evening.webp
      hero-night.webp
      hero-rain.webp
      interior.webp

Do not create random filenames.

The final asset contract must tell the owner exactly what files to upload.

============================================================
62. ENVIRONMENT CONFIG
============================================================

Create/update:

.env.example

Include:

DATABASE_URL
BETTER_AUTH_SECRET
BETTER_AUTH_URL

Cloudinary:

CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET

Music source configuration for all nine worlds.

Prefer a scalable configuration strategy rather than exploding the environment
file unnecessarily.

If environment variables become too large, allow database-backed admin
configuration.

The owner specifically wants to be able to configure playlist URLs without
editing React components.

============================================================
63. DEPLOYMENT
============================================================

Application must be deployable on:

Vercel

and reasonably on:

Render

Primary recommendation:

Vercel
+
Neon
+
Cloudinary

No local filesystem dependencies.

No Docker requirement for normal deployment.

No Redis.

No external microservices.

============================================================
64. FREE-TIER FRIENDLY
============================================================

Keep infrastructure minimal.

Do not introduce:

Redis
Kafka
RabbitMQ
Kubernetes
separate API server
separate worker service

unless absolutely required.

Use:

Next.js
Neon
Cloudinary
Vercel

============================================================
65. SEO
============================================================

Implement:

metadata
OpenGraph
Twitter/X cards
sitemap
robots
canonical URLs
world-specific metadata

Use:

RadioRasta

as the primary product identity.

Codersvoice can appear in appropriate metadata.

============================================================
66. PERFORMANCE
============================================================

This application contains large visual environments.

Performance is critical.

Use:

Next/Image where appropriate
Cloudinary transformations
lazy loading
dynamic imports
CSS animations
Framer Motion only where useful
minimal client components
GPU-friendly transforms
avoid unnecessary blur
avoid giant video backgrounds

Do not make the entire app client-side.

============================================================
67. ACCESSIBILITY
============================================================

Support:

keyboard navigation
focus states
semantic HTML
ARIA labels
reduced motion
screen readers
sufficient contrast

If custom interactions are used, they must remain accessible.

============================================================
68. REDUCED MOTION
============================================================

If:

prefers-reduced-motion: reduce

then:

reduce parallax
disable decorative movement
reduce world transition intensity
reduce particle movement
retain functionality

============================================================
69. SECURITY
============================================================

Do not expose:

database credentials
Cloudinary secret
auth secret
admin privileges

Admin authorization must happen server-side.

Validate all user input.

Validate uploads.

============================================================
70. DATA PRIVACY
============================================================

No mandatory location.

If city presence exists:

optional
city-level only

Never expose exact location.

============================================================
71. ANALYTICS
============================================================

Track meaningful events:

worldOpened
worldStarted
trackStarted
trackCompleted
trackSkipped
favoriteAdded
journeyStarted
journeyCompleted
ticketGenerated
interactionTriggered
shareStarted

Avoid excessive database writes.

============================================================
72. REALTIME LISTENER COUNT
============================================================

The site may show:

"1,284 listening"

but this should be approximate.

Do not build complex realtime infrastructure.

Use lightweight heartbeat/polling/aggregation.

Do not expose user identities unless intentionally public.

============================================================
73. SHARE EXPERIENCE
============================================================

Create shareable:

world
journey
ticket
listening moment

Use OpenGraph.

Example:

"Delhi → Manali
RadioRasta
Bus Wala"

Share cards should use world artwork and RadioRasta branding.

Codersvoice can appear subtly.

============================================================
74. PACKAGE / DEPENDENCY DISCIPLINE
============================================================

Keep the stack minimal.

Current dependency issue must NOT be solved using:

--legacy-peer-deps
--force

Resolve actual compatibility.

Align:

better-auth
@better-auth/drizzle-adapter
drizzle-orm
drizzle-kit

Use compatible versions.

============================================================
75. ENVIRONMENT LOADING
============================================================

Standalone scripts such as:

db:seed
db:migrate

must correctly load environment variables.

The project currently experienced:

DATABASE_URL is not configured

despite .env existing.

Fix this properly.

Do not require manual:

$env:DATABASE_URL=...

Use a proper environment loading strategy.

============================================================
76. NEON DRIVER
============================================================

Review the existing Neon database connection.

The current project uses:

@neondatabase/serverless

and showed a WebSocket-related warning.

Determine the correct configuration for:

local development
Neon remote database
Vercel deployment

Do not blindly replace working Neon infrastructure.

============================================================
77. DOCUMENTATION
============================================================

Create/update:

README.md
SETUP.md
DEPLOY.md
USER_GUIDE.md
ASSET_CONTRACT.md

Documentation must reflect actual implementation.

============================================================
78. USER GUIDE
============================================================

Explain:

how RadioRasta works
how to enter worlds
how journey tickets work
how rituals work
how to play music
how playlists are configured
how favorites work
anonymous experience
optional authentication
how to share experiences

============================================================
79. DEPLOY GUIDE
============================================================

Include:

Neon
Cloudinary
Vercel
Render notes
environment variables
database migration
seed
build
production verification

============================================================
80. CODE STRUCTURE
============================================================

Keep clear separation:

app/
components/
db/
lib/
styles/
public/
tests/

Use appropriate naming.

Do not create unnecessary abstractions.

============================================================
81. TESTING
============================================================

Ensure tests cover:

world retrieval
world slug
theme engine
journey generation
ticket generation
playlist configuration
favorites
authorization
admin protection

============================================================
82. FINAL QUALITY BAR
============================================================

Before completion, ask yourself:

Does this look like a generic website?

If yes → redesign.

Does the user feel like they entered a world?

If no → redesign.

Does the homepage feel alive?

If no → redesign.

Does the RadioRasta logo feel like a real brand?

If no → redesign.

Does each world have its own personality?

If no → redesign.

Does scrolling feel intentional?

If no → redesign.

Do hover states feel meaningful?

If no → redesign.

Does the footer feel like part of the story?

If no → redesign.

Is Codersvoice represented like a creator brand?

If no → redesign.

Can someone use the site without logging in?

If no → fix.

Can music configuration be changed without editing components?

If no → fix.

Can final generated assets be uploaded without rewriting UI?

If no → fix.

============================================================
83. FINAL USER EXPERIENCE
============================================================

The ideal first visit:

User opens RadioRasta.

No login wall.

No generic dashboard.

They see:

RadioRasta

"आज कहाँ चलें?"

The environment is alive.

They browse worlds.

They hover Bus Wala.

The world moves.

They click.

The interface transitions.

A nostalgic ticket appears.

They enter:

Delhi → Manali.

Ticket prints.

Bus world opens.

Music begins.

The background breathes.

The UI adapts.

The player becomes part of the bus.

They press:

हॉर्न बजाओ

The bus reacts.

They continue listening.

The environment changes with music.

They eventually discover:

Chai Tapri.

They enter.

"चाय कैसी होगी?"

They choose:

Adrak.

Steam rises.

Music begins.

Then they discover:

Mohalle Wala Pyaar.

They think:

"Bro... this actually feels like India."

THAT is the quality bar.

============================================================
84. FINAL TECHNICAL CHECKLIST
============================================================

Before declaring complete:

[ ] npm install succeeds without force
[ ] no peer dependency conflict
[ ] DATABASE_URL loads correctly
[ ] db migration works
[ ] db seed works
[ ] typecheck passes
[ ] lint passes
[ ] tests pass
[ ] production build passes
[ ] anonymous user can use app
[ ] login is optional
[ ] RadioRasta branding is polished
[ ] Codersvoice creator identity is implemented
[ ] 9 worlds exist
[ ] Mohalle Wala Pyaar exists
[ ] every world has distinct identity
[ ] world entry transition works
[ ] journey onboarding works
[ ] ticket generation works
[ ] rituals work
[ ] music player works
[ ] player persists across navigation
[ ] music source configuration works
[ ] theme engine works
[ ] background transitions work
[ ] time-of-day behavior works
[ ] interactions work
[ ] favorites work
[ ] playlists work
[ ] journey history works
[ ] responsive mobile experience works
[ ] footer redesigned
[ ] 404 designed
[ ] loading states designed
[ ] empty states designed
[ ] accessibility implemented
[ ] reduced motion implemented
[ ] Cloudinary architecture works
[ ] asset contract exists
[ ] README exists
[ ] SETUP exists
[ ] DEPLOY exists
[ ] USER_GUIDE exists
[ ] .env.example exists
[ ] no secrets committed
[ ] SEO exists
[ ] sitemap exists
[ ] robots exists
[ ] OpenGraph exists

============================================================
85. FINAL EXECUTION INSTRUCTION
============================================================

DO NOT stop at planning.

DO NOT return a list of things I should build.

DO NOT say "you can implement this later."

IMPLEMENT EVERYTHING DESCRIBED ABOVE IN THE EXISTING REPOSITORY.

Use the current implementation as a starting point, but you have permission to
replace weak components and redesign the application where necessary.

Prioritize quality over preserving mediocre existing UI.

Do not delete working functionality without understanding it first.

After implementation:

1. run the application
2. inspect the actual rendered pages
3. inspect mobile behavior
4. inspect every world
5. inspect hover/scroll/transition behavior
6. inspect the footer
7. inspect the branding
8. inspect the player
9. inspect anonymous flow
10. inspect journey flow
11. fix visual inconsistencies
12. run lint
13. run typecheck
14. run tests
15. run production build

Do not consider the task complete merely because the build passes.

The application must LOOK and FEEL complete.

The only intentionally external step after this implementation should be:

UPLOAD THE FINAL GENERATED ARTWORKS TO CLOUDINARY
AND CONFIGURE THEIR URLS / ASSET REFERENCES.

Everything else required for the product should already be implemented.

Build RadioRasta as if it is going to be publicly shown as a flagship
Codersvoice experiment.

Do not build a template.

Build the actual product.