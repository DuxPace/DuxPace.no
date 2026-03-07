# Scroll-Animasjoner for DuxPace

Komplett bibliotek med scroll-baserte animasjoner som aktiveres når brukeren scroller ned siden.

## 📦 Import

```tsx
import {
  ScrollReveal,
  StaggerReveal,
  StaggerRevealItem,
  ScrollProgressBar,
  CountUp,
  ImageReveal,
  CircularReveal,
  TextHighlight,
  StickySection,
  ParallaxLayer,
  VelocityText,
  HorizontalScroll,
  SnapSection,
  SnapContainer,
} from "@/app/components/ScrollAnimations";
```

## 🎬 Tilgjengelige Komponenter

### 1. ScrollReveal
Grunnleggende fade-in animasjon på scroll.

```tsx
<ScrollReveal 
  direction="up"      // "up" | "down" | "left" | "right"
  distance={50}       // Pixels å bevege seg
  delay={0}           // Forsinkelse i sekunder
  duration={0.6}      // Varighet i sekunder
  once={true}         // Kun én gang?
  threshold={0.2}     // Hvor mye må være synlig (0-1)
>
  <DittInnhold />
</ScrollReveal>
```

### 2. StaggerReveal + StaggerRevealItem
Flere elementer som animerer etter hverandre.

```tsx
<StaggerReveal 
  staggerDelay={0.1}  // Forsinkelse mellom elementer
  baseDelay={0}       // Basis-forsinkelse
  direction="up"
>
  <StaggerRevealItem>
    <Element1 />
  </StaggerRevealItem>
  <StaggerRevealItem>
    <Element2 />
  </StaggerRevealItem>
  <StaggerRevealItem>
    <Element3 />
  </StaggerRevealItem>
</StaggerReveal>
```

### 3. ScrollProgressBar
Progress bar som fyller seg opp når den kommer i view.

```tsx
<ScrollProgressBar
  value={85}                    // Prosent (0-100)
  label="Progress"              // Label tekst
  showPercentage={true}         // Vis prosent?
  delay={0.3}                   // Forsinkelse
  height="8px"                  // Høyde
/>
```

### 4. CountUp
Tall som teller opp fra 0 til target.

```tsx
<CountUp
  end={1000}           // Slutt-verdi
  duration={2}         // Sekunder
  prefix=""            // Før tall
  suffix="+"           // Etter tall
  decimals={0}         // Desimaler
  delay={0}            // Forsinkelse
/>
```

**Eksempel med stats:**
```tsx
<div className="text-4xl font-bold">
  <CountUp end={99.9} suffix="%" decimals={1} />
</div>
<p>Nøyaktighet</p>
```

### 5. ImageReveal
Bilde som avsløres med mask/clip-path animasjon.

```tsx
<ImageReveal
  src="/bilde.jpg"
  alt="Beskrivelse"
  direction="up"       // "up" | "down" | "left" | "right"
  delay={0}
  className="aspect-video"
/>
```

### 6. CircularReveal
Sirkulær avsløring (fra midten og ut).

```tsx
<CircularReveal delay={0.2}>
  <img src="/bilde.jpg" alt="" />
</CircularReveal>
```

### 7. TextHighlight
Tekst som highlightes ord for ord på scroll.

```tsx
<h2>
  <TextHighlight 
    delay={0.2}
    staggerDelay={0.05}
    highlightColor="rgba(96, 165, 250, 0.3)"
  >
    Dette er teksten som skal highlights
  </TextHighlight>
</h2>
```

### 8. StickySection
Seksjon som "fester" seg mens man scroller.

```tsx
<StickySection
  stickyHeight="200vh"    // Total scroll-høyde
  backgroundContent={
    <img src="/bg.jpg" className="w-full h-full object-cover" />
  }
>
  <div className="text-center">
    <h2>Innhold som er sticky</h2>
  </div>
</StickySection>
```

### 9. ParallaxLayer
Element som beveger seg saktere/fortere enn scroll.

```tsx
<ParallaxLayer speed={0.5} direction="up">
  <img src="/bilde.jpg" />
</ParallaxLayer>
```

- `speed`: 0.5 = halv fart, 1 = normal, 2 = dobbelt
- `direction`: "up" eller "down"

### 10. VelocityText
Tekst som skjever basert på scroll-hastighet.

```tsx
<VelocityText>
  Tekst som reagerer på scroll-hastighet
</VelocityText>
```

### 11. HorizontalScroll
Horisontal scroll basert på vertikal scroll.

```tsx
<HorizontalScroll itemWidth="100vw">
  <Section1 />
  <Section2 />
  <Section3 />
</HorizontalScroll>
```

### 12. SnapSection + SnapContainer
Snap-basert scrolling (som PowerPoint).

```tsx
<SnapContainer>
  <SnapSection id="section1">
    <h1>Seksjon 1</h1>
  </SnapSection>
  <SnapSection id="section2">
    <h1>Seksjon 2</h1>
  </SnapSection>
</SnapContainer>
```

## 💡 Brukseksempler

### Stats med counters
```tsx
<div className="grid grid-cols-4 gap-8">
  <StaggerReveal staggerDelay={0.15}>
    <StaggerRevealItem>
      <div className="text-5xl font-bold">
        <CountUp end={99.9} suffix="%" decimals={1} />
      </div>
      <p>Nøyaktighet</p>
    </StaggerRevealItem>
    
    <StaggerRevealItem>
      <div className="text-5xl font-bold">
        <CountUp end={24} suffix="/7" />
      </div>
      <p>Overvåking</p>
    </StaggerRevealItem>
    
    <StaggerRevealItem>
      <div className="text-5xl font-bold">
        <CountUp end={1000} suffix="+" />
      </div>
      <p>Kvadratkilometer</p>
    </StaggerRevealItem>
  </StaggerReveal>
</div>
```

### Bilde med reveal
```tsx
<div className="grid grid-cols-2 gap-12">
  <ScrollReveal direction="left">
    <ImageReveal 
      src="/team.jpg" 
      alt="Team"
      direction="left"
      className="rounded-lg"
    />
  </ScrollReveal>
  
  <ScrollReveal direction="right" delay={0.2}>
    <h2>Overskrift</h2>
    <p>Tekst innhold...</p>
  </ScrollReveal>
</div>
```

### Teknologi skills med progress bars
```tsx
<div className="space-y-6">
  <ScrollProgressBar
    value={98}
    label="Satellittdekning"
    delay={0.3}
  />
  <ScrollProgressBar
    value={95}
    label="AI-nøyaktighet"
    delay={0.4}
  />
  <ScrollProgressBar
    value={92}
    label="Realtidsdata"
    delay={0.5}
  />
</div>
```

### Parallax bakgrunn
```tsx
<section className="relative h-screen overflow-hidden">
  <ParallaxLayer speed={0.3} className="absolute inset-0">
    <img src="/bg.jpg" className="w-full h-full object-cover" />
  </ParallaxLayer>
  
  <div className="relative z-10 flex items-center justify-center h-full">
    <ScrollReveal>
      <h1>Innhold over parallax</h1>
    </ScrollReveal>
  </div>
</section>
```

## ⚡ Performance Tips

1. **Bruk `once={true}`** for animasjoner som kun skal skje én gang
2. **Juster `threshold`** - 0.2 er bra for de fleste, 0.5 for viktig innhold
3. **Stagger animasjoner** - ikke animer alt samtidig
4. **Bruk transform og opacity** - de er GPU-accelerated
5. **Lazy load bilder** - kombiner med ImageReveal

## ♿ Tilgjengelighet

- Alle animasjoner respekterer `prefers-reduced-motion`
- Ingen animasjoner blokkerer innhold
- Fokus-states fungerer som normalt
- Skjermleser-kompatibel

## 🎨 Tilpasning

Alle komponenter aksepterer `className` for styling:

```tsx
<ScrollReveal 
  direction="up"
  className="bg-white/5 p-8 rounded-lg"
>
  Innhold
</ScrollReveal>
```
