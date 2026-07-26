package com.startech.effortlesssurvivalbreak.mixin;

import net.minecraft.world.entity.player.Player;
import nl.requios.effortlessbuilding.capability.PowerLevelCapability;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable;

// Effortless Building hard-gates multi-block BREAKING behind creative mode:
//   PowerLevelCapability.canBreakFar(player) { return player.getAbilities().instabuild; }
// and BuilderChain.onLeftClick returns early unless canBreakFar is true. This forces
// it to return true so build-mode breaking (cube/line/wall/...) also works in survival.
// Runs on both sides: the client uses it in onLeftClick, the server in
// CommonEvents.onBlockBroken (to cancel the vanilla break and let Effortless handle it).
// remap=false: the target class/method are the mod's own names, not obfuscated vanilla.
@Mixin(value = PowerLevelCapability.class, remap = false)
public class CanBreakFarMixin {

    @Inject(method = "canBreakFar", at = @At("HEAD"), cancellable = true, remap = false)
    private void startech$allowSurvivalBreak(Player player, CallbackInfoReturnable<Boolean> cir) {
        cir.setReturnValue(true);
    }
}
