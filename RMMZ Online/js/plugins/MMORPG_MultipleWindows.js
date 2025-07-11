/*!
 * /*:
 * @target MZ
 * @plugindesc Multiple Windows
 * @author rmalizia44@gmail.com
 * @url https://rmalizia44.itch.io/
 * @help
 *
 * ⚔️ MMORPG Maker Plugin 0.9.1
 *
 * This plugin enables the opening of multiple game windows by
 * modifying the package.json file (editor only).
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
 */(()=>{"use strict";var r={896:r=>{r.exports=require("fs")},928:r=>{r.exports=require("path")}},t={};function e(o){var n=t[o];if(void 0!==n)return n.exports;var i=t[o]={exports:{}};return r[o](i,i.exports,e),i.exports}const o=window,n={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let i;const s=new Uint8Array(16);const u=[];for(let r=0;r<256;++r)u.push((r+256).toString(16).slice(1));function a(r,t=0){return(u[r[t+0]]+u[r[t+1]]+u[r[t+2]]+u[r[t+3]]+"-"+u[r[t+4]]+u[r[t+5]]+"-"+u[r[t+6]]+u[r[t+7]]+"-"+u[r[t+8]]+u[r[t+9]]+"-"+u[r[t+10]]+u[r[t+11]]+u[r[t+12]]+u[r[t+13]]+u[r[t+14]]+u[r[t+15]]).toLowerCase()}const c=function(r,t,e){if(n.randomUUID&&!t&&!r)return n.randomUUID();const o=(r=r||{}).random??r.rng?.()??function(){if(!i){if("undefined"==typeof crypto||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");i=crypto.getRandomValues.bind(crypto)}return i(s)}();if(o.length<16)throw new Error("Random bytes length must be >= 16");if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,t){if((e=e||0)<0||e+16>t.length)throw new RangeError(`UUID byte range ${e}:${e+15} is out of buffer bounds`);for(let r=0;r<16;++r)t[e+r]=o[r];return t}return a(o)};try{if(o.Utils.isOptionValid("test")){const r=e(896),t=e(928),o=t.dirname(process.mainModule.filename),n=t.join(o,"package.json"),i=r.readFileSync(n,{encoding:"utf8"}),s=JSON.parse(i);s.name=c().replaceAll("-","");const u=JSON.stringify(s,void 0,4);r.writeFileSync(n,u,{encoding:"utf8"})}}catch(r){console.error(r)}})();