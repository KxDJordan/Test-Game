/*!
 * /*:
 * @target MZ
 * @plugindesc Self Switches
 * @author rmalizia44@gmail.com
 * @url https://rmalizia44.itch.io/
 * @help
 *
 * ⚔️ MMORPG Maker Plugin 0.9.1
 *
 * When you add <SelfSwitches> in the event note, the self switches of
 * that event will be synchronized and saved in the database, allowing
 * each player’s data to be preserved across sessions. These synchronized
 * switches and variables are player-specific and do not affect other
 * players' gameplay states.
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
 */(()=>{"use strict";const e=window;function t(e){if(!Array.isArray(e))return!1;const[t,n,s]=e;return!("number"!=typeof t||!Number.isSafeInteger(t))&&(!("number"!=typeof n||!Number.isSafeInteger(n))&&("string"==typeof s&&(!(t<1)&&(!(n<1)&&1==s.length))))}function n(e){return function(e){return"boolean"==typeof e}(e)}const s=window.client;e.Game_SelfSwitches.prototype.sync=function(){return this._sync||(this._sync=new Map),this._sync},e.Game_SelfSwitches.prototype.syncFind=function(e){return e.toLowerCase()},e.Game_SelfSwitches.prototype.syncType=function(t){let n=this.sync().get(t);const[s,i,r]=t;if(void 0===n&&e.$gameMap&&e.$gameMap.mapId()==s){const s=e.$gameMap.event(i)?.event()?.meta;if(s){const e=Object.entries(s).find((([e,t])=>"selfswitches"==e.toLowerCase()));if(e){const t=e[1];n="string"==typeof t?this.syncFind(t):t?"sync":""}else n="";this.sync().set(t,n)}}return n||""},e.Game_SelfSwitches.prototype.rawSet=e.Game_SelfSwitches.prototype.setValue,e.Game_SelfSwitches.prototype.setValue=function(e,i){const r=this.value(e);if(this.rawSet(e,i),!t(e)||!n(i))return;if(r===i)return;if(!this.syncType(e))return;const[o,c,f]=e,a=`${o}x${c}x${f}`;s.save(!1,"selfSwitch",{[a]:i})},s.start(!1,"selfSwitch",(s=>function(s,i){for(const s in i){const r=i[s],[o,c,f]=s.split("x"),a=[Number(o),Number(c),f];t(a)?n(r)?e.$gameSelfSwitches.rawSet(a,r):console.error("incompatible selfSwitch value:",a,r):console.error("incompatible selfSwitch key:",a,r)}}(0,s)))})();