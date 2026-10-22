# HoneyHollow by HoneyMouse · v0.4.1

This is a **playable source-code update** for the HoneyHollow Discord Activity prototype. It is a Vite application with a Discord SDK readiness handshake. It is **not** a hosted, server-authoritative multiplayer game.

## Newly playable features

- **Pet habitat:** New **🌿 Habitat** tab, three scenery choices, up to four freely discovered pet residents, CSS wandering animations, timed harvests every 12 minutes, and affinity-based ingredient yields. Up to three harvest intervals accrue while the page is closed.
- **Recipe book progression:** Two available starter drinks; six additional recipes unlock through the number of drinks served plus an earned-coin purchase. Recipes visibly show required reputation and price.
- **Café room themes:** Four room color palettes. Honey Cottage comes free; Berry Parlor, Moonlight Lounge, and Mint Tea Room unlock with game coins. Themes alter the rendered room wall and floor, with no pay-to-win bonuses.
- **Decorating:** Category filters for furniture and the previous click-to-place, drag-to-move, rotate, and remove controls. Multiple copies may be placed after unlocking an item.
- **Continued systems:** Explore with pets for ingredients, rarity-dependent drops, pet feeding/cuddling, crafting drinks, local-calendar daily rewards, and ingredient collection.
- **Save migration:** On first load, v0.4.1 reads the v0.4 browser save (`honeyhollow-game-v4`) and migrates progress into `honeyhollow-game-v41`. Old currency, pets, pantry, furniture and day stamps remain intact.

## Updating GitHub and Vercel

1. **Back up your working version.** This ZIP is a full source replacement, not a standalone compiled `dist` folder.
2. Extract the ZIP and upload the contents (not the containing directory) to your existing `honeyhollow-activity` GitHub repository, preserving `src/`, `public/assets/`, and `test/`.
3. Keep `index.html`, `package.json`, and `vercel.json` at the repository root.
4. In Vercel keep the preset **Vite**, build command **`npm run build`** (or `vite build`), output directory **`dist`**, and root directory `./`.
5. Commit the update and confirm Vercel's build succeeds. Then reload your site and Discord Activity. If you changed Vercel domains, update your Discord Activity URL mapping.

Local commands: `npm install`, `npm test`, `npm run build`, `npm run dev` (Node.js 20.19+ or 22.12+ recommended).

## Important product limitations

This is a **client-side development prototype**. Saves are local browser/Discord iframe storage and cannot synchronize across devices. Rewards, pet discoveries and timers rely on the client's clock, so players could manipulate them. The Discord SDK `ready()` signal is present, but authenticated user account linking, multiplayer shared saves, secure transactions, and billing are **not yet implemented**. Do not accept money for in-game assets until secure backend persistence and purchase verification are implemented. The habitat animals use lightweight emoji/CSS animations rather than rigged character models. The drink artwork is stylized SVG, not hand-painted anime art.

## Testing

`npm test` runs 13 automated rule tests, including save migration, habitat cap and rewards, starter and unlocked drinks, furniture placement, cosmetics, pet rarities, and daily resets across a DST change. JavaScript syntax checks also pass. A local Vite production build could not run in the authoring environment because dependency packages were unavailable offline; Vercel should be used to verify the production build.
