// priority: 100
// Star Technology addon: gate OpenComputers CE behind GregTech voltage tiers.
//   Tier 1 (worst)   -> MV   |  Tier 2 (advanced) -> HV
//   Tier 3 (best)    -> EV   |  Tier 4 (CE extreme) -> IV
// Each tiered component's vanilla recipe is removed and replaced with a
// GregTech Assembler recipe that requires a circuit of the matching tier
// (the real gate) plus tier-appropriate GT materials, run at that voltage.

ServerEvents.recipes((event) => {
  const id = global.id;
  const OC = 'opencomputers:';

  // Per-tier material palette + assembler EU/t (plain integers, like the pack's own recipes).
  const TIERS = {
    LV: {
      circ: '#gtceu:circuits/lv', eut: 30, board: 'gtceu:phenolic_circuit_board',
      plate: 'gtceu:steel_plate', wire: 'gtceu:fine_tin_wire', cable: 'gtceu:tin_single_cable',
    },
    MV: {
      circ: '#gtceu:circuits/mv', eut: 120, board: 'gtceu:plastic_circuit_board',
      plate: 'gtceu:aluminium_plate', wire: 'gtceu:fine_copper_wire', cable: 'gtceu:copper_single_cable',
    },
    HV: {
      circ: '#gtceu:circuits/hv', eut: 480, board: 'gtceu:epoxy_circuit_board',
      plate: 'gtceu:stainless_steel_plate', wire: 'gtceu:fine_annealed_copper_wire', cable: 'gtceu:gold_single_cable',
    },
    EV: {
      circ: '#gtceu:circuits/ev', eut: 1920, board: 'gtceu:fiber_reinforced_circuit_board',
      plate: 'gtceu:titanium_plate', wire: 'gtceu:fine_aluminium_wire', cable: 'gtceu:aluminium_single_cable',
    },
    IV: {
      circ: '#gtceu:circuits/iv', eut: 7680, board: 'gtceu:multilayer_fiber_reinforced_circuit_board',
      plate: 'gtceu:naquadah_alloy_plate', wire: 'gtceu:fine_platinum_wire', cable: 'gtceu:platinum_single_cable',
    },
  };

  // Input counts + solder (mB) + duration per physical size.
  const SIZE = {
    small:  { b: 1, p: 1, w: 2, c: 1, solder: 72,  dur: 150 },
    medium: { b: 2, p: 2, w: 4, c: 2, solder: 144, dur: 200 },
    large:  { b: 3, p: 4, w: 6, c: 3, solder: 288, dur: 300 },
  };

  // [item, tierKey, size]
  const COMPONENTS = [
    // ---- Tier 1 -> MV ----
    ['case1', 'LV', 'large'], ['cpu1', 'MV', 'medium'], ['apu1', 'MV', 'medium'],
    ['graphicscard1', 'MV', 'medium'], ['hdd1', 'MV', 'medium'], ['ram1', 'MV', 'small'],
    ['ram2', 'MV', 'small'], ['componentbus1', 'MV', 'medium'], ['microcontrollercase1', 'MV', 'large'],
    ['dronecase1', 'MV', 'large'], ['cardcontainer1', 'MV', 'small'], ['datacard1', 'MV', 'small'],
    ['redstonecard1', 'MV', 'small'], ['wlancard1', 'MV', 'small'], ['screen1', 'MV', 'large'],
    ['hologram1', 'MV', 'medium'], ['upgradecontainer1', 'MV', 'small'], ['batteryupgrade1', 'MV', 'small'],
    ['databaseupgrade1', 'MV', 'small'], ['hoverupgrade1', 'MV', 'small'], ['server1', 'MV', 'large'],
    ['chip1', 'MV', 'small'],
    // ---- Tier 2 -> HV ----
    ['case2', 'MV', 'large'], ['cpu2', 'HV', 'medium'], ['apu2', 'HV', 'medium'],
    ['graphicscard2', 'HV', 'medium'], ['hdd2', 'HV', 'medium'], ['ram3', 'HV', 'small'],
    ['ram4', 'HV', 'small'], ['componentbus2', 'HV', 'medium'], ['microcontrollercase2', 'HV', 'large'],
    ['dronecase2', 'HV', 'large'], ['cardcontainer2', 'HV', 'small'], ['datacard2', 'HV', 'small'],
    ['redstonecard2', 'HV', 'small'], ['wlancard2', 'HV', 'small'], ['screen2', 'HV', 'large'],
    ['hologram2', 'HV', 'medium'], ['upgradecontainer2', 'HV', 'small'], ['batteryupgrade2', 'HV', 'small'],
    ['databaseupgrade2', 'HV', 'small'], ['hoverupgrade2', 'HV', 'small'], ['server2', 'HV', 'large'],
    ['chip2', 'HV', 'small'],
    // ---- Tier 3 -> EV ----
    ['case3', 'HV', 'large'], ['cpu3', 'EV', 'medium'], ['apu3', 'EV', 'medium'],
    ['graphicscard3', 'EV', 'medium'], ['hdd3', 'EV', 'medium'], ['ram5', 'EV', 'small'],
    ['ram6', 'EV', 'small'], ['componentbus3', 'EV', 'medium'], ['microcontrollercase3', 'EV', 'large'],
    ['dronecase3', 'EV', 'large'], ['cardcontainer3', 'EV', 'small'], ['datacard3', 'EV', 'small'],
    ['screen3', 'EV', 'large'], ['hologram3', 'EV', 'medium'], ['upgradecontainer3', 'EV', 'small'],
    ['batteryupgrade3', 'EV', 'small'], ['databaseupgrade3', 'EV', 'small'], ['server3', 'EV', 'large'],
    ['chip3', 'EV', 'small'], ['robot', 'EV', 'large'], ['drone', 'EV', 'medium'],
    ['microcontroller', 'EV', 'medium'],
    // ---- Tier 4 -> IV (Community Edition "extreme" tier) ----
    ['case4', 'EV', 'large'], ['cpu4', 'IV', 'medium'], ['graphicscard4', 'IV', 'medium'],
    ['hdd4', 'IV', 'medium'], ['ram7', 'IV', 'small'], ['ram8', 'IV', 'small'],
    ['componentbus4', 'IV', 'medium'], ['screen4', 'IV', 'large'], ['server4', 'IV', 'large'],
    ['chip4', 'IV', 'small'],
  ];

  // Many components share the same tier+size input palette, so GregTech would
  // treat them as duplicate assembler recipes and keep only one. We disambiguate
  // each recipe with a unique programmed-circuit number within its input group
  // (EMI/JEI shows the required circuit number to the player).
  const circuitCounter = {};

  let count = 0;
  COMPONENTS.forEach(([item, tierKey, size]) => {
    const t = TIERS[tierKey];
    const s = SIZE[size];
    const out = OC + item;
    const key = tierKey + '_' + size;
    const cn = (circuitCounter[key] = (circuitCounter[key] || 0) + 1);
    try {
      // Remove the cheap vanilla-material recipe.
      event.remove({ output: out });

      // GregTech Assembler recipe: tier circuit gate + a unique programmed circuit per group.
      event.recipes.gtceu
        .assembler(id('oc_' + item))
        .itemInputs(
          t.circ,
          s.b + 'x ' + t.board,
          s.p + 'x ' + t.plate,
          s.w + 'x ' + t.wire,
          s.c + 'x ' + t.cable
        )
        .circuit(cn)
        .inputFluids('gtceu:soldering_alloy ' + s.solder)
        .itemOutputs(out)
        .duration(s.dur)
        .EUt(t.eut);
      count++;
    } catch (err) {
      console.error('[StarT-OC] Failed to gate ' + out + ': ' + err);
    }
  });

  // The Creative Computer Case (best slots) is made energy-consuming by the
  // startechenergycase addon; give it a premium, craftable top-tier recipe.
  // Gated at ZPM tier (two steps above the Tier 4 = IV case): an upgrade of
  // the Tier 4 case with ZPM circuitry and reinforced materials.
  try {
    event.remove({ output: 'opencomputers:casecreative' });
    event.recipes.gtceu
      .assembler(id('oc_casecreative'))
      .itemInputs(
        '#gtceu:circuits/zpm',
        'opencomputers:case4',
        '8x gtceu:naquadah_alloy_plate',
        '12x gtceu:fine_platinum_wire',
        '4x gtceu:platinum_single_cable'
      )
      .circuit(16)
      .inputFluids('gtceu:soldering_alloy 1152')
      .itemOutputs('opencomputers:casecreative')
      .duration(1000)
      .EUt(122880);
    count++;
  } catch (err) {
    console.error('[StarT-OC] Failed to gate casecreative: ' + err);
  }

  // --- 9-level addon progression (levels 5-9), distributed across GregTech
  // voltage tiers LuV -> ZPM -> UV -> UHV -> UEV. Each level chains from the
  // previous one and uses a higher circuit tier + more hard materials + more
  // craft power (EUt). CPUs also get a higher call budget => more work/tick =>
  // higher running energy use. Level 9 = 4x the mod's Tier 4. ('OC' = the OC ns)
  const EUT = { luv: 30720, zpm: 122880, uv: 491520, uhv: 1966080, uev: 7864320 };
  const chain = (rid, tier, prevItem, out, circ, plates, wires, solder) => {
    try {
      event.recipes.gtceu
        .assembler(id(rid))
        .itemInputs(
          '2x #gtceu:circuits/' + tier,
          prevItem,
          plates + 'x gtceu:naquadah_alloy_plate',
          wires + 'x gtceu:fine_platinum_wire'
        )
        .circuit(circ)
        .inputFluids('gtceu:soldering_alloy ' + solder)
        .itemOutputs(out)
        .duration(400)
        .EUt(EUT[tier]);
      count++;
    } catch (err) {
      console.error('[StarT-OC] Failed to add ' + out + ': ' + err);
    }
  };

  const SE = 'startechenergycase:';
  // CPU chain: cpu4 -> L5(LuV) -> L6(ZPM) -> L7(UV) -> L8(UHV) -> L9=advanced_processor(UEV)
  chain('oc_cpu_luv', 'luv', 'opencomputers:cpu4',    SE + 'cpu_luv',            20, 4,  8,  288);
  chain('oc_cpu_zpm', 'zpm', SE + 'cpu_luv',          SE + 'cpu_zpm',            21, 6,  10, 360);
  chain('oc_cpu_uv',  'uv',  SE + 'cpu_zpm',          SE + 'cpu_uv',             22, 8,  12, 432);
  chain('oc_cpu_uhv', 'uhv', SE + 'cpu_uv',           SE + 'cpu_uhv',            23, 10, 14, 504);
  chain('oc_cpu_uev', 'uev', SE + 'cpu_uhv',          SE + 'advanced_processor', 24, 12, 16, 576);
  // RAM chain: ram8 -> L5 -> ... -> L9=advanced_memory
  chain('oc_ram_luv', 'luv', 'opencomputers:ram8',    SE + 'ram_luv',            25, 4,  8,  288);
  chain('oc_ram_zpm', 'zpm', SE + 'ram_luv',          SE + 'ram_zpm',            26, 6,  10, 360);
  chain('oc_ram_uv',  'uv',  SE + 'ram_zpm',          SE + 'ram_uv',             27, 8,  12, 432);
  chain('oc_ram_uhv', 'uhv', SE + 'ram_uv',           SE + 'ram_uhv',            28, 10, 14, 504);
  chain('oc_ram_uev', 'uev', SE + 'ram_uhv',          SE + 'advanced_memory',    29, 12, 16, 576);

  // GPU: single top (tier 3 is the GPU cap), IV recipe.
  try {
    event.recipes.gtceu
      .assembler(id('oc_advanced_gpu'))
      .itemInputs('#gtceu:circuits/iv', 'opencomputers:graphicscard4', '4x gtceu:naquadah_alloy_plate', '8x gtceu:fine_platinum_wire')
      .circuit(19)
      .inputFluids('gtceu:soldering_alloy 288')
      .itemOutputs('startechenergycase:advanced_graphics_card')
      .duration(400)
      .EUt(7680);
    count++;
  } catch (err) {
    console.error('[StarT-OC] Failed to add advanced_gpu: ' + err);
  }

  console.log('[StarT-OC] Gated ' + count + ' OpenComputers components (assembler; +9-level CPU/RAM at LuV..UEV + GPU).');
});
