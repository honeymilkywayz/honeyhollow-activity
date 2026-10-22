import test from 'node:test';
import assert from 'node:assert/strict';
import {
 createProfile,migrateProfile,explore,brew,canBrew,RECIPES,INGREDIENTS,PETS,
 buyDecor,getPet,petCare,assignPet,MAX_ENERGY,localDay,dailyInfo,claimDaily,dayDiff,energyOf,
 addPlacement,movePlacement,rotatePlacement,removePlacement,
 recipeUnlockInfo,unlockRecipe,setHabitatResidents,setHabitatTheme,habitatStatus,harvestHabitat,
 HABITAT_HARVEST_MS,purchaseCafeTheme,setCafeTheme,CAFE_THEMES
} from '../src/game.mjs';
const NOW=Date.UTC(2026,9,21,16,0,0);
const make=()=>createProfile(NOW,'America/New_York');
test('new game starts with functional café, pets, room, habitat and local day',()=>{
 const p=make();assert.equal(p.version,41);assert.equal(p.pets.length,1);assert.equal(p.unlockedRecipes.length,2);assert.equal(p.ownedThemes[0],'honey');assert.equal(p.habitat.residents[0],'honeynib');assert.equal(p.placements.length,1);assert.equal(dailyInfo(p,NOW).today,'2026-10-21');
});
test('migration from v0.4 retains player identity, supplies, pets, currency and placements',()=>{
 const old={...make(),version:4,coins:543,serves:8,joinedAt:NOW-8e6,inventory:{honey:77},pets:[{id:'honeynib',nickname:'Tiny',xp:220,bond:7,energy:3,energyUpdatedAt:NOW}],ownedDecor:['counter','sofa'],placements:[{uid:'old',decorId:'sofa',x:100,y:100,rot:0,z:1}],lastDailyDay:'2026-10-20'};
 delete old.unlockedRecipes;delete old.habitat;delete old.cafeTheme;delete old.ownedThemes;
 const p=migrateProfile(old,NOW+100000,'UTC');assert.equal(p.joinedAt,old.joinedAt);assert.equal(p.timezone,'America/New_York');assert.equal(p.coins,543);assert.equal(p.inventory.honey,77);assert.equal(p.pets[0].nickname,'Tiny');assert.equal(p.placements[0].uid,'old');assert.equal(p.lastDailyDay,'2026-10-20');assert.equal(p.habitat.theme,'meadow');
});
test('exploration spends energy and returns actual ingredients',()=>{
 const p=make(),before=p.inventory.honey;
 const r=explore(p,'meadow',NOW,()=>0);assert.equal(r.ok,true);assert.ok(p.inventory.honey>before);assert.equal(p.pets[0].energy,MAX_ENERGY-1);
});
test('pets of greater rarity yield more loot and rare pets can be discovered',()=>{
 const a=make(),b=make();b.pets.push({id:'moondrop',nickname:'MoonDrop',energy:MAX_ENERGY,energyUpdatedAt:NOW,xp:0,bond:0});assignPet(b,'moondrop');
 let low=explore(a,'shore',NOW,()=>0.99);let high=explore(b,'shore',NOW,()=>0.99);
 const sum=x=>Object.values(x.drops).reduce((s,n)=>s+n,0);assert.ok(sum(high)>sum(low));assert.ok(PETS.length>=9);
});
test('recipe progression requires serves and coins and a learned recipe',()=>{
 const p=make(),r=RECIPES.find(x=>x.id==='berry-dream-fizz');
 assert.equal(canBrew(p,r.id),false);assert.equal(unlockRecipe(p,r.id).ok,false);
 p.serves=2;assert.equal(recipeUnlockInfo(p,r.id).ok,true);const start=p.coins;
 assert.equal(unlockRecipe(p,r.id).ok,true);assert.equal(p.coins,start-45);assert.equal(recipeUnlockInfo(p,r.id).unlocked,true);
 p.inventory.berries=10;p.inventory.citrus=10;p.inventory.nectar=10;
 assert.equal(canBrew(p,r.id),true);const prev=p.inventory.berries;assert.equal(brew(p,r.id).ok,true);assert.equal(p.inventory.berries,prev-2);
});
test('two starter recipes are usable if ingredients are present',()=>{
 const p=make();const id='honeycloud-latte';assert.equal(canBrew(p,id),true);assert.equal(brew(p,id).ok,true);assert.equal(p.serves,1);
});
test('free placement supports duplicates, movement, rotation and removal',()=>{
 const p=make();const original=p.placements.length;
 const created=addPlacement(p,'counter',92,132);assert.equal(created.ok,true);assert.equal(p.placements.length,original+1);
 assert.equal(movePlacement(p,created.placement.uid,220,240).ok,true);assert.equal(rotatePlacement(p,created.placement.uid,15).placement.rot,15);assert.equal(removePlacement(p,created.placement.uid).ok,true);assert.equal(p.placements.length,original);
});
test('cosmetic café themes cost earned coins and update room without gameplay bonuses',()=>{
 const p=make();const before=p.coins;assert.equal(purchaseCafeTheme(p,'berry').ok,true);assert.equal(p.coins,before-180);
 assert.equal(setCafeTheme(p,'berry').ok,true);assert.equal(p.cafeTheme,'berry');assert.equal(setCafeTheme(p,'moon').ok,false);assert.equal(CAFE_THEMES.length,4);
});
test('habitat produces timed affinity harvest without an early claim exploit',()=>{
 const p=make();assert.equal(harvestHabitat(p,NOW+1000).ok,false);
 assert.equal(habitatStatus(p,NOW+HABITAT_HARVEST_MS*2).batches,2);
 const prior=p.inventory.honey;const got=harvestHabitat(p,NOW+HABITAT_HARVEST_MS*2);
 assert.equal(got.ok,true);assert.equal(p.inventory.honey,prior+2);assert.equal(harvestHabitat(p,NOW+HABITAT_HARVEST_MS*2).ok,false);
});
test('habitat pet assignments obey ownership and capacity',()=>{
 const p=make();assert.equal(setHabitatResidents(p,'nightpuff').ok,false);
 for(const id of ['berrybun','mintmew','dewdle','lattefox'])p.pets.push({id,nickname:id,xp:0,bond:0,energy:8,energyUpdatedAt:NOW});
 for(const id of ['berrybun','mintmew','dewdle'])assert.equal(setHabitatResidents(p,id).ok,true);
 assert.equal(setHabitatResidents(p,'lattefox').ok,false);
 assert.equal(setHabitatResidents(p,'berrybun').ok,true);
 assert.equal(setHabitatResidents(p,'lattefox').ok,true);
 assert.equal(setHabitatTheme(p,'pond').ok,true);
});
test('pet care costs resources and updates pet XP',()=>{
 const p=make();let x=petCare(p,'cuddle',null,NOW,'honeynib');assert.equal(x.ok,true);assert.equal(p.pets[0].xp,12);
 let y=petCare(p,'feed','berries',NOW,'honeynib');assert.equal(y.ok,true);assert.equal(p.pets[0].xp,20);
});
test('daily reset respects DST and joining timezone',()=>{
 const p=make();assert.equal(claimDaily(p,NOW).ok,true);assert.equal(claimDaily(p,NOW).ok,false);
 assert.equal(claimDaily(p,Date.UTC(2026,9,22,4,0)).ok,true);assert.equal(p.dailyStreak,2);
 assert.equal(localDay(Date.UTC(2026,10,1,3,30),'America/New_York'),'2026-10-31');assert.equal(localDay(Date.UTC(2026,10,1,6,30),'America/New_York'),'2026-11-01');assert.equal(dayDiff('2026-10-31','2026-11-01'),1);
});
test('all recipes reference existing ingredients and fantasy drink palettes',()=>{
 for(const r of RECIPES){assert.equal(r.palette.length,3);for(const id of Object.keys(r.ingredients))assert.ok(INGREDIENTS[id]);}
});
