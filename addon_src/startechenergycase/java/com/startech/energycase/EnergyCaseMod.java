package com.startech.energycase;

import net.minecraft.world.item.Item;
import net.minecraft.world.item.ItemStack;
import net.minecraftforge.eventbus.api.IEventBus;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.event.lifecycle.FMLCommonSetupEvent;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;
import net.minecraftforge.registries.DeferredRegister;
import net.minecraftforge.registries.ForgeRegistries;
import net.minecraftforge.registries.RegistryObject;

@Mod(EnergyCaseMod.MODID)
public class EnergyCaseMod {
    public static final String MODID = "startechenergycase";
    public static final DeferredRegister<Item> ITEMS = DeferredRegister.create(ForgeRegistries.ITEMS, MODID);

    private static RegistryObject<Item> reg(String name) {
        return ITEMS.register(name, () -> new Item(new Item.Properties()));
    }

    // CPUs: levels 5..9 (level 9 = advanced_processor = 128 components = 4x tier 4)
    public static final RegistryObject<Item> CPU_L5 = reg("cpu_luv");
    public static final RegistryObject<Item> CPU_L6 = reg("cpu_zpm");
    public static final RegistryObject<Item> CPU_L7 = reg("cpu_uv");
    public static final RegistryObject<Item> CPU_L8 = reg("cpu_uhv");
    public static final RegistryObject<Item> ADVANCED_CPU = reg("advanced_processor");
    // RAM: levels 5..9 (level 9 = advanced_memory = 64 MB)
    public static final RegistryObject<Item> RAM_L5 = reg("ram_luv");
    public static final RegistryObject<Item> RAM_L6 = reg("ram_zpm");
    public static final RegistryObject<Item> RAM_L7 = reg("ram_uv");
    public static final RegistryObject<Item> RAM_L8 = reg("ram_uhv");
    public static final RegistryObject<Item> ADVANCED_RAM = reg("advanced_memory");
    // GPU: single top (tier 3 capped), VRAM boosted via config
    public static final RegistryObject<Item> ADVANCED_GPU = reg("advanced_graphics_card");

    public EnergyCaseMod() {
        IEventBus bus = FMLJavaModLoadingContext.get().getModEventBus();
        ITEMS.register(bus);
        bus.addListener(this::commonSetup);
    }

    private static ItemStack st(RegistryObject<Item> r) { return new ItemStack(r.get()); }

    private void commonSetup(FMLCommonSetupEvent event) {
        event.enqueueWork(() -> {
            // CPUs: (components, callBudget). Level9=128 (4x cpu4's 32).
            li.cil.oc.api.Driver.add(new TieredCpuDriver(st(CPU_L5), 48, 5.0D));
            li.cil.oc.api.Driver.add(new TieredCpuDriver(st(CPU_L6), 64, 6.0D));
            li.cil.oc.api.Driver.add(new TieredCpuDriver(st(CPU_L7), 80, 7.0D));
            li.cil.oc.api.Driver.add(new TieredCpuDriver(st(CPU_L8), 104, 8.0D));
            li.cil.oc.api.Driver.add(new TieredCpuDriver(st(ADVANCED_CPU), 128, 9.0D));
            // RAM (KB). Level9=65536 (64 MB = 4x ram8's 16 MB).
            li.cil.oc.api.Driver.add(new TieredMemoryDriver(st(RAM_L5), 24576.0D));
            li.cil.oc.api.Driver.add(new TieredMemoryDriver(st(RAM_L6), 32768.0D));
            li.cil.oc.api.Driver.add(new TieredMemoryDriver(st(RAM_L7), 40960.0D));
            li.cil.oc.api.Driver.add(new TieredMemoryDriver(st(RAM_L8), 49152.0D));
            li.cil.oc.api.Driver.add(new TieredMemoryDriver(st(ADVANCED_RAM), 65536.0D));
            // GPU
            li.cil.oc.api.Driver.add(new AdvancedGpuDriver());
        });
    }
}
