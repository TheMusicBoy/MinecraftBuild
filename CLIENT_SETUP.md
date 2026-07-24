# Star Technology — Client Build

Client instance matching the **Star Technology 1.20.1** server (THETA-1-HOTFIX-3),
plus the server's custom additions so you can join and use everything.

## Requirements
- **Minecraft 1.20.1**
- **Forge 47.4.20** (must match the server exactly)
- 6–8 GB RAM allocated to the client recommended

## What's included (vs a stock Star Technology install)
- All base Star Technology mods
- **Client rendering mods** re-enabled: Oculus, Embeddium, Colorwheel (removed on the server, needed on the client)
- **OpenComputers CE** `1.9.0-2` + **Scalable Cat's Force** — GregTech-balanced on the server (MV/HV/EV/IV tiers)
- **Plasmo Voice** `2.1.13` — proximity voice chat
- Resource packs & shader packs
- FTB Quests (incl. the new OpenComputers chapter)

## Install

### Prism Launcher / MultiMC (recommended)
1. Create a new instance → Minecraft **1.20.1** → install **Forge 47.4.20**.
2. Open the instance folder (`Edit → Open Folder`) → go into `.minecraft/`.
3. Extract the contents of this build into `.minecraft/` (merge `mods/`, `config/`, `kubejs/`, `resourcepacks/`, `shaderpacks/`, etc.).
4. Allocate 6–8 GB RAM in the instance settings and launch.

### CurseForge / Vanilla launcher
1. Install the **Forge 47.4.20** profile for 1.20.1 once (so `.minecraft` has Forge).
2. Extract this build into your `.minecraft` folder (Win: `%AppData%\.minecraft`, Linux: `~/.minecraft`, macOS: `~/Library/Application Support/minecraft`).

## Connect to the server
- Address: **`158.160.146.217:25565`**
- Voice chat (Plasmo Voice) uses the same port over UDP — no extra setup.
- Server is `online-mode=false`, so any account name works.

## Notes
- The 122 MB Star Technology resource pack is included in `resourcepacks/` here (it was excluded only from the git repo due to GitHub's 100 MB file limit).
- If you tweak recipes locally in single-player they won't match the server; on the server the recipes come from the server.
