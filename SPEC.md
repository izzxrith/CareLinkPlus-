# CareLink+ Landing Page Redesign - Specification Document

## Project Overview
- **Project Name**: CareLink+
- **Tagline**: Smart care, Safe life
- **Target Audience**: Parents and Teachers of special needs students (SK Pinji, Ipoh) and caregivers for the elderly
- **Vision**: CareLink+ is a 'Secondary Guardian' - shifts healthcare from reactive to proactive/predictive model using wearable technology

---

## 1. Color Scheme Specification

### Primary Colors (Medical Greens)
```css
:root {
    --primary-green-dark: #1B5E20;      /* Deep forest green - headers, emphasis */
    --primary-green: #2E7D32;          /* Standard green - primary actions */
    --primary-green-light: #4CAF50;    /* Vibrant green - accents, CTAs */
    --primary-green-pale: #A5D6A7;     /* Soft green - highlights */
    --primary-green-bg: #E8F5E9;       /* Light green - backgrounds */
}
```

### Neutral Colors
```css
:root {
    --white: #FFFFFF;
    --off-white: #FAFAFA;
    --soft-gray: #F5F5F5;
    --light-gray: #EEEEEE;
    --border-gray: #E0E0E0;
    --text-gray: #757575;
    --text-dark: #212121;
    --text-dark-primary: #1A1A1A;
}
```

### Accent Colors
```css
:root {
    --accent-teal: #00897B;            /* Secondary accent */
    --accent-teal-light: #26A69A;
    --alert-red: #D32F2F;              /* Emergency/alerts */
    --alert-red-light: #FFEBEE;
    --warning-amber: #FFA000;          /* Warnings */
    --success-green: #388E3C;          /* Safe status */
}
```

---

## 2. Typography Recommendations

### Font Family
- **Primary Font**: Inter (Google Fonts) - Clean, modern, highly readable
- **Secondary Font**: Roboto (Google Fonts) - Fallback for medical terminology

### Font Scale
```css
:root {
    /* Headings */
    --h1: 3rem (48px) - weight: 800
    --h2: 2.25rem (36px) - weight: 700
    --h3: 1.5rem (24px) - weight: 600
    --h4: 1.25rem (20px) - weight: 600
    
    /* Body */
    --body-large: 1.125rem (18px) - weight: 400
    --body-regular: 1rem (16px) - weight: 400
    --body-small: 0.875rem (14px) - weight: 400
    
    /* UI Elements */
    --caption: 0.75rem (12px) - weight: 500
    --button: 0.875rem (14px) - weight: 600
}
```

### Line Heights
- Headings: 1.2 - 1.3
- Body text: 1.6 - 1.8
- UI elements: 1.4

---

## 3. Section-by-Section Content

### 3.1 Hero Section

**Layout**: Split layout - 60% content / 40% visual
**Background**: Gradient from #E8F5E9 (light green) to #FFFFFF

**Badge**: 
- Text: "SK Pinji Ipoh &bull; FYP 2024/2025"
- Style: Pill shape, --primary-green-bg background, --primary-green text

**Headline**:
```
Smart care, Safe life
```

**Subheadline**:
```
CareLink+ acts as your Secondary Guardian — using predictive AI to monitor 
heart rate, detect falls, and analyze emotions in real-time. We shift 
healthcare from reactive to proactive, protecting your loved ones before 
crisis strikes.
```

**CTA Button**:
- Text: "Experience Predictive Care"
- Style: Solid --primary-green, white text, pill shape (border-radius: 50px)
- Hover: Darken to --primary-green-dark, slight lift (transform: translateY(-2px))
- Icon: Heart-pulse (fas fa-heartbeat)

**Secondary Link**:
- Text: "View Features"
- Style: Ghost button with --primary-green border

**Visual Elements**:
- Phone mockup showing CareLink+ app dashboard
- Floating badges with key metrics (98% accuracy, <2s response)
- Subtle animated pulse circle in background

---

### 3.2 The Problem vs. Solution Section

**Layout**: Two-column comparison with center divider
**Background**: --soft-gray

**Section Tag**: "Why CareLink+?"
**Headline**: "From Waiting for Emergencies to Preventing Them"

**Problem Column** (Left):
- **Title**: "Traditional Care Apps"
- **Icon**: Clock (far fa-clock) in --alert-red
- **Description**: 
  ```
  Most healthcare apps only respond AFTER a crisis occurs. 
  By the time you receive an alert, the emergency has already happened.
  ```
- **Visual**: Red-tinted card with warning icon

**Solution Column** (Right):
- **Title**: "CareLink+ Predictive Care"
- **Icon**: Shield (fas fa-shield-alt) in --success-green
- **Description**:
  ```
  Our AI analyzes biometric patterns continuously, predicting 
  falls, emotional distress, and health anomalies BEFORE they happen.
  You intervene early, not after damage is done.
  ```
- **Visual**: Green-tinted card with checkmark

**Center Element**:
- Animated arrow or "VS" circle transitioning from red to green

---

### 3.3 Core Features - The 4 Pillars

**Layout**: 2x2 grid on desktop, single column on mobile
**Background**: --white

**Section Tag**: "Four Pillars of Protection"
**Headline**: "Complete Care, Zero Compromises"

#### Pillar 1: Predictive Vitals & Fall Detection
- **Icon**: Heart-pulse with brain (fas fa-heartbeat + fa-brain)
- **Color**: --primary-green
- **Description**:
  ```
  Real-time heart rate monitoring with automated alerts for falls 
  or pulse anomalies (Tachycardia/Bradycardia). Our AI detects 
  irregular patterns and alerts caregivers within 2 seconds.
  ```
- **Key Features**:
  - Continuous heart rate monitoring
  - Fall detection algorithm
  - Tachycardia/Bradycardia alerts
  - Real-time push notifications

#### Pillar 2: Smart Geofencing
- **Icon**: Map-marker with zone (fas fa-map-marked-alt)
- **Color**: --accent-teal
- **Description**:
  ```
  "Safe Zone" tracking centered on SK Pinji to prevent student 
  wandering. Set virtual boundaries and receive instant alerts 
  when someone exits the designated safe area.
  ```
- **Key Features**:
  - Customizable safe zones
  - Instant boundary breach alerts
  - Historical location logging
  - Multiple zone support

#### Pillar 3: Pulse-Based Emotion Analysis
- **Icon**: Chart with pulse (fas fa-chart-line + fa-heart)
- **Color**: --warning-amber
- **Description**:
  ```
  Translating heart rate data into emotional insights for 
  non-verbal students. Identify Calm, Agitated, or Distressed 
  states and respond appropriately before emotional escalation.
  ```
- **Key Features**:
  - HRV-based emotion detection
  - Three-state emotional analysis
  - Non-verbal communication support
  - Historical emotion patterns

#### Pillar 4: Localized Logistics
- **Icon**: Hospital with marker (fas fa-hospital + fa-map-marker)
- **Color**: --primary-green-dark
- **Description**:
  ```
  Integrated medical booking for Ipoh hospitals (KPJ Ipoh & HRPB) 
  and one-tap emergency dispatch. Direct connection to local 
  healthcare when every second counts.
  ```
- **Key Features**:
  - One-tap emergency dispatch
  - KPJ Ipoh appointment booking
  - HRPB direct integration
  - Emergency contact shortcuts

---

### 3.4 Data Retention Section

**Layout**: Centered content with icon
**Background**: Gradient from --primary-green-bg to --white

**Section Tag**: "Clinical-Grade Data"
**Headline**: "90 Days of History for Better Decisions"

**Icon**: Database with calendar (fas fa-database + far fa-calendar-check)

**Description**:
```
All vital signs, location data, and emotional assessments are stored 
securely for 90 days. Review behavioral trends, track clinical progress, 
and share detailed reports with healthcare providers during consultations.
```

**Data Points to Highlight**:
- 90-day historical logging
- Behavioral pattern analysis
- Clinical review exports
- HIPAA-compliant storage

---

### 3.5 Wear OS Integration Section

**Layout**: Split layout - 40% content / 60% visual
**Background**: --text-dark with --primary-green accents

**Section Tag**: "Zero-Typing Pairing"
**Headline**: "Smartwatch Setup Made Simple"

**Description**:
```
Students and elderly users often struggle with complex device setup. 
CareLink+ uses "Zero-Typing" pairing - simply tap the smartwatch 
to the phone and all settings sync automatically. No passwords, 
no WiFi configuration, no typing required.
```

**Process Steps** (Horizontal timeline):
1. **Tap**: Tap smartwatch to phone NFC
2. **Sync**: Settings transfer automatically
3. **Ready**: Device starts monitoring

**Visual**: Animated smartwatch pairing illustration

---

### 3.6 Footer

**Layout**: 4-column grid
**Background**: --text-dark-primary (#1A1A1A)

**Column 1 - Brand**:
- Logo: CareLink+ (white text with + in --primary-green-light)
- Tagline: "Smart care, Safe life"
- Social icons: Facebook, Twitter, Instagram, LinkedIn

**Column 2 - Product**:
- Features
- How It Works
- Pricing
- Download App

**Column 3 - For Schools**:
- Admin Dashboard
- Student Management
- Alert System
- Reports

**Column 4 - Contact**:
- Email: info@carelinkplus.my
- Phone: +60 5-XXX XXXX
- Address: Ipoh, Perak, Malaysia

**Bottom Bar**:
- Copyright: © 2024 CareLink+
- Mission Statement:
  ```
  Our mission is to protect vulnerable communities in Ipoh by providing 
  accessible, predictive healthcare technology for special needs students 
  and the elderly.
  ```

---

## 4. Layout Structure & Responsive Breakpoints

### Container Max-Width
- Desktop: 1200px
- Container padding: 0 5% (60px on desktop)

### Responsive Breakpoints

```css
/* Large Desktop */
@media (min-width: 1200px) {
    /* Full layout */
}

/* Tablet Landscape / Small Desktop */
@media (max-width: 1024px) {
    .hero { padding: 4rem 8%; }
    .feature-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Tablet Portrait */
@media (max-width: 768px) {
    .hero {
        flex-direction: column;
        text-align: center;
        padding: 3rem 5%;
    }
    .hero-content { max-width: 100%; }
    .hero-visual { min-height: 400px; }
    
    .problem-solution {
        flex-direction: column;
    }
    
    .feature-grid {
        grid-template-columns: 1fr;
    }
    
    .four-pillars-grid {
        grid-template-columns: 1fr;
    }
    
    .footer-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Mobile */
@media (max-width: 480px) {
    h1 { font-size: 2rem; }
    h2 { font-size: 1.75rem; }
    
    .hero-stats {
        flex-direction: column;
        gap: 1rem;
    }
    
    .btn-main, .btn-secondary {
        width: 100%;
        justify-content: center;
    }
    
    .footer-grid {
        grid-template-columns: 1fr;
    }
    
    .nav-links { display: none; } /* Mobile menu */
}
```

### Section Padding
- Desktop: 6rem vertical (96px)
- Tablet: 4rem vertical (64px)
- Mobile: 3rem vertical (48px)

---

## 5. Accessibility Considerations

### Color Contrast
- Primary text: --text-dark on --white (ratio: 15.3:1)
- Secondary text: --text-gray on --white (ratio: 4.5:1)
- Green text on white: --primary-green (ratio: 4.5:1)
- All CTAs meet WCAG AA (4.5:1 minimum)

### Semantic HTML
- Use proper heading hierarchy (h1 → h2 → h3 → h4)
- All images have alt text
- Form inputs have associated labels
- Landmarks: header, nav, main, section, footer, aside

### Keyboard Navigation
- All interactive elements focusable (tabindex)
- Visible focus indicators (outline: 2px solid --primary-green)
- Skip-to-content link
- Logical tab order

### Screen Reader Support
- ARIA labels on icons
- aria-live regions for dynamic content (alerts)
- Descriptive link text (no "click here")
- Proper landmark roles

### Motion & Animation
- Respect prefers-reduced-motion
- No auto-playing videos with sound
- Smooth but not distracting animations

---

## 6. Animation & Interaction Suggestions

### Hero Section
- Phone mockup: Floating animation (translateY: 0 → -15px, 4s ease-in-out infinite)
- Stats counter: Animated number counting up on scroll
- Floating badges: Subtle float (translateY: 0 → -8px, 3s ease-in-out infinite, staggered)
- Background circles: Slow pulse animation (scale: 1 → 1.05, 6s infinite)

### Scroll Animations
- Section fade-in: opacity 0 → 1, translateY 30px → 0 (600ms ease)
- Staggered card reveals: 100ms delay between each
- Trigger: When element is 10% in viewport

### Button Interactions
- Hover: translateY(-2px), box-shadow increase
- Active: scale(0.98)
- Transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)

### Feature Cards
- Hover: Border color transition to --primary-green
- Icon: Subtle scale on hover (1.1)
- "Learn more" link: Arrow slides right on hover

### Problem vs Solution
- Center transition: Animated arrow moves left-to-right
- Cards: Subtle glow effect on hover

### Mobile Menu
- Slide-in from right (transform: translateX)
- Backdrop fade-in
- Menu items stagger in

---

## 7. Implementation Notes

### File Structure
```
/index.html          - Main landing page (to modify)
/css/style.css       - Stylesheet (to modify)
/js/script.js        - JavaScript (to modify)
/SPEC.md            - This specification
```

### Key CSS Classes to Create
- `.hero-new` - New hero section
- `.problem-solution` - Problem vs Solution comparison
- `.four-pillars` - Core features grid
- `.data-retention` - Data retention section
- `.wear-os` - Wear OS integration section
- `.footer-mission` - Footer with mission statement

### Color Variable Mapping (from teal to green)
```css
/* Replace in style.css */
--primary-teal → --primary-green
--dark-teal → --primary-green-dark
--light-teal → --primary-green-bg
--accent-orange → (remove or use sparingly)
```

### Recommended Libraries
- Font Awesome 6.4+ (icons)
- Google Fonts: Inter
- No additional JS libraries required (vanilla JS sufficient)

---

## 8. Acceptance Criteria

- [ ] Hero section displays with "Smart care, Safe life" tagline and green color scheme
- [ ] CTA button "Experience Predictive Care" is prominent and clickable
- [ ] Problem vs Solution section clearly contrasts reactive vs proactive care
- [ ] All 4 Pillars are displayed with icons and descriptions
- [ ] Data retention section mentions 90-day history
- [ ] Wear OS section explains zero-typing pairing
- [ ] Footer includes mission statement about Ipoh communities
- [ ] All colors use the specified medical green palette
- [ ] Site is responsive on mobile, tablet, and desktop
- [ ] All interactive elements have hover/focus states
- [ ] Animations are smooth and respect reduced-motion preferences
