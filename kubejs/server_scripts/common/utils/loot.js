LootJS.modifiers((event) => {
    
    const abydosTempleTomb = [
        {loot: 'minecraft:gold_block', chance: .1},
        {loot: 'minecraft:enchanted_golden_apple', chance: .05},
        {loot: 'start_core:bacteria_dormant', chance: .15},
        {loot: 'kubejs:runic_tablet_1', chance: .08},
        {loot: 'kubejs:runic_tablet_2', chance: .08},
        {loot: 'kubejs:runic_tablet_3', chance: .08},
        {loot: 'kubejs:runic_tablet_4', chance: .08},
        {loot: 'kubejs:runic_tablet_5', chance: .08},
        {loot: 'kubejs:runic_tablet_6', chance: .08}
        ];
    abydosTempleTomb.forEach(templeLoot => {
        event
        .addLootTableModifier('sgjourney:chests/desert_pyramid_loot_room')
        .randomChance(templeLoot.chance)
        .addLoot(templeLoot.loot);
    });

    const abydosTempleSpawnerRoom = [
        {loot: 'sgjourney:naquadah_helmet', chance: .1},
        {loot: 'sgjourney:naquadah_chestplate', chance: .1},
        {loot: 'sgjourney:naquadah_leggings', chance: .1},
        {loot: 'sgjourney:naquadah_boots', chance: .1},
        {loot: 'sgjourney:naquadah_sword', chance: .1},
        {loot: 'sgjourney:naquadah_pickaxe', chance: .1},
        {loot: 'sgjourney:naquadah_axe', chance: .1},
        {loot: 'sgjourney:naquadah_shovel', chance: .1},
        {loot: 'sgjourney:naquadah_alloy', chance: .1},
        {loot: '2x gtceu:naquadah_alloy_ingot', chance: .05},
        {loot: '3x gtceu:naquadah_alloy_ingot', chance: .02},
    ];
    abydosTempleSpawnerRoom.forEach(templeLoot => {
        event
        .addLootTableModifier('sgjourney:chests/desert_pyramid_challenge_room')
        .randomChance(templeLoot.chance)
        .addLoot(templeLoot.loot);
    });

    const nether = [
        'minecraft:chests/bastion_bridge', 'minecraft:chests/bastion_hoglin_stable', 'minecraft:chests/bastion_other', 'minecraft:chests/bastion_treasure', 'minecraft:chests/nether_bridge'
    ].forEach(loottable => {
        event
            .addLootTableModifier(loottable)
            .randomChance(.12)
            .addLoot('kubejs:nether_talisman');
    });

    event
        .addLootTableModifier('minecraft:chests/end_city_treasure')
            .randomChance(.12)
            .addLoot('kubejs:end_talisman');
    
});