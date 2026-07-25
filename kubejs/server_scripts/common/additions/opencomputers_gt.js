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

  // [item, tierKey, size] — OC tiers gated one GT voltage below the mod's:
  //   Tier 1 -> LV | Tier 2 -> MV | Tier 3 -> HV | Tier 4 -> EV
  const COMPONENTS = [
    // ---- Tier 1 -> LV ----
    ['case1', 'LV', 'large'], ['cpu1', 'LV', 'medium'], ['apu1', 'LV', 'medium'],
    ['graphicscard1', 'LV', 'medium'], ['hdd1', 'LV', 'medium'], ['ram1', 'LV', 'small'],
    ['ram2', 'LV', 'small'], ['componentbus1', 'LV', 'medium'], ['microcontrollercase1', 'LV', 'large'],
    ['dronecase1', 'LV', 'large'], ['cardcontainer1', 'LV', 'small'], ['datacard1', 'LV', 'small'],
    ['redstonecard1', 'LV', 'small'], ['wlancard1', 'LV', 'small'], ['screen1', 'LV', 'large'],
    ['hologram1', 'LV', 'medium'], ['upgradecontainer1', 'LV', 'small'], ['batteryupgrade1', 'LV', 'small'],
    ['databaseupgrade1', 'LV', 'small'], ['hoverupgrade1', 'LV', 'small'], ['server1', 'LV', 'large'],
    ['chip1', 'LV', 'small'],
    // ---- Tier 2 -> MV ----
    ['case2', 'MV', 'large'], ['cpu2', 'MV', 'medium'], ['apu2', 'MV', 'medium'],
    ['graphicscard2', 'MV', 'medium'], ['hdd2', 'MV', 'medium'], ['ram3', 'MV', 'small'],
    ['ram4', 'MV', 'small'], ['componentbus2', 'MV', 'medium'], ['microcontrollercase2', 'MV', 'large'],
    ['dronecase2', 'MV', 'large'], ['cardcontainer2', 'MV', 'small'], ['datacard2', 'MV', 'small'],
    ['redstonecard2', 'MV', 'small'], ['wlancard2', 'MV', 'small'], ['screen2', 'MV', 'large'],
    ['hologram2', 'MV', 'medium'], ['upgradecontainer2', 'MV', 'small'], ['batteryupgrade2', 'MV', 'small'],
    ['databaseupgrade2', 'MV', 'small'], ['hoverupgrade2', 'MV', 'small'], ['server2', 'MV', 'large'],
    ['chip2', 'MV', 'small'],
    // ---- Tier 3 -> HV ----
    ['case3', 'HV', 'large'], ['cpu3', 'HV', 'medium'], ['apu3', 'HV', 'medium'],
    ['graphicscard3', 'HV', 'medium'], ['hdd3', 'HV', 'medium'], ['ram5', 'HV', 'small'],
    ['ram6', 'HV', 'small'], ['componentbus3', 'HV', 'medium'], ['microcontrollercase3', 'HV', 'large'],
    ['dronecase3', 'HV', 'large'], ['cardcontainer3', 'HV', 'small'], ['datacard3', 'HV', 'small'],
    ['screen3', 'HV', 'large'], ['hologram3', 'HV', 'medium'], ['upgradecontainer3', 'HV', 'small'],
    ['batteryupgrade3', 'HV', 'small'], ['databaseupgrade3', 'HV', 'small'], ['server3', 'HV', 'large'],
    ['chip3', 'HV', 'small'], ['robot', 'HV', 'large'], ['drone', 'HV', 'medium'],
    ['microcontroller', 'HV', 'medium'],
    // ---- Tier 4 -> EV (Community Edition "extreme" tier) ----
    ['case4', 'EV', 'large'], ['cpu4', 'EV', 'medium'], ['graphicscard4', 'EV', 'medium'],
    ['hdd4', 'EV', 'medium'], ['ram7', 'EV', 'small'], ['ram8', 'EV', 'small'],
    ['componentbus4', 'EV', 'medium'], ['screen4', 'EV', 'large'], ['server4', 'EV', 'large'],
    ['chip4', 'EV', 'small'],
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
