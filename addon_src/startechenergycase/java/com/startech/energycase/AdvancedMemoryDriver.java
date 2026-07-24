package com.startech.energycase;

import li.cil.oc.api.driver.item.Memory;
import li.cil.oc.api.driver.item.Slot;
import li.cil.oc.api.network.EnvironmentHost;
import li.cil.oc.api.network.ManagedEnvironment;
import li.cil.oc.api.prefab.DriverItem;
import net.minecraft.world.item.ItemStack;

/** Advanced Memory: 64 MB RAM (tier 3, fits case4/creative memory slot). */
public class AdvancedMemoryDriver extends DriverItem implements Memory {
    public AdvancedMemoryDriver() { super(new ItemStack(EnergyCaseMod.ADVANCED_RAM.get())); }

    @Override public String slot(ItemStack stack) { return Slot.Memory; }
    @Override public int tier(ItemStack stack) { return 3; }
    @Override public double amount(ItemStack stack) { return 65536.0D; }
    @Override public ManagedEnvironment createEnvironment(ItemStack stack, EnvironmentHost host) {
        return new li.cil.oc.server.component.Memory(3);
    }
}
