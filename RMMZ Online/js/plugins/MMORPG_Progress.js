/*!
 * /*:
 * @target MZ
 * @plugindesc Switches, Variables
 * @author rmalizia44@gmail.com
 * @url https://rmalizia44.itch.io/
 * @help
 *
 * ⚔️ MMORPG Maker Plugin 0.9.1
 *
 * Using <Sync> on a switch or variable will save it to the database,
 * allowing each player’s data to be preserved across sessions. These
 * synchronized switches and variables are player-specific and do not
 * affect other players' gameplay states.
 *
 * By adding <global>, a switch or variable becomes universally unique
 * across the entire game, with any changes instantly affecting every
 * player.
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
 */(()=>{"use strict";const e=window;function t(t){return"number"==typeof t&&(!!Number.isSafeInteger(t)&&(!(t<=0)&&!(t>=e.$dataSystem.switches.length)))}function s(e){return"boolean"==typeof e}function i(t){return"number"==typeof t&&(!!Number.isSafeInteger(t)&&(!(t<=0)&&!(t>=e.$dataSystem.variables.length)))}function a(e){return"number"==typeof e}const n=window.client;e.Game_Switches.prototype.sync=function(){return this._sync||(this._sync=new Map),this._sync},e.Game_Switches.prototype.syncFind=function(e){return(e=e.toLowerCase()).includes("<sync>")?"sync":e.includes("<global>")?"global":""},e.Game_Switches.prototype.syncType=function(t){let s=this.sync().get(t);if(void 0===s){const i=e.$dataSystem.switches[t];s=i?this.syncFind(i):"",this.sync().set(t,s)}return s},e.Game_Switches.prototype.syncIsGlobal=function(e){return"global"===this.syncType(e)},e.Game_Switches.prototype.rawSet=e.Game_Switches.prototype.setValue;const r=e.Game_Switches.prototype.initialize;function o(i,a){for(const n in a){const r=a[n],o=Number(n);i===e.$gameSwitches.syncIsGlobal(o)?t(o)?s(r)?e.$gameSwitches.rawSet(o,r):console.error("incompatible switch value:",o,r):console.error("incompatible switch id:",o,r):console.error("incompatible switch:",o,r)}}e.Game_Switches.prototype.initialize=function(){r.call(this);const t=this.sync();e.$dataSystem.switches.forEach(((e,s)=>{t.set(s,e?this.syncFind(e):"")}))},e.Game_Switches.prototype.setValue=function(e,i){const a=this.value(e);if(this.rawSet(e,i),!t(e)||!s(i))return;if(a===i)return;if(!this.syncType(e))return;const r=this.syncIsGlobal(e);n.save(r,"switch",{[e]:i}),r&&n.broadcast(!0,"switch",e,i)},n.start(!1,"switch",(e=>o(!1,e))),n.start(!0,"switch",(e=>o(!0,e))),n.react(e.Scene_Base,"*","switch",((i,a,r,o)=>{const c=Number(r);return t(c)?s(o)?e.$gameSwitches.syncIsGlobal(c)?void e.$gameSwitches.rawSet(c,o):n.report(a,"switch incompatible"):n.report(a,"switch invalid value"):n.report(a,"switch invalid id")})),e.Game_Variables.prototype.sync=function(){return this._sync||(this._sync=new Map),this._sync},e.Game_Variables.prototype.syncFind=function(e){return(e=e.toLowerCase()).includes("<sync>")?"sync":e.includes("<global>")?"global":""},e.Game_Variables.prototype.syncType=function(t){let s=this.sync().get(t);if(void 0===s){const i=e.$dataSystem.variables[t];s=i?this.syncFind(i):"",this.sync().set(t,s)}return s},e.Game_Variables.prototype.syncIsGlobal=function(e){return"global"===this.syncType(e)},e.Game_Variables.prototype.rawSet=e.Game_Variables.prototype.setValue;const c=e.Game_Variables.prototype.initialize;function l(t,s){for(const n in s){const r=s[n],o=Number(n);t===e.$gameVariables.syncIsGlobal(o)?i(o)?a(r)?e.$gameVariables.rawSet(o,r):console.error("incompatible variable value:",o,r):console.error("incompatible variable id:",o,r):console.error("incompatible variable:",o,r)}}e.Game_Variables.prototype.initialize=function(){c.call(this);const t=this.sync();e.$dataSystem.variables.forEach(((e,s)=>{t.set(s,e?this.syncFind(e):"")}))},e.Game_Variables.prototype.setValue=function(e,t){const s=this.value(e);if(this.rawSet(e,t),!i(e)||!a(t))return;if(s===t)return;if(!this.syncType(e))return;const r=this.syncIsGlobal(e);n.save(r,"variable",{[e]:t}),r&&n.broadcast(!0,"variable",e,t)},n.start(!1,"variable",(e=>l(!1,e))),n.start(!0,"variable",(e=>l(!0,e))),n.react(e.Scene_Base,"*","variable",((t,s,r,o)=>{const c=Number(r);return i(c)?a(o)?e.$gameVariables.syncIsGlobal(c)?void e.$gameVariables.rawSet(c,o):n.report(s,"variable incompatible"):n.report(s,"variable invalid value"):n.report(s,"variable invalid id")}))})();