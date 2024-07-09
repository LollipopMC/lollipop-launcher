# Contributing Lollipop

Thank for your great attention to Lollipop. Here are some useful information for you to set up a development environment and contribute to Lollipop.

Lollipop is built with [Tauri](https://github.com/tauri-apps/tauri), a cross-platform desktop application framework with JavaScript and Rust. Currently, frontend of Lollipop is built with [React](https://react.dev) and related libraries.

Therefore, you can choose contribute either frontend or backend part of Lollipop, or both.

## Setting up a development environment

VSCode is recommended editor for development. As Lollipop has pre-configured settings for VSCode, open the repository with VSCode and it should all be set. Recommended extensions are also listed in `.vscode/extensions.json`, you should be prompted to install them.

### Node.js

Node.js is required for frontend development. For Linux/macOS users, use [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions. For Windows users, use [volta](https://volta.sh). Lollipop has been pinned Node.js and yarn versions, you can install them with:

```bash
# Linux / macOS
# Make sure you're in the root of the repository
$ nvm install
```

```powershell
# Windows (PowerShell)
# Make sure you're in the root of the repository
> volta install
```
### Rust

Rust is not built with bootstrapping, meaning both Rust toolchain and native build tools are required. **Please note that LLVM Toolchain (LLDB) is required for debugging.** Here are some clues for different platforms:

| Platform | Native build tools |
|----------|-----------------------|
| Linux    | Install `gcc`, `g++`, `make` `lldb` `webkit2gtk` with any package manager (e.g. `apt`, `pacman`, `dnf`) |
| macOS    | Install Xcode CLI Tools with command `xcode-select --install` , [Homebrew](https://brew.sh) and `lldb` with `brew install lldb` sequentially |
| Windows | Install Visual Studio >= 2022 and **Must check LLVM Tools(In single component) while installation.** If you're under Windows 11, a installation of `WebView2` is also required. |

## Fire up the development

First you should download dependencies of frontend side with command:

```bash
$ yarn
```

Then you can start the development with

```
$ yarn dev
```

`yarn dev` script will automatically start a `react-devtools` and both `vite` and `tauri` development servers. Any change of frontend code will be hot-reloaded. For backend code, it will be recompiled and reloaded automatically.

## Notice for RPC calls

Here are lots of RPC calls between frontend and backend. Lollipop uses `tauri-specta` to automatically generate types for RPC calls. When development server is running, it will generate `src/bindings.ts`, but you should not modify this file manually.
