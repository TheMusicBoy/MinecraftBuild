package com.startech.ebflickerfix;

import net.minecraftforge.event.entity.player.PlayerInteractEvent;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import nl.requios.effortlessbuilding.EffortlessBuildingClient;
import nl.requios.effortlessbuilding.buildmode.BuildModeEnum;
import nl.requios.effortlessbuilding.systems.BuilderChain;

// Effortless Building only cancels vanilla placement on the SERVER (EntityPlaceEvent),
// never on the client. So while marking the corners of a structure the client still
// PREDICTS a vanilla placement (a block visibly leaves the inventory), and the server
// then cancels it and re-syncs (the block "comes back"). For a 4x4x4 cube that is the
// two corner clicks flickering. Here we suppress the client's own prediction while an
// Effortless build mode is going to handle the placement, so no phantom consumption.
public class ClientRightClickHandler {

    @SubscribeEvent
    public void onRightClickBlock(PlayerInteractEvent.RightClickBlock event) {
        // Only the client's own prediction (m_5776_ == Level.isClientSide).
        if (!event.getLevel().m_5776_()) return;

        BuildModeEnum mode = EffortlessBuildingClient.BUILD_MODES.getBuildMode();
        // DISABLED = plain vanilla; SINGLE places the exact same block/pos vanilla would,
        // so it never flickers and keeps its instant client prediction. Only the
        // multi-click / structure modes need the fix.
        if (mode == BuildModeEnum.DISABLED || mode == BuildModeEnum.SINGLE) return;

        // CAN_PLACE_AND_BREAK means Effortless has decided this click is a block placement
        // (a block is in hand and we are not activating an interactive block such as a chest).
        if (EffortlessBuildingClient.BUILDER_CHAIN.getAbilitiesState()
                == BuilderChain.AbilitiesState.CAN_PLACE_AND_BREAK) {
            // Effortless handles the real placement itself (it polls the use key in its own
            // client tick), so cancelling the vanilla interaction removes only the phantom
            // prediction, not the actual build.
            event.setCanceled(true);
        }
    }
}
