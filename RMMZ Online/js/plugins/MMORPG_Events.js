/*!
 * /*:
 * @target MZ
 * @plugindesc Events
 * @author rmalizia44@gmail.com
 * @url https://rmalizia44.itch.io/
 * @help
 *
 * ⚔️ MMORPG Maker Plugin 0.9.1
 *
 * Events with <Sync> in their note field will be synchronized on the map,
 * ensuring they appear in the same position and state for all players. This
 * allows consistent interaction with events across different player sessions.
 *
 * Be careful when using switches and variables that are not global
 * in events with <Sync>, as this may cause inconsistencies.
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
 * @base MMORPG_Characters
 * @orderAfter MMORPG_Characters
 *
 */(()=>{"use strict";const t=window;function e(e,n,a){return!!Number.isSafeInteger(e)&&(!!Number.isSafeInteger(n)&&(!(!Number.isSafeInteger(a)||a<1||a>9)&&!(t.$gameMap&&!t.$gameMap.isValid(e,n))))}const n=window.client;t.Game_Event.prototype.pack=function(e,n,a,i){return[t.$gameMap.mapId(),this.eventId(),e,n,a,i]},t.Game_Event.prototype.packIdle=function(){return this.pack(this.x,this.y,this.direction(),!1)},t.Game_Event.prototype.packMove=function(t,e,n){return this.pack(t,e,n,!1)},t.Game_Event.prototype.packJump=function(t,e,n){return this.pack(t,e,n,!0)},t.Game_Event.prototype.mustSync=function(){const t=this.event();return!(!t||!t.meta)&&Object.keys(t.meta).some((t=>"sync"===t.toLowerCase()))},t.Game_Event.prototype.applyStopPenalty=function(t=1){const e=1e3*(t+Math.random()),a=n.getPing()||1e3;this._stopCount-=Math.floor(60*(e+a)/1e3)},t.Game_Event.prototype.translate=function(t,e){this._x+=t,this._y+=e};const a=t.Game_Event.prototype.initialize;t.Game_Event.prototype.initialize=function(t,e){a.call(this,t,e),this.mustSync()&&this.applyStopPenalty()};const i=t.Game_Event.prototype.isCollidedWithCharacters;t.Game_Event.prototype.isCollidedWithCharacters=function(e,n){if(i.call(this,e,n))return!0;const a=t.$gameMap._remotes;if(!a)return!1;for(const t of a.values())if(t.posNt(e,n))return!0;return!1};const o=t.Game_Event.prototype.moveStraight;t.Game_Event.prototype.moveStraight=function(e){if(!this.mustSync())return o.call(this,e);this.resetStopCount(),this.applyStopPenalty();let a=this.x,i=this.y;this.canPass(a,i,e)&&(a=t.$gameMap.roundXWithDirection(this.x,e),i=t.$gameMap.roundYWithDirection(this.y,e)),n.publish(!0,"map","event",...this.packMove(a,i,e))};const r=t.Game_Event.prototype.moveDiagonally;t.Game_Event.prototype.moveDiagonally=function(e,a){if(!this.mustSync())return r.call(this,e,a);this.resetStopCount(),this.applyStopPenalty();let i=this.x,o=this.y;this.canPassDiagonally(i,o,e,a)&&(i=t.$gameMap.roundXWithDirection(this.x,e),o=t.$gameMap.roundYWithDirection(this.y,a));let p=this.direction();this._direction===this.reverseDir(e)&&(p=e),this._direction===this.reverseDir(a)&&(p=a),n.publish(!0,"map","event",...this.packMove(i,o,p))};const p=t.Game_Event.prototype.jump;t.Game_Event.prototype.jump=function(t,e){if(!this.mustSync())return p.call(this,t,e);this.resetStopCount(),this.applyStopPenalty();const a=this.x+t,i=this.y+e;let o=this.direction();Math.abs(t)>Math.abs(e)?0!==t&&(o=t<0?4:6):0!==e&&(o=e<0?8:2),n.publish(!0,"map","event",...this.packJump(a,i,o))},n.react(t.Scene_Map,"map","+",((e,a)=>{for(const e of t.$gameMap.events())e._auth&&e._auth!=n.user()||n.sendto(a,"event",...e.packIdle())})),n.react(t.Scene_Map,"map","-",((e,n)=>{for(const e of t.$gameMap.events())e._auth==n&&(e._auth=void 0)})),n.react(t.Scene_Base,["map","@"],"event",((a,i,o,r,s,c,u,h)=>{if("number"!=typeof(m=o)||!Number.isSafeInteger(m)||m<1||t.$dataMapInfos&&m>=t.$dataMapInfos.length)return n.report(i,"event invalid map");var m;if(t.$gameMap.mapId()!==o)return;if(!function(e){return!("number"!=typeof e||!Number.isSafeInteger(e)||e<1||t.$gameMap&&!t.$gameMap.event(e))}(r))return n.report(i,"event invalid id");if("number"!=typeof s)return n.report(i,"event invalid x");if("number"!=typeof c)return n.report(i,"event invalid y");if("number"!=typeof u)return n.report(i,"event invalid dir");if(!function(t,n,a){return!!e(t,n,a)}(s,c,u))return n.report(i,"event invalid move");if("boolean"!=typeof h)return n.report(i,"event invalid jump");const l=t.$gameMap.event(r);l._auth=i,l.setDirection(u);const v=a instanceof t.Scene_Map;if(h)v?p.call(l,s-l.x,c-l.y):l.locate(s,c);else{const e=t.$gameMap.distance(l._realX,l._realY,s,c);v&&e<3?l.translate(s-l.x,c-l.y):l.locate(s,c)}l.resetStopCount(),i!=n.user()&&l.applyStopPenalty()}))})();