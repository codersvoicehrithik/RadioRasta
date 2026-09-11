You are the lead product engineer, senior full-stack architect, UI/UX engineer, and production engineer responsible for building this entire application.

Do not merely describe the implementation.

BUILD IT.

You have permission to inspect the repository, create and modify files, install required dependencies, refactor code, create database schemas, create API/server actions, build UI components, and implement the complete product described below.

The goal is to create a polished, production-ready, deployable full-stack web application.

============================================================
1. PRODUCT
============================================================

Build a full-stack interactive music experience called:

DESI RADIO

IMPORTANT:
The final branding/name can be changed later if necessary, so keep branding centralized in configuration.

This is NOT intended to be a Spotify clone.

The core product concept is:

"Music is not just something you listen to.
Music puts you inside a place, moment, journey, or memory."

The application combines:

- music streaming/radio
- interactive environments
- Indian nostalgia
- visual storytelling
- dynamic themes
- personalized listening
- journey rituals
- virtual tickets
- atmospheric UI
- social listening signals
- playlists
- user accounts
- admin-controlled worlds

The product should feel like entering a small digital universe rather than opening a conventional music player.

Reference the supplied visual inspiration only for:
- overall emotional direction
- nostalgic Indian environments
- illustrated visual storytelling
- immersive composition
- typography inspiration
- warm cinematic atmosphere
- unusual contextual music experiences

DO NOT copy another website pixel-for-pixel.
DO NOT copy their branding.
DO NOT copy their assets.
DO NOT scrape their artwork.
DO NOT reproduce copyrighted interface designs.

Create an original visual identity inspired by the broader aesthetic.

============================================================
2. CORE PRODUCT IDEA
============================================================

Instead of asking:

"What song do you want to play?"

the application should often ask:

"Where do you want to be?"

Examples:

BUS WALA
TRUCK DRIVER
TRAIN RADIO
CHAI TAPRI
DELUXE SALOON
DHABA RADIO
BAARISH WALI KHIDKI
2AM ROOFTOP
HOSTEL RADIO
MUMBAI TAXI

These are called WORLDS.

Each world is an interactive music environment.

A World consists of:

- visual identity
- background scenes
- music/radio configuration
- onboarding ritual
- dynamic theme
- ambient effects
- interactive elements
- metadata
- optional journey system
- optional virtual ticket
- optional contextual sounds
- shareable experience

The architecture MUST be data-driven.

Do not hardcode every world into separate pages.

BAD:

BusPage.tsx
TruckPage.tsx
ChaiPage.tsx

GOOD:

/world/[slug]

with database-driven world configuration.

============================================================
3. TECHNOLOGY STACK
============================================================

Use the smallest practical production-ready stack.

REQUIRED:

Frontend + Backend:
- Next.js
- TypeScript

Styling:
- Tailwind CSS

Animation:
- Framer Motion

Database:
- PostgreSQL
- Neon PostgreSQL

ORM:
- Drizzle ORM

Authentication:
- Better Auth

Asset storage:
- Cloudinary

Deployment:
- Vercel as primary deployment target
- Render compatibility where practical

Package manager:
- use the package manager already present in the repository
- otherwise prefer npm

Do NOT introduce unnecessary technologies.

Avoid unless genuinely required:

- Redis
- Kafka
- RabbitMQ
- Docker for the normal deployment
- Kubernetes
- separate Express server
- separate NestJS server
- GraphQL
- microservices
- Elasticsearch
- complex state-management frameworks
- unnecessary UI component libraries

Prefer:

Next.js server components
Server Actions
Route Handlers
PostgreSQL
Drizzle
simple React state
URL state
cookies/session where appropriate

============================================================
4. DEPLOYMENT REQUIREMENT
============================================================

The application must be deployable using free/low-cost tiers during MVP development.

Primary:

Vercel
+
Neon
+
Cloudinary

The architecture should also remain reasonably deployable on Render.

Do not depend on local filesystem persistence.

Do not store uploaded user assets permanently on the application server.

Use Cloudinary for persistent media.

All configuration must use environment variables.

Create:

.env.example

Never commit real credentials.

============================================================
5. REQUIRED DOCUMENTATION
============================================================

Create and maintain:

README.md
SETUP.md
DEPLOY.md
USER_GUIDE.md

README.md:
- what the product is
- key features
- architecture
- stack
- project structure
- development commands
- environment variables
- deployment overview

SETUP.md:
- prerequisites
- cloning
- installation
- Neon setup
- Cloudinary setup
- Better Auth setup
- environment variables
- database migrations
- seed data
- local development

DEPLOY.md:
- Vercel deployment
- Neon configuration
- Cloudinary configuration
- environment variables
- database migration/deployment process
- production checks
- Render notes where applicable

USER_GUIDE.md:
- discovering worlds
- starting a journey
- using the player
- creating favorites
- playlists
- tickets
- profile
- sharing experiences
- admin functionality where relevant

Documentation must describe the ACTUAL implementation.

Do not write fictional documentation.

============================================================
6. APPLICATION STRUCTURE
============================================================

Recommended structure:

/

Landing / Discover

/world/[slug]

Dynamic world experience.

/discover

Browse worlds, moods, genres, eras.

/search

Search.

/library

User library.

/favorites

Favorites.

/history

Listening history.

/playlists

User playlists.

/profile

Profile.

/login
/register

Authentication.

/admin

Admin dashboard.

Possible routes:

/admin/worlds
/admin/tracks
/admin/playlists
/admin/users
/admin/analytics
/admin/uploads

Use route protection.

============================================================
7. HOMEPAGE EXPERIENCE
============================================================

The homepage must NOT feel like a generic SaaS dashboard.

It should immediately communicate:

"Where do you want to listen?"

Possible hero:

"आज कहाँ चलें?"

Supporting copy can communicate:

"Pick a place. Pick a mood. Let the music take you there."

The homepage should contain:

1. immersive hero
2. featured world
3. popular worlds
4. live listening activity
5. moods
6. journeys
7. recently added
8. nostalgic/era-based discovery
9. footer

Example world cards:

BUS WALA
"Window seat. Highway ahead. Songs for the road."

TRUCK DRIVER
"Long roads. Longer nights."

CHAI TAPRI
"One chai. One song. Stay awhile."

DELUXE SALOON
"90s songs and neighbourhood stories."

TRAIN RADIO
"Songs made for window seats."

BAARISH WALI KHIDKI
"Rain outside. Music inside."

The actual copy can be refined, but preserve this emotional tone.

============================================================
8. WORLD SYSTEM
============================================================

Implement a reusable World system.

Conceptual model:

World:

id
slug
name
description
category
status
coverImage
heroImage
themeConfig
onboardingConfig
interactionConfig
musicConfig
ambientConfig
createdAt
updatedAt

Categories:

journey
place
mood
activity
nostalgia

Worlds should be extensible.

Adding a new world should primarily require data/configuration rather than a new React page.

============================================================
9. WORLD EXAMPLES
============================================================

Seed the database with at least these worlds:

1. Bus Wala
2. Truck Driver
3. Chai Tapri
4. Deluxe Saloon
5. Train Radio
6. Dhaba Radio
7. Baarish Wali Khidki
8. 2AM Rooftop

Each should have distinct metadata and onboarding behavior.

Do not make every world look identical.

============================================================
10. DYNAMIC THEME ENGINE
============================================================

THIS IS A CORE FEATURE.

The visual environment must react dynamically to:

- current world
- current track
- mood
- genre
- energy
- era
- time of day
- weather configuration where applicable
- journey state

Create a Theme Engine.

Conceptually:

World
+
Track metadata
+
Current context
=
Visual State

Visual State controls:

- background
- background position
- overlays
- color variables
- typography treatment
- card appearance
- player appearance
- ambient particles
- lighting
- animation intensity
- visual effects

Example:

Romantic 90s track:

- warm lighting
- amber tones
- slow movement
- subtle film grain
- sunset environment

Sad track:

- darker overlay
- rain
- slower transitions
- muted atmosphere

Energetic track:

- stronger visual movement
- brighter highlights
- more active equalizer
- stronger transitions

Night track:

- dark blue atmosphere
- lights
- stars/headlights where applicable

Transitions must be smooth.

Never abruptly replace the entire UI.

Use Framer Motion and CSS transitions.

============================================================
11. MUSIC METADATA
============================================================

Tracks should support metadata such as:

id
title
artist
album
coverImage
audioUrl or externalSource
duration
genre
mood
energy
era
language
tempo
tags
world compatibility
createdAt
updatedAt

Example:

{
  title: "...",
  artist: "...",
  mood: "romantic",
  energy: "low",
  era: "90s",
  genre: "bollywood",
  language: "hindi"
}

Do not assume that the application owns copyrighted music.

IMPORTANT COPYRIGHT / AUDIO REQUIREMENT:

Do not download, scrape, rip, proxy, or illegally redistribute copyrighted songs.

The initial application should support:

- legally owned/licensed audio
- creator-provided audio
- royalty-free audio
- permitted external playback/embed sources where technically and legally appropriate

Build the music layer abstractly so the audio source can change later.

Create a MusicSource abstraction rather than hardcoding one provider.

============================================================
12. MUSIC PLAYER
============================================================

Create a persistent global music player.

It must survive navigation between pages.

Features:

- play
- pause
- next
- previous
- seek
- progress
- volume
- mute
- shuffle
- repeat
- queue
- current track
- current world
- favorite
- track metadata
- responsive mobile player
- expanded player view

Desktop:

sticky bottom player.

Mobile:

compact bottom player with expandable sheet.

The player should visually adapt to the current World.

Example:

Bus Wala:
ticket-inspired details.

Truck Driver:
dashboard/highway-inspired styling.

Chai Tapri:
warm paper/wood/tea-inspired styling.

Do NOT make these literal gimmicks that destroy usability.

Maintain consistent interaction patterns.

============================================================
13. JOURNEY SYSTEM
============================================================

Journey Worlds must have a special onboarding ritual.

Examples:

Bus Wala
Truck Driver
Train Radio
Taxi-style future world

When entering a journey world, show an immersive onboarding modal/page.

Do not immediately throw the user into the player.

Ask contextual information.

BUS WALA:

- From
- To
- Passenger name
- optional seat number
- optional journey type

TRUCK DRIVER:

- Driver name
- Starting location
- Destination
- Night drive or day drive
- road mood

TRAIN:

- From
- To
- Train name/number optional
- Coach optional
- Seat optional

The onboarding must feel like an interaction, not a boring form.

============================================================
14. VIRTUAL TICKET
============================================================

After completing a journey onboarding flow, generate a virtual ticket.

Example:

DELHI → MANALI

Passenger:
User Name

Journey:
Bus Wala

Date:
Current date

Ticket/Trip ID:
generated identifier

The ticket should visually resemble an old-school Indian travel ticket.

IMPORTANT:

This is a DIGITAL EXPERIENCE.

It is NOT a real transport ticket.

Make that clear wherever necessary.

Ticket should support:

- view
- save in journey history
- share
- copy/share URL where applicable

Add subtle ticket animation.

Possible interaction:

ticket enters
paper texture
stamp animation
tear effect

Do not overdo the animation.

============================================================
15. CHAI TAPRI RITUAL
============================================================

Chai Tapri should NOT use a travel ticket.

It should have a contextual ritual.

Example:

"चाय कैसी होगी?"

Options:

Cutting
Full Glass
Adrak
Elaichi
Strong

User selects.

Then:

- subtle kettle animation
- cup/pour animation
- steam
- ambient transition

Then the music world opens.

Store the user's ritual selection in the listening session where useful.

============================================================
16. DELUXE SALOON RITUAL
============================================================

Create a contextual saloon interaction.

Example:

"आज क्या सुनेंगे?"

Possible selections:

Classic
90s
Romantic
Sad
Old School

Optional:

"आज का कट"

Classic
Fade
Trim
Old School

The interaction should feel playful.

After completion:

open the Saloon music environment.

============================================================
17. DHABA WORLD
============================================================

Create a dhaba interaction.

Possible:

"Table for?"

1
2
4
Truck Full

Then choose mood:

Highway Hits
Desi Classics
Late Night
Old Radio

Open the world.

============================================================
18. WORLD ATMOSPHERE
============================================================

Worlds can contain atmospheric layers.

Examples:

Bus:

- moving road
- passing lights
- subtle bus vibration
- distant highway atmosphere

Truck:

- headlights
- highway
- dashboard
- distant truck sounds

Chai:

- steam
- kettle
- hanging bulb
- subtle evening ambience

Saloon:

- mirror
- scissors
- barber chair
- old radio

Train:

- window
- passing landscape
- station ambience

Rain:

- window droplets
- rain animation
- blurred lights

These should be implemented efficiently.

Do not use huge video files unnecessarily.

Prefer:

CSS
SVG
small optimized images
Framer Motion
lightweight effects

============================================================
19. BACKGROUND ASSET ARCHITECTURE
============================================================

Backgrounds will be generated separately using an image-generation workflow.

DO NOT generate UI screenshots as backgrounds.

Generated images must only represent the environment.

The UI remains real HTML/CSS/React.

No generated text should be relied upon.

No generated buttons.

No generated player controls.

No generated navigation.

No generated fake interface.

The generated art should function as the world/environment layer.

Examples:

Bus Wala:

bus-day
bus-sunset
bus-night
bus-rain
bus-interior
bus-station

Truck:

truck-day
truck-sunset
truck-night
truck-rain
truck-highway
truck-dhaba

Chai:

tapri-morning
tapri-evening
tapri-night
tapri-rain

etc.

Store asset URLs in Cloudinary.

Do not hardcode Cloudinary URLs throughout components.

============================================================
20. CLOUDINARY
============================================================

Implement Cloudinary integration for persistent media.

Use environment variables.

Create reusable upload utilities.

Assets should support:

- optimized delivery
- responsive transformations
- modern formats where appropriate
- appropriate dimensions
- lazy loading where appropriate

Admin should be able to associate uploaded assets with:

- worlds
- tracks
- artists
- playlists

Never expose private credentials to the browser.

============================================================
21. DATABASE
============================================================

Use PostgreSQL on Neon.

Use Drizzle ORM.

Create proper migrations.

At minimum model:

users
sessions
accounts

worlds
world_assets
world_themes
world_interactions

artists
albums
tracks
playlists
playlist_tracks

user_favorites
user_playlists
user_playlist_tracks

listening_sessions
listening_history

journeys
journey_events
journey_tickets

world_reactions

admin/audit information if needed

Do not over-normalize unnecessarily.

Use foreign keys and indexes.

============================================================
22. DATABASE INDEXING
============================================================

Think about query patterns.

Add indexes for:

world slug
world category
world status

track title
artist
genre
mood
era

playlist ownership

user favorites

listening history by user and createdAt

journeys by user and createdAt

tickets by user

world reactions by world and createdAt

Do not blindly index every column.

============================================================
23. AUTHENTICATION
============================================================

Use Better Auth.

Support:

- registration
- login
- logout
- session persistence
- protected profile
- protected library
- protected playlists
- protected journey history

Admin roles must be protected server-side.

Never trust client-side role checks.

============================================================
24. DISCOVERY
============================================================

Create a discovery experience.

Users can browse:

Worlds
Moods
Genres
Eras
Languages
Journeys

Search should support:

worlds
tracks
artists
playlists

Search should be server-backed where appropriate.

Avoid implementing a huge search infrastructure.

PostgreSQL search is sufficient for MVP.

============================================================
25. PERSONALIZATION
============================================================

Implement lightweight personalization.

Track:

- recently played
- favorite tracks
- favorite worlds
- listening history
- completed journeys
- ritual preferences where useful

Use this to create:

Recently Played
Made For You
Your Journeys
Your Favorite Worlds

Do not build an AI recommendation system initially.

Create the data foundation for one later.

============================================================
26. LIVE LISTENING ACTIVITY
============================================================

Create a lightweight live activity system.

Examples:

"1,284 people are listening"

"842 people are riding Bus Wala"

"37 people honked in the last minute"

Do NOT build complex realtime infrastructure initially.

Use lightweight mechanisms such as:

- short polling
- server-side aggregation
- periodic heartbeat
- simple session records

If realtime is implemented, keep it simple.

Do not introduce Redis just for this.

Listener counts should be approximate.

Never expose precise private user location.

============================================================
27. CITY PRESENCE
============================================================

Optionally allow a user to select their city.

Example:

Delhi
Mumbai
Jaipur
Lucknow

Use city-level presence only.

Do NOT collect or expose exact location unnecessarily.

Users should be able to skip this.

============================================================
28. INTERACTION SYSTEM
============================================================

Worlds can have contextual interactions.

Examples:

Bus:
Horn

Truck:
Air Horn

Train:
Train Horn

Chai:
Pour Chai

Saloon:
Scissors

Dhaba:
Bell

Rain:
Window Touch

Each interaction should produce a small visual/audio response.

Create a reusable interaction system.

Example conceptual configuration:

interaction:
{
  id: "horn",
  label: "Honk",
  icon: "...",
  cooldown: 2000,
  animation: "...",
  sound: "..."
}

Do not hardcode interaction behavior separately for every world.

============================================================
29. SOCIAL SIGNALS
============================================================

Users can react to worlds.

Examples:

❤️
🔥
☕
🚛
🚌
🌧️

Keep this lightweight.

Allow:

- react
- remove reaction
- aggregate counts

Do not build a full social network.

============================================================
30. SHARING
============================================================

Sharing is an important growth feature.

Allow users to share:

- world
- journey ticket
- completed journey
- current listening experience

Create shareable pages/cards.

Example:

"Delhi → Manali
43 songs
2h 17m
Bus Wala"

Use Open Graph metadata.

Generate dynamic social metadata where practical.

============================================================
31. JOURNEY PROGRESSION
============================================================

A journey can visually evolve over time.

Example:

Delhi
↓
Highway
↓
Chai Stop
↓
Mountains
↓
Manali

This does NOT have to represent real GPS movement.

It is a fictional listening journey experience.

Listening duration can influence progression.

For example:

0–15 min:
Departure

15–40 min:
Highway

40–70 min:
Chai Stop

70+ min:
Mountains

Make the progression configurable.

============================================================
32. TIME-OF-DAY ENGINE
============================================================

World visuals should support:

morning
afternoon
evening
night

Determine local time in the browser where appropriate.

Allow world configuration to influence available backgrounds.

Do not make server rendering dependent on unstable client time.

Handle hydration correctly.

============================================================
33. RESPONSIVE DESIGN
============================================================

This is NOT desktop-only.

Support:

desktop
laptop
tablet
mobile

Mobile is extremely important.

On mobile:

- immersive world
- bottom player
- compact navigation
- swipe-friendly cards
- readable overlays
- ticket optimized for portrait
- touch-friendly interactions

Never simply shrink the desktop UI.

Create proper mobile compositions.

============================================================
34. VISUAL LANGUAGE
============================================================

The visual direction should be:

Indian
nostalgic
cinematic
warm
hand-crafted
slightly imperfect
playful
premium
modern underneath

Think:

old Indian travel tickets
painted truck typography
bus stands
chai glasses
90s salons
railway windows
highway lights
old radios
film grain
paper textures
faded signage
warm sunsets
monsoon evenings

But the interface itself must remain modern and usable.

Use:

- layered cards
- soft shadows
- subtle textures
- rounded corners where appropriate
- controlled borders
- expressive typography
- large visual compositions
- motion
- depth

Avoid:

- generic SaaS dashboard appearance
- excessive glassmorphism
- random gradients
- neon cyberpunk
- overly futuristic UI
- excessive rounded pills everywhere
- generic stock imagery

============================================================
35. TYPOGRAPHY
============================================================

Use typography intentionally.

Support Hindi/Devanagari correctly.

Use a production-safe web font strategy.

If using external fonts, select fonts that support required scripts.

Do not rely on system fonts alone for the brand identity.

Typography should differentiate:

- world titles
- contextual Hindi copy
- metadata
- player
- ticket typography
- navigation

Do not put important UI text inside generated images.

============================================================
36. PERFORMANCE
============================================================

Performance is a requirement.

Use:

- Next.js image optimization
- lazy loading
- Cloudinary transformations
- dynamic imports for heavy visual components
- server components where appropriate
- minimal client components
- optimized animations
- avoid large background assets
- avoid unnecessary rerenders

Do not make the entire application a client-side React application.

============================================================
37. ACCESSIBILITY
============================================================

Implement:

- keyboard navigation
- semantic HTML
- accessible buttons
- aria labels
- focus states
- sufficient contrast
- reduced-motion support
- accessible form errors
- screen-reader friendly controls

Animations must respect:

prefers-reduced-motion

============================================================
38. ERROR HANDLING
============================================================

Implement production-quality error handling.

Handle:

- failed audio
- missing world
- missing assets
- authentication failure
- database errors
- invalid forms
- Cloudinary failures
- unauthorized admin routes

Create:

loading states
empty states
error states

Do not leave users staring at blank screens.

============================================================
39. SECURITY
============================================================

Implement:

- server-side authorization
- input validation
- secure sessions
- environment secrets
- safe database queries through Drizzle
- upload validation
- reasonable rate limiting where appropriate
- CSRF protection where required by authentication approach
- no sensitive data in client payloads
- no admin authorization based only on UI

Never expose:

database credentials
Cloudinary secret
authentication secrets

============================================================
40. ADMIN DASHBOARD
============================================================

Build a functional admin dashboard.

Admin can:

WORLD MANAGEMENT

- create world
- edit world
- publish/unpublish
- change description
- category
- theme
- backgrounds
- interactions
- onboarding
- ambient settings

TRACK MANAGEMENT

- create/edit/delete tracks
- artist
- album
- metadata
- audio source
- cover
- mood
- genre
- era
- energy

PLAYLIST MANAGEMENT

- create playlist
- edit
- reorder tracks
- assign to worlds

ASSET MANAGEMENT

- Cloudinary uploads
- world backgrounds
- covers
- atmospheric assets

ANALYTICS

- world plays
- track plays
- active listeners
- popular worlds
- popular tracks
- journey completions

Keep analytics simple.

============================================================
41. ADMIN WORLD EDITOR
============================================================

The admin should be able to configure a world without editing code.

Fields should include:

Name
Slug
Description
Category

Theme:

primary color
secondary color
accent
background mode
font treatment
overlay strength

Backgrounds:

day
evening
night
rain
interior
alternate

Onboarding:

type
fields
title
subtitle

Interactions:

label
icon
animation
sound

Music:

playlist
allowed genres
allowed moods
allowed eras

Atmosphere:

particles
ambient sound
animation intensity

============================================================
42. SEED DATA
============================================================

Create useful seed data.

At least:

8 worlds

Several artists

Several tracks

Several playlists

World-track associations

Example fictional/demo tracks are acceptable.

Clearly label demo content where necessary.

Do not insert copyrighted audio URLs without appropriate rights.

============================================================
43. COMPONENT ARCHITECTURE
============================================================

Build reusable components.

Suggested:

WorldShell
WorldBackground
WorldAtmosphere
WorldHeader
WorldNavigation
WorldHero
WorldCard
WorldGrid
DynamicThemeProvider
ThemeEngine
MusicPlayer
MiniPlayer
ExpandedPlayer
Queue
TrackRow
PlaylistCard
JourneyIntro
JourneyTicket
JourneyProgress
RitualModal
RitualOption
InteractionButton
ListenerCounter
ReactionBar
ShareCard
SearchBar
SearchResults
AuthForm
ProfileView
AdminLayout
AdminTable
AdminWorldEditor
AssetUploader

Do not create giant monolithic components.

============================================================
44. STATE MANAGEMENT
============================================================

Avoid unnecessary global state libraries.

Use:

React state
context where justified
URL state
server state
cookies/session
localStorage only for appropriate non-sensitive preferences

Music player state can use a dedicated provider/context.

Do not store sensitive authentication information in localStorage.

============================================================
45. MUSIC SESSION MODEL
============================================================

When a user starts listening, create a listening session.

Track:

user if authenticated
anonymous session identifier where appropriate
world
track
startedAt
endedAt
duration listened
completed flag

Do not write a database row every second.

Use sensible batching/heartbeat intervals.

============================================================
46. AUDIO ENGINE
============================================================

Create a reusable audio engine.

Requirements:

play/pause
seek
volume
track changes
queue
ended event
error event
progress

The audio engine should not be tightly coupled to one world.

The visual system listens to music state.

Conceptually:

Audio Engine
      ↓
Music State
      ↓
Theme Engine
      ↓
World UI

============================================================
47. THEME ENGINE DATA MODEL
============================================================

Create a flexible theme model.

Example conceptual structure:

theme:

{
  base: {
    background,
    foreground,
    accent,
    card
  },

  atmosphere: {
    grain,
    particles,
    fog,
    rain,
    lighting
  },

  motion: {
    intensity,
    transitionDuration
  },

  typography: {
    headingStyle,
    bodyStyle
  }
}

Track visual modifiers can then be applied.

Example:

trackModifier:

{
  mood: "sad",
  overlay: "...",
  saturation: 0.8,
  motionIntensity: 0.4
}

Do not literally copy this structure if a better schema is appropriate.

============================================================
48. VISUAL TRANSITION ENGINE
============================================================

When track/theme changes:

1. detect metadata
2. calculate target visual state
3. interpolate visual properties
4. update CSS variables
5. transition background
6. transition atmosphere
7. transition player styling

Do not remount the entire world unnecessarily.

============================================================
49. BACKGROUND IMPLEMENTATION
============================================================

Use CSS layers.

Conceptually:

WorldShell
 ├── Background image
 ├── Gradient/lighting overlay
 ├── Atmospheric layer
 ├── Grain layer
 ├── World content
 └── UI

The background must never interfere with content readability.

Use responsive background positioning.

Do not simply use:

background-size: cover

for everything without considering composition.

Provide mobile-specific positioning where necessary.

============================================================
50. GENERATED ARTWORK RULES
============================================================

Artwork will be generated separately.

Prepare the codebase for these assets.

Recommended asset categories:

world-cover
world-hero
world-background
world-background-night
world-background-rain
world-interior
world-prop
track-cover
ticket-texture
share-background

Use consistent naming and metadata.

No text embedded in artwork unless intentionally decorative and verified.

============================================================
51. LANDING EXPERIENCE
============================================================

The first 10 seconds matter.

The user should immediately understand:

This is music.

This is India.

This is immersive.

This is different.

The hero should feel alive.

Possible interaction:

"कहाँ चलें?"

Then worlds appear.

The player should not dominate the first screen.

The world discovery experience should be visual.

============================================================
52. NAVIGATION
============================================================

Desktop navigation can contain:

Home
Discover
Journeys
Library
Search

Mobile:

bottom navigation or compact navigation.

The active world should have a visually distinctive state.

Do not create a massive sidebar that makes the experience feel like an admin dashboard.

============================================================
53. LIBRARY
============================================================

Authenticated users can see:

Recently Played
Favorites
Saved Worlds
Playlists
Completed Journeys
Tickets

Make this useful but visually consistent with the main product.

============================================================
54. PLAYLISTS
============================================================

Users can:

create playlist
rename playlist
delete playlist
add track
remove track
reorder tracks
play playlist

Admin can create curated playlists.

Worlds can have curated playlists.

============================================================
55. FAVORITES
============================================================

Users can favorite:

tracks
worlds
playlists

Provide optimistic UI where safe.

Persist server-side.

============================================================
56. EMPTY STATES
============================================================

Avoid generic:

"No data found."

Instead contextualize.

Example:

"No journeys yet.
Your first ticket is waiting."

"No favorites yet.
Find a song worth keeping."

"No recent plays.
Pick a world and start wandering."

============================================================
57. LOADING STATES
============================================================

Use skeletons where appropriate.

World transitions can use intentional loading animation.

Do not display spinners everywhere.

============================================================
58. URL DESIGN
============================================================

Use clean URLs.

Examples:

/
 /discover
 /world/bus-wala
 /world/truck-driver
 /world/chai-tapri
 /world/deluxe-saloon
 /world/train-radio
 /world/dhaba-radio
 /world/baarish-wali-khidki
 /journeys
 /library
 /search
 /profile

Admin:

/admin
/admin/worlds
/admin/tracks
/admin/playlists
/admin/assets
/admin/analytics

============================================================
59. SEO
============================================================

Implement:

metadata
Open Graph
Twitter/X cards where applicable
semantic HTML
sitemap
robots.txt
canonical URLs where needed

World pages should have unique metadata.

Example:

Bus Wala:
"Bus Wala — music for long roads and window seats."

Do not expose private user data in metadata.

============================================================
60. ANALYTICS
============================================================

Build first-party product analytics using database events.

Track:

world opened
world started
track started
track completed
track skipped
favorite added
playlist created
journey started
journey completed
ticket generated
interaction triggered
share initiated

Avoid excessive writes.

Create useful admin aggregations.

============================================================
61. MOBILE EXPERIENCE
============================================================

Mobile must feel like an immersive music app.

Prioritize:

background
player
world title
current track
primary action

Hide complexity behind expandable UI.

Ticket must remain readable.

Forms must be thumb-friendly.

============================================================
62. DESKTOP EXPERIENCE
============================================================

Desktop can take advantage of:

large illustrated environments
floating player
large cards
side panels
world navigation
visual transitions

Maintain hierarchy.

Do not turn the homepage into a wall of cards.

============================================================
63. MOTION
============================================================

Motion should communicate:

place
time
music
transition

Examples:

background parallax
floating dust
rain
moving highway
soft light
ticket entry
paper tear
steam
equalizer
album rotation
world transition

Avoid animation overload.

Use reduced-motion support.

============================================================
64. SOUND EFFECTS
============================================================

Contextual sound effects may exist.

Examples:

horn
ticket tear
chai pour
scissors
train horn
dhaba bell

These are secondary to music.

Never unexpectedly blast audio.

Respect user audio preferences.

Provide mute controls.

============================================================
65. PRIVACY
============================================================

Collect only necessary information.

Do not require location.

If city is collected:

- make it optional
- clearly explain why
- only store city-level data

Do not expose private listening history publicly.

============================================================
66. ACCESS CONTROL
============================================================

Roles:

user
admin

Admin routes and mutations must be checked server-side.

A user must never be able to:

modify another user's playlist
modify another user's journey
access admin APIs
upload unrestricted files through protected admin endpoints

============================================================
67. FILE UPLOAD SECURITY
============================================================

For Cloudinary uploads:

validate:

file type
size
resource type

Do not allow arbitrary executable uploads.

Use appropriate Cloudinary folders.

Example:

desi-radio/worlds/
desi-radio/tracks/
desi-radio/users/
desi-radio/share/

============================================================
68. ENVIRONMENT VARIABLES
============================================================

Create .env.example with all required variables.

Expected categories:

DATABASE_URL
BETTER_AUTH_SECRET
BETTER_AUTH_URL

CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET

Any other variable genuinely required.

Do not invent unnecessary environment variables.

============================================================
69. DATABASE MIGRATION
============================================================

Use Drizzle migrations.

Provide scripts such as:

db:generate
db:migrate
db:push
db:seed

Use the safest appropriate production workflow.

============================================================
70. CODE QUALITY
============================================================

Use:

TypeScript strict mode.

Avoid:

any

unless genuinely unavoidable.

Use clear types.

Keep server/client boundaries correct.

Avoid duplicate business logic.

Create utility functions for repeated behavior.

============================================================
71. VALIDATION
============================================================

Use a lightweight validation library if necessary.

Zod is acceptable.

Validate:

forms
server actions
API input
admin mutations
uploads
query parameters

Never trust client input.

============================================================
72. ERROR UX
============================================================

Create proper:

not-found page
error boundary
loading states
auth errors
database failure states
audio failure states

The product should feel intentionally designed even when something fails.

============================================================
73. INITIAL IMPLEMENTATION ORDER
============================================================

Do NOT attempt to build everything randomly.

Build in this order:

PHASE 1

Project foundation.

- Next.js
- TypeScript
- Tailwind
- Drizzle
- Neon
- Better Auth
- base environment
- project structure

PHASE 2

Database.

- schema
- migrations
- seed
- indexes

PHASE 3

Authentication.

- register
- login
- logout
- session
- protected routes
- roles

PHASE 4

Core design system.

- typography
- colors
- spacing
- cards
- buttons
- navigation
- modal
- player shell

PHASE 5

World engine.

- WorldShell
- ThemeEngine
- background system
- atmosphere
- dynamic theme

PHASE 6

Music engine.

- audio player
- queue
- track state
- persistent player
- history

PHASE 7

Worlds.

Build all initial worlds using reusable architecture.

PHASE 8

Journey system.

- onboarding
- ticket
- journey history
- progression

PHASE 9

Interactions.

- horn
- chai
- scissors
- train
- dhaba etc.

PHASE 10

Library.

- favorites
- playlists
- history

PHASE 11

Admin.

- worlds
- tracks
- playlists
- assets
- analytics

PHASE 12

SEO/share.

PHASE 13

Performance/accessibility/security.

PHASE 14

Deployment verification.

============================================================
74. IMPORTANT: DO NOT FAKE FUNCTIONALITY
============================================================

Do not create buttons that do nothing.

Do not create fake login forms.

Do not create fake admin panels.

Do not create fake analytics numbers presented as real.

Do not create fake audio playback and pretend it works.

If an external dependency is not configured, implement a clear fallback/demo state.

============================================================
75. DEMO MODE
============================================================

The project should be runnable locally even before external music credentials/content are configured.

Seed demo metadata.

Use safe demo/royalty-free audio sources if included and legally appropriate.

If no audio source is configured:

display the track properly but communicate that demo audio needs configuration.

Do not break the rest of the application.

============================================================
76. PRODUCT FEEL
============================================================

The application should feel:

"Wait... what is this?"

Then:

"Oh, it's a music app."

Then:

"Wait, I'm inside a bus journey."

Then:

"This is actually sick."

The first-time experience is extremely important.

Do not explain the concept with a giant documentation wall.

Let the interface demonstrate it.

============================================================
77. ANTI-GENERIC DESIGN RULE
============================================================

Before accepting a UI implementation, ask:

Could this be mistaken for a generic Spotify clone?

If YES:
rework the visual experience.

Could this be mistaken for a generic SaaS dashboard?

If YES:
rework it.

Does the world feel like a place?

If NO:
improve the environmental composition.

Does the music feel connected to the environment?

If NO:
improve the theme engine.

============================================================
78. WORLD CONFIGURATION EXAMPLE
============================================================

The architecture should allow something conceptually similar to:

World:

BUS WALA

category:
journey

onboarding:
ticket

theme:
nostalgic-road

backgrounds:
day
sunset
night
rain
interior

interaction:
horn

playlist:
bus-wala-classics

musicRules:
90s
bollywood
road-trip
nostalgic

journey:
enabled

This is an architectural example.

Design the actual database/types in the best way.

============================================================
79. FUTURE EXTENSIBILITY
============================================================

Do not implement these unless needed for MVP, but keep architecture extensible for:

AI DJ
AI-generated radio hosts
voice narration
collaborative listening
friend presence
real-time rooms
artist pages
creator worlds
community-created worlds
subscription plans
offline playback
PWA
mobile apps
Spotify/Apple Music integrations
advanced recommendation engine
regional Indian radio
language-specific worlds

Do not over-engineer these now.

============================================================
80. TESTING
============================================================

Implement meaningful tests where appropriate.

At minimum test:

authentication authorization
world retrieval
world slug
playlist ownership
favorite operations
journey creation
ticket generation
admin authorization
theme calculation
basic audio state behavior

Do not write meaningless tests just to increase coverage.

============================================================
81. LINT / TYPECHECK / BUILD
============================================================

Before declaring completion:

run:

lint
typecheck
tests
production build

Fix all meaningful errors.

Do not leave:

TypeScript errors
broken imports
unused critical code
broken routes
missing environment handling
obvious console errors

============================================================
82. RESPONSIBLE USE OF GENERATED ASSETS
============================================================

The project architecture must NOT depend on generated image text.

All important textual information must be rendered by the application.

Backgrounds should be treated as visual environments.

This is essential for:

SEO
accessibility
responsiveness
localization
visual consistency

============================================================
83. FINAL DELIVERABLE
============================================================

At completion, provide:

1. working application
2. database schema
3. migrations
4. seed data
5. authentication
6. dynamic worlds
7. music player
8. journey system
9. virtual tickets
10. contextual rituals
11. theme engine
12. responsive UI
13. admin dashboard
14. Cloudinary integration
15. documentation
16. deployment configuration

============================================================
84. IMPORTANT DEVELOPMENT BEHAVIOR
============================================================

Do not stop after creating a plan.

Do not merely output architecture diagrams.

Do not ask me to manually implement obvious pieces.

Inspect the repository first.

If the repository is empty, initialize the project.

If an existing implementation exists, preserve useful work and refactor where necessary.

Make reasonable engineering decisions yourself.

If there are multiple valid approaches, choose the simplest production-ready approach.

Prioritize a complete working vertical slice over creating dozens of unfinished pages.

============================================================
85. FIRST VERTICAL SLICE
============================================================

Before expanding everything, make this flow fully functional:

LANDING
 ↓
BUS WALA
 ↓
JOURNEY ONBOARDING
 ↓
FROM / TO
 ↓
GENERATE DIGITAL TICKET
 ↓
ENTER WORLD
 ↓
PLAY MUSIC
 ↓
DYNAMIC BACKGROUND
 ↓
TRACK CHANGES
 ↓
THEME CHANGES
 ↓
HORN INTERACTION
 ↓
LISTENING SESSION
 ↓
JOURNEY PROGRESS
 ↓
COMPLETE JOURNEY
 ↓
SHAREABLE TICKET

Once this vertical slice is solid, generalize the architecture to the other worlds.

============================================================
86. DO NOT WAIT FOR PERFECT ASSETS
============================================================

Initially use clearly marked local placeholder assets.

For example:

/public/placeholders/

But design the components so replacing placeholders with Cloudinary assets requires no component rewrite.

The final generated artwork will be added later.

============================================================
87. ASSET CONTRACT
============================================================

Create an asset contract/document describing exactly what artwork is needed.

For every world specify:

- asset name
- purpose
- recommended dimensions
- aspect ratio
- composition requirements
- UI-safe area
- lighting
- visual style
- mobile considerations

Do NOT generate these images yourself during the coding phase.

Prepare the application for them.

============================================================
88. DESIGN CONSISTENCY
============================================================

All worlds must feel like they belong to the same universe.

Each world should be unique but share:

- visual quality
- illustration philosophy
- typography principles
- UI system
- motion language
- player architecture

Avoid making each world look like a completely different website.

============================================================
89. FINAL CHECKLIST
============================================================

Before saying the project is complete, verify:

[ ] App starts locally
[ ] Database connects
[ ] migrations work
[ ] seed works
[ ] auth works
[ ] world pages work
[ ] mobile works
[ ] music player works with configured/demo audio
[ ] player persists across navigation
[ ] theme engine works
[ ] background transitions work
[ ] journey onboarding works
[ ] ticket generation works
[ ] ticket history works
[ ] interactions work
[ ] favorites work
[ ] playlists work
[ ] listening history works
[ ] admin authorization works
[ ] admin world management works
[ ] Cloudinary integration works
[ ] SEO metadata exists
[ ] sitemap exists
[ ] robots exists
[ ] Open Graph metadata exists
[ ] loading states exist
[ ] error states exist
[ ] accessibility basics implemented
[ ] reduced motion implemented
[ ] no secrets committed
[ ] .env.example exists
[ ] README.md exists
[ ] SETUP.md exists
[ ] DEPLOY.md exists
[ ] USER_GUIDE.md exists
[ ] production build succeeds

============================================================
90. MOST IMPORTANT PRINCIPLE
============================================================

Do not build:

"another music streaming website."

Build:

"an interactive Indian music universe."

The music is the engine.

The World is the experience.

The Theme Engine connects them.

The Journey/Ritual system makes the experience memorable.

The shareable ticket creates a viral loop.

The database makes the experience persistent.

The admin system makes the platform extensible.

The architecture must allow us to keep adding new worlds without rebuilding the application.

BUILD THE PRODUCT.