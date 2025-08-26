# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Zenkergame Online is a modern HTML5 game portal that hosts 12+ embedded games from external providers. The platform features a cyberpunk-inspired design with dark themes, glassmorphism effects, and responsive layouts.

## Architecture

- **Static HTML/CSS/JS**: Pure frontend website with no build process
- **Game Integration**: Games are embedded via iframes from external providers (crazygames.com, onlinegames.io)
- **Design Framework**: Tailwind CSS with custom styles and animations
- **Analytics**: Google Analytics (G-JHL12BQ5FS) and Google AdSense (ca-pub-8347946979767466)

## File Structure

```
zenkergame.online/
├── index.html          # Main homepage with game catalog
├── game.html           # Individual game iframe container
├── about.html          # About page
├── guides.html         # Game guides and strategies
├── reviews.html        # Game reviews and ratings
├── privacy.html        # Privacy policy
├── terms.html          # Terms of service
├── sitemap.xml         # SEO sitemap
├── robots.txt          # Search engine directives
├── ads.txt            # Ad network verification
├── favicon.svg        # Website icon
├── images/            # Game thumbnails (SVG format)
│   ├── 2048_game.svg
│   ├── bubble-tanks-2.svg
│   ├── slope-car.svg
│   ├── blockbuster-puzzle.svg
│   ├── street-fighter-2.svg
│   ├── bobbs-world.svg
│   ├── 8-ball-billiards-classic.svg
│   ├── endless-waves-survival.svg
│   ├── flag-arena.svg
│   ├── zenker-survivors.svg
│   ├── draw-crash-race.svg
│   └── idle-craft-drill.svg
└── README.md          # Project documentation
```

## Development Commands

This is a static website with no build process. Use any HTTP server for local development:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if http-server is installed)
npx http-server

# PHP
php -S localhost:8000
```

## Key Features to Understand

1. **Game Integration**: Games are embedded via iframes with specific allow permissions
2. **Responsive Design**: Uses Tailwind CSS with custom glassmorphism effects
3. **SEO Optimization**: Complete meta tags, sitemap, and robots.txt
4. **Ad Integration**: Google AdSense with responsive ad units
5. **Analytics**: Google Analytics tracking

## Content Pages

- **index.html**: Main catalog with game categories (Casual, Retro, Arcade)
- **game.html**: Individual game iframe container with URL parameters
- **guides.html**: Game strategy guides and tips
- **reviews.html**: Game reviews and ratings
- **about.html**: About the platform
- **privacy.html**: Privacy policy document
- **terms.html**: Terms of service document

## Game Categories

- **🎯 Casual & Puzzle**: 2048, Slope Car, BlockBuster Puzzle
- **🕹️ Retro & Classic**: Street Fighter 2, Bobb's World, 8 Ball Billiards
- **🏆 Arcade & Action**: Endless Waves Survival, Flag Arena, Zenker Survivors, Draw Crash Race, Idle Craft Drill

## Technical Stack

- **HTML5**: Modern semantic markup
- **CSS3**: Custom animations and glassmorphism effects
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript**: Minimal vanilla JS for navigation and interactions
- **Google Fonts**: Inter and Poppins font families

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Mobile 90+)

## Deployment

This is a static site that can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any web hosting service

Simply upload all files to the web server root directory.

## Important Notes

- No package.json or build process exists
- All styling is inline or in <style> tags
- Games are hosted externally via iframes
- AdSense and Analytics require proper configuration
- SEO is fully configured with meta tags and structured data