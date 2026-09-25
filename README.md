# 🎨 Universal Text Style Manager

**Style your Obsidian notes visually — without writing CSS.**

Customize text, headings, blocks, lists, tables, links, embeds, and more with a simple visual interface.

**Works in Live Preview and Reading View.**
**Your Markdown files are never modified.**

---

[📥 Installation](https://github.com/singhaf9270/universal-text-style-manager/blob/HEAD/#-installation) · [✨ Features](https://github.com/singhaf9270/universal-text-style-manager/blob/HEAD/#-features) · [🎨 Presets](https://github.com/singhaf9270/universal-text-style-manager/blob/HEAD/#-built-in-presets) · [🎮 Usage](https://github.com/singhaf9270/universal-text-style-manager/blob/HEAD/#-usage) · [📺 Tutorials](https://github.com/singhaf9270/universal-text-style-manager/blob/HEAD/#-persian-obsidian-tutorials) · [🐛 Issues](https://github.com/singhaf9270/universal-text-style-manager/blob/HEAD/#-bug-reports)

---

## ✨ Features

### 🎨 Visual Styling

Style your notes without writing CSS.

* Simple visual interface
* Live preview
* Separate Light and Dark mode styles
* No changes to your Markdown files
* Custom CSS classes and scopes
* Works with existing Obsidian themes

### 📝 Text & Headings

Customize individual Markdown text elements.

* Paragraphs
* Headings H1–H6
* **Bold**
* *Italic*
* ***Bold & Italic***
* ~~Strikethrough~~
* Highlight
* `Inline Code`
* Inline Math
* Comments
* Superscript / Subscript

### 💬 Blocks

* Blockquotes
* Callouts
* Callout titles
* Code blocks
* Math blocks
* Horizontal dividers

### 📋 Lists

* Bullet lists
* Numbered lists
* Nested lists
* Task lists
* Completed / uncompleted tasks
* List markers and numbers

### 📊 Tables

Customize different parts of your tables independently.

* Tables
* Headers
* Body
* Rows
* Cells
* Hover rows
* Alternating rows

### 🔗 Links & Embeds

* Internal links
* External links
* Tags
* Footnotes
* Note embeds
* Image embeds
* PDF embeds
* Audio / video embeds

### ⚙️ Advanced

* 12 built-in presets
* English and Persian interface
* Vault-wide styling
* CSS-class-based scopes
* Custom CSS classes
* Import / Export presets as JSON
* Generated CSS inspector
* Desktop and mobile support

---

## 🎁 Built-in Presets

Get started quickly with 12 ready-to-use presets.

| Preset             | Description                                       |
| ------------------ | ------------------------------------------------- |
| 🌿 **Minimal**     | Calm, paper-like typography with lined headings   |
| ☀️ **Solarized**   | Classic Solarized color palette                   |
| ❄️ **Nord**        | Cool Arctic-inspired palette                      |
| 🎨 **Gruvbox**     | Warm retro-inspired colors                        |
| 🌃 **Tokyo Night** | Dark neon style with electric blue accents        |
| 🪟 **Glass**       | Transparent surfaces, gradients, and soft shadows |
| 💡 **Neon**        | Cyberpunk-inspired pink and cyan glow             |
| 🌊 **Ocean**       | Deep blue gradient style                          |
| 🌙 **Dark**        | Charcoal surfaces for dark environments           |
| ☁️ **Light**       | Clean and bright light style                      |
| 📖 **Academic**    | Paper-inspired typography with serif body text    |
| 💻 **Developer**   | Terminal and GitHub-inspired styling              |

---

## 📥 Installation

> **Note:** Universal Text Style Manager is currently not available in the official Obsidian Community Plugins directory.

### Recommended: BRAT

The easiest way to install the plugin is through [BRAT](https://github.com/TfTHacker/obsidian42-brat).

1. Install and enable **BRAT** from Obsidian Community Plugins.
2. Open **Settings → BRAT**.
3. Select **Add Beta Plugin**.
4. Enter:

```text
singhaf9270/universal-text-style-manager
```

5. Click **Add Plugin**.
6. Go to **Settings → Community Plugins**.
7. Enable **Universal Text Style Manager**.

> 💡 BRAT can also keep the plugin updated when new releases are published.

### Manual Installation

You can also install the plugin manually.

1. Download the latest `main.js` and `manifest.json` from the [Releases](https://github.com/singhaf9270/universal-text-style-manager/releases) page.
2. Create the following folder inside your Vault:

```text
<YourVault>/.obsidian/plugins/universal-text-style-manager/
```

3. Copy `main.js` and `manifest.json` into the folder.
4. Reload Obsidian.
5. Enable **Universal Text Style Manager** from **Settings → Community Plugins**.

---

## 🎮 Usage

### Opening Style Manager

There are three ways to open the Style Manager:

| Method                 | Action                                                |
| ---------------------- | ----------------------------------------------------- |
| 🎨 **Ribbon**          | Click the palette icon in the sidebar                 |
| ⌨️ **Command Palette** | `Ctrl/Cmd + P` → **Open Style Manager**               |
| 🖱️ **Context Menu**   | Right-click selected text and choose the style option |

### Basic Workflow

1. Choose a category from the sidebar.
2. Select the element you want to customize.
3. Adjust the available style options.
4. See the changes instantly in the preview.
5. Enable **Separate styles for dark mode** if you want independent Dark Mode settings.

---

## 🎯 Scopes

Scopes let you control where your styles are applied.

| Scope               | Applies to                       |
| ------------------- | -------------------------------- |
| **Entire Vault**    | All notes in your Vault          |
| **CSS Class Scope** | Notes using a specific CSS class |

### Example

Add a CSS class to your note's frontmatter:

```yaml
---
cssclasses:
  - my-special-note
---
```

Then create a Scope named:

```text
my-special-note
```

Styles configured for that Scope will apply only to notes using that CSS class.

---

## 🌐 Language

Universal Text Style Manager supports:

* 🇬🇧 English
* 🇮🇷 فارسی

Change the interface language from:

**Settings → Universal Text Style Manager → Language**

---

## 🎨 Community Presets

In addition to the built-in presets, you can download and share additional presets from the project's **Presets** collection.

Presets are provided as JSON files and can be imported directly into Universal Text Style Manager.

👉 [**Browse Community Presets**](https://github.com/singhaf9270/universal-text-style-manager/tree/main/presets)

### Importing a Preset

1. Open Universal Text Style Manager.
2. Go to the preset section.
3. Choose **Import Preset**.
4. Select the downloaded `.json` file.

> 💡 More presets may be added over time.

---

## 📺 Persian Obsidian Tutorials

### 🎓 Learn Obsidian in Persian

For Persian-language Obsidian tutorials, tips, workflows, plugins, presets, and useful resources:

| Channel                                                           | Content                           |
| ----------------------------------------------------------------- | --------------------------------- |
| 🎬 [**YouTube — @obsidiantut**](https://youtube.com/@obsidiantut) | Video tutorials                   |
| 💬 [**Telegram — @obsidiantut**](https://t.me/obsidiantut)        | Tutorials, files & discussions    |
| 🇮🇷 [**Bale — @obsidiantut**](https://ble.ir/obsidiantut)        | Persian content for Iranian users |

---

## 🛠️ Development

Clone the repository:

```bash
git clone https://github.com/singhaf9270/universal-text-style-manager.git
cd universal-text-style-manager
```

For development, copy the plugin files into your Vault's plugin directory and reload Obsidian.

### Project Structure

```text
universal-text-style-manager/
├── .github/
│   └── workflows/
│       └── release.yml
├── .gitignore
├── CHANGELOG.md
├── LICENSE
├── README.md
├── main.js
├── manifest.json
├── versions.json
└── presets/
```

---

## ❓ FAQ

### Does the plugin modify my Markdown files?

No. The plugin does not modify your Markdown files. All styling settings are stored separately in the plugin's settings.

### Does it work on mobile?

Yes. The plugin supports both desktop and mobile versions of Obsidian.

### How can I style my entire Vault?

Use the default **Entire Vault** scope. Styles configured under this scope apply across your Vault.

### Can I style only specific notes?

Yes. Create a **CSS Class Scope** and assign that CSS class to the notes you want to target.

For example:

```yaml
---
cssclasses:
  - my-special-note
---
```

### Can I share my styles with others?

Yes. Save your styles as a preset and export them as JSON. You can then share the preset with others.

### Can I reset my styles?

Yes. Use **Advanced → Danger Zone** to reset the current scope or all styles.

### Does it work with different Obsidian themes?

The plugin is designed to work with different Obsidian themes by using Obsidian's built-in CSS variables where possible.

---

## 🐛 Bug Reports

Found a bug or have a suggestion?

Before opening an issue, please check the [existing issues](https://github.com/singhaf9270/universal-text-style-manager/issues).

When reporting a bug, please include:

* Obsidian version
* Plugin version
* Operating system
* Screenshot, if applicable
* Steps to reproduce

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new branch:

```bash
git checkout -b feature/AmazingFeature
```

3. Commit your changes:

```bash
git commit -m "Add some AmazingFeature"
```

4. Push your changes:

```bash
git push origin feature/AmazingFeature
```

5. Open a Pull Request.

---

## 📦 Release Notes

### v1.0.1

Maintenance release.

* Updated version and release metadata.
* Improved repository and documentation links.

### v1.0.0 — Initial Release

The first public release of **Universal Text Style Manager**.

* Visual styling for Markdown elements
* Text and heading customization
* Block, list, and table styling
* Link and embed styling
* Light and Dark mode support
* Vault and CSS-class scopes
* 12 built-in presets
* English and Persian interface
* JSON preset import/export
* Generated CSS inspector
* Desktop and mobile support

---

## 📜 License

This project is licensed under the **MIT License**.

See the [LICENSE](https://github.com/singhaf9270/universal-text-style-manager/blob/HEAD/LICENSE) file for details.

---

## 🙏 Credits

* Built using the [Obsidian Sample Plugin](https://github.com/obsidianmd/obsidian-sample-plugin)
* Inspired by [Style Settings](https://github.com/mgmeyers/obsidian-style-settings) and the [Minimal Theme](https://github.com/kepano/obsidian-minimal)

---

### ⭐ Like the plugin?

If you find **Universal Text Style Manager** useful, consider giving the repository a star.

**Made with ❤️ for the Obsidian community.**

[⬆ Back to top](#-universal-text-style-manager)
