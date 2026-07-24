// packmode: hard

GTCEuStartupEvents.registry('gtceu:material', event => {

	// === Helpers ===
	const elemDustFluid = (name, color, flags) => {
        event.create(name).dust().fluid().element(GTElements.get(name)).color(color).flags(flags);
    }
	const elemIngot = (name, element, color, icon, blasting, flags) => {
        if (blasting.includes(blasting[0])){
            event.create(name).ingot().element(GTElements.get(element)).color(color).iconSet(icon).flags(flags).blastTemp(blasting[0], blasting[1], blasting[2], blasting[3]);
        } else {
            event.create(name).ingot().fluid().element(GTElements.get(element)).color(color).iconSet(icon).flags(flags);
        }
    }
	const elemIngotFluid = (name, color, icon, blasting, flags) => {
        if (blasting.includes(blasting[0])){
            event.create(name).ingot().fluid().element(GTElements.get(name)).color(color).iconSet(icon).flags(flags).blastTemp(blasting[0], blasting[1], blasting[2], blasting[3]);
        } else {
            event.create(name).ingot().fluid().element(GTElements.get(name)).color(color).iconSet(icon).flags(flags);
        }
    }
	const compIngot = (name, elements, color, icon, blasting, flags) => {
        if (blasting.includes(blasting[0])){
            event.create(name).ingot().components(elements).color(color).iconSet(icon).flags(flags).blastTemp(blasting[0], blasting[1], blasting[2], blasting[3]);
        } else {
            event.create(name).ingot().fluid().components(elements).color(color).iconSet(icon).flags(flags);
        }
    }
	const compDustIcon = (name, elements, color, icon, flags) => {
        event.create(name).dust().components(elements).color(color).iconSet(icon).flags(flags);
    }
	const compDust = (name, elements, color, flags) => {
        event.create(name).dust().components(elements).color(color).flags(flags);
    }
	const DustNoComp = (name, color, flags) => {
        event.create(name).dust().color(color).flags(flags);
    }
	const LiquidNoComp = (name, color, flags) => {
        event.create(name).fluid().color(color).flags(flags);
    }
	const compLiquid = (name, elements, color, flags) => {
        event.create(name).fluid().components(elements).color(color).flags(flags);
    }
	const compLiquidTemp = (name, heat, elements, color, flags) => {
        event.create(name).liquid(new GTFluidBuilder().temperature(heat)).components(elements).color(color).flags(flags);
    }
	const compGem = (name, elements, color, icon, flags) => {
        event.create(name).gem().components(elements).color(color).iconSet(icon).flags(flags);
    }
	const conductorSuper = (name, elements, color, blasting, cable, rotorstat) => {
		event.create(name).ingot().fluid().components(elements).color(color).iconSet(SHINY).flags(foil, gear, long_rod, plates, rod, rotor, small_gear, ring, frame, fine_wire)
			.blastTemp(blasting[0], blasting[1], blasting[2], blasting[3]).cableProperties(cable[0], cable[1], cable[2], cable[3]).rotorStats(rotorstat[0], rotorstat[1], rotorstat[2], rotorstat[3]);
    }

	// === Early Game ===
	compIngot('pig_iron','1x iron',0x8E8385,DULL,[],[foil, gear, long_rod, plates, rod, rotor, small_gear, ring, frame, bolt_and_screw, no_decomp, no_smelt])

	event.create('flisnt')
		.color(0x888B8C)
		.toolStats(ToolProperty.Builder.of(1, 1, 96, 1, [
			GTToolType.SAW,
			GTToolType.HARD_HAMMER,
			GTToolType.PICKAXE,
			GTToolType.SHOVEL,
			GTToolType.AXE,
			GTToolType.SWORD,
			GTToolType.KNIFE,
			GTToolType.FILE,
			GTToolType.SCYTHE
		]).build());

	event.create('coke_clay')
		.dust()
		.color(0xD7D2AA)
		.secondaryColor(0xA09C78);

	compIngot('crude_cast_iron','1x pig_iron',0x3D413F,DULL,[],[no_decomp, no_smelt])

	event.create('crude_wrought_iron')
		.ingot()
		.liquid(new GTFluidBuilder().temperature(1700))
		.components('1x wrought_iron')
		.color(0x7A6E69)
		.iconSet(DULL)
		.flags(no_decomp, no_smelt);

	event.create('cast_iron')
        .ingot(1)
		.liquid()
        .components('18x crude_cast_iron', '1x bismuth', '2x copper')
        .color(0x696E6C)
		.secondaryColor(0x4C5052)
        .iconSet(METALLIC)
		.blastTemp(1450, 'low', VA('mv'), 1200)
        .flags(not_alloy, foil, gear, long_rod, plates, rod, rotor, small_gear, ring, frame, bolt_and_screw, no_decomp, no_smelt);

	// === Resource Gen Extension ===
	compDustIcon('metallic_ore_sludge', ['8x pentlandite', '5x gold', '2x silver'],0xA4AC72,METALLIC,no_decomp)
	LiquidNoComp('raw_ore_concentrate',0x7C8478,no_decomp);
	LiquidNoComp('raw_ore_residue',0x908784,no_decomp);
	LiquidNoComp('diluted_drilling_formula',0xDFD2A0,no_decomp);
	LiquidNoComp('concentrate_drilling_formula',0xEDDC9E,no_decomp);
	LiquidNoComp('residue_drilling_formula',0xE2CF84,no_decomp);
	LiquidNoComp('slurry_drilling_formula',0xDCD0A0,no_decomp);
	LiquidNoComp('poor_mixture_drilling_formula',0xCCC29C,no_decomp);
	LiquidNoComp('rich_mixture_drilling_formula',0xB9B08B,no_decomp);
	compLiquidTemp('molten_waste',1170,'mystery',0x806861,no_decomp);
	compLiquidTemp('cooled_molten_waste',515,'mystery',0x6D5852,no_decomp);
	compLiquidTemp('impure_molten_ore_mixture',2190,'mystery',0x746E6D, no_decomp);
	compLiquidTemp('pure_molten_ore_mixture',2635,'mystery',0x5C5451, no_decomp);
	compLiquidTemp('cooled_molten_bauxite_ore', 480, ['1x bauxite'], 0x9B9B83, [no_decomp]);
    compLiquidTemp('cooled_molten_pitchblende_ore', 480, ['1x pitchblende'], 0x95A96F, [no_decomp]);
    compLiquidTemp('cooled_molten_molybdenite_ore', 480, ['1x molybdenite'], 0xA6B38D, [no_decomp]);
    compLiquidTemp('cooled_molten_ilmenite_ore', 480, ['1x ilmenite'], 0xAE9279, [no_decomp]);
    compLiquidTemp('cooled_molten_tungstate_ore', 480, ['1x tungstate'], 0x848E97, [no_decomp]);
    compLiquidTemp('cooled_molten_bastnasite_ore', 480, ['1x bastnasite'], 0x80766F, [no_decomp]);
    compLiquidTemp('cooled_molten_cooperite_ore', 480, ['1x cooperite'], 0x8B8A76, [no_decomp]);

	// === Rare Earth Line Extension ===
	compLiquid('acid_leached_rare_earth_sludge', '1x mystery', 0x7D4E41, no_decomp);
	compLiquid('fractionated_rare_earth_slurry', '1x mystery', 0x938376, no_decomp);
	compLiquid('low_density_rare_earth_residue', '1x mystery', 0x7A6C57, no_decomp);
	compLiquid('moderate_density_rare_earth_residue', '1x mystery', 0x7A6442, no_decomp);
	compLiquid('high_density_rare_earth_residue', '1x mystery', 0x5A4524, no_decomp);
	compLiquid('rare_earth_waste_residue', '1x mystery', 0x83716F, no_decomp);
	compDust('unrefined_neodymium', ['1x neodymium', '1x mystery'], 0x5E5661, no_decomp);
	compDust('neodymium_iii_oxide', ['2x neodymium', '3x oxygen'], 0x6D6673, no_decomp);
	compDust('unrefined_lanthanum', ['1x lanthanum', '1x mystery'], 0x907B6F, no_decomp);
	compDust('lanthanum_oxide', ['2x lanthanum', '3x oxygen'], 0xB59482, no_decomp);
	compDust('lanthanum_iii_chloride', ['1x lanthanum', '3x chlorine'], 0xBC9F84, no_decomp);
	compDust('unrefined_samarium', ['1x samarium', '1x mystery'], 0x828066, no_decomp);
	compDust('samarium_iii_chloride', ['1x samarium', '3x chlorine'], 0x959374, no_decomp);
	compDust('unrefined_promethium', ['1x promethium', '1x mystery'], 0x7F7184, no_decomp);
	compDust('promethium_iii_oxide', ['2x promethium', '3x oxygen'], 0x8F7F94, no_decomp);
	compDust('unrefined_holmium', ['1x holmium', '1x mystery'], 0x81868C, no_decomp);
	compDust('holmium_iii_fluoride', ['1x holmium', '3x fluorine'], 0x99966E, no_decomp);
	elemIngot('magnetic_holmium', 'holmium', 0xCEC870, MAGNETIC, [], [rod, long_rod, magnetic]);
	compDust('unrefined_yttrium', ['1x yttrium', '1x mystery'], 0x404143, no_decomp);
	compDust('yttrium_carbonate', ['2x yttrium', '3x carbon', '9x oxygen'], 0x48504D, no_decomp);
	compDust('yttrium_chloride', ['1x yttrium', '3x chlorine'], 0x393C3B, no_decomp);
	compDust('unrefined_dysprosium', ['1x dysprosium', '1x mystery'], 0x6B6F73, no_decomp);
	compDust('dysprosium_iii_fluoride', ['1x dysprosium', '3x fluorine'], 0x54585C, no_decomp);

	// === Plat Line Extension ===
	compLiquid('platinum_group_leach_liquor', '1x mystery', 0x6F96A0, no_decomp);
	compLiquid('platinum_group_acid_residue', '1x mystery', 0x555555, no_decomp);
	compDust('platinum_group_leach_residue', '1x mystery', 0x444444, no_decomp);
	compDust('platinum_chloride', ['1x platinum', '6x chlorine'], 0xB4C6CF, no_decomp);
	compDust('palladium_chloride', ['1x palladium', '4x chlorine'], 0xC8A9AD, no_decomp);
	compGem('platinum_salt', ['4x nitrogen', '12x hydrogen', '1x platinum', '6x chlorine'], 0xE3E3CD, RUBY, no_decomp);
	compGem('palladium_salt', ['5x nitrogen', '15x hydrogen','1x palladium', '4x chlorine'], 0xD6B3BB, RUBY, no_decomp);
	compDust('mixed_inert_metal_ash', ['1x rhodium', '1x ruthenium', '1x mystery'], 0x9982A2, no_decomp);
	compLiquid('ruthenium_sulfate', ['1x ruthenium', '6x sulfate'], 0x5CB8F6, no_decomp);
	compLiquid('inert_metal_sulfate_solution', ['1x rhodium_sulfate', '1x ruthenium_sulfate'], 0xA985BF, no_decomp);
	compDust('rhodium_iii_hydroxide', ['1x rhodium', '3x hydroxide'], 0xD174B6, no_decomp);
	compDust('rhodium_iii_oxide', ['2x rhodium', '3x oxygen'], 0xCE498F, no_decomp);
	compDust('ruthenium_complex', ['1x ruthenium', '6x ammonia'], 0x88D2FC, no_decomp);
	compDust('impure_ruthenium', ['1x ruthenium','1x mystery'], 0x63C0F4, no_decomp);
	compLiquid('rarest_metal_slurry', ['1x iridium', '1x osmium', '1x mystery'], 0x3A78B0, no_decomp);
    event.create('sodium_osmate').gem().fluid().components(['2x sodium', '1x osmium', '4x oxygen']).color(0x4F70D9).iconSet(GEM_HORIZONTAL).flags(no_decomp);
	compDust('osmium_iv_hydroxide', ['1x osmium', '4x hydroxide'], 0x4866C9, no_decomp);
	compDust('osmium_dioxide', ['1x osmium', '2x oxygen'], 0x2C49AA, no_decomp);
	compDust('iridium_rich_residue', ['1x iridium', '1x mystery', '1x oxygen'], 0x418875, no_decomp);
	compDust('iridium_iv_chloride', ['1x iridium', '4x chlorine'], 0x46A593, no_decomp);
	compDust('iridium_hydroxide', ['1x iridium', '3x hydroxide'], 0x50B7A4, no_decomp);
	compDust('iridium_oxide', ['1x iridium', '2x oxygen'], 0x3C9D88, no_decomp);

});
	