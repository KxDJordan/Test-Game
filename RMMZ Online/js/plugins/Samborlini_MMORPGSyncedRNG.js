/*: 
 * @target MZ
 * @plugindesc [Version 1.0] Deterministic RNG system with synced seed; no hit/miss logic included. Use for crits, variance, etc.
 *              Elects first party member on same map (no MMOPlayers dependency).
 *              Seed updates once per action to fix multihit desyncs.
 * @author Samborlini
 *
 * @param RNG Variable ID
 * @type variable
 * @desc The game variable that stores the deterministic RNG seed
 * @default 99
 *
 * @param Debug Mode
 * @type boolean
 * @desc Enable debug logging
 * @default false
 */

(() => {
  const pluginName = "Samborlini_MMORPGSyncedRNG";
  const parameters = PluginManager.parameters(pluginName);
  const variableId = Number(parameters["RNG Variable ID"] || 99);
  const debugMode = parameters["Debug Mode"] === 'true';

  function debugLog(...args) {
    if (debugMode) {
      console.log(...args);
    }
  }

  function getSelfId() {
    try {
      if (typeof client !== "undefined" && typeof client.user === "function") {
        return client.user();
      }
    } catch (e) {
      console.warn("[SyncedRNG] Could not retrieve self login name:", e);
    }
    return "";
  }

  function getPartyMembers(includeSelf = true) {
    const selfName = getSelfId();
    const partyActors = $gameParty.members();
    const names = partyActors.map(actor => actor.name()).filter(Boolean);
    return (includeSelf ? names : names.filter(n => n !== selfName)).sort();
  }

  function getPartyMembersOnMap(includeSelf = true) {
    const remotes = $gameMap.remotes?.() || new Map();
    const party = getPartyMembers(includeSelf);
    const selfName = getSelfId();

    return party.filter(name => {
      if (name === selfName) {
        return $gamePlayer.x !== 0 || $gamePlayer.y !== 0;
      }
      const remote = remotes.get(name);
      return remote && (remote._x !== 0 || remote._y !== 0);
    }).sort();
  }

  function electPartyLeader() {
    const partyOnMap = getPartyMembersOnMap(true);
    if (partyOnMap.length === 0) {
      console.warn("[SyncedRNG] No party members visible on map.");
      return null;
    }
    return partyOnMap[0];
  }

  window.MMORPGSyncedRNG = {
    _seed: 1,
    _seedUsedThisAction: false,
    _currentSeed: null,

    loadSeed() {
      if (this._seedUsedThisAction) return;
      if (!$gameVariables || !$gameParty || !$gameMap) return;

      const currentSeed = $gameVariables.value(variableId) >>> 0;
      this.setSeed(currentSeed);

      const myName = getSelfId();
      const leader = electPartyLeader();

      if (myName === leader) {
        let newSeed = currentSeed ^ (currentSeed << 13);
        newSeed = (newSeed >>> 0) ^ ((newSeed >>> 17) >>> 0);
        newSeed = (newSeed << 5) >>> 0;
        $gameVariables.setValue(variableId, newSeed >>> 0);
        this.setSeed(newSeed);
        debugLog(`[SyncedRNG] I (${myName}) am leader. Updated seed to ${newSeed}`);
      } else {
        debugLog(`[SyncedRNG] I (${myName}) am NOT leader (${leader}). Seed remains ${currentSeed}`);
      }

      this._seedUsedThisAction = true;
      this._currentSeed = $gameVariables.value(variableId) >>> 0;
    },

    setSeed(seed) {
      this._seed = seed >>> 0;
    },

    random() {
      let t = this._seed += 0x6D2B79F5;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    },

    randomInt(max) {
      return Math.floor(this.random() * max);
    },
  };

  const _BattleManager_startAction = BattleManager.startAction;
  BattleManager.startAction = function() {
    MMORPGSyncedRNG._seedUsedThisAction = false;
    MMORPGSyncedRNG._currentSeed = null;
    return _BattleManager_startAction.call(this);
  };
})();
