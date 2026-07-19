# Dimah Albarghash — Portfolio

A personal portfolio website for Dimah Albarghash, a senior Management Information Systems student at King Saud University focused on business analysis. Built as a simple static site with no frameworks, so it's ready to host on GitHub Pages as-is.

## File structure

```
.
├── index.html      # All page content and structure
├── style.css       # All styling, including responsive layout
├── script.js       # Navigation behavior and editable links
└── README.md       # This file
```

## Viewing it locally

No build step or install required. Just open `index.html` in any modern browser — double-click the file, or drag it into a browser window.

## Contact and project links

The email address, phone number, LinkedIn profile, project files, and project websites are stored near the top of `script.js` inside the `portfolioLinks` object.

Current contact details:

- Email: `dimahalbarghash@gmail.com`
- Phone: `+966 54 093 9105`
- LinkedIn: `https://www.linkedin.com/in/dimah-albarghash-587035330/`

If a link changes later, update it inside `portfolioLinks`.

Make sure every Google Drive file used for a project is shared with:

**Anyone with the link → Viewer**

Otherwise visitors will not be able to open the project files.

## Publishing to GitHub Pages

1. Create a new GitHub repository (or use an existing one).
2. Add these four files to the root of the repository (or to a `/docs` folder, if you prefer).
3. In the repository settings, go to **Pages** and set the source to the branch/folder containing `index.html`.
4. GitHub will publish the site at `https://<your-username>.github.io/<repository-name>/`.

No npm, no build commands, no server — just static files.

## Notes

- The site uses only semantic HTML5, modern CSS, and vanilla JavaScript.
- It's fully responsive, from small phones up through desktop.
- The mobile menu, active navigation highlighting, and smooth scrolling are handled in `script.js`; all core content remains visible even if JavaScript is disabled.
