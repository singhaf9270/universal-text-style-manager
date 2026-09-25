# universal-text-style-manager
Obsidian-universal-text-style-manager
<div align="center">

# 🎨 Universal Text Style Manager

**Visually style text, headings, blocks, lists, tables, links and embeds in Obsidian — without writing any CSS.**

Works seamlessly in both **Live Preview** and **Reading View**. Your Markdown files are never modified.

[![Obsidian Plugin](https://img.shields.io/badge/Obsidian-Plugin-7c3aed?style=for-the-badge&logo=obsidian&logoColor=white)](https://obsidian.md)
[![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)](https://github.com/saeedghobadi/universal-text-style-manager/releases)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)
[![Downloads](https://img.shields.io/github/downloads/saeedghobadi/universal-text-style-manager/total?style=for-the-badge&color=orange)](https://github.com/saeedghobadi/universal-text-style-manager/releases)

[📥 نصب](#-نصب--installation) • [✨ ویژگی‌ها](#-ویژگیها--features) • [🎮 استفاده](#-استفاده--usage) • [📺 آموزش](#-کانالهای-ما--our-channels)

</div>

---

## 📖 درباره پلاگین

**Universal Text Style Manager** یک پلاگین قدرتمند برای Obsidian است که به شما اجازه می‌دهد بدون نوشتن حتی یک خط CSS، تمام عناصر Markdown خود را به‌صورت بصری استایل‌دهی کنید.

> 💡 **فایل‌های Markdown شما هرگز تغییر نمی‌کنند** — همه استایل‌ها به‌صورت جداگانه در تنظیمات پلاگین ذخیره می‌شوند.

---

## ✨ ویژگی‌ها | Features

<table>
<tr>
<td width="50%" valign="top">

### 🎨 استایل‌دهی بصری
- بدون نیاز به CSS
- رابط کاربری کامل و آسان
- پیش‌نمایش زنده درون پلاگین
- پشتیبانی از **Light** و **Dark** جداگانه

### 📝 متن و سرتیترها
- هر سرتیتر (H1 تا H6) تنظیمات مستقل دارد
- پاراگراف، **ضخیم**، *کج*، ***ضخیم و کج***
- ~~خط خورده~~، ==هایلایت==، `کد درون خطی`
- ریاضی درون خطی، کامنت، بالا/زیرنویس

### 💬 بلوک‌ها
- نقل قول (Blockquote)
- کالوت (Callout) + عنوان کالوت
- بلوک کد + بلوک ریاضی
- خط افقی (Divider)

</td>
<td width="50%" valign="top">

### 📃 لیست‌ها
- لیست نقطه‌ای، شماره‌دار، تودرتو
- لیست تسک (انجام‌شده / انجام‌نشده)
- نشانگرها و شماره‌های لیست

### 📊 جدول‌ها
- جدول، سربرگ، بدنه، سطر، سلول
- سطر هاور و سطر یک‌درمیان

### 🔗 لینک‌ها و امبدها
- لینک داخلی، خارجی، تگ، پانویس
- امبد یادداشت، تصویر، PDF، صدا/ویدیو

### 🌐 امکانات پیشرفته
- ۱۲ پیش‌تنظیم آماده
- دو زبانه: **English** و **فارسی**
- محدوده (Scope) کل والت یا کلاس CSS
- کلاس‌های CSS سفارشی
- ورود/خروج پیش‌تنظیم‌ها به JSON
- بازرسی CSS تولیدشده

</td>
</tr>
</table>

---

## 🎁 پیش‌تنظیم‌های آماده | Built-in Presets

پلاگین شامل ۱۲ پیش‌تنظیم حرفه‌ای است که با یک کلیک قابل اعمال هستند:

| پیش‌تنظیم | توضیح |
|-----------|-------|
| 🌿 **Minimal** | تایپوگرافی آرام و کاغذی، سرتیترهای خط‌دار |
| ☀️ **Solarized** | پالت کلاسیک Solarized |
| ❄️ **Nord** | پالت شمالی و آرکتیک |
| 🎨 **Gruvbox** | پالت گرم و رترو |
| 🌃 **Tokyo Night** | تم تاریک نئونی با آبی برقی |
| 🪟 **Glass** | سطوح شفاف با گرادیانت و سایه نرم |
| 💡 **Neon** | سایبرپانک با درخشش صورتی و فیروزه‌ای |
| 🌊 **Ocean** | تم گرادیانت آبی عمیق |
| 🌙 **Dark** | سطوح زغالی برای حالت تاریک |
| ☁️ **Light** | سطوح روشن و تمیز برای حالت روشن |
| 📖 **Academic** | شبیه مقاله، بدنه Serif، سرتیترهای خط‌دار |
| 💻 **Developer** | الهام‌گرفته از ترمینال، رنگ‌های GitHub |

---

## 📥 نصب | Installation

### روش ۱: از طریق Community Plugins (بعد از تأیید Obsidian)

1. **Settings** → **Community Plugins** → **Browse** را باز کنید
2. عبارت **Universal Text Style Manager** را جستجو کنید
3. روی **Install** کلیک کنید
4. سپس **Enable** کنید

### روش ۲: نصب دستی (Manual)

1. فایل‌های `manifest.json` و `main.js` را از [آخرین انتشار](https://github.com/saeedghobadi/universal-text-style-manager/releases/latest) دانلود کنید
2. در Vault خود این پوشه را بسازید:

<YourVault>/.obsidian/plugins/universal-text-style-manager/
text

3. هر دو فایل را داخل پوشه کپی کنید
4. Obsidian را دوباره اجرا کنید
5. در **Settings** → **Community Plugins** پلاگین را فعال کنید

### روش ۳: با BRAT (برای نسخه‌های بتا)

1. پلاگین [BRAT](https://github.com/TfTHacker/obsidian42-brat) را نصب کنید
2. در BRAT: **Add Beta Plugin** → `saeedghobadi/universal-text-style-manager`
3. روی **Add Plugin** کلیک کنید

---

## 🎮 استفاده | Usage

### 🚀 باز کردن مدیر استایل

سه راه برای باز کردن رابط کاربری:

| روش | دستور |
|------|-------|
| 🎨 **Ribbon** | روی آیکون پالت در نوار کناری کلیک کنید |
| ⌨️ **Command Palette** | `Ctrl/Cmd + P` → **"Open Style Manager"** |
| 🖱️ **Context Menu** | کلیک راست روی متن انتخابی → **"Style {what} text..."** |

### 🎯 گردش کار

1. دسته‌بندی مورد نظر را از سمت چپ انتخاب کنید (متن، سرتیترها، بلوک‌ها و...)
2. روی کارت عنصر مورد نظر کلیک کنید تا باز شود
3. تنظیمات را تغییر دهید — **پیش‌نمایش به‌صورت زنده به‌روزرسانی می‌شود**
4. برای حالت تاریک جداگانه، چک‌باکس **"Separate styles for dark mode"** را فعال کنید

### 🎯 محدوده‌ها (Scopes)

| محدوده | اعمال روی |
|--------|-----------|
| **Entire vault** | تمام یادداشت‌های والت |
| **CSS-class scope** | فقط یادداشت‌هایی که `cssclasses: [your-class]` دارند |

**مثال استفاده از Scope:**

در frontmatter یادداشت خود بنویسید:

```yaml
---
cssclasses: [my-special-note]
---

سپس در مدیر استایل یک Scope با نام my-special-note بسازید و استایل‌های خاص آن یادداشت را تنظیم کنید.
🌐 تغییر زبان

Settings → Universal Text Style Manager → Language → انتخاب English یا فارسی
📺 کانال‌های ما | Our Channels
<div align="center">
🎓 آموزش Obsidian به زبان فارسی

اگر می‌خواهید Obsidian را حرفه‌ای یاد بگیرید، به کانال‌های ما سر بزنید:

https://img.shields.io/badge/YouTube-@obsidiantut-FF0000?style=for-the-badge&logo=youtube&logoColor=white
https://img.shields.io/badge/Telegram-@obsidiantut-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white
https://img.shields.io/badge/Bale-@obsidiantut-00A693?style=for-the-badge&logo=chatbot&logoColor=white

کانال	لینک	محتوا
🎬 YouTube	youtube.com/@obsidiantut	آموزش‌های ویدیویی کامل
💬 Telegram	t.me/obsidiantut	پرسش و پاسخ، فایل‌ها
🇮🇷 Bale	ble.ir/obsidiantut	نسخه فارسی برای کاربران ایرانی
</div>
🛠️ توسعه | Development
bash

# کلون ریپازیتوری
git clone https://github.com/saeedghobadi/universal-text-style-manager.git
cd universal-text-style-manager

# کپی فایل‌ها به پوشه پلاگین در والت خود
# سپس Obsidian را reload کنید

ساختار پروژه
text

universal-text-style-manager/
├── .github/
│   └── workflows/
│       └── release.yml       # انتشار خودکار
├── .gitignore
├── CHANGELOG.md              # تغییرات نسخه‌ها
├── LICENSE                   # مجوز MIT
├── README.md                 # همین فایل
├── main.js                   # کد اصلی پلاگین
├── manifest.json             # تنظیمات پلاگین
└── versions.json             # نقشه نسخه‌ها

❓ سوالات متداول | FAQ
<details> <summary><b>آیا فایل‌های Markdown من تغییر می‌کنند؟</b></summary> <br> خیر! پلاگین هرگز فایل‌های شما را تغییر نمی‌دهد. همه استایل‌ها در فایل تنظیمات پلاگین ذخیره می‌شوند. </details><details> <summary><b>آیا روی موبایل کار می‌کند؟</b></summary> <br> بله! پلاگین هم روی دسکتاپ و هم روی موبایل کار می‌کند. </details><details> <summary><b>چگونه استایل‌ها را روی همه یادداشت‌ها اعمال کنم؟</b></summary> <br> از Scope پیش‌فرض <b>Entire vault</b> استفاده کنید. این Scope به‌طور پیش‌فرض انتخاب شده است. </details><details> <summary><b>چگونه استایل‌ها را فقط روی یک یادداشت خاص اعمال کنم؟</b></summary> <br> یک Scope از نوع CSS-class بسازید، سپس در frontmatter یادداشت خود <code>cssclasses: [your-class]</code> را اضافه کنید. </details><details> <summary><b>آیا می‌توانم استایل‌ها را با دوستانم به اشتراک بگذارم؟</b></summary> <br> بله! از بخش Presets می‌توانید استایل‌های فعلی را به‌عنوان Preset ذخیره کنید و به‌صورت JSON خروجی بگیرید. </details><details> <summary><b>چگونه به نسخه قبلی برگردم؟</b></summary> <br> از بخش <b>Advanced → Danger zone</b> می‌توانید Scope فعلی یا همه استایل‌ها را بازنشانی کنید. </details><details> <summary><b>پلاگین با کدام تم‌ها سازگار است؟</b></summary> <br> با همه تم‌های Obsidian سازگار است چون از متغیرهای CSS داخلی Obsidian استفاده می‌کند. </details>
🐛 گزارش مشکل | Bug Reports

اگر مشکلی پیدا کردید یا پیشنهادی دارید:

    ابتدا Issues موجود را بررسی کنید

    اگر مشکل جدید است، یک Issue جدید باز کنید

    لطفاً این اطلاعات را ضمیمه کنید:

        نسخه Obsidian

        نسخه پلاگین

        سیستم‌عامل

        اسکرین‌شات (اگر ممکن است)

        مراحل بازتولید مشکل

🤝 مشارکت | Contributing

از مشارکت شما استقبال می‌کنیم! برای مشارکت:

    ریپو را Fork کنید

    یک Branch جدید بسازید (git checkout -b feature/AmazingFeature)

    تغییرات را Commit کنید (git commit -m 'Add some AmazingFeature')

    Branch را Push کنید (git push origin feature/AmazingFeature)

    یک Pull Request باز کنید

📜 مجوز | License

این پروژه تحت مجوز MIT منتشر شده است — برای جزئیات فایل LICENSE را ببینید.
text

MIT License

Copyright (c) 2025 Saeed Ghobadi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...

🙏 سپاسگزاری | Credits

    ساخته‌شده با قالب Obsidian Sample Plugin

    الهام‌گرفته از پلاگین‌های Style Settings و Minimal Theme

📊 آمار پروژه | Stats

https://img.shields.io/github/stars/saeedghobadi/universal-text-style-manager?style=social
https://img.shields.io/github/forks/saeedghobadi/universal-text-style-manager?style=social
https://img.shields.io/github/watchers/saeedghobadi/universal-text-style-manager?style=social
<div align="center">
⭐ اگر این پلاگین برایتان مفید بود، یک ستاره بدهید! ⭐

ساخته‌شده با ❤️ برای جامعه Obsidian فارسی‌زبان

⬆ بازگشت به بالا
</div> ```
