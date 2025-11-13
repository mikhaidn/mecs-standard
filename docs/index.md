---
layout: default
title: Home
---

<div class="hero">
    <div class="container">
        <div class="hero-content">
            <h1 class="hero-title">Modular Educational Content Standard</h1>
            <p class="hero-subtitle">Universal JSON format for educational content that works across platforms</p>
            <div class="hero-cta">
                <a href="{{ '/getting-started/' | relative_url }}" class="btn btn-primary">Get Started</a>
                <a href="{{ '/docs/' | relative_url }}" class="btn btn-secondary">Read the Docs</a>
                <a href="{{ site.mecs.github_url }}" class="btn btn-tertiary" target="_blank">
                    <svg height="16" viewBox="0 0 16 16" width="16" style="vertical-align: text-bottom;">
                        <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                    </svg>
                    GitHub
                </a>
            </div>
        </div>
    </div>
</div>

<div class="features">
    <div class="container">
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">📄</div>
                <h3>Simple</h3>
                <p>Just JSON - easy to read, write, and understand. No complex XML or proprietary formats.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🔄</div>
                <h3>Portable</h3>
                <p>Create once, use anywhere. Move courses between platforms without vendor lock-in.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🧩</div>
                <h3>Modular</h3>
                <p>Import external modules via URL. Share and reuse content across courses and institutions.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🔧</div>
                <h3>Extensible</h3>
                <p>Add custom content types while maintaining compatibility with the standard.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🌐</div>
                <h3>Open</h3>
                <p>CC0 licensed. Free to use for any purpose. Community-driven development.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">⚡</div>
                <h3>Modern</h3>
                <p>Built for today's web. Works with static hosting, CDNs, and modern frameworks.</p>
            </div>
        </div>
    </div>
</div>

<div class="quick-example">
    <div class="container">
        <h2>Quick Example</h2>
        <p>Here's what a simple MECS course looks like:</p>

```json
{
  "mecsVersion": "0.2.0",
  "type": "mecs:course",
  "title": "Introduction to Programming",
  "sections": [
    {
      "title": "Welcome",
      "contentType": "mecs:text",
      "content": {
        "format": "markdown",
        "text": "# Hello World\n\nLet's learn programming!"
      }
    },
    {
      "title": "First Video",
      "contentType": "mecs:video",
      "content": {
        "url": "https://youtube.com/watch?v=..."
      }
    },
    {
      "title": "Python Functions",
      "contentType": "mecs:module-ref",
      "content": {
        "url": "https://example.com/modules/python-functions.json"
      }
    }
  ]
}
```

<p class="example-caption">The module URL unfurls into complete sections, just like video URLs unfurl into players.</p>

<a href="{{ '/docs/core/' | relative_url }}" class="btn btn-primary">Learn More →</a>

</div>
</div>

<div class="use-cases">
    <div class="container">
        <h2>Use Cases</h2>
        <div class="use-cases-grid">
            <div class="use-case-card">
                <h3>🏫 K-12 & Higher Ed</h3>
                <p>Share curriculum across schools and districts. Create portable course materials that work with any LMS.</p>
            </div>
            <div class="use-case-card">
                <h3>💼 Corporate Training</h3>
                <p>Build training content once, deploy across your organization. Easy to update and maintain.</p>
            </div>
            <div class="use-case-card">
                <h3>🌍 MOOCs & Online Learning</h3>
                <p>Create platform-independent courses. Students can take their learning anywhere.</p>
            </div>
            <div class="use-case-card">
                <h3>📚 Content Marketplaces</h3>
                <p>Build a marketplace where educators share and sell standardized course content.</p>
            </div>
        </div>
    </div>
</div>

<div class="community">
    <div class="container">
        <h2>Community</h2>
        <p>MECS is an open standard developed by the community, for the community.</p>
        <div class="community-stats">
            <div class="stat">
                <div class="stat-number">v{{ site.mecs.current_version }}</div>
                <div class="stat-label">Current Version</div>
            </div>
            <div class="stat">
                <div class="stat-number">4</div>
                <div class="stat-label">Content Types</div>
            </div>
            <div class="stat">
                <div class="stat-number">CC0</div>
                <div class="stat-label">License</div>
            </div>
        </div>
        <div class="community-cta">
            <a href="{{ '/community/' | relative_url }}" class="btn btn-primary">Join the Community</a>
            <a href="{{ site.mecs.github_url }}/issues" class="btn btn-secondary" target="_blank">Report an Issue</a>
        </div>
    </div>
</div>

<div class="get-started-footer">
    <div class="container">
        <h2>Ready to get started?</h2>
        <p>Choose your path based on your role:</p>
        <div class="path-cards">
            <a href="{{ '/getting-started/creators/' | relative_url }}" class="path-card">
                <h3>📝 Content Creators</h3>
                <p>Learn how to create and publish MECS courses</p>
            </a>
            <a href="{{ '/getting-started/developers/' | relative_url }}" class="path-card">
                <h3>💻 Developers</h3>
                <p>Integrate MECS into your platform</p>
            </a>
            <a href="{{ '/getting-started/institutions/' | relative_url }}" class="path-card">
                <h3>🏛️ Institutions</h3>
                <p>Adopt MECS for your organization</p>
            </a>
        </div>
    </div>
</div>
