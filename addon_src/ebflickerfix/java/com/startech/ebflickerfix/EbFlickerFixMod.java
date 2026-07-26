package com.startech.ebflickerfix;

import net.minecraftforge.api.distmarker.Dist;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.loading.FMLEnvironment;

// Client-side companion fix for Effortless Building.
// Registers the right-click handler ONLY on the physical client so a dedicated
// server never classloads the client-only Effortless classes it references.
@Mod("ebflickerfix")
public class EbFlickerFixMod {
    public EbFlickerFixMod() {
        if (FMLEnvironment.dist == Dist.CLIENT) {
            MinecraftForge.EVENT_BUS.register(new ClientRightClickHandler());
        }
    }
}
