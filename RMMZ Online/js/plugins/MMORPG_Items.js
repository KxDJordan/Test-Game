/*!
 * /*:
 * @target MZ
 * @plugindesc Weapons, Armors, Items, Gold
 * @author rmalizia44@gmail.com
 * @url https://rmalizia44.itch.io/
 * @help
 *
 * ⚔️ MMORPG Maker Plugin 0.9.1
 *
 * All player inventory items—including weapons, armors, items, and
 * gold—are synchronized, ensuring a unified experience across sessions
 * and for all players.
 *
 * 💖 Special Thanks to Our Patrons!
 *
 * A huge shout-out to everyone supporting the project through Patreon!
 * Your contributions help keep this plugin alive and growing. Here are
 * the amazing supporters from each tier:
 *
 * 🏆 Champion Tier
 *
 * - Emerson
 * - James Shmo
 *
 * 🌟 Legendary Tier
 *
 * - Alexis Naboulet
 * - Ansgar
 * - David Cuellar
 * - Zufran
 *
 * ✨ Epic Tier
 *
 * - Lupilo
 * - Mr.Timbaba
 *
 *
 * @base MMORPG_Client
 * @orderAfter MMORPG_Client
 *
 */(()=>{"use strict";const t=window;const a=function(...t){},o=window.client,e=t.Game_Party.prototype.gainGold;t.Game_Party.prototype.gainGold=function(t){const a=this.gold();e.call(this,t);const n=this.gold();a!==n&&o.save(!1,"gold",{gold:n})};const n=t.Game_Party.prototype.gainItem;function r(t){const a=[];for(const o in t){const e=t[o],n=Number(o);Number.isSafeInteger(n)&&"number"==typeof e&&(e&&a.push([n,e]))}return Object.fromEntries(a)}t.Game_Party.prototype.gainItem=function(a,e,r){const s=this.numItems(a);n.call(this,a,e,r);const i=this.numItems(a);s!==i&&(t.DataManager.isItem(a)?o.save(!1,"item",{[a.id]:i}):t.DataManager.isWeapon(a)?o.save(!1,"weapon",{[a.id]:i}):t.DataManager.isArmor(a)&&o.save(!1,"armor",{[a.id]:i}))},o.start(!1,"gold",(o=>{const{gold:e}=o;if("number"!=typeof e)return a("no gold");t.$gameParty._gold=e})),o.start(!1,"item",(a=>{t.$gameParty._items=r(a)})),o.start(!1,"weapon",(a=>{t.$gameParty._weapons=r(a)})),o.start(!1,"armor",(a=>{t.$gameParty._armors=r(a)}))})();