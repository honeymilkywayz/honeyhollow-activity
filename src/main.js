import { DiscordSDK } from '@discord/embedded-app-sdk';
import './style.css';
import {
  INGREDIENTS, PETS, ZONES, RECIPES, DECOR, MAX_ENERGY, SAVE_KEY,
  createProfile, migrateProfile, timezone, dailyInfo, claimDaily,
  canBrew, brew, energyOf, petCare, getPet, explore,
  assignPet, buyDecor as shopDecor, addPlacement, movePlacement,
  rotatePlacement, removePlacement, selectPlacement, getPlacement,
  getDecor, progressLevel, progressStage, RARITY_COLORS,
  HABITAT_THEMES, CAFE_THEMES, recipeUnlockInfo, unlockRecipe,
  setHabitatResidents, setHabitatTheme, habitatStatus, harvestHabitat,
  purchaseCafeTheme, setCafeTheme, PREVIOUS_SAVE_KEY
} from './game.mjs';

const DISCORD_APP_ID = '1562250256371154985';
const query = new URLSearchParams(location.search);
const isDiscord = ['frame_id','instance_id','channel_id'].some((k)=>query.has(k));
const connection = document.querySelector('#connectionStatus');
if(isDiscord){
  connection.textContent='⏳ Connecting to Discord';
  try{
    const sdk = new DiscordSDK(DISCORD_APP_ID);
    sdk.ready().then(()=>{ connection.textContent='✅ Discord Activity'; }).catch(()=>{ connection.textContent='⚠️ Discord preview'; });
  }catch(err){
    console.warn(err);
    connection.textContent='⚠️ Discord SDK';
  }
}else connection.textContent='🌐 Browser demo';

let profile;
let storageAvailable=true;
try{
  const current = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
  const previous = current || JSON.parse(localStorage.getItem(PREVIOUS_SAVE_KEY) || 'null');
  profile = migrateProfile(previous, Date.now(), timezone());
}catch{
  storageAvailable=false;
  profile = createProfile();
}
const save=()=>{ try{ localStorage.setItem(SAVE_KEY, JSON.stringify(profile)); }catch{ storageAvailable=false; } };
save();

const main=document.querySelector('#main');
const toastEl=document.querySelector('#toast');
const ui={
  page:'home',
  zone:'meadow',
  viewedPetId:profile.activePetId,
  selectedDecorId:profile.ownedDecor[0] || DECOR[0].id,
  decorCategory:'All',
  toastTimer:0
};
const dragging={ id:null, offsetX:0, offsetY:0, started:false };

const petById=(id)=>PETS.find(x=>x.id===id);
const recipeById=(id)=>RECIPES.find(x=>x.id===id);
const esc=(s)=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');
const onHand=(id)=>profile.inventory[id]||0;
const activePet = ()=> getPet(profile, profile.activePetId);
const activePetDef = ()=> petById(profile.activePetId);

function toast(message){
  toastEl.textContent=message;
  toastEl.classList.add('show');
  clearTimeout(ui.toastTimer);
  ui.toastTimer=setTimeout(()=>toastEl.classList.remove('show'), 3600);
}

function heading(eyebrow,title,description){
  return `<div class="heading-block"><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${description}</p></div>`;
}
function chip(label, cls=''){ return `<span class="chip ${cls}">${label}</span>`; }
function ingredientPill(id,count=1, check=false){
  const item=INGREDIENTS[id];
  const enough = onHand(id)>=count;
  return `<span class="ingredient-pill ${check?(enough?'ok':'missing'):''}"><span class="bubble" style="--bubble:${item.color}">${item.icon}</span><b>${item.name}</b><small>${check?`${onHand(id)}/`:''}${count}</small></span>`;
}
function rarityTag(rarity){ return `<span class="rarity-tag" style="--rarity:${RARITY_COLORS[rarity]||'#ddd'}">${rarity}</span>`; }
function progressBar(percent){ return `<div class="progress"><b style="width:${Math.max(0,Math.min(100,percent))}%"></b></div>`; }

function recipeArt(recipe){
  const [base,cream,accent]=recipe.palette;
  const isTall=['tall','boba'].includes(recipe.cup);
  const isBoba=recipe.cup==='boba';
  const isTea=recipe.cup==='teacup';
  const gid=`drink-${recipe.id}`;
  return `<svg class="drink-art" viewBox="0 0 180 180" role="img" aria-label="${esc(recipe.name)} drink art">
  <defs>
    <linearGradient id="${gid}" x1="0" y1="0" x2="0.8" y2="1">
      <stop offset="0" stop-color="${cream}"/>
      <stop offset="0.34" stop-color="${base}"/>
      <stop offset="1" stop-color="${accent}"/>
    </linearGradient>
  </defs>
  <ellipse cx="90" cy="160" rx="56" ry="9" fill="#000" opacity=".08"/>
  ${isTall?`<path d="M50 35H132L124 132Q119 150 90 150Q61 150 56 132Z" fill="url(#${gid})" stroke="#c48ca2" stroke-width="4"/>`:`<path d="M42 76H138V126Q138 148 90 148Q42 148 42 126Z" fill="url(#${gid})" stroke="#b88498" stroke-width="4"/>`}
  ${isTea?`<path d="M140 88Q166 82 166 105Q166 126 140 122" fill="none" stroke="#d5a6b4" stroke-width="9" stroke-linecap="round"/>`:''}
  ${!isTall && !isTea ? `<path d="M138 88Q166 83 166 107Q166 126 138 122" fill="none" stroke="#d5a6b4" stroke-width="9" stroke-linecap="round"/>`:''}
  <path d="M58 ${isTall?42:70}Q90 ${isTall?31:58} 123 ${isTall?42:70}" fill="none" stroke="${cream}" stroke-width="12" stroke-linecap="round"/>
  <path d="M62 ${isTall?55:82}Q90 ${isTall?69:93} 118 ${isTall?55:82}" fill="none" stroke="#fff7f2" opacity="0.55" stroke-width="6" stroke-linecap="round"/>
  <path d="M68 ${isTall?42:70}Q79 ${isTall?20:46} 91 ${isTall?31:58}Q103 ${isTall?20:46} 114 ${isTall?42:70}" fill="${cream}" stroke="#fff7fa" stroke-width="3"/>
  ${isTall?`<path d="M110 38L125 12" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>`:''}
  ${isBoba?`<g fill="#7e4d61"><circle cx="67" cy="118" r="7"/><circle cx="84" cy="126" r="7"/><circle cx="103" cy="119" r="7"/><circle cx="118" cy="129" r="7"/></g>`:''}
  <g>
    <circle cx="58" cy="44" r="8" fill="#fff4fb" opacity=".7"/>
    <circle cx="122" cy="58" r="5" fill="#fff4fb" opacity=".5"/>
  </g>
  <text x="90" y="24" font-size="22" text-anchor="middle">${recipe.category==='Latte'?'☕':recipe.category==='Boba'?'🧋':recipe.category==='Mocha'?'⭐':recipe.category==='Tea'?'✨':'🍓'}</text>
  </svg>`;
}

function ingredientCard(id){
  const item=INGREDIENTS[id];
  return `<div class="ingredient-card"><div class="icon-shell" style="--shell:${item.color}">${item.icon}</div><strong>${item.name}</strong><small>${item.desc}</small><span>Owned: ${onHand(id)}</span></div>`;
}

function petPortrait(spec){
  const [a,b]=spec.colors;
  return `<div class="pet-portrait" style="--a:${a};--b:${b}"><div class="pet-face">${spec.id.includes('bee')?'🐝':spec.id.includes('fox')?'🦊':spec.id.includes('otter')?'🦦':spec.id.includes('lynx')?'🐱':spec.id.includes('bat')?'🦇':spec.id.includes('kit')?'🐈':'🐭'}</div><div class="pet-nameplate">${spec.name}</div></div>`;
}

function renderHome(){
  const daily=dailyInfo(profile);
  const latest=(profile.log||[]).slice(0,4).map((x)=>`<li>♥ ${esc(x.message)}</li>`).join('') || '<li>Start an expedition to begin your story.</li>';
  main.innerHTML = heading('HONEYMOUSE PRESENTS','HoneyHollow v0.4','A cozy café management game demo with collectible pets, illustrated drinks, a lively habitat, and flexible decorating.') + `
  <section class="hero-card">
    <div class="hero-copy">
      <div class="hero-badge">🍯 Explore → Brew → Decorate → Befriend → Habitat</div>
      <h2>A magical café and a tiny pet sanctuary.</h2>
      <p>Gather beautifully styled ingredients, brew dreamy drinks, and let your pet companions support every outing. Decorating is now more advanced, with free placement and draggable furniture inside your room.</p>
      <div class="hero-actions">
        <button class="button primary" data-page="explore">Go Exploring</button>
        <button class="button soft" data-page="decorate">Decorate Café</button>
      </div>
      <div class="stat-strip">
        <div><strong>${profile.coins}</strong><span>Coins</span></div>
        <div><strong>${profile.pets.length}/${PETS.length}</strong><span>Pets</span></div>
        <div><strong>${profile.serves}</strong><span>Drinks Served</span></div>
        <div><strong>${profile.explorations}</strong><span>Expeditions</span></div>
      </div>
    </div>
    <div class="hero-visual">
      ${recipeArt(RECIPES[3])}
      ${petPortrait(activePetDef())}
    </div>
  </section>
  <section class="grid-two">
    <article class="panel">
      <div class="section-head"><h3>🎁 Daily Login</h3>${chip(daily.claimable?'Ready to claim':'Claimed today', daily.claimable?'highlight':'')}</div>
      <p>Rewards follow the player's saved timezone and local day, making the cozy login loop clearer.</p>
      <div class="daily-mini">Streak: <strong>${profile.dailyStreak}</strong> · Timezone: <strong>${esc(profile.timezone)}</strong></div>
      <button class="button primary" data-page="daily">Open Daily Rewards</button>
    </article>
    <article class="panel">
      <div class="section-head"><h3>🌙 Hollow Diary</h3>${chip('Recent')}</div>
      <ul class="diary">${latest}</ul>
    </article>
  </section>
  <section class="grid-three compact-top">
    <article class="panel feature-panel"><h3>Anime-styled café items</h3><p>Drinks now read like collectible premium menu items rather than generic placeholders.</p></article>
    <article class="panel feature-panel"><h3>Companion-driven gathering</h3><p>Pets have rarities and affinities that influence what they bring back on expeditions.</p></article>
    <article class="panel feature-panel"><h3>Living pet habitat</h3><p>Let up to four companions wander in a cozy habitat and gather passive materials.</p></article>
  </section>`;
}

function renderExplore(){
  const current = ZONES.find((z)=>z.id===ui.zone) || ZONES[0];
  const pet=activePet();
  const petDef=activePetDef();
  main.innerHTML = heading('EXPLORE FOR MATERIALS','Send a pet on a gathering run','Each trip uses pet energy, gives ingredients and coins, and can unlock new pets to join your collection.') + `
  <section class="explore-wrap">
    <div>
      <div class="zone-grid">${ZONES.map((zone)=>`
        <button class="zone-card ${ui.zone===zone.id?'selected':''}" data-zone="${zone.id}" style="--zone-a:${zone.palette[0]};--zone-b:${zone.palette[1]}">
          <strong>${zone.emoji} ${zone.name}</strong>
          <small>${zone.desc}</small>
          <div class="zone-drops">${zone.drops.slice(0,4).map((id)=>`<span>${INGREDIENTS[id].icon}</span>`).join('')}</div>
        </button>`).join('')}</div>
      <div class="panel current-expedition">
        <div class="section-head"><h3>Companion</h3>${rarityTag(petDef.rarity)}</div>
        <div class="pet-row">${petPortrait(petDef)}<div><h2>${esc(pet.nickname)}</h2><p>${petDef.bonus}</p><div class="pet-numbers"><span>Level ${progressLevel(pet)}</span><span>⚡ ${energyOf(pet)}/${MAX_ENERGY}</span><span>💗 ${pet.bond}</span></div>${progressBar(((pet.xp%70)/70)*100)}</div></div>
        <div class="ingredient-flow"><strong>Likely finds:</strong>${current.drops.map((id)=>ingredientPill(id,1,false)).join('')}</div>
        <button class="button primary full" data-action="explore">Explore ${current.name}</button>
      </div>
    </div>
    <aside class="panel">
      <div class="section-head"><h3>Pet team</h3>${chip(`${profile.pets.length} unlocked`)}</div>
      <div class="pet-list tiny">${profile.pets.map((petState)=>{ const spec=petById(petState.id); return `<button class="pet-mini ${profile.activePetId===petState.id?'active':''}" data-action="assign" data-pet="${petState.id}"><span>${spec.colors[1] ? '✦' : '•'}</span><b>${petState.nickname}</b><small>${spec.affinity}</small></button>`; }).join('')}</div>
      <p class="micro">Inspired by cozy creature games, but reworked for HoneyHollow's café loop: pets don’t just look cute, they change what you gather.</p>
    </aside>
  </section>`;
}

function renderCafe(){
  main.innerHTML = heading('BREW · LEARN · GROW','Signature drinks & recipe book','Serve starter drinks to raise your reputation. Learn new recipes with earned coins, then gather their ingredients through adventures.')+`
  <div class="menu-progress panel"><strong>☕ Café Reputation · ${profile.serves} drinks served</strong><span>${profile.unlockedRecipes.length}/${RECIPES.length} recipes learned · Every recipe is earnable without paying</span></div>
  <section class="recipe-grid">${RECIPES.map((recipe)=>{
    const info=recipeUnlockInfo(profile,recipe.id);
    const unlocked=info.unlocked;
    return `<article class="recipe-card ${unlocked&&canBrew(profile,recipe.id)?'ready':''}">
      ${recipeArt(recipe)}
      <div class="recipe-copy"><div class="section-head"><h3>${recipe.name}</h3>${chip(`${recipe.reward} 🪙`,'highlight')}</div>
        <p>${recipe.subtitle}</p><div class="recipe-garnish">${recipe.garnish.map(g=>`<span>${g}</span>`).join('')}</div>
        <div class="recipe-need">${Object.entries(recipe.ingredients).map(([id,n])=>ingredientPill(id,n,unlocked)).join('')}</div>
        ${unlocked?`<button class="button ${canBrew(profile,recipe.id)?'primary':'soft'} full" data-action="brew" data-recipe="${recipe.id}" ${canBrew(profile,recipe.id)?'':'disabled'}>${canBrew(profile,recipe.id)?'Serve this drink':'Gather more ingredients'}</button>`:
        `<p class="micro">🔒 Requires ${info.serves} drinks served · ${info.coins} coins</p><button class="button soft full" data-action="unlock-recipe" data-recipe="${recipe.id}" ${info.ok?'':'disabled'}>${info.ok?'Learn this recipe':'Locked · keep serving'}</button>`}
      </div></article>`;
  }).join('')}</section>`;
}

function renderPets(){
  const viewed = petById(ui.viewedPetId) || petById(profile.activePetId);
  const owned = getPet(profile, viewed.id);
  const petState = owned || { xp:0, bond:0, energy:0 };
  main.innerHTML = heading('PET COLLECTION','Collect companions and care for them','Feed, cuddle, and assign pets to expeditions. Stronger rarities usually return with more or rarer materials, but every pet varies by affinity.') + `
  <section class="pet-screen">
    <div class="pet-roster">${PETS.map((spec)=>{ const has=!!getPet(profile, spec.id); return `<button class="roster-card ${ui.viewedPetId===spec.id?'selected':''} ${has?'':'locked'}" data-action="view-pet" data-pet="${spec.id}">${has?petPortrait(spec):'<div class="pet-portrait locked"><div class="pet-face">?</div><div class="pet-nameplate">Unknown</div></div>'}<strong>${has?spec.name:'Unknown Pet'}</strong><small>${spec.rarity}${has?'':' · undiscovered'}</small></button>`; }).join('')}</div>
    <div class="panel pet-focus">
      <div class="section-head"><h3>${viewed.name}</h3>${rarityTag(viewed.rarity)}</div>
      <div class="pet-focus-top">${petPortrait(viewed)}<div><p>${viewed.vibe}</p><div class="pet-numbers"><span>Affinity: ${viewed.affinity}</span><span>${viewed.bonus}</span></div>${owned?`${progressBar(((petState.xp%70)/70)*100)}<div class="pet-numbers"><span>Level ${progressLevel(petState)}</span><span>${progressStage(petState)}</span><span>💗 Bond ${petState.bond}</span><span>⚡ ${energyOf(petState)}/${MAX_ENERGY}</span></div>`:'<div class="discovery-tip">Explore the right zones to discover this companion for free.</div>'}</div></div>
      ${owned?`<div class="pet-actions-row"><button class="button primary" data-action="cuddle" data-pet="${viewed.id}" ${energyOf(petState)<1?'disabled':''}>Cuddle</button><button class="button soft" data-action="assign" data-pet="${viewed.id}">${profile.activePetId===viewed.id?'Assigned':'Use on Expeditions'}</button></div>
      <div class="snack-grid">${['berries','honey','milk','cream','mint'].map((id)=>`<button class="snack" data-action="feed" data-pet="${viewed.id}" data-ingredient="${id}" ${onHand(id)<1?'disabled':''}><span>${INGREDIENTS[id].icon}</span><b>${INGREDIENTS[id].name}</b><small>Owned ${onHand(id)}</small></button>`).join('')}</div>`:''}
    </div>
  </section>`;
}

function decorStage(){
  return `<div class="room-stage" id="roomStage" style="--room-wall:${CAFE_THEMES.find(t=>t.id===profile.cafeTheme)?.wall||'#fff4e0'}; --room-floor:${CAFE_THEMES.find(t=>t.id===profile.cafeTheme)?.floor||'#d6a984'};--room-trim:${CAFE_THEMES.find(t=>t.id===profile.cafeTheme)?.trim||'#bd866f'}">
    <div class="room-backdrop"><span>HoneyHollow Café Studio</span></div>
    <div class="room-floor"></div>
    ${profile.placements.map((p)=>{
      const decor=getDecor(p.decorId);
      const selected=profile.selectedPlacementId===p.uid;
      const [w,h]=decor.size;
      return `<button class="placement ${selected?'selected':''}" data-action="select-placement" data-placement="${p.uid}" style="left:${p.x}px; top:${p.y}px; width:${w}px; height:${h}px; transform:translate(-50%,-50%) rotate(${p.rot}deg); --item:${decor.color}; z-index:${10+p.z};"><span class="placement-icon">${decor.icon}</span><small>${decor.name}</small></button>`;
    }).join('')}
  </div>`;
}

function renderDecorate(){
  const selectedDecor = getDecor(ui.selectedDecorId) || getDecor(profile.ownedDecor[0]);
  const selectedPlacement = getPlacement(profile, profile.selectedPlacementId);
  const categories=['All',...new Set(DECOR.map(d=>d.category))];
  main.innerHTML = heading('ADVANCED DECORATE MODE','Place furniture more freely','Pick an owned furniture piece, then click inside the room to place it. Drag placed items to move them, rotate them for styling, or remove them to redesign the layout.') + `
  <section class="decorate-screen">
    <div>
      <div class="section-head"><h3>Interactive Café Room</h3>${chip(`${profile.placements.length} items placed`)}</div>
      ${decorStage()}
      <div class="build-hint">Selected décor: <strong>${selectedDecor?.name||'None'}</strong>. Click the room to place a copy. Drag a placed object to move it.</div>
    </div>
    <aside class="panel decor-sidebar">
      <div class="section-head"><h3>Décor Library</h3>${chip(`${profile.ownedDecor.length}/${DECOR.length} owned`)}</div>
      <div class="decor-filters">${categories.map(c=>`<button class="filter ${ui.decorCategory===c?'active':''}" data-action="filter-decor" data-category="${c}">${c}</button>`).join('')}</div><div class="decor-library">${DECOR.filter(d=>ui.decorCategory==='All'||d.category===ui.decorCategory).map((item)=>{ const owned=profile.ownedDecor.includes(item.id); return `<button class="decor-tile ${ui.selectedDecorId===item.id?'selected':''} ${owned?'owned':''}" data-action="select-decor" data-decor="${item.id}"><span>${item.icon}</span><b>${item.name}</b><small>${owned?'Owned':`${item.price} coins`}</small></button>`; }).join('')}</div>
      <div class="theme-picker"><h3>🎨 Café Themes</h3><div class="theme-grid">${CAFE_THEMES.map(t=>`<div class="theme-swatch" style="--theme:${t.wall};--trim:${t.trim}"><strong>${t.name}</strong>${profile.ownedThemes.includes(t.id)?`<button data-action="set-theme" data-theme="${t.id}" class="button soft">${profile.cafeTheme===t.id?'✓ Active':'Use theme'}</button>`:`<button data-action="buy-theme" data-theme="${t.id}" class="button soft">${t.price} 🪙</button>`}</div>`).join('')}</div></div>
      <div class="selected-card">${selectedDecor?`<strong>${selectedDecor.name}</strong><p>${selectedDecor.desc}</p>${profile.ownedDecor.includes(selectedDecor.id)?'<div class="micro">Owned · click room to place another copy.</div>':`<button class="button primary full" data-action="buy-decor" data-decor="${selectedDecor.id}">Buy for ${selectedDecor.price} coins</button>`}`:'No item selected.'}</div>
      <div class="placement-controls ${selectedPlacement?'':'disabled'}"><div class="section-head"><h3>Selected placed item</h3>${selectedPlacement?chip(getDecor(selectedPlacement.decorId).name):''}</div>
        ${selectedPlacement?`<button class="button soft full" data-action="rotate-placement" data-placement="${selectedPlacement.uid}">Rotate +15°</button><button class="button soft full" data-action="rotate-placement-left" data-placement="${selectedPlacement.uid}">Rotate -15°</button><button class="button soft full" data-action="delete-placement" data-placement="${selectedPlacement.uid}">Remove from room</button>`:'<p class="micro">Click a placed item to edit it.</p>'}
      </div>
    </aside>
  </section>`;
}

function renderHabitat(){
  const status=habitatStatus(profile);
  const theme=HABITAT_THEMES.find(t=>t.id===profile.habitat.theme)||HABITAT_THEMES[0];
  const residents=(profile.habitat.residents||[]).filter(id=>profile.pets.some(p=>p.id===id));
  main.innerHTML=heading('LITTLE COMPANIONS · BIG FEELINGS','Your pet habitat','Assign up to four pets to wander the habitat. They passively gather their favorite ingredients, even while you brew café drinks.')+`
  <section class="habitat-layout"><div>
    <div class="habitat-scene" style="--hab-a:${theme.colors[0]};--hab-b:${theme.colors[1]}">
      <div class="habitat-sky">☀︎ ✦</div><div class="habitat-hill"></div>
      <div class="habitat-hut">🏡</div>
      ${residents.map((id,i)=>{const pet=petById(id);return `<div class="wander-pet" style="--delay:${i*-2.1}s;--left:${16+(i%4)*20}%;--bottom:${18+(i%2)*15}%"><div class="wander-face">${pet.id.includes('bee')?'🐝':pet.id.includes('fox')?'🦊':pet.id.includes('bat')?'🦇':pet.id.includes('lynx')?'🐱':pet.id.includes('mew')?'🐱':'🐭'}</div><strong>${pet.name}</strong></div>`}).join('')}
      ${residents.length===0?'<p class="habitat-empty">Add a pet to bring your habitat to life!</p>':''}
    </div>
    <div class="panel habitat-harvest"><div><h3>🧺 Gather from your habitat</h3><p>${status.ready?`${status.batches} harvest bundle(s) ready!`:`Next harvest in ${Math.ceil(status.nextMs/60000)} minutes. Works while you are away.`}</p></div><button class="button primary" data-action="harvest" ${status.ready?'':'disabled'}>Collect ingredients</button></div>
    <div class="panel habitat-theme-panel"><h3>Habitat scenery</h3><div class="habitat-themes">${HABITAT_THEMES.map(t=>`<button class="habitat-theme ${profile.habitat.theme===t.id?'selected':''}" data-action="habitat-theme" data-theme="${t.id}" style="--theme-a:${t.colors[0]};--theme-b:${t.colors[1]}"><span>${t.emoji}</span><b>${t.name}</b></button>`).join('')}</div></div>
  </div><aside class="panel"><div class="section-head"><h3>🐾 Habitat residents</h3>${chip(`${residents.length}/4`)}</div><p>Choose up to four pets. Rarer pets gather larger bundles, and each species has its own favorite ingredient.</p>
  <div class="habitat-resident-list">${profile.pets.map(p=>{const pet=petById(p.id);const assigned=residents.includes(p.id);return `<button class="resident ${assigned?'assigned':''}" data-action="toggle-resident" data-pet="${p.id}"><span>${assigned?'💗':'＋'}</span><div><strong>${pet.name}</strong><small>${pet.rarity} · ${INGREDIENTS[pet.affinity]?.name||'Materials'}</small></div><b>${assigned?'Remove':'Add'}</b></button>`}).join('')}</div><p class="micro">Harvests accrue every 12 minutes while at least one pet lives here. Up to 3 harvest bundles can accumulate.</p></aside></section>`;
}

function renderDaily(){
  const info=dailyInfo(profile);
  const baseCoins=45 + Math.min(7, info.nextStreak)*15;
  main.innerHTML = heading('DAILY LOGIN','Claim once per local day',"Daily rewards are based on the player's saved timezone and when they began playing the activity.") + `
  <section class="grid-two">
    <article class="panel daily-panel">
      <div class="big-emoji-panel">🎁</div>
      <h2>${info.claimable?'Your reward is ready!':'Already claimed today'}</h2>
      <p>Current streak: <strong>${profile.dailyStreak}</strong> · Next claim follows local midnight in <strong>${esc(profile.timezone)}</strong>.</p>
      <div class="daily-reward-line">${chip(`${baseCoins} coins`, 'highlight')} ${chip('2 Sunhoney')} ${chip('1 Cloud Milk')} ${info.nextStreak%7===0?chip('2 Star Sugar','highlight'):''}</div>
      <button class="button primary full" data-action="claim-daily" ${info.claimable?'':'disabled'}>${info.claimable?'Claim today’s reward':'Claimed for today'}</button>
    </article>
    <article class="panel">
      <h3>Reward cycle</h3>
      <div class="streak-dots">${Array.from({length:7}, (_,i)=>`<span class="${i<((Math.max(0,profile.dailyStreak-1)%7)+1)&&profile.dailyStreak>0?'lit':''}">${i+1}</span>`).join('')}</div>
      <div class="pet-numbers spread"><span>First played: ${new Intl.DateTimeFormat('en-US',{dateStyle:'medium',timeStyle:'short',timeZone:profile.timezone}).format(new Date(profile.joinedAt))}</span><span>Today: ${info.today}</span><span>Claims: ${profile.dailyClaims}</span></div>
      <p class="micro">This prototype saves locally in the browser/Discord iframe, so rewards aren’t server authoritative yet.</p>
    </article>
  </section>`;
}

function renderInventory(){
  main.innerHTML = heading('INGREDIENT PANTRY','Your collectible materials','The anime-style café loop starts here: everything in the menu depends on ingredients earned through exploring with pets.') + `
  <section class="ingredient-grid">${Object.keys(INGREDIENTS).map(ingredientCard).join('')}</section>`;
}

function render(){
  document.querySelector('#coins').textContent=`🪙 ${profile.coins.toLocaleString()}`;
  document.querySelector('#petcount').textContent=`🐾 ${profile.pets.length}/${PETS.length}`;
  document.querySelectorAll('.tab').forEach((b)=>b.classList.toggle('active', b.dataset.page===ui.page));
  const sections={ home:renderHome, explore:renderExplore, cafe:renderCafe, collection:renderPets, decorate:renderDecorate, habitat:renderHabitat, daily:renderDaily, inventory:renderInventory };
  (sections[ui.page]||renderHome)();
  if(!storageAvailable){ const warn=document.createElement('div'); warn.className='save-warning'; warn.textContent='⚠️ Storage is unavailable; progress may not persist.'; main.prepend(warn); }
}

function setPage(page){ ui.page=page; render(); main.scrollTop=0; }

function handleAction(button){
  if(button.dataset.page){ setPage(button.dataset.page); return; }
  if(button.dataset.zone){ ui.zone=button.dataset.zone; render(); return; }
  const action=button.dataset.action;
  let result=null;
  switch(action){
    case 'explore':
      result=explore(profile, ui.zone); break;
    case 'brew':
      result=brew(profile, button.dataset.recipe); break;
    case 'unlock-recipe':
      result=unlockRecipe(profile,button.dataset.recipe); break;
    case 'toggle-resident':result=setHabitatResidents(profile,button.dataset.pet);break;
    case 'habitat-theme':result=setHabitatTheme(profile,button.dataset.theme);break;
    case 'harvest':result=harvestHabitat(profile);break;
    case 'filter-decor':ui.decorCategory=button.dataset.category;render();return;
    case 'buy-theme':result=purchaseCafeTheme(profile,button.dataset.theme);break;
    case 'set-theme':result=setCafeTheme(profile,button.dataset.theme);break;
    case 'view-pet':
      ui.viewedPetId=button.dataset.pet; render(); return;
    case 'assign':
      result=assignPet(profile, button.dataset.pet); if(result.ok) ui.viewedPetId=button.dataset.pet; break;
    case 'cuddle':
      result=petCare(profile, 'cuddle', null, Date.now(), button.dataset.pet); break;
    case 'feed':
      result=petCare(profile, 'feed', button.dataset.ingredient, Date.now(), button.dataset.pet); break;
    case 'select-decor':
      ui.selectedDecorId=button.dataset.decor; render(); return;
    case 'buy-decor':
      result=shopDecor(profile, button.dataset.decor); break;
    case 'select-placement':
      selectPlacement(profile, button.dataset.placement); render(); return;
    case 'rotate-placement':
      result=rotatePlacement(profile, button.dataset.placement, 15); break;
    case 'rotate-placement-left':
      result=rotatePlacement(profile, button.dataset.placement, -15); break;
    case 'delete-placement':
      result=removePlacement(profile, button.dataset.placement); break;
    case 'claim-daily':
      result=claimDaily(profile); break;
  }
  if(result){
    if(result.ok){
      save();
      if(action==='explore' && result.discovered && !result.duplicate) ui.viewedPetId=result.discovered.id;
      toast(result.message);
    }else toast(result.message);
    render();
  }
}

document.addEventListener('click', (ev)=>{
  const button=ev.target.closest('button');
  if(!button || button.disabled) return;
  if(dragging.started){ dragging.started=false; return; }
  handleAction(button);
});

function stagePoint(ev){
  const stage=document.querySelector('#roomStage');
  if(!stage) return null;
  const rect=stage.getBoundingClientRect();
  return { x:ev.clientX-rect.left, y:ev.clientY-rect.top, rect, stage };
}

main.addEventListener('pointerdown', (ev)=>{
  const placement=ev.target.closest('.placement');
  if(!placement) return;
  const pos=stagePoint(ev);
  if(!pos) return;
  const id=placement.dataset.placement;
  const item=getPlacement(profile,id);
  if(!item) return;
  dragging.id=id;
  dragging.offsetX=pos.x-item.x;
  dragging.offsetY=pos.y-item.y;
  dragging.started=false;
  selectPlacement(profile,id);
  placement.setPointerCapture?.(ev.pointerId);
});

main.addEventListener('pointermove', (ev)=>{
  if(!dragging.id) return;
  const pos=stagePoint(ev);
  if(!pos) return;
  dragging.started=true;
  const x=Math.max(30, Math.min(pos.rect.width-30, pos.x-dragging.offsetX));
  const y=Math.max(48, Math.min(pos.rect.height-18, pos.y-dragging.offsetY));
  movePlacement(profile, dragging.id, x, y);
  save();
  const el=document.querySelector(`.placement[data-placement="${dragging.id}"]`);
  if(el){ el.style.left=`${x}px`; el.style.top=`${y}px`; }
});

window.addEventListener('pointerup', ()=>{
  if(dragging.id){ save(); render(); }
  dragging.id=null;
});

main.addEventListener('click', (ev)=>{
  const stage=ev.target.closest('#roomStage');
  if(!stage || ev.target.closest('.placement')) return;
  if(ui.page!=='decorate') return;
  const selected=getDecor(ui.selectedDecorId);
  if(!selected || !profile.ownedDecor.includes(selected.id)) return;
  const rect=stage.getBoundingClientRect();
  const x=ev.clientX-rect.left;
  const y=ev.clientY-rect.top;
  const result=addPlacement(profile, selected.id, x, y);
  if(result.ok){ save(); toast(result.message); render(); }
});

render();
console.info('HoneyHollow v0.4.1 initialized');
