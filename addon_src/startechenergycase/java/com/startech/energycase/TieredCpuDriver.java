package com.startech.energycase;

import li.cil.oc.api.Machine;
import li.cil.oc.api.driver.item.CallBudget;
import li.cil.oc.api.driver.item.Processor;
import li.cil.oc.api.driver.item.Slot;
import li.cil.oc.api.machine.Architecture;
import li.cil.oc.api.network.EnvironmentHost;
import li.cil.oc.api.network.ManagedEnvironment;
import li.cil.oc.api.prefab.DriverItem;
import net.minecraft.world.item.ItemStack;

/** Tiered CPU: reports tier 3 (fits case4/creative CPU slot) but with a custom
 *  supported-component count and call budget (higher budget => more work per
 *  tick => higher energy use). */
public class TieredCpuDriver extends DriverItem implements Processor, CallBudget {
    private final int components;
    private final double budget;

    public TieredCpuDriver(ItemStack item, int components, double budget) {
        super(item);
        this.components = components;
        this.budget = budget;
    }

    @Override public String slot(ItemStack s) { return Slot.CPU; }
    @Override public int tier(ItemStack s) { return 3; }
    @Override public ManagedEnvironment createEnvironment(ItemStack s, EnvironmentHost h) {
        return new li.cil.oc.server.component.CPU(3);
    }
    @Override public int supportedComponents(ItemStack s) { return components; }
    @Override public Class<? extends Architecture> architecture(ItemStack s) { return Machine.LuaArchitecture; }
    @Override public double getCallBudget(ItemStack s) { return budget; }
}
