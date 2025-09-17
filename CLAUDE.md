# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with live reload on port 8080
- `npm run build` - Build production site (CSS + Eleventy)
- `npm run build:css` - Watch and rebuild Tailwind CSS
- `npm run build:11ty` - Build Eleventy site only
- `npm run start` - Build and serve production site locally
- `npm run clean` - Remove generated _site directory

## Project Architecture

This is an Eleventy static site generator project converted from React, using Nunjucks templates and Tailwind CSS. It's a landing page for PageLove with interactive features implemented in vanilla JavaScript.

### Core Technologies
- **Eleventy 3.0** - Static site generator
- **Nunjucks** - Template engine for HTML generation
- **Tailwind CSS 3.4** - Utility-first CSS framework with custom animations
- **Vanilla JavaScript** - Interactive features and animations
- **npm-run-all** - Parallel development tasks

### Project Structure
- `src/index.njk` - Main page template
- `src/_includes/layouts/base.njk` - Base HTML layout template
- `src/_includes/components/` - Reusable component templates:
  - `hero-section.njk` - Hero with animated neural nodes
  - `how-it-works.njk` - Process diagram and comparison
  - `testimonials.njk` - Quote cards with email signup
  - `footer.njk` - Social links footer
- `src/_data/` - JSON data files for content
- `src/css/` - Tailwind input and generated CSS
- `src/js/main.js` - Interactive JavaScript features
- `_site/` - Generated static site (build output)

### Key Features
- **Neural node animations**: Rotating active states with visual effects
- **Smooth scrolling**: Button interactions for navigation
- **Email signup form**: Client-side validation with toast notifications
- **Tooltip system**: Hover tooltips on interactive elements
- **Responsive design**: Mobile-first with Tailwind breakpoints

### Data Management
- All content stored in `src/_data/*.json` files
- Eleventy's data cascade automatically loads JSON files
- Templates use Nunjucks syntax: `{{ variable }}` and `{% for %}` loops

### Development Notes
- Eleventy serves on port 8080 with live reload
- Tailwind watches for file changes in development
- CSS custom properties define the complete design system
- All animations use CSS-only where possible, minimal JavaScript
- Production builds minify CSS and optimize assets