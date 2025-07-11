/*!
 * /*:
 * @target MZ
 * @plugindesc Game Chat
 * @author rmalizia44@gmail.com
 * @url https://rmalizia44.itch.io/
 * @help
 *
 * ⚔️ MMORPG Maker Plugin 0.9.1
 *
 * A live chat system allow players to communicate and coordinate with
 * each other in real time, fostering an engaging and interactive community.
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
 * @param chatHorz
 * @text Chat Horizontal
 * @type boolean
 * @desc Chat Horizontal Position
 * @on Right
 * @off Left
 * @default false
 *
 * @param chatVert
 * @text Chat Vertical
 * @type boolean
 * @desc Chat Vertical Position
 * @on Bottom
 * @off Top
 * @default true
 *
 * @param chatFade
 * @text Chat Fade
 * @type number
 * @decimals 2
 * @desc Chat Fade Percentage per Frame
 * @default 0.1
 *
 * @param chatWidth
 * @text Chat Width
 * @type number
 * @desc Chat Width
 * @default 300
 *
 * @param chatHeight
 * @text Chat Height
 * @type number
 * @desc Chat Height
 * @default 100
 *
 * @param maxLength
 * @text Max Length
 * @type number
 * @desc Maximum Number of Characters Allowed
 * @default 64
 *
 * @param systemName
 * @text System Name
 * @type string
 * @desc Chat System Name
 * @default (System)
 *
 * @param welcomeMessage
 * @text Welcome Message
 * @type string
 * @desc Welcome Message to Show
 * @default Welcome to MMORPG!
 *
 * @param showLoginName
 * @text Show Login Name
 * @type boolean
 * @desc Show User Login as Name
 * @default false
 *
 * @param showTime
 * @text Show Time
 * @type boolean
 * @desc Show Time with Messages
 * @default true
 *
 * @param fontSize
 * @text Font Size
 * @type number
 * @desc Font Size in Pixels
 * @default 16
 *
 * @param inputPlaceholder
 * @text Input Placeholder
 * @type string
 * @desc Input Placeholder Text
 * @default ...
 *
 * @param sendText
 * @text Send Text
 * @type string
 * @desc Send Button Text
 * @default Send
 *
 * @param systemColor
 * @text System Color
 * @type string
 * @desc System Name Color
 * @default #B0C4DE
 *
 * @param selfColor
 * @text Self Color
 * @type string
 * @desc Self Name Color
 * @default #FF8C00
 *
 * @param otherColor
 * @text Other Color
 * @type string
 * @desc Other Player Name Color
 * @default #00BFFF
 *
 */(()=>{"use strict";const n=window;function e(){return Number(n.PluginManager.parameters("MMORPG_Chat").chatFade)||.1}function t(){return n.PluginManager.parameters("MMORPG_Chat").systemName||"(System)"}function a(){return n.PluginManager.parameters("MMORPG_Chat").systemColor||"#B0C4DE"}const r=document.createElement("div");r.id="chat-container",r.style.width=`${Number(n.PluginManager.parameters("MMORPG_Chat").chatWidth)||300}px`,r.style["true"==n.PluginManager.parameters("MMORPG_Chat").chatHorz?"right":"left"]="8px",r.style["true"==n.PluginManager.parameters("MMORPG_Chat").chatVert?"bottom":"top"]="8px";const o=document.createElement("div");o.id="chat-messages",o.style.height=`${Number(n.PluginManager.parameters("MMORPG_Chat").chatHeight)||100}px`,o.style.fontSize=`${Number(n.PluginManager.parameters("MMORPG_Chat").fontSize)||16}px`,r.appendChild(o);const s=document.createElement("div");s.id="chat-actions",r.appendChild(s);const i=document.createElement("input");i.id="message-input",i.type="text",i.placeholder=n.PluginManager.parameters("MMORPG_Chat").inputPlaceholder||"...",i.autocomplete="off",i.maxLength=function(){const e=Number(n.PluginManager.parameters("MMORPG_Chat").maxLength)||64;return Math.min(e,250)}(),s.appendChild(i);const c=document.createElement("button");c.id="send-button",c.innerText=n.PluginManager.parameters("MMORPG_Chat").sendText||"Send",s.appendChild(c);const d=document.createElement("style");d.textContent='\n#chat-container {\n    font-family: Arial, sans-serif;\n    position: fixed;\n    width: 300px;\n    background-color: rgba(0, 0, 0, 0.4);\n    /*border-radius: 10px;*/\n    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);\n    overflow: hidden;\n    z-index: 1000;\n    opacity: 0;\n}\n#chat-header {\n    display: flex;\n    background-color: #333;\n    padding: 8px;\n    justify-content: space-around;\n}\n#chat-header button.tab {\n    flex: 1 1 auto;\n    background-color: transparent;\n    border: none;\n    color: white;\n    cursor: pointer;\n    padding: 5px 10px;\n    /*border-radius: 10px;*/\n    /*transition: background-color 0.3s ease-in-out;*/\n    font-size: 16px;\n}\n#chat-header button.active {\n    background-color: #555;\n}\n#chat {\n    flex: 1 1 auto;\n    background-color: transparent;\n    border: none;\n    color: white;\n    padding: 5px 10px;\n    /*border-radius: 10px;*/\n    /*transition: background-color 0.3s ease-in-out;*/\n    font-size: 16px;\n}\n#chat-header button#minimize {\n    background-color: #414141;\n    /*border-radius: 50%;*/\n    color: white;\n    flex: 0 0 auto;\n    border: none;\n    margin-left: 4px;\n    cursor: pointer;\n    padding: 5px 10px;\n}\n#chat-messages {\n    overflow-y: scroll;\n    overflow-x: hidden;\n    padding: 10px;\n    color: white;\n    scrollbar-width: thin;\n    scrollbar-color: #555 rgba(0, 0, 0, 0.3);\n    height: 100px;\n}\n#chat-messages::-webkit-scrollbar {\n    width: 6px;\n}\n#chat-messages::-webkit-scrollbar-track {\n    background: rgba(0, 0, 0, 0.3);\n}\n#chat-messages::-webkit-scrollbar-thumb {\n    background-color: #555;\n    /*border-radius: 10px;*/\n}\n.msg-time {\n    margin-right: 4px;\n}\n.msg-from {\n    font-weight: bold;\n    margin-right: 4px;\n}\n.msg-text {\n    font-weight: normal;\n}\n#chat-actions {\n    width: 100%;\n    display: flex;\n    /*background-color: rgba(0, 0, 0, 0.4);*/\n    /*padding: 8px;*/\n}\n#chat-actions input[type="text"] {\n    flex: 1 1 auto;\n    padding: 5px;\n    border: none;\n    font-size: 16px;\n    /*border-radius: 5px;*/\n    margin: 8px;\n    margin-right: 0;\n}\n#chat-actions button {\n    flex: 0 0 auto;\n    background-color: #555;\n    border: none;\n    /*border-radius: 5px;*/\n    color: white;\n    cursor: pointer;\n    padding: 5px 10px;\n    margin: 8px;\n    font-size: 16px;\n}\n',r.appendChild(d),document.body.appendChild(r);const p=window.client;let u=0,l=!0;function g(n){l!==n&&(l=n)}function h(n){n.stopPropagation()}function m(e,t,a){const r=document.createElement("div");if(r.classList.add("message"),"true"==n.PluginManager.parameters("MMORPG_Chat").showTime){const n=document.createElement("span");n.classList.add("msg-time"),n.innerText=function(){const n=new Date;return`${n.getHours().toString().padStart(2,"0")}:${n.getMinutes().toString().padStart(2,"0")}`}(),r.appendChild(n)}const s=document.createElement("span");s.classList.add("msg-from"),s.innerText=`${e}:`,s.style.color=a,r.appendChild(s);const i=document.createElement("span");i.classList.add("msg-text"),i.innerText=t,r.appendChild(i),o.appendChild(r),o.scrollTop=o.scrollHeight}function M(e){const t="true"==n.PluginManager.parameters("MMORPG_Chat").showLoginName?p.user():n.$gameParty.leader().name();m(t,e,n.PluginManager.parameters("MMORPG_Chat").selfColor||"#FF8C00"),p.publish(!1,"map","chat",t,e,n.PluginManager.parameters("MMORPG_Chat").otherColor||"#00BFFF")}function x(){const n=i.value.trim();if(i.value="",!n)return i.blur();if(i.focus(),n.startsWith("\\")){const[e,...r]=n.substring(1).split(" ");!function(n){m(t(),`Unrecognized command: ${n}`,a())}(e,...r)}else M(n)}r.addEventListener("mousedown",h),r.addEventListener("mousemove",h),r.addEventListener("mouseup",h),r.addEventListener("wheel",h),r.addEventListener("touchstart",h),r.addEventListener("touchmove",h),r.addEventListener("touchend",h),r.addEventListener("touchcancel",h),document.addEventListener("keydown",(function(n){switch(n.code){case"Enter":case"NumpadEnter":return void(document.activeElement!==i&&i.focus())}})),i.addEventListener("keydown",(function(n){switch(n.stopPropagation(),n.code){case"Enter":case"NumpadEnter":return x()}})),i.addEventListener("keyup",(function(n){n.stopPropagation()})),i.addEventListener("focus",(function(n){})),i.addEventListener("blur",(function(n){})),c.addEventListener("click",x),g(!1);function f(){g(n.SceneManager._scene instanceof n.Scene_Map)}window.chat=new class{addMessage(n,e,t){m(n,e,t)}};const b=n.Scene_Base.prototype.start;n.Scene_Base.prototype.start=function(){f(),b.call(this)};const w=n.Scene_Base.prototype.update;n.Scene_Base.prototype.update=function(){w.call(this),u=l?Math.min(u+e(),1):Math.max(u-e(),0),r.style.opacity=u.toString(),r.style.pointerEvents=l?"auto":"none"};const y=n.Window_Message.prototype.startMessage;n.Window_Message.prototype.startMessage=function(){return g(!1),y.call(this)};const P=n.Window_Message.prototype.startInput;n.Window_Message.prototype.startInput=function(){const n=P.call(this);return n&&g(!1),n};const v=n.Window_Message.prototype.terminateMessage;n.Window_Message.prototype.terminateMessage=function(){return f(),v.call(this)},p.start(!1,"chat",(e=>{const r=n.PluginManager.parameters("MMORPG_Chat").welcomeMessage?.trim();r&&m(t(),r,a())})),p.react(n.Scene_Base,"map","chat",((n,e,t,a,r)=>"string"!=typeof t?p.report(e,"chat invalid name"):"string"!=typeof a?p.report(e,"chat invalid text"):"string"!=typeof r?p.report(e,"chat invalid color"):void m(t,a,r)))})();