/*!
 * /*:
 * @target MZ
 * @plugindesc Time
 * @author rmalizia44@gmail.com
 * @url https://rmalizia44.itch.io/
 * @help
 *
 * ⚔️ MMORPG Maker Plugin 0.9.1
 *
 * This plugin gets a global time, multiplies it by the configured scale
 * value, and calculates a new date. The calculated date's day, month, hour,
 * and minute are stored in game variables configured in the plugin parameters.
 * These variables will not sync.
 *
 * WARNING: when you change the scale, you change the current game time
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
 * @param scale
 * @name Scale
 * @type number
 * @min 0.01
 * @decimals 2
 * @desc Adjust to scale how quickly time passes.
 * @default 1.0
 *
 * @param timestamp
 * @name Timestamp Variable ID
 * @type variable
 * @desc Variable to store the timestamp in seconds.
 * @default 0
 *
 * @param hour
 * @name Hour Variable ID
 * @type variable
 * @desc Variable to store the calculated hour.
 * @default 0
 *
 * @param minute
 * @name Minute Variable ID
 * @type variable
 * @desc Variable to store the calculated minute.
 * @default 0
 *
 * @param day
 * @name Day Variable ID
 * @type variable
 * @desc Variable to store the calculated day.
 * @default 0
 *
 * @param month
 * @name Month Variable ID
 * @type variable
 * @desc Variable to store the calculated month.
 * @default 0
 *
 */(()=>{"use strict";const e=window,a=e.PluginManager.parameters("MMORPG_Time"),t=Number(a.scale),s=Number(a.timestamp),r=Number(a.day),n=Number(a.month),u=Number(a.hour),o=Number(a.minute);const c=e.Game_Variables.prototype.syncType;e.Game_Variables.prototype.syncType=function(e){switch(e){case s:case r:case n:case u:case o:return"";default:return c.call(this,e)}};const i=e.Scene_Base.prototype.update;e.Scene_Base.prototype.update=function(){i.call(this),function(){const a=Date.now()*t,c=new Date(a);s&&e.$gameVariables.setValue(s,Math.floor(a/1e3)),r&&e.$gameVariables.setValue(r,c.getUTCDate()),n&&e.$gameVariables.setValue(n,c.getUTCMonth()+1),u&&e.$gameVariables.setValue(u,c.getUTCHours()),o&&e.$gameVariables.setValue(o,c.getUTCMinutes())}()}})();