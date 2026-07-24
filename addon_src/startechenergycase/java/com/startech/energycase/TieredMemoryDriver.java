package com.startech.energycase;

import li.cil.oc.api.driver.item.Memory;
import li.cil.oc.api.driver.item.Slot;
import li.cil.oc.api.network.EnvironmentHost;
import li.cil.oc.api.network.ManagedEnvironment;
import li.cil.oc.api.prefab.DriverItem;
import net.minecraft.world.item.ItemStack;

/** Tiered RAM: custom memory amount (KB), tier 3 to fit case4/creative slot. */
public class TieredMemoryDriver extends DriverItem implements Memory {
    private final double kb;
    public TieredMemoryDriver(ItemStack item, double kb) { super(item); this.kb = kb; }

    @Override public String slot(ItemStack s) { return Slot.Memory; }
    @Override public int tier(ItemStack s) { return 3; }
    @Override public double amount(ItemStack s) { return kb; }
    @Override public ManagedEnvironment createEnvironment(ItemStack s, EnvironmentHost h) {
        return new li.cil.oc.server.component.Memory(3);
    }
}
