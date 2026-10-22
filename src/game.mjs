/** HoneyHollow v0.4 — browser-local prototype rules.
 * This demo is client-side only and is not server authoritative.
 */
export const INGREDIENTS = {
  honey:     { name: 'Sunhoney', icon: '🍯', color: '#f5bb51', rarity: 'common', desc:'Golden sweetness gathered in warm meadows.' },
  milk:      { name: 'Cloud Milk', icon: '🥛', color: '#fff0d8', rarity: 'common', desc:'Soft creamy milk loved by café regulars.' },
  berries:   { name: 'Blush Berries', icon: '🍓', color: '#ef739e', rarity: 'common', desc:'Juicy berries with a rosy tart finish.' },
  mint:      { name: 'Velvet Mint', icon: '🌿', color: '#82c7a5', rarity: 'common', desc:'Cool fragrant leaves for refreshing drinks.' },
  tea:       { name: 'Dewleaf Tea', icon: '🍵', color: '#9ec786', rarity: 'common', desc:'Gentle leaves dried with morning dew.' },
  coffee:    { name: 'Moon Beans', icon: '🫘', color: '#8c5a45', rarity: 'uncommon', desc:'Dark roasted beans from moonlit groves.' },
  cream:     { name: 'Cloud Cream', icon: '🍦', color: '#f7dfe8', rarity: 'uncommon', desc:'Whipped cream light as a tiny cloud.' },
  citrus:    { name: 'Sun Citrus', icon: '🍋', color: '#f2cf6e', rarity: 'uncommon', desc:'Bright citrus with a sparkling glow.' },
  cocoa:     { name: 'Cocoa Stars', icon: '🍫', color: '#996657', rarity: 'rare', desc:'Silky cocoa pieces with a starry aroma.' },
  boba:      { name: 'Honey Pearls', icon: '🧋', color: '#8a5564', rarity: 'rare', desc:'Chewy pearls simmered in sweet honey.' },
  lavender:  { name: 'Lavender Bloom', icon: '🪻', color: '#9b86db', rarity: 'rare', desc:'Dreamy blossoms with a floral finish.' },
  stardust:  { name: 'Star Sugar', icon: '✨', color: '#aaa1f4', rarity: 'epic', desc:'Shimmering sugar that makes drinks sparkle.' },
  moonfruit: { name: 'Moonfruit', icon: '🌙', color: '#7d9ef4', rarity: 'epic', desc:'Rare moon-kissed fruit with a cool glow.' },
  nectar:    { name: 'Flower Nectar', icon: '🌸', color: '#f4a6c5', rarity: 'legendary', desc:'A tiny vial of fragrant enchanted nectar.' }
};

export const RARITIES = ['Common','Uncommon','Rare','Epic','Legendary'];
export const RARITY_COLORS = {
  Common:'#c9b8c8', Uncommon:'#8eceb7', Rare:'#8ab2ff', Epic:'#c29bf8', Legendary:'#f7c35d'
};
export const RARITY_BONUS = { Common:0, Uncommon:1, Rare:2, Epic:3, Legendary:4 };

export const PETS = [
  { id:'honeynib', name:'HoneyNib', species:'Honey Mouse', rarity:'Common', affinity:'honey', zone:'meadow', vibe:'A tiny café mascot with syrup-sweet charm.', bonus:'More honey and coin finds.', colors:['#ffe8c7','#ecab83'] },
  { id:'berrybun', name:'BerryBun', species:'Berry Bunny', rarity:'Common', affinity:'berries', zone:'garden', vibe:'A plush bun who hides berries behind floppy ears.', bonus:'Higher fruit yields.', colors:['#ffd2dc','#ea759c'] },
  { id:'mintmew', name:'MintMew', species:'Leaf Cat', rarity:'Uncommon', affinity:'mint', zone:'meadow', vibe:'A cool cat scented like a herb garden after rain.', bonus:'Better herb drops and a little extra energy.', colors:['#dff3e7','#84c8a9'] },
  { id:'dewdle', name:'Dewdle', species:'Puddle Otter', rarity:'Uncommon', affinity:'milk', zone:'brook', vibe:'A playful collector that loves creamy ingredients.', bonus:'Improves milk and cream finds.', colors:['#c6ecf7','#83b6d4'] },
  { id:'lattefox', name:'LatteFox', species:'Barista Fox', rarity:'Rare', affinity:'coffee', zone:'grove', vibe:'A tidy little fox with a nose for the perfect roast.', bonus:'Boosts coffee and brew rewards.', colors:['#ffd8bf','#d88b72'] },
  { id:'cocoabloom', name:'CocoaBloom', species:'Cocoa Doe', rarity:'Rare', affinity:'cocoa', zone:'grove', vibe:'A graceful fawn that trots through chocolate-scented winds.', bonus:'More cocoa and cocoa recipe profit.', colors:['#f2d6bf','#b08067'] },
  { id:'lavalynx', name:'LavaLynx', species:'Lavender Lynx', rarity:'Epic', affinity:'lavender', zone:'garden', vibe:'Elegant and quiet, with blossoms tangled in its fur.', bonus:'Finds floral items and rare materials more often.', colors:['#eadfff','#a794eb'] },
  { id:'nightpuff', name:'NightPuff', species:'Starlight Bat', rarity:'Epic', affinity:'stardust', zone:'shore', vibe:'Flutters under moonbeams and leaves stars in the air.', bonus:'Higher rare-pet and star sugar chance.', colors:['#d5c3f4','#7058b0'] },
  { id:'moondrop', name:'MoonDrop', species:'Moon Kit', rarity:'Legendary', affinity:'moonfruit', zone:'shore', vibe:'A celestial kitten said to guide dream cafés to greatness.', bonus:'Best all-round expedition yields.', colors:['#d8e8ff','#7f8df0'] },
  { id:'nectarbee', name:'NectarBee', species:'Nectar Sprite', rarity:'Legendary', affinity:'nectar', zone:'garden', vibe:'A glowing sprite-bee with a royal floral hum.', bonus:'Can bring home nectar and bonus flowers.', colors:['#fff0a8','#f2b95e'] }
];

export const ZONES = [
  { id:'meadow', name:'Honeycomb Meadow', emoji:'🌾', palette:['#ffdd8d','#ffd0dd'], drops:['honey','berries','mint','tea'], petPool:['honeynib','mintmew'], desc:'Sweet fields full of gentle starter ingredients.' },
  { id:'brook', name:'Cloudbrook', emoji:'💧', palette:['#bfe7ff','#e5fbff'], drops:['milk','cream','citrus','tea','berries'], petPool:['dewdle'], desc:'A bright waterside route with creamy finds.' },
  { id:'garden', name:'Petal Patch', emoji:'🌷', palette:['#ffd7ec','#c3f1de'], drops:['berries','mint','lavender','boba','honey'], petPool:['berrybun','lavalynx','nectarbee'], desc:'A fragrant garden where sweets and petals bloom.' },
  { id:'grove', name:'Moon Roast Grove', emoji:'🌙', palette:['#d9c7ff','#f7d4c8'], drops:['coffee','cocoa','lavender','stardust'], petPool:['lattefox','cocoabloom'], desc:'A dreamy grove filled with moon beans and cocoa.' },
  { id:'shore', name:'Starlight Shore', emoji:'⭐', palette:['#c7ddff','#d9c4ff'], drops:['stardust','moonfruit','cream','citrus','nectar'], petPool:['nightpuff','moondrop'], desc:'Late-game expeditions with magical high-value loot.' }
];

export const RECIPES = [
  {
    id:'honeycloud-latte', name:'Honeycloud Latte', category:'Latte', cup:'mug', reward:26,
    subtitle:'Golden latte art with syrup shimmer.',
    ingredients:{ coffee:1, milk:1, honey:2 }, palette:['#f4c680','#fef0c7','#d88b5e'], garnish:['honey swirl','cream heart']
  },
  {
    id:'berry-dream-fizz', name:'Berry Dream Fizz', category:'Soda', cup:'tall', reward:28,
    subtitle:'A sparkling rosy soda crowned with berries.',
    ingredients:{ berries:2, citrus:1, nectar:1 }, palette:['#f38cb4','#ffd7ea','#ee5c8b'], garnish:['berry skewer','sparkle ice']
  },
  {
    id:'velvet-matcha-float', name:'Velvet Matcha Float', category:'Matcha', cup:'tall', reward:31,
    subtitle:'Pastel matcha layered with floating cream.',
    ingredients:{ tea:1, mint:1, cream:1, milk:1 }, palette:['#a8d39d','#e9f7d7','#7fb18b'], garnish:['cloud cream','mint leaf']
  },
  {
    id:'moon-boba-milk', name:'Moon Boba Milk', category:'Boba', cup:'boba', reward:36,
    subtitle:'Silky moon milk with glossy honey pearls.',
    ingredients:{ milk:2, boba:1, honey:1, tea:1 }, palette:['#d5b8f4','#fff3de','#9975c8'], garnish:['purple pearls','crescent charm']
  },
  {
    id:'cocoa-comet-mocha', name:'Cocoa Comet Mocha', category:'Mocha', cup:'mug', reward:42,
    subtitle:'Chocolate mocha with star dust and soft foam.',
    ingredients:{ coffee:1, cocoa:2, milk:1, stardust:1 }, palette:['#8e605b','#f4d8de','#b198f4'], garnish:['stardust','mocha foam']
  },
  {
    id:'lavender-dream-latte', name:'Lavender Dream Latte', category:'Special', cup:'mug', reward:44,
    subtitle:'A floral latte with purple cream clouds.',
    ingredients:{ milk:1, lavender:2, honey:1, cream:1 }, palette:['#b39be9','#f6dff7','#8369cb'], garnish:['lavender sprig','cream bow']
  },
  {
    id:'starlit-citrus-tea', name:'Starlit Citrus Tea', category:'Tea', cup:'teacup', reward:39,
    subtitle:'Glowing tea kissed by citrus and sugar stars.',
    ingredients:{ tea:2, citrus:1, stardust:1, honey:1 }, palette:['#9f97eb','#fff2c9','#f6d878'], garnish:['star sugar','citrus slice']
  },
  {
    id:'moonfruit-frappe', name:'Moonfruit Frappé', category:'Frappe', cup:'tall', reward:52,
    subtitle:'A celestial blended drink with galaxy fruit.',
    ingredients:{ moonfruit:1, milk:1, cream:1, nectar:1, stardust:1 }, palette:['#7f94f2','#d8d5ff','#f6b9d8'], garnish:['moonfruit slice','sparkle cream']
  }
];

export const DECOR = [
  { id:'counter', name:'Honey Counter', icon:'🍰', price:0, category:'Work', size:[150,58], color:'#cf9e72', layer:'floor', desc:'Starter service counter with honey trim.' },
  { id:'round-table', name:'Round Café Table', icon:'☕', price:70, category:'Furniture', size:[96,74], color:'#d9b48a', layer:'floor', desc:'A tiny table for your first regulars.' },
  { id:'sofa', name:'Rosy Sofa', icon:'🛋️', price:140, category:'Furniture', size:[148,72], color:'#f0afca', layer:'floor', desc:'A plush pastel sofa for your lounge corner.' },
  { id:'plant', name:'Leafy Planter', icon:'🪴', price:55, category:'Decor', size:[64,84], color:'#94c68a', layer:'floor', desc:'Adds a living splash of green.' },
  { id:'display-case', name:'Dessert Display', icon:'🧁', price:125, category:'Work', size:[118,88], color:'#f0c3cb', layer:'floor', desc:'Show off dreamy sweets and seasonal drinks.' },
  { id:'bookshelf', name:'Story Shelf', icon:'📚', price:165, category:'Storage', size:[88,150], color:'#c49f7b', layer:'wall', desc:'A vertical shelf for recipes and trinkets.' },
  { id:'pet-bed', name:'Pet Bed', icon:'🐾', price:95, category:'Pet', size:[92,62], color:'#efc7a4', layer:'floor', desc:'A cozy bed where companions can nap.' },
  { id:'lamp', name:'Moon Lamp', icon:'🌙', price:120, category:'Lighting', size:[52,140], color:'#f8dea2', layer:'floor', desc:'Soft golden light for late-night service.' },
  { id:'garland', name:'Star Garland', icon:'✨', price:85, category:'Wall', size:[170,48], color:'#f8d46f', layer:'wall', desc:'A sparkling garland for festive ambience.' },
  { id:'window-seat', name:'Bay Window Seat', icon:'🪟', price:180, category:'Furniture', size:[150,76], color:'#afd2f1', layer:'floor', desc:'A dreamy perch overlooking the Hollow.' }
];

export const MAX_ENERGY = 8;
export const ENERGY_REGEN_MS = 2 * 60 * 1000;
export const SAVE_KEY = 'honeyhollow-game-v41';
export const PREVIOUS_SAVE_KEY = 'honeyhollow-game-v4';
export const START_INVENTORY = Object.fromEntries(Object.keys(INGREDIENTS).map((id)=>[id,0]));
Object.assign(START_INVENTORY, { honey:4, milk:3, berries:3, mint:2, tea:2, coffee:1, cream:1 });

const petById = (id)=>PETS.find(p=>p.id===id);
const zoneById = (id)=>ZONES.find(z=>z.id===id);
const recipeById = (id)=>RECIPES.find(r=>r.id===id);
const decorById = (id)=>DECOR.find(d=>d.id===id);

export function timezone(){
  try{return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';}
  catch{return 'UTC';}
}

export function localDay(timestamp, tz){
  const fields = new Intl.DateTimeFormat('en-US',{timeZone:tz,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date(timestamp));
  const map = Object.fromEntries(fields.filter(x=>x.type!=='literal').map(x=>[x.type,x.value]));
  return `${map.year}-${map.month}-${map.day}`;
}

export function dayDiff(earlier, later){
  return Math.round((Date.parse(later+'T00:00:00Z') - Date.parse(earlier+'T00:00:00Z'))/86400000);
}

let uidCounter = 1;
const uid = ()=>`p${Date.now().toString(36)}${uidCounter++}`;

export function createProfile(now = Date.now(), tz = timezone()){
  return {
    version:41,
    joinedAt:now,
    timezone:tz,
    coins:260,
    serves:0,
    explorations:0,
    discoveryPity:0,
    inventory:{...START_INVENTORY},
    pets:[{ id:'honeynib', nickname:'HoneyNib', xp:0, bond:0, energy:MAX_ENERGY, energyUpdatedAt:now }],
    activePetId:'honeynib',
    ownedDecor:['counter'],
    placements:[{ uid:uid(), decorId:'counter', x:310, y:255, rot:0, z:1 }],
    selectedPlacementId:null,
    unlockedRecipes:['honeycloud-latte','velvet-matcha-float'],
    habitat:{ theme:'meadow', residents:['honeynib'], lastHarvestAt:now, visits:0 },
    ownedThemes:['honey'],
    cafeTheme:'honey',
    lastDailyDay:null,
    dailyStreak:0,
    dailyClaims:0,
    log:[]
  };
}

export function migrateProfile(value, now = Date.now(), tz = timezone()){
  if(!value || typeof value !== 'object') return createProfile(now, tz);
  if(value.version === 41 || value.version === 4){
    const base=createProfile(now, tz);
    return {
      ...base,
      ...value,
      inventory:{...base.inventory,...(value.inventory||{})},
      pets:Array.isArray(value.pets)&&value.pets.length?value.pets:base.pets,
      ownedDecor:Array.isArray(value.ownedDecor)&&value.ownedDecor.length?value.ownedDecor:base.ownedDecor,
      placements:Array.isArray(value.placements)?value.placements:base.placements,
      log:Array.isArray(value.log)?value.log.slice(0,30):[],
      version:41,
      unlockedRecipes:Array.isArray(value.unlockedRecipes)?value.unlockedRecipes:['honeycloud-latte','velvet-matcha-float'],
      habitat:{...base.habitat,...(value.habitat||{})},
      ownedThemes:Array.isArray(value.ownedThemes)?value.ownedThemes:['honey'],
      cafeTheme:value.cafeTheme||'honey'
    };
  }
  const next=createProfile(now, tz);
  if(Number.isFinite(value.coins)) next.coins=Math.max(0,value.coins);
  if(Number.isFinite(value.serves)) next.serves=value.serves;
  if(Number.isFinite(value.explorations ?? value.visits)) next.explorations=value.explorations ?? value.visits;
  if(value.inventory) next.inventory={...next.inventory,...value.inventory};
  if(Array.isArray(value.pets) && value.pets.length){
    next.pets=value.pets.map((p,i)=>({
      id:p.id || (i===0?'honeynib':'honeynib'), nickname:p.nickname || petById(p.id||'honeynib')?.name || 'Pet',
      xp:p.xp||0, bond:p.bond||p.affection||0, energy:Math.max(0, Math.min(MAX_ENERGY, p.energy ?? MAX_ENERGY)), energyUpdatedAt:p.energyUpdatedAt||now
    }));
    if(!next.pets.length) next.pets=createProfile(now,tz).pets;
    next.activePetId = next.pets[0].id;
  }
  if(Array.isArray(value.ownedDecor)) next.ownedDecor=[...new Set([...next.ownedDecor, ...value.ownedDecor])];
  if(value.placements && !Array.isArray(value.placements)){
    const keys=Object.entries(value.placements);
    next.placements=keys.map(([slot,decorId],i)=>({uid:uid(),decorId,x:80+(i%5)*110,y:170+Math.floor(i/5)*75,rot:0,z:i+1}));
  }
  next.lastDailyDay=value.lastDailyDay||null;
  next.dailyStreak=value.dailyStreak||0;
  next.dailyClaims=value.dailyClaims||0;
  next.log=Array.isArray(value.log)?value.log.slice(0,30):[];
  if(Array.isArray(value.unlockedRecipes)) next.unlockedRecipes=[...value.unlockedRecipes];
  if(value.habitat) next.habitat={...next.habitat,...value.habitat};
  if(Array.isArray(value.ownedThemes)) next.ownedThemes=[...value.ownedThemes];
  if(value.cafeTheme) next.cafeTheme=value.cafeTheme;
  return next;
}

export function getPet(profile,id){ return profile.pets.find(p=>p.id===id); }

export function touchEnergy(pet, now=Date.now()){
  const last=pet.energyUpdatedAt || now;
  const gained=Math.max(0, Math.floor((now-last)/ENERGY_REGEN_MS));
  pet.energy=Math.min(MAX_ENERGY, (pet.energy ?? MAX_ENERGY) + gained);
  pet.energyUpdatedAt = pet.energy === MAX_ENERGY ? now : last + gained*ENERGY_REGEN_MS;
  return pet.energy;
}
export function energyOf(pet, now=Date.now()){
  const copy={...pet};
  return touchEnergy(copy, now);
}

function addLog(profile, message){
  profile.log=[{ ts:Date.now(), message }, ...(profile.log||[])].slice(0,25);
}

export function ingredientLabel(id,count){
  const item=INGREDIENTS[id];
  return `${item?.icon||''} ${item?.name||id} ×${count}`;
}

export function canBrew(profile, recipeId){
  const recipe=recipeById(recipeId);
  if(!recipe || !profile.unlockedRecipes?.includes(recipeId)) return false;
  return Object.entries(recipe.ingredients).every(([id,n]) => (profile.inventory[id]||0) >= n);
}

export function brew(profile, recipeId){
  const recipe=recipeById(recipeId);
  if(!recipe) return { ok:false, message:'Unknown recipe.' };
  if(!profile.unlockedRecipes?.includes(recipeId)) return {ok:false,message:'Unlock this recipe with café reputation and coins first.'};
  if(!canBrew(profile, recipeId)) return { ok:false, message:'You need more ingredients. Explore and gather what is missing.' };
  for(const [id,n] of Object.entries(recipe.ingredients)) profile.inventory[id]-=n;
  const active=petById(profile.activePetId);
  const bonus = active?.affinity === 'coffee' && recipe.ingredients.coffee ? 4 : active?.affinity === 'cocoa' && recipe.ingredients.cocoa ? 5 : 0;
  const reward=recipe.reward + bonus;
  profile.coins += reward;
  profile.serves += 1;
  const msg=`Served ${recipe.name}! +${reward} coins${bonus?` (${active.name} café bonus!)`:''}`;
  addLog(profile,msg);
  return { ok:true, message:msg, reward };
}

export function assignPet(profile,id){
  const pet=getPet(profile,id);
  if(!pet) return {ok:false,message:'Discover this pet first!'};
  profile.activePetId=id;
  return {ok:true,message:`${pet.nickname} will join your next outing.`};
}

const pick = (rng, arr)=>arr[Math.floor(Math.max(0, Math.min(.999999, rng())) * arr.length)];

function rollPet(zone, rng){
  const pool=zone.petPool.map(petById).filter(Boolean);
  const rarityWeights={ Common:50, Uncommon:28, Rare:14, Epic:6, Legendary:2 };
  const adjusted=pool.map(p=>({pet:p, weight:rarityWeights[p.rarity]||1}));
  let sum=adjusted.reduce((a,b)=>a+b.weight,0), roll=rng()*sum;
  for(const entry of adjusted){ roll-=entry.weight; if(roll<=0) return entry.pet; }
  return adjusted[0]?.pet || null;
}

export function explore(profile, zoneId, now=Date.now(), rng=Math.random){
  const zone=zoneById(zoneId), pet=getPet(profile, profile.activePetId), petDef=petById(profile.activePetId);
  if(!zone) return {ok:false,message:'Unknown location.'};
  if(!pet) return {ok:false,message:'Choose a pet before exploring.'};
  touchEnergy(pet, now);
  if(pet.energy < 1) return {ok:false,message:`${pet.nickname} is tired. Feed them or wait for energy to regenerate.`};
  pet.energy -= 1;
  pet.xp += 10;
  profile.explorations += 1;
  profile.discoveryPity = (profile.discoveryPity || 0) + 1;

  const rarityBonus = RARITY_BONUS[petDef?.rarity || 'Common'];
  const drawCount = 2 + Math.floor(rarityBonus/2) + (petDef?.affinity && zone.drops.includes(petDef.affinity) ? 1 : 0);
  const drops={};
  for(let i=0;i<drawCount;i++){
    const item = pick(rng, zone.drops);
    drops[item]=(drops[item]||0)+1;
  }
  if(rarityBonus >= 2 && rng()<0.45){
    const extra = zone.drops.includes(petDef.affinity) ? petDef.affinity : pick(rng, zone.drops);
    drops[extra]=(drops[extra]||0)+1;
  }
  if(rarityBonus >= 4 && rng()<0.5){
    drops.stardust=(drops.stardust||0)+1;
  }
  if(petDef?.affinity === 'nectar' && rng()<0.35) drops.nectar=(drops.nectar||0)+1;

  let foundCoins = 4 + Math.floor(rng()*8) + rarityBonus;
  profile.coins += foundCoins;
  for(const [id,n] of Object.entries(drops)) profile.inventory[id]=(profile.inventory[id]||0)+n;

  let discovered=null, duplicate=false;
  const encounter = profile.discoveryPity >= 5 || rng() < (0.24 + rarityBonus*0.015);
  if(encounter){
    profile.discoveryPity=0;
    discovered=rollPet(zone, rng);
    if(discovered){
      duplicate=!!getPet(profile, discovered.id);
      if(duplicate){
        profile.coins += 18;
        profile.inventory.stardust=(profile.inventory.stardust||0)+1;
      }else{
        profile.pets.push({ id:discovered.id, nickname:discovered.name, xp:0, bond:0, energy:MAX_ENERGY, energyUpdatedAt:now });
      }
    }
  }

  const msg=`${pet.nickname} explored ${zone.name} and found ${Object.entries(drops).map(([id,n])=>ingredientLabel(id,n)).join(', ')} plus ${foundCoins} coins${discovered ? duplicate ? `; ${discovered.name} visited again (+18 coins, +1 Star Sugar)` : `; NEW PET: ${discovered.name}!` : ''}.`;
  addLog(profile,msg);
  return { ok:true, message:msg, drops, discovered, duplicate, foundCoins, zone:zone.name };
}

export function petCare(profile, action, ingredient, now=Date.now(), petId=profile.activePetId){
  const pet=getPet(profile, petId);
  if(!pet) return {ok:false,message:'Choose a pet.'};
  touchEnergy(pet, now);
  if(action==='cuddle'){
    if(pet.energy < 1) return {ok:false,message:'Your pet is too sleepy to cuddle right now.'};
    pet.energy -= 1; pet.xp += 12; pet.bond += 1;
    const msg=`Cuddled ${pet.nickname}! +12 XP and +1 bond.`;
    addLog(profile,msg); return {ok:true,message:msg};
  }
  if(action==='feed'){
    if(!INGREDIENTS[ingredient]) return {ok:false,message:'Choose a snack.'};
    if((profile.inventory[ingredient]||0) < 1) return {ok:false,message:'You do not have that ingredient.'};
    profile.inventory[ingredient] -= 1;
    pet.energy = Math.min(MAX_ENERGY, pet.energy + 2);
    pet.energyUpdatedAt = now;
    pet.bond += 1; pet.xp += 8;
    const msg=`Fed ${pet.nickname} ${INGREDIENTS[ingredient].name}. +8 XP, +1 bond, +2 energy.`;
    addLog(profile,msg); return {ok:true,message:msg};
  }
  return {ok:false,message:'Unknown pet action.'};
}

export function dailyInfo(profile, now=Date.now()){
  const today = localDay(now, profile.timezone);
  const joined = localDay(profile.joinedAt, profile.timezone);
  const gap = profile.lastDailyDay ? dayDiff(profile.lastDailyDay, today) : null;
  const claimable = gap === null || gap > 0;
  const nextStreak = gap === 1 ? profile.dailyStreak + 1 : gap === 0 ? profile.dailyStreak : 1;
  const cycleDay=((Math.max(1,nextStreak)-1)%7)+1;
  return { today, joined, gap, claimable, nextStreak, cycleDay, daysSinceJoin:Math.max(0, dayDiff(joined,today)) };
}

export function claimDaily(profile, now=Date.now()){
  const info=dailyInfo(profile, now);
  if(!info.claimable) return {ok:false,message:`Already claimed for ${info.today}.`};
  profile.lastDailyDay=info.today;
  profile.dailyStreak=info.nextStreak;
  profile.dailyClaims += 1;
  const coins=45 + Math.min(7,profile.dailyStreak)*15;
  profile.coins += coins;
  profile.inventory.honey += 2;
  profile.inventory.milk += 1;
  if(profile.dailyStreak % 3 === 0) profile.inventory.berries += 2;
  let extra='';
  if(profile.dailyStreak % 7 === 0){ profile.inventory.stardust += 2; extra=' and +2 Star Sugar'; }
  const msg=`Daily reward claimed! +${coins} coins, +2 Sunhoney, +1 Cloud Milk${extra}.`;
  addLog(profile,msg);
  return {ok:true,message:msg};
}

export function buyDecor(profile, decorId){
  const decor=decorById(decorId);
  if(!decor) return {ok:false,message:'Unknown décor item.'};
  if(profile.ownedDecor.includes(decorId)) return {ok:false,message:'You already own this décor item.'};
  if(profile.coins < decor.price) return {ok:false,message:`Need ${decor.price-profile.coins} more coins.`};
  profile.coins -= decor.price;
  profile.ownedDecor.push(decorId);
  const msg=`Purchased ${decor.name}! You can now place it anywhere in your café.`;
  addLog(profile,msg);
  return {ok:true,message:msg};
}

export function addPlacement(profile, decorId, x, y){
  if(!profile.ownedDecor.includes(decorId)) return {ok:false,message:'Own this item first.'};
  const decor=decorById(decorId); if(!decor) return {ok:false,message:'Unknown décor.'};
  const placement={ uid:uid(), decorId, x:Math.round(x), y:Math.round(y), rot:0, z:(profile.placements.at(-1)?.z||0)+1 };
  profile.placements.push(placement);
  profile.selectedPlacementId=placement.uid;
  return {ok:true,message:`Placed ${decor.name}.`, placement};
}

export function movePlacement(profile, placementId, x, y){
  const item=profile.placements.find(p=>p.uid===placementId);
  if(!item) return {ok:false,message:'Placement not found.'};
  item.x=Math.round(x); item.y=Math.round(y);
  return {ok:true,message:'Moved item.', placement:item};
}

export function rotatePlacement(profile, placementId, step=15){
  const item=profile.placements.find(p=>p.uid===placementId);
  if(!item) return {ok:false,message:'Placement not found.'};
  item.rot=(item.rot + step + 360)%360;
  return {ok:true,message:'Rotated item.', placement:item};
}

export function removePlacement(profile, placementId){
  const index=profile.placements.findIndex(p=>p.uid===placementId);
  if(index<0) return {ok:false,message:'Placement not found.'};
  const [removed]=profile.placements.splice(index,1);
  if(profile.selectedPlacementId===placementId) profile.selectedPlacementId=null;
  return {ok:true,message:`Removed ${decorById(removed.decorId)?.name||'item'} from the room.`, removed};
}

export function selectPlacement(profile, placementId){
  profile.selectedPlacementId=placementId;
  return profile.placements.find(p=>p.uid===placementId) || null;
}

export function getPlacement(profile, placementId){
  return profile.placements.find(p=>p.uid===placementId) || null;
}

export function getDecor(id){ return decorById(id); }
export function getRecipe(id){ return recipeById(id); }
export function progressLevel(pet){ return Math.floor((pet.xp||0)/70)+1; }
export function progressStage(pet){ return pet.xp>=350?'Evolved':pet.xp>=140?'Growing':'Baby'; }

// v0.4.1: persistent habitat, recipe progression and cosmetic room themes.
export const HABITAT_THEMES = [
  {id:'meadow',name:'Sunhoney Meadow',emoji:'🌾',colors:['#fce8b3','#d3efd0'],desc:'Soft grass, sunbeams and comfy pet pillows.'},
  {id:'pond',name:'Moonlit Pond',emoji:'🌙',colors:['#b3c8ff','#d7caf7'],desc:'Sparkling water under lavender-blue moonlight.'},
  {id:'berry',name:'Berry Orchard',emoji:'🍓',colors:['#ffd0df','#f6e2aa'],desc:'Peach clouds and rosy berry trees.'}
];
export const CAFE_THEMES = [
  {id:'honey',name:'Honey Cottage',price:0,wall:'#fff4e0',floor:'#d6a984',trim:'#bd866f'},
  {id:'berry',name:'Berry Parlor',price:180,wall:'#ffe9f3',floor:'#dfadba',trim:'#bf6d9e'},
  {id:'moon',name:'Moonlight Lounge',price:260,wall:'#dcdafa',floor:'#a69acb',trim:'#7768a3'},
  {id:'mint',name:'Mint Tea Room',price:220,wall:'#e0f3e5',floor:'#a6d2b6',trim:'#619783'}
];
export const RECIPE_UNLOCKS = {
  'honeycloud-latte':{serves:0,coins:0},
  'velvet-matcha-float':{serves:0,coins:0},
  'berry-dream-fizz':{serves:2,coins:45},
  'moon-boba-milk':{serves:4,coins:65},
  'cocoa-comet-mocha':{serves:6,coins:90},
  'lavender-dream-latte':{serves:8,coins:110},
  'starlit-citrus-tea':{serves:11,coins:135},
  'moonfruit-frappe':{serves:15,coins:160}
};
export function recipeUnlockInfo(profile,id){
  const rule=RECIPE_UNLOCKS[id];
  if(!rule) return {ok:false,unlocked:false};
  const unlocked=profile.unlockedRecipes.includes(id);
  return {ok:unlocked || profile.serves>=rule.serves && profile.coins>=rule.coins,unlocked,serves:rule.serves,coins:rule.coins};
}
export function unlockRecipe(profile,id){
  const info=recipeUnlockInfo(profile,id);
  if(info.unlocked)return {ok:false,message:'Recipe already unlocked.'};
  if(!info.ok)return {ok:false,message:`Serve ${info.serves} total drinks and save ${info.coins} coins to unlock.`};
  profile.coins-=info.coins;
  profile.unlockedRecipes.push(id);
  const item=recipeById(id);
  addLog(profile,`Learned the recipe for ${item.name}!`);
  return {ok:true,message:`New recipe learned: ${item.name}!`};
}
export function setHabitatResidents(profile,petId){
  const habitat=profile.habitat;
  if(!getPet(profile,petId))return {ok:false,message:'You need to discover this companion first.'};
  const current=habitat.residents || [];
  if(current.includes(petId)){
    habitat.residents=current.filter(id=>id!==petId);
    return {ok:true,message:'Companion returned to your collection.'};
  }
  if(current.length>=4)return {ok:false,message:'Your habitat has room for four pets.'};
  if(current.length===0)habitat.lastHarvestAt=Date.now();
  habitat.residents=[...current,petId];
  return {ok:true,message:`${petById(petId).name} joined your habitat!`};
}
export function setHabitatTheme(profile,themeId){
  if(!HABITAT_THEMES.some(x=>x.id===themeId))return {ok:false,message:'Unknown habitat theme.'};
  profile.habitat.theme=themeId;
  return {ok:true,message:'Habitat theme updated!'};
}
export const HABITAT_HARVEST_MS=12*60*1000;
export function habitatStatus(profile,now=Date.now()){
  const habitat=profile.habitat;
  const residents=(habitat.residents||[]).filter(id=>!!getPet(profile,id));
  const elapsed=Math.max(0,now-(habitat.lastHarvestAt||now));
  const batches=Math.min(3,Math.floor(elapsed/HABITAT_HARVEST_MS));
  return {residents,batches,ready:residents.length>0&&batches>0,nextMs:batches>0?0:Math.max(0,HABITAT_HARVEST_MS-elapsed)};
}
export function harvestHabitat(profile,now=Date.now()){
  const info=habitatStatus(profile,now);
  if(!info.ready)return {ok:false,message:'Your pets are still gathering. Try again later.'};
  const rewards={};
  for(const id of info.residents){
    const spec=petById(id);
    const ingredient=spec?.affinity && INGREDIENTS[spec.affinity]?spec.affinity:'honey';
    const count=info.batches + (RARITY_BONUS[spec?.rarity||'Common']>=3?1:0);
    rewards[ingredient]=(rewards[ingredient]||0)+count;
  }
  for(const [id,count]of Object.entries(rewards))profile.inventory[id]=(profile.inventory[id]||0)+count;
  profile.habitat.lastHarvestAt=(profile.habitat.lastHarvestAt||now)+info.batches*HABITAT_HARVEST_MS;
  profile.habitat.visits=(profile.habitat.visits||0)+1;
  const message=`Habitat gathered ${Object.entries(rewards).map(([id,n])=>ingredientLabel(id,n)).join(', ')}!`;
  addLog(profile,message);
  return {ok:true,message,rewards};
}
export function purchaseCafeTheme(profile,themeId){
  const theme=CAFE_THEMES.find(t=>t.id===themeId);
  if(!theme)return {ok:false,message:'Unknown room theme.'};
  if(profile.ownedThemes.includes(themeId))return {ok:false,message:'You already own that theme.'};
  if(profile.coins<theme.price)return {ok:false,message:`You need ${theme.price-profile.coins} more coins.`};
  profile.coins-=theme.price;
  profile.ownedThemes.push(themeId);
  return {ok:true,message:`Unlocked ${theme.name}!`};
}
export function setCafeTheme(profile,themeId){
  if(!profile.ownedThemes.includes(themeId))return {ok:false,message:'Unlock this theme first.'};
  profile.cafeTheme=themeId;
  return {ok:true,message:`Café theme changed to ${CAFE_THEMES.find(t=>t.id===themeId).name}.`};
}
