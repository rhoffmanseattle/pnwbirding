# Puget Sound Birding

Static site listing bird watching locations around Puget Sound, with a map,
seasonal bird highlights, effort ratings, and live recent sightings from eBird.

Live at https://pnwbirding.longwalkhome.net

## Stack

- [Astro](https://astro.build) static site, no client framework
- [Leaflet](https://leafletjs.com) + OpenStreetMap for maps
- One Netlify Function (`netlify/functions/ebird.mjs`) that proxies the eBird
  API so the key stays server-side

## Develop

```bash
npm install
npm run dev          # site only; live sightings section will show its fallback
```

To exercise the eBird function locally, use the Netlify CLI:

```bash
npm install -g netlify-cli
cp .env.example .env  # put the real key in .env
netlify dev
```

## Deploy

Push to the connected Git repo; Netlify builds with `npm run build` and
publishes `dist/`. Set the `EBIRD_API_KEY` environment variable in
Netlify site settings.

## Editing content

All location content lives in `src/data/locations.json`. Add a location there
(including its eBird `locId`), add the same `locId` to the allowlist in
`netlify/functions/ebird.mjs`, and the map, list, and detail page appear
automatically on the next build.
