# Personal website

An Astro website intended for academic writing and information dissemination.

## Local development

Install dependencies once:

```sh
npm install
```

Start the local site:

```sh
npm run dev
```

Astro prints the local URL, normally `http://localhost:4321`.

To test the production build with Cloudflare Pages Functions locally, first
initialize the local visit-counter database once, then start Wrangler:

```sh
npm run db:local:setup
npm run dev:cloudflare
```

Wrangler normally serves the Cloudflare-local version at
`http://localhost:8788`. The database state stays local under `.wrangler/`.

## Production check

```sh
npm run build
npm run preview
```

## Deployment direction

The site is static by default and is intended for Cloudflare Pages. If backend
features are added later, use Cloudflare Workers-compatible APIs and do not
assume a permanently running Node.js server.

The only current serverless feature is the public visit counter. Its endpoint
is `functions/api/visits.ts`, and Cloudflare Pages should invoke Functions only
for `/api/*` according to `public/_routes.json`; ordinary pages remain static.

To activate the counter during deployment:

1. Create a Cloudflare D1 database for the website.
2. Apply `migrations/0001_visit_counter.sql` to that database.
3. Bind it to the Pages project using the variable name `VISITS_DB`.
4. Redeploy the Pages project.

Cloudflare operations use the project-local Wrangler dependency. Authenticate
once with `npx wrangler login`; after the Pages project and D1 binding are
configured, deploy from the terminal with `npm run deploy:cloudflare`.

The counter stores one aggregate integer. It does not store IP addresses,
locations, user agents, or individual visit records. A browser session
increments the counter once; subsequent page loads in that session only read
the total.

## Analytics and privacy

Cloudflare Web Analytics is enabled for the Cloudflare Pages deployment. It
collects aggregate traffic and performance metrics without using cookies or
local storage to identify visitors. Cloudflare injects its beacon into the
production site during deployment.

Google Analytics uses the existing GA4 stream `G-EBZQ5EGPT5`. Its tag is
available on every page but follows basic consent mode: it is not downloaded and
no data is sent to Google until a visitor selects **Allow analytics**. The
preference is stored only in that browser and can be changed from the site
footer.

Google Analytics never loads on `localhost` or `127.0.0.1`, and Cloudflare only
injects its beacon into the Cloudflare deployment, so local development does not
pollute production reports.

Planned, but deliberately not included in the first version:

- Giscus comments
- Site search
- AI-assisted search

## Writing

Markdown articles live in `src/content/writing`. Each article has structured
metadata for its title, description, publication date, label, tags, and archive
status. Set `draft: true` in an article's frontmatter while it is unfinished:

```yaml
draft: true
```

Drafts remain visible and carry a **Draft** label during `npm run dev`, but
production builds omit them from the homepage, the writing archive, and the
generated article routes. Remove the field or set it to `false` to publish the
article. The initial collection contains three informal posts migrated from the
previous Jekyll website.

Typography references for a later design iteration are recorded in
[`docs/typography-notes.md`](docs/typography-notes.md).
