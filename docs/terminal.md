# Customizing the terminal

The **Terminal** panes of session settings — and of
[Default Settings](sessions.md#default-settings) — control how sessions
look and behave.

## Themes &amp; appearance

- **App theme** — light, dark or follow the system, remapped around the
  app's green palette
- **Colours &amp; palette editor** — ANSI palette and terminal colors,
  editable per session or for everything via Default Settings
- **Cursor** — block / underline / bar, blinking or steady

![The palette editor](img/terminal-palette.png)

## Split view

A **MaciTTY Pro** feature: run two panes side by side in the same window —
two terminals, or a terminal and its files.

- Toggle with the **Split** button in the pane toolbar, or right-click a
  session in the sidebar → **Open in New Pane**
- `⌘]` and `⌘[` move keyboard focus between panes
- Each pane is a viewport onto a live connection — close one and the
  session keeps running in the other; drag the divider to rebalance

## Bell &amp; alerts

Control what a terminal bell does: audible bell, visual flash, and **Dock
alerts** — bounce the icon when a background session beeps or finishes.

## Behaviour

- **Scrollback** — how much history to keep (2000 lines by default), and
  whether cleared screens go into scrollback
- **Local echo &amp; local line editing** — off by auto-detection; force
  them on for [Raw TCP](connection-types.md#raw-tcp) sessions and other
  services that don't echo input themselves

## Keyboard &amp; charset

- **Keyboard modes** — function-key and keypad modes for applications that
  distinguish them
- **Character sets** — **27 charsets**: UTF-8 plus the legacy encodings
  for gear and systems that predate Unicode

## App icon

Four alternate app icons to pick from in Settings — including variants for
light and dark docks.

![The app icon picker](img/terminal-icons.png)
