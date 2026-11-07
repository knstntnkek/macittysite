# Troubleshooting &amp; FAQ

## The app won't open / "damaged" warnings

MaciTTY is signed and notarized — a fresh download should open normally.
If Finder refuses: re-download the DMG (a corrupted download is the usual
cause), or install via `brew install --cask knstntnkek/macitty/macitty`.

If `brew` complains the tap is untrusted, run
`brew trust knstntnkek/macitty` first, then install again.

## The updater says it will restart, but doesn't

A bug in versions **0.8 and 0.8.1** can leave the app running instead of
restarting into the update. If you're on one of those, install the latest
version manually once (DMG or `brew upgrade`) — updates *from* 0.8.2 onward
restart correctly.

## iCloud sync isn't syncing

- Confirm you're signed into the same iCloud account on both Macs
- Check sync is enabled in Settings on **each** Mac — it's opt-in
- Credentials are intentionally excluded — passwords must be saved once
  per Mac; that's by design

## Serial sessions can't open the port

- The adapter may need a driver (cheap USB-serial chips often do)
- macOS can ask for permission to access the device — check
  **System Settings → Privacy &amp; Security**
- Find the exact path with `ls /dev/cu.*` — it changes between plugs

## A password saved to Keychain isn't being used

Keychain items are per host + user. If the hostname or username changed
(e.g. IP vs FQDN), the stored item no longer matches — save it again at the
next prompt.

## Where does MaciTTY keep its data?

- Sessions, tags, notes, snippets, settings: the app's container under
  `~/Library/Application Support`
- Passwords: the login Keychain (open **Keychain Access** to inspect)
- Session logs: wherever you point the log path on the
  [Logging pane](logging.md)

## Report a bug or request a feature

Open an issue on
[github.com/knstntnkek/macittysite/issues](https://github.com/knstntnkek/macittysite/issues)
— screenshots and the steps to reproduce help a lot.
