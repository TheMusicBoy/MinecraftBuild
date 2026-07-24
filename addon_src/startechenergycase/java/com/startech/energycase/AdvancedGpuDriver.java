package com.startech.energycase;

import li.cil.oc.api.driver.item.Slot;
import li.cil.oc.api.network.EnvironmentHost;
import li.cil.oc.api.network.ManagedEnvironment;
import li.cil.oc.api.prefab.DriverItem;
import net.minecraft.world.item.ItemStack;

/** Advanced Graphics Card: top-tier (3) GPU (card slot). VRAM boosted via config. */
public class AdvancedGpuDriver extends DriverItem {
    public AdvancedGpuDriver() { super(new ItemStack(EnergyCaseMod.ADVANCED_GPU.get())); }

    @Override public String slot(ItemStack stack) { return Slot.Card; }
    @Override public int tier(ItemStack stack) { return 3; }
    @Override public ManagedEnvironment createEnvironment(ItemStack stack, EnvironmentHost host) {
        return new li.cil.oc.server.component.GraphicsCard(3);
    }
}
