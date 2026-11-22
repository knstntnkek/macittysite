# Authentication

The **Authentication** pane of a session's settings controls how you prove
who you are.
MaciTTY supports every common way in:

| Method | What to set |
|---|---|
| Password | Type it at the login prompt — you can save it to the Keychain on the spot |
| Keyboard-interactive | The server drives a prompt flow (used by OTP/bastion setups) — answered interactively |
| Public key | Point **Private key file** at your key (`~/.ssh/id_ed25519`, `id_rsa`, …) |
| ssh-agent | Keys loaded in your agent are offered automatically |
| Certificates | SSH certificate auth — select the cert alongside the key |
| Kerberos / GSSAPI | Enterprise SSO — uses your existing Kerberos ticket |

## Saving passwords to the Keychain

When a server asks for a password, the prompt offers to remember it. Accept,
and the password is stored in your **login Keychain** — every connection
after that authenticates without asking. Passwords live in the Keychain, not
in session files, and are never included in [iCloud sync](privacy.md#icloud-sync).

![Saving a password at the login prompt](img/auth-keychain.png)

## Public keys

Set **Private key file** on the Authentication pane to a key in `~/.ssh`
(or anywhere).
If your key has a passphrase, it's asked for when needed — and can likewise
be saved to the Keychain. `ssh-agent` is consulted automatically, so keys
already loaded with `ssh-add` just work.

## Managing keys

The **SSH Keys** button in the sidebar toolbar opens the key manager —
generate a pair, import an existing one, and each key gets **Copy public
key**, **Install on Server**, **Remove from Server**, **Export** and
**Delete** actions.

- **Generate** — Ed25519 by default; Ed448, ECDSA P-256/P-384/P-521 and
  RSA 2048/3072/4096. Keys are stored in OpenSSH format, or PuTTY PPK v3 if
  you pick it
- **Import** — OpenSSH, PuTTY `.ppk` and ssh.com keys, converted into
  MaciTTY's key store; passphrases can be saved to the Keychain like any
  other secret
- **Export** — as an OpenSSH or PPK private key, or an RFC 4716 public key
- **Install on Server** — logs in normally and appends the public half to
  `~/.ssh/authorized_keys` (existing keys are kept), and
  records where each key was installed (verified installs, not a live
  check); **Remove from Server** takes it back off
- Managed keys live on this Mac and are never synced — the session
  editor's **Private key file** field offers them directly, next to
  **Choose File…** and **Generate…**
- Deleting a key that sessions use warns first; those sessions fall back to
  password login

## Host key verification

First connection to a host shows its key fingerprint for confirmation. Known
hosts are kept locally; if a server's key *changes* later, MaciTTY warns you
rather than connecting silently — the standard SSH trust model.

![Host key verification on first connect](img/auth-hostkey.png)

## Keyboard-interactive &amp; multi-step logins

Bastion and OTP flows ("password, then code, then second password") run as
keyboard-interactive prompts — MaciTTY shows them in the terminal exactly as
the server sends them, and prompted passwords can be saved to the Keychain
like any other.
