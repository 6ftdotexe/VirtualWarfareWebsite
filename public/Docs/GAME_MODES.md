# 🎯 Game Modes

## Round Flow (Mermaid sequence)
```mermaid
sequenceDiagram
  participant A as Attackers
  participant D as Defenders
  participant S as Server
  S->>A: Spawn attackers
  S->>D: Spawn defenders
  A->>D: Attempt objective
  D->>A: Defend site
  S->>S: Check win condition
  S->>All: End round + update scoreboard
```
