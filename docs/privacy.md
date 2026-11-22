# Privacy &amp; security

MaciTTY's model is simple: **your data lives on your Mac** — there's no
vendor cloud, no account, no telemetry, nothing to breach.

## Where things are stored

- **Sessions, folders, tags, notes, snippets, settings** — in the app's
  local storage under your user account
- **Passwords and credentials** — in the macOS **login Keychain**, managed
  by the system, encrypted at rest — never in session files
- **Known host keys** — stored locally in MaciTTY's own data folder
  (`~/Library/Application Support/MaciTTY/putty/`), separate from
  `~/.ssh/known_hosts`
- **SSH keys** made or imported in the [key manager](authentication.md#managing-keys)
  — stored on this Mac only, never synced

## App lock

Lock the whole app behind **Touch ID or your login password** — `⌃⌘L`
(**MaciTTY → Lock MaciTTY**), when MaciTTY launches, when the Mac sleeps, or
automatically after 5, 15, 30 or 60 idle minutes. While locked, windows are
hidden and the app shields itself from screen capture; sessions stay
connected. Enable it in **Settings → App Lock**; it's optional.

![The lock screen](img/privacy-lock.png)

## iCloud sync

A **MaciTTY Pro** feature. Optional sync carries your library to your other
Macs — sessions, folders, tags, notes, snippets and settings — through
**your own private iCloud account** (CloudKit). Apple holds the data under
your account; MaciTTY has no servers of its own.

**Credentials are deliberately never synced** — passwords stay in each
Mac's own Keychain, so a synced session on a second Mac still asks you to
save its password once, locally.

Sync is off unless you turn it on.

## What isn't collected

No analytics, no crash-reporting service, no ads, no account. The only
network calls the app makes are to the servers *you* connect to — and to
the update feed when update checks run (which you can set to
[never](getting-started.md#updates)).
