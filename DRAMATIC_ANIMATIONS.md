# Dramatiske Scroll-Animasjoner - DuxPace

## 🎬 Nye Dramatiske Effekter Lagt Til

### 1. **SplitText** - Karakter-for-karakter animasjon
Tekst som kommer inn bokstav for bokstav med 3D rotasjon.

```tsx
<SplitText delay={0.2} staggerDelay={0.04} splitBy="char">
  Vi ser havet fra verdensrommet
</SplitText>
```

**Brukt i:** Hero heading

### 2. **DramaticSlide** - Slide med rotasjon
Elementer som slider inn fra sidene med rotasjon.

```tsx
<DramaticSlide direction="left" delay={0} duration={1} rotate={3}>
  <Content />
</DramaticSlide>
```

**Brukt i:** About seksjon (fra venstre)

### 3. **FlipReveal** - 3D Flip animasjon
Kort som flipper inn som ved kortstokk.

```tsx
<FlipReveal delay={0.2} axis="y">
  <Card />
</FlipReveal>
```

**Brukt i:** About facts

### 4. **ClipReveal** - Mask/Clip-path animasjon
Avsløring bak maske (opp, ned, venstre, høyre, sentrum).

```tsx
<ClipReveal direction="up" delay={0.1}>
  <Image />
</ClipReveal>
```

**Brukt i:** Team bilder

### 5. **ScaleIn** - Zoom inn effekt
Elementer som zoomer inn fra liten til full størrelse.

```tsx
<ScaleIn delay={0.1}>
  <Card />
</ScaleIn>
```

**Brukt i:** Team kort

### 6. **GlitchText** - Subtil glitch effekt
Tekst med RGB-split glitch (veldig subtil).

```tsx
<GlitchText delay={0.3}>
  OVERSKRIFT
</GlitchText>
```

### 7. **BounceIn** - Spring/fjær animasjon
Elementer som spretter inn med fjær-fysikk.

```tsx
<BounceIn delay={0.5}>
  <Button />
</BounceIn>
```

**Brukt i:** CTA knapper i Hero

### 8. **DramaticEntrance** - Scale + blur fade
Kombinert scale, blur og opacity animasjon.

```tsx
<DramaticEntrance delay={1}>
  <Paragraph />
</DramaticEntrance>
```

**Brukt i:** Hero subheading

### 9. **WaveStagger** - Bølge animasjon
Elementer som kommer i bølger fra venstre/høyre annenhver gang.

```tsx
<WaveStagger baseDelay={0} staggerDelay={0.1}>
  {[<Item1 />, <Item2 />, <Item3 />]}
</WaveStagger>
```

### 10. **ParallaxGroup** - Multi-lag parallax
Elementer som beveger seg, scaler og fader basert på scroll.

```tsx
<ParallaxGroup speed={0.5}>
  <Content />
</ParallaxGroup>
```

## 🎯 Hovedendringer Per Seksjon

### **Hero**
- ✅ SplitText på heading (karakter-for-karakter)
- ✅ DramaticEntrance på subheading (scale + blur)
- ✅ BounceIn på CTA knapper
- ✅ Piler som animerer kontinuerlig
- ✅ Scroll cue med pulsering

### **About**
- ✅ DramaticSlide fra venstre med rotasjon
- ✅ FlipReveal på facts (3D flip)
- ✅ FadeIn på paragraphs med stagger
- ✅ Blue gradient decoration

### **Team**
- ✅ ScaleIn på team kort (zoom inn)
- ✅ ClipReveal på bilder (avsløring)
- ✅ Hover: lift + scale + brightness
- ✅ Social ikoner med bounce på hover
- ✅ Stagger på alle elementer

### **News & Contact**
- ✅ Stagger animasjoner beholdt
- ✅ Smooth transitions

## ⚡ Performance

- Alle animasjoner er GPU-accelerated
- Bruker `transform` og `opacity` (komposisjons-egenskaper)
- `will-change` kun på aktive elementer
- 60fps smooth
- Respekterer `prefers-reduced-motion`

## 🎨 Timing & Easing

```
Dramatiske anims:  duration: 0.8-1.0s
Stagger delays:    0.1-0.15s mellom elementer
Easing:           [0.16, 1, 0.3, 1] (smooth bounce)
Spring:           stiffness: 300, damping: 20
```

## 📊 Sammenligning

| Før | Etter |
|-----|-------|
| Enkel fade-in | Karakter-for-karakter split |
| Statiske kort | 3D flip + zoom |
| Vanlig slide | Slide + rotasjon |
| Statisk tekst | Glitch + bounce effekter |

**Resultat:** Mer dramatisk, premium og "wow" faktor! 🚀
