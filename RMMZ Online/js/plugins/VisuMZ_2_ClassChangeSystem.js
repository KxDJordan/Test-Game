//=============================================================================
// VisuStella MZ - Class Change System
// VisuMZ_2_ClassChangeSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_ClassChangeSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ClassChangeSystem = VisuMZ.ClassChangeSystem || {};
VisuMZ.ClassChangeSystem.version = 1.18;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.18] [ClassChangeSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Class_Change_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds the ability for your player to freely change the classes of
 * actors outside of battle from a menu. When changing into different classes,
 * players adjust the game's actors to a different playstyle with different
 * skills, equipment, and traits to make them behave differently.
 * 
 * Multiclassing is also possible. Actors can possess one class to many, from
 * two to ten to as many as you've set up in the Plugin Parameters. Adjust the
 * rulings for how multiclasses behave in your game. Let actors inherit a small
 * percentage of parameters from the multiclasses, skills, equipment access,
 * and more!
 *
 * Features include all (but not limited to) the following:
 * 
 * * A custom scene to let actors change their classes inside of.
 * * When class changing, determine if levels are maintained across all classes
 *   or if each class has their own levels to raise.
 * * Multiclasses allow actors to have more than one class at a time.
 * * Determine the rulings for each multiclass tier through the Plugin
 *   Parameters to gain control over how they influence your game.
 * * Restrict certain multiclass tiers from being able to change classes.
 * * Allow only some classes to be equippable to specific multiclass tiers.
 * * Unlock new classes automatically by reaching certain class levels or when
 *   certain resources have reached certain thresholds.
 * * These resources the new Class Points and Job Points.
 * * Class Points and Job Points are brand new resources added through this
 *   plugin which can be acquired through a variety a means ranging from
 *   participating in battle, defeating enemies, and/or leveling up.
 * * Also unlock classes through Plugin Commands!
 * * Actors can have class specific graphics depending on their primary class.
 *   Appearance changes range from faces, map sprites, battlers, and portraits
 *   used by other VisuStella MZ plugins.
 * * Play an animation on the actor inside the Class Change scene when changing
 *   classes.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Class Specific Graphics
 * 
 * If an actor has class specific graphics, they will overwrite the face
 * graphic, map character sprite graphic, battler graphic, and any portraits
 * that have been added through the VisuStella MZ plugins. The class specific
 * graphics will take priority over the default graphics.
 * 
 * ---
 * 
 * Change Actor Images Event Command
 * 
 * When changing an actor's graphics through the "Change Actor Images" event
 * command, these changes will take priority over the Class Specific Graphics.
 * If you want to remove these priority graphics, set the "Change Actor Images"
 * images to "(None)".
 * 
 * Keep in mind that this means you cannot make an "invisible" graphic through
 * the "(None)" selection anymore. Instead, you need to make a work around by
 * making a custom graphic image that is fully transparent.
 *
 * ---
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_3_VictoryAftermath
 *
 * If VisuStella MZ's Victory Aftermath plugin is installed, the amount of
 * Job Points and Class Points earned can be visibly shown in the rewards
 * window.
 *
 * ---
 *
 * VisuMZ_1_BattleCore
 * 
 * VisuMZ_1_MainMenuCore
 *
 * If the Battle Core and/or the Main Menu Core is installed, the Class Change
 * System also gives access to notetags that alter their battle portraits
 * and/or menu portraits based on whatever class an actor is.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 * 
 * Core Engine VisuStella MZ
 * 
 * The Core Engine will determine if icons are displayed next to class names
 * for menus. If you do not wish to use them, then you will need to disable
 * them via the Plugin Parameters:
 * 
 *   Core Engine > Plugin Parameters > UI Settings > Text Code > Class Names
 * 
 * Then, set that value to false.
 * 
 * ---
 *
 * ============================================================================
 * Clarification
 * ============================================================================
 *
 * This section is to add clarification on some questions you may have
 * regarding the Class Change System.
 *
 * ---
 *
 * Q. Why do my actors have access to random skill(s) of x class(es)?
 * 
 * A. Are those classes a part of the classes that have already been unlocked?
 * Are the skills learned at level 1 for those classes? And are those classes
 * sharing a particular Skill Type? Then that's your answer.
 * 
 * When classes are unlocked, they are unlocked at level 1. When unlocked at
 * level 1, all of the skills at level 1 are also learned by that actor. And if
 * the classes all share a Skill Type, those skills will also become available
 * to that Skill Type.
 * 
 * If you don't want your classes to have access to all of the skills of the
 * same Skill Type, then give them different Skill Types unique to each class
 * and change the Skill Types of the skills taught for those classes to that
 * class's unique Skill Type.
 *
 * ---
 * 
 * Q. Why does the <Passive State: x> notetag from Skills and States Core apply
 * even if my actor does not have access to the parent skill?
 * 
 * A. Skills with the <Passive State: x> notetag only have a requirement of the
 * skills needing to be learned. It does not have a requirement of the skills
 * needing to be accessible through the Skill Types.
 * 
 * Even without the Class Change System, if you teach an actor a skill that
 * has a Skill Type the actor does not have access to, that actor will still
 * benefit from the <Passive State: x> notetag.
 * 
 * To make it apply only when a certain class is present, you will need to
 * utilize the Passive Condition notetags found in the Skills and States Core.
 * 
 * ---
 * 
 * Q. How do I get the data on which classes and multiclasses an actor has?
 * 
 * A. You would have to use the following code to acquire their data:
 * 
 *   actor.multiclasses()
 *   - This returns an array of all of the multiclasses an actor has.
 *   - This includes the actor's primary class.
 * 
 *   actor.multiclass(x)
 *   - This returns the class data (not ID) of whatever class the actor has
 *     in x multiclass slot.
 *   - An x value of 1 would yield the primary class.
 * 
 *   actor.multiclassId(x)
 *   - This returns the class ID (not data) of whatever class the actor has
 *     in x multiclass slot.
 *   - An x value of 1 would yield the primary class's ID.
 * 
 * ---
 * 
 * Q. How come my subclasses don't gain levels or EXP when I use event commands
 *    on my actors?
 * 
 * A. EXP Reward Rates for subclasses only apply to battle rewards. The event
 *    commands do not affect class settings in case the game dev wishes to fine
 *    tune the amount of EXP each class.
 * 
 * ---
 * 
 * Q. How come subclasses do not appear in the Skill Learn System?
 * 
 * A. That's because class-based resources and requirements are different
 *    depending on the primary class and how they're set up. To avoid
 *    conflicting with subclass resources and requirements, the Skill Learn
 *    System only makes it available for the primary class to learn skills from
 *    at a time. To learn skills from a subclass through the Skill Learn System
 *    the player would have to change to the subclass' class as the primary and
 *    then learn from it.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === Class Basics-Related Notetags ===
 * 
 * ---
 *
 * <Icon: x>
 *
 * - Used for: Class Notetags
 * - Assigns an icon index for the class to 'x'.
 * - Replace 'x' with a number representing the index value on the IconSet
 *   image in the img/system/ folder for the icon you want to assign.
 * - If this notetag is not used, the icon index will default to the setting
 *   found in the Class Change System's Plugin Parameters.
 *
 * ---
 *
 * <Help Description>
 *  text
 *  text
 * </Help Description>
 *
 * - Used for: Class Notetags
 * - Assigns a help description to the class.
 * - Replace 'text' with text you want displayed when this class is selected
 *   in the Class Change scene's class list.
 * - If this notetag is not used, the help description will default to the
 *   setting found in the Class Change System's Plugin Parameters.
 *
 * ---
 *
 * <Class Change Animation: x>
 *
 * - Used for: Class Notetags
 * - Assigns an animation for the class when the actor changes to that class.
 * - Replace 'x' with a number representing the ID of the animation found in
 *   the database to play when the actor changes to that class.
 * - If this notetag is not used, the animation will default to the setting
 *   found in the Class Change System's Plugin Parameters.
 *
 * ---
 * 
 * <Class Change Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Class Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   class's icon during for the Class Change scene.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of class changing, too.
 * - The size used for the image will vary based on your game's resolution.
 * 
 * ---
 * 
 * === Class Specific Graphics-Related Notetags ===
 * 
 * ---
 *
 * <Class id Face: filename, index>
 * 
 * <Class name Face: filename, index>
 *
 * - Used for: Actor Notetags
 * - Gives this actor a class specific face graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/faces/ folder. Do not include the file extension.
 * - Replace 'index' with the index of the graphic. Index values start at 0.
 * 
 * Examples: 
 * 
 *   <Class 1 Face: Actor2, 0>
 * 
 *   <Class Swordsman Face: Actor2, 0>
 *
 * ---
 *
 * <Class id Character: filename, index>
 * 
 * <Class name Character: filename, index>
 *
 * - Used for: Actor Notetags
 * - Gives this actor a class specific map character sprite graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/characters/ folder. Do not include the file extension.
 * - Replace 'index' with the index of the graphic. Index values start at 0.
 * 
 * Examples: 
 * 
 *   <Class 1 Character: Actor2, 0>
 * 
 *   <Class Swordsman Character: Actor2, 0>
 *
 * ---
 *
 * <Class id Battler: filename>
 * 
 * <Class name Battler: filename>
 *
 * - Used for: Actor Notetags
 * - Gives this actor a class specific sideview battler graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/sv_actors/ folder. Do not include the file extension.
 * 
 * Examples: 
 * 
 *   <Class 1 Battler: Actor2_1>
 * 
 *   <Class Swordsman Battler: Actor2_1>
 *
 * ---
 *
 * <Class id Menu Portrait: filename>
 * 
 * <Class name Menu Portrait: filename>
 *
 * - Used for: Actor Notetags
 * - Requires VisuMZ_1_MainMenuCore!
 * - Gives this actor a class specific menu portrait graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/pictures/ folder. Do not include the file extension.
 * 
 * Examples: 
 * 
 *   <Class 1 Menu Portrait: Actor2_1>
 * 
 *   <Class Swordsman Menu Portrait: Actor2_1>
 *
 * ---
 *
 * <Class id Battle Portrait: filename>
 * 
 * <Class name Battle Portrait: filename>
 *
 * - Used for: Actor Notetags
 * - Requires VisuMZ_1_BattleCore!
 * - Gives this actor a class specific battle portrait graphic.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/pictures/ folder. Do not include the file extension.
 * 
 * Examples: 
 * 
 *   <Class 1 Battle Portrait: Actor2_1>
 * 
 *   <Class Swordsman Battle Portrait: Actor2_1>
 *
 * ---
 * 
 * === Class Unlocking-Related Notetags ===
 * 
 * ---
 *
 * <Unlocked Classes: id>
 * <Unlocked Classes: id, id, id>
 * 
 * <Unlocked Classes: name>
 * <Unlocked Classes: name, name, name>
 *
 * - Used for: Actor Notetags
 * - Allows this actor to start with certain classes unlocked. These classes
 *   are unlocked in addition to the ones found in the Plugin Parameters.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 * - Insert multiple data entries to unlock more classes.
 *
 * ---
 *
 * <Auto Unlock Requirements>
 *  Class id: Level x
 *  Class name: Level x
 * 
 *  Class id: x AP
 *  Class name: x AP
 * 
 *  Class id: x CP
 *  Class name: x CP
 * 
 *  Class id: x JP
 *  Class name: x JP
 * 
 *  Class id: x SP
 *  Class name: x SP
 * 
 *  AP: x
 *  CP: x
 *  JP: x
 *  SP: x
 * </Auto Unlock Requirements>
 *
 * - Used for: Class Notetags
 * - Have this class unlock automatically whenever all of the conditions have
 *   been met after a battle is over or upon entering the Class Change scene.
 * - Insert/delete any number of copies of the middle conditions as needed.
 * - For 'id' conditions, replace 'id' with a number representing class's ID.
 * - For 'name' conditions, replace 'name' with the class's name.
 * - For 'AP', 'CP', 'JP', 'SP' conditions that have class markers, they
 *   require that many of the resource as the 'x' value for that class.
 *   These are best used with resource types that are class specific.
 * - For 'AP', 'CP', 'JP', 'SP' conditions that have class markers, they
 *   require that many of the resource as the 'x' value for the current class.
 *   These are best used with resource types that are shared.
 * - 'AP' and 'SP' conditions require VisuMZ_2_SkillLearnSystem.
 * 
 * Examples:
 * 
 * <Auto Unlock Requirements>
 *  Class 4: Level 20
 *  Class 6: Level 15
 * </Auto Unlock Requirements>
 * 
 * <Auto Unlock Requirements>
 *  Class Knight: Level 20
 *  Class Spellblade: Level 15
 * </Auto Unlock Requirements>
 * 
 * <Auto Unlock Requirements>
 *  Class Knight: 200 JP
 *  Class Spellblade: 100 JP
 * </Auto Unlock Requirements>
 * 
 * <Auto Unlock Requirements>
 *  Class Knight: 200 JP
 *  CP: 500
 * </Auto Unlock Requirements>
 *
 * ---
 * 
 * === Category-Related Notetags ===
 * 
 * ---
 *
 * <Starting Multiclasses: x>
 *
 * - Used for: Actor Notetags
 * - Lets the actor start with 'x' amount of class slots to assign.
 * - Replace 'x' with a number value representing the number of slots the
 *   actor can assign classes to.
 * - If this notetag is not used, the slot values will default to the setting
 *   found in the Class Change System's Plugin Parameters.
 * - Slot values cannot go under 1 or exceed the maximum number of layers found
 *   in the "Multiclass Settings" Plugin Parameters.
 *
 * ---
 *
 * <Starting Tier x Class: id>
 * 
 * <Starting Tier x Class: name>
 *
 * - Used for: Actor Notetags
 * - If an actor has multiclass slots, determine which subclasses are assigned
 *   to them at the start.
 * - Replace 'x' with a number value representing the multiclass slot to assign
 *   to. '1' is the primary slot. '2' is the second slot.
 * - For 'id' conditions, replace 'id' with a number representing class's ID.
 * - For 'name' conditions, replace 'name' with the class's name.
 * - Insert multiple copies of this notetag to assign multiple classes to
 *   different slots.
 * 
 * Example:
 * 
 * <Starting Tier 2 Class: Sorcerer>
 * 
 * <Starting Tier 3 Class: Priest>
 *
 * ---
 *
 * <Restrict Class Change Tier: x>
 * <Restrict Class Change Tiers: x, x, x>
 *
 * - Used for: Actor Notetags
 * - This makes an actor unable to change the class found in any of the listed
 *   tier slots unless this effect is cancelled by Plugin Commands.
 * - Replace 'x' with a number representing the tier slot(s) to restrict.
 *
 * ---
 *
 * <Class Change Tier Only: x>
 * <Class Change Tiers Only: x, x, x>
 *
 * - Used for: Class Notetags
 * - This makes the specific class only assignable to specific class tiers.
 * - Replace 'x' with a number representing the tier slot(s) that this class
 *   can be assigned and equipped to.
 *
 * ---
 * 
 * === Class Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting CP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Class Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Class Points
 *   to start out with.
 *
 * ---
 *
 * <Class id Starting CP: x>
 * <Class name Starting CP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Class Points the actor starts with in a specific
 *   class if Class Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Class Points
 *   to start out with.
 * - Replace 'id' with the ID of the class to set starting Class Points for.
 * - Replace 'name' with the name of the class to set starting Class Points
 *   for.
 *
 * ---
 *
 * <CP Gain: x>
 * <User CP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Class Points.
 * - Replace 'x' with a number representing the amount of Class Points for the
 *   user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Class Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Target CP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Class Points.
 * - Replace 'x' with a number representing the amount of Class Points for the
 *   target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <CP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Class Points the enemy will give the player's
 *   party upon being defeated.
 * - Replace 'x' with a number representing the amount of Class Points to grant
 *   the player's party each.
 * - This effect will take over the "Per Enemy" Class Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <CP Plus: +x%>
 * <CP Plus: -x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Class Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Class
 *   Points that will be acquired.
 * - This stacks additively with each other.
 * - This does not apply when Class Points are directly added, lost, or set.
 * - CP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 *
 * ---
 *
 * <CP Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Class Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Class
 *   Points that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Class Points are directly added, lost, or set.
 * - CP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 *
 * ---
 *
 * <CP Flat: +x%>
 * <CP Flat: -x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Class Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Class
 *   Points that will be acquired.
 * - This stacks additively with each other.
 * - This does not apply when Class Points are directly added, lost, or set.
 * - CP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 *
 * ---
 * 
 * === Job Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting JP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Job Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Job Points to
 *   start out with.
 *
 * ---
 *
 * <Class id Starting JP: x>
 * <Class name Starting JP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Job Points the actor starts with in a specific
 *   class if Job Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Job Points to
 *   start out with.
 * - Replace 'id' with the ID of the class to set starting Job Points for.
 * - Replace 'name' with the name of the class to set starting Job Points for.
 *
 * ---
 *
 * <JP Gain: x>
 * <User JP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Job Points.
 * - Replace 'x' with a number representing the amount of Job Points for the
 *   user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Job Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Target JP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Job Points.
 * - Replace 'x' with a number representing the amount of Job Points for the
 *   target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <JP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Job Points the enemy will give the player's party
 *   upon being defeated.
 * - Replace 'x' with a number representing the amount of Job Points to grant
 *   the player's party each.
 * - This effect will take over the "Per Enemy" Job Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <JP Plus: +x%>
 * <JP Plus: -x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Job Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Job Points
 *   that will be acquired.
 * - This stacks additively with each other.
 * - This does not apply when Job Points are directly added, lost, or set.
 * - JP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 *
 * ---
 *
 * <JP Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Job Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Job Points
 *   that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Job Points are directly added, lost, or set.
 * - JP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 *
 * ---
 *
 * <JP Flat: +x%>
 * <JP Flat: -x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Job Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Job Points
 *   that will be acquired.
 * - This stacks additively with each other.
 * - This does not apply when Job Points are directly added, lost, or set.
 * - JP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Unlock Class Plugin Commands ===
 * 
 * ---
 *
 * Unlock Class: Add For Actor(s)
 * - Unlock class(es) for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to unlock class(es) for.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be unlocked.
 *
 * ---
 *
 * Unlock Class: Add For Global
 * - Unlock class(es) for all party members.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be unlocked.
 *
 * ---
 *
 * Unlock Class: Remove From Actor(s)
 * - Remove unlock class(es) for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to remove an unlocked class(es) for.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be removed from the unlocked status.
 *
 * ---
 *
 * Unlock Class: Remove From Global
 * - Remove unlock class(es) for all party members.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to be removed from the unlocked status.
 *
 * ---
 * 
 * === Change Restriction Plugin Commands ===
 * 
 * ---
 *
 * Change Restriction: Add Tier Restriction
 * - Add restrictions to prevent class changing specific tier(s) to
 *   target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to restrict class tier(s) for.
 *
 *   Tiers(s):
 *   - Select which class tier(s) to restrict changing for.
 *
 * ---
 *
 * Change Restriction: Remove Tier Restriction
 * - Remove restrictions to allow class changing specific tier(s) for
 *   target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to remove class tier(s) restrictions for.
 *
 *   Tiers(s):
 *   - Select which class tier(s) to remove restrictions for.
 *
 * ---
 * 
 * === Multiclass Plugin Commands ===
 * 
 * ---
 *
 * Multiclass: Change Actor(s) Multiclass
 * - Changes a specific multiclass for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Tier:
 *   - Which multiclass tier to change for the target actor(s)?
 *
 *   Class ID:
 *   - Which class should go into this multiclass tier slot?
 *
 * ---
 *
 * Multiclass: Raise Limit for Actor(s)
 * - Raise the multiclass limit for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Raise Limit By:
 *   - Raise the multiclass limit for target actor(s) by this much.
 *
 * ---
 *
 * Multiclass: Lower Limit for Actor(s)
 * - Lower the multiclass limit for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Reduce Limit By:
 *   - Lower the multiclass limit for target actor(s) by this much.
 *
 * ---
 *
 * Multiclass: Set Limit for Actor(s)
 * - Set multiclass limit for target actor(s).
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to change the multiclass limit to.
 *
 *   Set Limit To:
 *   - Set multiclass limit for target actor(s) to this much.
 *
 * ---
 * 
 * === Class Points Plugin Commands ===
 * 
 * ---
 *
 * Class Points: Gain
 * - The target actor(s) gains Class Points.
 * - Gained amounts are affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Class Points: Add
 * - The target actor(s) receives Class Points.
 * - Received amounts are NOT affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Class Points: Lose
 * - The target actor(s) loses Class Points.
 * - Lost amounts are NOT affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Class Points: Set
 * - Changes the exact Class Points for the target actor(s).
 * - Changed amounts are NOT affected by Class Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Class Points for.
 *   - Use "0" for the current class.
 *
 *   Class Points:
 *   - Determine how many Class Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === Job Points Plugin Commands ===
 * 
 * ---
 *
 * Job Points: Gain
 * - The target actor(s) gains Job Points.
 * - Gained amounts are affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Job Points: Add
 * - The target actor(s) receives Job Points.
 * - Received amounts are NOT affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Job Points: Lose
 * - The target actor(s) loses Job Points.
 * - Lost amounts are NOT affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Job Points: Set
 * - Changes the exact Job Points for the target actor(s).
 * - Changed amounts are NOT affected by Job Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Job Points for.
 *   - Use "0" for the current class.
 *
 *   Job Points:
 *   - Determine how many Job Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Enable Class Change in Menu?
 * - Enables/disables Class Change inside the main menu.
 *
 *   Enable/Disable?:
 *   - Enables/disables Class Change inside the main menu.
 *
 * ---
 *
 * System: Show Class Change in Menu?
 * - Shows/hides Class Change inside the main menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Class Change inside the main menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings for Class Change System.
 *
 * ---
 *
 * Basics
 * 
 *   Default Help:
 *   - Default help description for all classes.
 *   - %1 - Class Name
 * 
 *   Default Icon:
 *   - Default icon used for all classes.
 * 
 *   Maintain Levels?:
 *   - Make each class have the same level or make each class have
 *     their own level?
 * 
 *   Change-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing classes with MaxHP/MaxMP values.
 * 
 *   Select Same Subclass?:
 *   - Allow selecting the same subclass that's already equipped in that slot?
 *   - Mostly an aesthetic thing to allow/prevent the same subclass from being
 *     selected if that's what you want to control.
 *
 * ---
 *
 * Class Unlocking
 * 
 *   Always Unlocked:
 *   - Which classes are always unlocked and available?
 * 
 *   Starting Multiclasses:
 *   - How many classes can actors use at the start by default?
 *   - Use 1 for just the primary class.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_ClassChange.
 *
 * ---
 *
 * Background Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 * 
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Class Change Sound Settings
 * ============================================================================
 *
 * Sound effect played when changing classes through Scene_ClassChange.
 *
 * ---
 *
 * Class Change Sound Settings
 * 
 *   Filename:
 *   - Filename of the sound effect played.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Access Settings
 * ============================================================================
 *
 * Menu Access settings for Class Change.
 *
 * ---
 *
 * Main Menu Settings
 * 
 *   Command Name:
 *   - Name of the 'ClassChangeSystem' option in the Main Menu.
 * 
 *   Show in Main Menu?:
 *   - Add the 'ClassChangeSystem' option to the Main Menu by default?
 * 
 *   Enable in Main Menu?:
 *   - Enable the 'ClassChangeSystem' option to the Main Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Multiclass Settings
 * ============================================================================
 *
 * Multiclass settings for this plugin. Each tier allows you to have separate
 * settings. The order the tiers are inserted will represent the settings that
 * will be applied to those tiers when classes are assigned in those slots.
 * 
 * The majority of these settings do not apply to Tier 1 because Tier 1 is the
 * primary class. However, Tier 1 must exist in these Plugin Parameters to
 * provide settings for the Class Change scene.
 *
 * ---
 *
 * General
 * 
 *   Class Tier Name:
 *   - Name of this class tier.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Help Description:
 *   - Help description when this multiclass slot is picked.
 *
 * ---
 *
 * Base Parameter Bonuses
 * 
 *   MaxHP:
 *   MaxMP:
 *   ATK:
 *   DEF:
 *   MAT:
 *   MDF:
 *   AGI:
 *   LUK:
 *   - How little of this class tier's parameter should be added to base stats?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Reward Rates
 * 
 *   EXP:
 *   - How much EXP does a class in this tier earn?
 *   - Does not apply to Tier 1. Only for Battle Rewards.
 * 
 *   Resources:
 *   - Resource rate (ie. CP, JP) earned for this tier.
 *   - Does not apply to Tier 1. Only for Battle Rewards.
 *
 * ---
 *
 * Inherit Traits > Rates
 * 
 *   Element Rates?:
 *   - Inherit the element rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Debuff Rates?:
 *   - Inherit the debuff rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   State Rates?:
 *   - Inherit the state rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   State Resistance?:
 *   - Inherit the state resistances from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Param Rates
 * 
 *   Base-Param Rates?:
 *   - Inherit Base Parameter rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   X-Param Rates?:
 *   - Inherit X-Parameter rates from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   S-Param Rates?:
 *   - Inherit S-Parameter rates from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Attack
 * 
 *   Attack Elements?:
 *   - Inherit the attack elements from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Attack States?:
 *   - Inherit the attack states from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Skills
 * 
 *   Added STypes?:
 *   - Inherit the added STypes from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Added Skills?:
 *   - Inherit the added skills from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * Inherit Traits > Equipment
 * 
 *   Equippable Weapons?:
 *   - Inherit the equippable weapons from this class tier?
 *   - Does not apply to Tier 1.
 * 
 *   Equippable Armors?:
 *   - Inherit the equippable armors from this class tier?
 *   - Does not apply to Tier 1.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Window settings for Scene_ClassChange. These adjust the overall layout of
 * the scene as well as how some of the content inside of the windows look. Not
 * all aspects of the scene are fully customizable due to mechanical limits.
 *
 * ---
 *
 * Scene_ClassChange
 * 
 *   Recommended Layout?:
 *   - Use the recommended Menu Layout provided by this plugin?
 * 
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu
 *     scene layout?
 * 
 *   Displayed Resources:
 *   - Select which resources to display in Scene_Class's class lists.
 *   - Non-shared resources appear in the lists up to a limit of 2.
 * 
 *   Confirm Animation ID:
 *   - Play this animation when a class change has been made.
 * 
 *     Primary Offset X:
 *     Primary Offset Y:
 *     Subclass Offset X:
 *     Subclass Offset Y:
 *     - Adjust the offsets for the class change animation.
 * 
 *     Play for Unassign?:
 *     - Play animation for unassigning a subclass?
 *     - Mostly an aesthetic thing to play/not play animations when unassigning
 *       a subclass if that's what you want to control.
 * 
 *   Show Class Level?
 *   - Show the class level when displaying classes?
 *   - Used for the windows in the Class Change menu.
 *
 * ---
 *
 * Window_ClassStatus
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Param Font Size:
 *   - The font size used for parameter values.
 * 
 *   Show Menu Portraits?:
 *   - If Main Menu Core is installed, display the Menu Portraits instead of
 *     the actor's face in the status window?
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *   Back Rectangle Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 * 
 *   JS: Portrait Upper:
 *   - If Menu Portraits are available, this is code used to draw the upper
 *     data like this in the Status Window.
 * 
 *   JS: Face Upper:
 *   - If faces used used, this is code used to draw the upper data like this
 *     in the Status Window.
 * 
 *   JS: Parameter Lower:
 *   - Code to determine how parameters are drawn in the Status Window.
 *
 * ---
 *
 * Window_ClassTier
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   No Class Assigned:
 *   - Text used when no class is assigned to the slot.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing classes?
 * 
 *   Button Assist Text:
 *   - Text used for the Button Assist Window
 * 
 *   JS: Extra Data:
 *   - Code used to draw extra data if there is enough room.
 *   - This does not apply to basic class data and icons.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Window_ClassList
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Unassign Class:
 *   - Text used for an empty class slot.
 * 
 *     Help Description:
 *     - Help description for unassigning a class.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Class Points Settings
 * ============================================================================
 *
 * Class Points are an actor-only resource used as a currency for this plugin.
 * You can determine how they appear in-game, how they're earned, and what kind
 * of mechanics are involved with them. Class Points can also be used in other
 * VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Class Points:
 *   - Do you want Class Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Class Points an actor can have?
 *   - Use 0 for unlimited Class Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Class Points in menus that allow them?
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Class Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Class Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Class Points appears in-game.
 * 
 *   Menu Text Format:
 *   - What is the text format for it to be displayed in windows.
 *   - %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 *
 * ---
 *
 * Gain
 * 
 *   Per Action Hit:
 *   - How many Class Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Class Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Class Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Class Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much CP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Class Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Class Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawClassPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorClassPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Class Points aren't shared or if you want the Class
 *       Points from the actor's current class.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Job Points Settings
 * ============================================================================
 *
 * Job Points are an actor-only resource used as a currency for this plugin.
 * You can determine how they appear in-game, how they're earned, and what kind
 * of mechanics are involved with them. Job Points can also be used in other
 * VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Job Points:
 *   - Do you want Job Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Job Points an actor can have?
 *   - Use 0 for unlimited Job Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Job Points in menus that allow them?
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Job Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Job Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Job Points appears in-game.
 * 
 *   Menu Text Format:
 *   - What is the text format for it to be displayed in windows.
 *   - %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 *
 * ---
 *
 * Gain
 * 
 *   Per Action Hit:
 *   - How many Job Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Job Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Job Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Job Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much JP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Job Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Job Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawJobPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorJobPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Job Points aren't shared or if you want the Job
 *       Points from the actor's current class.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.18: June 12, 2025
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added new line for <CP Rate: x%>
 * *** CP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 * ** Added new line for <JP Rate: x%>
 * *** JP Gain Formulation Calculation: (1 + Plus) * Rate + Flat
 * * New Features!
 * ** New notetags added by Arisu:
 * *** <CP Plus: +x%>
 * *** <CP Plus: -x%>
 * *** <CP Flat: +x%>
 * *** <CP Flat: -x%>
 * *** <JP Plus: +x%>
 * *** <JP Plus: -x%>
 * *** <JP Flat: +x%>
 * *** <JP Flat: -x%>
 * **** These are the additive versions of <CP Rate: x%> and <JP Rate: x%>
 * **** See help file for more information.
 * 
 * Version 1.17: February 20, 2025
 * * Bug Fixes!
 * ** Fixed a crash that would occur upon loading a save game that was made
 *    before Class Change System was installed. Fix made by Olivia.
 * 
 * Version 1.16: December 19, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New plugin parameters added by Irina:
 * *** Parameters > General Settings > Select Same Subclass?
 * **** Allow selecting the same subclass that's already equipped in that slot?
 * **** Mostly an aesthetic thing to allow/prevent the same subclass from being
 *      selected if that's what you want to control.
 * *** Parameters > Window Settings > Confirm Animation ID > Play for Unassign?
 * **** Play animation for unassigning a subclass?
 * **** Mostly an aesthetic thing to play/not play animations when unassigning
 *      a subclass if that's what you want to control.
 * 
 * Version 1.15: December 14, 2023
 * * Bug Fixes!
 * ** Fixed an incompatibility with the \Class[x] textcode from the VisuStella
 *    MZ message core. Fix made by Irina.
 * 
 * Version 1.14: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Window Settings > Show Class Level?
 * **** Show the class level when displaying classes?
 * **** Used for the windows in the Class Change menu.
 * 
 * Version 1.13: May 2, 2022
 * * Bug Fixes!
 * ** Fixed a bug where the element rate traits of subclasses did not apply.
 *    Fix made by Olivia.
 * 
 * Version 1.12: April 14, 2022
 * * Bug Fixes!
 * ** Fixed a problem with certain face index values not registering properly.
 *    Fix made by Irina.
 * * Feature Update!
 * ** Added a better bitmap loading system for face graphics. Update by Irina.
 * 
 * Version 1.11: October 21, 2021
 * * Bug Fixes!
 * ** Fixed a problem with the <CP: x> notetags not working properly. Fix made
 *    by Irina.
 * 
 * Version 1.10: September 10, 2021
 * * Documentation Update!
 * ** VisuStella MZ Compatibility
 * *** Core Engine VisuStella MZ
 * **** The Core Engine will determine if icons are displayed next to class
 *      names for menus. If you do not wish to use them, then you will need to
 *      disable them via the Plugin Parameters:
 * **** Core Engine > Plugin Parameters > UI Settings > Text Code > Class Names
 * **** Then, set that value to false.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.09: September 3, 2021
 * * Documentation Update!
 * ** Added line "This does not apply to basic class data and icons." for
 *    JS: Extra Data. That JavaScript entry does not affect how class names
 *    are written out.
 * * Feature Update!
 * ** Those using \I[x] in class names will automatically have those converted
 *    into <Icon: x> notetags. Update made by Irina.
 * ** The \I[x] text code will be automatically removed from the tier selection
 *    since it's already in the form of a big icon. Update made by Irina.
 * 
 * Version 1.08: August 13, 2021
 * * Bug Fixes!
 * ** Fixed a bug that pertained to specific subclass traits clearing cache
 *    during a multi-hit attack and causing MaxHP/MaxMP inconsistencies. Fix
 *    made by Arisu.
 * 
 * Version 1.07: April 30, 2021
 * * Bug Fixes!
 * ** Multiclasses with Adjust HP/MP settings should now properly adjust
 *    without the Core Engine installed. Fix made by Arisu.
 * ** Those without Victory Aftermath should no longer experience crashes when
 *    gaining Class Points or Job Points after battle. Fix made by Olivia.
 * ** With the Maintained Levels setting enabled, all unlocked multiclasses
 *    will also acquire skills upon leveling up and not just when switching to
 *    the classes manually. Fix made by Olivia.
 * * Feature Update!
 * ** During battle, equipment types belonging multiclasses will not be
 *    unequipped to prevent odd happenings. Update change by Arisu.
 * 
 * Version 1.06: April 16, 2021
 * * Bug Fixes!
 * ** Map based character sprite changes should now be reflected instantly.
 *    Fix made by Olivia.
 * * Documentation Update!
 * ** Added two more entries to the Clarification section. Updated by Arisu.
 * 
 * Version 1.05: February 12, 2021
 * * Bug Fixes!
 * ** Param bonuses for subclasses are no longer based on the current level but
 *    instead, the level for the subclass. Fix made by Irina.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: January 8, 2021
 * * Bug Fixes!
 * ** Leveling up should now automatically cache the current class level.
 *    Fix made by Irina.
 * 
 * Version 1.03: January 1, 2021
 * * Bug Fixes!
 * ** General Settings should now have default values when added. If you are
 *    still getting an error when starting a new game, please open up the
 *    General Settings in the Plugin Parameters and hit OK. Fix made by Yanfly.
 * 
 * Version 1.02: December 25, 2020
 * * Bug Fixes!
 * ** Added a refresh after setting up new actors to recalculate any cached
 *    parameter values, skills, and passive states. Fix made by Yanfly.
 * ** Equipment duplication glitch should no longer occur.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly.
 * *** <Class Picture: filename> and <Picture: filename>
 * **** Uses a picture from your project's /img/pictures/ folder instead of the
 *      class icon for the Class Change scene.
 * ** New Plugin Parameters added by Yanfly.
 * *** Window Settings > Scene_ClassChange > Confirm Animation ID > Offset X
 * *** Window Settings > Scene_ClassChange > Confirm Animation ID > Offset Y
 * **** Offsets have been added to let you adjust where the animation occurs
 *      for primary and subclass changing.
 * 
 * Version 1.01: December 18, 2020
 * * Bug Fixes!
 * ** Class specific character graphics no longer default to index 0 when no
 *    index is found or declared by notetags. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added "Clarification" section to the documentation to explain some things
 *    that users might not understand correctly.
 * * Feature Update!
 * ** The button assist text for the "SHIFT" removal is now offset towards the
 *    left a bit for more room. Update made by Yanfly.
 *
 * Version 1.00 Official Release Date: January 11, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockForActor
 * @text Unlock Class: Add For Actor(s)
 * @desc Unlock class(es) for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to unlock class(es) for.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be unlocked.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockForGlobal
 * @text Unlock Class: Add For Global
 * @desc Unlock class(es) for all party members.
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be unlocked.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockRemoveActor
 * @text Unlock Class: Remove From Actor(s)
 * @desc Remove unlock class(es) for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to remove an unlocked class(es) for.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be removed from the unlocked status.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassUnlockRemoveGlobal
 * @text Unlock Class: Remove From Global
 * @desc Remove unlock class(es) for all party members.
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to be removed from the unlocked status.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassChangeAddRestrictTier
 * @text Change Restriction: Add Tier Restriction
 * @desc Add restrictions to prevent class changing specific tier(s)
 * to target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to restrict class tier(s) for.
 * @default ["1"]
 *
 * @arg Tiers:arraynum
 * @text Tiers(s)
 * @type number[]
 * @desc Select which class tier(s) to restrict changing for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassChangeRemoveRestrictTier
 * @text Change Restriction: Remove Tier Restriction
 * @desc Remove restrictions to allow class changing specific tier(s)
 * for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to remove class tier(s) restrictions for.
 * @default ["1"]
 *
 * @arg Tiers:arraynum
 * @text Tiers(s)
 * @type number[]
 * @desc Select which class tier(s) to remove restrictions for.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassChangeActorClass
 * @text Multiclass: Change Actor(s) Multiclass
 * @desc Changes a specific multiclass for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Tier:num
 * @text Tier
 * @type number
 * @min 1
 * @desc Which multiclass tier to change for the target actor(s)?
 * @default 2
 *
 * @arg ClassID:num
 * @text Class ID
 * @type class
 * @desc Which class should go into this multiclass tier slot?
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassRaiseLimit
 * @text Multiclass: Raise Limit for Actor(s)
 * @desc Raise the multiclass limit for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Limit:num
 * @text Raise Limit By
 * @type number
 * @min 1
 * @desc Raise the multiclass limit for target actor(s) by this much.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassLowerLimit
 * @text Multiclass: Lower Limit for Actor(s)
 * @desc Lower the multiclass limit for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Limit:num
 * @text Reduce Limit By
 * @type number
 * @min 1
 * @desc Lower the multiclass limit for target actor(s) by this much.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MulticlassSetLimit
 * @text Multiclass: Set Limit for Actor(s)
 * @desc Set multiclass limit for target actor(s).
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to change the multiclass limit to.
 * @default ["1"]
 *
 * @arg Limit:num
 * @text Set Limit To
 * @type number
 * @min 1
 * @desc Set multiclass limit for target actor(s) to this much.
 * @default 2
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsGain
 * @text Class Points: Gain
 * @desc The target actor(s) gains Class Points.
 * Gained amounts are affected by Class Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to gain Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsAdd
 * @text Class Points: Add
 * @desc The target actor(s) receives Class Points.
 * Received amounts are NOT affected by Class Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to receive Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsLose
 * @text Class Points: Lose
 * @desc The target actor(s) loses Class Points.
 * Lost amounts are NOT affected by Class Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to lose Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ClassPointsSet
 * @text Class Points: Set
 * @desc Changes the exact Class Points for the target actor(s).
 * Changed amounts are NOT affected by Class Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to change Class Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Class Points
 * @desc Determine how many Class Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsGain
 * @text Job Points: Gain
 * @desc The target actor(s) gains Job Points.
 * Gained amounts are affected by Job Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to gain Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsAdd
 * @text Job Points: Add
 * @desc The target actor(s) receives Job Points.
 * Received amounts are NOT affected by Job Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to receive Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsLose
 * @text Job Points: Lose
 * @desc The target actor(s) loses Job Points.
 * Lost amounts are NOT affected by Job Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to lose Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command JobPointsSet
 * @text Job Points: Set
 * @desc Changes the exact Job Points for the target actor(s).
 * Changed amounts are NOT affected by Job Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to change Job Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Job Points
 * @desc Determine how many Job Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableClassChangeSystemMenu
 * @text System: Enable Class Change in Menu?
 * @desc Enables/disables Class Change inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables Class Change inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowClassChangeSystemMenu
 * @text System: Show Class Change in Menu?
 * @desc Shows/hides Class Change inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Class Change inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ClassChangeSystem
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param ClassChange
 * @text Class Change
 *
 * @param General:struct
 * @text General Settings
 * @parent ClassChange
 * @type struct<General>
 * @desc General settings for Class Change System.
 * @default {"Basics":"","HelpDescription:json":"\"The %1 class.\"","Icon:num":"96","MaintainLevels:eval":"false","ChangeAdjusHpMp:eval":"true","Unlock":"","AlwaysUnlocked:arraynum":"[\"1\",\"2\",\"3\",\"4\"]","StartingMulticlasses:num":"2"}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @parent ClassChange
 * @type struct<BgSettings>
 * @desc Background settings for Scene_ClassChange.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param ChangeClassSound:struct
 * @text Change Class Sound
 * @parent ClassChange
 * @type struct<Sound>
 * @desc Sound effect played when changing classes through Scene_ClassChange.
 * @default {"name:str":"Equip2","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param MainMenu:struct
 * @text Menu Access Settings
 * @parent ClassChange
 * @type struct<MenuAccess>
 * @desc Menu Access settings for Class Change.
 * @default {"Name:str":"Class","ShowMainMenu:eval":"true","EnableMainMenu:eval":"true"}
 *
 * @param Multiclass:arraystruct
 * @text Multiclass Settings
 * @parent ClassChange
 * @type struct<Multiclass>[]
 * @desc Multiclass settings for this plugin. Each tier allows you to have separate settings.
 * @default ["{\"Name:str\":\"Primary\",\"TextColor:str\":\"6\",\"HelpDescription:json\":\"\\\"Units gain all the benefits of its primary class.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"1.00\",\"paramRate1:num\":\"1.00\",\"paramRate2:num\":\"1.00\",\"paramRate3:num\":\"1.00\",\"paramRate4:num\":\"1.00\",\"paramRate5:num\":\"1.00\",\"paramRate6:num\":\"1.00\",\"paramRate7:num\":\"1.00\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"true\",\"DebuffRates:eval\":\"true\",\"StateRates:eval\":\"true\",\"StateResistance:eval\":\"true\",\"Param\":\"\",\"ParamRates:eval\":\"true\",\"XParamRates:eval\":\"true\",\"SParamRates:eval\":\"true\",\"Attack\":\"\",\"AttackElements:eval\":\"true\",\"AttackStates:eval\":\"true\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"Subclass\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"3rd Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"4th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"5th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"6th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"7th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"8th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"9th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}","{\"Name:str\":\"10th Class\",\"TextColor:str\":\"4\",\"HelpDescription:json\":\"\\\"Assign a class to this slot.\\\"\",\"BaseParameters\":\"\",\"paramRate0:num\":\"0.10\",\"paramRate1:num\":\"0.10\",\"paramRate2:num\":\"0.10\",\"paramRate3:num\":\"0.10\",\"paramRate4:num\":\"0.10\",\"paramRate5:num\":\"0.10\",\"paramRate6:num\":\"0.10\",\"paramRate7:num\":\"0.10\",\"Rewards\":\"\",\"expRate:num\":\"0.25\",\"resourceRate:num\":\"0.25\",\"Traits\":\"\",\"Rates\":\"\",\"ElementRates:eval\":\"false\",\"DebuffRates:eval\":\"false\",\"StateRates:eval\":\"false\",\"StateResistance:eval\":\"false\",\"Param\":\"\",\"ParamRates:eval\":\"false\",\"XParamRates:eval\":\"false\",\"SParamRates:eval\":\"false\",\"Attack\":\"\",\"AttackElements:eval\":\"false\",\"AttackStates:eval\":\"false\",\"Skills\":\"\",\"AddedStypes:eval\":\"true\",\"AddedSkills:eval\":\"true\",\"Equip\":\"\",\"EquipWeapons:eval\":\"true\",\"EquipArmors:eval\":\"true\"}"]
 *
 * @param Window:struct
 * @text Window Settings
 * @parent ClassChange
 * @type struct<Window>
 * @desc Window settings for Scene_ClassChange.
 * @default {"Scene":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/right","DisplayedResources:arraystr":"[\"AP\",\"CP\",\"JP\",\"SP\"]","ConfirmAnimationID:num":"120","ConfirmAniPrimaryOffsetX:num":"0","ConfirmAniPrimaryOffsetY:num":"0","ConfirmAniSubclassOffsetX:num":"0","ConfirmAniSubclassOffsetY:num":"0","Window_ClassStatus":"","Window_ClassStatus_BgType:num":"0","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawBackRect:eval":"true","BackRectColor:str":"19","Window_ClassStatus_RectJS:func":"\"const ww = Math.floor(Graphics.boxWidth / 2);\\nconst wh = this.mainAreaHeight();\\nconst wx = this.isRightInputMode() ? 0 : ww;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth / 2;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorLevel(this._actor, x1, lineHeight * 1);\\nthis.placeBasicGauges(this._actor, x1, lineHeight * 2);\\nthis.drawActorResources(x2, lineHeight * 0, this.innerWidth / 2);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorResources(x, dataY + this.lineHeight() * 1, ImageManager.faceWidth);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Reset\\n    this.resetFontSettings();\\n\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","Window_ClassTier":"","Window_ClassTier_BgType:num":"0","VocabNoClassAssigned:str":"No Class Assigned","ShiftShortcutKey:eval":"true","ShiftButtonAssistText:str":"Unassign","Window_ClassTier_ExtraJS:func":"\"// Declare Arguments\\nconst classID = arguments[0];\\nconst tier = arguments[1];\\nconst settings = arguments[2];\\nconst rect = arguments[3];\\nconst targetClass = $dataClasses[classID];\\nconst wordWrap = Imported.VisuMZ_1_MessageCore;\\nconst removeIcons = true;\\nconst fontSize = 22;\\n\\n// Create Coordinates\\nlet x = rect.x + (this.itemPadding() * 4);\\nlet y = rect.y + (this.lineHeight() * 3.25);\\nlet width = rect.width - (this.itemPadding() * 8);\\n\\n// Skill Type Access\\nif (settings.AddedStypes && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\\n    let stypes = targetClass.traits.\\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_STYPE_ADD).\\n        map(trait => $dataSystem.skillTypes[trait.dataId]).\\n        join(', ');\\n    let text = '\\\\\\\\C[16]%1:\\\\\\\\C[0] \\\\\\\\FS[%3]%2'.format(TextManager.skill, stypes, fontSize || 22);\\n    if (removeIcons) text = text.replace(/\\\\\\\\I\\\\[(\\\\d+)\\\\]/gi, '');\\n    if (wordWrap) text = '<WordWrap>' + text;\\n    this.drawTextEx(text, x, y, width);\\n    y += this.lineHeight();\\n}\\n\\n// Weapon Access\\nif (settings.EquipWeapons && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\\n    let stypes = targetClass.traits.\\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_EQUIP_WTYPE).\\n        map(trait => $dataSystem.weaponTypes[trait.dataId]).\\n        join(', ');\\n    let text = '\\\\\\\\C[16]%1:\\\\\\\\C[0] \\\\\\\\FS[%3]%2'.format(TextManager.weapon, stypes, fontSize || 22);\\n    if (removeIcons) text = text.replace(/\\\\\\\\I\\\\[(\\\\d+)\\\\]/gi, '');\\n    if (wordWrap) text = '<WordWrap>' + text;\\n    this.drawTextEx(text, x, y, width);\\n    y += this.lineHeight();\\n}\"","Window_ClassTier_RectJS:func":"\"const ww = Graphics.boxWidth - this._statusWindow.width;\\nconst wh = this.mainAreaHeight();\\nconst wx = this.isRightInputMode() ? ww : 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\"","Window_ClassList":"","Window_ClassList_BgType:num":"0","VocabUnassignClass:str":"Unassign Class","UnassignHelpDescription:json":"\"Remove any classes for this slot.\"","Window_ClassList_RectJS:func":"\"const ww = Graphics.boxWidth - this._statusWindow.width;\\nconst wh = this.mainAreaHeight();\\nconst wx = this.isRightInputMode() ? ww : 0;\\nconst wy = this.mainAreaTop();\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 * 
 * @param Resources
 *
 * @param ClassPoints:struct
 * @text Class Points Settings
 * @parent Resources
 * @type struct<ClassPoints>
 * @desc Settings for Class Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"true","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"87","Vocabulary":"","FullText:str":"Class Points","AbbrText:str":"CP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"0","PerLevelUp:str":"100","PerEnemy:str":"0","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"false","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"false","AftermathText:str":"+%1 %2"}
 *
 * @param JobPoints:struct
 * @text Job Points Settings
 * @parent Resources
 * @type struct<JobPoints>
 * @desc Settings for Job Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"false","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"188","Vocabulary":"","FullText:str":"Job Points","AbbrText:str":"JP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"10 + Math.randomInt(10)","PerLevelUp:str":"0","PerEnemy:str":"50 + Math.randomInt(50)","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"true","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"true","AftermathText:str":"+%1 %2"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param Basics
 *
 * @param HelpDescription:json
 * @text Default Help
 * @parent Basics
 * @type note
 * @desc Default help description for all classes.
 * %1 - Class Name
 * @default "The %1 class."
 *
 * @param Icon:num
 * @text Default Icon
 * @parent Basics
 * @desc Default icon used for all classes.
 * @default 96
 *
 * @param MaintainLevels:eval
 * @text Maintain Levels?
 * @parent Basics
 * @type boolean
 * @on Each Class Same Level
 * @off Each Class Separate
 * @desc Make each class have the same level or
 * make each class have their own level?
 * @default false
 *
 * @param ChangeAdjusHpMp:eval
 * @text Change-Adjust HP/MP
 * @parent Basics
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing classes with MaxHP/MaxMP values.
 * @default true
 *
 * @param AllowSameSubclassSelect:eval
 * @text Select Same Subclass?
 * @parent Basics
 * @type boolean
 * @on Allow Selection
 * @off Disallow Selection
 * @desc Allow selecting the same subclass that's already equipped in that slot?
 * @default true
 * 
 * @param Unlock
 * @text Class Unlocking
 *
 * @param AlwaysUnlocked:arraynum
 * @text Always Unlocked
 * @parent Unlock
 * @type class[]
 * @desc Which classes are always unlocked and available?
 * @default ["1","2","3","4"]
 *
 * @param StartingMulticlasses:num
 * @text Starting Multiclasses
 * @parent Unlock
 * @type number
 * @min 1
 * @desc How many classes can actors use at the start by default?
 * Use 1 for just the primary class.
 * @default 2
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Access Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuAccess:
 *
 * @param Name:str
 * @text Command Name
 * @parent Options
 * @desc Name of the 'Template' option in the Main Menu.
 * @default Class
 *
 * @param ShowMainMenu:eval
 * @text Show in Main Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Template' option to the Main Menu by default?
 * @default true
 *
 * @param EnableMainMenu:eval
 * @text Enable in Main Menu?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the 'Template' option to the Main Menu by default?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Multiclass Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Multiclass:
 *
 * @param Name:str
 * @text Class Tier Name
 * @desc Name of this class tier.
 * @default Untitled
 * 
 * @param TextColor:str
 * @text Text Color
 * @parent Name:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param HelpDescription:json
 * @text Help Description
 * @parent Name:str
 * @type note
 * @desc Help description when this multiclass slot is picked.
 * @default "Assign a class to this slot."
 * 
 * @param BaseParameters
 * @text Base Parameter Bonuses
 * 
 * @param paramRate0:num
 * @text MaxHP
 * @parent BaseParameters
 * @desc How little of this class tier's MaxHP should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate1:num
 * @text MaxMP
 * @parent BaseParameters
 * @desc How little of this class tier's MaxMP should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate2:num
 * @text ATK
 * @parent BaseParameters
 * @desc How little of this class tier's ATK should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate3:num
 * @text DEF
 * @parent BaseParameters
 * @desc How little of this class tier's DEF should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate4:num
 * @text MAT
 * @parent BaseParameters
 * @desc How little of this class tier's MAT should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate5:num
 * @text MDF
 * @parent BaseParameters
 * @desc How little of this class tier's MDF should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate6:num
 * @text AGI
 * @parent BaseParameters
 * @desc How little of this class tier's AGI should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param paramRate7:num
 * @text LUK
 * @parent BaseParameters
 * @desc How little of this class tier's LUK should be added
 * to base stats? Does not apply to Tier 1.
 * @default 0.10
 * 
 * @param Rewards
 * @text Reward Rates
 * 
 * @param expRate:num
 * @text EXP
 * @parent Rewards
 * @desc How much EXP does a class in this tier earn?
 * Does not apply to Tier 1. Only for Battle Rewards.
 * @default 0.25
 * 
 * @param resourceRate:num
 * @text Resources
 * @parent Rewards
 * @desc Resource rate (ie. CP, JP) earned for this tier.
 * Does not apply to Tier 1. Only for Battle Rewards.
 * @default 0.25
 * 
 * @param Traits
 * @text Inherit Traits
 * 
 * @param Rates
 * @parent Traits
 *
 * @param ElementRates:eval
 * @text Element Rates?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the element rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param DebuffRates:eval
 * @text Debuff Rates?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the debuff rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param StateRates:eval
 * @text State Rates?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the state rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param StateResistance:eval
 * @text State Resistance?
 * @parent Rates
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the state resistances from this class tier?
 * Does not apply to Tier 1.
 * @default false
 * 
 * @param Param
 * @text Param Rates
 * @parent Traits
 *
 * @param ParamRates:eval
 * @text Base-Param Rates?
 * @parent Param
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit Base Parameter rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param XParamRates:eval
 * @text X-Param Rates?
 * @parent Param
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit X-Parameter rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param SParamRates:eval
 * @text S-Param Rates?
 * @parent Param
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit S-Parameter rates from this class tier?
 * Does not apply to Tier 1.
 * @default false
 * 
 * @param Attack
 * @parent Traits
 *
 * @param AttackElements:eval
 * @text Attack Elements?
 * @parent Attack
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the attack elements from this class tier?
 * Does not apply to Tier 1.
 * @default false
 *
 * @param AttackStates:eval
 * @text Attack States?
 * @parent Attack
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the attack states from this class tier?
 * Does not apply to Tier 1.
 * @default false
 * 
 * @param Skills
 * @parent Traits
 *
 * @param AddedStypes:eval
 * @text Added STypes?
 * @parent Skills
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the added STypes from this class tier?
 * Does not apply to Tier 1.
 * @default true
 *
 * @param AddedSkills:eval
 * @text Added Skills?
 * @parent Skills
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the added skills from this class tier?
 * Does not apply to Tier 1.
 * @default true
 * 
 * @param Equip
 * @text Equipment
 * @parent Traits
 *
 * @param EquipWeapons:eval
 * @text Equippable Weapons?
 * @parent Equip
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the equippable weapons from this class tier?
 * Does not apply to Tier 1.
 * @default true
 *
 * @param EquipArmors:eval
 * @text Equippable Armors?
 * @parent Equip
 * @type boolean
 * @on Inherit
 * @off Don't
 * @desc Inherit the equippable armors from this class tier?
 * Does not apply to Tier 1.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param name:str
 * @text Filename
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Equip2
 *
 * @param volume:num
 * @text Volume
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param pitch:num
 * @text Pitch
 * @type number
 * @max 100
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param pan:num
 * @text Pan
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 * 
 * @param Scene
 * @text Scene_ClassChange
 *
 * @param EnableLayout:eval
 * @text Recommended Layout?
 * @parent Scene
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the recommended Menu Layout provided by this plugin?
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent Scene
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/right
 * 
 * @param DisplayedResources:arraystr
 * @text Displayed Resources
 * @parent Scene
 * @type select[]
 * @option AP - Ability Points (Requires VisuMZ_2_SkillLearnSystem)
 * @value AP
 * @option CP - Class Points
 * @value CP
 * @option JP - Job Points
 * @value JP
 * @option SP - Skill Points (Requires VisuMZ_2_SkillLearnSystem)
 * @value SP
 * @desc Select which resources to display in Scene_Class's class
 * lists. Non-shared (limit: 2) resources appear in the lists.
 * @default ["AP","CP","JP","SP"]
 *
 * @param ConfirmAnimationID:num
 * @text Confirm Animation ID
 * @parent Scene
 * @type animation
 * @desc Play this animation when a class change has been made.
 * @default 120
 *
 * @param ConfirmAniPrimaryOffsetX:num
 * @text Primary Offset X
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset X of primary class animations.
 * Negative for left. Positive for right.
 * @default 0
 *
 * @param ConfirmAniPrimaryOffsetY:num
 * @text Primary Offset Y
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset Y of primary class animations.
 * Negative for up. Positive for down.
 * @default 0
 *
 * @param ConfirmAniSubclassOffsetX:num
 * @text Subclass Offset X
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset X of subclass animations.
 * Negative for left. Positive for right.
 * @default 0
 *
 * @param ConfirmAniSubclassOffsetY:num
 * @text Subclass Offset Y
 * @parent ConfirmAnimationID:num
 * @desc Adjust the offset Y of subclass animations.
 * Negative for up. Positive for down.
 * @default 0
 *
 * @param AllowClearClassAni:eval
 * @text Play for Unassign?
 * @parent ConfirmAnimationID:num
 * @type boolean
 * @on Play Animation
 * @off Don't Play
 * @desc Play animation for unassigning a subclass?
 * @default true
 *
 * @param ShowClassLevel:eval
 * @text Show Class Level?
 * @parent Scene
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the class level when displaying classes?
 * Used for the windows in the Class Change menu.
 * @default true
 *
 * @param Window_ClassStatus
 *
 * @param Window_ClassStatus_BgType:num
 * @text Background Type
 * @parent Window_ClassStatus
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent Window_ClassStatus
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent Window_ClassStatus
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent Window_ClassStatus
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Window_ClassStatus_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_ClassStatus
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Math.floor(Graphics.boxWidth / 2);\nconst wh = this.mainAreaHeight();\nconst wx = this.isRightInputMode() ? 0 : ww;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent Window_ClassStatus
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth / 2;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorLevel(this._actor, x1, lineHeight * 1);\nthis.placeBasicGauges(this._actor, x1, lineHeight * 2);\nthis.drawActorResources(x2, lineHeight * 0, this.innerWidth / 2);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent Window_ClassStatus
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.floor((limitHeight - ImageManager.faceHeight) / 2);\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.floor((limitHeight - dataHeight) / 2);\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorResources(x, dataY + this.lineHeight() * 1, ImageManager.faceWidth);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent Window_ClassStatus
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Reset\n    this.resetFontSettings();\n\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param Window_ClassTier
 *
 * @param Window_ClassTier_BgType:num
 * @text Background Type
 * @parent Window_ClassTier
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param VocabNoClassAssigned:str
 * @text No Class Assigned
 * @parent Window_ClassTier
 * @desc Text used when no class is assigned to the slot.
 * @default No Class Assigned
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent Window_ClassTier
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing classes?
 * @default true
 *
 * @param ShiftButtonAssistText:str
 * @text Button Assist Text
 * @parent ShiftShortcutKey:eval
 * @desc Text used for the Button Assist Window
 * @default Unassign
 *
 * @param Window_ClassTier_ExtraJS:func
 * @text JS: Extra Data
 * @parent Window_ClassTier
 * @type note
 * @desc Code used to draw extra data if there is enough room.
 * This does not apply to basic class data and icons.
 * @default "// Declare Arguments\nconst classID = arguments[0];\nconst tier = arguments[1];\nconst settings = arguments[2];\nconst rect = arguments[3];\nconst targetClass = $dataClasses[classID];\nconst wordWrap = Imported.VisuMZ_1_MessageCore;\nconst removeIcons = true;\nconst fontSize = 22;\n\n// Create Coordinates\nlet x = rect.x + (this.itemPadding() * 4);\nlet y = rect.y + (this.lineHeight() * 3.25);\nlet width = rect.width - (this.itemPadding() * 8);\n\n// Skill Type Access\nif (settings.AddedStypes && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\n    let stypes = targetClass.traits.\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_STYPE_ADD).\n        map(trait => $dataSystem.skillTypes[trait.dataId]).\n        join(', ');\n    let text = '\\\\C[16]%1:\\\\C[0] \\\\FS[%3]%2'.format(TextManager.skill, stypes, fontSize || 22);\n    if (removeIcons) text = text.replace(/\\\\I\\[(\\d+)\\]/gi, '');\n    if (wordWrap) text = '<WordWrap>' + text;\n    this.drawTextEx(text, x, y, width);\n    y += this.lineHeight();\n}\n\n// Weapon Access\nif (settings.EquipWeapons && ((y + this.lineHeight()) <= (rect.y + rect.height))) {\n    let stypes = targetClass.traits.\n        filter(trait => trait.code === Game_BattlerBase.TRAIT_EQUIP_WTYPE).\n        map(trait => $dataSystem.weaponTypes[trait.dataId]).\n        join(', ');\n    let text = '\\\\C[16]%1:\\\\C[0] \\\\FS[%3]%2'.format(TextManager.weapon, stypes, fontSize || 22);\n    if (removeIcons) text = text.replace(/\\\\I\\[(\\d+)\\]/gi, '');\n    if (wordWrap) text = '<WordWrap>' + text;\n    this.drawTextEx(text, x, y, width);\n    y += this.lineHeight();\n}"
 *
 * @param Window_ClassTier_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_ClassTier
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this._statusWindow.width;\nconst wh = this.mainAreaHeight();\nconst wx = this.isRightInputMode() ? ww : 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param Window_ClassList
 *
 * @param Window_ClassList_BgType:num
 * @text Background Type
 * @parent Window_ClassList
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param VocabUnassignClass:str
 * @text Unassign Class
 * @parent Window_ClassList
 * @desc Text used for an empty class slot.
 * @default Unassign Class
 *
 * @param UnassignHelpDescription:json
 * @text Help Description
 * @parent VocabUnassignClass:str
 * @type note
 * @desc Help description for unassigning a class.
 * @default "Remove any classes for this slot."
 *
 * @param Window_ClassList_RectJS:func
 * @text JS: X, Y, W, H
 * @parent Window_ClassList
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this._statusWindow.width;\nconst wh = this.mainAreaHeight();\nconst wx = this.isRightInputMode() ? ww : 0;\nconst wy = this.mainAreaTop();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Class Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ClassPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Class Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Class Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default false
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type number
 * @desc What's the maximum amount of Class Points an actor can have?
 * Use 0 for unlimited Class Points.
 * @default 0
 *
 * @param Visual
 *
 * @param ShowInMenus:eval
 * @text Show In Menus?
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Do you wish to show Class Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Class Points?
 * @default 87
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Class Points appears in-game.
 * @default Class Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Class Points appears in-game.
 * @default CP
 *
 * @param TextFmt:str
 * @text Menu Text Format
 * @parent Vocabulary
 * @desc What is the text format for it to be displayed in windows.
 * %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 * @default %1 \c[5]%2\c[0]%3
 *
 * @param Gain
 *
 * @param PerAction:str
 * @text Per Action Hit
 * @parent Gain
 * @desc How many Class Points should an actor gain per action?
 * You may use code.
 * @default 0
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Class Points should an actor gain per level up?
 * You may use code.
 * @default 100
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Class Points should an actor gain per enemy?
 * You may use code.
 * @default 0
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Class Points from
 * defeated enemies?
 * @default true
 *
 * @param Victory
 *
 * @param ShowVictory:eval
 * @text Show During Victory?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show how much CP an actor has earned in battle during the
 * victory phase?
 * @default true
 *
 * @param VictoryText:str
 * @text Victory Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * @default %1 gains %2 %3!
 *
 * @param AftermathActorDisplay:eval
 * @text Aftermath Display?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Class Points as
 * the main acquired resource in the actor windows?
 * @default true
 *
 * @param AftermathText:str
 * @text Aftermath Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Earned, %2 - Abbr, %3 - Full Text
 * @default +%1 %2
 *
 */
/* ----------------------------------------------------------------------------
 * Job Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~JobPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Job Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Job Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default false
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type number
 * @desc What's the maximum amount of Job Points an actor can have?
 * Use 0 for unlimited Job Points.
 * @default 0
 *
 * @param Visual
 *
 * @param ShowInMenus:eval
 * @text Show In Menus?
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Do you wish to show Job Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Job Points?
 * @default 188
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Job Points appears in-game.
 * @default Job Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Job Points appears in-game.
 * @default JP
 *
 * @param TextFmt:str
 * @text Menu Text Format
 * @parent Vocabulary
 * @desc What is the text format for it to be displayed in windows.
 * %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 * @default %1 \c[5]%2\c[0]%3
 *
 * @param Gain
 *
 * @param PerAction:str
 * @text Per Action Hit
 * @parent Gain
 * @desc How many Job Points should an actor gain per action?
 * You may use code.
 * @default 10 + Math.randomInt(10)
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Job Points should an actor gain per level up?
 * You may use code.
 * @default 0
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Job Points should an actor gain per enemy?
 * You may use code.
 * @default 50 + Math.randomInt(50)
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Job Points from
 * defeated enemies?
 * @default true
 *
 * @param Victory
 *
 * @param ShowVictory:eval
 * @text Show During Victory?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show how much JP an actor has earned in battle during the
 * victory phase?
 * @default true
 *
 * @param VictoryText:str
 * @text Victory Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * @default %1 gains %2 %3!
 *
 * @param AftermathActorDisplay:eval
 * @text Aftermath Display?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Job Points as
 * the main acquired resource in the actor windows?
 * @default true
 *
 * @param AftermathText:str
 * @text Aftermath Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Earned, %2 - Abbr, %3 - Full Text
 * @default +%1 %2
 *
 */
//=============================================================================

const _0x5d7c39=_0x2bd2;(function(_0x261bea,_0x16bd96){const _0x51433d=_0x2bd2,_0x132cfc=_0x261bea();while(!![]){try{const _0x5b766f=-parseInt(_0x51433d(0x1e7))/0x1+parseInt(_0x51433d(0x381))/0x2*(-parseInt(_0x51433d(0x35a))/0x3)+-parseInt(_0x51433d(0xf2))/0x4*(-parseInt(_0x51433d(0x366))/0x5)+parseInt(_0x51433d(0x109))/0x6+-parseInt(_0x51433d(0x34e))/0x7*(-parseInt(_0x51433d(0x1d5))/0x8)+-parseInt(_0x51433d(0x2bf))/0x9+parseInt(_0x51433d(0x382))/0xa*(parseInt(_0x51433d(0x306))/0xb);if(_0x5b766f===_0x16bd96)break;else _0x132cfc['push'](_0x132cfc['shift']());}catch(_0x299ae5){_0x132cfc['push'](_0x132cfc['shift']());}}}(_0x364e,0x46f9b));var label='ClassChangeSystem',tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x339bbf){const _0x47ec61=_0x2bd2;return _0x339bbf['status']&&_0x339bbf[_0x47ec61(0x1aa)]['includes']('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x5d7c39(0x2de)]||{},VisuMZ[_0x5d7c39(0x1a5)]=function(_0x21850c,_0xeab73){const _0x4616c=_0x5d7c39;for(const _0x1fe04d in _0xeab73){if(_0x1fe04d[_0x4616c(0x245)](/(.*):(.*)/i)){const _0x341f63=String(RegExp['$1']),_0x4df784=String(RegExp['$2'])[_0x4616c(0x315)]()[_0x4616c(0x37a)]();let _0x3fd97a,_0x35eb8f,_0x174e62;switch(_0x4df784){case _0x4616c(0x18c):_0x3fd97a=_0xeab73[_0x1fe04d]!==''?Number(_0xeab73[_0x1fe04d]):0x0;break;case _0x4616c(0x201):_0x35eb8f=_0xeab73[_0x1fe04d]!==''?JSON[_0x4616c(0x34a)](_0xeab73[_0x1fe04d]):[],_0x3fd97a=_0x35eb8f[_0x4616c(0x299)](_0x56000e=>Number(_0x56000e));break;case'EVAL':_0x3fd97a=_0xeab73[_0x1fe04d]!==''?eval(_0xeab73[_0x1fe04d]):null;break;case _0x4616c(0x2f9):_0x35eb8f=_0xeab73[_0x1fe04d]!==''?JSON['parse'](_0xeab73[_0x1fe04d]):[],_0x3fd97a=_0x35eb8f['map'](_0x3d1017=>eval(_0x3d1017));break;case _0x4616c(0x370):_0x3fd97a=_0xeab73[_0x1fe04d]!==''?JSON[_0x4616c(0x34a)](_0xeab73[_0x1fe04d]):'';break;case _0x4616c(0x1a7):_0x35eb8f=_0xeab73[_0x1fe04d]!==''?JSON[_0x4616c(0x34a)](_0xeab73[_0x1fe04d]):[],_0x3fd97a=_0x35eb8f['map'](_0xc88cc7=>JSON[_0x4616c(0x34a)](_0xc88cc7));break;case _0x4616c(0x1ff):_0x3fd97a=_0xeab73[_0x1fe04d]!==''?new Function(JSON[_0x4616c(0x34a)](_0xeab73[_0x1fe04d])):new Function('return\x200');break;case'ARRAYFUNC':_0x35eb8f=_0xeab73[_0x1fe04d]!==''?JSON[_0x4616c(0x34a)](_0xeab73[_0x1fe04d]):[],_0x3fd97a=_0x35eb8f[_0x4616c(0x299)](_0x51d4d0=>new Function(JSON[_0x4616c(0x34a)](_0x51d4d0)));break;case'STR':_0x3fd97a=_0xeab73[_0x1fe04d]!==''?String(_0xeab73[_0x1fe04d]):'';break;case _0x4616c(0x1d9):_0x35eb8f=_0xeab73[_0x1fe04d]!==''?JSON[_0x4616c(0x34a)](_0xeab73[_0x1fe04d]):[],_0x3fd97a=_0x35eb8f[_0x4616c(0x299)](_0x3d512c=>String(_0x3d512c));break;case _0x4616c(0x241):_0x174e62=_0xeab73[_0x1fe04d]!==''?JSON[_0x4616c(0x34a)](_0xeab73[_0x1fe04d]):{},_0x3fd97a=VisuMZ['ConvertParams']({},_0x174e62);break;case'ARRAYSTRUCT':_0x35eb8f=_0xeab73[_0x1fe04d]!==''?JSON['parse'](_0xeab73[_0x1fe04d]):[],_0x3fd97a=_0x35eb8f['map'](_0x59d26d=>VisuMZ[_0x4616c(0x1a5)]({},JSON['parse'](_0x59d26d)));break;default:continue;}_0x21850c[_0x341f63]=_0x3fd97a;}}return _0x21850c;},(_0x53f92e=>{const _0x238c04=_0x5d7c39,_0x185b29=_0x53f92e[_0x238c04(0x385)];for(const _0x129274 of dependencies){if(!Imported[_0x129274]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x238c04(0x233)](_0x185b29,_0x129274)),SceneManager[_0x238c04(0x258)]();break;}}const _0x191b99=_0x53f92e[_0x238c04(0x1aa)];if(_0x191b99[_0x238c04(0x245)](/\[Version[ ](.*?)\]/i)){const _0xba0818=Number(RegExp['$1']);_0xba0818!==VisuMZ[label][_0x238c04(0x12b)]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x238c04(0x233)](_0x185b29,_0xba0818)),SceneManager[_0x238c04(0x258)]());}if(_0x191b99[_0x238c04(0x245)](/\[Tier[ ](\d+)\]/i)){const _0x1754b2=Number(RegExp['$1']);_0x1754b2<tier?(alert(_0x238c04(0x2d3)['format'](_0x185b29,_0x1754b2,tier)),SceneManager[_0x238c04(0x258)]()):tier=Math['max'](_0x1754b2,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x238c04(0x2de)],_0x53f92e[_0x238c04(0x338)]);})(pluginData),PluginManager[_0x5d7c39(0x24e)](pluginData[_0x5d7c39(0x385)],_0x5d7c39(0x159),_0x184c87=>{const _0x5979b9=_0x5d7c39;VisuMZ[_0x5979b9(0x1a5)](_0x184c87,_0x184c87);const _0x532ff2=_0x184c87[_0x5979b9(0x337)][_0x5979b9(0x299)](_0x42f26b=>$gameActors[_0x5979b9(0x340)](_0x42f26b)),_0xe403c2=_0x184c87[_0x5979b9(0x1cb)];for(const _0x17efea of _0x532ff2){if(!_0x17efea)continue;for(const _0x51b85b of _0xe403c2){_0x17efea['unlockClass'](_0x51b85b);}}}),PluginManager['registerCommand'](pluginData[_0x5d7c39(0x385)],_0x5d7c39(0x140),_0x42bced=>{const _0x4183ff=_0x5d7c39;VisuMZ[_0x4183ff(0x1a5)](_0x42bced,_0x42bced);const _0x54e5e7=_0x42bced[_0x4183ff(0x1cb)];for(const _0x37a5e4 of _0x54e5e7){$gameParty[_0x4183ff(0x1d4)](_0x37a5e4);}}),PluginManager[_0x5d7c39(0x24e)](pluginData['name'],'ClassUnlockRemoveActor',_0x23b347=>{const _0x35932f=_0x5d7c39;VisuMZ[_0x35932f(0x1a5)](_0x23b347,_0x23b347);const _0x3e04bd=_0x23b347[_0x35932f(0x337)][_0x35932f(0x299)](_0xe983c=>$gameActors[_0x35932f(0x340)](_0xe983c)),_0x278313=_0x23b347['Classes'];for(const _0x4bca2f of _0x3e04bd){if(!_0x4bca2f)continue;for(const _0x4f11b3 of _0x278313){_0x4bca2f['removeUnlockedClass'](_0x4f11b3);}}}),PluginManager[_0x5d7c39(0x24e)](pluginData[_0x5d7c39(0x385)],'ClassUnlockRemoveGlobal',_0x385b11=>{const _0x400474=_0x5d7c39;VisuMZ[_0x400474(0x1a5)](_0x385b11,_0x385b11);const _0xdb9e30=_0x385b11[_0x400474(0x1cb)];for(const _0x5be430 of _0xdb9e30){$gameParty[_0x400474(0x2d1)](_0x5be430);}}),PluginManager[_0x5d7c39(0x24e)](pluginData[_0x5d7c39(0x385)],_0x5d7c39(0x236),_0x564270=>{const _0x4579f0=_0x5d7c39;VisuMZ[_0x4579f0(0x1a5)](_0x564270,_0x564270);const _0x47d09a=_0x564270[_0x4579f0(0x337)][_0x4579f0(0x299)](_0x1efb9a=>$gameActors[_0x4579f0(0x340)](_0x1efb9a)),_0x38ab93=_0x564270[_0x4579f0(0x14b)];for(const _0x107427 of _0x47d09a){if(!_0x107427)continue;for(const _0x2ae86e of _0x38ab93){_0x107427[_0x4579f0(0x179)](_0x2ae86e);}}}),PluginManager['registerCommand'](pluginData[_0x5d7c39(0x385)],'ClassChangeRemoveRestrictTier',_0x54b49c=>{const _0x28f9e9=_0x5d7c39;VisuMZ[_0x28f9e9(0x1a5)](_0x54b49c,_0x54b49c);const _0x44153e=_0x54b49c[_0x28f9e9(0x337)][_0x28f9e9(0x299)](_0x275d62=>$gameActors['actor'](_0x275d62)),_0xee7168=_0x54b49c[_0x28f9e9(0x14b)];for(const _0xf9cc22 of _0x44153e){if(!_0xf9cc22)continue;for(const _0x4d37a1 of _0xee7168){_0xf9cc22[_0x28f9e9(0x10f)](_0x4d37a1);}}}),PluginManager['registerCommand'](pluginData[_0x5d7c39(0x385)],_0x5d7c39(0x194),_0x25ed23=>{const _0x353827=_0x5d7c39;VisuMZ[_0x353827(0x1a5)](_0x25ed23,_0x25ed23);const _0x5c027c=_0x25ed23[_0x353827(0x337)]['map'](_0x3407fd=>$gameActors['actor'](_0x3407fd)),_0x56ba89=_0x25ed23['Tier'],_0x3694c4=_0x25ed23[_0x353827(0x1f4)];for(const _0x195611 of _0x5c027c){if(!_0x195611)continue;_0x195611[_0x353827(0x1fc)](_0x3694c4,_0x56ba89);}}),PluginManager[_0x5d7c39(0x24e)](pluginData[_0x5d7c39(0x385)],_0x5d7c39(0x335),_0x31eaf3=>{const _0x15d8e7=_0x5d7c39;VisuMZ[_0x15d8e7(0x1a5)](_0x31eaf3,_0x31eaf3);const _0xeac55a=_0x31eaf3[_0x15d8e7(0x337)][_0x15d8e7(0x299)](_0x3078b6=>$gameActors['actor'](_0x3078b6)),_0x6c0362=_0x31eaf3['Limit'];for(const _0x4dbf02 of _0xeac55a){if(!_0x4dbf02)continue;_0x4dbf02['addMulticlassTiers'](_0x6c0362);}}),PluginManager[_0x5d7c39(0x24e)](pluginData[_0x5d7c39(0x385)],_0x5d7c39(0x1c5),_0x2fa12c=>{const _0x4960a8=_0x5d7c39;VisuMZ[_0x4960a8(0x1a5)](_0x2fa12c,_0x2fa12c);const _0x595924=_0x2fa12c['Actors'][_0x4960a8(0x299)](_0x4240bd=>$gameActors[_0x4960a8(0x340)](_0x4240bd)),_0x4c771f=_0x2fa12c[_0x4960a8(0x110)];for(const _0x17e4de of _0x595924){if(!_0x17e4de)continue;_0x17e4de[_0x4960a8(0x33c)](_0x4c771f);}}),PluginManager[_0x5d7c39(0x24e)](pluginData['name'],'MulticlassSetLimit',_0x23cece=>{const _0x54b33a=_0x5d7c39;VisuMZ['ConvertParams'](_0x23cece,_0x23cece);const _0x2453e1=_0x23cece[_0x54b33a(0x337)][_0x54b33a(0x299)](_0x51090b=>$gameActors[_0x54b33a(0x340)](_0x51090b)),_0x239746=_0x23cece[_0x54b33a(0x110)];for(const _0x2797b1 of _0x2453e1){if(!_0x2797b1)continue;_0x2797b1[_0x54b33a(0x10b)](_0x239746);}}),PluginManager[_0x5d7c39(0x24e)](pluginData[_0x5d7c39(0x385)],_0x5d7c39(0x39d),_0x1b6589=>{const _0x1e381d=_0x5d7c39;VisuMZ[_0x1e381d(0x1a5)](_0x1b6589,_0x1b6589);const _0x118c97=_0x1b6589['Actors'][_0x1e381d(0x299)](_0x233b8a=>$gameActors[_0x1e381d(0x340)](_0x233b8a)),_0x4cc5f1=_0x1b6589['Classes'],_0x5ca8ec=_0x1b6589['Points'];for(const _0x4cdea0 of _0x118c97){if(!_0x4cdea0)continue;for(const _0xce841d of _0x4cc5f1){_0x4cdea0[_0x1e381d(0x19a)](_0x5ca8ec,_0xce841d);}}}),PluginManager[_0x5d7c39(0x24e)](pluginData[_0x5d7c39(0x385)],_0x5d7c39(0x2f4),_0xc7e352=>{const _0x2929a9=_0x5d7c39;VisuMZ[_0x2929a9(0x1a5)](_0xc7e352,_0xc7e352);const _0x446f25=_0xc7e352[_0x2929a9(0x337)][_0x2929a9(0x299)](_0x5ac712=>$gameActors[_0x2929a9(0x340)](_0x5ac712)),_0x445115=_0xc7e352[_0x2929a9(0x1cb)],_0x36a3ac=_0xc7e352['Points'];for(const _0x227056 of _0x446f25){if(!_0x227056)continue;for(const _0x4f3fb1 of _0x445115){_0x227056[_0x2929a9(0x38f)](_0x36a3ac,_0x4f3fb1);}}}),PluginManager['registerCommand'](pluginData['name'],'ClassPointsLose',_0x21ee39=>{const _0x367959=_0x5d7c39;VisuMZ[_0x367959(0x1a5)](_0x21ee39,_0x21ee39);const _0x1f0fed=_0x21ee39[_0x367959(0x337)][_0x367959(0x299)](_0x2d2750=>$gameActors[_0x367959(0x340)](_0x2d2750)),_0x89d2c2=_0x21ee39[_0x367959(0x1cb)],_0xbe1508=_0x21ee39['Points'];for(const _0x5f08d8 of _0x1f0fed){if(!_0x5f08d8)continue;for(const _0x44881a of _0x89d2c2){_0x5f08d8['loseClassPoints'](_0xbe1508,_0x44881a);}}}),PluginManager[_0x5d7c39(0x24e)](pluginData[_0x5d7c39(0x385)],_0x5d7c39(0x373),_0x13b86d=>{const _0x430e40=_0x5d7c39;VisuMZ[_0x430e40(0x1a5)](_0x13b86d,_0x13b86d);const _0x38dbd7=_0x13b86d[_0x430e40(0x337)][_0x430e40(0x299)](_0x5f0e9c=>$gameActors[_0x430e40(0x340)](_0x5f0e9c)),_0x50706c=_0x13b86d[_0x430e40(0x1cb)],_0x2bd87f=_0x13b86d[_0x430e40(0x2e6)];for(const _0x29a1bd of _0x38dbd7){if(!_0x29a1bd)continue;for(const _0x567493 of _0x50706c){_0x29a1bd[_0x430e40(0xf3)](_0x2bd87f,_0x567493);}}}),PluginManager[_0x5d7c39(0x24e)](pluginData[_0x5d7c39(0x385)],_0x5d7c39(0x21f),_0x112813=>{const _0x3ef03f=_0x5d7c39;VisuMZ[_0x3ef03f(0x1a5)](_0x112813,_0x112813);const _0x37a2a9=_0x112813[_0x3ef03f(0x337)][_0x3ef03f(0x299)](_0x4181ad=>$gameActors[_0x3ef03f(0x340)](_0x4181ad)),_0x443a94=_0x112813[_0x3ef03f(0x1cb)],_0x558723=_0x112813[_0x3ef03f(0x2e6)];for(const _0x30c078 of _0x37a2a9){if(!_0x30c078)continue;for(const _0x48ee87 of _0x443a94){_0x30c078[_0x3ef03f(0x2f7)](_0x558723,_0x48ee87);}}}),PluginManager[_0x5d7c39(0x24e)](pluginData[_0x5d7c39(0x385)],'JobPointsAdd',_0x1a3c04=>{const _0x134fd4=_0x5d7c39;VisuMZ[_0x134fd4(0x1a5)](_0x1a3c04,_0x1a3c04);const _0xb00a81=_0x1a3c04[_0x134fd4(0x337)]['map'](_0x34a148=>$gameActors[_0x134fd4(0x340)](_0x34a148)),_0x3e6ff1=_0x1a3c04[_0x134fd4(0x1cb)],_0x5d0f70=_0x1a3c04[_0x134fd4(0x2e6)];for(const _0x352d25 of _0xb00a81){if(!_0x352d25)continue;for(const _0x469d67 of _0x3e6ff1){_0x352d25[_0x134fd4(0x2b7)](_0x5d0f70,_0x469d67);}}}),PluginManager[_0x5d7c39(0x24e)](pluginData[_0x5d7c39(0x385)],_0x5d7c39(0x244),_0x46ce05=>{const _0x1268af=_0x5d7c39;VisuMZ[_0x1268af(0x1a5)](_0x46ce05,_0x46ce05);const _0x170ff9=_0x46ce05['Actors']['map'](_0x11dd24=>$gameActors['actor'](_0x11dd24)),_0x1d95b7=_0x46ce05[_0x1268af(0x1cb)],_0x3fc522=_0x46ce05[_0x1268af(0x2e6)];for(const _0xf4dd72 of _0x170ff9){if(!_0xf4dd72)continue;for(const _0x31945d of _0x1d95b7){_0xf4dd72['loseJobPoints'](_0x3fc522,_0x31945d);}}}),PluginManager['registerCommand'](pluginData[_0x5d7c39(0x385)],_0x5d7c39(0x31c),_0x3f6ccf=>{const _0x47a7ab=_0x5d7c39;VisuMZ[_0x47a7ab(0x1a5)](_0x3f6ccf,_0x3f6ccf);const _0x77fc3c=_0x3f6ccf[_0x47a7ab(0x337)][_0x47a7ab(0x299)](_0x3cd676=>$gameActors[_0x47a7ab(0x340)](_0x3cd676)),_0x3a656b=_0x3f6ccf[_0x47a7ab(0x1cb)],_0x7023d4=_0x3f6ccf['Points'];for(const _0x53cc04 of _0x77fc3c){if(!_0x53cc04)continue;for(const _0x3aa248 of _0x3a656b){_0x53cc04[_0x47a7ab(0x2a7)](_0x7023d4,_0x3aa248);}}}),PluginManager[_0x5d7c39(0x24e)](pluginData[_0x5d7c39(0x385)],'SystemEnableClassChangeSystemMenu',_0x58e0e0=>{const _0x46687b=_0x5d7c39;VisuMZ['ConvertParams'](_0x58e0e0,_0x58e0e0),$gameSystem[_0x46687b(0x13b)](_0x58e0e0['Enable']);}),PluginManager[_0x5d7c39(0x24e)](pluginData[_0x5d7c39(0x385)],_0x5d7c39(0x118),_0x594c0b=>{const _0x4e18bd=_0x5d7c39;VisuMZ[_0x4e18bd(0x1a5)](_0x594c0b,_0x594c0b),$gameSystem[_0x4e18bd(0x19c)](_0x594c0b[_0x4e18bd(0x289)]);}),VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x1ad)]=function(){const _0x254bfc=_0x5d7c39;try{}catch(_0x2e4241){if($gameTemp[_0x254bfc(0x308)]())console[_0x254bfc(0x2d6)](_0x2e4241);}},VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x276)]={'StartingClassPoints':/<STARTING (?:CLASS POINTS|CP):[ ](.*)>/i,'StartClassClassPoints':/<CLASS (.*) STARTING (?:CLASS POINTS|CP):[ ](.*)>/gi,'UserGainClassPoints':/<(?:CLASS POINTS|CP|USER CLASS POINTS|USER CP) GAIN:[ ](.*)>/i,'TargetGainClassPoints':/<TARGET (?:CLASS POINTS|CP) GAIN:[ ](.*)>/i,'EnemyClassPoints':/<(?:CLASS POINTS|CP):[ ](.*)>/i,'ClassPointsPlus':/<(?:CLASS POINTS|CP) PLUS:[ ]([\+\-]\d+)([%％])>/i,'ClassPointsRate':/<(?:CLASS POINTS|CP) RATE:[ ](\d+)([%％])>/i,'ClassPointsFlat':/<(?:CLASS POINTS|CP) FLAT:[ ]([\+\-]\d+)([%％])>/i,'StartingJobPoints':/<STARTING (?:JOB POINTS|JP):[ ](.*)>/i,'StartClassJobPoints':/<CLASS (.*) STARTING (?:JOB POINTS|JP):[ ](.*)>/gi,'UserGainJobPoints':/<(?:JOB POINTS|JP|USER JOB POINTS|USER JP) GAIN:[ ](.*)>/i,'TargetGainJobPoints':/<TARGET (?:JOB POINTS|JP) GAIN:[ ](.*)>/i,'EnemyJobPoints':/<(?:JOB POINTS|JP):[ ](.*)>/i,'JobPointsPlus':/<(?:CLASS POINTS|CP) PLUS:[ ]([\+\-]\d+)([%％])>/i,'JobPointsRate':/<(?:JOB POINTS|JP) RATE:[ ](\d+)([%％])>/i,'JobPointsFlat':/<(?:CLASS POINTS|CP) FLAT:[ ]([\+\-]\d+)([%％])>/i,'ClassDescription':/<(?:HELP|DESCRIPTION|HELP DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|DESCRIPTION|HELP DESCRIPTION)>/i,'ClassIcon':/<(?:ICON|ICON INDEX):[ ](\d+)>/i,'classPicture':/<(?:CLASS|CLASS CHANGE) (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i,'ClassFaceName':/<(.*)[ ]FACE:[ ](.*),[ ](\d+)>/gi,'ClassCharaName':/<(.*)[ ](?:CHARACTER|CHARA|SPRITE):[ ](.*),[ ](\d+)>/gi,'ClassBattlerName':/<(.*)[ ](?:BATTLER|SV_ACTOR|SV ACTOR|SVACTOR):[ ](.*)>/gi,'ClassMenuPortrait':/<(.*)[ ]MENU (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'ClassBattlePortrait':/<(.*)[ ]BATTLE (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'ActorUnlockedClasses':/<(?:UNLOCK|UNLOCKED) (?:CLASS|CLASSES):[ ](.*)>/gi,'AutoUnlockRequirements':/<(?:AUTO|AUTOMATIC) UNLOCK REQUIREMENTS>\s*([\s\S]*)\s*<\/(?:AUTO|AUTOMATIC) UNLOCK REQUIREMENTS>/i,'StartingMulticlasses':/<STARTING MULTICLASSES:[ ](\d+)>/i,'StartingClassTier':/<STARTING TIER[ ](\d+)[ ]CLASS:[ ](.*)>/gi,'RestrictClassChangeTier':/<RESTRICT CLASS CHANGE (?:TIER|TIERS):[ ](.*)>/gi,'TierOnlyClass':/<CLASS CHANGE (?:TIER|TIERS) ONLY:[ ](.*)>/gi,'ClassChangeAnimation':/<CLASS CHANGE ANIMATION:[ ](\d+)>/i},VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x1b8)]=Scene_Boot[_0x5d7c39(0x30a)][_0x5d7c39(0x2fc)],Scene_Boot[_0x5d7c39(0x30a)][_0x5d7c39(0x2fc)]=function(){const _0x2d80de=_0x5d7c39;VisuMZ[_0x2d80de(0x35b)][_0x2d80de(0x1b8)][_0x2d80de(0x283)](this),this[_0x2d80de(0x1bd)]();},Scene_Boot[_0x5d7c39(0x30a)][_0x5d7c39(0x1bd)]=function(){const _0x114333=_0x5d7c39;this[_0x114333(0x2f2)]();},Scene_Boot[_0x5d7c39(0x30a)]['process_VisuMZ_ClassChangeSystem_Notetags']=function(){const _0x3b23f5=_0x5d7c39;if(VisuMZ['ParseAllNotetags'])return;for(const _0x490c84 of $dataActors){if(!_0x490c84)continue;ImageManager[_0x3b23f5(0x16a)](_0x490c84);}for(const _0x1a86d0 of $dataClasses){if(!_0x1a86d0)continue;VisuMZ['ClassChangeSystem'][_0x3b23f5(0x2eb)](_0x1a86d0);}},VisuMZ[_0x5d7c39(0x35b)]['JS']={},VisuMZ['ClassChangeSystem'][_0x5d7c39(0x1b1)]=function(_0x50c3bb,_0x1ba675,_0x26e3b1){const _0x2912ca=_0x5d7c39,_0x5a6305=_0x50c3bb[_0x2912ca(0x2d4)];if(_0x5a6305[_0x2912ca(0x245)](_0x26e3b1)){const _0x5d7116=String(RegExp['$1']),_0x1e3f3b=_0x2912ca(0x12f)['format'](_0x5d7116),_0x1fba11=VisuMZ[_0x2912ca(0x35b)][_0x2912ca(0x162)](_0x50c3bb,_0x1ba675);VisuMZ[_0x2912ca(0x35b)]['JS'][_0x1fba11]=new Function(_0x1e3f3b);}},VisuMZ['ClassChangeSystem']['createKeyJS']=function(_0xb319e6,_0x21547a){const _0x15cf71=_0x5d7c39;let _0x8a15f2='';if($dataActors[_0x15cf71(0x2d5)](_0xb319e6))_0x8a15f2=_0x15cf71(0x362)[_0x15cf71(0x233)](_0xb319e6['id'],_0x21547a);if($dataClasses[_0x15cf71(0x2d5)](_0xb319e6))_0x8a15f2='Class-%1-%2'[_0x15cf71(0x233)](_0xb319e6['id'],_0x21547a);if($dataSkills[_0x15cf71(0x2d5)](_0xb319e6))_0x8a15f2=_0x15cf71(0x17c)[_0x15cf71(0x233)](_0xb319e6['id'],_0x21547a);if($dataItems[_0x15cf71(0x2d5)](_0xb319e6))_0x8a15f2=_0x15cf71(0x22a)[_0x15cf71(0x233)](_0xb319e6['id'],_0x21547a);if($dataWeapons[_0x15cf71(0x2d5)](_0xb319e6))_0x8a15f2=_0x15cf71(0x139)['format'](_0xb319e6['id'],_0x21547a);if($dataArmors[_0x15cf71(0x2d5)](_0xb319e6))_0x8a15f2=_0x15cf71(0x20b)[_0x15cf71(0x233)](_0xb319e6['id'],_0x21547a);if($dataEnemies[_0x15cf71(0x2d5)](_0xb319e6))_0x8a15f2=_0x15cf71(0x394)['format'](_0xb319e6['id'],_0x21547a);if($dataStates[_0x15cf71(0x2d5)](_0xb319e6))_0x8a15f2=_0x15cf71(0x192)[_0x15cf71(0x233)](_0xb319e6['id'],_0x21547a);return _0x8a15f2;},VisuMZ['ClassChangeSystem'][_0x5d7c39(0x2e5)]=VisuMZ[_0x5d7c39(0x2e5)],VisuMZ[_0x5d7c39(0x2e5)]=function(_0x186256){const _0x1d221d=_0x5d7c39;VisuMZ[_0x1d221d(0x35b)][_0x1d221d(0x2e5)]['call'](this,_0x186256),ImageManager[_0x1d221d(0x16a)](_0x186256);},VisuMZ[_0x5d7c39(0x35b)]['ParseClassNotetags']=VisuMZ['ParseClassNotetags'],VisuMZ[_0x5d7c39(0x246)]=function(_0x532c8b){const _0x146fc3=_0x5d7c39;VisuMZ[_0x146fc3(0x35b)]['ParseClassNotetags']['call'](this,_0x532c8b),VisuMZ[_0x146fc3(0x35b)][_0x146fc3(0x2eb)](_0x532c8b),VisuMZ[_0x146fc3(0x35b)]['Parse_ClassIcons'](_0x532c8b);},VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x2eb)]=function(_0x4a001b){const _0x148688=_0x5d7c39;_0x4a001b['iconIndex']=ImageManager['classIcon']||0x0,_0x4a001b[_0x148688(0x1aa)]=TextManager['classDescription'][_0x148688(0x233)](_0x4a001b['name']||'');const _0x1b4b66=VisuMZ['ClassChangeSystem'][_0x148688(0x276)],_0x11c2ae=_0x4a001b[_0x148688(0x2d4)];_0x11c2ae[_0x148688(0x245)](_0x1b4b66[_0x148688(0x2bc)])&&(_0x4a001b['iconIndex']=Number(RegExp['$1'])),_0x11c2ae['match'](_0x1b4b66[_0x148688(0x2d0)])&&(_0x4a001b[_0x148688(0x1aa)]=String(RegExp['$1']));},VisuMZ['ClassChangeSystem']['Parse_ClassIcons']=function(_0x55b5eb){const _0x485409=_0x5d7c39;_0x55b5eb[_0x485409(0x385)][_0x485409(0x245)](/\\I\[(\d+)\]/i)&&(_0x55b5eb['iconIndex']=Number(RegExp['$1']));if(Imported[_0x485409(0x141)]){if(VisuMZ[_0x485409(0x311)]['Settings']['UI'][_0x485409(0x347)]){const _0x2e3861=_0x485409(0x2cc);_0x55b5eb[_0x485409(0x385)]=_0x2e3861[_0x485409(0x233)](_0x55b5eb[_0x485409(0x24f)],_0x55b5eb[_0x485409(0x385)]);}else _0x55b5eb[_0x485409(0x385)]=_0x55b5eb[_0x485409(0x385)][_0x485409(0x202)](/\x1bI\[(\d+)\]/gi,''),_0x55b5eb[_0x485409(0x385)]=_0x55b5eb[_0x485409(0x385)][_0x485409(0x202)](/\\I\[(\d+)\]/gi,'');}},DataManager[_0x5d7c39(0x103)]=function(_0x17bc30){const _0xfb7320=_0x5d7c39;if(!_0x17bc30)return[];let _0x54a8d7=[];return _0x54a8d7=_0x54a8d7[_0xfb7320(0x134)](_0x17bc30['getMulticlasses']()[_0xfb7320(0x299)](_0x2737f9=>_0x2737f9['id'])),_0x54a8d7=_0x54a8d7['concat'](_0x17bc30[_0xfb7320(0x30b)]()),_0x54a8d7=_0x54a8d7['concat']($gameParty[_0xfb7320(0x30b)]()),_0x54a8d7=_0x54a8d7[_0xfb7320(0x134)](VisuMZ['ClassChangeSystem'][_0xfb7320(0x2de)][_0xfb7320(0x20d)][_0xfb7320(0x133)]),_0x54a8d7=_0x54a8d7[_0xfb7320(0x1b5)]((_0x482c72,_0x21126d,_0x836410)=>_0x836410[_0xfb7320(0x2c7)](_0x482c72)===_0x21126d),_0x54a8d7['sort'](function(_0x233389,_0x54dc03){return _0x233389-_0x54dc03;}),_0x54a8d7[_0xfb7320(0x299)](_0x39e9dd=>$dataClasses[_0x39e9dd])[_0xfb7320(0x33f)](null);},DataManager['checkForNewUnlockedClasses']=function(_0x348fd3){const _0x486006=_0x5d7c39,_0x2aef2b=[],_0x5b7c3d=DataManager[_0x486006(0x103)](_0x348fd3);for(const _0x2cc6d2 of $dataClasses){if(!_0x2cc6d2)continue;if(_0x5b7c3d[_0x486006(0x2d5)](_0x2cc6d2))continue;this[_0x486006(0x129)](_0x348fd3,_0x2cc6d2)&&_0x2aef2b[_0x486006(0x39a)](_0x2cc6d2['id']);}return _0x2aef2b;},DataManager[_0x5d7c39(0x129)]=function(_0x1d476f,_0x35d7f0){const _0x7c4851=_0x5d7c39;if(!_0x1d476f)return![];if(!_0x35d7f0)return![];const _0x5e6155=VisuMZ['ClassChangeSystem'][_0x7c4851(0x276)],_0x5f5730=_0x35d7f0['note'];if(_0x5f5730[_0x7c4851(0x245)](_0x5e6155[_0x7c4851(0x167)])){const _0x48b692=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x23e621 of _0x48b692){let _0x4023b2=0x0;if(_0x23e621['match'](/(.*):[ ](.*)/i)){const _0x958574=String(RegExp['$1']),_0x151130=String(RegExp['$2']);if(_0x958574['match'](/CLASS[ ](\d+)/i))_0x4023b2=Number(RegExp['$1']);else{if(_0x958574[_0x7c4851(0x245)](/CLASS[ ](.*)/i))_0x4023b2=this['getClassIdWithName'](RegExp['$1']);else{if(_0x958574[_0x7c4851(0x245)](/\b(?:AP|CP|JP|SP)\b/i)){const _0x2012e5=_0x958574[_0x7c4851(0x315)]()['trim'](),_0x419438=Number(_0x151130)||0x0;if(Imported[_0x7c4851(0x195)]){if(_0x2012e5==='AP'){const _0x21af08=_0x1d476f[_0x7c4851(0x2fd)]();if(_0x21af08<_0x419438)return![];}else{if(_0x2012e5==='SP'){const _0x535cc5=_0x1d476f[_0x7c4851(0x2a2)]();if(_0x535cc5<_0x419438)return![];}}}if(Imported['VisuMZ_2_ClassChangeSystem']){if(_0x2012e5==='CP'){const _0xc1517=_0x1d476f[_0x7c4851(0x1d8)]();if(_0xc1517<_0x419438)return![];}else{if(_0x2012e5==='JP'){const _0x35ff63=_0x1d476f[_0x7c4851(0x13d)]();if(_0x35ff63<_0x419438)return![];}}}}}}if(_0x151130[_0x7c4851(0x245)](/LEVEL[ ](\d+)/i)){const _0xf75305=Number(RegExp['$1']);if(_0x1d476f[_0x7c4851(0x243)](_0x4023b2)<_0xf75305)return![];}else{if(_0x151130[_0x7c4851(0x245)](/(\d+)[ ]CP/i)){const _0x3f3bf6=Number(RegExp['$1']);if(_0x1d476f['getClassPoints'](_0x4023b2)<_0x3f3bf6)return![];}else{if(_0x151130[_0x7c4851(0x245)](/(\d+)[ ]JP/i)){const _0x5aae63=Number(RegExp['$1']);if(_0x1d476f['getJobPoints'](_0x4023b2)<_0x5aae63)return![];}else{if(_0x151130[_0x7c4851(0x245)](/(\d+)[ ]AP/i)){if(!Imported['VisuMZ_2_SkillLearnSystem'])continue;const _0x4bccb1=Number(RegExp['$1']);if(_0x1d476f[_0x7c4851(0x2fd)](_0x4023b2)<_0x4bccb1)return![];}else{if(_0x151130[_0x7c4851(0x245)](/(\d+)[ ]SP/i)){const _0x824c8b=Number(RegExp['$1']);if(_0x1d476f[_0x7c4851(0x2a2)](_0x4023b2)<_0x824c8b)return![];}}}}}}}return!![];}return![];},DataManager[_0x5d7c39(0x1be)]=function(_0x54c368){const _0x2e150f=_0x5d7c39;if(!_0x54c368)return[];const _0x1d1fc5=VisuMZ[_0x2e150f(0x35b)]['RegExp'],_0x5622c9=_0x54c368[_0x2e150f(0x2d4)];let _0x2dc883=[];const _0x1fea23=_0x5622c9['match'](_0x1d1fc5[_0x2e150f(0x1e4)]);if(_0x1fea23){for(const _0x3525b3 of _0x1fea23){if(!_0x3525b3)continue;_0x3525b3[_0x2e150f(0x245)](_0x1d1fc5[_0x2e150f(0x1e4)]);const _0x18bd8e=String(RegExp['$1'])[_0x2e150f(0x11e)](',')[_0x2e150f(0x299)](_0xe4baa=>Number(_0xe4baa))[_0x2e150f(0x33f)](null)[_0x2e150f(0x33f)](undefined)['remove'](NaN);_0x2dc883=_0x2dc883[_0x2e150f(0x134)](_0x18bd8e);}return _0x2dc883;}else{const _0x4727f4=VisuMZ[_0x2e150f(0x35b)][_0x2e150f(0x2de)][_0x2e150f(0x341)][_0x2e150f(0x176)];return Array[_0x2e150f(0x26e)]({'length':_0x4727f4},(_0x5022eb,_0xf4702e)=>_0xf4702e+0x1);}},DataManager[_0x5d7c39(0x197)]=function(_0x3da3f8){const _0x39b6a3=_0x5d7c39;_0x3da3f8=_0x3da3f8[_0x39b6a3(0x315)]()[_0x39b6a3(0x37a)](),this[_0x39b6a3(0x30d)]=this[_0x39b6a3(0x30d)]||{};if(this['_classIDs'][_0x3da3f8])return this[_0x39b6a3(0x30d)][_0x3da3f8];for(const _0x47d8ab of $dataClasses){if(!_0x47d8ab)continue;let _0xaf0f81=_0x47d8ab['name'];_0xaf0f81=_0xaf0f81[_0x39b6a3(0x202)](/\x1I\[(\d+)\]/gi,''),_0xaf0f81=_0xaf0f81[_0x39b6a3(0x202)](/\\I\[(\d+)\]/gi,''),this[_0x39b6a3(0x30d)][_0xaf0f81[_0x39b6a3(0x315)]()[_0x39b6a3(0x37a)]()]=_0x47d8ab['id'];}return this[_0x39b6a3(0x30d)][_0x3da3f8]||0x0;},ImageManager[_0x5d7c39(0x1fd)]=VisuMZ['ClassChangeSystem'][_0x5d7c39(0x2de)][_0x5d7c39(0x24b)][_0x5d7c39(0x318)],ImageManager[_0x5d7c39(0x2f1)]=VisuMZ[_0x5d7c39(0x35b)]['Settings']['JobPoints']['Icon'],ImageManager['classIcon']=VisuMZ[_0x5d7c39(0x35b)]['Settings'][_0x5d7c39(0x20d)][_0x5d7c39(0x318)],ImageManager[_0x5d7c39(0x355)]={},ImageManager[_0x5d7c39(0x265)]={},ImageManager[_0x5d7c39(0x345)]={},ImageManager[_0x5d7c39(0x123)]={},ImageManager[_0x5d7c39(0x254)]={},ImageManager['actorClassMenuPortrait']={},ImageManager[_0x5d7c39(0x2f5)]={},ImageManager[_0x5d7c39(0x16a)]=function(_0x1be3dd){const _0x30234d=_0x5d7c39;if(!_0x1be3dd)return;const _0x57364d=VisuMZ[_0x30234d(0x35b)]['RegExp'],_0x2869c2=_0x1be3dd[_0x30234d(0x2d4)],_0x4c80ae=_0x1be3dd['id'],_0x538fe9=_0x2869c2[_0x30234d(0x245)](_0x57364d[_0x30234d(0x2b8)]);if(_0x538fe9)for(const _0x57c89d of _0x538fe9){if(!_0x57c89d)continue;_0x57c89d[_0x30234d(0x245)](_0x57364d[_0x30234d(0x2b8)]);const _0x4f0625=String(RegExp['$1']),_0x4dc2ef=String(RegExp['$2'])[_0x30234d(0x37a)](),_0x1e1cf6=Number(RegExp['$3']);let _0x381761=0x0;if(_0x4f0625['match'](/CLASS[ ](\d+)/i))_0x381761=Number(RegExp['$1']);else _0x4f0625[_0x30234d(0x245)](/CLASS[ ](.*)/i)?_0x381761=DataManager[_0x30234d(0x197)](RegExp['$1']):_0x381761=DataManager[_0x30234d(0x197)](_0x4f0625);if(_0x381761>0x0){const _0x58b0bc=_0x30234d(0x189)['format'](_0x4c80ae,_0x381761);ImageManager[_0x30234d(0x355)][_0x58b0bc]=_0x4dc2ef,ImageManager[_0x30234d(0x265)][_0x58b0bc]=_0x1e1cf6;}}const _0x57fe87=_0x2869c2['match'](_0x57364d[_0x30234d(0x33e)]);if(_0x57fe87)for(const _0x31afea of _0x57fe87){if(!_0x31afea)continue;_0x31afea[_0x30234d(0x245)](_0x57364d['ClassCharaName']);const _0x35e2ac=String(RegExp['$1']),_0x31df1e=String(RegExp['$2'])[_0x30234d(0x37a)](),_0xfcc7be=Number(RegExp['$3']);let _0x34fb2e=0x0;if(_0x35e2ac[_0x30234d(0x245)](/CLASS[ ](\d+)/i))_0x34fb2e=Number(RegExp['$1']);else _0x35e2ac[_0x30234d(0x245)](/CLASS[ ](.*)/i)?_0x34fb2e=DataManager[_0x30234d(0x197)](RegExp['$1']):_0x34fb2e=DataManager['getClassIdWithName'](_0x35e2ac);if(_0x34fb2e>0x0){const _0x1f8ef8='Actor-%1-Class-%2'[_0x30234d(0x233)](_0x4c80ae,_0x34fb2e);ImageManager['actorClassCharacterName'][_0x1f8ef8]=_0x31df1e,ImageManager[_0x30234d(0x123)][_0x1f8ef8]=_0xfcc7be;}}const _0x3510dc=_0x2869c2[_0x30234d(0x245)](_0x57364d[_0x30234d(0x18b)]);if(_0x3510dc)for(const _0x239281 of _0x3510dc){if(!_0x239281)continue;_0x239281[_0x30234d(0x245)](_0x57364d[_0x30234d(0x18b)]);const _0x2be0ee=String(RegExp['$1']),_0x339963=String(RegExp['$2'])['trim']();let _0x59f4fa=0x0;if(_0x2be0ee['match'](/CLASS[ ](\d+)/i))_0x59f4fa=Number(RegExp['$1']);else _0x2be0ee[_0x30234d(0x245)](/CLASS[ ](.*)/i)?_0x59f4fa=DataManager[_0x30234d(0x197)](RegExp['$1']):_0x59f4fa=DataManager[_0x30234d(0x197)](_0x2be0ee);if(_0x59f4fa>0x0){const _0xfeced8=_0x30234d(0x189)[_0x30234d(0x233)](_0x4c80ae,_0x59f4fa);ImageManager[_0x30234d(0x254)][_0xfeced8]=_0x339963;}}const _0x7f7ce0=_0x2869c2[_0x30234d(0x245)](_0x57364d[_0x30234d(0x215)]);if(_0x7f7ce0)for(const _0x4818a5 of _0x7f7ce0){if(!_0x4818a5)continue;_0x4818a5['match'](_0x57364d[_0x30234d(0x215)]);const _0xe6f63e=String(RegExp['$1']),_0x3e8ef7=String(RegExp['$2'])[_0x30234d(0x37a)]();let _0x11add7=0x0;if(_0xe6f63e[_0x30234d(0x245)](/CLASS[ ](\d+)/i))_0x11add7=Number(RegExp['$1']);else _0xe6f63e[_0x30234d(0x245)](/CLASS[ ](.*)/i)?_0x11add7=DataManager[_0x30234d(0x197)](RegExp['$1']):_0x11add7=DataManager[_0x30234d(0x197)](_0xe6f63e);if(_0x11add7>0x0){const _0x2f5677=_0x30234d(0x189)[_0x30234d(0x233)](_0x4c80ae,_0x11add7);ImageManager[_0x30234d(0x213)][_0x2f5677]=_0x3e8ef7;}}const _0x261876=_0x2869c2[_0x30234d(0x245)](_0x57364d[_0x30234d(0x282)]);if(_0x261876)for(const _0x110932 of _0x261876){if(!_0x110932)continue;_0x110932[_0x30234d(0x245)](_0x57364d[_0x30234d(0x282)]);const _0x14c7c3=String(RegExp['$1']),_0x5d7f53=String(RegExp['$2'])[_0x30234d(0x37a)]();let _0x1edbb3=0x0;if(_0x14c7c3[_0x30234d(0x245)](/CLASS[ ](\d+)/i))_0x1edbb3=Number(RegExp['$1']);else _0x14c7c3[_0x30234d(0x245)](/CLASS[ ](.*)/i)?_0x1edbb3=DataManager[_0x30234d(0x197)](RegExp['$1']):_0x1edbb3=DataManager[_0x30234d(0x197)](_0x14c7c3);if(_0x1edbb3>0x0){const _0x54565b=_0x30234d(0x189)[_0x30234d(0x233)](_0x4c80ae,_0x1edbb3);ImageManager[_0x30234d(0x2f5)][_0x54565b]=_0x5d7f53;}}},ImageManager['getActorClassFaceName']=function(_0x52128e){const _0x2a7f8e=_0x5d7c39;if(!_0x52128e)return'';const _0x5d5b4f=_0x2a7f8e(0x189)[_0x2a7f8e(0x233)](_0x52128e['actorId'](),_0x52128e['currentClass']()['id']);return ImageManager[_0x2a7f8e(0x355)][_0x5d5b4f]??'';},ImageManager[_0x5d7c39(0x1ba)]=function(_0x337a22){const _0x3655ad=_0x5d7c39;if(!_0x337a22)return undefined;const _0x50a909=_0x3655ad(0x189)[_0x3655ad(0x233)](_0x337a22['actorId'](),_0x337a22[_0x3655ad(0x144)]()['id']);return ImageManager['actorClassFaceIndex'][_0x50a909]??undefined;},ImageManager['getActorClassCharacterName']=function(_0x20d219){const _0x1c4b34=_0x5d7c39;if(!_0x20d219)return'';const _0x1c6b26='Actor-%1-Class-%2'['format'](_0x20d219[_0x1c4b34(0x39b)](),_0x20d219[_0x1c4b34(0x144)]()['id']);return ImageManager['actorClassCharacterName'][_0x1c6b26]??'';},ImageManager[_0x5d7c39(0x1c1)]=function(_0x3859be){const _0x5085b6=_0x5d7c39;if(!_0x3859be)return undefined;const _0x31db29=_0x5085b6(0x189)['format'](_0x3859be[_0x5085b6(0x39b)](),_0x3859be[_0x5085b6(0x144)]()['id']);return ImageManager['actorClassCharacterIndex'][_0x31db29]??undefined;},ImageManager[_0x5d7c39(0x1f5)]=function(_0x1187a4){const _0x42650e=_0x5d7c39;if(!_0x1187a4)return'';const _0x217129=_0x42650e(0x189)[_0x42650e(0x233)](_0x1187a4[_0x42650e(0x39b)](),_0x1187a4[_0x42650e(0x144)]()['id']);return ImageManager[_0x42650e(0x254)][_0x217129]??'';},ImageManager[_0x5d7c39(0x378)]=function(_0x1d431e){const _0x3ba5e2=_0x5d7c39;if(!_0x1d431e)return'';const _0x13da81=_0x3ba5e2(0x189)[_0x3ba5e2(0x233)](_0x1d431e['actorId'](),_0x1d431e['currentClass']()['id']);return ImageManager['actorClassMenuPortrait'][_0x13da81]??'';},ImageManager['getActorClassBattlePortrait']=function(_0x449926){const _0x2e4c6e=_0x5d7c39;if(!_0x449926)return'';const _0x1b2775=_0x2e4c6e(0x189)[_0x2e4c6e(0x233)](_0x449926[_0x2e4c6e(0x39b)](),_0x449926[_0x2e4c6e(0x144)]()['id']);return ImageManager[_0x2e4c6e(0x2f5)][_0x1b2775]??'';},SoundManager[_0x5d7c39(0x379)]=function(_0x3c926c){const _0x478049=_0x5d7c39;AudioManager[_0x478049(0x275)](VisuMZ['ClassChangeSystem']['Settings']['ChangeClassSound']);},TextManager['classChangeMenuCommand']=VisuMZ['ClassChangeSystem'][_0x5d7c39(0x2de)]['MainMenu']['Name'],TextManager[_0x5d7c39(0x26f)]=VisuMZ[_0x5d7c39(0x35b)]['Settings'][_0x5d7c39(0x24b)]['FullText'],TextManager[_0x5d7c39(0x230)]=VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x2de)][_0x5d7c39(0x24b)][_0x5d7c39(0x2cb)],TextManager[_0x5d7c39(0x2c4)]=VisuMZ['ClassChangeSystem'][_0x5d7c39(0x2de)][_0x5d7c39(0x24b)][_0x5d7c39(0x1da)],TextManager['jobPointsFull']=VisuMZ[_0x5d7c39(0x35b)]['Settings'][_0x5d7c39(0x1cf)][_0x5d7c39(0x1b6)],TextManager[_0x5d7c39(0x26d)]=VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x2de)][_0x5d7c39(0x1cf)]['AbbrText'],TextManager[_0x5d7c39(0x24a)]=VisuMZ['ClassChangeSystem'][_0x5d7c39(0x2de)][_0x5d7c39(0x1cf)][_0x5d7c39(0x1da)],TextManager[_0x5d7c39(0x228)]=VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x2de)]['General']['HelpDescription'],TextManager['classChange_multiclass_noClass']=VisuMZ[_0x5d7c39(0x35b)]['Settings'][_0x5d7c39(0x1a4)]['VocabNoClassAssigned'],TextManager[_0x5d7c39(0x212)]=VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x2de)][_0x5d7c39(0x1a4)]['ShiftButtonAssistText'],TextManager[_0x5d7c39(0x29e)]=VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x2de)][_0x5d7c39(0x1a4)]['VocabUnassignClass'],TextManager[_0x5d7c39(0xfc)]=VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x2de)]['Window'][_0x5d7c39(0x302)],ColorManager['getColor']=function(_0x499fe2){const _0x4c8e46=_0x5d7c39;return _0x499fe2=String(_0x499fe2),_0x499fe2[_0x4c8e46(0x245)](/#(.*)/i)?_0x4c8e46(0x1a0)[_0x4c8e46(0x233)](String(RegExp['$1'])):this[_0x4c8e46(0xff)](Number(_0x499fe2));},VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x156)]=BattleManager['makeRewards'],BattleManager['makeRewards']=function(){const _0x29d175=_0x5d7c39;VisuMZ[_0x29d175(0x35b)][_0x29d175(0x156)]['call'](this),this[_0x29d175(0x18d)](),this[_0x29d175(0x353)](),this[_0x29d175(0x242)](),this[_0x29d175(0x112)]();},VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x32b)]=BattleManager[_0x5d7c39(0x161)],BattleManager[_0x5d7c39(0x161)]=function(){const _0x82b753=_0x5d7c39;VisuMZ[_0x82b753(0x35b)]['BattleManager_displayRewards'][_0x82b753(0x283)](this),this[_0x82b753(0x312)](),this[_0x82b753(0x37c)]();},VisuMZ['ClassChangeSystem'][_0x5d7c39(0xf4)]=BattleManager[_0x5d7c39(0x2ca)],BattleManager[_0x5d7c39(0x2ca)]=function(){const _0x4fcc23=_0x5d7c39;VisuMZ[_0x4fcc23(0x35b)][_0x4fcc23(0xf4)][_0x4fcc23(0x283)](this);const _0x43541e=this[_0x4fcc23(0x2ce)][_0x4fcc23(0x136)];for(const _0x506e55 of $gameParty[_0x4fcc23(0x2fb)]()){_0x506e55[_0x4fcc23(0x17f)](_0x43541e);}},VisuMZ['ClassChangeSystem']['BattleManager_endBattle']=BattleManager[_0x5d7c39(0x386)],BattleManager['endBattle']=function(_0x32bc6c){const _0xed75e6=_0x5d7c39;VisuMZ['ClassChangeSystem']['BattleManager_endBattle']['call'](this,_0x32bc6c);for(const _0x4d4189 of $gameParty[_0xed75e6(0x2fb)]()){_0x4d4189[_0xed75e6(0x2a6)]();}},BattleManager[_0x5d7c39(0x18d)]=function(){const _0x1bb4f6=_0x5d7c39;this[_0x1bb4f6(0x2ce)]['classPoints']=$gameTroop[_0x1bb4f6(0x2d2)]();},BattleManager[_0x5d7c39(0x312)]=function(){const _0x3e6c45=_0x5d7c39;if(!this[_0x3e6c45(0x2ed)]())return;$gameMessage[_0x3e6c45(0x304)]();const _0x19950b=$gameParty[_0x3e6c45(0x15b)](),_0x2a9a8f=VisuMZ['ClassChangeSystem']['Settings']['ClassPoints'],_0x32fdd9=_0x2a9a8f[_0x3e6c45(0x22d)];for(const _0x489ce1 of _0x19950b){if(!_0x489ce1)continue;const _0x54b647=_0x32fdd9[_0x3e6c45(0x233)](_0x489ce1[_0x3e6c45(0x385)](),_0x489ce1['earnedClassPoints'](),TextManager[_0x3e6c45(0x230)],TextManager[_0x3e6c45(0x2c4)]);$gameMessage[_0x3e6c45(0x226)]('\x5c.'+_0x54b647);}},BattleManager['gainRewardsClassPoints']=function(){const _0x1ef480=_0x5d7c39;this['_rewards'][_0x1ef480(0x251)]=this[_0x1ef480(0x2ce)][_0x1ef480(0x251)]||0x0;let _0x4633ae=$gameParty[_0x1ef480(0x2fb)]();VisuMZ['ClassChangeSystem'][_0x1ef480(0x2de)][_0x1ef480(0x24b)][_0x1ef480(0x1de)]&&(_0x4633ae=_0x4633ae[_0x1ef480(0x1b5)](_0x10c277=>_0x10c277[_0x1ef480(0x105)]()));for(const _0x37ee15 of _0x4633ae){if(!_0x37ee15)continue;if(!$dataSystem[_0x1ef480(0x165)]&&!_0x37ee15[_0x1ef480(0x217)]())continue;_0x37ee15['gainClassPoints'](this['_rewards'][_0x1ef480(0x251)]),_0x37ee15[_0x1ef480(0x358)](this[_0x1ef480(0x2ce)][_0x1ef480(0x251)]);}},BattleManager[_0x5d7c39(0x2ed)]=function(){const _0x275925=_0x5d7c39;return VisuMZ[_0x275925(0x35b)][_0x275925(0x2de)][_0x275925(0x24b)]['ShowVictory'];},BattleManager[_0x5d7c39(0x242)]=function(){const _0x32f865=_0x5d7c39;this[_0x32f865(0x2ce)][_0x32f865(0x297)]=$gameTroop['jobPointsTotal']();},BattleManager[_0x5d7c39(0x37c)]=function(){const _0x49d0d1=_0x5d7c39;if(!this[_0x49d0d1(0x188)]())return;$gameMessage['newPage']();const _0x507e2a=$gameParty[_0x49d0d1(0x15b)](),_0x363cb3=VisuMZ[_0x49d0d1(0x35b)][_0x49d0d1(0x2de)]['JobPoints'],_0x5dfddd=_0x363cb3[_0x49d0d1(0x22d)];for(const _0x28d5e6 of _0x507e2a){if(!_0x28d5e6)continue;const _0x585e15=_0x5dfddd[_0x49d0d1(0x233)](_0x28d5e6[_0x49d0d1(0x385)](),_0x28d5e6[_0x49d0d1(0x2e1)](),TextManager[_0x49d0d1(0x26d)],TextManager[_0x49d0d1(0x24a)]);$gameMessage[_0x49d0d1(0x226)]('\x5c.'+_0x585e15);}},BattleManager[_0x5d7c39(0x112)]=function(){const _0x3d342e=_0x5d7c39;this[_0x3d342e(0x2ce)][_0x3d342e(0x297)]=this['_rewards'][_0x3d342e(0x297)]||0x0;let _0x11060d=$gameParty[_0x3d342e(0x2fb)]();VisuMZ[_0x3d342e(0x35b)][_0x3d342e(0x2de)]['JobPoints']['AliveActors']&&(_0x11060d=_0x11060d['filter'](_0x2ea97c=>_0x2ea97c[_0x3d342e(0x105)]()));for(const _0x11b4de of _0x11060d){if(!_0x11b4de)continue;if(!$dataSystem[_0x3d342e(0x165)]&&!_0x11b4de['isBattleMember']())continue;_0x11b4de['gainJobPoints'](this['_rewards'][_0x3d342e(0x297)]),_0x11b4de[_0x3d342e(0x295)](this['_rewards']['jobPoints']);}},BattleManager[_0x5d7c39(0x188)]=function(){const _0x2e129a=_0x5d7c39;return VisuMZ[_0x2e129a(0x35b)][_0x2e129a(0x2de)][_0x2e129a(0x1cf)][_0x2e129a(0x183)];},VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x356)]=Game_System[_0x5d7c39(0x30a)][_0x5d7c39(0x23d)],Game_System['prototype']['initialize']=function(){const _0x308d81=_0x5d7c39;VisuMZ[_0x308d81(0x35b)]['Game_System_initialize'][_0x308d81(0x283)](this),this[_0x308d81(0x352)]();},Game_System[_0x5d7c39(0x30a)]['initClassChangeSystemMainMenu']=function(){const _0x50b8e7=_0x5d7c39;this[_0x50b8e7(0x25e)]={'shown':VisuMZ[_0x50b8e7(0x35b)]['Settings'][_0x50b8e7(0x2c6)]['ShowMainMenu'],'enabled':VisuMZ[_0x50b8e7(0x35b)][_0x50b8e7(0x2de)][_0x50b8e7(0x2c6)][_0x50b8e7(0x334)]};},Game_System[_0x5d7c39(0x30a)][_0x5d7c39(0x269)]=function(){const _0x3088ad=_0x5d7c39;if(this['_ClassChangeSystem_MainMenu']===undefined)this[_0x3088ad(0x352)]();return this[_0x3088ad(0x25e)][_0x3088ad(0x336)];},Game_System['prototype'][_0x5d7c39(0x19c)]=function(_0x4a140b){const _0x3d6b51=_0x5d7c39;if(this['_ClassChangeSystem_MainMenu']===undefined)this[_0x3d6b51(0x352)]();this[_0x3d6b51(0x25e)][_0x3d6b51(0x336)]=_0x4a140b;},Game_System[_0x5d7c39(0x30a)]['isMainMenuClassChangeSystemEnabled']=function(){const _0x4c1bc7=_0x5d7c39;if(this['_ClassChangeSystem_MainMenu']===undefined)this['initClassChangeSystemMainMenu']();return this[_0x4c1bc7(0x25e)][_0x4c1bc7(0x12c)];},Game_System[_0x5d7c39(0x30a)][_0x5d7c39(0x13b)]=function(_0x379a59){const _0x1d748c=_0x5d7c39;if(this[_0x1d748c(0x25e)]===undefined)this['initClassChangeSystemMainMenu']();this[_0x1d748c(0x25e)][_0x1d748c(0x12c)]=_0x379a59;},VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x229)]=Game_Action[_0x5d7c39(0x30a)][_0x5d7c39(0x31b)],Game_Action[_0x5d7c39(0x30a)]['applyItemUserEffect']=function(_0x13ab18){const _0x35de06=_0x5d7c39;VisuMZ[_0x35de06(0x35b)][_0x35de06(0x229)][_0x35de06(0x283)](this,_0x13ab18),this[_0x35de06(0x24c)](_0x13ab18);},Game_Action[_0x5d7c39(0x30a)][_0x5d7c39(0x24c)]=function(_0x42cc52){const _0x14b584=_0x5d7c39;if(this[_0x14b584(0x18e)]())this[_0x14b584(0x1d0)](_0x42cc52);},Game_Action[_0x5d7c39(0x30a)][_0x5d7c39(0x1d0)]=function(_0xe29ae4){const _0x3cee3a=_0x5d7c39,_0x584d91=VisuMZ['ClassChangeSystem']['RegExp'],_0xc81a09=this[_0x3cee3a(0x18e)]()[_0x3cee3a(0x2d4)];if($gameParty['inBattle']()){if(this[_0x3cee3a(0x38a)]()[_0x3cee3a(0x32c)]()&&_0xc81a09[_0x3cee3a(0x245)](_0x584d91['UserGainClassPoints'])){const _0xa19a94=eval(RegExp['$1']);this[_0x3cee3a(0x38a)]()['gainClassPoints'](_0xa19a94);}else this[_0x3cee3a(0x1b9)]();if(_0xe29ae4['isActor']()&&_0xc81a09['match'](_0x584d91[_0x3cee3a(0x19b)])){const _0x5f5374=eval(RegExp['$1']);_0xe29ae4[_0x3cee3a(0x19a)](_0x5f5374);}}if($gameParty[_0x3cee3a(0x2c8)]()){if(this[_0x3cee3a(0x38a)]()[_0x3cee3a(0x32c)]()&&_0xc81a09[_0x3cee3a(0x245)](_0x584d91[_0x3cee3a(0x1c3)])){const _0x435ff=eval(RegExp['$1']);this['subject']()[_0x3cee3a(0x2f7)](_0x435ff);}else this[_0x3cee3a(0x14f)]();if(_0xe29ae4[_0x3cee3a(0x32c)]()&&_0xc81a09[_0x3cee3a(0x245)](_0x584d91[_0x3cee3a(0x1c6)])){const _0xb79ea2=eval(RegExp['$1']);_0xe29ae4[_0x3cee3a(0x2f7)](_0xb79ea2);}}if(_0xc81a09[_0x3cee3a(0x245)](/<NOTETAG>/i)){}},Game_Action[_0x5d7c39(0x30a)][_0x5d7c39(0x1b9)]=function(){const _0x1d4fa2=_0x5d7c39;if(!$gameParty[_0x1d4fa2(0x2c8)]())return;if(!this[_0x1d4fa2(0x38a)]()[_0x1d4fa2(0x32c)]())return;const _0x1d0df4=VisuMZ[_0x1d4fa2(0x35b)][_0x1d4fa2(0x2de)]['ClassPoints'];let _0x3e36a2=0x0;try{_0x3e36a2=eval(_0x1d0df4['PerAction']);}catch(_0x271725){if($gameTemp['isPlaytest']())console[_0x1d4fa2(0x2d6)](_0x271725);}this[_0x1d4fa2(0x38a)]()[_0x1d4fa2(0x19a)](_0x3e36a2);},Game_Action[_0x5d7c39(0x30a)][_0x5d7c39(0x14f)]=function(){const _0x3f4899=_0x5d7c39;if(!$gameParty[_0x3f4899(0x2c8)]())return;if(!this[_0x3f4899(0x38a)]()[_0x3f4899(0x32c)]())return;const _0x3a9dcd=VisuMZ[_0x3f4899(0x35b)][_0x3f4899(0x2de)][_0x3f4899(0x1cf)];let _0x939d16=0x0;try{_0x939d16=eval(_0x3a9dcd[_0x3f4899(0x1ca)]);}catch(_0x1ca876){if($gameTemp[_0x3f4899(0x308)]())console[_0x3f4899(0x2d6)](_0x1ca876);}this[_0x3f4899(0x38a)]()[_0x3f4899(0x2f7)](_0x939d16);},VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x172)]=Game_Battler['prototype'][_0x5d7c39(0x2ba)],Game_Battler[_0x5d7c39(0x30a)][_0x5d7c39(0x2ba)]=function(_0x41df48){const _0x589200=_0x5d7c39;this[_0x589200(0x1ed)]&&this[_0x589200(0x32c)]()&&$gameParty[_0x589200(0x2c8)]()?this['_tp']=(this['_tp']+_0x41df48)['clamp'](0x0,this['maxTp']()):VisuMZ['ClassChangeSystem'][_0x589200(0x172)][_0x589200(0x283)](this,_0x41df48);},VisuMZ['ClassChangeSystem']['Game_Actor_equips']=Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x2da)],Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x2da)]=function(){const _0x14cdcf=_0x5d7c39;return VisuMZ[_0x14cdcf(0x35b)][_0x14cdcf(0x36f)](this)?VisuMZ[_0x14cdcf(0x33b)]['Game_Actor_equips'][_0x14cdcf(0x283)](this):VisuMZ[_0x14cdcf(0x35b)]['Game_Actor_equips'][_0x14cdcf(0x283)](this);},VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x36f)]=function(_0x37b7d8){const _0x295024=_0x5d7c39;return Imported[_0x295024(0x286)]&&_0x37b7d8[_0x295024(0x32c)]()&&_0x37b7d8[_0x295024(0x319)]!==undefined&&_0x37b7d8===BattleManager[_0x295024(0x104)]&&$gameParty[_0x295024(0x2c8)]();},VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x211)]=Game_Battler[_0x5d7c39(0x30a)]['onBattleStart'],Game_Battler[_0x5d7c39(0x30a)][_0x5d7c39(0x11b)]=function(_0x5a908d){const _0x267661=_0x5d7c39;VisuMZ['ClassChangeSystem']['Game_Battler_onBattleStart'][_0x267661(0x283)](this,_0x5a908d),this[_0x267661(0x32c)]()&&(this['_earnedClassPoints']=this['getClassPoints'](),this[_0x267661(0x119)]=this[_0x267661(0x13d)]());},Game_Actor['CLASS_CHANGE_ADJUST_HP_MP']=VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x2de)][_0x5d7c39(0x20d)][_0x5d7c39(0x2ec)],VisuMZ['ClassChangeSystem'][_0x5d7c39(0x2c5)]=Game_Actor[_0x5d7c39(0x30a)]['setup'],Game_Actor['prototype']['setup']=function(_0x27e33a){const _0x549de4=_0x5d7c39;VisuMZ[_0x549de4(0x35b)][_0x549de4(0x2c5)][_0x549de4(0x283)](this,_0x27e33a),this['initClassPoints'](),this[_0x549de4(0x225)](),this[_0x549de4(0x214)](),this[_0x549de4(0x343)](),this[_0x549de4(0x2b4)]();},Game_Actor[_0x5d7c39(0x30a)]['setupClassChangeSystem']=function(){const _0x22ef2e=_0x5d7c39;this[_0x22ef2e(0x31f)](),this[_0x22ef2e(0x34c)](),this[_0x22ef2e(0x317)](),this[_0x22ef2e(0x2bb)](),this[_0x22ef2e(0x2dd)](),this['refresh'](),this['clearParamPlus'](),this['recoverAll']();},VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x37e)]=Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x23b)],Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x23b)]=function(_0x108384,_0x576b35){const _0xcf99cb=_0x5d7c39;_0x576b35=this[_0xcf99cb(0x182)]();_0x576b35&&(this[_0xcf99cb(0x34f)]=this[_0xcf99cb(0x34f)]||{},this[_0xcf99cb(0x34f)][_0x108384]=this['_exp'][this[_0xcf99cb(0x11d)]]||0x0,_0x576b35=![]);this[_0xcf99cb(0x10e)]=!![];const _0x57a474=JsonEx['makeDeepCopy'](this);_0x57a474[_0xcf99cb(0x15e)]=!![],VisuMZ[_0xcf99cb(0x35b)]['Game_Actor_changeClass'][_0xcf99cb(0x283)](this,_0x108384,_0x576b35),this[_0xcf99cb(0x2a0)](_0x57a474),this[_0xcf99cb(0x15a)](),this[_0xcf99cb(0x36a)](_0x108384),this[_0xcf99cb(0x10e)]=undefined;if($gamePlayer)$gamePlayer['refresh']();},VisuMZ[_0x5d7c39(0x35b)]['Game_Actor_tradeItemWithParty']=Game_Actor['prototype'][_0x5d7c39(0x2c0)],Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x2c0)]=function(_0x2999d6,_0x2fb29c){const _0x3c01c9=_0x5d7c39;if(this[_0x3c01c9(0x15e)])return![];return VisuMZ[_0x3c01c9(0x35b)][_0x3c01c9(0x2b1)][_0x3c01c9(0x283)](this,_0x2999d6,_0x2fb29c);},VisuMZ['ClassChangeSystem']['Game_Actor_releaseUnequippableItems']=Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x13f)],Game_Actor[_0x5d7c39(0x30a)]['releaseUnequippableItems']=function(_0x50ff6b){const _0x33f75c=_0x5d7c39;if($gameParty['inBattle']())return;VisuMZ[_0x33f75c(0x35b)][_0x33f75c(0x26a)]['call'](this,_0x50ff6b);},VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x285)]=Game_Actor[_0x5d7c39(0x30a)]['levelUp'],Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x2ee)]=function(){const _0xa7d6ea=_0x5d7c39;VisuMZ[_0xa7d6ea(0x35b)]['Game_Actor_levelUp'][_0xa7d6ea(0x283)](this);const _0x193de0=this['currentClass']()['id'];this[_0xa7d6ea(0x1b2)](_0x193de0),this[_0xa7d6ea(0x2a8)](_0x193de0),this[_0xa7d6ea(0x1bb)]=this[_0xa7d6ea(0x1bb)]||{},this['_classLevel'][_0x193de0]=this['level'],this[_0xa7d6ea(0x182)]()&&this[_0xa7d6ea(0x2dd)]();},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x2a0)]=function(_0x298f10){const _0x5ac35e=_0x5d7c39;if(!Game_Actor['CLASS_CHANGE_ADJUST_HP_MP'])return;const _0x441084=Math[_0x5ac35e(0x23c)](_0x298f10['hpRate']()*this['mhp']),_0x16697a=Math[_0x5ac35e(0x23c)](_0x298f10[_0x5ac35e(0x2aa)]()*this[_0x5ac35e(0x387)]);if(this['hp']>0x0)this[_0x5ac35e(0x37d)](_0x441084);if(this['mp']>0x0)this[_0x5ac35e(0x234)](_0x16697a);},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x367)]=function(){const _0x42a779=_0x5d7c39;this[_0x42a779(0x15d)]={};},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x225)]=function(){const _0x4980dc=_0x5d7c39,_0x3a4549=VisuMZ[_0x4980dc(0x35b)]['RegExp'],_0x32a29c=this[_0x4980dc(0x340)]()['note'];if(_0x32a29c['match'](_0x3a4549[_0x4980dc(0x18f)])){const _0x21cec2=eval(RegExp['$1']);this[_0x4980dc(0x19a)](_0x21cec2);}const _0x288e69=VisuMZ['ClassChangeSystem'][_0x4980dc(0x2de)][_0x4980dc(0x24b)];if(!_0x288e69[_0x4980dc(0x1e5)])return;const _0x96ea54=_0x32a29c[_0x4980dc(0x245)](_0x3a4549[_0x4980dc(0x257)]);if(_0x96ea54)for(const _0x265de6 of _0x96ea54){if(!_0x265de6)continue;_0x265de6['match'](_0x3a4549[_0x4980dc(0x257)]);const _0x2aa1ed=String(RegExp['$1']),_0x559441=eval(RegExp['$2']),_0x4d008e=/^\d+$/[_0x4980dc(0x31e)](_0x2aa1ed);let _0x24dc5d=0x0;_0x4d008e?_0x24dc5d=Number(_0x2aa1ed):_0x24dc5d=DataManager['getClassIdWithName'](_0x2aa1ed),this[_0x4980dc(0x19a)](_0x559441,_0x24dc5d);}},Game_Actor['prototype'][_0x5d7c39(0x1d8)]=function(_0x53d097){const _0x3c27ed=_0x5d7c39;this[_0x3c27ed(0x15d)]===undefined&&this[_0x3c27ed(0x367)]();const _0x1ec18f=VisuMZ[_0x3c27ed(0x35b)]['Settings'][_0x3c27ed(0x24b)];return _0x1ec18f[_0x3c27ed(0x1e5)]?_0x53d097=0x0:_0x53d097=_0x53d097||this[_0x3c27ed(0x144)]()['id'],this[_0x3c27ed(0x15d)][_0x53d097]=this[_0x3c27ed(0x15d)][_0x53d097]||0x0,Math[_0x3c27ed(0x23c)](this[_0x3c27ed(0x15d)][_0x53d097]);},Game_Actor[_0x5d7c39(0x30a)]['setClassPoints']=function(_0x2e5e23,_0x270e85){const _0x5e062d=_0x5d7c39;this['_classPoints']===undefined&&this[_0x5e062d(0x367)]();const _0x1de525=VisuMZ[_0x5e062d(0x35b)]['Settings'][_0x5e062d(0x24b)];_0x1de525[_0x5e062d(0x1e5)]?_0x270e85=0x0:_0x270e85=_0x270e85||this['currentClass']()['id'];this[_0x5e062d(0x15d)][_0x270e85]=this['_classPoints'][_0x270e85]||0x0,this[_0x5e062d(0x15d)][_0x270e85]=Math['round'](_0x2e5e23||0x0);const _0x268943=_0x1de525[_0x5e062d(0x30c)]||Number[_0x5e062d(0x24d)];this[_0x5e062d(0x15d)][_0x270e85]=this[_0x5e062d(0x15d)][_0x270e85][_0x5e062d(0x35d)](0x0,_0x268943);},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x19a)]=function(_0x3af781,_0x19f7fd){const _0x3a21b7=_0x5d7c39;_0x3af781>0x0&&(_0x3af781*=this[_0x3a21b7(0x25a)]()),this[_0x3a21b7(0x38f)](_0x3af781,_0x19f7fd);},Game_Actor['prototype'][_0x5d7c39(0x358)]=function(_0x4f5486){const _0x1011ec=_0x5d7c39;if(!Imported[_0x1011ec(0x250)])return;_0x4f5486>0x0&&(_0x4f5486*=this['classPointsRate']()),this[_0x1011ec(0x291)](_0x4f5486,_0x1011ec(0x148));},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x38f)]=function(_0x287d12,_0x31877d){const _0x2b2a5a=_0x5d7c39,_0x4d7d2a=VisuMZ[_0x2b2a5a(0x35b)]['Settings'][_0x2b2a5a(0x24b)];_0x4d7d2a['SharedResource']?_0x31877d=0x0:_0x31877d=_0x31877d||this['currentClass']()['id'],_0x287d12+=this[_0x2b2a5a(0x1d8)](_0x31877d),this['setClassPoints'](_0x287d12,_0x31877d);},Game_Actor['prototype']['loseClassPoints']=function(_0x152252,_0x1d2003){const _0x56806a=_0x5d7c39;this[_0x56806a(0x38f)](-_0x152252,_0x1d2003);},Game_Actor['prototype'][_0x5d7c39(0x25a)]=function(){const _0x296a4e=_0x5d7c39,_0x38aae0=VisuMZ[_0x296a4e(0x35b)][_0x296a4e(0x276)],_0x2a1c83=this['traitObjects']()[_0x296a4e(0x33f)](null)[_0x296a4e(0x33f)](undefined);let _0x278e9f=0x1;return _0x278e9f=_0x2a1c83[_0x296a4e(0x17d)]((_0x3969cb,_0x375a4e)=>{const _0x5c615f=_0x296a4e;return _0x375a4e&&_0x375a4e[_0x5c615f(0x2d4)][_0x5c615f(0x245)](_0x38aae0['ClassPointsPlus'])?_0x3969cb+Number(RegExp['$1'])*0.01:_0x3969cb;},_0x278e9f),_0x278e9f=_0x2a1c83[_0x296a4e(0x17d)]((_0x367089,_0x3478c6)=>{const _0x5c810f=_0x296a4e;return _0x3478c6&&_0x3478c6[_0x5c810f(0x2d4)][_0x5c810f(0x245)](_0x38aae0[_0x5c810f(0x1b0)])?_0x367089*(Number(RegExp['$1'])*0.01):_0x367089;},_0x278e9f),_0x278e9f=_0x2a1c83[_0x296a4e(0x17d)]((_0x5c613d,_0x3348be)=>{const _0x51b691=_0x296a4e;return _0x3348be&&_0x3348be[_0x51b691(0x2d4)]['match'](_0x38aae0[_0x51b691(0x2f6)])?_0x5c613d+Number(RegExp['$1'])*0.01:_0x5c613d;},_0x278e9f),_0x278e9f;},Game_Actor['prototype'][_0x5d7c39(0x1b2)]=function(_0x456933){const _0x3c976d=_0x5d7c39;if(this['_ClassChangeSystem_preventLevelUpGain'])return;const _0x2eb31b=VisuMZ[_0x3c976d(0x35b)][_0x3c976d(0x2de)][_0x3c976d(0x24b)];let _0x25e83d=0x0;try{_0x25e83d=eval(_0x2eb31b['PerLevelUp']);}catch(_0x4c8f4a){if($gameTemp[_0x3c976d(0x308)]())console[_0x3c976d(0x2d6)](_0x4c8f4a);}this['gainClassPoints'](_0x25e83d,_0x456933);},Game_Actor[_0x5d7c39(0x30a)]['earnedClassPoints']=function(){const _0x49a37f=_0x5d7c39;return this[_0x49a37f(0x239)]=this['_earnedClassPoints']||0x0,this['getClassPoints']()-this[_0x49a37f(0x239)];},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x214)]=function(){const _0x3273d4=_0x5d7c39;this[_0x3273d4(0x327)]={};},Game_Actor['prototype']['gainStartingJobPoints']=function(){const _0x185f85=_0x5d7c39,_0x2a3f2e=VisuMZ['ClassChangeSystem'][_0x185f85(0x276)],_0x4cc8fb=this[_0x185f85(0x340)]()['note'];if(_0x4cc8fb['match'](_0x2a3f2e[_0x185f85(0x1f2)])){const _0x48371d=eval(RegExp['$1']);this['gainJobPoints'](_0x48371d);}const _0x40f870=VisuMZ[_0x185f85(0x35b)][_0x185f85(0x2de)][_0x185f85(0x1cf)];if(!_0x40f870[_0x185f85(0x1e5)])return;const _0x104fe8=_0x4cc8fb[_0x185f85(0x245)](_0x2a3f2e[_0x185f85(0x22f)]);if(_0x104fe8)for(const _0x887b71 of _0x104fe8){if(!_0x887b71)continue;_0x887b71[_0x185f85(0x245)](_0x2a3f2e[_0x185f85(0x22f)]);const _0x2e662e=String(RegExp['$1']),_0x292383=eval(RegExp['$2']),_0x2c9338=/^\d+$/[_0x185f85(0x31e)](_0x2e662e);let _0x5e2b2c=0x0;_0x2c9338?_0x5e2b2c=Number(_0x2e662e):_0x5e2b2c=DataManager['getClassIdWithName'](_0x2e662e),this['gainJobPoints'](_0x292383,_0x5e2b2c);}},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x13d)]=function(_0x25f524){const _0x282e2c=_0x5d7c39;this[_0x282e2c(0x327)]===undefined&&this[_0x282e2c(0x214)]();const _0x50cbaa=VisuMZ['ClassChangeSystem']['Settings'][_0x282e2c(0x1cf)];return _0x50cbaa[_0x282e2c(0x1e5)]?_0x25f524=0x0:_0x25f524=_0x25f524||this[_0x282e2c(0x144)]()['id'],this['_jobPoints'][_0x25f524]=this[_0x282e2c(0x327)][_0x25f524]||0x0,Math[_0x282e2c(0x23c)](this[_0x282e2c(0x327)][_0x25f524]);},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x2a7)]=function(_0x16db30,_0x4b221f){const _0xda3a74=_0x5d7c39;this[_0xda3a74(0x327)]===undefined&&this[_0xda3a74(0x214)]();const _0x3d31a8=VisuMZ[_0xda3a74(0x35b)]['Settings'][_0xda3a74(0x1cf)];_0x3d31a8[_0xda3a74(0x1e5)]?_0x4b221f=0x0:_0x4b221f=_0x4b221f||this[_0xda3a74(0x144)]()['id'];this[_0xda3a74(0x327)][_0x4b221f]=this['_jobPoints'][_0x4b221f]||0x0,this['_jobPoints'][_0x4b221f]=Math['round'](_0x16db30||0x0);const _0x40fac8=_0x3d31a8['MaxResource']||Number[_0xda3a74(0x24d)];this[_0xda3a74(0x327)][_0x4b221f]=this['_jobPoints'][_0x4b221f]['clamp'](0x0,_0x40fac8);},Game_Actor['prototype']['gainJobPoints']=function(_0x595076,_0x4ee960){const _0x361b6b=_0x5d7c39;_0x595076>0x0&&(_0x595076*=this[_0x361b6b(0x170)]()),this[_0x361b6b(0x2b7)](_0x595076,_0x4ee960);},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x295)]=function(_0x270d5d){const _0x3bfd6c=_0x5d7c39;if(!Imported['VisuMZ_2_ClassChangeSystem'])return;_0x270d5d>0x0&&(_0x270d5d*=this[_0x3bfd6c(0x170)]()),this[_0x3bfd6c(0x291)](_0x270d5d,_0x3bfd6c(0x1f1));},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x2b7)]=function(_0x4596db,_0xe78238){const _0x4bf8a0=_0x5d7c39,_0x15aa5b=VisuMZ[_0x4bf8a0(0x35b)][_0x4bf8a0(0x2de)][_0x4bf8a0(0x1cf)];_0x15aa5b['SharedResource']?_0xe78238=0x0:_0xe78238=_0xe78238||this['currentClass']()['id'],_0x4596db+=this['getJobPoints'](_0xe78238),this[_0x4bf8a0(0x2a7)](_0x4596db,_0xe78238);},Game_Actor[_0x5d7c39(0x30a)]['loseJobPoints']=function(_0x16abc8,_0xbf88fb){const _0x1874be=_0x5d7c39;this[_0x1874be(0x2b7)](-_0x16abc8,_0xbf88fb);},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x170)]=function(){const _0x209edc=_0x5d7c39,_0x5be9cf=VisuMZ[_0x209edc(0x35b)][_0x209edc(0x276)],_0x156a7e=this[_0x209edc(0x1c2)]()['remove'](null)[_0x209edc(0x33f)](undefined);let _0x2174d2=0x1;return _0x2174d2=_0x156a7e['reduce']((_0x383031,_0x20630a)=>{const _0x26d704=_0x209edc;return _0x20630a&&_0x20630a['note']['match'](_0x5be9cf[_0x26d704(0x200)])?_0x383031+Number(RegExp['$1'])*0.01:_0x383031;},_0x2174d2),_0x2174d2=_0x156a7e[_0x209edc(0x17d)]((_0x1ef47d,_0x4b1554)=>{const _0x38d68b=_0x209edc;return _0x4b1554&&_0x4b1554[_0x38d68b(0x2d4)][_0x38d68b(0x245)](_0x5be9cf['JobPointsRate'])?_0x1ef47d*(Number(RegExp['$1'])*0.01):_0x1ef47d;},_0x2174d2),_0x2174d2=_0x156a7e[_0x209edc(0x17d)]((_0x5079d3,_0x352344)=>{const _0x5f27b4=_0x209edc;return _0x352344&&_0x352344[_0x5f27b4(0x2d4)]['match'](_0x5be9cf[_0x5f27b4(0x26b)])?_0x5079d3+Number(RegExp['$1'])*0.01:_0x5079d3;},_0x2174d2),_0x2174d2;},Game_Actor[_0x5d7c39(0x30a)]['levelUpGainJobPoints']=function(_0x4eec66){const _0x5b091f=_0x5d7c39;if(this[_0x5b091f(0x10e)])return;const _0x21e740=VisuMZ[_0x5b091f(0x35b)][_0x5b091f(0x2de)]['JobPoints'];let _0x1100fa=0x0;try{_0x1100fa=eval(_0x21e740[_0x5b091f(0xf6)]);}catch(_0x1a9ebb){if($gameTemp[_0x5b091f(0x308)]())console[_0x5b091f(0x2d6)](_0x1a9ebb);}this[_0x5b091f(0x2f7)](_0x1100fa,_0x4eec66);},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x2e1)]=function(){const _0xedeaf=_0x5d7c39;return this[_0xedeaf(0x119)]=this[_0xedeaf(0x119)]||0x0,this[_0xedeaf(0x13d)]()-this[_0xedeaf(0x119)];},VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x127)]=Game_Actor[_0x5d7c39(0x30a)]['setFaceImage'],Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x2fe)]=function(_0x46eaec,_0x36a957){const _0x41fd2c=_0x5d7c39;_0x46eaec!==''?(this[_0x41fd2c(0x23a)]=_0x46eaec,this['_priorityFaceIndex']=_0x36a957):(this[_0x41fd2c(0x23a)]=undefined,this[_0x41fd2c(0x2dc)]=undefined);},VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x22e)]=Game_Actor['prototype'][_0x5d7c39(0x3a2)],Game_Actor['prototype'][_0x5d7c39(0x3a2)]=function(){const _0x41c959=_0x5d7c39;if(this[_0x41c959(0x23a)]!==undefined)return this[_0x41c959(0x23a)];return ImageManager['getActorClassFaceName'](this)||VisuMZ['ClassChangeSystem'][_0x41c959(0x22e)]['call'](this);},VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x232)]=Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x231)],Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x231)]=function(){const _0x3de4dd=_0x5d7c39;if(this['_priorityFaceIndex']!==undefined)return this[_0x3de4dd(0x2dc)];const _0x4af565=ImageManager['getActorClassFaceIndex'](this);if(_0x4af565!==undefined)return _0x4af565;return VisuMZ[_0x3de4dd(0x35b)][_0x3de4dd(0x232)][_0x3de4dd(0x283)](this);},VisuMZ[_0x5d7c39(0x35b)]['Game_Actor_setCharacterImage']=Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x166)],Game_Actor[_0x5d7c39(0x30a)]['setCharacterImage']=function(_0x2d30a5,_0x44d65d){const _0x47c91b=_0x5d7c39;_0x2d30a5!==''?(this[_0x47c91b(0x273)]=_0x2d30a5,this[_0x47c91b(0x210)]=_0x44d65d):(this['_priorityCharacterName']=undefined,this[_0x47c91b(0x210)]=undefined);},VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x328)]=Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x145)],Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x145)]=function(){const _0x255441=_0x5d7c39;if(this['_priorityCharacterName']!==undefined)return this[_0x255441(0x273)];return ImageManager['getActorClassCharacterName'](this)||VisuMZ[_0x255441(0x35b)]['Game_Actor_characterName'][_0x255441(0x283)](this);},VisuMZ['ClassChangeSystem'][_0x5d7c39(0x155)]=Game_Actor['prototype'][_0x5d7c39(0x259)],Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x259)]=function(){const _0x57dd10=_0x5d7c39;if(this[_0x57dd10(0x210)]!==undefined)return this[_0x57dd10(0x210)];const _0x4422e7=ImageManager[_0x57dd10(0x1c1)](this);if(_0x4422e7!==undefined)return _0x4422e7;return VisuMZ[_0x57dd10(0x35b)]['Game_Actor_characterIndex']['call'](this);},VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x316)]=Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x221)],Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x221)]=function(_0x44c882){const _0x2d8166=_0x5d7c39;_0x44c882!==''?this[_0x2d8166(0x294)]=_0x44c882:this[_0x2d8166(0x294)]=undefined;},VisuMZ['ClassChangeSystem'][_0x5d7c39(0x2df)]=Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x2a3)],Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x2a3)]=function(){const _0x2ec91f=_0x5d7c39;if(this[_0x2ec91f(0x294)]!==undefined)return this[_0x2ec91f(0x294)];return ImageManager[_0x2ec91f(0x1f5)](this)||VisuMZ[_0x2ec91f(0x35b)]['Game_Actor_battlerName'][_0x2ec91f(0x283)](this);;},VisuMZ[_0x5d7c39(0x35b)]['Game_Actor_setMenuImage']=Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x3a1)],Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x3a1)]=function(_0x3d5d59){const _0x531668=_0x5d7c39;_0x3d5d59!==''?this[_0x531668(0x19e)]=_0x3d5d59:this[_0x531668(0x19e)]=undefined;},VisuMZ['ClassChangeSystem'][_0x5d7c39(0x125)]=Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x31a)],Game_Actor['prototype'][_0x5d7c39(0x31a)]=function(){const _0x3e1f0d=_0x5d7c39;if(this['_priorityMenuImage']!==undefined)return this['_priorityMenuImage'];if(!Imported[_0x3e1f0d(0xf1)])return'';return ImageManager[_0x3e1f0d(0x378)](this)||VisuMZ['ClassChangeSystem'][_0x3e1f0d(0x125)][_0x3e1f0d(0x283)](this);;},VisuMZ['ClassChangeSystem'][_0x5d7c39(0x12e)]=Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x32f)],Game_Actor[_0x5d7c39(0x30a)]['setBattlePortrait']=function(_0x4727d1){const _0x4422c4=_0x5d7c39;_0x4727d1!==''?this['_priorityBattlePortrait']=_0x4727d1:this['_priorityBattlePortrait']=undefined;if(SceneManager[_0x4422c4(0x1b3)]()&&$gameParty[_0x4422c4(0x11c)]()[_0x4422c4(0x2d5)](this)){const _0x1d8635=SceneManager[_0x4422c4(0x332)][_0x4422c4(0x235)];if(_0x1d8635)_0x1d8635[_0x4422c4(0x28c)](this);}},VisuMZ['ClassChangeSystem'][_0x5d7c39(0x262)]=Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x147)],Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x147)]=function(){const _0x2c3855=_0x5d7c39;if(this[_0x2c3855(0x204)]!==undefined)return this[_0x2c3855(0x204)];return ImageManager[_0x2c3855(0x157)](this)||VisuMZ[_0x2c3855(0x35b)]['Game_Actor_getBattlePortraitFilename'][_0x2c3855(0x283)](this);;},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x31f)]=function(){const _0x2cf978=_0x5d7c39;this[_0x2cf978(0x330)]=[this[_0x2cf978(0x144)]()['id']];const _0x2a7ed7=VisuMZ[_0x2cf978(0x35b)][_0x2cf978(0x276)],_0x38146f=this[_0x2cf978(0x340)]()[_0x2cf978(0x2d4)],_0x45ec1e=_0x38146f[_0x2cf978(0x245)](_0x2a7ed7['ActorUnlockedClasses']);if(_0x45ec1e)for(const _0x22f02b of _0x45ec1e){if(!_0x22f02b)continue;_0x22f02b[_0x2cf978(0x245)](_0x2a7ed7[_0x2cf978(0x238)]);const _0x8952b4=String(RegExp['$1'])[_0x2cf978(0x11e)](',');for(let _0x528a27 of _0x8952b4){_0x528a27=(String(_0x528a27)||'')[_0x2cf978(0x37a)]();const _0x49993b=/^\d+$/['test'](_0x528a27);_0x49993b?this[_0x2cf978(0x330)]['push'](Number(_0x528a27)):this[_0x2cf978(0x330)]['push'](DataManager[_0x2cf978(0x197)](_0x528a27));}}},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x30b)]=function(){const _0x362df7=_0x5d7c39;if(this[_0x362df7(0x330)]===undefined)this['initClassChangeUnlocks']();return this[_0x362df7(0x330)];},Game_Actor['prototype'][_0x5d7c39(0x1d4)]=function(_0xb462ca){const _0x4f80a0=_0x5d7c39;if(this[_0x4f80a0(0x330)]===undefined)this[_0x4f80a0(0x31f)]();if(this[_0x4f80a0(0x330)]['includes'](_0xb462ca))return;this['_unlockedClasses'][_0x4f80a0(0x39a)](_0xb462ca),this[_0x4f80a0(0x330)]['remove'](0x0),this[_0x4f80a0(0x330)][_0x4f80a0(0x36e)](function(_0x18620f,_0x26cbf9){return _0x18620f-_0x26cbf9;});},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x2d1)]=function(_0x49342a){const _0x9c0421=_0x5d7c39;if(this[_0x9c0421(0x330)]===undefined)this[_0x9c0421(0x31f)]();if(!this[_0x9c0421(0x330)]['includes'](_0x49342a))return;this[_0x9c0421(0x330)][_0x9c0421(0x33f)](_0x49342a)['remove'](null),this[_0x9c0421(0x330)][_0x9c0421(0x36e)](function(_0x4220dc,_0x2fdf06){return _0x4220dc-_0x2fdf06;});},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x36a)]=function(_0x55830a){const _0x507b69=_0x5d7c39;this[_0x507b69(0x1d4)](_0x55830a);},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x34c)]=function(){const _0x2e86cc=_0x5d7c39;this[_0x2e86cc(0x2d7)]=VisuMZ[_0x2e86cc(0x35b)][_0x2e86cc(0x2de)][_0x2e86cc(0x20d)][_0x2e86cc(0x2a9)],this[_0x2e86cc(0x369)]=[this[_0x2e86cc(0x11d)]];const _0x583450=this[_0x2e86cc(0x340)]()[_0x2e86cc(0x2d4)],_0x47700a=VisuMZ[_0x2e86cc(0x35b)][_0x2e86cc(0x276)];_0x583450[_0x2e86cc(0x245)](_0x47700a[_0x2e86cc(0x2a9)])&&(this[_0x2e86cc(0x2d7)]=Number(RegExp['$1']));const _0x2e3575=_0x583450[_0x2e86cc(0x245)](_0x47700a['StartingClassTier']);if(_0x2e3575)for(const _0x4e6e3d of _0x2e3575){if(!_0x4e6e3d)continue;_0x4e6e3d['match'](_0x47700a['StartingClassTier']);const _0x24fe26=Number(RegExp['$1'])-0x1;if(_0x24fe26+0x1>this[_0x2e86cc(0x2d7)])continue;let _0x39815d=(String(RegExp['$2'])||'')['trim']();const _0x36b939=/^\d+$/[_0x2e86cc(0x31e)](_0x39815d);_0x36b939?this['_multiclasses'][_0x24fe26]=Number(_0x39815d):this[_0x2e86cc(0x369)][_0x24fe26]=DataManager['getClassIdWithName'](_0x39815d);}this[_0x2e86cc(0x15a)](),this[_0x2e86cc(0x2d7)]=this['_multiclassTiers'][_0x2e86cc(0x35d)](0x1,VisuMZ[_0x2e86cc(0x35b)][_0x2e86cc(0x2de)][_0x2e86cc(0x341)][_0x2e86cc(0x176)]||0x1);for(const _0xc5cae9 of this[_0x2e86cc(0x369)]){this[_0x2e86cc(0x1d4)](_0xc5cae9);}},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x2e3)]=function(){const _0x236c89=_0x5d7c39;if(this[_0x236c89(0x369)]===undefined)this[_0x236c89(0x34c)]();return this[_0x236c89(0x369)][0x0]=this[_0x236c89(0x11d)],this[_0x236c89(0x369)]['filter'](_0x23969e=>!!$dataClasses[_0x23969e])[_0x236c89(0x299)](_0x598711=>$dataClasses[_0x598711]);},Game_Actor['prototype'][_0x5d7c39(0x10a)]=function(){return this['getMulticlasses']();},Game_Actor[_0x5d7c39(0x30a)]['getMulticlassAtTier']=function(_0x3a3ac0){const _0x4fea7a=_0x5d7c39;if(this[_0x4fea7a(0x369)]===undefined)this[_0x4fea7a(0x34c)]();return _0x3a3ac0-=0x1,$dataClasses[this['_multiclasses'][_0x3a3ac0]]||null;},Game_Actor['prototype'][_0x5d7c39(0x117)]=function(_0xebb3ac){const _0x413ac5=_0x5d7c39;return this[_0x413ac5(0x17a)](_0xebb3ac);},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x1af)]=function(_0x3e0026){const _0x1d767f=this['getMulticlassAtTier'](_0x3e0026);return _0x1d767f?_0x1d767f['id']:0x0;},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x174)]=function(){const _0x440853=_0x5d7c39;if(this[_0x440853(0x2d7)]===undefined)this[_0x440853(0x34c)]();return this[_0x440853(0x2d7)]=this[_0x440853(0x2d7)]['clamp'](0x1,VisuMZ[_0x440853(0x35b)][_0x440853(0x2de)][_0x440853(0x341)]['length']||0x1),this[_0x440853(0x2d7)];},Game_Actor[_0x5d7c39(0x30a)]['setMulticlassTiers']=function(_0x5e7011){const _0x5b5eb8=_0x5d7c39;if(this['_multiclassTiers']===undefined)this['initMulticlass']();this[_0x5b5eb8(0x2d7)]=_0x5e7011[_0x5b5eb8(0x35d)](0x1,VisuMZ[_0x5b5eb8(0x35b)]['Settings'][_0x5b5eb8(0x341)]['length']||0x1);},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x111)]=function(_0x3a779f){const _0x211601=_0x5d7c39;_0x3a779f+=this[_0x211601(0x174)](),this[_0x211601(0x10b)](_0x3a779f);},Game_Actor['prototype'][_0x5d7c39(0x33c)]=function(_0x32af8a){const _0x27e0c8=_0x5d7c39;_0x32af8a=this[_0x27e0c8(0x174)]()-_0x32af8a,this['setMulticlassTiers'](_0x32af8a);},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x15a)]=function(){const _0x5e871c=_0x5d7c39;if(this[_0x5e871c(0x369)]===undefined)this[_0x5e871c(0x34c)]();let _0x4bced9=![];const _0x4e699a=this[_0x5e871c(0x174)]();while(this[_0x5e871c(0x369)]['length']>_0x4e699a){_0x4bced9=!![],this[_0x5e871c(0x369)][_0x5e871c(0x14e)]();}this[_0x5e871c(0x369)][0x0]=this[_0x5e871c(0x144)]()['id'];const _0x25ce27=this[_0x5e871c(0x369)]['length'];for(let _0x1dc800=0x1;_0x1dc800<_0x25ce27;_0x1dc800++){this[_0x5e871c(0x369)][_0x1dc800]===this[_0x5e871c(0x144)]()['id']&&(this[_0x5e871c(0x369)][_0x1dc800]=0x0,_0x4bced9=!![]);}if(_0x4bced9)this[_0x5e871c(0x21b)]();},VisuMZ['ClassChangeSystem'][_0x5d7c39(0x23f)]=Game_BattlerBase['prototype'][_0x5d7c39(0x2b2)],Game_BattlerBase['prototype'][_0x5d7c39(0x2b2)]=function(_0x39d9ae){const _0x464d69=_0x5d7c39;if(this[_0x464d69(0x32c)]())this[_0x464d69(0x319)]=_0x464d69(0x1e9);let _0x139525=VisuMZ[_0x464d69(0x35b)]['Game_BattlerBase_elementRate'][_0x464d69(0x283)](this,_0x39d9ae);if(this[_0x464d69(0x32c)]())this[_0x464d69(0x319)]=undefined;return _0x139525;},VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x20e)]=Game_BattlerBase[_0x5d7c39(0x30a)][_0x5d7c39(0x360)],Game_BattlerBase[_0x5d7c39(0x30a)][_0x5d7c39(0x360)]=function(_0x2824e4){const _0x3274c3=_0x5d7c39;if(this['isActor']())this[_0x3274c3(0x319)]=_0x3274c3(0xf9);let _0x15be22=VisuMZ[_0x3274c3(0x35b)][_0x3274c3(0x20e)][_0x3274c3(0x283)](this,_0x2824e4);if(this[_0x3274c3(0x32c)]())this[_0x3274c3(0x319)]=undefined;return _0x15be22;},VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x175)]=Game_BattlerBase['prototype'][_0x5d7c39(0x146)],Game_BattlerBase[_0x5d7c39(0x30a)][_0x5d7c39(0x146)]=function(_0x131ec5){const _0x5e9055=_0x5d7c39;if(this[_0x5e9055(0x32c)]())this[_0x5e9055(0x319)]=_0x5e9055(0x29f);let _0x14e4cd=VisuMZ[_0x5e9055(0x35b)]['Game_BattlerBase_stateRate'][_0x5e9055(0x283)](this,_0x131ec5);if(this['isActor']())this[_0x5e9055(0x319)]=undefined;return _0x14e4cd;},VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x350)]=Game_BattlerBase[_0x5d7c39(0x30a)]['stateResistSet'],Game_BattlerBase[_0x5d7c39(0x30a)][_0x5d7c39(0x2cf)]=function(){const _0x20c767=_0x5d7c39;if(this[_0x20c767(0x32c)]())this[_0x20c767(0x319)]=_0x20c767(0x284);let _0x2beedc=VisuMZ[_0x20c767(0x35b)][_0x20c767(0x350)]['call'](this);if(this[_0x20c767(0x32c)]())this[_0x20c767(0x319)]=undefined;return _0x2beedc;},VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x326)]=Game_BattlerBase[_0x5d7c39(0x30a)][_0x5d7c39(0x293)],Game_BattlerBase['prototype']['paramRate']=function(_0x2e371a){const _0x43f798=_0x5d7c39;if(this['isActor']())this[_0x43f798(0x319)]='ParamRates';let _0x476a40=VisuMZ[_0x43f798(0x35b)][_0x43f798(0x326)][_0x43f798(0x283)](this,_0x2e371a);if(this[_0x43f798(0x32c)]())this[_0x43f798(0x319)]=undefined;return _0x476a40;},VisuMZ['ClassChangeSystem']['Game_BattlerBase_xparam']=Game_BattlerBase['prototype'][_0x5d7c39(0x279)],Game_BattlerBase['prototype'][_0x5d7c39(0x279)]=function(_0x5f0d91){const _0x852554=_0x5d7c39;if(this[_0x852554(0x32c)]())this['_multiclassCheck']=_0x852554(0x12d);let _0x51fd87=VisuMZ[_0x852554(0x35b)]['Game_BattlerBase_xparam'][_0x852554(0x283)](this,_0x5f0d91);if(this[_0x852554(0x32c)]())this[_0x852554(0x319)]=undefined;return _0x51fd87;},VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x13a)]=Game_BattlerBase['prototype'][_0x5d7c39(0x1e1)],Game_BattlerBase[_0x5d7c39(0x30a)][_0x5d7c39(0x1e1)]=function(_0x467c00){const _0x39c043=_0x5d7c39;if(this[_0x39c043(0x32c)]())this[_0x39c043(0x319)]='SParamRates';let _0x23cb6b=VisuMZ['ClassChangeSystem'][_0x39c043(0x13a)][_0x39c043(0x283)](this,_0x467c00);if(this['isActor']())this[_0x39c043(0x319)]=undefined;return _0x23cb6b;},VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x1ec)]=Game_BattlerBase['prototype'][_0x5d7c39(0x390)],Game_BattlerBase[_0x5d7c39(0x30a)][_0x5d7c39(0x390)]=function(){const _0x28a5c1=_0x5d7c39;if(this[_0x28a5c1(0x32c)]())this[_0x28a5c1(0x319)]='AttackElements';let _0x30e09a=VisuMZ[_0x28a5c1(0x35b)][_0x28a5c1(0x1ec)][_0x28a5c1(0x283)](this);if(this['isActor']())this[_0x28a5c1(0x319)]=undefined;return _0x30e09a;},VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x149)]=Game_BattlerBase[_0x5d7c39(0x30a)][_0x5d7c39(0x29c)],Game_BattlerBase[_0x5d7c39(0x30a)][_0x5d7c39(0x29c)]=function(){const _0x75da48=_0x5d7c39;if(this[_0x75da48(0x32c)]())this[_0x75da48(0x319)]=_0x75da48(0x363);let _0x341ca9=VisuMZ[_0x75da48(0x35b)][_0x75da48(0x149)][_0x75da48(0x283)](this);if(this[_0x75da48(0x32c)]())this[_0x75da48(0x319)]=undefined;return _0x341ca9;},VisuMZ[_0x5d7c39(0x35b)]['Game_BattlerBase_attackStatesRate']=Game_BattlerBase[_0x5d7c39(0x30a)][_0x5d7c39(0x264)],Game_BattlerBase[_0x5d7c39(0x30a)][_0x5d7c39(0x264)]=function(_0x1f83e3){const _0x35e3e4=_0x5d7c39;if(this['isActor']())this[_0x35e3e4(0x319)]=_0x35e3e4(0x363);let _0x461ac7=VisuMZ[_0x35e3e4(0x35b)]['Game_BattlerBase_attackStatesRate']['call'](this,_0x1f83e3);if(this[_0x35e3e4(0x32c)]())this[_0x35e3e4(0x319)]=undefined;return _0x461ac7;},VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x135)]=Game_BattlerBase[_0x5d7c39(0x30a)][_0x5d7c39(0x1fb)],Game_BattlerBase[_0x5d7c39(0x30a)]['addedSkillTypes']=function(){const _0x7cc6d1=_0x5d7c39;if(this[_0x7cc6d1(0x32c)]())this[_0x7cc6d1(0x319)]=_0x7cc6d1(0x34d);let _0x2cfd8b=VisuMZ[_0x7cc6d1(0x35b)][_0x7cc6d1(0x135)][_0x7cc6d1(0x283)](this);if(this['isActor']())this[_0x7cc6d1(0x319)]=undefined;return _0x2cfd8b;},VisuMZ[_0x5d7c39(0x35b)]['Game_BattlerBase_addedSkills']=Game_BattlerBase[_0x5d7c39(0x30a)][_0x5d7c39(0x2f3)],Game_BattlerBase[_0x5d7c39(0x30a)][_0x5d7c39(0x2f3)]=function(){const _0xe255c7=_0x5d7c39;if(this[_0xe255c7(0x32c)]())this[_0xe255c7(0x319)]=_0xe255c7(0x374);let _0x9bf701=VisuMZ[_0xe255c7(0x35b)]['Game_BattlerBase_addedSkills']['call'](this);if(this[_0xe255c7(0x32c)]())this[_0xe255c7(0x319)]=undefined;return _0x9bf701;},VisuMZ['ClassChangeSystem']['Game_BattlerBase_isEquipWtypeOk']=Game_BattlerBase[_0x5d7c39(0x30a)]['isEquipWtypeOk'],Game_BattlerBase[_0x5d7c39(0x30a)][_0x5d7c39(0x16b)]=function(_0x44ae19){const _0xfeabfd=_0x5d7c39;if(this['isActor']())this[_0xfeabfd(0x319)]=_0xfeabfd(0x2b3);let _0x472dfd=VisuMZ[_0xfeabfd(0x35b)][_0xfeabfd(0x28b)]['call'](this,_0x44ae19);if(this[_0xfeabfd(0x32c)]())this[_0xfeabfd(0x319)]=undefined;return _0x472dfd;},VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x143)]=Game_BattlerBase[_0x5d7c39(0x30a)][_0x5d7c39(0x178)],Game_BattlerBase['prototype'][_0x5d7c39(0x178)]=function(_0x7e9493){const _0x514c0d=_0x5d7c39;if(this['isActor']())this['_multiclassCheck']='EquipArmors';let _0x2498d8=VisuMZ[_0x514c0d(0x35b)][_0x514c0d(0x143)][_0x514c0d(0x283)](this,_0x7e9493);if(this[_0x514c0d(0x32c)]())this['_multiclassCheck']=undefined;return _0x2498d8;},VisuMZ['ClassChangeSystem'][_0x5d7c39(0x100)]=Game_Actor[_0x5d7c39(0x30a)]['traitObjects'],Game_Actor[_0x5d7c39(0x30a)]['traitObjects']=function(){const _0x433c25=_0x5d7c39;let _0x489b10=VisuMZ[_0x433c25(0x35b)]['Game_Actor_traitObjects'][_0x433c25(0x283)](this);return this['_multiclassCheck']&&(_0x489b10=this[_0x433c25(0x2e9)](_0x489b10)),_0x489b10;},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x2e9)]=function(_0x2e0b19){const _0x25e4c3=_0x5d7c39;if(this[_0x25e4c3(0x369)]===undefined)this[_0x25e4c3(0x34c)]();const _0x49f2f4=this[_0x25e4c3(0x319)];let _0x4a9cd3=_0x2e0b19[_0x25e4c3(0x2c7)](this[_0x25e4c3(0x144)]());const _0x1c5601=VisuMZ[_0x25e4c3(0x35b)]['Settings']['Multiclass'],_0x4d1ac7=_0x1c5601['length'];for(let _0x15255e=0x1;_0x15255e<_0x4d1ac7;_0x15255e++){let _0x30bb7e=$dataClasses[this[_0x25e4c3(0x369)][_0x15255e]||0x0];if(!_0x30bb7e)continue;if(_0x30bb7e===this['currentClass']())continue;const _0x4a9b18=_0x1c5601[_0x15255e];if(!_0x4a9b18)continue;_0x4a9b18[this[_0x25e4c3(0x319)]]&&_0x2e0b19[_0x25e4c3(0x333)](++_0x4a9cd3,0x0,_0x30bb7e);}return _0x2e0b19;},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x291)]=function(_0x45f179,_0x123f5b){const _0x3f92e5=_0x5d7c39;if(_0x45f179<=0x0)return;if(!_0x123f5b)return;if(!$dataSystem[_0x3f92e5(0x165)]&&!this[_0x3f92e5(0x217)]())return;this[_0x3f92e5(0x2e3)]();const _0x274b40=VisuMZ['ClassChangeSystem'][_0x3f92e5(0x2de)]['Multiclass'],_0x1dffa3=_0x274b40[_0x3f92e5(0x176)];for(let _0x8d57a=0x1;_0x8d57a<_0x1dffa3;_0x8d57a++){let _0x1801cb=$dataClasses[this[_0x3f92e5(0x369)][_0x8d57a]||0x0];if(!_0x1801cb)continue;if(_0x1801cb===this[_0x3f92e5(0x144)]())continue;const _0x1e0047=_0x274b40[_0x8d57a];if(!_0x1e0047)continue;if(this[_0x3f92e5(0x2af)[_0x3f92e5(0x233)](_0x123f5b)]){const _0x11149b=_0x1e0047['resourceRate'],_0x12b0f1=_0x11149b*_0x45f179;this['gain%1Points'[_0x3f92e5(0x233)](_0x123f5b)](_0x12b0f1,this[_0x3f92e5(0x369)][_0x8d57a]);}}},Game_Actor[_0x5d7c39(0x30a)]['gainMulticlassExp']=function(_0x128df5){const _0x44b8fb=_0x5d7c39;if(!_0x128df5)return;if(this[_0x44b8fb(0x182)]())return;this[_0x44b8fb(0x2e3)]();const _0x44a60d=VisuMZ[_0x44b8fb(0x35b)][_0x44b8fb(0x2de)][_0x44b8fb(0x341)],_0x158941=_0x44a60d[_0x44b8fb(0x176)];for(let _0x5d03df=0x1;_0x5d03df<_0x158941;_0x5d03df++){let _0x502f90=$dataClasses[this[_0x44b8fb(0x369)][_0x5d03df]||0x0];if(!_0x502f90)continue;if(_0x502f90===this[_0x44b8fb(0x144)]())continue;const _0x5cf094=_0x44a60d[_0x5d03df];if(!_0x5cf094)continue;const _0x2f476e=_0x5cf094[_0x44b8fb(0x1d6)],_0x346152=Math[_0x44b8fb(0x23c)](_0x128df5*_0x2f476e*this['finalExpRate']()),_0xf36cd2=this['_multiclasses'][_0x5d03df];this[_0x44b8fb(0x34f)][_0xf36cd2]=this[_0x44b8fb(0x34f)][_0xf36cd2]||0x0;const _0x2ee502=this[_0x44b8fb(0x34f)][_0xf36cd2]+_0x346152;this[_0x44b8fb(0x1e6)](_0x2ee502,_0xf36cd2);}},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x1fc)]=function(_0x4804bd,_0x4922e0){const _0x42f842=_0x5d7c39;if(this[_0x42f842(0x369)]===undefined)this[_0x42f842(0x34c)]();_0x4922e0-=0x1;if(_0x4804bd<=0x0&&_0x4922e0<=0x0)return;this[_0x42f842(0x1d4)](_0x4804bd);const _0x279cfb=this[_0x42f842(0x369)][_0x42f842(0x176)];for(let _0x34dbd5=0x0;_0x34dbd5<_0x279cfb;_0x34dbd5++){this[_0x42f842(0x369)][_0x34dbd5]===_0x4804bd&&(this[_0x42f842(0x369)][_0x34dbd5]=0x0);}this[_0x42f842(0x369)][0x0]=this['currentClass']()['id'];if(_0x4922e0<=0x0){this[_0x42f842(0x23b)](_0x4804bd);return;}const _0x8ce85b=JsonEx[_0x42f842(0x399)](this);_0x8ce85b['_tempActor']=!![],this[_0x42f842(0x369)][_0x4922e0]=_0x4804bd,this[_0x42f842(0x15a)](),this[_0x42f842(0x21b)](),this[_0x42f842(0x2a0)](_0x8ce85b),this[_0x42f842(0x15a)]();},Game_Actor['prototype'][_0x5d7c39(0x17b)]=function(_0x70c6bd){const _0x33957a=_0x5d7c39;if(this['_multiclasses']===undefined)this[_0x33957a(0x34c)]();return this[_0x33957a(0x369)][0x0]=this[_0x33957a(0x144)]()['id'],this[_0x33957a(0x369)][_0x33957a(0x2c7)](_0x70c6bd)+0x1;},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x317)]=function(){const _0x3da079=_0x5d7c39;this[_0x3da079(0x1bb)]={},this[_0x3da079(0x1bb)][this[_0x3da079(0x144)]()['id']]=this['level'];},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x182)]=function(){const _0x2a8bbb=_0x5d7c39;return VisuMZ['ClassChangeSystem'][_0x2a8bbb(0x2de)][_0x2a8bbb(0x20d)][_0x2a8bbb(0x1ea)];},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x243)]=function(_0x461510){const _0x1ebe42=_0x5d7c39;if(this['maintainLevels']())return this[_0x1ebe42(0x1f8)];return this['updateClassLevel'](_0x461510),this[_0x1ebe42(0x1bb)][_0x461510];},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x1e6)]=function(_0x4c6a40,_0x2983ba){const _0x4c64d0=_0x5d7c39;if(this['maintainLevels']())return this[_0x4c64d0(0x27b)](_0x4c6a40);this[_0x4c64d0(0x34f)][_0x2983ba]=Math[_0x4c64d0(0x2c1)](_0x4c6a40,0x0),this['updateClassLevel'](_0x2983ba);if(_0x2983ba===this['currentClass']()['id'])this[_0x4c64d0(0x21b)]();},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x271)]=function(_0x5c8b94){const _0x350ad2=_0x5d7c39;if(this[_0x350ad2(0x182)]())return;this[_0x350ad2(0x34f)][_0x5c8b94]=this[_0x350ad2(0x34f)][_0x5c8b94]||0x0,this[_0x350ad2(0x1bb)]=this['_classLevel']||{},this['_classLevel'][_0x5c8b94]=this[_0x350ad2(0x1bb)][_0x5c8b94]||0x1;while(!(this[_0x350ad2(0x1bb)][_0x5c8b94]>=this[_0x350ad2(0x1a9)]())&&this[_0x350ad2(0x34f)][_0x5c8b94]>=this[_0x350ad2(0x300)](_0x5c8b94,this[_0x350ad2(0x1bb)][_0x5c8b94])){this[_0x350ad2(0x1bb)][_0x5c8b94]+=0x1,this[_0x350ad2(0x28f)](_0x5c8b94);}while(this['_exp'][_0x5c8b94]<this['currentClassLevelExp'](_0x5c8b94,this[_0x350ad2(0x1bb)][_0x5c8b94])){this['_classLevel'][_0x5c8b94]-=0x1;}this[_0x350ad2(0x2dd)]();},Game_Actor[_0x5d7c39(0x30a)]['expForClassLevel']=function(_0x4bd0f8,_0x13ed8e){const _0x26d3fd=_0x5d7c39,_0x47e9bf=$dataClasses[_0x4bd0f8],_0xb22cc0=_0x47e9bf['expParams'][0x0],_0x2f927a=_0x47e9bf[_0x26d3fd(0x28e)][0x1],_0x5e70ae=_0x47e9bf['expParams'][0x2],_0x5786f9=_0x47e9bf[_0x26d3fd(0x28e)][0x3];return Math[_0x26d3fd(0x23c)](_0xb22cc0*Math['pow'](_0x13ed8e-0x1,0.9+_0x5e70ae/0xfa)*_0x13ed8e*(_0x13ed8e+0x1)/(0x6+Math[_0x26d3fd(0x2e7)](_0x13ed8e,0x2)/0x32/_0x5786f9)+(_0x13ed8e-0x1)*_0x2f927a);},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x300)]=function(_0x4c63e5,_0x5a669e){const _0x54344f=_0x5d7c39;return this[_0x54344f(0x163)](_0x4c63e5,_0x5a669e+0x1);},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x389)]=function(_0x313c63,_0x522648){const _0x1361d8=_0x5d7c39;return this[_0x1361d8(0x163)](_0x313c63,_0x522648);},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x28f)]=function(_0x208f71){const _0x4a97f9=_0x5d7c39;this[_0x4a97f9(0x1b2)](_0x208f71),this[_0x4a97f9(0x2a8)](_0x208f71),Imported[_0x4a97f9(0x195)]&&(this[_0x4a97f9(0x377)](_0x208f71),this[_0x4a97f9(0x107)](_0x208f71));},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x2dd)]=function(){const _0x4d924b=_0x5d7c39;if(this[_0x4d924b(0x393)])return;this[_0x4d924b(0x393)]=!![];const _0x5e46ef=DataManager['getActorUnlockedClasses'](this);for(const _0xd01c48 of _0x5e46ef){if(!_0xd01c48)continue;const _0x3d8e5e=_0xd01c48[_0x4d924b(0x32d)];if(!_0x3d8e5e)continue;for(const _0x5a8367 of _0x3d8e5e){if(this[_0x4d924b(0x38b)](_0x5a8367['skillId']))continue;if(this[_0x4d924b(0x243)](_0xd01c48['id'])>=_0x5a8367['level']){const _0x1dcd2f=this[_0x4d924b(0x1ed)]||{};this[_0x4d924b(0x142)](_0x5a8367[_0x4d924b(0x307)]),this[_0x4d924b(0x1ed)]=_0x1dcd2f;}}}this[_0x4d924b(0x393)]=![];},VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x348)]=Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x2be)],Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x2be)]=function(_0x1d5fc7){const _0x32f895=_0x5d7c39;let _0x4cebee=VisuMZ['ClassChangeSystem'][_0x32f895(0x348)][_0x32f895(0x283)](this,_0x1d5fc7);this[_0x32f895(0x2e3)]();const _0xe26154=VisuMZ['ClassChangeSystem'][_0x32f895(0x2de)]['Multiclass'],_0x42f8b8='paramRate%1'[_0x32f895(0x233)](_0x1d5fc7),_0x1477ab=_0xe26154['length'];for(let _0x3e4ccd=0x1;_0x3e4ccd<_0x1477ab;_0x3e4ccd++){let _0x523521=$dataClasses[this[_0x32f895(0x369)][_0x3e4ccd]||0x0];if(!_0x523521)continue;if(_0x523521===this['currentClass']())continue;const _0x51b271=_0xe26154[_0x3e4ccd];if(!_0x51b271)continue;const _0x110297=_0x51b271[_0x42f8b8];_0x4cebee+=_0x110297*this['paramBaseForClass'](this[_0x32f895(0x369)][_0x3e4ccd],_0x1d5fc7);}return _0x4cebee;},Game_Actor[_0x5d7c39(0x30a)]['paramBaseForClass']=function(_0x3b6df1,_0x332707){const _0x215023=_0x5d7c39,_0x3ceaff=$dataClasses[_0x3b6df1],_0x23143a=this[_0x215023(0x243)](_0x3b6df1);if(_0x23143a>0x63){const _0xe5b81e=_0x3ceaff['params'][_0x332707][0x63],_0xcd5ee6=_0x3ceaff[_0x215023(0x1d3)][_0x332707][0x62];return _0xe5b81e+(_0xe5b81e-_0xcd5ee6)*(_0x23143a-0x63);}else return _0x3ceaff[_0x215023(0x1d3)][_0x332707][_0x23143a];},Game_Actor['prototype'][_0x5d7c39(0x361)]=function(_0x3828af){const _0x159c39=_0x5d7c39;if(this[_0x159c39(0x1bb)][_0x3828af]>=this[_0x159c39(0x1a9)]())return 0x1;const _0x225be4=this['classLevel'](_0x3828af),_0x30e2c5=this[_0x159c39(0x300)](_0x3828af,_0x225be4)-this[_0x159c39(0x389)](_0x3828af,_0x225be4);this[_0x159c39(0x34f)][_0x3828af]=this[_0x159c39(0x34f)][_0x3828af]||0x0;const _0x3c40f8=this['_exp'][_0x3828af]-this[_0x159c39(0x389)](_0x3828af,_0x225be4);return(_0x3c40f8/_0x30e2c5)[_0x159c39(0x35d)](0x0,0x1);},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x2a6)]=function(){const _0x5220ba=_0x5d7c39;for(;;){const _0x1d7970=DataManager[_0x5220ba(0x33a)](this);if(_0x1d7970[_0x5220ba(0x176)]>0x0)for(const _0x54efd2 of _0x1d7970){this[_0x5220ba(0x1d4)](_0x54efd2);}else break;}},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x2bb)]=function(){const _0x30d36e=_0x5d7c39;let _0x3a80aa=[];const _0x2f9e87=VisuMZ[_0x30d36e(0x35b)][_0x30d36e(0x276)],_0x236b3a=this[_0x30d36e(0x340)]()[_0x30d36e(0x2d4)],_0x52accc=_0x236b3a['match'](_0x2f9e87[_0x30d36e(0x2b6)]);if(_0x52accc)for(const _0xf12d45 of _0x52accc){if(!_0xf12d45)continue;_0xf12d45[_0x30d36e(0x245)](_0x2f9e87['RestrictClassChangeTier']);const _0x319938=String(RegExp['$1'])[_0x30d36e(0x11e)](',')[_0x30d36e(0x299)](_0x40d5f6=>Number(_0x40d5f6));_0x3a80aa=_0x3a80aa[_0x30d36e(0x134)](_0x319938);}_0x3a80aa=_0x3a80aa[_0x30d36e(0x1b5)]((_0x3948ee,_0x4105df,_0xeb8c74)=>_0xeb8c74[_0x30d36e(0x2c7)](_0x3948ee)===_0x4105df),_0x3a80aa['remove'](null)[_0x30d36e(0x33f)](undefined),_0x3a80aa[_0x30d36e(0x36e)]((_0x3cab56,_0x1c5e97)=>_0x3cab56-_0x1c5e97),this[_0x30d36e(0x11a)]=_0x3a80aa;},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x255)]=function(_0x4d9527){const _0x39c2ad=_0x5d7c39;return this[_0x39c2ad(0x11a)]===undefined&&this[_0x39c2ad(0x2bb)](),this[_0x39c2ad(0x11a)][_0x39c2ad(0x2d5)](_0x4d9527);},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x179)]=function(_0x1436ef){const _0xc30cf7=_0x5d7c39;this[_0xc30cf7(0x11a)]===undefined&&this[_0xc30cf7(0x2bb)]();if(this[_0xc30cf7(0x11a)][_0xc30cf7(0x2d5)](_0x1436ef))return;this[_0xc30cf7(0x11a)][_0xc30cf7(0x39a)](_0x1436ef),this[_0xc30cf7(0x11a)]['sort']((_0x317ed8,_0x4b8a1d)=>_0x317ed8-_0x4b8a1d);},Game_Actor[_0x5d7c39(0x30a)][_0x5d7c39(0x10f)]=function(_0x3caa22){const _0x20473e=_0x5d7c39;this[_0x20473e(0x11a)]===undefined&&this[_0x20473e(0x2bb)]();if(!this[_0x20473e(0x11a)][_0x20473e(0x2d5)](_0x3caa22))return;this[_0x20473e(0x11a)][_0x20473e(0x33f)](_0x3caa22),this[_0x20473e(0x11a)][_0x20473e(0x36e)]((_0x4b2eb8,_0x8c1fae)=>_0x4b2eb8-_0x8c1fae);},Game_Enemy[_0x5d7c39(0x30a)][_0x5d7c39(0x251)]=function(){const _0x166692=_0x5d7c39,_0x4378ca=VisuMZ[_0x166692(0x35b)][_0x166692(0x2de)]['ClassPoints'],_0x3813d1=VisuMZ[_0x166692(0x35b)][_0x166692(0x276)],_0x42a8f6=this[_0x166692(0x1e8)]()[_0x166692(0x2d4)];if(_0x42a8f6[_0x166692(0x245)](_0x3813d1[_0x166692(0x10c)]))try{return eval(RegExp['$1']);}catch(_0xd9b7ab){if($gameTemp['isPlaytest']())console[_0x166692(0x2d6)](_0xd9b7ab);return 0x0;}try{return eval(_0x4378ca['PerEnemy']);}catch(_0x3cd148){if($gameTemp[_0x166692(0x308)]())console[_0x166692(0x2d6)](_0x3cd148);return 0x0;}},Game_Enemy[_0x5d7c39(0x30a)][_0x5d7c39(0x297)]=function(){const _0x10be78=_0x5d7c39,_0x4d05b9=VisuMZ[_0x10be78(0x35b)]['Settings'][_0x10be78(0x1cf)],_0x54d0e3=VisuMZ[_0x10be78(0x35b)][_0x10be78(0x276)],_0x2b32ee=this[_0x10be78(0x1e8)]()[_0x10be78(0x2d4)];if(_0x2b32ee[_0x10be78(0x245)](_0x54d0e3['EnemyJobPoints']))try{return eval(RegExp['$1']);}catch(_0xb30fc4){if($gameTemp[_0x10be78(0x308)]())console[_0x10be78(0x2d6)](_0xb30fc4);return 0x0;}try{return eval(_0x4d05b9[_0x10be78(0x1f3)]);}catch(_0x6e94b2){if($gameTemp[_0x10be78(0x308)]())console[_0x10be78(0x2d6)](_0x6e94b2);return 0x0;}},VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x21e)]=Game_Party['prototype']['initialize'],Game_Party[_0x5d7c39(0x30a)][_0x5d7c39(0x23d)]=function(){const _0x4c9b75=_0x5d7c39;VisuMZ['ClassChangeSystem'][_0x4c9b75(0x21e)][_0x4c9b75(0x283)](this),this[_0x4c9b75(0x31f)]();},Game_Party[_0x5d7c39(0x30a)][_0x5d7c39(0x31f)]=function(){const _0x2e5b2b=_0x5d7c39;this[_0x2e5b2b(0x330)]=[];},Game_Party['prototype'][_0x5d7c39(0x30b)]=function(){const _0x39d7fa=_0x5d7c39;if(this[_0x39d7fa(0x330)]===undefined)this[_0x39d7fa(0x31f)]();return this[_0x39d7fa(0x330)];},Game_Party[_0x5d7c39(0x30a)][_0x5d7c39(0x1d4)]=function(_0x618c50){const _0xce7c35=_0x5d7c39;for(const _0x50b6fd of this[_0xce7c35(0x2fb)]()){if(!_0x50b6fd)continue;_0x50b6fd['unlockClass'](_0x618c50);}if(this['_unlockedClasses']===undefined)this['initClassChangeUnlocks']();if(this['_unlockedClasses'][_0xce7c35(0x2d5)](_0x618c50))return;this['_unlockedClasses'][_0xce7c35(0x39a)](_0x618c50),this[_0xce7c35(0x330)]['sort'](function(_0x4144a6,_0xe36906){return _0x4144a6-_0xe36906;});},Game_Party['prototype']['removeUnlockedClass']=function(_0x1a715e){const _0x1a19af=_0x5d7c39;for(const _0x18a487 of this['allMembers']()){if(!_0x18a487)continue;_0x18a487[_0x1a19af(0x2d1)](_0x1a715e);}if(this[_0x1a19af(0x330)]===undefined)this[_0x1a19af(0x31f)]();if(!this[_0x1a19af(0x330)][_0x1a19af(0x2d5)](_0x1a715e))return;this['_unlockedClasses'][_0x1a19af(0x33f)](_0x1a715e)[_0x1a19af(0x33f)](null),this[_0x1a19af(0x330)][_0x1a19af(0x36e)](function(_0x29a646,_0x743245){return _0x29a646-_0x743245;});},Game_Party[_0x5d7c39(0x30a)][_0x5d7c39(0x2bd)]=function(){const _0x54ded7=_0x5d7c39,_0x1ba1b7=this[_0x54ded7(0x2fb)]();return Math[_0x54ded7(0x2c1)](...this[_0x54ded7(0x15b)]()[_0x54ded7(0x299)](_0x526d72=>_0x526d72[_0x54ded7(0x174)]()));},Game_Troop[_0x5d7c39(0x30a)][_0x5d7c39(0x2d2)]=function(){const _0x43cebc=_0x5d7c39;return this['deadMembers']()[_0x43cebc(0x17d)]((_0x32a271,_0x5a10ab)=>_0x32a271+_0x5a10ab[_0x43cebc(0x251)](),0x0);},Game_Troop[_0x5d7c39(0x30a)][_0x5d7c39(0x1a6)]=function(){const _0x15bdb1=_0x5d7c39;return this[_0x15bdb1(0x372)]()[_0x15bdb1(0x17d)]((_0xe26359,_0x3828db)=>_0xe26359+_0x3828db[_0x15bdb1(0x297)](),0x0);},VisuMZ['ClassChangeSystem']['Scene_Menu_createCommandWindow']=Scene_Menu[_0x5d7c39(0x30a)][_0x5d7c39(0x321)],Scene_Menu[_0x5d7c39(0x30a)][_0x5d7c39(0x321)]=function(){const _0x295d51=_0x5d7c39;VisuMZ[_0x295d51(0x35b)][_0x295d51(0x310)]['call'](this);const _0x449ec1=this[_0x295d51(0x128)];_0x449ec1[_0x295d51(0x1e0)](_0x295d51(0x35b),this[_0x295d51(0x26c)]['bind'](this));},VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x2c3)]=Scene_Menu[_0x5d7c39(0x30a)]['onPersonalOk'],Scene_Menu[_0x5d7c39(0x30a)][_0x5d7c39(0x1cd)]=function(){const _0x453166=_0x5d7c39;this[_0x453166(0x128)]['currentSymbol']()==='ClassChangeSystem'?SceneManager[_0x453166(0x39a)](Scene_ClassChange):VisuMZ[_0x453166(0x35b)][_0x453166(0x2c3)][_0x453166(0x283)](this);};function Scene_ClassChange(){const _0x4d21b4=_0x5d7c39;this[_0x4d21b4(0x23d)](...arguments);}Scene_ClassChange['prototype']=Object['create'](Scene_MenuBase[_0x5d7c39(0x30a)]),Scene_ClassChange[_0x5d7c39(0x30a)][_0x5d7c39(0x1ef)]=Scene_ClassChange,Scene_ClassChange[_0x5d7c39(0x30a)]['initialize']=function(){const _0x2f5976=_0x5d7c39;Scene_MenuBase[_0x2f5976(0x30a)]['initialize']['call'](this),this[_0x2f5976(0x108)]=this[_0x2f5976(0x108)]||[];},Scene_ClassChange[_0x5d7c39(0x30a)]['needsPageButtons']=function(){return!![];},Scene_ClassChange[_0x5d7c39(0x30a)][_0x5d7c39(0x396)]=function(){const _0x181d07=_0x5d7c39;return this[_0x181d07(0x27f)]()>0x1?this[_0x181d07(0x2e2)]&&this[_0x181d07(0x2e2)][_0x181d07(0x2f8)]:this[_0x181d07(0x1c4)]&&this[_0x181d07(0x1c4)][_0x181d07(0x2f8)];},Scene_ClassChange['prototype'][_0x5d7c39(0x1c7)]=function(){const _0x141c90=_0x5d7c39;Scene_MenuBase[_0x141c90(0x30a)][_0x141c90(0x1c7)][_0x141c90(0x283)](this),this[_0x141c90(0x153)]();},Scene_ClassChange[_0x5d7c39(0x30a)]['isRecommendedLayout']=function(){return!![];},Scene_ClassChange['prototype'][_0x5d7c39(0x28a)]=function(){const _0x402b36=_0x5d7c39;if(ConfigManager[_0x402b36(0x357)]&&ConfigManager[_0x402b36(0xfb)]!==undefined)return ConfigManager[_0x402b36(0xfb)];else{if(this[_0x402b36(0x137)]())return this[_0x402b36(0x266)]()[_0x402b36(0x245)](/LOWER/i);else Scene_MenuBase['prototype'][_0x402b36(0x329)][_0x402b36(0x283)](this);}},Scene_ClassChange[_0x5d7c39(0x30a)][_0x5d7c39(0x329)]=function(){const _0x576027=_0x5d7c39;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x576027(0x1bf)]!==undefined)return ConfigManager[_0x576027(0x1bf)];else{if(this[_0x576027(0x137)]())return this[_0x576027(0x266)]()[_0x576027(0x245)](/RIGHT/i);else Scene_MenuBase[_0x576027(0x30a)]['isRightInputMode'][_0x576027(0x283)](this);}},Scene_ClassChange[_0x5d7c39(0x30a)]['updatedLayoutStyle']=function(){const _0x1a47b9=_0x5d7c39;return VisuMZ['ClassChangeSystem']['Settings'][_0x1a47b9(0x1a4)]['LayoutStyle'];},Scene_ClassChange[_0x5d7c39(0x30a)][_0x5d7c39(0x137)]=function(){const _0x574647=_0x5d7c39;return VisuMZ[_0x574647(0x35b)][_0x574647(0x2de)]['Window']['EnableLayout'];},Scene_ClassChange['prototype'][_0x5d7c39(0x2a4)]=function(){const _0x57ba02=_0x5d7c39;Scene_MenuBase[_0x57ba02(0x30a)][_0x57ba02(0x2a4)][_0x57ba02(0x283)](this),this[_0x57ba02(0x305)](),this['createStatusWindow'](),this[_0x57ba02(0x35f)](),this[_0x57ba02(0x152)](),this[_0x57ba02(0x206)](),this[_0x57ba02(0x309)]();},Scene_ClassChange[_0x5d7c39(0x30a)][_0x5d7c39(0x38e)]=function(){const _0x84d42b=_0x5d7c39,_0xd63ba5=this[_0x84d42b(0x287)]();this['_statusWindow']=new Window_ClassStatus(_0xd63ba5),this[_0x84d42b(0x2e0)](this[_0x84d42b(0x235)]),this[_0x84d42b(0x235)][_0x84d42b(0x121)](VisuMZ[_0x84d42b(0x35b)]['Settings'][_0x84d42b(0x1a4)]['Window_ClassStatus_BgType']);},Scene_ClassChange[_0x5d7c39(0x30a)][_0x5d7c39(0x287)]=function(){const _0x2e41bd=_0x5d7c39,_0x305898=VisuMZ[_0x2e41bd(0x35b)]['Settings'][_0x2e41bd(0x1a4)];if(_0x305898[_0x2e41bd(0x186)])return _0x305898[_0x2e41bd(0x186)]['call'](this);const _0x500477=Math[_0x2e41bd(0x25f)](Graphics[_0x2e41bd(0x223)]/0x2),_0x59d7e1=this[_0x2e41bd(0x2c9)](),_0x373be2=this[_0x2e41bd(0x329)]()?0x0:_0x500477,_0x32b712=this[_0x2e41bd(0x281)]();return new Rectangle(_0x373be2,_0x32b712,_0x500477,_0x59d7e1);},Scene_ClassChange[_0x5d7c39(0x30a)][_0x5d7c39(0x35f)]=function(){const _0x416fd6=_0x5d7c39,_0x4dca57=this['classTierWindowRect'](),_0x23bebd=new Window_ClassTier(_0x4dca57);_0x23bebd['setHelpWindow'](this[_0x416fd6(0x256)]),_0x23bebd[_0x416fd6(0x121)](VisuMZ[_0x416fd6(0x35b)]['Settings'][_0x416fd6(0x1a4)][_0x416fd6(0x1ab)]),this[_0x416fd6(0x2e0)](_0x23bebd),this[_0x416fd6(0x2e2)]=_0x23bebd,_0x23bebd['setHandler'](_0x416fd6(0x39c),this[_0x416fd6(0x303)][_0x416fd6(0xf7)](this)),this[_0x416fd6(0x27f)]()>0x1&&(_0x23bebd[_0x416fd6(0x1e0)]('pagedown',this[_0x416fd6(0x323)][_0x416fd6(0xf7)](this)),_0x23bebd[_0x416fd6(0x1e0)](_0x416fd6(0x2b0),this[_0x416fd6(0x31d)]['bind'](this))),_0x23bebd[_0x416fd6(0x1e0)](_0x416fd6(0x199),this[_0x416fd6(0x130)][_0x416fd6(0xf7)](this));},Scene_ClassChange['prototype'][_0x5d7c39(0x16d)]=function(){const _0x4b5f9f=_0x5d7c39,_0x35374d=VisuMZ['ClassChangeSystem'][_0x4b5f9f(0x2de)][_0x4b5f9f(0x1a4)];if(_0x35374d[_0x4b5f9f(0x101)])return _0x35374d['Window_ClassTier_RectJS'][_0x4b5f9f(0x283)](this);const _0x53ca7d=Graphics['boxWidth']-this['_statusWindow'][_0x4b5f9f(0x398)],_0x6e3334=this['mainAreaHeight'](),_0x34bfad=this[_0x4b5f9f(0x329)]()?_0x53ca7d:0x0,_0x46fc01=this[_0x4b5f9f(0x281)]();return new Rectangle(_0x34bfad,_0x46fc01,_0x53ca7d,_0x6e3334);},Scene_ClassChange[_0x5d7c39(0x30a)]['createClassListWindow']=function(){const _0x179f16=_0x5d7c39,_0x25da92=this[_0x179f16(0x17e)](),_0x4a57c2=new Window_ClassList(_0x25da92);_0x4a57c2[_0x179f16(0x25c)](this['_helpWindow']),_0x4a57c2['setStatusWindow'](this[_0x179f16(0x235)]),_0x4a57c2[_0x179f16(0x121)](VisuMZ[_0x179f16(0x35b)][_0x179f16(0x2de)][_0x179f16(0x1a4)]['Window_ClassList_BgType']),this[_0x179f16(0x2e0)](_0x4a57c2),this[_0x179f16(0x1c4)]=_0x4a57c2,_0x4a57c2[_0x179f16(0x1e0)](_0x179f16(0x39c),this[_0x179f16(0x102)][_0x179f16(0xf7)](this)),this[_0x179f16(0x27f)]()<=0x1&&(_0x4a57c2[_0x179f16(0x1e0)](_0x179f16(0x10d),this['nextActor']['bind'](this)),_0x4a57c2[_0x179f16(0x1e0)]('pageup',this['previousActor']['bind'](this))),_0x4a57c2[_0x179f16(0x1e0)](_0x179f16(0x209),this[_0x179f16(0x122)][_0x179f16(0xf7)](this));},Scene_ClassChange[_0x5d7c39(0x30a)][_0x5d7c39(0x17e)]=function(){const _0x2929ce=_0x5d7c39,_0x34cd38=VisuMZ[_0x2929ce(0x35b)][_0x2929ce(0x2de)][_0x2929ce(0x1a4)];if(_0x34cd38[_0x2929ce(0x16c)])return _0x34cd38[_0x2929ce(0x16c)]['call'](this);const _0x1039f1=Graphics[_0x2929ce(0x223)]-this[_0x2929ce(0x235)]['width'],_0x3ff137=this[_0x2929ce(0x2c9)](),_0x4acf9f=this[_0x2929ce(0x329)]()?_0x1039f1:0x0,_0x1d5ee3=this['mainAreaTop']();return new Rectangle(_0x4acf9f,_0x1d5ee3,_0x1039f1,_0x3ff137);},Scene_ClassChange[_0x5d7c39(0x30a)]['highestTier']=function(){const _0x42e68c=_0x5d7c39;if(this[_0x42e68c(0x1bc)]!==undefined)return this['_highestTier'];return this[_0x42e68c(0x1bc)]=$gameParty[_0x42e68c(0x2bd)](),this['_highestTier'];},Scene_ClassChange[_0x5d7c39(0x30a)][_0x5d7c39(0x206)]=function(){const _0x5c52f3=_0x5d7c39;this['highestTier']()>0x1?(this['_classTierWindow']['forceSelect'](0x0),this['_classTierWindow'][_0x5c52f3(0x219)](),this[_0x5c52f3(0x2e2)]['activate'](),this['_classListWindow'][_0x5c52f3(0x2b5)](),this[_0x5c52f3(0x1c4)][_0x5c52f3(0x131)]()):(this[_0x5c52f3(0x1c4)][_0x5c52f3(0x2b9)](0x0),this[_0x5c52f3(0x1c4)][_0x5c52f3(0x36c)](0x1),this['_classListWindow'][_0x5c52f3(0x219)](),this[_0x5c52f3(0x1c4)][_0x5c52f3(0x158)](),this[_0x5c52f3(0x2e2)][_0x5c52f3(0x2b5)](),this['_classTierWindow'][_0x5c52f3(0x131)]());},Scene_ClassChange['prototype'][_0x5d7c39(0x309)]=function(){const _0x1c0e96=_0x5d7c39,_0x348e6a=this[_0x1c0e96(0x340)]();_0x348e6a[_0x1c0e96(0x2a6)](),this[_0x1c0e96(0x235)][_0x1c0e96(0x322)](_0x348e6a),this['_classTierWindow'][_0x1c0e96(0x322)](_0x348e6a),this['_classListWindow'][_0x1c0e96(0x322)](_0x348e6a);},Scene_ClassChange[_0x5d7c39(0x30a)]['onActorChange']=function(){const _0xeb911d=_0x5d7c39;Scene_MenuBase[_0xeb911d(0x30a)]['onActorChange'][_0xeb911d(0x283)](this),this[_0xeb911d(0x309)](),this[_0xeb911d(0x206)]();},Scene_ClassChange[_0x5d7c39(0x30a)]['onMulticlassOk']=function(){const _0x112015=_0x5d7c39,_0x5c8583=this['_classTierWindow'][_0x112015(0x171)]();this[_0x112015(0x1c4)][_0x112015(0x36c)](_0x5c8583),this[_0x112015(0x1c4)][_0x112015(0x219)](),this[_0x112015(0x1c4)][_0x112015(0x158)](),this[_0x112015(0x1c4)][_0x112015(0x2b9)](0x0),this[_0x112015(0x2e2)][_0x112015(0x2b5)](),this[_0x112015(0x2e2)]['deactivate'](),this[_0x112015(0x12a)]();},Scene_ClassChange[_0x5d7c39(0x30a)]['onClassListCancel']=function(){const _0x3daeca=_0x5d7c39;this['highestTier']()>0x1?(this[_0x3daeca(0x2e2)]['show'](),this[_0x3daeca(0x2e2)][_0x3daeca(0x158)](),this[_0x3daeca(0x1c4)][_0x3daeca(0x2b5)](),this['_classListWindow'][_0x3daeca(0x131)](),this[_0x3daeca(0x235)][_0x3daeca(0x106)](null)):this['popScene']();},Scene_ClassChange[_0x5d7c39(0x30a)][_0x5d7c39(0x122)]=function(){const _0x107137=_0x5d7c39,_0x412a4e=this['_classListWindow'][_0x107137(0x32e)],_0x4925e4=this[_0x107137(0x1c4)][_0x107137(0x171)](),_0x24a44b=this['_classListWindow'][_0x107137(0x1cc)](),_0x16a169=_0x4925e4?_0x4925e4['id']:0x0;this[_0x107137(0x2ff)]['changeMulticlass'](_0x16a169,_0x412a4e),this[_0x107137(0x2e2)][_0x107137(0x21b)](),this[_0x107137(0x1c4)][_0x107137(0x21b)](),this[_0x107137(0x235)][_0x107137(0x106)](null),this[_0x107137(0x205)](_0x16a169,_0x412a4e),this[_0x107137(0x206)]();if(this[_0x107137(0x2e2)][_0x107137(0x2f8)])this[_0x107137(0x2e2)][_0x107137(0x216)](_0x412a4e-0x1);else this['_classListWindow'][_0x107137(0x2f8)]&&this[_0x107137(0x1c4)][_0x107137(0x216)](_0x24a44b);},Scene_ClassChange[_0x5d7c39(0x30a)][_0x5d7c39(0x205)]=function(_0x414381,_0x16d265){const _0x14a5ef=_0x5d7c39,_0x4144aa=this[_0x14a5ef(0x15c)](_0x16d265);this[_0x14a5ef(0x380)](_0x414381,_0x16d265,_0x4144aa);},Scene_ClassChange['prototype'][_0x5d7c39(0x15c)]=function(_0x2abe4d){const _0x3dc9bc=_0x5d7c39,_0xa0b041=new Sprite(),_0x332b5d=VisuMZ['ClassChangeSystem']['Settings'][_0x3dc9bc(0x1a4)];if(_0x2abe4d<=0x1){const _0x4981d1=this[_0x3dc9bc(0x235)];_0xa0b041['x']=_0x4981d1['x']+Math[_0x3dc9bc(0x23c)](_0x4981d1['width']/0x2),_0xa0b041['y']=_0x4981d1['y']+Math[_0x3dc9bc(0x23c)](_0x4981d1[_0x3dc9bc(0x237)]/0x2),_0xa0b041['x']+=_0x332b5d['ConfirmAniPrimaryOffsetX']||0x0,_0xa0b041['y']+=_0x332b5d[_0x3dc9bc(0x25b)]||0x0;}else{const _0x42ceb9=this[_0x3dc9bc(0x2e2)],_0x53923b=_0x42ceb9[_0x3dc9bc(0x277)](_0x42ceb9[_0x3dc9bc(0x1cc)]()),_0x2a31fa=_0x42ceb9['padding']||0x0;_0xa0b041['x']=_0x42ceb9['x']+_0x53923b['x']+Math[_0x3dc9bc(0x23c)](_0x53923b['width']/0x2)+_0x2a31fa,_0xa0b041['y']=_0x42ceb9['y']+_0x53923b['y']+Math[_0x3dc9bc(0x23c)](_0x53923b['height']/0x2)+_0x2a31fa,_0xa0b041['x']+=_0x332b5d['ConfirmAniSubclassOffsetX']||0x0,_0xa0b041['y']+=_0x332b5d[_0x3dc9bc(0x126)]||0x0;}return _0xa0b041['x']+=this['_windowLayer']['x'],_0xa0b041['y']+=this['_windowLayer']['y'],_0xa0b041;},Scene_ClassChange['prototype'][_0x5d7c39(0x380)]=function(_0x54f051,_0x17d5db,_0xe054e6){const _0x52d945=_0x5d7c39,_0x33a49b=this[_0x52d945(0x180)](_0x54f051),_0x26f1db=$dataAnimations[_0x33a49b];if(!_0x26f1db)return;const _0x4cdfcc=this['isMVAnimation'](_0x26f1db),_0xdf4ec5=new(_0x4cdfcc?Sprite_AnimationMV:Sprite_Animation)(),_0x1cd7ce=[_0xe054e6],_0x7282be=0x0;_0xdf4ec5[_0x52d945(0x1b4)](_0x1cd7ce,_0x26f1db,![],_0x7282be,null),_0xdf4ec5[_0x52d945(0x288)]=_0x17d5db,this[_0x52d945(0x384)](_0xe054e6),this['addChild'](_0xdf4ec5),this['_animations'][_0x52d945(0x39a)](_0xdf4ec5);},Scene_ClassChange[_0x5d7c39(0x1d2)]=VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x2de)][_0x5d7c39(0x1a4)][_0x5d7c39(0x1d7)]??!![],Scene_ClassChange[_0x5d7c39(0x30a)][_0x5d7c39(0x180)]=function(_0x187d41){const _0x1b55b1=_0x5d7c39,_0x3b3e86=$dataClasses[_0x187d41];if(_0x3b3e86){const _0x20cab2=VisuMZ[_0x1b55b1(0x35b)][_0x1b55b1(0x276)],_0x4f1b4e=_0x3b3e86['note'];if(_0x4f1b4e['match'](_0x20cab2[_0x1b55b1(0x32a)]))return Number(RegExp['$1']);}else{if(!Scene_ClassChange['PLAY_ANI_FOR_UNASSIGN'])return 0x0;}return VisuMZ[_0x1b55b1(0x35b)][_0x1b55b1(0x2de)]['Window']['ConfirmAnimationID'];},Scene_ClassChange[_0x5d7c39(0x30a)][_0x5d7c39(0x298)]=function(_0x24456c){return!!_0x24456c['frames'];},Scene_ClassChange[_0x5d7c39(0x30a)]['updateClassChangeAnimations']=function(){const _0x22eec4=_0x5d7c39,_0x443612=[];for(const _0x1c9c12 of this['_animations']){if(!_0x1c9c12)continue;if(_0x1c9c12['isPlaying']())continue;_0x443612['push'](_0x1c9c12);}for(const _0x1a06ad of _0x443612){if(!_0x1a06ad)continue;for(const _0x10aa20 of _0x1a06ad[_0x22eec4(0x397)]){this[_0x22eec4(0x222)](_0x10aa20);}this[_0x22eec4(0x108)][_0x22eec4(0x33f)](_0x1a06ad),this[_0x22eec4(0x222)](_0x1a06ad);};},Scene_ClassChange[_0x5d7c39(0x30a)][_0x5d7c39(0x12a)]=function(){const _0x469ae4=_0x5d7c39,_0x13542c=[];for(const _0x90e79 of this[_0x469ae4(0x108)]){if(!_0x90e79)continue;if(_0x90e79[_0x469ae4(0x288)]<=0x1)continue;_0x13542c[_0x469ae4(0x39a)](_0x90e79);}for(const _0x26d57b of _0x13542c){if(!_0x26d57b)continue;for(const _0x2b6e60 of _0x26d57b[_0x469ae4(0x397)]){this[_0x469ae4(0x222)](_0x2b6e60);}this[_0x469ae4(0x108)][_0x469ae4(0x33f)](_0x26d57b),this['removeChild'](_0x26d57b);};},Scene_ClassChange[_0x5d7c39(0x30a)][_0x5d7c39(0x14c)]=function(){const _0x281cf4=_0x5d7c39;if(!this[_0x281cf4(0x2e2)])return![];if(!this[_0x281cf4(0x2e2)][_0x281cf4(0x2f8)])return![];return this[_0x281cf4(0x2e2)][_0x281cf4(0x30e)]();},Scene_ClassChange['prototype'][_0x5d7c39(0x391)]=function(){const _0x15ca51=_0x5d7c39;if(this[_0x15ca51(0x14c)]())return TextManager[_0x15ca51(0x344)]('shift');return Scene_MenuBase[_0x15ca51(0x30a)][_0x15ca51(0x391)][_0x15ca51(0x283)](this);},Scene_ClassChange[_0x5d7c39(0x30a)]['buttonAssistText3']=function(){const _0x2c145b=_0x5d7c39;if(this['buttonAssistSlotWindowShift']())return TextManager[_0x2c145b(0x212)];return Scene_MenuBase[_0x2c145b(0x30a)]['buttonAssistText3'][_0x2c145b(0x283)](this);},Scene_ClassChange[_0x5d7c39(0x30a)]['buttonAssistOffset3']=function(){const _0x5bb086=_0x5d7c39;if(this[_0x5bb086(0x14c)]())return this[_0x5bb086(0x1db)][_0x5bb086(0x398)]/0x5/-0x3;return Scene_MenuBase['prototype']['buttonAssistOffset3']['call'](this);},Scene_ClassChange[_0x5d7c39(0x30a)][_0x5d7c39(0x263)]=function(){const _0x1da40c=_0x5d7c39;Scene_MenuBase[_0x1da40c(0x30a)]['createBackground'][_0x1da40c(0x283)](this),this[_0x1da40c(0x3a0)](this[_0x1da40c(0x2fa)]()),this['createCustomBackgroundImages']();},Scene_ClassChange[_0x5d7c39(0x30a)][_0x5d7c39(0x2fa)]=function(){const _0x3b1f8b=_0x5d7c39;return VisuMZ[_0x3b1f8b(0x35b)][_0x3b1f8b(0x2de)]['BgSettings'][_0x3b1f8b(0x260)];},Scene_ClassChange[_0x5d7c39(0x30a)][_0x5d7c39(0x19f)]=function(){const _0x3bc021=_0x5d7c39,_0x70f2=VisuMZ['ClassChangeSystem'][_0x3bc021(0x2de)][_0x3bc021(0x267)];_0x70f2&&(_0x70f2['BgFilename1']!==''||_0x70f2[_0x3bc021(0xf8)]!=='')&&(this[_0x3bc021(0x371)]=new Sprite(ImageManager['loadTitle1'](_0x70f2['BgFilename1']||'')),this['_backSprite2']=new Sprite(ImageManager[_0x3bc021(0x184)](_0x70f2['BgFilename2']||'')),this['addChild'](this[_0x3bc021(0x371)]),this['addChild'](this[_0x3bc021(0x2a5)]),this[_0x3bc021(0x371)][_0x3bc021(0x349)][_0x3bc021(0x324)](this['adjustSprite']['bind'](this,this[_0x3bc021(0x371)])),this[_0x3bc021(0x2a5)]['bitmap'][_0x3bc021(0x324)](this[_0x3bc021(0x2e4)]['bind'](this,this['_backSprite2'])));},Scene_ClassChange[_0x5d7c39(0x30a)][_0x5d7c39(0x2e4)]=function(_0x42d754){const _0x108201=_0x5d7c39;this['scaleSprite'](_0x42d754),this[_0x108201(0x1ce)](_0x42d754);},Window_Base['CLASS_CHANGE_SHOW_CLASS_LEVEL']=VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x2de)][_0x5d7c39(0x1a4)]['ShowClassLevel']??!![],Window_Base[_0x5d7c39(0x30a)][_0x5d7c39(0x1ae)]=function(_0x30f39c,_0x2b6224,_0x36e436,_0x24cd0e,_0x4b14d4){const _0x204c6c=_0x5d7c39;_0x4b14d4=_0x4b14d4||_0x204c6c(0x191);const _0x121357=_0x204c6c(0x27a)[_0x204c6c(0x233)](ImageManager[_0x204c6c(0x1fd)]),_0x3d0258=TextManager[_0x204c6c(0x2c4)],_0x613bfc=_0x3d0258[_0x204c6c(0x233)](_0x30f39c,TextManager[_0x204c6c(0x230)],_0x121357,TextManager['classPointsFull']),_0x1c6d20=this[_0x204c6c(0x36b)](_0x613bfc)[_0x204c6c(0x398)];if(_0x4b14d4===_0x204c6c(0x191))_0x2b6224+=0x0;else _0x4b14d4===_0x204c6c(0x21c)?_0x2b6224+=Math['round']((_0x24cd0e-_0x1c6d20)/0x2):_0x2b6224+=_0x24cd0e-_0x1c6d20;this[_0x204c6c(0x15f)](_0x613bfc,_0x2b6224,_0x36e436);},Window_Base[_0x5d7c39(0x30a)]['drawActorClassPoints']=function(_0x407af0,_0x5e8ea2,_0x4e8c59,_0x2ba4d5,_0x2b808d,_0x46f109){const _0x2f0b76=_0x5d7c39,_0x2b9cc3=_0x407af0[_0x2f0b76(0x1d8)](_0x5e8ea2);this[_0x2f0b76(0x1ae)](_0x2b9cc3,_0x4e8c59,_0x2ba4d5,_0x2b808d,_0x46f109);},Window_Base[_0x5d7c39(0x30a)][_0x5d7c39(0xf5)]=function(_0xab5aae,_0x158b8d,_0x53b2fc,_0x5a631a,_0x11f78b){const _0x1fcaaa=_0x5d7c39;_0x11f78b=_0x11f78b||_0x1fcaaa(0x191);const _0x2465cd=_0x1fcaaa(0x27a)['format'](ImageManager[_0x1fcaaa(0x2f1)]),_0x3cb7b6=TextManager['jobPointsFmt'],_0x2ef698=_0x3cb7b6['format'](_0xab5aae,TextManager['jobPointsAbbr'],_0x2465cd,TextManager[_0x1fcaaa(0x21d)]),_0xaf6152=this[_0x1fcaaa(0x36b)](_0x2ef698)[_0x1fcaaa(0x398)];if(_0x11f78b===_0x1fcaaa(0x191))_0x158b8d+=0x0;else _0x11f78b===_0x1fcaaa(0x21c)?_0x158b8d+=Math[_0x1fcaaa(0x23c)]((_0x5a631a-_0xaf6152)/0x2):_0x158b8d+=_0x5a631a-_0xaf6152;this['drawTextEx'](_0x2ef698,_0x158b8d,_0x53b2fc);},Window_Base[_0x5d7c39(0x30a)]['drawActorJobPoints']=function(_0xb1bfbd,_0x3d684e,_0x47c1aa,_0x44276a,_0x416747,_0x34f26d){const _0x3f0cf4=_0x5d7c39,_0x211244=_0xb1bfbd[_0x3f0cf4(0x13d)](_0x3d684e);this[_0x3f0cf4(0xf5)](_0x211244,_0x47c1aa,_0x44276a,_0x416747,_0x34f26d);},VisuMZ['ClassChangeSystem'][_0x5d7c39(0x38d)]=Window_Base['prototype'][_0x5d7c39(0x365)],Window_Base['prototype'][_0x5d7c39(0x365)]=function(_0xc1724e,_0x5ceb7e,_0x6ba27){const _0x2d06a0=_0x5d7c39;if(_0xc1724e===$dataClasses){const _0x40fd00=_0xc1724e[_0x5ceb7e];let _0x535a36='';if(_0x40fd00&&_0x6ba27&&_0x40fd00[_0x2d06a0(0x24f)]){const _0x5acaf9='\x1bi[%1]%2';let _0x156686=_0x40fd00[_0x2d06a0(0x385)];_0x156686=_0x156686['replace'](/\\I\[(\d+)\]/gi,''),_0x535a36=_0x5acaf9[_0x2d06a0(0x233)](_0x40fd00[_0x2d06a0(0x24f)],_0x156686);}else{if(_0x40fd00){let _0x37bbae=_0x40fd00[_0x2d06a0(0x385)];_0x37bbae=_0x37bbae[_0x2d06a0(0x202)](/\\I\[(\d+)\]/gi,''),_0x535a36=_0x37bbae;}else _0x535a36='';}return this[_0x2d06a0(0x2ea)]()&&(_0x535a36=this[_0x2d06a0(0x1f7)](_0x535a36,_0xc1724e)),_0x535a36;}return VisuMZ[_0x2d06a0(0x35b)][_0x2d06a0(0x38d)]['call'](this,_0xc1724e,_0x5ceb7e,_0x6ba27);},Window_Base[_0x5d7c39(0x30a)][_0x5d7c39(0x21a)]=function(_0x4a4785,_0x2f4719,_0x237d26,_0x593aa0){const _0x1ca4af=_0x5d7c39;if(!Window_Base['CLASS_CHANGE_SHOW_CLASS_LEVEL'])return;if(!$dataClasses[_0x2f4719])return;this['isClassExpGaugeDrawn']()&&this[_0x1ca4af(0x150)](_0x4a4785,_0x2f4719,_0x237d26,_0x593aa0),this[_0x1ca4af(0x313)](ColorManager[_0x1ca4af(0x2d9)]()),this[_0x1ca4af(0x14d)](TextManager[_0x1ca4af(0x39e)],_0x237d26,_0x593aa0,0x30),this['resetTextColor'](),this['drawText'](_0x4a4785[_0x1ca4af(0x243)](_0x2f4719),_0x237d26+0x54,_0x593aa0,0x24,_0x1ca4af(0x325));},Window_Base[_0x5d7c39(0x30a)][_0x5d7c39(0x208)]=function(){const _0x48f365=_0x5d7c39;return Imported[_0x48f365(0x141)]&&VisuMZ[_0x48f365(0x311)][_0x48f365(0x2de)]['UI']['LvExpGauge'];},Window_Base['prototype']['drawClassExpGauge']=function(_0x38bfed,_0x3bbbaa,_0x144b93,_0x5df48f){const _0x5a70f0=_0x5d7c39;if(!_0x38bfed)return;if(!_0x38bfed[_0x5a70f0(0x32c)]())return;const _0x21bb43=0x80,_0x3d8a7e=_0x38bfed['classExpRate'](_0x3bbbaa);let _0x263a1a=ColorManager[_0x5a70f0(0x274)](),_0x3d3bad=ColorManager[_0x5a70f0(0x388)]();_0x3d8a7e>=0x1&&(_0x263a1a=ColorManager[_0x5a70f0(0x392)](),_0x3d3bad=ColorManager[_0x5a70f0(0x151)]()),this['drawGauge'](_0x144b93,_0x5df48f,_0x21bb43,_0x3d8a7e,_0x263a1a,_0x3d3bad);},VisuMZ[_0x5d7c39(0x35b)]['Window_MenuCommand_addOriginalCommands']=Window_MenuCommand[_0x5d7c39(0x30a)][_0x5d7c39(0x354)],Window_MenuCommand[_0x5d7c39(0x30a)][_0x5d7c39(0x354)]=function(){const _0x422153=_0x5d7c39;VisuMZ[_0x422153(0x35b)][_0x422153(0x28d)][_0x422153(0x283)](this),this[_0x422153(0x2ef)]();},Window_MenuCommand[_0x5d7c39(0x30a)][_0x5d7c39(0x2ef)]=function(){const _0x3a7d25=_0x5d7c39;if(!this[_0x3a7d25(0x35c)]())return;if(!this['isClassChangeCommandVisible']())return;const _0x25765f=TextManager[_0x3a7d25(0x320)],_0x37bee2=this[_0x3a7d25(0x203)]();this[_0x3a7d25(0x13e)](_0x25765f,_0x3a7d25(0x35b),_0x37bee2);},Window_MenuCommand['prototype'][_0x5d7c39(0x35c)]=function(){return Imported['VisuMZ_1_MainMenuCore']?![]:!![];},Window_MenuCommand[_0x5d7c39(0x30a)][_0x5d7c39(0x29a)]=function(){return $gameSystem['isMainMenuClassChangeSystemVisible']();},Window_MenuCommand['prototype']['isClassChangeCommandEnabled']=function(){const _0x467fcf=_0x5d7c39;return $gameSystem[_0x467fcf(0xfd)]();};function _0x2bd2(_0xc91d51,_0x1c965f){const _0x364e6c=_0x364e();return _0x2bd2=function(_0x2bd2ac,_0x1cfb26){_0x2bd2ac=_0x2bd2ac-0xf1;let _0x5adc20=_0x364e6c[_0x2bd2ac];return _0x5adc20;},_0x2bd2(_0xc91d51,_0x1c965f);}function Window_ClassStatus(){const _0xd47eb9=_0x5d7c39;this[_0xd47eb9(0x23d)](...arguments);}Window_ClassStatus[_0x5d7c39(0x30a)]=Object[_0x5d7c39(0x2a4)](Window_StatusBase[_0x5d7c39(0x30a)]),Window_ClassStatus['prototype']['constructor']=Window_ClassStatus,Window_ClassStatus[_0x5d7c39(0x30a)][_0x5d7c39(0x23d)]=function(_0x3bd2bc){const _0x29f2c0=_0x5d7c39;Window_StatusBase[_0x29f2c0(0x30a)][_0x29f2c0(0x23d)][_0x29f2c0(0x283)](this,_0x3bd2bc),this[_0x29f2c0(0x2ff)]=null,this['_tempActor']=null,this['refresh']();},Window_ClassStatus[_0x5d7c39(0x30a)][_0x5d7c39(0x322)]=function(_0x4f8941){const _0x1fc6bf=_0x5d7c39;this[_0x1fc6bf(0x2ff)]!==_0x4f8941&&(this[_0x1fc6bf(0x2ff)]=_0x4f8941,this[_0x1fc6bf(0x21b)]());},Window_ClassStatus[_0x5d7c39(0x30a)][_0x5d7c39(0x116)]=function(){return 0x0;},Window_ClassStatus['prototype']['setTempActor']=function(_0x2c7414){const _0x3fb427=_0x5d7c39;this[_0x3fb427(0x15e)]!==_0x2c7414&&(this[_0x3fb427(0x15e)]=_0x2c7414,this['refresh']());},Window_ClassStatus[_0x5d7c39(0x30a)]['refresh']=function(){const _0x10ea4b=_0x5d7c39;this['hideAdditionalSprites'](),this[_0x10ea4b(0x113)]();if(this[_0x10ea4b(0x2ff)])this[_0x10ea4b(0x2ff)][_0x10ea4b(0x21b)]();this[_0x10ea4b(0x2d8)]();},Window_ClassStatus[_0x5d7c39(0x30a)][_0x5d7c39(0x2d8)]=function(){const _0x55f803=_0x5d7c39;this['contents'][_0x55f803(0x331)]();if(!this[_0x55f803(0x2ff)])return;if(this[_0x55f803(0x164)]()){const _0x35734e=ImageManager['loadPicture'](this[_0x55f803(0x2ff)][_0x55f803(0x31a)]());_0x35734e[_0x55f803(0x324)](this[_0x55f803(0x22b)][_0x55f803(0xf7)](this));}else this['refreshNoMenuImage']();},Window_ClassStatus[_0x5d7c39(0x30a)][_0x5d7c39(0x164)]=function(){const _0x4ae2cd=_0x5d7c39;return Imported['VisuMZ_1_MainMenuCore']&&this[_0x4ae2cd(0x2ff)]['getMenuImage']()!==''&&VisuMZ[_0x4ae2cd(0x35b)]['Settings'][_0x4ae2cd(0x1a4)][_0x4ae2cd(0x1eb)];},Window_ClassStatus[_0x5d7c39(0x30a)][_0x5d7c39(0x22b)]=function(){const _0x8f3df4=_0x5d7c39;VisuMZ[_0x8f3df4(0x35b)][_0x8f3df4(0x2de)][_0x8f3df4(0x1a4)][_0x8f3df4(0x34b)]['call'](this),this[_0x8f3df4(0x160)]();},Window_ClassStatus[_0x5d7c39(0x30a)][_0x5d7c39(0x224)]=function(_0x112b64,_0x1d8cac,_0x24b600,_0x50c7a6,_0x280cd9){const _0x233918=_0x5d7c39,_0x40054b=ImageManager['loadPicture'](_0x112b64[_0x233918(0x31a)]()),_0x2ab6cf=this[_0x233918(0x16e)]-_0x40054b[_0x233918(0x398)];_0x1d8cac+=_0x2ab6cf/0x2;if(_0x2ab6cf<0x0)_0x50c7a6-=_0x2ab6cf;Window_StatusBase[_0x233918(0x30a)]['drawItemActorMenuImage'][_0x233918(0x283)](this,_0x112b64,_0x1d8cac,_0x24b600,_0x50c7a6,_0x280cd9);},Window_ClassStatus[_0x5d7c39(0x30a)][_0x5d7c39(0x124)]=function(){const _0x56b583=_0x5d7c39;VisuMZ[_0x56b583(0x35b)][_0x56b583(0x2de)][_0x56b583(0x1a4)][_0x56b583(0x27c)]['call'](this),this[_0x56b583(0x160)]();},Window_ClassStatus[_0x5d7c39(0x30a)][_0x5d7c39(0x160)]=function(){const _0x1afe68=_0x5d7c39;this[_0x1afe68(0x113)](),VisuMZ[_0x1afe68(0x35b)]['Settings']['Window'][_0x1afe68(0x272)][_0x1afe68(0x283)](this);},Window_ClassStatus['prototype'][_0x5d7c39(0x196)]=function(){const _0x4c5d1c=_0x5d7c39;return Imported['VisuMZ_0_CoreEngine']?VisuMZ['CoreEngine'][_0x4c5d1c(0x2de)][_0x4c5d1c(0x2a1)][_0x4c5d1c(0x342)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_ClassStatus[_0x5d7c39(0x30a)][_0x5d7c39(0x20f)]=function(){const _0x1a3159=_0x5d7c39;return VisuMZ[_0x1a3159(0x35b)][_0x1a3159(0x2de)][_0x1a3159(0x1a4)][_0x1a3159(0x11f)];},Window_ClassStatus[_0x5d7c39(0x30a)][_0x5d7c39(0x301)]=function(){const _0x49ab84=_0x5d7c39;return Imported[_0x49ab84(0x141)]&&VisuMZ[_0x49ab84(0x311)][_0x49ab84(0x2de)][_0x49ab84(0x2a1)][_0x49ab84(0x19d)];},Window_ClassStatus[_0x5d7c39(0x30a)][_0x5d7c39(0x339)]=function(_0x139308,_0x4e1aab,_0x3717ba,_0x17c0ba,_0x1add7c){const _0x5b2ce4=_0x5d7c39;if(Imported[_0x5b2ce4(0xf1)])switch(this[_0x5b2ce4(0x1dd)]()){case _0x5b2ce4(0x2ab):break;case'sprite':this[_0x5b2ce4(0x2e8)](_0x139308,_0x4e1aab,_0x3717ba,_0x17c0ba,_0x1add7c);break;case _0x5b2ce4(0x181):this['drawItemActorSvBattler'](_0x139308,_0x4e1aab,_0x3717ba,_0x17c0ba,_0x1add7c);break;default:this[_0x5b2ce4(0x395)](_0x139308,_0x4e1aab,_0x3717ba,_0x17c0ba,_0x1add7c);break;}else this[_0x5b2ce4(0x395)](_0x139308,_0x4e1aab,_0x3717ba,_0x17c0ba,_0x1add7c);},Window_ClassStatus[_0x5d7c39(0x30a)][_0x5d7c39(0x395)]=function(_0x3ae527,_0x2048e4,_0x4bec44,_0x1d9dfd,_0x19926f){const _0x42ea70=_0x5d7c39,_0xdbf723=ImageManager[_0x42ea70(0x278)](_0x3ae527[_0x42ea70(0x3a2)]());_0xdbf723[_0x42ea70(0x324)](Window_StatusBase[_0x42ea70(0x30a)][_0x42ea70(0x339)][_0x42ea70(0xf7)](this,_0x3ae527,_0x2048e4,_0x4bec44,_0x1d9dfd,_0x19926f));},Window_ClassStatus['prototype'][_0x5d7c39(0x1c8)]=function(_0x4e852c,_0x3d5cc4){const _0x34733c=_0x5d7c39,_0x3415bd=this[_0x34733c(0x132)]();this[_0x34733c(0x313)](ColorManager[_0x34733c(0x2d9)]());if(Imported[_0x34733c(0x141)]){const _0x58f669=VisuMZ[_0x34733c(0x311)][_0x34733c(0x2de)]['UI'][_0x34733c(0x190)];this[_0x34733c(0x14d)](_0x58f669,_0x4e852c,_0x3d5cc4,_0x3415bd,_0x34733c(0x21c));}else this[_0x34733c(0x14d)]('→',_0x4e852c,_0x3d5cc4,_0x3415bd,_0x34733c(0x21c));},Window_ClassStatus['prototype'][_0x5d7c39(0x132)]=function(){return 0x20;},Window_ClassStatus[_0x5d7c39(0x30a)][_0x5d7c39(0x29d)]=function(_0x47833d,_0x15ada3,_0x5bf5cf,_0x26f7da){const _0x2fc6c7=_0x5d7c39,_0x46b034=this['itemPadding']();Imported['VisuMZ_0_CoreEngine']?this['drawParamText'](_0x15ada3+_0x46b034,_0x5bf5cf,_0x26f7da,_0x47833d,![]):(this[_0x2fc6c7(0x313)](ColorManager[_0x2fc6c7(0x2d9)]()),this[_0x2fc6c7(0x14d)](TextManager[_0x2fc6c7(0x115)](_0x47833d),_0x15ada3+_0x46b034,_0x5bf5cf,_0x26f7da),this['resetTextColor']());},Window_ClassStatus[_0x5d7c39(0x30a)][_0x5d7c39(0x177)]=function(_0x356dd2,_0x4441b9,_0x1262a8,_0x1ad564){const _0x578b26=_0x5d7c39,_0x3b42f1=this['itemPadding']();let _0x31e30f=0x0;Imported['VisuMZ_0_CoreEngine']?_0x31e30f=this['_actor'][_0x578b26(0x218)](_0x356dd2,!![]):_0x31e30f=this[_0x578b26(0x2ff)][_0x578b26(0x115)](_0x356dd2);const _0x4a8bcf=_0x31e30f;this[_0x578b26(0x14d)](_0x31e30f,_0x4441b9,_0x1262a8,_0x1ad564-_0x3b42f1,_0x578b26(0x325)),this[_0x578b26(0x185)]();},Window_ClassStatus['prototype']['drawUpdatedAfterParamValue']=function(_0x4fd5dd,_0x29d557,_0x1b2d45,_0x181c31){const _0x114f46=_0x5d7c39,_0x162078=this[_0x114f46(0x23e)]();let _0x554bb9=0x0,_0x2f00d4=0x0,_0x2d3c36='';if(this[_0x114f46(0x15e)]){Imported[_0x114f46(0x141)]?(_0x554bb9=this['_actor'][_0x114f46(0x218)](_0x4fd5dd,![]),_0x2f00d4=this[_0x114f46(0x15e)][_0x114f46(0x218)](_0x4fd5dd,![]),_0x2d3c36=this['_tempActor'][_0x114f46(0x218)](_0x4fd5dd,!![])):(_0x554bb9=this[_0x114f46(0x2ff)][_0x114f46(0x115)](_0x4fd5dd),_0x2f00d4=this[_0x114f46(0x15e)][_0x114f46(0x115)](_0x4fd5dd),_0x2d3c36=this[_0x114f46(0x15e)]['param'](_0x4fd5dd));const _0x5bad96=_0x554bb9,_0x1b34c0=_0x2f00d4;diffValue=_0x1b34c0-_0x5bad96,this['changeTextColor'](ColorManager[_0x114f46(0x37f)](diffValue)),this[_0x114f46(0x14d)](_0x2d3c36,_0x29d557,_0x1b2d45,_0x181c31-_0x162078,'right');}this[_0x114f46(0x185)]();},Window_ClassStatus[_0x5d7c39(0x30a)][_0x5d7c39(0x13c)]=function(_0x5c4c19,_0x302ee7,_0x43e913,_0x2f3006){const _0x519a9d=_0x5d7c39,_0x4bfbdc=this['itemPadding']();let _0x54722a=0x0,_0x384555=0x0,_0x4e45d4=![];if(this[_0x519a9d(0x15e)]){Imported[_0x519a9d(0x141)]?(_0x54722a=this[_0x519a9d(0x2ff)][_0x519a9d(0x218)](_0x5c4c19,![]),_0x384555=this[_0x519a9d(0x15e)][_0x519a9d(0x218)](_0x5c4c19,![]),_0x4e45d4=String(this[_0x519a9d(0x2ff)]['paramValueByName'](_0x5c4c19,!![]))['match'](/([%％])/i)):(_0x54722a=this[_0x519a9d(0x2ff)][_0x519a9d(0x115)](_0x5c4c19),_0x384555=this[_0x519a9d(0x15e)][_0x519a9d(0x115)](_0x5c4c19),_0x4e45d4=_0x54722a%0x1!==0x0||_0x384555%0x1!==0x0);const _0x758425=_0x54722a,_0x16d119=_0x384555,_0x1ba9af=_0x16d119-_0x758425;let _0x11598e=_0x1ba9af;if(_0x4e45d4)_0x11598e=Math[_0x519a9d(0x23c)](_0x1ba9af*0x64)+'%';_0x1ba9af!==0x0&&(this['changeTextColor'](ColorManager[_0x519a9d(0x37f)](_0x1ba9af)),_0x11598e=(_0x1ba9af>0x0?'(+%1)':'(%1)')[_0x519a9d(0x233)](_0x11598e),this[_0x519a9d(0x14d)](_0x11598e,_0x302ee7+_0x4bfbdc,_0x43e913,_0x2f3006,_0x519a9d(0x191)));}this[_0x519a9d(0x185)]();},Window_ClassStatus['prototype']['drawItemDarkRect']=function(_0x76d60b,_0x5ee457,_0x4a7e8e,_0x3b4769,_0x29dc58){const _0x7ee88=_0x5d7c39;if(VisuMZ['ClassChangeSystem'][_0x7ee88(0x2de)]['Window']['DrawBackRect']===![])return;_0x29dc58=Math[_0x7ee88(0x2c1)](_0x29dc58||0x1,0x1);while(_0x29dc58--){_0x3b4769=_0x3b4769||this['lineHeight'](),this[_0x7ee88(0x1df)][_0x7ee88(0x18a)]=0xa0;const _0x4aefc7=ColorManager[_0x7ee88(0x154)]();this[_0x7ee88(0x1df)][_0x7ee88(0x1fa)](_0x76d60b+0x1,_0x5ee457+0x1,_0x4a7e8e-0x2,_0x3b4769-0x2,_0x4aefc7),this[_0x7ee88(0x1df)][_0x7ee88(0x18a)]=0xff;}},ColorManager[_0x5d7c39(0x154)]=function(){const _0xa060a8=_0x5d7c39,_0x2feb9c=VisuMZ['ClassChangeSystem'][_0xa060a8(0x2de)]['Window'];let _0x1b9f31=_0x2feb9c[_0xa060a8(0x35e)]!==undefined?_0x2feb9c['BackRectColor']:0x13;return ColorManager['getColor'](_0x1b9f31);},Window_ClassStatus[_0x5d7c39(0x30a)][_0x5d7c39(0x1ac)]=function(_0x51471c,_0x57d780,_0x2c5bf6){const _0x3ef347=_0x5d7c39,_0x2931cf=VisuMZ['ClassChangeSystem'][_0x3ef347(0x2de)]['Window'][_0x3ef347(0x1a1)],_0x19dcfb=this[_0x3ef347(0x2ff)][_0x3ef347(0x144)]()['id'];for(const _0x15aa81 of _0x2931cf){switch(_0x15aa81[_0x3ef347(0x315)]()[_0x3ef347(0x37a)]()){case'AP':if(!Imported[_0x3ef347(0x195)])continue;this[_0x3ef347(0xfe)](this[_0x3ef347(0x2ff)],_0x19dcfb,_0x51471c,_0x57d780,_0x2c5bf6,_0x3ef347(0x325)),_0x57d780+=this[_0x3ef347(0x1e2)]();break;case'CP':if(!Imported[_0x3ef347(0x250)])continue;this['drawActorClassPoints'](this['_actor'],_0x19dcfb,_0x51471c,_0x57d780,_0x2c5bf6,_0x3ef347(0x325)),_0x57d780+=this['lineHeight']();break;case'JP':if(!Imported[_0x3ef347(0x250)])continue;this['drawActorJobPoints'](this[_0x3ef347(0x2ff)],_0x19dcfb,_0x51471c,_0x57d780,_0x2c5bf6,'right'),_0x57d780+=this[_0x3ef347(0x1e2)]();break;case'SP':if(!Imported[_0x3ef347(0x195)])continue;this[_0x3ef347(0x364)](this[_0x3ef347(0x2ff)],_0x19dcfb,_0x51471c,_0x57d780,_0x2c5bf6,_0x3ef347(0x325)),_0x57d780+=this['lineHeight']();break;}}};function Window_ClassCommand(){const _0x261fa1=_0x5d7c39;this[_0x261fa1(0x23d)](...arguments);}function _0x364e(){const _0x2e8cbb=['SharedResource','changeClassExp','31559gfdBEP','enemy','ElementRates','MaintainLevels','MenuPortraits','Game_BattlerBase_attackElements','_cache','innerHeight','constructor','EquipArmors','Job','StartingJobPoints','PerEnemy','ClassID','getActorClassBattlerName','join','applyDatabaseAutoColor','level','changePaintOpacity','fillRect','addedSkillTypes','changeMulticlass','classPointsIcon','min','FUNC','JobPointsPlus','ARRAYNUM','replace','isClassChangeCommandEnabled','_priorityBattlePortrait','startClassChangeAnimation','determineActiveWindow','dimColor1','isClassExpGaugeDrawn','classChange','drawClassResources','Armor-%1-%2','_list','General','Game_BattlerBase_debuffRate','paramValueFontSize','_priorityCharacterIndex','Game_Battler_onBattleStart','classChange_multiclass_ShiftHelp','actorClassMenuPortrait','initJobPoints','ClassMenuPortrait','smoothSelect','isBattleMember','paramValueByName','show','drawClassLevel','refresh','center','jobPointsFull','Game_Party_initialize','JobPointsGain','code','setBattlerImage','removeChild','boxWidth','drawItemActorMenuImage','gainStartingClassPoints','add','checkShiftRemoveShortcut','classDescription','Game_Action_applyItemUserEffect','Item-%1-%2','onMenuImageLoad','SkillLearnSystem','VictoryText','Game_Actor_faceName','StartClassJobPoints','classPointsAbbr','faceIndex','Game_Actor_faceIndex','format','setMp','_statusWindow','ClassChangeAddRestrictTier','height','ActorUnlockedClasses','_earnedClassPoints','_priorityFaceName','changeClass','round','initialize','itemPadding','Game_BattlerBase_elementRate','skill','STRUCT','makeRewardsJobPoints','classLevel','JobPointsLose','match','ParseClassNotetags','playBuzzerSound','AbilityPoints','<WordWrap>','jobPointsFmt','ClassPoints','applyClassChangeSystemUserEffect','MAX_SAFE_INTEGER','registerCommand','iconIndex','VisuMZ_2_ClassChangeSystem','classPoints','itemRectWithPadding','dataId','actorClassBattlerName','isClassChangeTierRestricted','_helpWindow','StartClassClassPoints','exit','characterIndex','classPointsRate','ConfirmAniPrimaryOffsetY','setHelpWindow','ext','_ClassChangeSystem_MainMenu','floor','SnapshotOpacity','AllowSameSubclassSelect','Game_Actor_getBattlePortraitFilename','createBackground','attackStatesRate','actorClassFaceIndex','updatedLayoutStyle','BgSettings','itemHeight','isMainMenuClassChangeSystemVisible','Game_Actor_releaseUnequippableItems','JobPointsFlat','commandPersonal','jobPointsAbbr','from','classPointsFull','TRAIT_EQUIP_WTYPE','updateClassLevel','DrawParamJS','_priorityCharacterName','expGaugeColor1','playStaticSe','RegExp','itemRect','loadFace','xparam','\x5cI[%1]','changeExp','DrawFaceJS','iconHeight','isWordWrapEnabled','highestTier','drawExtraContents','mainAreaTop','ClassBattlePortrait','call','StateResistance','Game_Actor_levelUp','VisuMZ_1_BattleCore','statusWindowRect','_classChangeTier','Show','isBottomHelpMode','Game_BattlerBase_isEquipWtypeOk','refreshActorPortrait','Window_MenuCommand_addOriginalCommands','expParams','classLevelUp','drawPicture','gainMulticlassRewardPoints','weaponTypes','paramRate','_priorityBattlerName','gainJobPointsForMulticlasses','shift','jobPoints','isMVAnimation','map','isClassChangeCommandVisible','VisuMZ_1_MessageCore','attackStates','drawUpdatedParamName','classChange_multiclass_remove','StateRates','classAdjustHpMp','Param','getSkillPoints','battlerName','create','_backSprite2','checkForAutoClassUnlocks','setJobPoints','levelUpGainJobPoints','StartingMulticlasses','mpRate','none','visibleResources','getColor','SkillPoints','gain%1Points','pageup','Game_Actor_tradeItemWithParty','elementRate','EquipWeapons','setupClassChangeSystem','hide','RestrictClassChangeTier','addJobPoints','ClassFaceName','forceSelect','gainSilentTp','initClassChangeRestrictions','ClassIcon','highestMulticlassTier','paramBase','4389498poGjSX','tradeItemWithParty','max','TRAIT_STYPE_ADD','Scene_Menu_onPersonalOk','classPointsFmt','Game_Actor_setup','MainMenu','indexOf','inBattle','mainAreaHeight','gainExp','AbbrText','\x5cI[%1]%2','makeCommandList','_rewards','stateResistSet','ClassDescription','removeUnlockedClass','classPointsTotal','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','note','includes','log','_multiclassTiers','prepareRefreshItemsEquipsCoreLayout','systemColor','equips','drawBigItemIcon','_priorityFaceIndex','updateClassLearnedSkills','Settings','Game_Actor_battlerName','addWindow','earnedJobPoints','_classTierWindow','getMulticlasses','adjustSprite','ParseActorNotetags','Points','pow','drawItemActorSprite','applyMulticlassObjects','isAutoColorAffected','Parse_Notetags_Basic','ChangeAdjusHpMp','classPointsVisible','levelUp','addClassChangeSystemCommand','drawActorClassPoints','jobPointsIcon','process_VisuMZ_ClassChangeSystem_Notetags','addedSkills','ClassPointsAdd','actorClassBattlePortrait','ClassPointsFlat','gainJobPoints','active','ARRAYEVAL','getBackgroundOpacity','allMembers','onDatabaseLoaded','getAbilityPoints','setFaceImage','_actor','nextClassLevelExp','isUseParamNamesWithIcons','UnassignHelpDescription','popScene','newPage','createHelpWindow','1837LCImfQ','skillId','isPlaytest','refreshActor','prototype','getUnlockedClasses','MaxResource','_classIDs','isShiftRemoveShortcutEnabled','gradientFillRect','Scene_Menu_createCommandWindow','CoreEngine','displayRewardsClassPoints','changeTextColor','ShiftShortcutKey','toUpperCase','Game_Actor_setBattlerImage','initClassLevels','Icon','_multiclassCheck','getMenuImage','applyItemUserEffect','JobPointsSet','previousActor','test','initClassChangeUnlocks','classChangeMenuCommand','createCommandWindow','setActor','nextActor','addLoadListener','right','Game_BattlerBase_paramRate','_jobPoints','Game_Actor_characterName','isRightInputMode','ClassChangeAnimation','BattleManager_displayRewards','isActor','learnings','_tier','setBattlePortrait','_unlockedClasses','clear','_scene','splice','EnableMainMenu','MulticlassRaiseLimit','shown','Actors','parameters','drawActorFace','checkForNewUnlockedClasses','BattleCore','loseMulticlassTiers','refreshCursor','ClassCharaName','remove','actor','Multiclass','ExtDisplayedParams','gainStartingJobPoints','getInputButtonString','actorClassCharacterName','TRAIT_EQUIP_ATYPE','TextCodeClassNames','Game_Actor_paramBase','bitmap','parse','DrawPortraitJS','initMulticlass','AddedStypes','5075iHEvCO','_exp','Game_BattlerBase_stateResistSet','blt','initClassChangeSystemMainMenu','gainRewardsClassPoints','addOriginalCommands','actorClassFaceName','Game_System_initialize','uiMenuStyle','gainClassPointsForMulticlasses','ALLOW_SELECT_SAME_SUBCLASS','1005rOvANf','ClassChangeSystem','addClassChangeSystemCommandAutomatically','clamp','BackRectColor','createClassTierWindow','debuffRate','classExpRate','Actor-%1-%2','AttackStates','drawActorSkillPoints','databaseObjectName','337730cvZEFG','initClassPoints','classPicture','_multiclasses','naturalUnlockClass','textSizeEx','setTier','setItem','sort','antiEquipsCacheClear_BattleCore_ClassChangeSystem','JSON','_backSprite1','deadMembers','ClassPointsSet','AddedSkills','deselect','updateHelp','levelUpGainAbilityPoints','getActorClassMenuPortrait','playClassChange','trim','setText','displayRewardsJobPoints','setHp','Game_Actor_changeClass','paramchangeTextColor','createClassChangeAnimation','926EuZzoY','31910FHfENH','isTriggered','addChild','name','endBattle','mmp','expGaugeColor2','currentClassLevelExp','subject','isLearnedSkill','isEnabled','Window_Base_databaseObjectName','createStatusWindow','addClassPoints','attackElements','buttonAssistKey3','maxLvGaugeColor1','_updateClassLearnedSkills','Enemy-%1-%2','prepareDrawActorFace','arePageButtonsEnabled','_targets','width','makeDeepCopy','push','actorId','cancel','ClassPointsGain','levelA','_wordWrap','setBackgroundOpacity','setMenuImage','faceName','VisuMZ_1_MainMenuCore','8PmxNht','setClassPoints','BattleManager_gainExp','drawJobPoints','PerLevelUp','bind','BgFilename2','DebuffRates','loadPicture','uiHelpPosition','classChange_multiclass_remove_help','isMainMenuClassChangeSystemEnabled','drawActorAbilityPoints','textColor','Game_Actor_traitObjects','Window_ClassTier_RectJS','onClassListCancel','getActorUnlockedClasses','_subject','isAlive','setTempActor','levelUpGainSkillPoints','_animations','1134522sgxyYi','multiclasses','setMulticlassTiers','EnemyClassPoints','pagedown','_ClassChangeSystem_preventLevelUpGain','removeClassChangeTierRestriction','Limit','addMulticlassTiers','gainRewardsJobPoints','resetFontSettings','iconWidth','param','colSpacing','multiclass','SystemShowClassChangeSystemMenu','_earnedJobPoints','_classChangeTierRestrictions','onBattleStart','battleMembers','_classId','split','ParamValueFontSize','TextColor','setBackgroundType','onClassListOk','actorClassCharacterIndex','refreshNoMenuImage','Game_Actor_getMenuImage','ConfirmAniSubclassOffsetY','Game_Actor_setFaceImage','_commandWindow','isClassAutoUnlockRequirementsMet','forceRemoveClassChangeAnimations','version','enabled','XParamRates','Game_Actor_setBattlePortrait','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x200;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','onMulticlassOk','deactivate','rightArrowWidth','AlwaysUnlocked','concat','Game_BattlerBase_addedSkillTypes','exp','isUseSkillsStatesCoreUpdatedLayout','\x5cC[16]%1:\x5cC[0]\x20\x5cFS[%3]%2','Weapon-%1-%2','Game_BattlerBase_sparam','setMainMenuClassChangeSystemEnabled','drawUpdatedParamValueDiff','getJobPoints','addCommand','releaseUnequippableItems','ClassUnlockForGlobal','VisuMZ_0_CoreEngine','learnSkill','Game_BattlerBase_isEquipAtypeOk','currentClass','characterName','stateRate','getBattlePortraitFilename','Class','Game_BattlerBase_attackStates','drawFadedItemBackground','Tiers','buttonAssistSlotWindowShift','drawText','pop','applyJobPoints','drawClassExpGauge','maxLvGaugeColor2','createClassListWindow','updateClassChangeAnimations','getClassChangeBackColor2','Game_Actor_characterIndex','BattleManager_makeRewards','getActorClassBattlePortrait','activate','ClassUnlockForActor','checkMulticlasses','members','createAnimationDummySprite','_classPoints','_tempActor','drawTextEx','drawParameterList','displayRewards','createKeyJS','expForClassLevel','isMainMenuCoreMenuImageOptionAvailable','optExtraExp','setCharacterImage','AutoUnlockRequirements','Window_ClassTier_ExtraJS','imageSmoothingEnabled','registerActorClassImages','isEquipWtypeOk','Window_ClassList_RectJS','classTierWindowRect','innerWidth','_context','jobPointsRate','currentExt','Game_Battler_gainSilentTp','Name','totalMulticlass','Game_BattlerBase_stateRate','length','drawUpdatedBeforeParamValue','isEquipAtypeOk','addClassChangeTierRestriction','getMulticlassAtTier','findMulticlassTier','Skill-%1-%2','reduce','classListWindowRect','gainMulticlassExp','getClassChangeAnimationID','svbattler','maintainLevels','ShowVictory','loadTitle2','resetTextColor','Window_ClassStatus_RectJS','processCursorMove','jobPointsVisible','Actor-%1-Class-%2','paintOpacity','ClassBattlerName','NUM','makeRewardsClassPoints','item','StartingClassPoints','ParamArrow','left','State-%1-%2','canShiftRemoveClass','MulticlassChangeActorClass','VisuMZ_2_SkillLearnSystem','actorParams','getClassIdWithName','drawActorJobPoints','tier','gainClassPoints','TargetGainClassPoints','setMainMenuClassChangeSystemVisible','DrawIcons','_priorityMenuImage','createCustomBackgroundImages','#%1','DisplayedResources','processShiftRemoveShortcut','HelpDescription','Window','ConvertParams','jobPointsTotal','ARRAYJSON','updateStatusWindow','maxLevel','description','Window_ClassTier_BgType','drawActorResources','functionName','drawClassPoints','multiclassId','ClassPointsRate','createJS','levelUpGainClassPoints','isSceneBattle','setup','filter','FullText','callUpdateHelp','Scene_Boot_onDatabaseLoaded','applyClassPoints','getActorClassFaceIndex','_classLevel','_highestTier','process_VisuMZ_ClassChangeSystem','getClassChangeTiersOnly','uiInputPosition','traits','getActorClassCharacterIndex','traitObjects','UserGainJobPoints','_classListWindow','MulticlassLowerLimit','TargetGainJobPoints','update','drawRightArrow','drawBigItemImage','PerAction','Classes','index','onPersonalOk','centerSprite','JobPoints','applyItemClassChangeSystemUserEffect','skillTypes','PLAY_ANI_FOR_UNASSIGN','params','unlockClass','1192nmELyw','expRate','AllowClearClassAni','getClassPoints','ARRAYSTR','TextFmt','_buttonAssistWindow','playOkSound','graphicType','AliveActors','contents','setHandler','sparam','lineHeight','dimColor2','TierOnlyClass'];_0x364e=function(){return _0x2e8cbb;};return _0x364e();}Window_ClassCommand[_0x5d7c39(0x30a)]=Object[_0x5d7c39(0x2a4)](Window_Command[_0x5d7c39(0x30a)]),Window_ClassCommand[_0x5d7c39(0x30a)][_0x5d7c39(0x1ef)]=Window_ClassCommand,Window_ClassCommand[_0x5d7c39(0x30a)][_0x5d7c39(0x23d)]=function(_0x5ad63e){const _0x13ca44=_0x5d7c39;Window_Command[_0x13ca44(0x30a)]['initialize']['call'](this,_0x5ad63e),this[_0x13ca44(0x375)](),this['deactivate']();},Window_ClassCommand[_0x5d7c39(0x30a)][_0x5d7c39(0x268)]=function(){const _0x3bd980=_0x5d7c39;return this[_0x3bd980(0x1e2)]()*0x3+0x8;},Window_ClassCommand[_0x5d7c39(0x30a)]['setActor']=function(_0x4dcf47){const _0x45de7f=_0x5d7c39;this['_actor']!==_0x4dcf47&&(this['_actor']=_0x4dcf47,this[_0x45de7f(0x21b)]());},Window_ClassCommand['prototype']['refresh']=function(){const _0xc6bfbf=_0x5d7c39;Window_Command['prototype']['refresh'][_0xc6bfbf(0x283)](this),this[_0xc6bfbf(0x33d)]();if(this['active'])this[_0xc6bfbf(0x376)]();},Window_ClassCommand[_0x5d7c39(0x30a)][_0x5d7c39(0x14a)]=function(_0x112c7e,_0xb3895a){const _0x446215=_0x5d7c39;_0xb3895a=_0xb3895a||0x1,this[_0x446215(0x1f9)](![]);const _0x48c443=ColorManager[_0x446215(0x207)](),_0x373a8a=ColorManager[_0x446215(0x1e3)](),_0x2ce4a9=_0x112c7e[_0x446215(0x398)]/0x2,_0x301a95=this[_0x446215(0x1e2)]();while(_0xb3895a--){this['contents'][_0x446215(0x30f)](_0x112c7e['x'],_0x112c7e['y'],_0x2ce4a9,_0x301a95,_0x373a8a,_0x48c443),this[_0x446215(0x1df)]['gradientFillRect'](_0x112c7e['x']+_0x2ce4a9,_0x112c7e['y'],_0x2ce4a9,_0x301a95,_0x48c443,_0x373a8a);}this[_0x446215(0x1f9)](!![]);},Window_ClassCommand[_0x5d7c39(0x30a)][_0x5d7c39(0x1c9)]=function(_0x2e6d33,_0x532740,_0x69f008){const _0x4e23ed=_0x5d7c39;if(!_0x532740)return;const _0x2e5f18=VisuMZ[_0x4e23ed(0x35b)][_0x4e23ed(0x276)],_0x178599=_0x532740[_0x4e23ed(0x2d4)];let _0x19f3aa='';if(_0x178599[_0x4e23ed(0x245)](_0x2e5f18[_0x4e23ed(0x368)]))_0x19f3aa=String(RegExp['$1']);else _0x178599[_0x4e23ed(0x245)](_0x2e5f18['bigPicture'])&&(_0x19f3aa=String(RegExp['$1']));if(_0x19f3aa){const _0x5920f9=ImageManager[_0x4e23ed(0xfa)](_0x19f3aa);_0x5920f9[_0x4e23ed(0x324)](this[_0x4e23ed(0x290)][_0x4e23ed(0xf7)](this,_0x2e6d33,_0x5920f9));}else this[_0x4e23ed(0x2db)](_0x532740,_0x69f008);},Window_ClassCommand[_0x5d7c39(0x30a)][_0x5d7c39(0x290)]=function(_0x24ab83,_0x3d9018){const _0x83c193=_0x5d7c39,_0x1b041b=this[_0x83c193(0x252)](_0x24ab83);let _0x2602fc=_0x1b041b['x']+this[_0x83c193(0x23e)](),_0x21483d=_0x1b041b['y']+0x4,_0x5321e4=_0x1b041b[_0x83c193(0x398)]-this[_0x83c193(0x23e)]()*0x2,_0x2cbe17=Math['min'](this[_0x83c193(0x1e2)]()*0x3,_0x1b041b[_0x83c193(0x237)])-0x4,_0x2b5741=Math[_0x83c193(0x1fe)](_0x5321e4,_0x2cbe17);const _0x105741=_0x2b5741/_0x3d9018['width'],_0x5663aa=_0x2b5741/_0x3d9018['height'],_0x25a43b=Math['min'](_0x105741,_0x5663aa,0x1);let _0x239baf=Math['round'](_0x3d9018[_0x83c193(0x398)]*_0x25a43b),_0x11b7e4=Math['round'](_0x3d9018[_0x83c193(0x237)]*_0x25a43b);_0x2602fc+=Math['round']((_0x2b5741-_0x239baf)/0x2),_0x21483d+=Math['round']((_0x2b5741-_0x11b7e4)/0x2);const _0xc74f42=_0x3d9018[_0x83c193(0x398)],_0x38ca62=_0x3d9018[_0x83c193(0x237)];this['contents']['_context'][_0x83c193(0x169)]=!![],this[_0x83c193(0x1df)][_0x83c193(0x351)](_0x3d9018,0x0,0x0,_0xc74f42,_0x38ca62,_0x2602fc,_0x21483d,_0x239baf,_0x11b7e4),this[_0x83c193(0x1df)]['_context'][_0x83c193(0x169)]=!![];},Window_ClassCommand[_0x5d7c39(0x30a)][_0x5d7c39(0x2db)]=function(_0x3c6494,_0x43caf7){const _0x282855=_0x5d7c39;if(!_0x3c6494)return;const _0x3a61be=_0x3c6494['iconIndex'];let _0x271e1f=_0x43caf7['x']+this[_0x282855(0x23e)](),_0x420d65=_0x43caf7['y']+0x4,_0x54282f=_0x43caf7['width']-this[_0x282855(0x23e)]()*0x2,_0x4495fb=Math[_0x282855(0x1fe)](this[_0x282855(0x1e2)]()*0x3,_0x43caf7[_0x282855(0x237)]),_0x56150d=Math[_0x282855(0x1fe)](_0x54282f,_0x4495fb);_0x56150d=Math[_0x282855(0x25f)](_0x56150d/ImageManager['iconWidth'])*ImageManager[_0x282855(0x114)],_0x420d65+=(_0x4495fb-_0x56150d)/0x2;const _0x487cbf=ImageManager['loadSystem']('IconSet'),_0x15064e=ImageManager['iconWidth'],_0x400c5d=ImageManager[_0x282855(0x27d)],_0x1cb4aa=_0x3a61be%0x10*_0x15064e,_0x30ea23=Math[_0x282855(0x25f)](_0x3a61be/0x10)*_0x400c5d;this['contents'][_0x282855(0x16f)][_0x282855(0x169)]=![],this[_0x282855(0x1df)]['blt'](_0x487cbf,_0x1cb4aa,_0x30ea23,_0x15064e,_0x400c5d,_0x271e1f,_0x420d65,_0x56150d,_0x56150d),this[_0x282855(0x1df)][_0x282855(0x16f)][_0x282855(0x169)]=!![];},Window_ClassCommand[_0x5d7c39(0x30a)][_0x5d7c39(0x2ac)]=function(){const _0x2a86ce=_0x5d7c39;return VisuMZ[_0x2a86ce(0x35b)][_0x2a86ce(0x2de)][_0x2a86ce(0x1a4)][_0x2a86ce(0x1a1)]||[];},Window_ClassCommand['prototype']['drawClassResources']=function(_0xebbf08,_0x53ee61){const _0x3e7756=_0x5d7c39,_0x4228ab=this[_0x3e7756(0x2ac)]();let _0x53938d=_0x53ee61['y']+this[_0x3e7756(0x1e2)](),_0x172ac6=0x0;const _0x46f11e=_0x53ee61['width']-this[_0x3e7756(0x23e)]()*0x2;for(const _0x2a1928 of _0x4228ab){if(_0x172ac6>=0x2)return;switch(_0x2a1928){case'AP':if(!Imported[_0x3e7756(0x195)])continue;let _0x37ef5=VisuMZ[_0x3e7756(0x22c)][_0x3e7756(0x2de)][_0x3e7756(0x248)];if(!_0x37ef5)continue;if(_0x37ef5['SharedResource'])continue;this[_0x3e7756(0xfe)](this[_0x3e7756(0x2ff)],_0xebbf08,_0x53ee61['x'],_0x53938d,_0x46f11e,_0x3e7756(0x325)),_0x53938d+=this[_0x3e7756(0x1e2)](),_0x172ac6++;break;case'CP':if(!Imported[_0x3e7756(0x250)])continue;let _0x1a2bb8=VisuMZ[_0x3e7756(0x35b)][_0x3e7756(0x2de)]['ClassPoints'];if(!_0x1a2bb8)continue;if(_0x1a2bb8[_0x3e7756(0x1e5)])continue;this[_0x3e7756(0x2f0)](this[_0x3e7756(0x2ff)],_0xebbf08,_0x53ee61['x'],_0x53938d,_0x46f11e,_0x3e7756(0x325)),_0x53938d+=this[_0x3e7756(0x1e2)](),_0x172ac6++;break;case'JP':if(!Imported[_0x3e7756(0x250)])continue;let _0x2441d7=VisuMZ[_0x3e7756(0x35b)]['Settings'][_0x3e7756(0x1cf)];if(!_0x2441d7)continue;if(_0x2441d7[_0x3e7756(0x1e5)])continue;this[_0x3e7756(0x198)](this[_0x3e7756(0x2ff)],_0xebbf08,_0x53ee61['x'],_0x53938d,_0x46f11e,'right'),_0x53938d+=this[_0x3e7756(0x1e2)](),_0x172ac6++;break;case'SP':if(!Imported[_0x3e7756(0x195)])continue;let _0x44aeaf=VisuMZ['SkillLearnSystem'][_0x3e7756(0x2de)][_0x3e7756(0x2ae)];if(!_0x44aeaf)continue;if(_0x44aeaf[_0x3e7756(0x1e5)])continue;this['drawActorSkillPoints'](this[_0x3e7756(0x2ff)],_0xebbf08,_0x53ee61['x'],_0x53938d,_0x46f11e,'right'),_0x53938d+=this[_0x3e7756(0x1e2)](),_0x172ac6++;break;}}};function Window_ClassTier(){const _0x4dd2e5=_0x5d7c39;this[_0x4dd2e5(0x23d)](...arguments);}Window_ClassTier[_0x5d7c39(0x30a)]=Object['create'](Window_ClassCommand[_0x5d7c39(0x30a)]),Window_ClassTier[_0x5d7c39(0x30a)]['constructor']=Window_ClassTier,Window_ClassTier['prototype']['initialize']=function(_0x1bbb89){const _0x2ae06c=_0x5d7c39;Window_ClassCommand[_0x2ae06c(0x30a)][_0x2ae06c(0x23d)][_0x2ae06c(0x283)](this,_0x1bbb89);},Window_ClassTier[_0x5d7c39(0x30a)][_0x5d7c39(0x27e)]=function(){const _0x13a7e7=_0x5d7c39;return this[_0x13a7e7(0x39f)];},Window_ClassTier[_0x5d7c39(0x30a)]['itemHeight']=function(){const _0x420be0=_0x5d7c39;let _0x59947c=Window_ClassCommand['prototype'][_0x420be0(0x268)][_0x420be0(0x283)](this);if(this[_0x420be0(0x2ff)]){const _0x32c862=this[_0x420be0(0x2ff)]['totalMulticlass']()||0x1;_0x59947c=Math['max'](_0x59947c,this[_0x420be0(0x1ee)]/_0x32c862);}return _0x59947c;},Window_ClassTier[_0x5d7c39(0x30a)][_0x5d7c39(0x376)]=function(){const _0x371232=_0x5d7c39;if(this[_0x371232(0x256)]){if(this[_0x371232(0x171)]()){const _0x211c18=VisuMZ[_0x371232(0x35b)]['Settings'][_0x371232(0x341)];if(!_0x211c18)return;const _0x3a8d8f=_0x211c18[this[_0x371232(0x171)]()-0x1];if(!_0x3a8d8f)return;this['_helpWindow'][_0x371232(0x37b)](_0x3a8d8f[_0x371232(0x1a3)]);}else this['_helpWindow'][_0x371232(0x37b)]('');}},Window_ClassTier[_0x5d7c39(0x30a)][_0x5d7c39(0x2cd)]=function(){const _0x44985a=_0x5d7c39;if(!this[_0x44985a(0x2ff)])return;const _0xf824a5=this['_actor'][_0x44985a(0x174)](),_0x2671cd=VisuMZ[_0x44985a(0x35b)][_0x44985a(0x2de)][_0x44985a(0x341)];for(let _0x31d0dc=0x0;_0x31d0dc<_0xf824a5;_0x31d0dc++){const _0x5b00fe=_0x2671cd[_0x31d0dc];if(!_0x5b00fe)continue;const _0x3753c6=_0x5b00fe[_0x44985a(0x173)],_0x51bdfd=_0x31d0dc+0x1,_0x13e37e=this[_0x44985a(0x38c)](_0x51bdfd);this[_0x44985a(0x13e)](_0x3753c6,_0x44985a(0x199),_0x13e37e,_0x51bdfd);}},Window_ClassTier[_0x5d7c39(0x30a)][_0x5d7c39(0x38c)]=function(_0x35ae19){const _0x56d28c=_0x5d7c39;if(this[_0x56d28c(0x2ff)]['isClassChangeTierRestricted'](_0x35ae19))return![];return _0x35ae19>0x0;},Window_ClassTier[_0x5d7c39(0x30a)]['drawItem']=function(_0x3563c4){const _0x87974d=_0x5d7c39;if(!this['_actor'])return;const _0x4154d2=this[_0x87974d(0x252)](_0x3563c4),_0x1d8e2d=this[_0x87974d(0x20c)][_0x3563c4]['ext']||0x1,_0x4c86f0=this[_0x87974d(0x2ff)][_0x87974d(0x17a)](_0x1d8e2d),_0x22f130=_0x4c86f0?_0x4c86f0['id']:0x0,_0x5b2357=VisuMZ[_0x87974d(0x35b)][_0x87974d(0x2de)]['Multiclass'];if(!_0x5b2357)return;const _0x7058f2=_0x5b2357[_0x1d8e2d-0x1];if(!_0x7058f2)return;let _0x5fe0e=_0x4154d2['x'],_0x34dc43=_0x4154d2['y'],_0x13029b=_0x4154d2[_0x87974d(0x398)]-this[_0x87974d(0x23e)]()*0x2,_0x17838c=_0x4154d2['height'],_0x81ade9=Math[_0x87974d(0x1fe)](_0x13029b,_0x17838c,this[_0x87974d(0x1e2)]()*0x3);_0x81ade9=Math['floor'](_0x81ade9/ImageManager[_0x87974d(0x114)])*ImageManager[_0x87974d(0x114)],_0x5fe0e+=_0x81ade9+this[_0x87974d(0x23e)]()*0x4,this[_0x87974d(0x113)](),this[_0x87974d(0x185)](),this[_0x87974d(0x14a)](_0x4154d2),this[_0x87974d(0x1f9)](this['isEnabled'](_0x1d8e2d)),this['drawBigItemImage'](_0x3563c4,_0x4c86f0,_0x4154d2),this[_0x87974d(0x313)](ColorManager[_0x87974d(0x2ad)](_0x7058f2[_0x87974d(0x120)])),this['drawText'](_0x7058f2['Name'],_0x4154d2['x'],_0x4154d2['y'],_0x4154d2['width'],_0x87974d(0x21c)),this['resetTextColor']();if(!_0x4c86f0){this[_0x87974d(0x1f9)](![]);const _0x2a953d=Math[_0x87974d(0x23c)](_0x4154d2['y']+this[_0x87974d(0x1e2)]()+(_0x4154d2['height']-this['lineHeight']()*0x2)/0x2);this[_0x87974d(0x14d)](TextManager['classChange_multiclass_noClass'],_0x4154d2['x'],_0x2a953d,_0x4154d2[_0x87974d(0x398)],_0x87974d(0x21c));return;}_0x34dc43+=this[_0x87974d(0x1e2)]();let _0x46fe3f=_0x4c86f0[_0x87974d(0x385)];_0x46fe3f=_0x46fe3f[_0x87974d(0x202)](/\x1I\[(\d+)\]/gi,''),_0x46fe3f=_0x46fe3f['replace'](/\\I\[(\d+)\]/gi,''),this[_0x87974d(0x14d)](_0x46fe3f,_0x5fe0e,_0x34dc43,_0x4154d2['width']-_0x5fe0e),_0x34dc43+=this['lineHeight'](),this['drawClassLevel'](this[_0x87974d(0x2ff)],_0x22f130,_0x5fe0e,_0x34dc43-0x4),_0x34dc43+=this[_0x87974d(0x1e2)](),this[_0x87974d(0x20a)](_0x22f130,_0x4154d2),this[_0x87974d(0x280)](_0x22f130,_0x1d8e2d,_0x7058f2,_0x4154d2);},Window_ClassTier['prototype']['drawExtraContents']=function(){const _0x2137ca=_0x5d7c39,_0x218727=VisuMZ[_0x2137ca(0x35b)][_0x2137ca(0x2de)][_0x2137ca(0x1a4)][_0x2137ca(0x168)];if(_0x218727){_0x218727['apply'](this,arguments);return;}const _0x1340af=arguments[0x0],_0x1b4681=arguments[0x1],_0x4500c4=arguments[0x2],_0x31a278=arguments[0x3],_0x4b7d33=$dataClasses[_0x1340af],_0xbccdde=Imported[_0x2137ca(0x29b)],_0x58dca3=!![],_0x36e848=0x16;let _0x3ef44f=_0x31a278['x']+this['itemPadding']()*0x4,_0x2725da=_0x31a278['y']+this[_0x2137ca(0x1e2)]()*3.25,_0x6c84b8=_0x31a278[_0x2137ca(0x398)]-this[_0x2137ca(0x23e)]()*0x8;if(_0x4500c4[_0x2137ca(0x34d)]&&_0x2725da+this[_0x2137ca(0x1e2)]()<=_0x31a278['y']+_0x31a278[_0x2137ca(0x237)]){let _0x48bd65=_0x4b7d33[_0x2137ca(0x1c0)][_0x2137ca(0x1b5)](_0x1d659a=>_0x1d659a[_0x2137ca(0x220)]===Game_BattlerBase[_0x2137ca(0x2c2)])[_0x2137ca(0x299)](_0x36a963=>$dataSystem[_0x2137ca(0x1d1)][_0x36a963[_0x2137ca(0x253)]])[_0x2137ca(0x1f6)](',\x20'),_0x6c8803=_0x2137ca(0x138)[_0x2137ca(0x233)](TextManager[_0x2137ca(0x240)],_0x48bd65,_0x36e848||0x16);if(_0x58dca3)_0x6c8803=_0x6c8803[_0x2137ca(0x202)](/\\I\[(\d+)\]/gi,'');if(_0xbccdde)_0x6c8803=_0x2137ca(0x249)+_0x6c8803;this[_0x2137ca(0x15f)](_0x6c8803,_0x3ef44f,_0x2725da,_0x6c84b8),_0x2725da+=this[_0x2137ca(0x1e2)]();}if(_0x4500c4['EquipWeapons']&&_0x2725da+this[_0x2137ca(0x1e2)]()<=_0x31a278['y']+_0x31a278[_0x2137ca(0x237)]){let _0x1bd4a4=_0x4b7d33[_0x2137ca(0x1c0)]['filter'](_0x575d66=>_0x575d66[_0x2137ca(0x220)]===Game_BattlerBase[_0x2137ca(0x270)])[_0x2137ca(0x299)](_0x1136e9=>$dataSystem[_0x2137ca(0x292)][_0x1136e9[_0x2137ca(0x253)]])[_0x2137ca(0x1f6)](',\x20'),_0x35462d=_0x2137ca(0x138)[_0x2137ca(0x233)](TextManager['weapon'],_0x1bd4a4,_0x36e848||0x16);if(_0x58dca3)_0x35462d=_0x35462d[_0x2137ca(0x202)](/\\I\[(\d+)\]/gi,'');if(_0xbccdde)_0x35462d=_0x2137ca(0x249)+_0x35462d;this[_0x2137ca(0x15f)](_0x35462d,_0x3ef44f,_0x2725da,_0x6c84b8),_0x2725da+=this['lineHeight']();}if(_0x4500c4[_0x2137ca(0x1f0)]&&_0x2725da+this[_0x2137ca(0x1e2)]()<=_0x31a278['y']+_0x31a278[_0x2137ca(0x237)]){let _0x8a1de5=_0x4b7d33[_0x2137ca(0x1c0)]['filter'](_0x26958c=>_0x26958c[_0x2137ca(0x220)]===Game_BattlerBase[_0x2137ca(0x346)])[_0x2137ca(0x299)](_0x1fd2ac=>$dataSystem['armorTypes'][_0x1fd2ac[_0x2137ca(0x253)]])[_0x2137ca(0x1f6)](',\x20'),_0x395567='\x5cC[16]%1:\x5cC[0]\x20\x5cFS[%3]%2'[_0x2137ca(0x233)](TextManager['armor'],_0x8a1de5,_0x36e848||0x16);if(_0x58dca3)_0x395567=_0x395567[_0x2137ca(0x202)](/\\I\[(\d+)\]/gi,'');if(_0xbccdde)_0x395567=_0x2137ca(0x249)+_0x395567;this[_0x2137ca(0x15f)](_0x395567,_0x3ef44f,_0x2725da,_0x6c84b8),_0x2725da+=this[_0x2137ca(0x1e2)]();}},Window_ClassTier[_0x5d7c39(0x30a)][_0x5d7c39(0x187)]=function(){const _0x7f3574=_0x5d7c39;Window_ClassCommand[_0x7f3574(0x30a)][_0x7f3574(0x187)][_0x7f3574(0x283)](this),this[_0x7f3574(0x227)]();},Window_ClassTier[_0x5d7c39(0x30a)][_0x5d7c39(0x227)]=function(){const _0x292a4d=_0x5d7c39;if(!this[_0x292a4d(0x30e)]())return;if(!this[_0x292a4d(0x2ff)])return;Input[_0x292a4d(0x383)](_0x292a4d(0x296))&&(this[_0x292a4d(0x2ff)]&&(this[_0x292a4d(0x193)](this[_0x292a4d(0x1cc)]())?(this[_0x292a4d(0x1a2)](),this[_0x292a4d(0x376)]()):this[_0x292a4d(0x247)]()));},Window_ClassTier[_0x5d7c39(0x30a)][_0x5d7c39(0x30e)]=function(){const _0x6a805d=_0x5d7c39;if(!this[_0x6a805d(0x2f8)])return![];if(!VisuMZ[_0x6a805d(0x35b)][_0x6a805d(0x2de)][_0x6a805d(0x1a4)][_0x6a805d(0x314)])return![];return!![];},Window_ClassTier[_0x5d7c39(0x30a)]['canShiftRemoveClass']=function(_0x152da4){const _0x2a0d2d=_0x5d7c39;if(!this[_0x2a0d2d(0x2ff)])return;const _0x3b2b98=this['index']()+0x1;if(_0x3b2b98<=0x1)return![];if(this[_0x2a0d2d(0x2ff)]['isClassChangeTierRestricted'](_0x3b2b98))return![];if(!this[_0x2a0d2d(0x2ff)]['getMulticlassAtTier'](_0x3b2b98))return![];return!![];;},Window_ClassTier[_0x5d7c39(0x30a)][_0x5d7c39(0x1a2)]=function(){const _0x46f631=_0x5d7c39;SoundManager['playClassChange'](),this[_0x46f631(0x2ff)][_0x46f631(0x1fc)](0x0,this[_0x46f631(0x1cc)]()+0x1),this['refresh'](),SceneManager[_0x46f631(0x332)][_0x46f631(0x235)][_0x46f631(0x21b)]();};function Window_ClassList(){const _0x155815=_0x5d7c39;this[_0x155815(0x23d)](...arguments);}Window_ClassList['prototype']=Object[_0x5d7c39(0x2a4)](Window_ClassCommand[_0x5d7c39(0x30a)]),Window_ClassList['prototype'][_0x5d7c39(0x1ef)]=Window_ClassList,Window_ClassList[_0x5d7c39(0x30a)][_0x5d7c39(0x23d)]=function(_0x34f222){const _0x3f8509=_0x5d7c39;this[_0x3f8509(0x32e)]=0x1,Window_ClassCommand[_0x3f8509(0x30a)][_0x3f8509(0x23d)][_0x3f8509(0x283)](this,_0x34f222);},Window_ClassList[_0x5d7c39(0x30a)][_0x5d7c39(0x1dc)]=function(){SoundManager['playClassChange']();},Window_ClassList[_0x5d7c39(0x30a)]['setStatusWindow']=function(_0x5d488b){const _0x5dedfb=_0x5d7c39;this['_statusWindow']=_0x5d488b,this[_0x5dedfb(0x1b7)]();},Window_ClassList[_0x5d7c39(0x30a)]['updateHelp']=function(){const _0x149751=_0x5d7c39;this[_0x149751(0x256)]&&(this[_0x149751(0x171)]()?this[_0x149751(0x256)][_0x149751(0x36d)](this['currentExt']()):this[_0x149751(0x256)][_0x149751(0x37b)](TextManager[_0x149751(0xfc)])),this[_0x149751(0x2ff)]&&this[_0x149751(0x235)]&&this[_0x149751(0x1a8)]();},Window_ClassList[_0x5d7c39(0x30a)]['updateStatusWindow']=function(){const _0x5ded6e=_0x5d7c39,_0x23b3c5=this[_0x5ded6e(0x171)](),_0x56af69=JsonEx[_0x5ded6e(0x399)](this[_0x5ded6e(0x2ff)]);_0x56af69[_0x5ded6e(0x15e)]=!![],_0x23b3c5!==this['_actor'][_0x5ded6e(0x144)]()&&(_0x23b3c5?_0x56af69[_0x5ded6e(0x1fc)](_0x23b3c5['id'],this[_0x5ded6e(0x32e)]):_0x56af69[_0x5ded6e(0x1fc)](0x0,this['_tier'])),this['_statusWindow'][_0x5ded6e(0x106)](_0x56af69);},Window_ClassList['prototype'][_0x5d7c39(0x36c)]=function(_0x454ae0){const _0x33f158=_0x5d7c39;this['_tier']!==_0x454ae0&&(this[_0x33f158(0x32e)]=_0x454ae0,this[_0x33f158(0x21b)]());},Window_ClassList[_0x5d7c39(0x30a)][_0x5d7c39(0x2cd)]=function(){const _0x358564=_0x5d7c39;if(!this[_0x358564(0x2ff)])return;if(this[_0x358564(0x32e)]<=0x0)return;const _0x54e352=DataManager['getActorUnlockedClasses'](this['_actor']);for(const _0x15897c of _0x54e352){if(!_0x15897c)continue;let _0x329de2=_0x15897c[_0x358564(0x385)];_0x329de2=_0x329de2[_0x358564(0x202)](/\x1I\[(\d+)\]/gi,''),_0x329de2=_0x329de2['replace'](/\\I\[(\d+)\]/gi,'');const _0x36897b=this[_0x358564(0x38c)](_0x15897c);this['addCommand'](_0x329de2,_0x358564(0x209),_0x36897b,_0x15897c);}this['_tier']>0x1&&this['addCommand']('','classChange',!![],null);},Window_ClassList['ALLOW_SELECT_SAME_SUBCLASS']=VisuMZ[_0x5d7c39(0x35b)][_0x5d7c39(0x2de)][_0x5d7c39(0x20d)][_0x5d7c39(0x261)]??!![],Window_ClassList[_0x5d7c39(0x30a)]['isEnabled']=function(_0x59c8ec){const _0x544660=_0x5d7c39;if(this['_actor'][_0x544660(0x255)](this[_0x544660(0x32e)]))return![];if(this[_0x544660(0x32e)]>0x1&&_0x59c8ec===this[_0x544660(0x2ff)][_0x544660(0x144)]())return![];if(_0x59c8ec){const _0x1e8aa1=this[_0x544660(0x2ff)][_0x544660(0x17b)](_0x59c8ec['id']);if(_0x1e8aa1>0x0&&this[_0x544660(0x2ff)][_0x544660(0x255)](_0x1e8aa1))return![];const _0x39cb98=DataManager[_0x544660(0x1be)](_0x59c8ec);if(!_0x39cb98[_0x544660(0x2d5)](this['_tier']))return![];if(!Window_ClassList[_0x544660(0x359)]){const _0x4db1bd=this[_0x544660(0x2ff)][_0x544660(0x17a)](this['_tier']);if(_0x4db1bd===_0x59c8ec)return![];}}return this[_0x544660(0x32e)]>0x0;},Window_ClassList[_0x5d7c39(0x30a)]['drawItem']=function(_0x4d6558){const _0x3278f0=_0x5d7c39;if(!this[_0x3278f0(0x2ff)])return;const _0x27ed24=this[_0x3278f0(0x252)](_0x4d6558),_0x5b0b23=this[_0x3278f0(0x32e)],_0x711cff=this['_list'][_0x4d6558][_0x3278f0(0x25d)],_0x5e512e=_0x711cff?_0x711cff['id']:0x0,_0x1be98b=VisuMZ[_0x3278f0(0x35b)][_0x3278f0(0x2de)][_0x3278f0(0x341)];if(!_0x1be98b)return;const _0x58b1b2=_0x1be98b[_0x5b0b23-0x1];if(!_0x58b1b2)return;let _0x37da88=_0x27ed24['x'],_0x2ce70a=_0x27ed24['y'],_0x384ae5=_0x27ed24['width']-this[_0x3278f0(0x23e)]()*0x2,_0xb65c70=_0x27ed24[_0x3278f0(0x237)],_0x236513=Math[_0x3278f0(0x1fe)](_0x384ae5,_0xb65c70,this[_0x3278f0(0x1e2)]()*0x3);_0x236513=Math[_0x3278f0(0x25f)](_0x236513/ImageManager[_0x3278f0(0x114)])*ImageManager['iconWidth'],_0x37da88+=_0x236513+this[_0x3278f0(0x23e)]()*0x4,this[_0x3278f0(0x113)](),this[_0x3278f0(0x185)](),this[_0x3278f0(0x14a)](_0x27ed24),this['changePaintOpacity'](this[_0x3278f0(0x38c)](_0x711cff));if(!_0x711cff){this[_0x3278f0(0x1f9)](![]);const _0x501998=Math[_0x3278f0(0x23c)](_0x27ed24['y']+this['lineHeight']()+(_0x27ed24[_0x3278f0(0x237)]-this[_0x3278f0(0x1e2)]()*0x2)/0x2);this[_0x3278f0(0x14d)](TextManager[_0x3278f0(0x29e)],_0x27ed24['x'],_0x501998,_0x27ed24[_0x3278f0(0x398)],_0x3278f0(0x21c));return;}this[_0x3278f0(0x1c9)](_0x4d6558,_0x711cff,_0x27ed24);const _0x4564fa=this[_0x3278f0(0x2ff)][_0x3278f0(0x17b)](_0x5e512e);if(_0x4564fa>0x0){const _0x5d1d2a=_0x1be98b[_0x4564fa-0x1];_0x5d1d2a&&(this[_0x3278f0(0x313)](ColorManager[_0x3278f0(0x2ad)](_0x5d1d2a[_0x3278f0(0x120)])),this[_0x3278f0(0x14d)](_0x5d1d2a[_0x3278f0(0x173)],_0x27ed24['x'],_0x27ed24['y'],_0x27ed24['width'],_0x3278f0(0x21c)),this[_0x3278f0(0x185)]());}this[_0x3278f0(0x1f9)](this[_0x3278f0(0x38c)](_0x711cff)),_0x2ce70a+=this[_0x3278f0(0x1e2)]();let _0x2f8907=_0x711cff[_0x3278f0(0x385)];_0x2f8907=_0x2f8907[_0x3278f0(0x202)](/\x1I\[(\d+)\]/gi,''),_0x2f8907=_0x2f8907['replace'](/\\I\[(\d+)\]/gi,''),this['drawText'](_0x2f8907,_0x37da88,_0x2ce70a,_0x27ed24['width']-_0x37da88),_0x2ce70a+=this['lineHeight'](),this['drawClassLevel'](this['_actor'],_0x5e512e,_0x37da88,_0x2ce70a-0x4),_0x2ce70a+=this[_0x3278f0(0x1e2)](),this[_0x3278f0(0x20a)](_0x5e512e,_0x27ed24);};