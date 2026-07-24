package com.startech.energycase.mixin;

import li.cil.oc.api.network.Connector;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Redirect;

/**
 * OpenComputers' Creative Computer Case refills its energy buffer to
 * +Infinity every tick (in updateEntity). This redirect suppresses that
 * refill, so the creative case (which has the most component slots) now
 * draws energy from its network/buffer like any other case - turning it
 * into "the best computer case that consumes energy".
 */
@Mixin(targets = "li.cil.oc.common.blockentity.Case", remap = false)
public class CaseMixin {

    @Redirect(
        method = "updateEntity",
        at = @At(
            value = "INVOKE",
            target = "Lli/cil/oc/api/network/Connector;changeBuffer(D)D"
        ),
        remap = false
    )
    private double startech$noCreativeRefill(Connector connector, double amount) {
        return 0.0D;
    }
}
