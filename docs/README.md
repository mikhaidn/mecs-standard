## MECS Documentation Website

This directory contains the Jekyll-based documentation website for MECS (Modular Educational Content Standard).

## Quick Start

### Prerequisites

- Ruby 2.7 or higher
- Bundler gem

### Local Development

1. **Install dependencies:**
   ```bash
   cd docs
   bundle install
   ```

2. **Run Jekyll locally:**
   ```bash
   bundle exec jekyll serve
   ```

3. **View the site:**
   Open http://localhost:4000 in your browser

4. **Live reload:**
   Jekyll will automatically rebuild when you save changes to files.

## Project Structure

```
docs/
├── _config.yml           # Jekyll configuration
├── _layouts/             # Page templates
│   ├── default.html      # Base layout
│   └── docs.html         # Documentation layout
├── _includes/            # Reusable components
│   ├── header.html       # Site header
│   ├── footer.html       # Site footer
│   └── sidebar.html      # Documentation sidebar
├── assets/
│   ├── css/
│   │   └── main.scss     # Styles
│   └── js/
│       └── main.js       # JavaScript
├── getting-started/      # Getting started guides
├── documentation/        # Core documentation
├── resources/            # Resources and tools
├── community/            # Community pages
└── index.md             # Homepage
```

## Adding Content

### Creating a New Page

1. Create a new markdown file in the appropriate directory
2. Add front matter:
   ```yaml
   ---
   layout: docs
   title: Your Page Title
   description: Optional description
   ---
   ```
3. Write your content in Markdown

### Navigation

Edit `_config.yml` to add items to the main navigation:

```yaml
nav:
  - title: Your Section
    url: /your-section/
    subnav:
      - title: Subsection
        url: /your-section/subsection/
```

Edit `_includes/sidebar.html` to add items to the documentation sidebar.

## Deployment

### GitHub Pages (Automatic)

The site is automatically deployed to GitHub Pages when you push to the `main` branch.

**Setup:**
1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Push to main branch
4. GitHub Actions will build and deploy automatically

### Manual Deployment

Build the site for production:

```bash
JEKYLL_ENV=production bundle exec jekyll build
```

The built site will be in `_site/` directory.

## Customization

### Theme Colors

Edit colors in `assets/css/main.scss`:

```scss
$primary-color: #3498db;
$secondary-color: #2ecc71;
$accent-color: #e67e22;
// ... etc
```

### Site Configuration

Edit `_config.yml`:

```yaml
title: MECS
description: Your description
url: "https://your-domain.com"
```

## Features

### Syntax Highlighting

Code blocks are automatically highlighted:

````markdown
```json
{
  "mecsVersion": "0.2.0",
  "type": "mecs:course"
}
```
````

### Table of Contents

For documentation pages, a TOC is automatically generated from H2 and H3 headings.

### Mobile Responsive

The site is fully responsive and works on all device sizes.

### SEO Optimized

Uses `jekyll-seo-tag` for meta tags, Open Graph, and Twitter Cards.

## Development Tips

### Watch for Changes

Jekyll automatically rebuilds when files change. If it's not working:

```bash
bundle exec jekyll serve --livereload
```

### Clear Cache

If changes aren't appearing:

```bash
bundle exec jekyll clean
bundle exec jekyll serve
```

### Check Build Errors

Jekyll will show errors in the terminal. Common issues:
- Missing front matter
- Invalid YAML
- Broken links
- Missing layouts

## Plugins

Currently using:
- `jekyll-feed` - Generates RSS feed
- `jekyll-seo-tag` - SEO meta tags
- `jekyll-sitemap` - Generates sitemap.xml

Add more plugins in `Gemfile` and `_config.yml`.

## Performance

### Optimization Tips

1. **Images**: Compress images before adding them
2. **CSS**: SCSS is compiled and minified in production
3. **JS**: Minify JavaScript files
4. **Caching**: GitHub Pages has built-in CDN

### Build Time

- Local builds: ~2-5 seconds
- GitHub Pages builds: ~30-60 seconds

## Troubleshooting

### Dependency Issues

```bash
bundle update
bundle install
```

### Jekyll Won't Start

Check Ruby version:
```bash
ruby --version  # Should be 2.7 or higher
```

Reinstall dependencies:
```bash
bundle install --force
```

### Styles Not Loading

Check that `main.scss` has front matter:
```yaml
---
---
```

Clear Jekyll cache:
```bash
bundle exec jekyll clean
```

### GitHub Pages Build Failing

1. Check GitHub Actions logs
2. Verify `Gemfile` only has GitHub Pages compatible gems
3. Check Jekyll version compatibility

## Contributing

1. Create a feature branch
2. Make your changes
3. Test locally
4. Submit a pull request

## Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Liquid Template Language](https://shopify.github.io/liquid/)
- [Kramdown Syntax](https://kramdown.gettalong.org/syntax.html)

## Support

- GitHub Issues: [Report a bug](https://github.com/mikhaidn/mecs-standard/issues)
- Discussions: [Ask a question](https://github.com/mikhaidn/mecs-standard/discussions)

---

Built with ❤️ using Jekyll
