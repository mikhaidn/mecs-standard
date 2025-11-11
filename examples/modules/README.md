# MECS Modules

This directory contains standalone MECS modules that can be imported into courses via URL.

## Hosting Modules

Modules can be hosted anywhere as static JSON files:

### Option 1: GitHub Pages

1. Enable GitHub Pages in your repo settings
2. Your modules will be available at:
   ```
   https://<username>.github.io/<repo>/examples/modules/python-functions.json
   ```

### Option 2: GitHub Raw Content

Use the raw GitHub URL directly:
```
https://raw.githubusercontent.com/<username>/<repo>/main/examples/modules/python-functions.json
```

### Option 3: CDN or Static Hosting

Upload to any CDN or static host:
- Netlify
- Vercel
- AWS S3
- Cloudflare Pages

## Using a Module in a Course

Reference the module URL in a course section with `contentType: "mecs:module-ref"`:

```json
{
  "id": "imported-module",
  "title": "Python Functions (Imported)",
  "contentType": "mecs:module-ref",
  "content": {
    "url": "https://example.com/path/to/module.json"
  }
}
```

When a MECS-compatible platform loads this course, it will:
1. Fetch the module JSON from the URL
2. Validate it against the module schema
3. "Unfurl" the module by inserting all its sections into the course

## Example Modules

- **python-functions.json** - Learn Python functions with parameters, return values, and scope

## Testing Locally

For local testing, you can use relative paths or run a local HTTP server:

```bash
# Python 3
python -m http.server 8000

# Then access at:
# http://localhost:8000/examples/modules/python-functions.json
```
