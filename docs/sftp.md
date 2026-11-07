# File transfer (SFTP)

Every SSH session has a **Files** tab: a dual-pane SFTP browser riding the
same connection — no second login, no second app.

![The dual-pane file browser](img/sftp-panes.png)

## Getting around

- Local files on one side, remote on the other — swap focus freely
- **Editable path fields** on both panes — type or paste a path to jump
- `..` rows at the top of each listing to walk up
- **Hidden files** toggle per pane
- **Symlink badges** mark links so you know what you're copying
- Right-click menus carry the file actions: rename, delete, new folder,
  permissions, open

## Transferring

- **Drag &amp; drop** — between panes, from Finder into the remote pane,
  and remote rows straight out to Finder, Desktop or Mail — the download
  runs through the normal transfer machinery with progress
- Recursive transfers — whole directory trees copy with progress
- Overwriting an existing file asks **Replace / Skip / Cancel** — per file

## Editing remote files

Open a remote file and it downloads to a temp copy in your favourite local
editor. Every save uploads it back automatically. If the file changed on the
server in the meantime, MaciTTY detects the **conflict** instead of silently
clobbering the remote version.

![The conflict prompt on remote edit](img/sftp-conflict.png)

## Operation history

A collapsible **history** strip at the bottom of the Files tab lists every
operation — copy, move, delete, rename, edit — with its result and time, so
you can always see what ran and what failed.

![The operation history strip](img/sftp-history.png)

> **Note** — the Files tab shares the session's connection. When a dropped
> connection [reconnects](sessions.md#automatic-reconnect), the SFTP pane
> comes back with it.
