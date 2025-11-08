# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Zenkergame Online is a **static HTML5 game portal** hosting 12+ embedded games from external providers. The platform features a dark cyberpunk-inspired design with glassmorphism effects, responsive layouts, and is optimized for AdSense monetization.

## Architecture

This is a **pure frontend, no-build static website**:
- **Technology**: Static HTML/CSS/JavaScript with Tailwind CSS via CDN
- **Game Integration**: Games embedded via iframes from `crazygames.com` and `onlinegames.io`
- **Analytics**: Google Analytics (G-JHL12BQ5FS) and Google AdSense (ca-pub-8347946979767466)
- **Styling**: Inline CSS in `<style>` tags + Tailwind CDN + Google Fonts (Inter & Poppins)

## File Structure

```
zenkergame.online/
├── index.html              # Main homepage with game catalog (55KB)
├── game.html               # Individual game iframe container (16KB)
├── about.html              # About page (11KB)
├── guides.html             # Game strategy guides (15KB)
├── reviews.html            # Game reviews and ratings (28KB)
├── privacy.html            # Privacy policy (14KB)
├── terms.html              # Terms of service (15KB)
├── zenker-survivors-guide.html # Dedicated guide page (31KB)
├── sitemap.xml             # SEO sitemap (2.8KB)
├── robots.txt              # Search engine directives
├── ads.txt                 # Ad network verification
├── favicon.svg             # Website icon
├── images/                 # Game thumbnails (SVG format, 12 files)
└── .gitignore              # Git ignore rules
```

## Common Development Tasks

Since this is a static site, use any HTTP server for local development:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` to preview.

### Testing Individual Games

Each game has a dedicated page accessed via URL parameters:
- Format: `game.html?id=game-name`
- Example: `game.html?id=zenker-survivors`

Game IDs are defined in `index.html` within the iframe `data-game` attributes.

## Code Architecture

### Page Templates

All HTML pages follow a consistent structure:
1. **Head Section**: Google Analytics, AdSense, meta tags, fonts
2. **Navigation**: Responsive navbar with Tailwind classes
3. **Main Content**: Page-specific content
4. **Footer**: Links and copyright

### Key Implementation Details

**Google Analytics Integration** (all pages, lines ~4-11):
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-JHL12BQ5FS"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-JHL12BQ5FS');
</script>
```

**AdSense Integration** (all pages, lines ~13-14):
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8347946979767466"
     crossorigin="anonymous"></script>
```

**Tailwind CSS** (loaded via CDN on all pages):
```html
<script src="https://cdn.tailwindcss.com"></script>
```

**Game Iframe Container** (`game.html:34-44`):
- Fixed aspect-ratio: 16/9
- Mobile responsive (adjusts height on screens < 768px)
- Includes loading spinner overlay
- Proper `allow` attributes for game permissions

### Game Categories

Games are organized in `index.html` by category:
- **🎯 Casual & Puzzle**: 2048, Slope Car, BlockBuster Puzzle
- **🕹️ Retro & Classic**: Street Fighter 2, Bobb's World, 8 Ball Billiards
- **🏆 Arcade & Action**: Endless Waves Survival, Flag Arena, Zenker Survivors, Draw Crash Race, Idle Craft Drill

### SEO Structure

**Structured Data** (`index.html:54-72`): JSON-LD schema for:
- WebSite entity with SearchAction
- ItemList of all games with Schema.org Game type

**Meta Tags** on all pages:
- Open Graph tags for social sharing
- Twitter Card meta tags
- Canonical URLs
- Theme colors for mobile browsers
- Content Security Policy (index.html:49)

## Configuration

### Analytics & Ads
- **Google Analytics ID**: G-JHL12BQ5FS
- **AdSense Client ID**: ca-pub-8347946979767466
- Located in the `<head>` section of all pages

### Fonts
- **Primary**: Inter (body text)
- **Secondary**: Poppins (headings, loaded from Google Fonts)

## Adding New Games

1. **Add to index.html**: Create a new section with game card
2. **Create SVG thumbnail**: Add to `/images/` directory
3. **Add to sitemap.xml**: Include new game URL
4. **Update structured data**: Add to JSON-LD ItemList

Typical game iframe structure:
```html
<iframe
    class="game-frame"
    src="GAME_URL"
    title="Game Title"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
</iframe>
```

## Deployment

Deploy to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- Traditional web hosting

Simply upload all files to the web server root. No build process required.

## Important Notes

- **No package.json or build tools** - pure static files
- **No external JavaScript dependencies** - all scripts inline or CDN
- **All styling inlined** or via Tailwind CDN
- **Games are third-party** - hosted on external domains via iframes
- **SEO optimized** - comprehensive meta tags and structured data on all pages
- **Mobile-first responsive design** - Tailwind utilities throughout
- **AdSense compliant** - content-rich pages with guides, reviews, privacy policy, terms

## Browser Support

- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Mobile: iOS Safari 14+, Chrome Mobile 90+
