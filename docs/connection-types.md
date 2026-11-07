# Connection types

Each session's **Connection** pane chooses the protocol and the target.
Connection types are set per session — pick one when creating it.

![The connection settings pane](img/connection-pane.png)

## SSH

The default and the one you'll use almost everywhere. Fields: host, port,
username — everything else (auth, forwarding, keepalives, host-key policy)
lives on the other setting panes; see [Authentication](authentication.md)
and [Proxies &amp; tunnels](proxies-tunnels.md).

## Telnet &amp; Rlogin

Plain-text protocols for legacy systems and network gear that still speaks
them. Same session model — saved, reconnectable, loggable. Authentication
options are limited to what the protocol supports.

## Raw TCP

A bare socket to `host:port` — for talking to devices and services that have
no login protocol at all: serial-over-TCP bridges, debug consoles, MUDs,
proprietary appliances.

## Serial

Direct serial-port connections for consoles on switches, routers, embedded
boards and anything with a UART.

Settings on the **Serial** pane:

| Setting | Notes |
|---|---|
| Serial line | The device path — typically `/dev/cu.usbserial*` or `/dev/cu.usbmodem*` for USB adapters |
| Speed (baud) | `9600` by default; common values `9600`–`115200` |
| Data bits | Usually `8` |
| Stop bits | Usually `1` |
| Parity | None / odd / even — match the device |
| Flow control | None / XON-XOFF / RTS-CTS |

> **Tip** — plug in the adapter, then run `ls /dev/cu.*` in a shell to find
> the exact device name before creating the session.

![Serial port settings](img/connection-serial.png)

## Local Shell

A real local terminal — your shell on your Mac — as a first-class session:
same sidebar, same settings model, no host required.

- **Shell** — defaults to your `$SHELL` (falling back to `/bin/zsh`, run as
  a login shell)
- **Start directory** — defaults to your home folder
- **Command on start** — run something instead of the interactive shell

Local sessions don't [auto-reconnect](sessions.md#automatic-reconnect) — a
dead shell shouldn't loop-respawn; the "Shell exited" banner restarts it on
demand. The Files tab and [monitoring](monitoring.md) don't apply either —
those need SSH. In the sidebar, a local session shows a terminal icon and
the shell name instead of a host.

![Local Shell session settings](img/connection-localshell.png)

![A local shell running inside MaciTTY](img/connection-localshell-live.png)
