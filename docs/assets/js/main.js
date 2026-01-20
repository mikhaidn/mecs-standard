// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Generate table of contents
    generateTOC();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Highlight active nav item
    highlightActiveNav();
});

// Generate table of contents from headings
function generateTOC() {
    const toc = document.getElementById('toc');
    if (!toc) return;

    const article = document.querySelector('.doc-body');
    if (!article) return;

    const headings = article.querySelectorAll('h2, h3');
    if (headings.length === 0) return;

    const ul = document.createElement('ul');

    headings.forEach((heading, index) => {
        // Add ID to heading if it doesn't have one
        if (!heading.id) {
            heading.id = 'heading-' + index;
        }

        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#' + heading.id;
        a.textContent = heading.textContent;

        if (heading.tagName === 'H3') {
            li.style.paddingLeft = '1rem';
        }

        li.appendChild(a);
        ul.appendChild(li);
    });

    toc.appendChild(ul);
}

// Highlight active navigation item
function highlightActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav a, .sidebar-nav a');

    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
}

// Copy code button
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('pre code').forEach(function(codeBlock) {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.textContent = 'Copy';

        button.addEventListener('click', function() {
            navigator.clipboard.writeText(codeBlock.textContent).then(function() {
                button.textContent = 'Copied!';
                setTimeout(function() {
                    button.textContent = 'Copy';
                }, 2000);
            });
        });

        const pre = codeBlock.parentNode;
        if (pre.parentNode.classList.contains('highlight')) {
            pre.parentNode.appendChild(button);
        } else {
            pre.appendChild(button);
        }
    });
});
