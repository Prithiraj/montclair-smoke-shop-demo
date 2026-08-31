# MONTCLAIR // SIGNAL

## Web Experience Master Plan

**Project:** Montclair Smoke Shop interactive concept website  
**Working concept name:** `MONTCLAIR // SIGNAL 127`  
**Document purpose:** Single source of truth for design, content, interaction, engineering, deployment, and review  
**Current stage:** First interactive implementation complete; owner/content validation pending  
**Repository status:** Implementation authorized and prepared for GitHub/Netlify deployment  
**Primary deployment target:** Netlify preview connected to GitHub  

---

## Implementation Status — August 31, 2026

The first implementation now includes the planned React/Vite foundation, adaptive Three.js Signal Core, 21+ portal, orbital category interface, mock catalog, local Visit List, live store status, responsive visit console, reduced-motion support, WebGL fallback, automated tests, GitHub Actions validation, and Netlify configuration.

The following remain intentionally provisional: official logo, owner identity, business email, social profiles, catalog accuracy, product photography, current hours, holiday hours, and production legal copy. The public demo remains `noindex` and labels itself as an independent concept.

---

## 1. Executive Summary

MONTCLAIR // SIGNAL is a frontend-only interactive concept for Montclair Smoke Shop. The experience should feel like a premium technology showroom after dark: cinematic, futuristic, deliberate, and useful.

The project will combine a majestic Three.js environment with accessible React interfaces. Three.js will provide atmosphere, depth, spatial transitions, and the signature brand artifact. React and semantic HTML will handle navigation, store information, product discovery, search, filtering, and the Visit List.

The design principle is:

> **80% clarity and utility. 20% cinematic spectacle.**

The site is not intended to process real orders during the demo phase. Its purpose is to help the shop owner experience a compelling future-facing storefront, understand how customers could explore the business before visiting, and provide feedback before any production build begins.

---

## 2. Project Goals

The concept should:

1. Make a memorable first impression within the first five seconds.
2. Establish the shop as modern, premium, local, and adult-oriented.
3. Let visitors quickly understand what the store carries.
4. Make calling, finding directions, and checking store hours effortless.
5. Demonstrate interactive product discovery without requiring a backend.
6. Provide a credible mobile experience rather than a reduced desktop layout.
7. Use animation as a storytelling tool, not as visual noise.
8. Remain usable when WebGL, advanced motion, or high-performance graphics are unavailable.
9. Give the owner two visual atmospheres to compare during the presentation.
10. Be deployable as a static React application through GitHub and Netlify.

---

## 3. Non-Goals for the First Demo

The initial concept will not include:

- Real checkout or payment processing
- Real-time inventory
- Customer accounts
- Delivery or shipping
- Loyalty points with monetary value
- Identity-document collection
- Birth-date collection
- Production analytics or advertising pixels
- Live product submissions
- A content-management system
- A database
- A Flask, Node, or server-side application
- Health, safety, or performance claims about products

The demo may simulate interactions such as adding products to a Visit List, but it must never imply that a transaction has occurred.

---

## 4. Audience

### Primary audience

Adults who want to:

- Understand the store’s product categories
- Browse before visiting
- Confirm the shop’s location and hours
- Call to verify availability
- Build a short list to show at the counter

### Secondary audience

The shop owner and staff, who need to evaluate:

- Brand direction
- Practical usefulness
- Ease of updating content
- Mobile presentation
- Potential conversion value
- Whether the aesthetic fits the physical store

---

## 5. Brand Positioning

### Working identity

```text
MONTCLAIR
SMOKE SHOP
// SIGNAL 127
```

“Signal 127” is a concept-layer reference to the Valley Road address. It is not a proposed legal business-name change.

### Brand attributes

- Precise
- Atmospheric
- Premium
- Local
- Confident
- Adult
- Technologically advanced
- Helpful rather than intimidating

### Brand attributes to avoid

- Cartoonish
- Youth-oriented
- Gimmicky
- Aggressive
- Chaotic
- Cheap neon
- Gaming-dashboard aesthetics
- Crypto-site aesthetics
- Nightclub-flyer aesthetics
- Stereotypical smoke-shop visual clichés

### Writing style

Copy should be brief, confident, factual, and easy to scan. Avoid slang, exaggerated promises, unsupported superlatives, and fabricated testimonials.

Suggested hero direction:

```text
MONTCLAIR / RECODED

A local smoke and lifestyle shop,
reimagined as a digital showroom.

[ Explore the store ]  [ Plan your visit ]
```

Alternative headline:

```text
YOUR LOCAL SHOP.
A NEW FREQUENCY.
```

---

## 6. Visual Design System

### 6.1 Core color palette

| Token | Hex | Role |
|---|---:|---|
| Obsidian | `#050609` | Primary background |
| Graphite | `#0C1118` | Surfaces and navigation |
| Arc Cyan | `#63F5F2` | Primary interactive accent |
| Ultraviolet | `#9B6CFF` | Secondary energy and depth |
| Plasma Rose | `#FF5FD2` | Rare emphasis only |
| Ember | `#FFB66E` | Location and warm conversion actions |
| Ice White | `#F3F7FA` | Primary text |
| Signal Gray | `#9199A6` | Secondary text |
| Deep Void | `#010204` | Three.js scene depth |

Neon colors should be concentrated around borders, active states, glows, shaders, and scene lighting. Body text should remain high-contrast white or gray.

### 6.2 Theme variants

The private demo will include a Design Lab toggle with two atmospheres:

#### Obsidian

- Cyan and ultraviolet light
- Dark chrome and black glass
- Cooler, more technological mood

#### Chrome Ember

- Neutral metal and warm amber light
- Slightly more welcoming and retail-oriented
- Lower ultraviolet intensity

The themes should share structure and components. Only tokens, lighting, environment maps, and limited material properties should change.

### 6.3 Typography

Recommended font roles:

- **Display:** Space Grotesk or Sora
- **Body and controls:** Inter
- **Technical labels:** IBM Plex Mono

Typography rules:

- Large headings may use uppercase with deliberate tracking.
- Body content must remain conventional and highly readable.
- Technical labels should be used sparingly for status, coordinates, category codes, and interface metadata.
- Avoid excessive all-caps paragraphs.
- Minimum body size should remain comfortable on mobile.

### 6.4 Surfaces and materials

The visual language should use:

- Smoked glass
- Dark chrome
- Brushed metal
- Fine luminous borders
- Soft volumetric haze
- Controlled bloom
- Subtle grain
- Light refraction
- Generous negative space
- Geometric image framing

Avoid:

- Dense smoke-cloud backgrounds
- Leaf-pattern wallpaper
- Constant flashing
- Rainbow gradients everywhere
- Excessive glassmorphism on every surface
- Low-contrast text over animation

---

## 7. Information Architecture

The first demo should use three primary routes:

```text
/
├── Immersive homepage
├── /explore
│   └── Browse-only product experience
└── /visit
    └── Hours, phone, directions, and store information
```

Product details should open in a modal, drawer, or route-aware overlay so users can return to their previous browse position.

### Persistent navigation

Desktop:

```text
MONTCLAIR // SIGNAL    HOME    EXPLORE    VISIT    DESIGN LAB
```

Mobile fixed dock:

```text
HOME    EXPLORE    DIRECTIONS    CALL
```

The mobile dock must respect safe-area insets and remain accessible above browser chrome.

---

## 8. End-to-End User Journey

### 8.1 First visit

1. User lands on the 21+ access portal.
2. User acknowledges adult access.
3. A short, skippable signal-boot animation plays.
4. The Signal Core assembles.
5. The hero copy and navigation HUD appear.
6. User can immediately choose Explore, Directions, or Call.

### 8.2 Product discovery

1. User enters the Category Orbit or selects Explore.
2. User filters by category or uses command search.
3. Product cards appear as spatial objects before resolving into accessible HTML cards.
4. User opens a product detail drawer.
5. User adds an item to the Visit List.
6. User can call to confirm availability.

### 8.3 Visit conversion

1. User reaches the Visit Portal.
2. The scene transforms into a location beacon.
3. A route grid leads to the store address.
4. User sees today’s hours, phone, and directions.
5. User selects Call or Get Directions.

### 8.4 Returning visit

1. The age acknowledgment may be remembered for the browser session.
2. The long boot sequence is skipped.
3. The site resumes in a calm idle state.
4. The user’s local Visit List remains available unless cleared.

---

## 9. Signature Three.js Experience

### 9.1 The Signal Core

The Signal Core is the central visual artifact and the primary brand asset.

It should be:

- Abstract rather than a literal product
- Built from dark chrome, smoked glass, and emissive internal layers
- Surrounded by slow orbital rings
- Illuminated with cyan, ultraviolet, and ember energy
- Reactive to pointer movement with restrained parallax
- Capable of transforming into a location beacon near the end of the page

The object should feel like a museum installation or luxury technology reveal.

### 9.2 Hero scene composition

The scene may contain:

- Signal Core
- Orbital rings
- Sparse particle field
- Reflective or semi-reflective floor plane
- Atmospheric depth fog
- Controlled caustic patterns
- Animated energy paths
- Soft shadowing
- Environment reflections

The hero text and primary actions must remain semantic HTML layered above the canvas.

### 9.3 Scroll-directed choreography

The page should feel like one continuous environment:

```text
ACCESS PORTAL
    ↓
SIGNAL CORE ASSEMBLY
    ↓
HERO REVEAL
    ↓
CAMERA PASSES THROUGH THE CORE
    ↓
CATEGORY ORBITS MATERIALIZE
    ↓
DIGITAL PRODUCT SHELF APPEARS
    ↓
COMMUNITY SIGNAL
    ↓
CORE TRANSFORMS INTO LOCATION BEACON
    ↓
ROUTE TO 127 VALLEY ROAD
```

The user must remain in control. Scroll should never be trapped, and each major section must also be reachable through ordinary navigation.

### 9.4 Category Orbit

Working category placeholders:

- Glass
- Rolling
- Cigars
- Hookah
- Accessories
- Vapor

Each category should orbit the Signal Core as a spatial node.

Hover or focus behavior:

- Slow the orbit
- Bring the selected category forward
- Increase edge illumination
- Reveal the category description
- Maintain a visible HTML control for keyboard users

Selection behavior:

- Start a short camera move
- Fade or transform into the Explore interface
- Preserve route and browser history

Categories must be confirmed against the store’s actual and lawful inventory before public release.

### 9.5 Holographic product presentation

Product cards may begin as translucent spatial slabs, then align into a readable HTML grid.

Visual effects can include:

- Pointer-following specular highlight
- Thin holographic edge
- Refraction shimmer
- Shared-element expansion into a detail drawer
- Subtle depth shift

The card must never rely on hover alone. All interactions require visible controls and keyboard support.

### 9.6 Navigate to Montclair sequence

Near the bottom of the homepage:

1. The showroom recedes.
2. The Signal Core contracts into a location beacon.
3. A stylized route grid forms.
4. A light trail moves toward the shop location.
5. Store information emerges from the scene.
6. Conversion actions become dominant.

Final call-to-action set:

```text
GET DIRECTIONS
CALL THE STORE
VIEW TODAY'S HOURS
```

---

## 10. Motion and Animation System

### 10.1 Motion character

Motion should feel:

- Slow
- Heavy
- Deliberate
- Cinematic
- Smooth
- Physically plausible

Avoid:

- Bouncy micro-interactions
- Endless fast rotation
- Random particle explosions
- Excessive cursor trails
- Forced scroll-jacking
- Animation on every line of text

### 10.2 Motion layers

#### Layer 1: Ambient

- Slow orbital rotation
- Mild particles
- Energy pulse
- Gentle light movement

#### Layer 2: Responsive

- Pointer parallax
- Magnetic button response
- Product highlight tracking
- Category focus reaction

#### Layer 3: Narrative

- Boot sequence
- Camera movement between major sections
- Category transition
- Product detail reveal
- Location-beacon transformation

#### Layer 4: Utility

- Navigation state
- Filter change
- Search results
- Visit List feedback
- Open/closed status change

### 10.3 Recommended animation tooling

- GSAP for coordinated timelines and scroll choreography
- Framer Motion for React UI transitions and shared layout effects
- React Three Fiber for Three.js scene composition
- Drei helpers for cameras, environments, controls, and loaders
- Postprocessing library for carefully controlled bloom and depth effects
- Native CSS transitions for simple, low-cost state changes

A smooth-scroll library may be evaluated, but it should be excluded if it harms keyboard navigation, browser behavior, or reduced-motion support.

### 10.4 Optional audio

Audio is not required for the first demo. If added later:

- Default must be muted.
- Audio can only begin after explicit user interaction.
- A persistent mute control must be visible.
- Sounds should be subtle interface tones, not continuous music.

---

## 11. Homepage Structure

### 11.1 Adult access portal

Working copy:

```text
ADULT ACCESS PROTOCOL

This concept experience is intended for adults 21 and older.

[ I AM 21+ — ENTER ]
[ EXIT ]
```

Behavior:

- Full viewport
- Dark background
- Thin scanning ring
- Immediate keyboard focus on primary action
- Escape or exit action must work
- Session-only acknowledgment is sufficient for the demo
- Must not claim to perform real identity verification

### 11.2 Cinematic hero

Content:

- Brand lockup
- Headline
- Supporting sentence
- Explore CTA
- Plan Your Visit CTA
- Skip Intro control
- Reduce Motion control

The Signal Core occupies the visual field without blocking copy.

### 11.3 Store Signal bar

Desktop example:

```text
STORE SIGNAL    OPEN NOW / CLOSED
127 VALLEY ROAD    CALL    DIRECTIONS
```

Requirements:

- Open/closed state calculated from data
- Address, phone, and hours stored centrally
- Store details marked provisional until owner-confirmed
- Conversion actions always accessible

### 11.4 Category Orbit

- Six or fewer initial categories
- Short descriptions
- Spatial and HTML versions synchronized
- Clear selected state
- Direct route to Explore

### 11.5 Digital Shelf

- Twelve to sixteen clearly labeled demonstration products
- Product image or visual placeholder
- Category
- Short factual description
- Availability language such as “Call to confirm”
- Add to Visit List
- Product-detail action

### 11.6 Community Signal

No fabricated reviews.

Use validated themes such as:

```text
KNOWN FOR
01  Helpful service
02  Broad selection
03  Quick visits
04  Local convenience
```

Real ratings or excerpts should only appear after source verification and owner approval.

### 11.7 Visit Portal

- Stylized local map or route visualization
- Storefront image when available
- Address
- Today’s hours
- Weekly schedule
- Call action
- Directions action
- Parking and accessibility details after confirmation

### 11.8 Footer

Include:

- Demo disclaimer
- 21+ reminder
- Store contact information
- Navigation links
- Reduced motion shortcut
- Concept credit or project status

---

## 12. Explore Experience

### 12.1 Command search

Working label:

```text
SEARCH THE COLLECTION    Press /
```

Requirements:

- Instant local filtering
- Keyboard shortcut `/`
- Escape closes search state
- Search input remains a normal accessible form control
- Results update without page reload

### 12.2 Category channels

```text
ALL / GLASS / ROLLING / CIGARS / HOOKAH / ACCESSORIES
```

Behavior:

- Active category clearly highlighted
- Keyboard arrow support optional, Tab support required
- URL query state may reflect the selected filter
- Filters should combine with search

### 12.3 Product card

Each card should contain:

- Product name
- Category
- Image or render
- Short description
- Demo-data badge when relevant
- View details
- Add to Visit List

### 12.4 Product detail drawer

Contents:

- Larger product image
- Product title
- Category
- Short factual description
- Variants or options when mock data supports them
- “Call to confirm availability” language
- Add or remove from Visit List
- Call store action
- Close action

The drawer must trap focus correctly while open and return focus to the originating card when closed.

### 12.5 Visit List

The Visit List replaces a conventional shopping cart.

Functions:

- Add item
- Remove item
- Clear list
- Store locally in the browser
- Open a clean “Show at the counter” view
- Call the store
- Display a clear no-purchase disclaimer

Example:

```text
MY VISIT LIST
4 items selected

[ SHOW AT THE COUNTER ]
[ CALL TO CONFIRM ]
[ CLEAR LIST ]
```

---

## 13. Visit Experience

The Visit route should prioritize practical information over spectacle.

Sections:

1. Current open/closed status
2. Address and directions
3. Phone and click-to-call
4. Weekly hours
5. Storefront image
6. Map or map-link panel
7. Parking and accessibility notes when confirmed
8. Visit List reminder
9. Demo disclaimer

The Three.js environment may remain visible as a restrained location beacon, but the route must remain fast and readable.

---

## 14. Mobile Experience

The mobile version must be intentionally designed.

### 14.1 Mobile adaptations

- Reduced geometry complexity
- Lower particle counts
- Limited postprocessing
- Shorter camera moves
- Category orbit becomes a horizontal carousel or simplified ring
- Visit List becomes a bottom sheet
- Product grid becomes one or two columns depending on width
- Fixed call and directions dock
- Larger tap targets
- No hover-dependent behavior
- Device-motion effects disabled by default

### 14.2 Mobile hero

The mobile hero may use:

- Simplified interactive Signal Core
- Lightweight shader
- Short animated sequence
- Static high-quality fallback on weak devices

The mobile experience should not attempt to reproduce every desktop visual effect.

---

## 15. Accessibility Requirements

The canvas is an enhancement, not the application.

### Required controls

```text
SKIP INTRO
REDUCE MOTION
PAUSE EXPERIENCE
MUTE, only if audio exists
```

### Requirements

- Semantic headings and landmarks
- Keyboard-accessible navigation and controls
- Visible focus indicators
- Sufficient contrast
- Descriptive button labels
- Meaningful alternative text for images
- Canvas marked appropriately when decorative
- Equivalent HTML controls for spatial categories
- Focus management for drawers and modals
- No mandatory hover interaction
- No scroll trapping
- No content hidden exclusively inside WebGL
- Respect `prefers-reduced-motion`
- Respect `prefers-contrast` where practical
- Pause or reduce animation when the page is hidden

### Reduced-motion behavior

When reduced motion is active:

- Skip boot animation
- Replace camera flights with short crossfades
- Stop particles and orbit motion
- Disable parallax
- Disable magnetic-button movement
- Keep all content and functionality available

---

## 16. Performance Strategy

The goal is a majestic experience that degrades gracefully.

### 16.1 Capability tiers

#### Tier A: Full experience

For capable desktop devices:

- Detailed Signal Core
- Refraction
- Bloom
- Particles
- Dynamic lighting
- Environment reflections
- Limited depth-of-field during transitions

#### Tier B: Reduced WebGL

For average laptops and modern phones:

- Simplified geometry
- Reduced pixel ratio
- Fewer particles
- No depth-of-field
- Lower reflection quality
- Baked or simplified lighting

#### Tier C: Static fallback

For weak devices, unsupported WebGL, data-saving mode, or severe performance limits:

- Static or lightly animated hero artwork
- Standard HTML transitions
- Full access to all content and actions

### 16.2 Performance techniques

- Lazy-load the Three.js bundle
- Render useful HTML before the 3D scene is ready
- Code-split routes
- Compress models with Meshopt or Draco when beneficial
- Use KTX2/Basis compressed textures when available
- Limit texture dimensions
- Use instancing for particles and repeated geometry
- Cap device pixel ratio
- Pause rendering when the page is not visible
- Reduce frame rate during idle states if appropriate
- Avoid expensive real-time shadows on mobile
- Dispose of unused textures, materials, and geometries
- Avoid unnecessary React re-renders inside the scene
- Preload only essential assets

### 16.3 Initial working budgets

These are targets, not guarantees:

- Critical HTML/CSS/utility JavaScript should render before the 3D bundle.
- The 3D experience should be lazy-loaded and non-blocking.
- Compressed 3D models should ideally remain below 3 MB total for the first demo.
- Compressed textures should ideally remain below 4 MB total for the first demo.
- Avoid more than one visually dominant canvas.
- Maintain responsive interactions after initial load.
- Target smooth motion at the selected capability tier rather than forcing 60 FPS on every device.

---

## 17. Technical Architecture

### 17.1 Recommended stack

```text
React
Vite
Three.js
@react-three/fiber
@react-three/drei
@react-three/postprocessing
GSAP
Framer Motion
React Router
Zustand
```

Optional additions should be justified before use. The goal is a maintainable demo, not a dependency showcase.

### 17.2 Rendering strategy

- Static client-side React application
- Semantic HTML as the primary content layer
- One persistent Three.js scene where practical
- Route transitions coordinated with scene state
- Local JSON for products, categories, and store information
- Browser storage for age acknowledgment, theme, motion preference, and Visit List
- No backend in the first demo

### 17.3 State model

Suggested global state:

- Age acknowledgment
- Current theme
- Reduced-motion preference
- Scene phase
- Selected category
- Search query
- Active product
- Visit List
- Store status
- Capability tier

Use global state only when multiple routes or systems need the same value. Keep component-local state local.

### 17.4 Proposed project structure

```text
montclair-smoke-shop-demo/
├── public/
│   ├── images/
│   ├── models/
│   ├── textures/
│   ├── icons/
│   └── _redirects
├── src/
│   ├── app/
│   │   ├── router.jsx
│   │   ├── providers.jsx
│   │   └── App.jsx
│   ├── components/
│   │   ├── AgePortal.jsx
│   │   ├── NavigationHUD.jsx
│   │   ├── StoreSignal.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductDrawer.jsx
│   │   ├── VisitList.jsx
│   │   ├── MobileDock.jsx
│   │   └── DemoDisclaimer.jsx
│   ├── experience/
│   │   ├── Scene.jsx
│   │   ├── SignalCore.jsx
│   │   ├── OrbitalCategories.jsx
│   │   ├── ParticleField.jsx
│   │   ├── EnvironmentLighting.jsx
│   │   ├── CameraRig.jsx
│   │   ├── ScrollDirector.jsx
│   │   ├── LocationBeacon.jsx
│   │   └── PerformanceManager.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Explore.jsx
│   │   └── Visit.jsx
│   ├── data/
│   │   ├── products.json
│   │   ├── categories.json
│   │   └── store.json
│   ├── hooks/
│   │   ├── useStoreStatus.js
│   │   ├── useCapabilityTier.js
│   │   └── useReducedMotion.js
│   ├── state/
│   │   └── useAppStore.js
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── global.css
│   │   └── utilities.css
│   └── main.jsx
├── DESIGN_PLAN.md
├── CONTENT_CHECKLIST.md
├── netlify.toml
├── package.json
├── vite.config.js
└── README.md
```

### 17.5 Data model examples

#### `store.json`

```json
{
  "name": "Montclair Smoke Shop",
  "conceptName": "MONTCLAIR // SIGNAL 127",
  "address": "127 Valley Road, Montclair, NJ",
  "phone": "+1-973-862-9684",
  "hours": {},
  "detailsConfirmed": false
}
```

#### `products.json`

```json
[
  {
    "id": "demo-001",
    "name": "Demonstration Product",
    "category": "accessories",
    "description": "Placeholder content for owner review.",
    "image": "/images/products/demo-001.webp",
    "availability": "Call to confirm",
    "isDemoData": true
  }
]
```

---

## 18. Three.js Asset Strategy

### Phase 1: Procedural-first

Build the Signal Core from procedural geometry and materials where possible:

- Torus rings
- Layered spheres or custom geometry
- Shader-driven energy paths
- Instanced particles
- Environment reflections

Advantages:

- Faster iteration
- Smaller files
- Easier theme changes
- Less dependency on external art assets

### Phase 2: Custom model enhancement

If the concept is approved, refine the Signal Core in Blender and export as glTF/GLB.

Requirements:

- Clean topology
- Named materials
- Reasonable polygon count
- Separate emissive components
- Compressed export
- No unnecessary animation tracks
- Optimized textures

### Product images

The demo can begin with abstract premium placeholders or licensed imagery. Real store photography and real product images should replace placeholders before public launch.

---

## 19. Content Plan

### 19.1 Content needed from the owner

- Confirmed business name
- Confirmed address
- Confirmed public phone number
- Confirmed weekly hours
- Storefront and interior photography
- Approved product categories
- Representative inventory list
- Brand names allowed to be shown
- Pricing policy for the website
- Parking information
- Accessibility information
- Social profiles
- Preferred calls to action
- Approved customer-review excerpts, if any
- Logo or permission to create a refined wordmark

### 19.2 Demo placeholders

All unconfirmed content must be labeled internally and, when visible, clearly marked as demonstration data.

Recommended disclaimer:

> **Concept website demo. Product information, pricing, availability, store details, and imagery may be placeholders. This experience is not currently operated by Montclair Smoke Shop and does not process purchases.**

### 19.3 Content principles

- Do not fabricate testimonials.
- Do not invent store claims.
- Do not imply products are in stock without confirmation.
- Do not publish unverified prices.
- Do not make health or medical claims.
- Avoid language designed to appeal to minors.

---

## 20. Compliance and Trust Guardrails

This plan is not legal advice. Before public release, the owner should validate applicable federal, state, and local requirements.

The demo should include:

- 21+ adult-access language
- No functioning checkout
- No collection of identity documents
- No collection of birth dates
- No payment collection
- No youth-oriented characters, rewards, or messaging
- No free-product promotion
- No unverified health claims
- No representation that a browser acknowledgment replaces in-store age verification
- No promotion of categories the owner is not authorized to sell

All product categories, claims, disclaimers, and public-facing legal language must be reviewed before production launch.

---

## 21. SEO and Local Discovery for a Future Production Version

SEO is secondary in the private demo but should influence structure.

Future production requirements may include:

- Descriptive page titles
- Local-business metadata
- Structured store information
- Address and phone consistency
- Crawlable HTML content outside WebGL
- Descriptive category pages
- Image alt text
- Fast mobile rendering
- Open Graph and social-preview images
- Sitemap and robots configuration
- Canonical URLs

The visual experience must never hide essential business information from search engines or screen readers.

---

## 22. GitHub Workflow

The repository remains untouched until implementation is explicitly authorized.

### Recommended branches

```text
main
└── Stable approved state

design/future-concept
└── Primary implementation branch

prototype/three-signal-core
└── Optional isolated 3D experiment
```

### Recommended implementation sequence

First documentation commit:

```text
DESIGN_PLAN.md
CONTENT_CHECKLIST.md
WIREFRAME.md
```

Then application scaffolding and feature commits.

### Commit principles

- Small, reviewable commits
- Clear commit messages
- Do not mix asset changes with unrelated logic
- Keep experimental shaders isolated
- Use pull requests for major visual milestones
- Keep `main` stable

---

## 23. Netlify Deployment Plan

### Recommended build settings

```text
Build command: npm run build
Publish directory: dist
```

### Recommended `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Preview workflow

- Connect the GitHub repository to Netlify.
- Use `main` as the production branch only after approval.
- Use branch deploys or pull-request previews for design reviews.
- Share a private preview URL with the owner.
- Use separate previews for Obsidian and Chrome Ember when useful.

No custom domain is required for the first owner walkthrough.

---

## 24. Implementation Phases

### Phase 0: Approval and content intake

Deliverables:

- Approved creative direction
- Confirmed demo scope
- Owner content checklist
- Confirmed provisional business details
- Decision on product imagery approach

Exit criteria:

- The concept direction is approved for implementation.

### Phase 1: Foundation

Deliverables:

- Vite + React project
- Routing
- Design tokens
- Global layout
- Accessibility baseline
- Store data layer
- Placeholder content
- Netlify configuration

Exit criteria:

- All routes render as usable static HTML without Three.js.

### Phase 2: Signal Core prototype

Deliverables:

- React Three Fiber canvas
- Procedural Signal Core
- Lighting and environment
- Camera rig
- Capability detection
- Static fallback
- Pause and reduced-motion behavior

Exit criteria:

- The scene looks compelling and remains non-blocking.

### Phase 3: Homepage choreography

Deliverables:

- Age portal
- Boot sequence
- Hero reveal
- Store Signal bar
- Scroll-directed transitions
- Category Orbit
- Visit Portal transformation

Exit criteria:

- The homepage tells a coherent visual story from entry to visit conversion.

### Phase 4: Explore experience

Deliverables:

- Mock catalog
- Search
- Filters
- Product cards
- Product detail drawer
- Visit List
- Local persistence

Exit criteria:

- A user can discover, inspect, and save demo products without a backend.

### Phase 5: Mobile and accessibility pass

Deliverables:

- Purpose-built mobile scene
- Mobile dock
- Bottom-sheet Visit List
- Keyboard review
- Focus management
- Reduced-motion review
- Contrast review
- WebGL fallback review

Exit criteria:

- Core tasks work on mobile, keyboard, reduced-motion, and non-WebGL modes.

### Phase 6: Performance and polish

Deliverables:

- Asset compression
- Bundle splitting
- Shader optimization
- Capability-tier tuning
- Route-transition polish
- Error boundaries
- Loading states
- Final microcopy

Exit criteria:

- The experience selects an appropriate quality level and remains stable.

### Phase 7: Owner preview

Deliverables:

- Netlify preview URL
- Desktop walkthrough
- Mobile walkthrough
- Obsidian and Chrome Ember comparison
- Feedback checklist

Exit criteria:

- Owner feedback is recorded and categorized as required, optional, or future.

### Phase 8: Production planning, only after approval

Potential additions:

- Real inventory feed
- CMS
- Analytics
- Contact or availability forms
- Production legal review
- Custom domain
- Search-engine optimization
- Real photography
- Ongoing content-maintenance process

---

## 25. Testing Plan

### Functional testing

- Age acknowledgment
- Navigation
- Search
- Filters
- Product drawer
- Visit List
- Local persistence
- Call link
- Directions link
- Store-status calculation
- Theme toggle
- Reduced-motion toggle

### Device testing

- Modern desktop Chrome, Firefox, Safari, and Edge
- iPhone Safari
- Android Chrome
- High-DPI and standard-DPI screens
- Touch-only interaction
- Keyboard-only interaction

### Failure testing

- WebGL unavailable
- 3D asset fails to load
- Slow network
- JavaScript error inside the scene
- Missing product image
- Empty product results
- Empty Visit List
- Invalid or incomplete store hours
- Local storage unavailable

### Visual testing

- Desktop wide screen
- Laptop
- Tablet portrait and landscape
- Small phone
- Large phone
- Reduced motion
- Obsidian theme
- Chrome Ember theme

---

## 26. Acceptance Criteria for the First Interactive Demo

The demo is ready for the owner when:

1. A user can enter through the 21+ portal or skip the animation.
2. The hero creates a strong visual impact without hiding essential actions.
3. The Signal Core runs at an appropriate quality tier or falls back gracefully.
4. The user can reach Explore, Visit, Call, and Directions without interacting with the canvas.
5. Category selection works with pointer, touch, and keyboard.
6. Search and filters work against local demo data.
7. Product details are clear and labeled as mock content where needed.
8. The Visit List works locally and never resembles a completed purchase.
9. Store information is clearly marked as provisional until confirmed.
10. Mobile navigation is practical and conversion actions remain visible.
11. Reduced-motion mode removes nonessential motion.
12. The experience remains useful when WebGL is disabled.
13. No fabricated testimonials, inventory claims, or prices appear.
14. The Netlify preview loads from the GitHub-connected workflow.
15. The `main` branch remains stable unless an approved merge occurs.

---

## 27. Owner Presentation Flow

A focused presentation should follow this order:

### 1. Entry

Show the adult access portal and Signal Core assembly.

### 2. Brand impact

Pause on the hero and explain the premium, technology-gallery positioning.

### 3. Discovery

Use the Category Orbit and command search.

### 4. Product utility

Open a product, add it to the Visit List, and show the counter view.

### 5. Local conversion

Show open/closed status, call, directions, and the Navigate to Montclair sequence.

### 6. Flexibility

Switch between Obsidian and Chrome Ember.

### 7. Mobile

Show the simplified mobile experience and fixed action dock.

### 8. Decision

Ask the owner to evaluate:

- Overall style
- Preferred theme
- Product categories
- Store information
- Photography needs
- Desired future functionality

Core pitch:

> **This is not merely an online brochure. It gives customers a reason to explore the store before they arrive while keeping the actual purchase and age verification in person.**

---

## 28. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Three.js overwhelms usability | Keep navigation and content in semantic HTML |
| Weak mobile performance | Capability tiers and static fallback |
| Slow initial load | Lazy-load 3D and render useful HTML first |
| Futuristic design feels intimidating | Warm copy, clear CTAs, Chrome Ember alternative |
| Animations cause discomfort | Reduced-motion mode, pause, no scroll trapping |
| Demo content is mistaken for real inventory | Persistent demo-data labels and disclaimer |
| Owner dislikes abstract visual identity | Theme toggle and modular visual system |
| Product imagery creates rights issues | Use owned, licensed, or custom-generated assets only |
| Regulations or inventory change | Centralize data and require pre-launch review |
| Scene errors break the website | Error boundary and non-WebGL content layer |

---

## 29. Decisions Already Locked for the Concept

Unless deliberately revised during review, the working direction is:

- Concept name: **MONTCLAIR // SIGNAL 127**
- Primary theme: **Obsidian**
- Secondary theme: **Chrome Ember**
- Frontend: **React + Vite**
- 3D framework: **Three.js through React Three Fiber**
- Animation: **GSAP + Framer Motion**
- Hosting: **Netlify connected to GitHub**
- Commerce model: **Browse-only Visit List, no checkout**
- Signature artifact: **Signal Core**
- Signature navigation: **Category Orbit**
- Signature conclusion: **Navigate to Montclair**
- Product data: **Local JSON for the demo**
- Accessibility principle: **The canvas is an enhancement, not the app**
- Repository policy: **No implementation until explicitly authorized**

---

## 30. Immediate Next Action

No code or repository changes should be made yet.

When implementation is authorized, begin with:

1. Add this plan to the repository as `DESIGN_PLAN.md`.
2. Create `CONTENT_CHECKLIST.md` and `WIREFRAME.md`.
3. Open the `design/future-concept` branch.
4. Scaffold the static React/Vite foundation.
5. Build the useful HTML routes before adding the Three.js experience.

---

## 31. Final Design Standard

The finished concept should feel like:

```text
Luxury technology launch
+
Futuristic concept store
+
Cinematic title sequence
+
Useful local-business website
```

It should never feel like:

```text
Generic ecommerce template
Gaming dashboard
Crypto landing page
Nightclub flyer
Overloaded neon interface
```

The experience succeeds when the owner remembers the spectacle, understands the utility, and can imagine the concept becoming a real customer-facing website.
