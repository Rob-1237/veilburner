TRATEGY FOR PRODUCTION DEPLOYMENT

  Phase 1: Social Media & SEO Meta Tags (CRITICAL)

  1. Add to Layout.astro <head> section:
    - Open Graph meta tags (title, description, image, url, type)
    - Twitter Card meta tags
    - Canonical URL (using https://veilburner.band)
    - Create/add a social sharing image (1200x630px recommended) to /public/images/
  2. Update dynamic meta per page:
    - Homepage: Band description + band photo
    - Listen pages: Album-specific description + album cover as OG image
    - Archive: Press/media description

  Phase 2: Web Manifest Enhancement

  1. Add missing required fields to site.webmanifest:
    - description, start_url, scope, categories, orientation
    - Consider adding shortcuts for quick access to Listen/Archive
  2. Fix favicon reference:
    - Either generate the missing favicon-32x32.png or remove that link tag

  Phase 3: Additional Production Touches

  1. Create robots.txt in /public/ to explicitly welcome crawlers
  2. Consider adding a sitemap (sitemap.xml) for better SEO
  3. Update default description from "Unofficial fan site" to something more professional
  4. Test PWA installation on mobile before launch

  Phase 4: Pre-Launch Checklist

  1. Test social sharing on:
    - Facebook Sharing Debugger
    - Twitter Card Validator
    - LinkedIn Post Inspector
  2. Test PWA installation on iOS Safari and Android Chrome
  3. Verify all images load correctly at new domain
  4. Check Lighthouse scores (aim for 90+ on all metrics)

  ---
  PRIORITY ORDER

  Must-do before deployment:
  1. ✅ Add Open Graph & Twitter Card meta tags (without these, social sharing looks unprofessional)
  2. ✅ Complete web manifest fields
  3. ✅ Create social sharing images

  Should-do before deployment:
  4. Add robots.txt
  5. Fix favicon-32x32 reference
  6. Update default description

  Nice-to-have:
  7. Add sitemap.xml
  8. Add manifest shortcuts

  ---
  This is a well-built site, but the missing social meta tags are critical for a band's online presence. Metal fans share music links constantly on Discord, Reddit, Instagram stories, etc. - you need those rich previews working perfectly.

  Ready for me to implement these fixes?

  📋 Pre-Deployment Testing Checklist

  Before going live tomorrow:
  1. Test social sharing at https://developers.facebook.com/tools/debug/
  2. Test Twitter cards at https://cards-dev.twitter.com/validator
  3. Test PWA installation on a mobile device
  4. Build and preview: npm run build && npm run preview

  Your site is now production-ready for veilburner.band