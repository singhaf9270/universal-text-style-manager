<div align="center">

# 🎨 Universal Text Style Manager

**Visually style text, headings, blocks, lists, tables, links, and embeds in Obsidian — without writing CSS.**

Works seamlessly in both **Live Preview** and **Reading View**.
Your Markdown files are never modified.

[![Obsidian Plugin](https://img.shields.io/badge/Obsidian-Plugin-7c3aed?style=for-the-badge\&logo=obsidian\&logoColor=white)](https://obsidian.md)
[![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)](https://github.com/saeedghobadi/universal-text-style-manager/releases)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)
[![Downloads](https://img.shields.io/github/downloads/saeedghobadi/universal-text-style-manager/total?style=for-the-badge\&color=orange)](https://github.com/saeedghobadi/universal-text-style-manager/releases)

[📥 Installation](#-نصب--installation) • [✨ Features](#-ویژگیها--features) • [🎮 Usage](#-استفاده--usage) • [📺 Channels](#-کانالهای-ما--our-channels)

</div>

---

## 📖 درباره پلاگین

**Universal Text Style Manager** یک پلاگین برای Obsidian است که به شما اجازه می‌دهد بدون نوشتن حتی یک خط CSS، ظاهر بخش‌های مختلف یادداشت‌های خود را به‌صورت بصری تنظیم کنید.

می‌توانید ظاهر **متن، سرتیترها، بلوک‌ها، لیست‌ها، جدول‌ها، لینک‌ها، امبدها و بسیاری از عناصر Markdown** را از طریق یک رابط کاربری گرافیکی کنترل کنید.

> 💡 **فایل‌های Markdown شما هرگز تغییر نمی‌کنند.**
> تمام استایل‌ها به‌صورت جداگانه در تنظیمات پلاگین ذخیره می‌شوند.

---

## ✨ ویژگی‌ها | Features

<table>
<tr>
<td width="50%" valign="top">

### 🎨 استایل‌دهی بصری

* بدون نیاز به نوشتن CSS
* رابط کاربری گرافیکی و ساده
* پیش‌نمایش زنده
* پشتیبانی از **Light Mode** و **Dark Mode**
* امکان تنظیم استایل برای بخش‌های مختلف Markdown

### 📝 متن و سرتیترها

* تنظیم مستقل برای H1 تا H6
* پاراگراف
* **Bold**
* *Italic*
* ***Bold & Italic***
* ~~Strikethrough~~
* ==Highlight==
* `Inline Code`
* Inline Math
* Comment
* Superscript / Subscript

### 💬 بلوک‌ها

* Blockquote
* Callout
* Callout Title
* Code Block
* Math Block
* Horizontal Divider

</td>
<td width="50%" valign="top">

### 📃 لیست‌ها

* Bullet List
* Numbered List
* Nested Lists
* Task List
* Completed / Uncompleted Tasks
* List Markers & Numbers

### 📊 جدول‌ها

* Table
* Table Header
* Table Body
* Rows
* Cells
* Hover Row
* Alternating Rows

### 🔗 لینک‌ها و امبدها

* Internal Links
* External Links
* Tags
* Footnotes
* Note Embeds
* Image Embeds
* PDF Embeds
* Audio / Video Embeds

### 🌐 امکانات پیشرفته

* ۱۲ Preset آماده
* رابط کاربری دو زبانه: **English / فارسی**
* Scope برای کل Vault یا CSS Class
* CSS Class سفارشی
* Import / Export Presets به JSON
* مشاهده CSS تولیدشده

</td>
</tr>
</table>

---

## 🎁 پیش‌تنظیم‌های آماده | Built-in Presets

پلاگین شامل **۱۲ پیش‌تنظیم آماده** است که می‌توانید با یک کلیک آن‌ها را اعمال یا شخصی‌سازی کنید.

| Preset             | توضیح                                       |
| ------------------ | ------------------------------------------- |
| 🌿 **Minimal**     | تایپوگرافی آرام و کاغذی با سرتیترهای خط‌دار |
| ☀️ **Solarized**   | پالت کلاسیک Solarized                       |
| ❄️ **Nord**        | پالت شمالی و آرکتیک                         |
| 🎨 **Gruvbox**     | پالت گرم و رترو                             |
| 🌃 **Tokyo Night** | تم تاریک نئونی با آبی برقی                  |
| 🪟 **Glass**       | سطوح شفاف با گرادیانت و سایه نرم            |
| 💡 **Neon**        | سبک سایبرپانک با درخشش صورتی و فیروزه‌ای    |
| 🌊 **Ocean**       | تم گرادیانت آبی عمیق                        |
| 🌙 **Dark**        | سطوح زغالی برای حالت تاریک                  |
| ☁️ **Light**       | سطوح روشن و تمیز برای حالت روشن             |
| 📖 **Academic**    | سبک مقاله با بدنه Serif و سرتیترهای خط‌دار  |
| 💻 **Developer**   | الهام‌گرفته از محیط ترمینال و GitHub        |

---

## 📥 نصب | Installation

### روش ۱: Community Plugins

پس از تأیید و انتشار پلاگین در Community Plugins:

1. به **Settings → Community Plugins → Browse** بروید.
2. عبارت **Universal Text Style Manager** را جستجو کنید.
3. روی **Install** کلیک کنید.
4. سپس پلاگین را **Enable** کنید.

### روش ۲: نصب دستی | Manual Installation

1. به صفحه [Releases](https://github.com/saeedghobadi/universal-text-style-manager/releases/latest) بروید.
2. فایل‌های `manifest.json` و `main.js` را دانلود کنید.
3. در Vault خود پوشه زیر را ایجاد کنید:

```text
<YourVault>/.obsidian/plugins/universal-text-style-manager/
```

4. فایل‌های `manifest.json` و `main.js` را داخل آن قرار دهید.
5. Obsidian را Reload کنید.
6. از مسیر **Settings → Community Plugins** پلاگین را فعال کنید.

### روش ۳: نصب با BRAT

برای نصب نسخه‌های توسعه یا بتا می‌توانید از [BRAT](https://github.com/TfTHacker/obsidian42-brat) استفاده کنید.

1. پلاگین **BRAT** را نصب کنید.
2. در BRAT گزینه **Add Beta Plugin** را انتخاب کنید.
3. آدرس زیر را وارد کنید:

```text
saeedghobadi/universal-text-style-manager
```

4. روی **Add Plugin** کلیک کنید.

---

## 🎮 استفاده | Usage

### 🚀 باز کردن Style Manager

سه روش برای باز کردن رابط کاربری پلاگین وجود دارد:

| روش                    | نحوه استفاده                                                            |
| ---------------------- | ----------------------------------------------------------------------- |
| 🎨 **Ribbon**          | روی آیکون پالت در نوار کناری کلیک کنید                                  |
| ⌨️ **Command Palette** | `Ctrl/Cmd + P` → **Open Style Manager**                                 |
| 🖱️ **Context Menu**   | روی متن انتخاب‌شده کلیک راست کنید و گزینه مربوط به Style را انتخاب کنید |

### 🎯 گردش کار

1. دسته‌بندی موردنظر را از سمت چپ انتخاب کنید.
2. عنصر موردنظر را انتخاب کنید.
3. تنظیمات ظاهری را تغییر دهید.
4. نتیجه را در پیش‌نمایش مشاهده کنید.
5. برای تنظیم جداگانه حالت تاریک، گزینه **Separate styles for dark mode** را فعال کنید.

---

## 🎯 محدوده‌ها | Scopes

با استفاده از Scope می‌توانید مشخص کنید استایل‌ها روی چه بخش‌هایی از Vault اعمال شوند.

| Scope               | اعمال روی                                       |
| ------------------- | ----------------------------------------------- |
| **Entire Vault**    | تمام یادداشت‌های Vault                          |
| **CSS Class Scope** | فقط یادداشت‌هایی که CSS Class مشخص‌شده را دارند |

### مثال

در Frontmatter یادداشت:

```yaml
---
cssclasses:
  - my-special-note
---
```

سپس در **Universal Text Style Manager** یک Scope با نام زیر ایجاد کنید:

```text
my-special-note
```

از این طریق می‌توانید استایل‌های متفاوتی برای یادداشت‌هایی با یک CSS Class مشخص ایجاد کنید.

---

## 🌐 تغییر زبان | Language

برای تغییر زبان رابط کاربری:

**Settings → Universal Text Style Manager → Language**

زبان موردنظر را انتخاب کنید:

* 🇬🇧 English
* 🇮🇷 فارسی

---

## 📺 کانال‌های ما | Our Channels

<div align="center">

### 🎓 آموزش Obsidian به زبان فارسی

اگر می‌خواهید Obsidian را حرفه‌ای‌تر یاد بگیرید، آموزش‌ها و مطالب ما را دنبال کنید.

| کانال           | لینک                                             | محتوا                          |
| --------------- | ------------------------------------------------ | ------------------------------ |
| 🎬 **YouTube**  | [@obsidiantut](https://youtube.com/@obsidiantut) | آموزش‌های ویدیویی کامل         |
| 💬 **Telegram** | [@obsidiantut](https://t.me/obsidiantut)         | آموزش، پرسش و پاسخ و فایل‌ها   |
| 🇮🇷 **Bale**   | [@obsidiantut](https://ble.ir/obsidiantut)       | نسخه فارسی برای کاربران ایرانی |

</div>

---

## 🛠️ توسعه | Development

### Clone Repository

```bash
git clone https://github.com/saeedghobadi/universal-text-style-manager.git
cd universal-text-style-manager
```

برای توسعه پلاگین، فایل‌ها را در پوشه پلاگین Vault خود قرار دهید و سپس Obsidian را Reload کنید.

### ساختار پروژه

```text
universal-text-style-manager/
├── .github/
│   └── workflows/
│       └── release.yml       # انتشار خودکار
├── .gitignore
├── CHANGELOG.md              # تغییرات نسخه‌ها
├── LICENSE                   # مجوز MIT
├── README.md                 # مستندات پروژه
├── main.js                   # کد اصلی پلاگین
├── manifest.json             # اطلاعات پلاگین
└── versions.json             # سازگاری نسخه‌ها
```

---

## ❓ سوالات متداول | FAQ

<details>
<summary><b>آیا فایل‌های Markdown من تغییر می‌کنند؟</b></summary>

<br>

خیر. پلاگین فایل‌های Markdown شما را تغییر نمی‌دهد. تمام استایل‌ها به‌صورت جداگانه در تنظیمات پلاگین ذخیره می‌شوند.

</details>

<details>
<summary><b>آیا پلاگین روی موبایل کار می‌کند؟</b></summary>

<br>

بله. پلاگین برای استفاده در Obsidian روی دسکتاپ و موبایل طراحی شده است.

</details>

<details>
<summary><b>چگونه استایل‌ها را روی همه یادداشت‌ها اعمال کنم؟</b></summary>

<br>

از Scope پیش‌فرض **Entire Vault** استفاده کنید. این Scope روی تمام یادداشت‌های Vault اعمال می‌شود.

</details>

<details>
<summary><b>چگونه استایل‌ها را فقط روی یک گروه از یادداشت‌ها اعمال کنم؟</b></summary>

<br>

یک Scope از نوع **CSS Class** ایجاد کنید و سپس CSS Class موردنظر را در Frontmatter یادداشت‌ها قرار دهید.

مثال:

```yaml
---
cssclasses:
  - my-special-note
---
```

</details>

<details>
<summary><b>آیا می‌توانم استایل‌ها را با دیگران به اشتراک بگذارم؟</b></summary>

<br>

بله. می‌توانید تنظیمات را به‌صورت Preset ذخیره کرده و آن را به شکل JSON Export کنید.

</details>

<details>
<summary><b>چگونه تنظیمات را به حالت قبل برگردانم؟</b></summary>

<br>

از بخش **Advanced → Danger Zone** می‌توانید Scope فعلی یا تمام استایل‌ها را Reset کنید.

</details>

<details>
<summary><b>پلاگین با کدام تم‌های Obsidian سازگار است؟</b></summary>

<br>

پلاگین برای سازگاری با تم‌های مختلف Obsidian طراحی شده و از متغیرهای CSS داخلی Obsidian استفاده می‌کند.

</details>

---

## 🐛 گزارش مشکل | Bug Reports

اگر با مشکلی مواجه شدید یا پیشنهادی برای بهبود پلاگین دارید:

1. ابتدا [Issues موجود](https://github.com/saeedghobadi/universal-text-style-manager/issues) را بررسی کنید.
2. اگر مشکل جدید است، یک Issue جدید ایجاد کنید.
3. در صورت امکان اطلاعات زیر را اضافه کنید:

* نسخه Obsidian
* نسخه پلاگین
* سیستم‌عامل
* اسکرین‌شات
* مراحل بازتولید مشکل

---

## 🤝 مشارکت | Contributing

از مشارکت شما استقبال می‌کنیم.

برای مشارکت در پروژه:

1. Repository را **Fork** کنید.
2. یک Branch جدید ایجاد کنید:

```bash
git checkout -b feature/AmazingFeature
```

3. تغییرات خود را Commit کنید:

```bash
git commit -m "Add some AmazingFeature"
```

4. Branch را Push کنید:

```bash
git push origin feature/AmazingFeature
```

5. یک **Pull Request** ایجاد کنید.

---

## 📜 مجوز | License

این پروژه تحت مجوز **MIT License** منتشر شده است.

برای جزئیات بیشتر، فایل [LICENSE](LICENSE) را مشاهده کنید.

```text
MIT License

Copyright (c) 2025 Saeed Ghobadi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

---

## 🙏 سپاسگزاری | Credits

* ساخته‌شده بر پایه **Obsidian Sample Plugin**
* با الهام از پلاگین‌های **Style Settings** و **Minimal Theme**

---

## 📊 آمار پروژه | Stats

<div align="center">

![GitHub Stars](https://img.shields.io/github/stars/saeedghobadi/universal-text-style-manager?style=social)

![GitHub Forks](https://img.shields.io/github/forks/saeedghobadi/universal-text-style-manager?style=social)

![GitHub Watchers](https://img.shields.io/github/watchers/saeedghobadi/universal-text-style-manager?style=social)

<br>

⭐ اگر این پلاگین برایتان مفید بود، خوشحال می‌شویم با یک **Star** از پروژه حمایت کنید.

ساخته‌شده با ❤️ برای جامعه Obsidian

<br>

<a href="#-universal-text-style-manager">⬆ بازگشت به بالا</a>

</div>
