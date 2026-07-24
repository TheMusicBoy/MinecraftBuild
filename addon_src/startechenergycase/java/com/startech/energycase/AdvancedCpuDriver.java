package com.startech.energycase;

import li.cil.oc.api.Machine;
import li.cil.oc.api.driver.item.Processor;
import li.cil.oc.api.driver.item.Slot;
import li.cil.oc.api.machine.Architecture;
import li.cil.oc.api.network.EnvironmentHost;
import li.cil.oc.api.network.ManagedEnvironment;
import li.cil.oc.api.prefab.DriverItem;
import net.minecraft.world.item.ItemStack;

/**
 * Driver turning startechenergycase:advanced_processor into an OpenComputers CPU
 * that reports tier 3 (so it fits the Tier-4 / creative case CPU slot) but
 * supports 64 addressable components directly (independent of the 5-entry
 * cpuComponentCount config). A proper, craftable, non-creative top CPU.
 */
public class AdvancedCpuDriver extends DriverItem implements Processor {

    public AdvancedCpuDriver() {
        super(new ItemStack(EnergyCaseMod.ADVANCED_CPU.get()));
    }

    @Override
    public String slot(ItemStack stack) {
        return Slot.CPU;
    }

    @Override
    public int tier(ItemStack stack) {
        return 3;
    }

    @Override
    public ManagedEnvironment createEnvironment(ItemStack stack, EnvironmentHost host) {
        return new li.cil.oc.server.component.CPU(3);
    }

    @Override
    public int supportedComponents(ItemStack stack) {
        return 64;
    }

    @Override
    public Class<? extends Architecture> architecture(ItemStack stack) {
        return Machine.LuaArchitecture;
    }
}
