# FUN(TIME) Design System
## Freedom & Unity Network Through Individual Meaningful Effort

### Core Design Philosophy

Our design system embodies the natural process of transformation and growth, inspired by the butterfly metamorphosis metaphor. Every visual element should reflect the journey from individual potential to collective impact.

## 1. Color System

### Primary Palette - "Growth Spectrum"
- **Seed (Base)**: `#1B4332` - Deep forest green, representing potential
- **Sprout (Primary)**: `#2D6A4F` - Rich emerald, symbolizing growth
- **Bloom (Accent)**: `#40916C` - Vibrant sage, showing vitality
- **Sky (Complement)**: `#48CAE4` - Clear blue, representing freedom

### Stage-Specific Palettes

#### Egg Stage
- Subtle, pearl-like gradients
- Base: `linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)`
- Gentle, cool undertones suggesting potential

#### Larvae Stage
- Earth tones and growing greens
- Active gradients with movement
- `linear-gradient(45deg, #2D6A4F 0%, #40916C 50%, #52B788 100%)`

#### Pupa Stage
- Transformative gold and amber tones
- Chrysalis-inspired metallic effects
- `linear-gradient(180deg, #92400E 0%, #B45309 50%, #D97706 100%)`

#### Butterfly Stage
- Full spectrum of vibrant colors
- Iridescent effects
- Dynamic color shifts on interaction

## 2. Typography

### Font Hierarchy
- **Display**: Custom organic font for headlines
- **Body**: Clean, sustainable font for readability
- **Accents**: Nature-inspired decorative elements

### Text Treatments
- Fluid typography scaling
- Organic line heights
- Natural rhythm spacing

## 3. Component Design

### Buttons
```
States:
- Default: Seed-like, contained potential
- Hover: Blooming effect with expanding ripples
- Active: Full bloom state
- Disabled: Dormant state
```

### Cards & Containers
```
Characteristics:
- Organic shapes with soft edges
- Living borders that respond to interaction
- Growth-inspired expansion animations
```

### Navigation
```
Principles:
- Fluid transitions between sections
- Stage-appropriate visual treatments
- Natural wayfinding patterns
```

## 4. Animation Principles

### Micro-interactions
- **Growth**: Elements expand organically
- **Emergence**: Smooth transitions from hidden to visible
- **Transformation**: Stage-based state changes
- **Ripple**: Impact visualization for actions

### Page Transitions
- Metamorphosis-inspired transitions
- Natural flow between states
- Organic loading states

## 5. Layout System

### Grid System
- Fibonacci-based spacing
- Golden ratio proportions
- Organic asymmetry within structure

### Spacing
```
Base unit: 4px (0.25rem)
Scale follows natural growth patterns:
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.618rem (≈26px) [Golden ratio]
- xl: 2.618rem (≈42px)
```

## 6. Interactive Elements

### Progress Indicators
- Spiral-based loading animations
- Growth-ring progress circles
- Metamorphosis stage indicators

### Input Fields
- Organic form fields
- Natural validation states
- Growing interaction states

### Icons & Graphics
- Nature-inspired custom icons
- Living, animated states
- Stage-appropriate variations

## 7. Visual Language

### Pattern Library
```
Core patterns:
- Leaf venation
- Crystal formations
- Wave interference
- Growth rings
- Spiral generation
```

### Texture Usage
- Subtle organic textures
- Natural material inspirations
- Stage-appropriate surface treatments

## 8. Motion Design

### Timing Functions
```css
--motion-organic: cubic-bezier(0.45, 0.05, 0.55, 0.95);
--motion-emerge: cubic-bezier(0.19, 1, 0.22, 1);
--motion-transform: cubic-bezier(0.68, -0.6, 0.32, 1.6);
```

### Duration Guidelines
```css
--duration-quick: 200ms;
--duration-natural: 350ms;
--duration-transform: 500ms;
--duration-emerge: 700ms;
```

## 9. Stage-Based Interaction Model

### Egg Stage
- Minimal, focused interfaces
- Clear pathways to action
- Nurturing guidance elements

### Larvae Stage
- Explorative interfaces
- Learning-focused interactions
- Progressive disclosure

### Pupa Stage
- Reflective interfaces
- Deep engagement patterns
- Transformation visualization

### Butterfly Stage
- Full-featured interfaces
- Community connection points
- Impact visualization

## 10. Accessibility & Sustainability

### Inclusive Design
- High contrast options
- Motion reduction settings
- Clear interaction patterns

### Environmental Consideration
- Efficient resource loading
- Sustainable animation practices
- Optimized asset delivery

## 11. Implementation Guidelines

### CSS Custom Properties
```css
:root {
  /* Colors */
  --color-seed: #1B4332;
  --color-sprout: #2D6A4F;
  --color-bloom: #40916C;
  --color-sky: #48CAE4;

  /* Animations */
  --transition-grow: 350ms var(--motion-organic);
  --transition-emerge: 700ms var(--motion-emerge);
  
  /* Spacing */
  --space-natural: clamp(1rem, 2vw, 1.618rem);
}
```

### Utility Classes
```css
.grow-natural {
  transition: transform var(--transition-grow);
}

.emerge {
  animation: emerge var(--transition-emerge);
}
```

