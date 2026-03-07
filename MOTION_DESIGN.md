# DuxPace Motion Design System

## Audit av nåværende tilstand

**Hva fungerer bra:**
- Minimal, clean design med god hierarki
- Dark theme med god kontrast
- Basic FadeIn-komponent for scroll-reveal
- Subtle hover-effekter på bilder (scale 1.03)

**Hva føles statisk:**
- Hero-tekst kommer inn som en hel blokk
- Ingen tekst-stagger eller split-text effekter
- Team-kort har kun basic scale på bilder
- Kontaktskjema mangler fokus-tilstander
- Mobile meny kommer inn uten animasjon
- Ingen "premium" følelse i overganger
- News-carousel skifter hardt
- Ingen visuell dybde i bakgrunn

## Motion Design Plan

### Designprinsipper
- **Tone:** Subtil, elegant, profesjonell, teknisk
- **Hastighet:** 150-300ms for hover, 500-800ms for reveals
- **Easing:** `cubic-bezier(0.16, 1, 0.3, 1)` for exits, `cubic-bezier(0.4, 0, 0.2, 1)` for standard
- **Stagger:** 50-100ms mellom elementer
- **Accessibility:** Respekterer prefers-reduced-motion

### Seksjon-for-seksjon

#### 1. Hero
- **Split-text reveal** for headline: "We watch / the ocean from space"
- **Staggered entrance** for eyebrow, headline, subheading, CTAs
- **Subtle gradient animation** i bakgrunn (veldig lett, 8s loop)
- **CTA buttons:** Hover scale + glow, press scale 0.98
- **Scroll cue:** Pil som pulserer subtilt
- **Globe:** Beholder eksisterende, men legger til subtil glow-puls

#### 2. About
- **Section reveal:** Fade + slide-up med stagger på facts
- **Text highlight:** Subtil fargeovergang på viktige ord
- **Border animation:** Facts får animert venstre-border

#### 3. Team
- **Card hover:** Lift + skygge + border-glow
- **Image:** Zoom 1.05 + brightness increase
- **Social icons:** Slide-in fra bunn ved hover
- **Name/role:** Subtil opplysning ved hover

#### 4. News
- **Carousel:** Smooth slide med fade
- **Cards:** Lift + shadow på hover
- **Modal:** Scale-in + backdrop blur fade
- **Pagination dots:** Scale + farge smooth transition

#### 5. Contact
- **Form reveal:** Stagger på inputs
- **Focus states:** Border slide-in fra venstre, label float
- **Button:** Loading state med spinner, success med checkmark
- **Map:** Subtil zoom på scroll-into-view

## Teknisk implementasjon

### Reusable Components
1. `AnimatedSection` - Scroll-triggered reveal wrapper
2. `SplitHeadline` - Text-split animation
3. `HoverCard` - Team cards med lift/glow
4. `AnimatedButton` - CTA med hover/press states
5. `RevealCard` - News cards med smooth transitions
6. `AnimatedInput` - Form fields med focus states

### Motion Tokens
```typescript
const motion = {
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.6,
    reveal: 0.8,
  },
  ease: {
    smooth: [0.4, 0, 0.2, 1],
    bounce: [0.16, 1, 0.3, 1],
    snap: [0.25, 0.1, 0.25, 1],
  },
  stagger: {
    fast: 0.05,
    normal: 0.08,
    slow: 0.1,
  },
};
```

### Inspirasjon
- **Uiverse:** Button micro-interactions, card hover states
- **shadcn/ui:** Form field animations, hover card pattern
- **React Bits:** Text reveal, stagger children

## Filstruktur
```
app/
  components/
    motion/
      AnimatedSection.tsx
      SplitHeadline.tsx
      AnimatedButton.tsx
      HoverCard.tsx
      RevealCard.tsx
      AnimatedInput.tsx
      MotionProvider.tsx
```
