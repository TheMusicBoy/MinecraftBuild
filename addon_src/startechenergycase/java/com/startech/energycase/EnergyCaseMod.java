package com.startech.energycase;

import net.minecraft.world.item.Item;
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

    public static final DeferredRegister<Item> ITEMS =
            DeferredRegister.create(ForgeRegistries.ITEMS, MODID);

    // New craftable, non-creative top CPU: supports 64 components.
    public static final RegistryObject<Item> ADVANCED_CPU =
            ITEMS.register("advanced_processor", () -> new Item(new Item.Properties()));

    public EnergyCaseMod() {
        IEventBus bus = FMLJavaModLoadingContext.get().getModEventBus();
        ITEMS.register(bus);
        bus.addListener(this::commonSetup);
    }

    private void commonSetup(FMLCommonSetupEvent event) {
        event.enqueueWork(() -> li.cil.oc.api.Driver.add(new AdvancedCpuDriver()));
    }
}
