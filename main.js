"use strict";
/*
 * Universal Text Style Manager — v1.0.1 (bundled, bilingual, fully inline)
 * All UI strings + UI CSS are embedded. No external style.css needed.
 *
 * v1.0.1 changes:
 *  - Improved plugin stability and compatibility
 *  - Updated release metadata
 *  - Minor fixes and refinements
 *  - Live Preview code blocks render as one continuous container
 *  - Full support for text, headings, blocks, lists, tables, links, embeds
 *  - 12 built-in presets, bilingual UI (English & Farsi)
 *  - Scopes, custom CSS classes, import/export presets
 */
const obsidian = require("obsidian");
const { Plugin, Notice, Modal, PluginSettingTab, Setting, MarkdownRenderer, Component, Menu, setIcon } = obsidian;

/* ================================================================== */
/* [i18n]                                                              */
/* ================================================================== */
const I18N = {
  en: {
    _dir: "ltr", _lang: "en",
    ribbonTitle: "Universal Text Style Manager",
    cmdOpenStyleManager: "Open Style Manager",
    cmdToggleStyleManager: "Toggle Style Manager",
    cmdResetCurrentStyle: "Reset all styles in the active scope",
    cmdApplyPreset: "Apply a preset to the active scope",
    cmdStyleText: "Style {what} text...",

    settingsHeading: "Universal Text Style Manager",
    settingsIntro: "Visually style Markdown elements in both Live Preview and Reading View. Your Markdown files are never modified.",
    settingsStyleManager: "Style Manager",
    settingsStyleManagerDesc: "Open the full visual styling interface (categories, cards, live preview, presets, scopes).",
    settingsOpenBtn: "Open Style Manager",
    settingsShowPreview: "Show live preview panel",
    settingsShowPreviewDesc: "Display the live preview pane inside the Style Manager.",
    settingsConfirmPreset: "Confirm before applying presets",
    settingsConfirmPresetDesc: "Ask before a preset overwrites existing styles in the current scope.",
    settingsApplyPreset: "Apply preset",
    settingsApplyPresetDesc: "Apply a preset to the currently active scope.",
    settingsChoosePresetBtn: "Choose preset...",
    settingsDangerZone: "Danger zone",
    settingsResetEverything: "Reset everything",
    settingsResetEverythingDesc: "Remove all styles in every scope and all custom CSS classes. Presets are kept.",
    settingsResetEverythingBtn: "Reset everything",

    modalTitle: "Universal Text Style Manager",
    headerScope: "Scope",
    headerAddScope: "Add CSS-class scope",
    headerPresets: "Presets",
    headerPreview: "Preview",
    headerLanguage: "Language",

    catText: "Text", catHeadings: "Headings", catBlocks: "Blocks", catLists: "Lists",
    catTables: "Tables", catLinks: "Links & Tags", catEmbeds: "Embeds & Media",
    catOther: "Other Elements", catAdvanced: "Advanced",
    catTextDesc: "Inline text elements - emphasis, code, math and more.",
    catHeadingsDesc: "Each heading level has fully independent settings.",
    catBlocksDesc: "Block-level elements: quotes, callouts, code, math and rules.",
    catListsDesc: "Bullet, numbered, nested and task lists - including markers.",
    catTablesDesc: "Tables render as widgets in Live Preview, so the same styling applies in both views.",
    catLinksDesc: "Links, wiki links and tags.",
    catEmbedsDesc: "Embedded notes/blocks, images, PDFs and audio/video. Best tested in a real note.",
    catOtherDesc: "Tags, properties and search highlights.",
    catAdvancedDesc: "Scopes, custom CSS classes, presets, generated CSS and tools.",

    elParagraph: "Paragraph", elBold: "Bold", elItalic: "Italic", elBoldItalic: "Bold + Italic",
    elStrikethrough: "Strikethrough", elHighlight: "Highlight", elInlineCode: "Inline code",
    elInlineMath: "Inline math", elFootnoteRef: "Footnote reference", elComment: "Comment",
    elSuperscript: "Superscript", elSubscript: "Subscript", elHeading: "Heading",
    elBlockquote: "Blockquote", elCallout: "Callout", elCalloutTitle: "Callout title",
    elCodeBlock: "Code block", elMathBlock: "Math block", elHorizontalRule: "Horizontal rule (divider)",
    elBulletList: "Bullet list", elNumberedList: "Numbered list", elNestedList: "Nested list",
    elTaskList: "Task list", elTaskChecked: "Checked task", elTaskUnchecked: "Unchecked task",
    elListMarker: "List markers & numbers", elTable: "Table", elTableHeader: "Table header",
    elTableBody: "Table body", elTableRow: "Table row", elTableCell: "Table cell",
    elTableRowHover: "Table row (hover)", elTableRowAlt: "Table row (alternating)",
    elLink: "Links (all)", elInternalLink: "Internal / wiki link", elExternalLink: "External link",
    elTag: "Tag", elEmbed: "Embedded note / block", elImage: "Image", elPdfEmbed: "PDF embed",
    elMediaEmbed: "Audio / video", elProperties: "Properties / metadata", elSearchMatch: "Search highlight",

    groupText: "Text", groupBackground: "Background", groupBorder: "Border",
    groupSpacing: "Spacing", groupEffects: "Effects",

    ctrlTextColor: "Text color", ctrlTextGradient: "Text gradient", ctrlTextOpacity: "Text opacity",
    ctrlFontWeight: "Font weight", ctrlFontStyle: "Font style", ctrlFontSize: "Font size",
    ctrlLetterSpacing: "Letter spacing", ctrlLineHeight: "Line height",
    ctrlDecoration: "Decoration", ctrlDecorationStyle: "Decoration style", ctrlDecorationColor: "Decoration color",
    ctrlBackgroundColor: "Background color", ctrlBackgroundOpacity: "Background opacity", ctrlGradient: "Background gradient",
    ctrlBorderStyle: "Border style", ctrlBorderColor: "Border color", ctrlBorderRadius: "Border radius", ctrlBorderWidth: "Border width",
    ctrlPadding: "Padding", ctrlMargin: "Margin",
    ctrlBoxShadow: "Box shadow", ctrlTextShadow: "Text shadow", ctrlBlur: "Blur",
    ctrlSuggestions: "Suggestions",
    ctrlGradientSuggestions: "Gradient suggestions",

    phFontSize: "e.g. 1.1em or 16px", phLetterSpacing: "e.g. 0.05em", phLineHeight: "e.g. 1.6",
    phGradient: "linear-gradient(135deg, #667eea, #764ba2)",
    phTextGradient: "linear-gradient(90deg, #db2777, #7c3aed)",
    phBorderRadius: "e.g. 8px", phBoxShadow: "0 2px 8px rgba(0,0,0,0.3)",
    phTextShadow: "0 1px 2px rgba(0,0,0,0.5)", phBlur: "e.g. 2px",
    phColor: "#RRGGBB or rgb()", phSide: "e.g. 8px",

    optDefault: "Default", optNormal: "Normal", optBold: "Bold",
    optLight: "Light", optMedium: "Medium", optSemibold: "Semibold",
    optItalic: "Italic", optOblique: "Oblique",
    optNone: "None", optSolid: "Solid", optDashed: "Dashed", optDotted: "Dotted",
    optDouble: "Double", optGroove: "Groove", optRidge: "Ridge",
    optInset: "Inset", optOutset: "Outset", optHidden: "Hidden",
    optUnderline: "Underline", optStrikethrough: "Strikethrough", optOverline: "Overline",
    optUnderlineStrike: "Underline + strikethrough", optWavy: "Wavy",

    cardReset: "Reset this element", cardResetTitle: "Reset this element",
    cardSeparate: "Separate styles for dark mode",
    cardLowContrast: "Low contrast between text and background - this may be hard to read.",

    catResetBtn: "Reset category",

    previewTitle: "Preview", previewReading: "Reading", previewEditor: "Editor",
    previewReadingTip: "Reading View rendering", previewEditorTip: "Simulated Live Preview",
    previewNoAdvanced: "Preview is available for the style categories.",
    previewFailed: "Preview could not be rendered.",

    confirmCancel: "Cancel", confirmOk: "Confirm",

    applyPresetTitle: "Apply preset",
    applyPresetIntro: "Presets replace all styles in the current scope",
    applyPresetBtn: "Apply",
    applyPresetConfirmTitle: "Apply preset?",
    applyPresetConfirmMsg: "Applying \"{name}\" will replace all existing styles in the \"{scope}\" scope. Your notes are never modified.",
    applyPresetConfirmBtn: "Apply preset",
    presetApplied: "Preset \"{name}\" applied to \"{scope}\".",

    importPresetTitle: "Import preset",
    importPresetIntro: "Paste preset JSON (or choose a .json file), then click Import.",
    importPresetBtn: "Import", importPresetInvalidJson: "Invalid JSON.",
    importPresetNotPreset: "This does not look like a plugin preset.",
    importPresetImported: "Preset imported.", importPresetNameDefault: "Imported preset",
    importPresetReadFail: "Could not read the file.",
    exportPresetTitle: "Export \"{name}\"",
    exportCopy: "Copy", exportSaveFile: "Save as file...", exportClose: "Close",
    exportCopied: "Preset JSON copied.", exportClipboardFail: "Could not access the clipboard.",
    exportSaveFail: "Could not save the file.",

    scopeNameLabel: "Scope name", scopeClassName: "CSS class (used in cssclasses)",
    scopeAddTitle: "Add CSS-class scope", scopeAddBtn: "Add scope",
    scopeInvalidClass: "Please enter a valid CSS class name.",
    scopeReserved: "That class name is reserved.",
    scopeDuplicate: "A scope with that class already exists.",
    scopeCreated: "Scope \"{name}\" created.",
    scopeRenameTitle: "Rename scope", scopeNameField: "Scope name", scopeClassField: "CSS class",
    scopeDeleteTitle: "Delete scope?",
    scopeDeleteMsg: "This deletes the \"{name}\" scope and all styles in it.",
    scopeDeleteBtn: "Delete scope",
    scopeVaultName: "Entire vault", scopeVaultDesc: "Applies to the entire vault",
    scopeClassDesc: "Applies to notes with cssclasses \".{cls}\"",
    scopeActive: "Active", scopeSelect: "Select", scopeRename: "Rename", scopeDelete: "Delete",
    scopeAdd: "Add CSS-class scope",

    advScopesTitle: "Scopes",
    advScopesDesc: "Styles are grouped into scopes. The vault scope applies everywhere.",
    advCustomClassesTitle: "Custom CSS classes",
    advCustomClassesDesc: "Define styles for a class name, then apply it to notes via the cssclasses frontmatter property.",
    advUseInNote: "Use it in a note:",
    advAddClassBtn: "Add custom class", advAddClassTitle: "Add custom CSS class",
    advAddClassField: "Class name", advAddClassPlaceholder: "my-important-text",
    advAddClassBtnShort: "Add class", advClassNameInUse: "That class name is already in use.",
    advDeleteClassTitle: "Delete custom class?",
    advDeleteClassMsg: "This deletes the CSS generated for \".{name}\".",
    advDeleteClassBtn: "Delete",

    advPresetsTitle: "Presets",
    advPresetsDesc: "Apply, duplicate, rename, export and import style presets.",
    advSaveCurrentAsPreset: "Save current styles as preset",
    advImportPreset: "Import preset...",
    advSaveCurrentTitle: "Save current styles as preset",
    advPresetNameField: "Preset name", advPresetNamePlaceholder: "My preset",
    advPresetDescField: "Description (optional)", advPresetDescPlaceholder: "What this preset is for",
    advSavePresetBtn: "Save preset", advPresetNameRequired: "Please enter a preset name.",
    advPresetSaved: "Preset \"{name}\" saved.",
    advRenamePresetTitle: "Rename preset", advPresetNameLabel: "Preset name", advPresetDescLabel: "Description",
    advDeletePresetTitle: "Delete preset?",
    advDeletePresetMsg: "This deletes the preset \"{name}\".",
    advDeletePresetBtn: "Delete", advDuplicateBtn: "Duplicate", advExportBtn: "Export",
    advBuiltIn: "Built-in", advCustom: "Custom",

    advGeneratedCssTitle: "Generated CSS",
    advGeneratedCssDesc: "Inspect the exact CSS the plugin currently generates.",
    advCopyCssBtn: "Copy", advRefreshCssBtn: "Refresh", advCssCopied: "CSS copied.",

    advDangerTitle: "Danger zone",
    advDangerDesc: "Resets are scoped to styles only - your notes and files are never modified.",
    advResetScopeBtn: "Reset current scope",
    advResetScopeTitle: "Reset current scope?",
    advResetScopeMsg: "This removes every style in the \"{name}\" scope.",
    advResetScopeConfirm: "Reset scope",
    advResetEverythingBtn: "Reset everything",
    advResetEverythingTitle: "Reset everything?",
    advResetEverythingMsg: "This removes all styles in every scope and all custom CSS classes.",
    advResetEverythingConfirm: "Reset everything",
    advAllReset: "All styles were reset.",

    catResetTitle: "Reset category?",
    catResetMsg: "This removes all styles for the elements in this category.",
    catResetConfirm: "Reset category",

    cmdResetTitle: "Reset styles?",
    cmdResetMsg: "This removes every style in the \"{name}\" scope.",
    cmdResetConfirm: "Reset styles", cmdResetDone: "Styles were reset.",

    simPropertiesNote: "Properties and the Search pane cannot be simulated here.",
    simEmbedsNote: "Embeds, images, PDFs and media render as editor widgets.",
    simNothing: "Nothing to preview for this category.",

    langLabel: "Language", langEnglish: "English", langPersian: "Farsi",

    modeLight: "Light", modeDark: "Dark",
    previewModeReading: "Reading", previewModeEditor: "Editor",
  },

  fa: {
    _dir: "rtl", _lang: "fa",
    ribbonTitle: "مدیریت استایل متن",
    cmdOpenStyleManager: "باز کردن مدیر استایل",
    cmdToggleStyleManager: "تغییر وضعیت مدیر استایل",
    cmdResetCurrentStyle: "حذف همه استایل های حوزه فعال",
    cmdApplyPreset: "اعمال پیش تنظیم روی حوزه فعال",
    cmdStyleText: "استایل متن {what}",

    settingsHeading: "مدیریت استایل متن",
    settingsIntro: "استایل دهی بصری به عناصر Markdown در هر دو حالت Live Preview و Reading View. فایل های Markdown هرگز تغییر نمی کنند.",
    settingsStyleManager: "مدیر استایل",
    settingsStyleManagerDesc: "باز کردن رابط کاربری کامل استایل دهی.",
    settingsOpenBtn: "باز کردن مدیر استایل",
    settingsShowPreview: "نمایش پنل پیش نمایش",
    settingsShowPreviewDesc: "نمایش پنل پیش نمایش درون مدیر استایل.",
    settingsConfirmPreset: "تایید قبل از اعمال پیش تنظیم",
    settingsConfirmPresetDesc: "قبل از بازنویسی استایل ها، سوال بپرس.",
    settingsApplyPreset: "اعمال پیش تنظیم",
    settingsApplyPresetDesc: "اعمال پیش تنظیم روی حوزه فعال.",
    settingsChoosePresetBtn: "انتخاب پیش تنظیم",
    settingsDangerZone: "منطقه خطر",
    settingsResetEverything: "حذف همه چیز",
    settingsResetEverythingDesc: "حذف همه استایل ها در همه حوزه ها و کلاس های CSS سفارشی.",
    settingsResetEverythingBtn: "حذف همه چیز",

    modalTitle: "مدیریت استایل متن",
    headerScope: "حوزه", headerAddScope: "افزودن حوزه کلاس CSS",
    headerPresets: "پیش تنظیم ها", headerPreview: "پیش نمایش", headerLanguage: "زبان",

    catText: "متن", catHeadings: "سرتیترها", catBlocks: "بلوک ها", catLists: "لیست ها",
    catTables: "جدول ها", catLinks: "لینک ها و تگ ها", catEmbeds: "امبدها و رسانه",
    catOther: "سایر عناصر", catAdvanced: "پیشرفته",
    catTextDesc: "عناصر متنی درون خطی.",
    catHeadingsDesc: "هر سطح سرتیتر تنظیمات مستقل دارد.",
    catBlocksDesc: "عناصر سطح بلوک: نقل قول، کالوت، کد، ریاضی و خطوط.",
    catListsDesc: "لیست های نقطه ای، شماره دار، تودرتو و تسکی.",
    catTablesDesc: "جدول ها در Live Preview به صورت ویجت رندر می شوند.",
    catLinksDesc: "لینک ها، ویکی لینک ها و تگ ها.",
    catEmbedsDesc: "یادداشت ها، تصاویر، PDF و صدا/ویدیو.",
    catOtherDesc: "تگ ها، پراپرتی ها و هایلایت های جستجو.",
    catAdvancedDesc: "حوزه ها، کلاس های CSS سفارشی، پیش تنظیم ها و CSS تولیدشده.",

    elParagraph: "پاراگراف", elBold: "ضخیم", elItalic: "کج", elBoldItalic: "ضخیم و کج",
    elStrikethrough: "خط خورده", elHighlight: "هایلایت", elInlineCode: "کد درون خطی",
    elInlineMath: "ریاضی درون خطی", elFootnoteRef: "ارجاع پانویس", elComment: "کامنت",
    elSuperscript: "بالانویس", elSubscript: "زیرنویس", elHeading: "سرتیتر",
    elBlockquote: "نقل قول", elCallout: "کالوت", elCalloutTitle: "عنوان کالوت",
    elCodeBlock: "بلوک کد", elMathBlock: "بلوک ریاضی", elHorizontalRule: "خط افقی",
    elBulletList: "لیست نقطه ای", elNumberedList: "لیست شماره دار", elNestedList: "لیست تودرتو",
    elTaskList: "لیست تسک", elTaskChecked: "تسک انجام شده", elTaskUnchecked: "تسک انجام نشده",
    elListMarker: "نشانگرهای لیست", elTable: "جدول", elTableHeader: "سربرگ جدول",
    elTableBody: "بدنه جدول", elTableRow: "سطر جدول", elTableCell: "سلول جدول",
    elTableRowHover: "سطر جدول (هاور)", elTableRowAlt: "سطر جدول (یک درمیان)",
    elLink: "همه لینک ها", elInternalLink: "لینک داخلی", elExternalLink: "لینک خارجی",
    elTag: "تگ", elEmbed: "یادداشت امبدشده", elImage: "تصویر", elPdfEmbed: "امبد PDF",
    elMediaEmbed: "صدا و ویدیو", elProperties: "پراپرتی ها", elSearchMatch: "هایلایت جستجو",

    groupText: "متن", groupBackground: "پس زمینه", groupBorder: "حاشیه",
    groupSpacing: "فاصله", groupEffects: "افکت ها",

    ctrlTextColor: "رنگ متن", ctrlTextGradient: "گرادیانت متن", ctrlTextOpacity: "شفافیت متن",
    ctrlFontWeight: "ضخامت فونت", ctrlFontStyle: "سبک فونت", ctrlFontSize: "اندازه فونت",
    ctrlLetterSpacing: "فاصله حروف", ctrlLineHeight: "ارتفاع خط",
    ctrlDecoration: "تزئین", ctrlDecorationStyle: "سبک تزئین", ctrlDecorationColor: "رنگ تزئین",
    ctrlBackgroundColor: "رنگ پس زمینه", ctrlBackgroundOpacity: "شفافیت پس زمینه", ctrlGradient: "گرادیانت پس زمینه",
    ctrlBorderStyle: "سبک حاشیه", ctrlBorderColor: "رنگ حاشیه", ctrlBorderRadius: "شعاع حاشیه", ctrlBorderWidth: "ضخامت حاشیه",
    ctrlPadding: "پدینگ", ctrlMargin: "مارجین",
    ctrlBoxShadow: "سایه جعبه", ctrlTextShadow: "سایه متن", ctrlBlur: "بلور",
    ctrlSuggestions: "پیشنهادها",
    ctrlGradientSuggestions: "گرادیانت های پیشنهادی",

    phFontSize: "مثلا 1.1em یا 16px", phLetterSpacing: "مثلا 0.05em", phLineHeight: "مثلا 1.6",
    phGradient: "linear-gradient(135deg, #667eea, #764ba2)",
    phTextGradient: "linear-gradient(90deg, #db2777, #7c3aed)",
    phBorderRadius: "مثلا 8px", phBoxShadow: "0 2px 8px rgba(0,0,0,0.3)",
    phTextShadow: "0 1px 2px rgba(0,0,0,0.5)", phBlur: "مثلا 2px",
    phColor: "#RRGGBB یا rgb()", phSide: "مثلا 8px",

    optDefault: "پیش فرض", optNormal: "معمولی", optBold: "ضخیم",
    optLight: "نازک", optMedium: "متوسط", optSemibold: "نیمه ضخیم",
    optItalic: "کج", optOblique: "مورب",
    optNone: "هیچ", optSolid: "یکدست", optDashed: "خط چین", optDotted: "نقطه چین",
    optDouble: "دوبل", optGroove: "شیاری", optRidge: "برجسته",
    optInset: "فرورفته", optOutset: "برجسته", optHidden: "مخفی",
    optUnderline: "زیرخط", optStrikethrough: "خط خورده", optOverline: "بالاخط",
    optUnderlineStrike: "زیرخط و خط خورده", optWavy: "موج دار",

    cardReset: "بازنشانی این عنصر", cardResetTitle: "بازنشانی این عنصر",
    cardSeparate: "استایل جداگانه برای حالت تاریک",
    cardLowContrast: "کنتراست کم بین متن و پس زمینه.",

    catResetBtn: "بازنشانی دسته",

    previewTitle: "پیش نمایش", previewReading: "خواندن", previewEditor: "ویرایشگر",
    previewReadingTip: "رندر در Reading View", previewEditorTip: "شبیه سازی Live Preview",
    previewNoAdvanced: "پیش نمایش برای دسته های استایل در دسترس است.",
    previewFailed: "پیش نمایش قابل رندر نبود.",

    confirmCancel: "لغو", confirmOk: "تایید",

    applyPresetTitle: "اعمال پیش تنظیم",
    applyPresetIntro: "پیش تنظیم ها همه استایل های حوزه فعلی را جایگزین می کنند",
    applyPresetBtn: "اعمال",
    applyPresetConfirmTitle: "اعمال پیش تنظیم؟",
    applyPresetConfirmMsg: "اعمال \"{name}\" همه استایل های موجود در حوزه \"{scope}\" را جایگزین می کند.",
    applyPresetConfirmBtn: "اعمال پیش تنظیم",
    presetApplied: "پیش تنظیم \"{name}\" روی \"{scope}\" اعمال شد.",

    importPresetTitle: "وارد کردن پیش تنظیم",
    importPresetIntro: "JSON پیش تنظیم را بچسبانید سپس روی وارد کردن کلیک کنید.",
    importPresetBtn: "وارد کردن", importPresetInvalidJson: "JSON نامعتبر است.",
    importPresetNotPreset: "این شبیه پیش تنظیم پلاگین نیست.",
    importPresetImported: "پیش تنظیم وارد شد.", importPresetNameDefault: "پیش تنظیم واردشده",
    importPresetReadFail: "خواندن فایل ممکن نشد.",
    exportPresetTitle: "صدور \"{name}\"",
    exportCopy: "کپی", exportSaveFile: "ذخیره به صورت فایل", exportClose: "بستن",
    exportCopied: "JSON پیش تنظیم کپی شد.", exportClipboardFail: "دسترسی به کلیپ بورد ممکن نشد.",
    exportSaveFail: "ذخیره فایل ممکن نشد.",

    scopeNameLabel: "نام حوزه", scopeClassName: "کلاس CSS",
    scopeAddTitle: "افزودن حوزه کلاس CSS", scopeAddBtn: "افزودن حوزه",
    scopeInvalidClass: "لطفا نام کلاس CSS معتبر وارد کنید.",
    scopeReserved: "این نام کلاس رزرو شده است.",
    scopeDuplicate: "حوزه ای با این کلاس وجود دارد.",
    scopeCreated: "حوزه \"{name}\" ساخته شد.",
    scopeRenameTitle: "تغییر نام حوزه", scopeNameField: "نام حوزه", scopeClassField: "کلاس CSS",
    scopeDeleteTitle: "حذف حوزه؟",
    scopeDeleteMsg: "این حوزه \"{name}\" و همه استایل های آن حذف می شود.",
    scopeDeleteBtn: "حذف حوزه",
    scopeVaultName: "کل والت", scopeVaultDesc: "روی کل والت اعمال می شود",
    scopeClassDesc: "روی یادداشت های با cssclasses \".{cls}\" اعمال می شود",
    scopeActive: "فعال", scopeSelect: "انتخاب", scopeRename: "تغییر نام", scopeDelete: "حذف",
    scopeAdd: "افزودن حوزه کلاس CSS",

    advScopesTitle: "حوزه ها",
    advScopesDesc: "استایل ها در حوزه ها دسته بندی می شوند.",
    advCustomClassesTitle: "کلاس های CSS سفارشی",
    advCustomClassesDesc: "برای یک نام کلاس استایل تعریف کنید.",
    advUseInNote: "استفاده در یادداشت:",
    advAddClassBtn: "افزودن کلاس سفارشی", advAddClassTitle: "افزودن کلاس CSS سفارشی",
    advAddClassField: "نام کلاس", advAddClassPlaceholder: "my-important-text",
    advAddClassBtnShort: "افزودن کلاس", advClassNameInUse: "این نام کلاس استفاده شده است.",
    advDeleteClassTitle: "حذف کلاس سفارشی؟",
    advDeleteClassMsg: "CSS تولیدشده برای \".{name}\" حذف می شود.",
    advDeleteClassBtn: "حذف",

    advPresetsTitle: "پیش تنظیم ها",
    advPresetsDesc: "اعمال، تکثیر، تغییر نام، صدور و ورود پیش تنظیم ها.",
    advSaveCurrentAsPreset: "ذخیره استایل های فعلی به عنوان پیش تنظیم",
    advImportPreset: "وارد کردن پیش تنظیم",
    advSaveCurrentTitle: "ذخیره استایل های فعلی",
    advPresetNameField: "نام پیش تنظیم", advPresetNamePlaceholder: "پیش تنظیم من",
    advPresetDescField: "توضیحات (اختیاری)", advPresetDescPlaceholder: "توضیح کوتاه",
    advSavePresetBtn: "ذخیره پیش تنظیم", advPresetNameRequired: "لطفا نام وارد کنید.",
    advPresetSaved: "پیش تنظیم \"{name}\" ذخیره شد.",
    advRenamePresetTitle: "تغییر نام پیش تنظیم", advPresetNameLabel: "نام", advPresetDescLabel: "توضیحات",
    advDeletePresetTitle: "حذف پیش تنظیم؟",
    advDeletePresetMsg: "پیش تنظیم \"{name}\" حذف می شود.",
    advDeletePresetBtn: "حذف", advDuplicateBtn: "تکثیر", advExportBtn: "صدور",
    advBuiltIn: "داخلی", advCustom: "سفارشی",

    advGeneratedCssTitle: "CSS تولیدشده",
    advGeneratedCssDesc: "CSS دقیق پلاگین را بررسی کنید.",
    advCopyCssBtn: "کپی", advRefreshCssBtn: "به روزرسانی", advCssCopied: "CSS کپی شد.",

    advDangerTitle: "منطقه خطر",
    advDangerDesc: "بازنشانی ها فقط روی استایل ها اعمال می شوند.",
    advResetScopeBtn: "بازنشانی حوزه فعلی",
    advResetScopeTitle: "بازنشانی حوزه فعلی؟",
    advResetScopeMsg: "همه استایل ها در حوزه \"{name}\" حذف می شوند.",
    advResetScopeConfirm: "بازنشانی حوزه",
    advResetEverythingBtn: "حذف همه چیز",
    advResetEverythingTitle: "حذف همه چیز؟",
    advResetEverythingMsg: "همه استایل ها در همه حوزه ها حذف می شوند.",
    advResetEverythingConfirm: "حذف همه چیز",
    advAllReset: "همه استایل ها بازنشانی شدند.",

    catResetTitle: "بازنشانی دسته؟",
    catResetMsg: "همه استایل های عناصر این دسته حذف می شوند.",
    catResetConfirm: "بازنشانی دسته",

    cmdResetTitle: "بازنشانی استایل ها؟",
    cmdResetMsg: "همه استایل ها در حوزه \"{name}\" حذف می شوند.",
    cmdResetConfirm: "بازنشانی", cmdResetDone: "استایل ها بازنشانی شدند.",

    simPropertiesNote: "پراپرتی ها و پنل جستجو قابل شبیه سازی نیستند.",
    simEmbedsNote: "امبدها به صورت ویجت رندر می شوند.",
    simNothing: "چیزی برای پیش نمایش وجود ندارد.",

    langLabel: "زبان", langEnglish: "English", langPersian: "فارسی",

    modeLight: "روشن", modeDark: "تاریک",
    previewModeReading: "خواندن", previewModeEditor: "ویرایشگر",
  },
};

function dictFor(lang) { return I18N[lang] || I18N.en; }
function t(lang, key, vars) {
  const d = dictFor(lang);
  let s = d[key];
  if (s == null) s = I18N.en[key];
  if (s == null) s = key;
  if (vars) {
    s = s.replace(/\{(\w+)\}/g, function (_, k) {
      return Object.prototype.hasOwnProperty.call(vars, k) ? String(vars[k]) : "{" + k + "}";
    });
  }
  return s;
}

/* ================================================================== */
/* [plugin-styles] — inline UI CSS (ASCII only, no style.css needed)   */
/* ================================================================== */
const UTS_PLUGIN_UI_CSS = [
  ".uts-style-manager-modal{width:min(94vw,1200px);height:min(86vh,840px);padding:0;display:flex;flex-direction:column;overflow:hidden;}",
  ".uts-style-manager-modal .modal-title{padding:14px 20px 10px;}",
  ".uts-style-manager-modal .modal-content{flex:1;min-height:0;display:flex;flex-direction:column;padding:0;overflow:hidden;}",

  ".uts-style-manager-modal[dir=rtl] .uts-sm-layout{direction:rtl;}",
  ".uts-style-manager-modal[dir=rtl] .uts-sm-sidebar{border-right:none;border-left:1px solid var(--background-modifier-border);}",
  ".uts-style-manager-modal[dir=rtl] .uts-sm-preview{border-left:none;border-right:1px solid var(--background-modifier-border);}",
  ".uts-style-manager-modal[dir=rtl] .uts-sm-header,",
  ".uts-style-manager-modal[dir=rtl] .uts-sm-nav-item,",
  ".uts-style-manager-modal[dir=rtl] .uts-cat-head,",
  ".uts-style-manager-modal[dir=rtl] .uts-control,",
  ".uts-style-manager-modal[dir=rtl] .uts-preset-row,",
  ".uts-style-manager-modal[dir=rtl] .uts-scope-row,",
  ".uts-style-manager-modal[dir=rtl] .uts-confirm-buttons,",
  ".uts-style-manager-modal[dir=rtl] .uts-card-title-wrap,",
  ".uts-style-manager-modal[dir=rtl] .uts-card-actions{direction:rtl;text-align:right;}",
  ".uts-style-manager-modal[dir=rtl] .uts-nav-count{margin-left:0;margin-right:auto;}",
  ".uts-style-manager-modal[dir=rtl] .uts-slider-value{text-align:left;}",
  ".uts-style-manager-modal[dir=rtl] .uts-swatch-label{text-align:right;}",
  ".uts-style-manager-modal[dir=rtl] .uts-swatch-popover{direction:rtl;}",

  ".uts-sm-header{display:flex;align-items:center;gap:8px;padding:10px 20px;border-bottom:1px solid var(--background-modifier-border);flex-wrap:wrap;}",
  ".uts-sm-scope{display:flex;align-items:center;gap:8px;}",
  ".uts-sm-scope-label{color:var(--text-muted);font-size:var(--font-ui-smaller);}",
  ".uts-sm-scope .uts-select{min-width:190px;width:auto;}",
  ".uts-sm-header-spacer{flex:1;}",

  ".uts-sm-layout{flex:1;min-height:0;display:grid;grid-template-columns:220px minmax(0,1fr) 360px;}",
  ".uts-sm-layout.no-preview{grid-template-columns:220px minmax(0,1fr);}",
  ".uts-sm-layout.no-preview .uts-sm-preview{display:none;}",

  ".uts-sm-sidebar{border-right:1px solid var(--background-modifier-border);overflow-y:auto;padding:10px 8px;}",
  ".uts-sm-main{overflow-y:auto;padding:14px 18px 28px;min-width:0;}",
  ".uts-sm-preview{border-left:1px solid var(--background-modifier-border);display:flex;flex-direction:column;min-height:0;}",

  ".uts-sm-nav-item{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;cursor:pointer;color:var(--text-normal);font-size:var(--font-ui-small);margin-bottom:2px;}",
  ".uts-sm-nav-item:hover{background:var(--background-modifier-hover);}",
  ".uts-sm-nav-item.is-active{background:var(--interactive-accent);color:var(--text-on-accent);}",
  ".uts-nav-count{margin-left:auto;background:var(--background-modifier-border);border-radius:999px;padding:0 7px;font-size:11px;}",
  ".uts-sm-nav-item.is-active .uts-nav-count{background:rgba(255,255,255,0.25);}",

  ".uts-cat-head{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;margin-bottom:12px;}",
  ".uts-cat-title{font-size:1.3em;font-weight:700;}",
  ".uts-cat-desc{color:var(--text-muted);flex:1;min-width:220px;font-size:var(--font-ui-small);}",

  ".uts-card{border:1px solid var(--background-modifier-border);border-radius:10px;margin-bottom:8px;background:var(--background-primary);overflow:hidden;}",
  ".uts-card.is-customized{border-color:var(--interactive-accent);}",
  ".uts-card-header{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:10px 14px;cursor:pointer;user-select:none;}",
  ".uts-card-header:hover{background:var(--background-modifier-hover);}",
  ".uts-card-title-wrap{display:flex;align-items:center;gap:8px;min-width:0;}",
  ".uts-dot{width:8px;height:8px;border-radius:50%;background:var(--background-modifier-border);flex:none;}",
  ".uts-card.is-customized .uts-dot{background:var(--interactive-accent);}",
  ".uts-card-title{font-weight:600;}",
  ".uts-card-info{color:var(--text-faint);display:inline-flex;cursor:help;}",
  ".uts-card-actions{display:flex;align-items:center;gap:6px;}",
  ".uts-chevron{color:var(--text-muted);transition:transform 0.15s ease;display:inline-flex;}",
  ".uts-card.is-expanded .uts-chevron{transform:rotate(180deg);}",
  ".uts-card-body{padding:4px 14px 16px;border-top:1px dashed var(--background-modifier-border);}",
  ".uts-card-desc{color:var(--text-muted);font-size:var(--font-ui-small);margin-top:8px;}",
  ".uts-note{font-size:var(--font-ui-smaller);color:var(--text-muted);background:var(--background-secondary);border-radius:6px;padding:6px 10px;margin:8px 0;}",
  ".uts-sep-row{display:flex;align-items:center;gap:8px;padding:6px 0 2px;font-size:var(--font-ui-smaller);color:var(--text-muted);}",
  ".uts-warning{display:none;align-items:center;gap:6px;margin:8px 0;padding:6px 10px;border-radius:6px;background:rgba(255,193,7,0.12);color:#b8860b;font-size:var(--font-ui-smaller);}",
  ".uts-warning.is-visible{display:flex;}",

  ".uts-group{margin-top:12px;}",
  ".uts-group-title{font-size:var(--font-ui-smaller);text-transform:uppercase;letter-spacing:0.05em;color:var(--text-faint);margin-bottom:4px;border-bottom:1px solid var(--background-modifier-border);padding-bottom:4px;}",
  ".uts-control{display:grid;grid-template-columns:140px 1fr;align-items:start;gap:10px;padding:5px 0;}",
  ".uts-control-label{color:var(--text-muted);font-size:var(--font-ui-smaller);padding-top:4px;}",
  ".uts-input,.uts-select{background:var(--background-secondary);border:1px solid var(--background-modifier-border);border-radius:6px;padding:4px 8px;color:var(--text-normal);font-size:var(--font-ui-small);width:100%;box-sizing:border-box;}",
  ".uts-input:focus,.uts-select:focus{border-color:var(--interactive-accent);outline:none;}",
  ".uts-grow{flex:1;min-width:0;}",
  ".uts-mono{font-family:var(--font-monospace);font-size:12px;}",
  ".uts-invalid{border-color:#e55 !important;box-shadow:0 0 0 1px #e55;}",

  ".uts-color-wrap{display:flex;flex-direction:column;gap:6px;width:100%;}",
  ".uts-color-field{display:flex;gap:6px;align-items:center;}",
  ".uts-color-picker{width:38px;height:28px;padding:2px;border-radius:6px;border:1px solid var(--background-modifier-border);background:var(--background-secondary);cursor:pointer;flex:none;}",
  ".uts-gradient-preview{height:32px;border-radius:8px;border:1px solid var(--background-modifier-border);background:var(--background-secondary);position:relative;}",
  ".uts-gradient-preview.is-empty::after{content:'-';position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:var(--text-faint);}",

  ".uts-swatches{display:flex;flex-wrap:wrap;gap:4px;padding:6px;background:var(--background-secondary);border-radius:6px;align-items:center;}",
  ".uts-swatch-label{width:100%;font-size:10px;color:var(--text-faint);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:2px;}",
  ".uts-swatch{width:22px;height:22px;border-radius:5px;border:1px solid var(--background-modifier-border);cursor:pointer;padding:0;transition:transform 0.12s ease;flex:none;}",
  ".uts-swatch:hover{transform:scale(1.18);border-color:var(--interactive-accent);z-index:1;}",
  ".uts-swatch.is-transparent{background-image:linear-gradient(45deg,#888 25%,transparent 25%,transparent 75%,#888 75%),linear-gradient(45deg,#888 25%,transparent 25%,transparent 75%,#888 75%);background-size:8px 8px;background-position:0 0,4px 4px;}",
  ".uts-swatch.is-gradient{position:relative;}",
  ".uts-swatch.is-gradient::after{content:'@';position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,0.9);}",

  ".uts-palette-btn{color:var(--interactive-accent);}",
  ".uts-palette-btn:hover{background:var(--interactive-accent);color:var(--text-on-accent);}",
  ".uts-swatch-popover{background:var(--background-primary);border:1px solid var(--background-modifier-border);border-radius:10px;padding:12px;box-shadow:0 8px 32px rgba(0,0,0,0.25);min-width:260px;max-width:340px;max-height:60vh;overflow-y:auto;animation:uts-pop-in 0.12s ease-out;}",
  "@keyframes uts-pop-in{from{opacity:0;transform:translateY(-4px) scale(0.98);}to{opacity:1;transform:translateY(0) scale(1);}}",
  ".uts-swatch-popover-title{font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-faint);margin-bottom:8px;}",
  ".uts-swatch-grid{display:grid;grid-template-columns:repeat(8,1fr);gap:5px;}",
  ".uts-swatch-grid .uts-swatch{width:100%;height:26px;}",
  ".uts-gradient-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;}",
  ".uts-gradient-cell{display:flex;flex-direction:column;gap:4px;align-items:center;}",
  ".uts-gradient-cell .uts-swatch{width:100%;height:44px;border-radius:8px;}",
  ".uts-gradient-cell-label{font-size:10px;color:var(--text-muted);text-align:center;}",

  ".uts-slider{display:flex;gap:8px;align-items:center;}",
  ".uts-slider input[type=range]{accent-color:var(--interactive-accent);flex:1;}",
  ".uts-slider-value{min-width:42px;text-align:right;font-size:var(--font-ui-smaller);color:var(--text-muted);}",
  ".uts-sides{display:flex;gap:8px;align-items:center;flex-wrap:wrap;}",
  ".uts-sides-inputs{display:flex;gap:6px;flex-wrap:wrap;}",
  ".uts-sides-inputs .uts-input{width:74px;}",
  ".uts-side-cell{display:flex;align-items:center;gap:4px;}",
  ".uts-side-label{font-size:var(--font-ui-smaller);color:var(--text-faint);width:10px;}",

  ".uts-icon-btn{background:transparent;border:none;color:var(--text-muted);cursor:pointer;padding:4px;display:inline-flex;align-items:center;border-radius:6px;}",
  ".uts-icon-btn:hover{color:var(--text-normal);background:var(--background-modifier-hover);}",
  ".uts-icon-btn svg{width:14px;height:14px;}",
  ".uts-chip-btn{display:inline-flex;align-items:center;gap:6px;font-size:var(--font-ui-small);padding:4px 12px;}",
  ".uts-chip-btn svg{width:14px;height:14px;}",
  ".uts-badge{font-size:10px;padding:1px 8px;border-radius:999px;background:var(--background-modifier-border);color:var(--text-muted);white-space:nowrap;}",
  ".uts-chip{font-family:var(--font-monospace);font-size:11px;background:var(--background-modifier-border);border-radius:6px;padding:1px 8px;}",
  ".uts-seg{display:inline-flex;border:1px solid var(--background-modifier-border);border-radius:8px;overflow:hidden;}",
  ".uts-seg-btn{border:none;background:transparent;padding:4px 12px;cursor:pointer;color:var(--text-muted);font-size:var(--font-ui-smaller);}",
  ".uts-seg-btn.is-active{background:var(--interactive-accent);color:var(--text-on-accent);}",

  ".uts-preview-head{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid var(--background-modifier-border);}",
  ".uts-preview-title{font-weight:600;}",
  ".uts-preview-body{flex:1;overflow-y:auto;padding:12px 16px 20px;min-height:0;}",
  ".uts-preview-content{font-size:var(--font-text-size);}",
  ".uts-editor-sim{font-family:var(--font-text);}",
  ".uts-editor-sim-content{padding:8px 4px;}",
  ".uts-editor-sim-content .cm-line{padding:0 10px;min-height:1.4em;white-space:pre-wrap;}",
  ".uts-sim-note{font-size:var(--font-ui-smaller);color:var(--text-muted);font-style:italic;padding:8px 0;}",

  ".uts-section{margin-bottom:26px;}",
  ".uts-section-title{font-weight:700;margin-bottom:2px;}",
  ".uts-section-desc{color:var(--text-muted);font-size:var(--font-ui-smaller);margin-bottom:10px;}",
  ".uts-preset-row,.uts-scope-row{display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid var(--background-modifier-border);border-radius:10px;margin-bottom:6px;flex-wrap:wrap;}",
  ".uts-preset-info{flex:1;min-width:200px;}",
  ".uts-preset-name{font-weight:600;}",
  ".uts-preset-name-row{display:flex;align-items:center;gap:8px;}",
  ".uts-preset-actions{display:flex;gap:6px;flex-wrap:wrap;}",
  ".uts-muted{color:var(--text-muted);font-size:var(--font-ui-smaller);}",

  ".uts-confirm-message{color:var(--text-muted);}",
  ".uts-confirm-buttons{display:flex;justify-content:flex-end;gap:8px;margin-top:14px;flex-wrap:wrap;}",
  ".uts-input-field{margin-bottom:10px;display:flex;flex-direction:column;gap:4px;}",
  ".uts-input-field label{font-size:var(--font-ui-smaller);color:var(--text-muted);}",
  ".uts-textarea{width:100%;min-height:120px;resize:vertical;background:var(--background-secondary);border:1px solid var(--background-modifier-border);border-radius:6px;padding:8px;color:var(--text-normal);font-size:var(--font-ui-small);box-sizing:border-box;}",
  ".uts-css-viewer{font-family:var(--font-monospace);font-size:12px;min-height:260px;white-space:pre;}",
  ".uts-wide-modal{width:min(92vw,760px);}",
    // Channel promo cards
  ".uts-channel-promo-wrap{display:flex;flex-direction:column;gap:8px;margin-top:8px;}",
  ".uts-channel-card{display:flex;align-items:center;gap:12px;padding:12px 14px;border:1px solid var(--background-modifier-border);border-radius:10px;background:var(--background-primary);transition:transform 0.15s ease, box-shadow 0.15s ease;}",
  ".uts-channel-card:hover{transform:translateY(-1px);box-shadow:0 4px 16px rgba(0,0,0,0.12);}",
  ".uts-channel-icon{width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex:none;}",
  ".uts-channel-icon svg{width:20px;height:20px;}",
  ".uts-channel-info{flex:1;min-width:0;}",
  ".uts-channel-name{font-weight:600;font-size:var(--font-ui-small);}",
  ".uts-channel-handle{font-size:var(--font-ui-smaller);color:var(--text-muted);font-family:var(--font-monospace);}",
  ".uts-channel-card button{flex:none;font-size:var(--font-ui-smaller);padding:4px 14px;}",

  // Code block cleanup for Live Preview - IMPORTANT: no background-color here,
  // so the plugin-generated CSS can override it cleanly.
  ".markdown-source-view.mod-cm6 .cm-line.HyperMD-codeblock{padding-top:0 !important;padding-bottom:0 !important;background:transparent !important;box-shadow:none !important;margin-top:0 !important;margin-bottom:0 !important;}",
  ".markdown-source-view.mod-cm6 .HyperMD-codeblock{margin-top:0 !important;margin-bottom:0 !important;}",
  ".markdown-source-view.mod-cm6 .HyperMD-codeblock-begin{padding-top:0.7em !important;}",
  ".markdown-source-view.mod-cm6 .HyperMD-codeblock-end{padding-bottom:0.7em !important;}",
  ".markdown-source-view.mod-cm6 .HyperMD-codeblock+.HyperMD-codeblock{border-top:none !important;margin-top:0 !important;}",
  ".markdown-source-view.mod-cm6 .HyperMD-codeblock::before,",
  ".markdown-source-view.mod-cm6 .HyperMD-codeblock::after{display:none !important;content:none !important;}",

  ".markdown-rendered a.tag{display:inline-flex;align-items:center;}",
  ".markdown-rendered a.tag>.cm-hashtag,",
  ".markdown-rendered a.tag .cm-hashtag{display:inline;}",
  ".markdown-source-view.mod-cm6 .cm-hashtag{display:inline !important;padding:0 !important;background:transparent !important;border:none !important;}",
  ".markdown-source-view.mod-cm6 .cm-hashtag-begin,",
  ".markdown-source-view.mod-cm6 .cm-hashtag-end{display:none !important;}",

  "@media (max-width:900px){",
  ".uts-sm-layout,.uts-sm-layout.no-preview{grid-template-columns:1fr;grid-template-rows:auto minmax(0,1fr);}",
  ".uts-sm-sidebar{display:flex;flex-wrap:wrap;gap:4px;border-right:none;border-bottom:1px solid var(--background-modifier-border);}",
  ".uts-sm-preview{display:none;}",
  ".uts-control{grid-template-columns:1fr;gap:4px;}",
  "}",
].join("\n");

/* ================================================================== */
/* [utils]                                                             */
/* ================================================================== */
const VAULT_SCOPE_ID = "vault";
const VALUE_PATTERN = /^[a-zA-Z0-9#%.(),+\-*\/ ]+$/;

function debounce(fn, ms) {
  let t = null;
  const wrapped = function () {
    const args = arguments;
    if (t) clearTimeout(t);
    t = setTimeout(function () { t = null; fn.apply(null, args); }, ms);
  };
  wrapped.cancel = function () { if (t) { clearTimeout(t); t = null; } };
  return wrapped;
}
function uid() { return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4); }
function clamp(n, a, b) { return Math.min(b, Math.max(a, n)); }
function deepClone(v) { return JSON.parse(JSON.stringify(v)); }
function deepEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return a === b;
  if (typeof a !== "object" || typeof b !== "object") return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  const ka = Object.keys(a), kb = Object.keys(b);
  if (ka.length !== kb.length) return false;
  for (let i = 0; i < ka.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(b, ka[i])) return false;
    if (!deepEqual(a[ka[i]], b[ka[i]])) return false;
  }
  return true;
}
function sanitizeCssValue(value) {
  const v = (value == null ? "" : String(value)).trim();
  if (!v || v.length > 300) return null;
  if (/["'`\\{}<>;=@]/.test(v)) return null;
  if (/url\s*\(/i.test(v) || /expression\s*\(/i.test(v) || /javascript\s*:/i.test(v)) return null;
  if (!VALUE_PATTERN.test(v)) return null;
  return v;
}
function isValidClassName(name) { return /^[a-zA-Z_][a-zA-Z0-9_-]*$/.test(String(name || "").trim()); }
function parseColor(input) {
  if (!input) return null;
  const s = String(input).trim().toLowerCase();
  let m = /^#([0-9a-f]{3})$/.exec(s);
  if (m) return { r: parseInt(m[1][0] + m[1][0], 16), g: parseInt(m[1][1] + m[1][1], 16), b: parseInt(m[1][2] + m[1][2], 16) };
  m = /^#([0-9a-f]{6})$/.exec(s);
  if (m) return { r: parseInt(m[1].slice(0, 2), 16), g: parseInt(m[1].slice(2, 4), 16), b: parseInt(m[1].slice(4, 6), 16) };
  m = /^rgba?\(\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})\s*[,\s]\s*(\d{1,3})/.exec(s);
  if (m) return { r: clamp(parseInt(m[1], 10), 0, 255), g: clamp(parseInt(m[2], 10), 0, 255), b: clamp(parseInt(m[3], 10), 0, 255) };
  return null;
}
function withAlpha(color, alpha) {
  const a = clamp(alpha, 0, 1);
  const rgb = parseColor(color);
  if (!rgb) { const s = sanitizeCssValue(color); return s || color; }
  return "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + (Math.round(a * 1000) / 1000) + ")";
}
function expandHex(v) {
  if (/^#[0-9a-fA-F]{3}$/.test(v)) return ("#" + v[1] + v[1] + v[2] + v[2] + v[3] + v[3]).toLowerCase();
  if (/^#[0-9a-fA-F]{6}$/.test(v)) return v.toLowerCase();
  return v;
}
function relLum(c) {
  const f = function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
}
function contrastRatio(a, b) {
  const l1 = relLum(a), l2 = relLum(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

/* ================================================================== */
/* [elements]                                                          */
/* ================================================================== */
const INLINE_GROUPS = ["text", "background", "border", "effects"];
const ALL_GROUPS = ["text", "background", "border", "spacing", "effects"];

const CATEGORIES = [
  { id: "text", labelKey: "catText", icon: "type", descKey: "catTextDesc",
    preview: ["The quick brown fox jumps over the lazy dog - a normal paragraph with plenty of rhythm.", "",
      "This line has **bold**, *italic*, ***bold italic***, ==highlighted==, ~~struck through~~, `inline code`, inline math like $E = mc^2$, an [external link](https://obsidian.md), an [[Internal note|internal link]], #a-tag, <sup>superscript</sup>, <sub>subscript</sub>, and a footnote[^1].", "",
      "%%This comment is only visible in Live Preview.%%", "",
      "[^1]: Footnotes render at the bottom of a note."].join("\n") },
  { id: "headings", labelKey: "catHeadings", icon: "heading", descKey: "catHeadingsDesc",
    preview: "# Heading 1\n\n## Heading 2\n\n### Heading 3\n\n#### Heading 4\n\n##### Heading 5\n\n###### Heading 6" },
  { id: "blocks", labelKey: "catBlocks", icon: "box", descKey: "catBlocksDesc",
    preview: ["> A blockquote - often used for quoted or emphasized passages.", "",
      "> [!note] Callout title", "> Callout body with **bold** content.", "",
      "~~~ts", 'const greeting = "hello, world";', "console.log(greeting);", "~~~", "",
      "$$", "\\int_0^1 x^2 \\, dx = \\frac{1}{3}", "$$", "", "---"].join("\n") },
  { id: "lists", labelKey: "catLists", icon: "list", descKey: "catListsDesc",
    preview: ["- Bullet list item", "- Another bullet", "  - Nested bullet", "    - Deeper still",
      "1. Numbered item", "2. Second numbered item", "- [ ] Unchecked task", "- [x] Checked task"].join("\n") },
  { id: "tables", labelKey: "catTables", icon: "table", descKey: "catTablesDesc",
    preview: ["| Column A | Column B | Column C |", "| -------- | :------- | -------: |",
      "| alpha    | beta     | gamma    |", "| one      | two      | three    |", "| x        | y        | z        |"].join("\n") },
  { id: "links", labelKey: "catLinks", icon: "link", descKey: "catLinksDesc",
    preview: "An [[internal wiki link]], an [external link](https://obsidian.md), and #tags like #project/alpha and #status/active." },
  { id: "embeds", labelKey: "catEmbeds", icon: "image", descKey: "catEmbedsDesc",
    preview: "Embedded content is best tested in a real note." },
  { id: "other", labelKey: "catOther", icon: "sparkles", descKey: "catOtherDesc",
    preview: "#tag #status/active #project/alpha" },
  { id: "advanced", labelKey: "catAdvanced", icon: "wrench", descKey: "catAdvancedDesc", preview: "" },
];

const ELEMENTS = [
  { id: "paragraph", labelKey: "elParagraph", category: "text", groups: ALL_GROUPS.slice(), reading: ["p"], editor: [".cm-line"] },
  { id: "bold", labelKey: "elBold", category: "text", groups: INLINE_GROUPS.slice(), reading: ["strong"], editor: [".cm-strong"] },
  { id: "italic", labelKey: "elItalic", category: "text", groups: INLINE_GROUPS.slice(), reading: ["em"], editor: [".cm-em"] },
  { id: "bold-italic", labelKey: "elBoldItalic", category: "text", groups: INLINE_GROUPS.slice(), reading: ["strong em", "em strong"], editor: [".cm-strong.cm-em"] },
  { id: "strikethrough", labelKey: "elStrikethrough", category: "text", groups: INLINE_GROUPS.slice(), reading: ["s", "del"], editor: [".cm-strikethrough"] },
  { id: "highlight", labelKey: "elHighlight", category: "text", groups: INLINE_GROUPS.slice(), reading: ["mark"], editor: [".cm-highlight"] },
  { id: "inline-code", labelKey: "elInlineCode", category: "text", groups: INLINE_GROUPS.slice(), reading: [":not(pre) > code"], editor: [".cm-inline-code"] },
  { id: "inline-math", labelKey: "elInlineMath", category: "text", groups: INLINE_GROUPS.slice(), reading: [".math-inline"], editor: [".math-inline", ".cm-inline-math"] },
  { id: "footnote-ref", labelKey: "elFootnoteRef", category: "text", groups: INLINE_GROUPS.slice(), reading: ["sup.footnote-ref"], editor: [".cm-footref", ".cm-inline-footref"] },
  { id: "comment", labelKey: "elComment", category: "text", groups: INLINE_GROUPS.slice(), reading: [], editor: [".cm-comment"] },
  { id: "superscript", labelKey: "elSuperscript", category: "text", groups: INLINE_GROUPS.slice(), reading: ["sup:not(.footnote-ref)"], editor: [] },
  { id: "subscript", labelKey: "elSubscript", category: "text", groups: INLINE_GROUPS.slice(), reading: ["sub"], editor: [] },
];
for (let n = 1; n <= 6; n++) {
  ELEMENTS.push({
    id: "heading-" + n, labelKey: "elHeading", labelSuffix: " " + n, category: "headings",
    groups: ALL_GROUPS.slice(), reading: ["h" + n], editor: [".HyperMD-header-" + n],
  });
}
ELEMENTS.push(
  { id: "blockquote", labelKey: "elBlockquote", category: "blocks", groups: ALL_GROUPS.slice(), reading: ["blockquote"], editor: [".HyperMD-quote"] },
  { id: "callout", labelKey: "elCallout", category: "blocks", groups: ALL_GROUPS.slice(), reading: [".callout"], editor: [".callout"] },
  { id: "callout-title", labelKey: "elCalloutTitle", category: "blocks", groups: ALL_GROUPS.slice(), reading: [".callout-title"], editor: [".callout-title"] },
  { id: "code-block", labelKey: "elCodeBlock", category: "blocks", groups: ALL_GROUPS.slice(),
    reading: ["pre"],
    editor: [".HyperMD-codeblock"],
    editorBg: [".HyperMD-codeblock-bg", ".HyperMD-codeblock-begin", ".HyperMD-codeblock-end"] },
  { id: "math-block", labelKey: "elMathBlock", category: "blocks", groups: ALL_GROUPS.slice(), reading: [".math-block"], editor: [".math-block"] },
  { id: "horizontal-rule", labelKey: "elHorizontalRule", category: "blocks", groups: ["background", "border", "spacing", "effects"], reading: ["hr"], editor: [".HyperMD-hr"] },
  { id: "bullet-list", labelKey: "elBulletList", category: "lists", groups: ALL_GROUPS.slice(),
    reading: ["ul:not(.contains-task)"],
    editor: [".HyperMD-list-line:not(.HyperMD-task-line)"] },
  { id: "numbered-list", labelKey: "elNumberedList", category: "lists", groups: ALL_GROUPS.slice(),
    reading: ["ol"],
    editor: [".HyperMD-list-line.HyperMD-list-line-1:not(.HyperMD-task-line)", ".cm-formatting-list-ol"] },
  { id: "nested-list", labelKey: "elNestedList", category: "lists", groups: ALL_GROUPS.slice(),
    reading: [":is(ul, ol) :is(ul, ol)"],
    editor: [".HyperMD-list-line-2", ".HyperMD-list-line-3", ".HyperMD-list-line-4", ".HyperMD-list-line-5"] },
  { id: "task-list", labelKey: "elTaskList", category: "lists", groups: ALL_GROUPS.slice(),
    reading: ["ul.contains-task"],
    editor: [".HyperMD-task-line"] },
  { id: "task-checked", labelKey: "elTaskChecked", category: "lists", groups: ALL_GROUPS.slice(),
    reading: ["li.task-list-item.is-checked"],
    editor: [".HyperMD-task-line[data-task=\"x\"]", ".HyperMD-task-line[data-task=\"X\"]"] },
  { id: "task-unchecked", labelKey: "elTaskUnchecked", category: "lists", groups: ALL_GROUPS.slice(),
    reading: ["li.task-list-item:not(.is-checked)"],
    editor: [".HyperMD-task-line:not([data-task=\"x\"]):not([data-task=\"X\"])"] },
  { id: "list-marker", labelKey: "elListMarker", category: "lists", groups: ["text"],
    reading: ["li::marker"],
    editor: [".list-bullet", ".cm-formatting-list", ".cm-formatting-list-ol", ".cm-formatting-list-ul", ".cm-hmd-list-bullet"] },
  { id: "table", labelKey: "elTable", category: "tables", groups: ALL_GROUPS.slice(), reading: ["table"], editor: ["table"] },
  { id: "table-header", labelKey: "elTableHeader", category: "tables", groups: ALL_GROUPS.slice(), reading: ["thead th"], editor: ["thead th"] },
  { id: "table-body", labelKey: "elTableBody", category: "tables", groups: ALL_GROUPS.slice(), reading: ["tbody"], editor: ["tbody"] },
  { id: "table-row", labelKey: "elTableRow", category: "tables", groups: ALL_GROUPS.slice(), reading: ["tbody tr"], editor: ["tbody tr"] },
  { id: "table-cell", labelKey: "elTableCell", category: "tables", groups: ALL_GROUPS.slice(), reading: ["tbody td"], editor: ["tbody td"] },
  { id: "table-row-hover", labelKey: "elTableRowHover", category: "tables", groups: ALL_GROUPS.slice(), reading: ["tbody tr:hover"], editor: ["tbody tr:hover"] },
  { id: "table-row-alt", labelKey: "elTableRowAlt", category: "tables", groups: ALL_GROUPS.slice(), reading: ["tbody tr:nth-child(even)"], editor: ["tbody tr:nth-child(even)"] },
  { id: "link", labelKey: "elLink", category: "links", groups: INLINE_GROUPS.slice(), reading: ["a:not(.tag):not(.footnote-ref)"], editor: [".cm-link", ".cm-hmd-internal-link"] },
  { id: "internal-link", labelKey: "elInternalLink", category: "links", groups: INLINE_GROUPS.slice(), reading: ["a.internal-link"], editor: [".cm-hmd-internal-link"] },
  { id: "external-link", labelKey: "elExternalLink", category: "links", groups: INLINE_GROUPS.slice(), reading: ["a.external-link"], editor: [".cm-link"] },
  { id: "tag", labelKey: "elTag", category: "links", groups: INLINE_GROUPS.slice(), reading: ["a.tag"], editor: [".cm-hashtag", "a.tag"] },
  { id: "embed", labelKey: "elEmbed", category: "embeds", groups: ALL_GROUPS.slice(), reading: [".markdown-embed"], editor: [".markdown-embed"], allowBlur: true },
  { id: "image", labelKey: "elImage", category: "embeds", groups: ALL_GROUPS.slice(), reading: ["img", ".image-embed"], editor: ["img"], allowBlur: true },
  { id: "pdf-embed", labelKey: "elPdfEmbed", category: "embeds", groups: ALL_GROUPS.slice(), reading: [".pdf-embed"], editor: [".pdf-embed"], allowBlur: true },
  { id: "media-embed", labelKey: "elMediaEmbed", category: "embeds", groups: ALL_GROUPS.slice(), reading: ["audio", "video"], editor: ["audio", "video"], allowBlur: true },
  { id: "properties", labelKey: "elProperties", category: "other", groups: ALL_GROUPS.slice(), reading: [".metadata-container"], editor: [".metadata-container"] },
  { id: "search-match", labelKey: "elSearchMatch", category: "other", groups: ["text", "background"], reading: [".search-result-file-matched-text"], editor: [], raw: true }
);
const ELEMENT_MAP = {};
for (const e of ELEMENTS) ELEMENT_MAP[e.id] = e;

/* ================================================================== */
/* [css-generator]                                                     */
/* ================================================================== */
const READING_PREFIX = ".markdown-rendered";
const EDITOR_PREFIX = ".markdown-source-view.mod-cm6";
const IMPORTANT_PROPS = new Set(["color", "background-color", "background-image", "border-color",
  "font-size", "font-weight", "font-style",
  "text-decoration-line", "text-decoration-style", "text-decoration-color",
  "box-shadow", "text-shadow"]);

function buildDeclarations(style, opts) {
  const allowed = new Set(opts.allowed);
  const decls = [];
  const push = function (prop, value) {
    if (value == null || value === "") return;
    const safe = sanitizeCssValue(value);
    if (!safe) return;
    decls.push([prop, safe]);
  };
  if (allowed.has("text")) {
    const alpha = style.opacity != null ? clamp(style.opacity, 0, 100) / 100 : 1;
    if (style.color) push("color", alpha < 1 ? withAlpha(style.color, alpha) : style.color);
    else if (alpha < 1) push("opacity", String(Math.round(alpha * 1000) / 1000));
    push("font-weight", style.fontWeight);
    push("font-style", style.fontStyle);
    push("font-size", style.fontSize);
    push("letter-spacing", style.letterSpacing);
    push("line-height", style.lineHeight);
    push("text-decoration-line", style.textDecorationLine);
    push("text-decoration-style", style.textDecorationStyle);
    push("text-decoration-color", style.textDecorationColor);
    if (style.textGradient) {
      push("background-image", style.textGradient);
      push("-webkit-background-clip", "text");
      push("background-clip", "text");
      push("-webkit-text-fill-color", "transparent");
      push("color", "transparent");
    }
  }
  if (allowed.has("background")) {
    if (style.backgroundColor) {
      const bgAlpha = style.backgroundOpacity != null ? clamp(style.backgroundOpacity, 0, 100) / 100 : 1;
      push("background-color", bgAlpha < 1 ? withAlpha(style.backgroundColor, bgAlpha) : style.backgroundColor);
    }
    push("background-image", style.backgroundGradient);
  }
  if (allowed.has("border")) {
    const widths = [style.borderTopWidth, style.borderRightWidth, style.borderBottomWidth, style.borderLeftWidth];
    const hasWidth = widths.some(function (w) { return !!w && parseFloat(w) > 0; });
    if (style.borderStyle || hasWidth || style.borderColor) {
      push("border-style", style.borderStyle || "solid");
      push("border-color", style.borderColor);
      push("border-top-width", widths[0] || "0");
      push("border-right-width", widths[1] || "0");
      push("border-bottom-width", widths[2] || "0");
      push("border-left-width", widths[3] || "0");
    }
    push("border-radius", style.borderRadius);
  }
  if (allowed.has("spacing")) {
    push("padding-top", style.paddingTop); push("padding-right", style.paddingRight);
    push("padding-bottom", style.paddingBottom); push("padding-left", style.paddingLeft);
    push("margin-top", style.marginTop); push("margin-right", style.marginRight);
    push("margin-bottom", style.marginBottom); push("margin-left", style.marginLeft);
  }
  if (allowed.has("effects")) {
    push("box-shadow", style.boxShadow);
    push("text-shadow", style.textShadow);
    if (opts.allowBlur && style.blur) push("filter", "blur(" + style.blur + ")");
  }
  return decls;
}
function formatDeclarations(decls) {
  return decls.map(function (d) {
    return "  " + d[0] + ": " + d[1] + (IMPORTANT_PROPS.has(d[0]) ? " !important" : "") + ";";
  }).join("\n");
}
function emitEditorCodeBlock(out, editorBase, darkPrefix, decls) {
  const valueOf = function (prop, fallback) {
    const found = decls.find(function (d) { return d[0] === prop; });
    return found ? found[1] : fallback;
  };
  const baseDecls = decls.filter(function (d) {
    return d[0] !== "border-top-width" &&
      d[0] !== "border-bottom-width" &&
      d[0] !== "border-radius" &&
      d[0] !== "box-shadow";
  });
  baseDecls.push(["border-top-width", "0"]);
  baseDecls.push(["border-bottom-width", "0"]);
  baseDecls.push(["border-radius", "0"]);

  const selector = darkPrefix + editorBase + " .HyperMD-codeblock";
  out.push(selector + " {\n" + formatDeclarations(baseDecls) + "\n}");

  const topWidth = valueOf("border-top-width", "0");
  const bottomWidth = valueOf("border-bottom-width", "0");
  const radius = valueOf("border-radius", "0");
  out.push(selector + ".HyperMD-codeblock-begin {\n" + formatDeclarations([
    ["border-top-width", topWidth],
    ["border-radius", radius + " " + radius + " 0 0"],
  ]) + "\n}");
  out.push(selector + ".HyperMD-codeblock-end {\n" + formatDeclarations([
    ["border-bottom-width", bottomWidth],
    ["border-radius", "0 0 " + radius + " " + radius],
  ]) + "\n}");
  out.push(selector + ".HyperMD-codeblock-begin.HyperMD-codeblock-end {\n" + formatDeclarations([
    ["border-top-width", topWidth],
    ["border-bottom-width", bottomWidth],
    ["border-radius", radius],
  ]) + "\n}");

  const bgDecls = decls.filter(function (d) {
    return d[0] === "background-color" || d[0] === "background-image";
  });
  if (bgDecls.length) {
    out.push(darkPrefix + editorBase + " .HyperMD-codeblock-bg {\n" + formatDeclarations(bgDecls.concat([["border-radius", "0"]])) + "\n}");
  }
}
function emitElement(out, def, style, scopePrefix, dark) {
  const decls = buildDeclarations(style, { allowed: def.groups, allowBlur: def.allowBlur });
  if (decls.length === 0) return;
  const body = formatDeclarations(decls);
  const darkPrefix = dark ? "body.theme-dark " : "";

  // Reading Mode
  const readingBase = scopePrefix || READING_PREFIX;
  for (const s of def.reading) {
    const sel = def.raw ? (scopePrefix ? scopePrefix + " " + s : s) : (readingBase + " " + s);
    out.push(darkPrefix + sel + " {\n" + body + "\n}");
  }

  // Live Preview (Editor)
  if (!def.raw) {
    const editorBase = scopePrefix || EDITOR_PREFIX;
    if (def.id === "code-block") {
      emitEditorCodeBlock(out, editorBase, darkPrefix, decls);
    } else {
      for (const s of def.editor) {
        out.push(darkPrefix + editorBase + " " + s + " {\n" + body + "\n}");
      }
    }
    // Background/border-radius must also go to CodeMirror's inner bg wrapper
    if (def.editorBg && def.id !== "code-block") {
      const bgDecls = decls.filter(function (d) {
        return d[0] === "background-color" || d[0] === "background-image" || d[0] === "border-radius";
      });
      if (bgDecls.length) {
        const bgBody = formatDeclarations(bgDecls);
        for (const s of def.editorBg) {
          out.push(darkPrefix + editorBase + " " + s + " {\n" + bgBody + "\n}");
        }
      }
    }
  }
}
function scopeCss(out, scope) {
  const prefix = (scope.type === "cssclass" && scope.className && isValidClassName(scope.className)) ? "." + scope.className : "";
  const styles = scope.styles || {};
  for (const elementId of Object.keys(styles)) {
    const def = ELEMENT_MAP[elementId];
    if (!def) continue;
    const ts = styles[elementId];
    if (!ts) continue;
    const light = ts.light || ts.dark;
    const dark = ts.dark || ts.light;
    if (!light || Object.keys(light).length === 0) continue;
    try {
      emitElement(out, def, light, prefix, false);
      if (dark && !deepEqual(dark, light)) {
        emitElement(out, def, dark, prefix, true);
      }
    } catch (e) {
      console.error("[UTSM] failed to generate CSS for element:", elementId, e);
    }
  }
}
function generateCss(settings) {
  const out = ["/* Generated by Universal Text Style Manager - do not edit. */"];
  for (const scope of settings.scopes || []) { if (scope) scopeCss(out, scope); }
  for (const cc of settings.customClasses || []) {
    if (!cc || !cc.name || !isValidClassName(cc.name) || !cc.styles) continue;
    try {
      const decls = buildDeclarations(cc.styles, { allowed: ALL_GROUPS });
      if (decls.length === 0) continue;
      out.push("." + cc.name + " {\n" + formatDeclarations(decls) + "\n}");
    } catch (e) {
      console.error("[UTSM] failed to generate CSS for custom class:", cc.name, e);
    }
  }
  return out.join("\n\n");
}

/* ================================================================== */
/* [style-manager]                                                     */
/* ================================================================== */
class StyleManager {
  constructor() { this.el = null; this.currentCss = ""; }
  apply(settings) {
    try {
      const css = generateCss(settings);
      if (css === this.currentCss) return;
      if (!this.el || !document.head.contains(this.el)) {
        this.el = document.createElement("style");
        this.el.id = "universal-text-style-manager-styles";
        document.head.appendChild(this.el);
      }
      this.el.textContent = css;
      this.currentCss = css;
    } catch (e) {
      console.error("[UTSM] failed to apply styles", e);
    }
  }
  unload() {
    if (this.el) this.el.remove();
    this.el = null;
    this.currentCss = "";
  }
}

/* ================================================================== */
/* [presets]                                                           */
/* ================================================================== */
const allSides = function (v) { return { borderTopWidth: v, borderRightWidth: v, borderBottomWidth: v, borderLeftWidth: v }; };
const T = function (light, dark) { return { light: light ? Object.assign({}, light) : undefined, dark: dark ? Object.assign({}, dark) : undefined }; };

const BUILTIN_PRESETS = [
  { id: "default", name: "Default", builtin: true,
    description: "Obsidian's native look - no custom styles.",
    styles: {} },

  { id: "minimal", name: "Minimal", builtin: true,
    description: "Calm, paper-like typography. Ruled headings, generous line-height.",
    styles: {
      "paragraph": T({ lineHeight: "1.75", color: "#333333" }, { lineHeight: "1.75", color: "#d4d4d8" }),
      "bold": T({ color: "#111111", fontWeight: "700" }, { color: "#fafafa", fontWeight: "700" }),
      "italic": T({ color: "#52525b" }, { color: "#a1a1aa" }),
      "bold-italic": T({ color: "#18181b", fontWeight: "700" }, { color: "#f4f4f5", fontWeight: "700" }),
      "strikethrough": T({ color: "#71717a", textDecorationLine: "line-through" }, { color: "#71717a", textDecorationLine: "line-through" }),
      "highlight": T({ backgroundColor: "#fef3c7", color: "#78350f", borderRadius: "3px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "4px", paddingRight: "4px" }, { backgroundColor: "#78350f", color: "#fef3c7", borderRadius: "3px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "4px", paddingRight: "4px" }),
      "inline-math": T({ color: "#7c3aed" }, { color: "#a78bfa" }),
      "footnote-ref": T({ color: "#7c3aed", fontSize: "0.75em" }, { color: "#a78bfa", fontSize: "0.75em" }),
      "heading-1": T({ fontSize: "1.9em", fontWeight: "700", letterSpacing: "-0.02em", color: "#111111", paddingBottom: "0.3em", borderBottomWidth: "1px", borderStyle: "solid", borderColor: "#e4e4e7" }, { fontSize: "1.9em", fontWeight: "700", letterSpacing: "-0.02em", color: "#fafafa", paddingBottom: "0.3em", borderBottomWidth: "1px", borderStyle: "solid", borderColor: "#3f3f46" }),
      "heading-2": T({ fontSize: "1.5em", fontWeight: "600", color: "#1f1f1f" }, { fontSize: "1.5em", fontWeight: "600", color: "#e4e4e7" }),
      "heading-3": T({ fontSize: "1.2em", fontWeight: "600", color: "#3f3f46" }, { fontSize: "1.2em", fontWeight: "600", color: "#a1a1aa" }),
      "heading-4": T({ fontSize: "1.05em", fontWeight: "600", color: "#52525b" }, { fontSize: "1.05em", fontWeight: "600", color: "#a1a1aa" }),
      "heading-5": T({ fontSize: "1em", fontWeight: "600", color: "#71717a" }, { fontSize: "1em", fontWeight: "600", color: "#71717a" }),
      "heading-6": T({ fontSize: "0.9em", fontWeight: "600", color: "#a1a1aa", textTransform: "uppercase", letterSpacing: "0.05em" }, { fontSize: "0.9em", fontWeight: "600", color: "#71717a", textTransform: "uppercase", letterSpacing: "0.05em" }),
      "blockquote": T({ borderLeftWidth: "3px", borderStyle: "solid", borderColor: "#d4d4d8", paddingLeft: "1em", fontStyle: "italic", color: "#52525b" }, { borderLeftWidth: "3px", borderStyle: "solid", borderColor: "#52525b", paddingLeft: "1em", fontStyle: "italic", color: "#a1a1aa" }),
      "callout": T({ backgroundColor: "#f4f4f5", borderRadius: "8px", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "3px", borderStyle: "solid", borderColor: "#e4e4e7", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }, { backgroundColor: "#27272a", borderRadius: "8px", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "3px", borderStyle: "solid", borderColor: "#3f3f46", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }),
      "callout-title": T({ color: "#18181b", fontWeight: "700" }, { color: "#fafafa", fontWeight: "700" }),
      "code-block": T(Object.assign(allSides("1px"), { borderStyle: "solid", backgroundColor: "#f4f4f5", borderColor: "#e4e4e7", color: "#18181b", borderRadius: "6px", paddingTop: "0.8em", paddingBottom: "0.8em" }), Object.assign(allSides("1px"), { borderStyle: "solid", backgroundColor: "#18181b", borderColor: "#27272a", color: "#e4e4e7", borderRadius: "6px", paddingTop: "0.8em", paddingBottom: "0.8em" })),
      "math-block": T({ backgroundColor: "#f4f4f5", color: "#3f3f46", borderRadius: "6px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }, { backgroundColor: "#27272a", color: "#d4d4d8", borderRadius: "6px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }),
      "horizontal-rule": T({ borderTopWidth: "1px", borderStyle: "solid", borderColor: "#e4e4e7" }, { borderTopWidth: "1px", borderStyle: "solid", borderColor: "#3f3f46" }),
      "bullet-list": T({ lineHeight: "1.75" }, { lineHeight: "1.75" }),
      "numbered-list": T({ lineHeight: "1.75" }, { lineHeight: "1.75" }),
      "nested-list": T({ color: "#52525b" }, { color: "#a1a1aa" }),
      "task-list": T({ lineHeight: "1.75" }, { lineHeight: "1.75" }),
      "task-checked": T({ color: "#a1a1aa", textDecorationLine: "line-through" }, { color: "#71717a", textDecorationLine: "line-through" }),
      "task-unchecked": T({ color: "#3f3f46" }, { color: "#d4d4d8" }),
      "list-marker": T({ color: "#7c3aed", fontWeight: "600" }, { color: "#a78bfa", fontWeight: "600" }),
      "table": T({ borderRadius: "6px", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "1px", borderStyle: "solid", borderColor: "#e4e4e7" }, { borderRadius: "6px", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "1px", borderStyle: "solid", borderColor: "#3f3f46" }),
      "table-header": T({ backgroundColor: "#f4f4f5", color: "#18181b", fontWeight: "700", paddingTop: "8px", paddingBottom: "8px", paddingLeft: "10px", paddingRight: "10px" }, { backgroundColor: "#27272a", color: "#fafafa", fontWeight: "700", paddingTop: "8px", paddingBottom: "8px", paddingLeft: "10px", paddingRight: "10px" }),
      "table-cell": T({ paddingTop: "6px", paddingBottom: "6px", paddingLeft: "10px", paddingRight: "10px" }, { paddingTop: "6px", paddingBottom: "6px", paddingLeft: "10px", paddingRight: "10px" }),
      "table-row-alt": T({ backgroundColor: "#fafafa" }, { backgroundColor: "#1f1f22" }),
      "table-row-hover": T({ backgroundColor: "#f4f4f5" }, { backgroundColor: "#27272a" }),
      "inline-code": T({ backgroundColor: "#f4f4f5", color: "#be185d", fontSize: "0.9em", borderRadius: "4px", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "5px", paddingRight: "5px" }, { backgroundColor: "#27272a", color: "#f0abfc", fontSize: "0.9em", borderRadius: "4px", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "5px", paddingRight: "5px" }),
      "link": T({ color: "#7c3aed", textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#c4b5fd" }, { color: "#a78bfa", textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#7c3aed" }),
      "internal-link": T({ color: "#7c3aed", fontWeight: "600" }, { color: "#a78bfa", fontWeight: "600" }),
      "external-link": T({ color: "#0891b2", textDecorationLine: "underline" }, { color: "#22d3ee", textDecorationLine: "underline" }),
      "tag": T({ backgroundColor: "#f4f4f5", color: "#52525b", borderRadius: "999px", fontSize: "0.85em", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "10px", paddingRight: "10px" }, { backgroundColor: "#27272a", color: "#a1a1aa", borderRadius: "999px", fontSize: "0.85em", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "10px", paddingRight: "10px" }),
      "image": T({ borderRadius: "8px", boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)" }, { borderRadius: "8px", boxShadow: "0 4px 16px rgba(0, 0, 0, 0.5)" }),
      "embed": T({ backgroundColor: "#f4f4f5", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "3px", borderStyle: "solid", borderColor: "#7c3aed", borderRadius: "6px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }, { backgroundColor: "#27272a", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "3px", borderStyle: "solid", borderColor: "#a78bfa", borderRadius: "6px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }),
      "properties": T({ backgroundColor: "#f4f4f5", borderRadius: "8px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }, { backgroundColor: "#27272a", borderRadius: "8px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }),
    } },

  { id: "solarized", name: "Solarized", builtin: true,
    description: "The classic Solarized palette. Complete coverage: headings, lists, tables, callouts, code.",
    styles: {
      "paragraph": T({ color: "#657b83", lineHeight: "1.7" }, { color: "#839496", lineHeight: "1.7" }),
      "bold": T({ color: "#d33682", fontWeight: "700" }, { color: "#d33682", fontWeight: "700" }),
      "italic": T({ color: "#6c71c4" }, { color: "#6c71c4" }),
      "bold-italic": T({ color: "#6c71c4", fontWeight: "700" }, { color: "#6c71c4", fontWeight: "700" }),
      "strikethrough": T({ color: "#93a1a1", textDecorationLine: "line-through" }, { color: "#586e75", textDecorationLine: "line-through" }),
      "highlight": T({ backgroundColor: "#eee8d5", color: "#cb4b16", borderRadius: "3px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "4px", paddingRight: "4px" }, { backgroundColor: "#073642", color: "#cb4b16", borderRadius: "3px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "4px", paddingRight: "4px" }),
      "inline-math": T({ color: "#268bd2" }, { color: "#268bd2" }),
      "footnote-ref": T({ color: "#268bd2", fontSize: "0.75em" }, { color: "#268bd2", fontSize: "0.75em" }),
      "heading-1": T({ color: "#b58900", fontWeight: "700", fontSize: "1.9em", letterSpacing: "-0.02em", paddingBottom: "0.3em", borderBottomWidth: "2px", borderStyle: "solid", borderColor: "#eee8d5" }, { color: "#b58900", fontWeight: "700", fontSize: "1.9em", letterSpacing: "-0.02em", paddingBottom: "0.3em", borderBottomWidth: "2px", borderStyle: "solid", borderColor: "#073642" }),
      "heading-2": T({ color: "#cb4b16", fontWeight: "700", fontSize: "1.5em", paddingBottom: "0.2em", borderBottomWidth: "1px", borderStyle: "solid", borderColor: "#eee8d5" }, { color: "#cb4b16", fontWeight: "700", fontSize: "1.5em", paddingBottom: "0.2em", borderBottomWidth: "1px", borderStyle: "solid", borderColor: "#073642" }),
      "heading-3": T({ color: "#2aa198", fontWeight: "600", fontSize: "1.25em" }, { color: "#2aa198", fontWeight: "600", fontSize: "1.25em" }),
      "heading-4": T({ color: "#268bd2", fontWeight: "600", fontSize: "1.1em" }, { color: "#268bd2", fontWeight: "600", fontSize: "1.1em" }),
      "heading-5": T({ color: "#6c71c4", fontWeight: "600", fontSize: "1em" }, { color: "#6c71c4", fontWeight: "600", fontSize: "1em" }),
      "heading-6": T({ color: "#859900", fontWeight: "600", fontSize: "0.9em", textTransform: "uppercase", letterSpacing: "0.08em" }, { color: "#859900", fontWeight: "600", fontSize: "0.9em", textTransform: "uppercase", letterSpacing: "0.08em" }),
      "blockquote": T({ borderLeftWidth: "3px", borderStyle: "solid", borderColor: "#b58900", backgroundColor: "#eee8d5", backgroundOpacity: 60, paddingLeft: "1em", paddingTop: "0.3em", paddingBottom: "0.3em", fontStyle: "italic", color: "#586e75" }, { borderLeftWidth: "3px", borderStyle: "solid", borderColor: "#b58900", backgroundColor: "#073642", backgroundOpacity: 60, paddingLeft: "1em", paddingTop: "0.3em", paddingBottom: "0.3em", fontStyle: "italic", color: "#93a1a1" }),
      "callout": T({ backgroundColor: "#eee8d5", borderRadius: "8px", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#93a1a1", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }, { backgroundColor: "#073642", borderRadius: "8px", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#586e75", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }),
      "callout-title": T({ color: "#cb4b16", fontWeight: "700" }, { color: "#cb4b16", fontWeight: "700" }),
      "code-block": T(Object.assign(allSides("1px"), { borderStyle: "solid", backgroundColor: "#fdf6e3", borderColor: "#eee8d5", borderRadius: "8px", color: "#657b83", paddingTop: "0.8em", paddingBottom: "0.8em" }), Object.assign(allSides("1px"), { borderStyle: "solid", backgroundColor: "#002b36", borderColor: "#073642", borderRadius: "8px", color: "#839496", paddingTop: "0.8em", paddingBottom: "0.8em" })),
      "math-block": T({ backgroundColor: "#fdf6e3", color: "#268bd2", borderRadius: "8px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }, { backgroundColor: "#002b36", color: "#268bd2", borderRadius: "8px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }),
      "horizontal-rule": T({ borderTopWidth: "2px", borderStyle: "solid", borderColor: "#93a1a1" }, { borderTopWidth: "2px", borderStyle: "solid", borderColor: "#586e75" }),
      "bullet-list": T({ lineHeight: "1.7" }, { lineHeight: "1.7" }),
      "numbered-list": T({ lineHeight: "1.7" }, { lineHeight: "1.7" }),
      "nested-list": T({ color: "#586e75" }, { color: "#93a1a1" }),
      "task-list": T({ lineHeight: "1.7" }, { lineHeight: "1.7" }),
      "task-checked": T({ color: "#93a1a1", textDecorationLine: "line-through" }, { color: "#586e75", textDecorationLine: "line-through" }),
      "task-unchecked": T({ color: "#657b83" }, { color: "#839496" }),
      "list-marker": T({ color: "#b58900", fontWeight: "700" }, { color: "#b58900", fontWeight: "700" }),
      "table": T({ borderRadius: "8px", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "1px", borderStyle: "solid", borderColor: "#eee8d5" }, { borderRadius: "8px", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "1px", borderStyle: "solid", borderColor: "#073642" }),
      "table-header": T({ backgroundColor: "#eee8d5", color: "#cb4b16", fontWeight: "700", paddingTop: "8px", paddingBottom: "8px", paddingLeft: "10px", paddingRight: "10px" }, { backgroundColor: "#073642", color: "#cb4b16", fontWeight: "700", paddingTop: "8px", paddingBottom: "8px", paddingLeft: "10px", paddingRight: "10px" }),
      "table-cell": T({ paddingTop: "6px", paddingBottom: "6px", paddingLeft: "10px", paddingRight: "10px" }, { paddingTop: "6px", paddingBottom: "6px", paddingLeft: "10px", paddingRight: "10px" }),
      "table-row-alt": T({ backgroundColor: "#fdf6e3" }, { backgroundColor: "#002b36" }),
      "table-row-hover": T({ backgroundColor: "#eee8d5" }, { backgroundColor: "#073642" }),
      "inline-code": T({ backgroundColor: "#eee8d5", color: "#cb4b16", fontSize: "0.9em", borderRadius: "4px", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "6px", paddingRight: "6px" }, { backgroundColor: "#073642", color: "#cb4b16", fontSize: "0.9em", borderRadius: "4px", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "6px", paddingRight: "6px" }),
      "link": T({ color: "#268bd2", textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#6c71c4" }, { color: "#268bd2", textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#6c71c4" }),
      "internal-link": T({ color: "#268bd2", fontWeight: "600" }, { color: "#268bd2", fontWeight: "600" }),
      "external-link": T({ color: "#6c71c4", textDecorationLine: "underline" }, { color: "#6c71c4", textDecorationLine: "underline" }),
      "tag": T({ backgroundColor: "#268bd2", color: "#fdf6e3", borderRadius: "999px", fontSize: "0.85em", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "10px", paddingRight: "10px" }, { backgroundColor: "#268bd2", color: "#fdf6e3", borderRadius: "999px", fontSize: "0.85em", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "10px", paddingRight: "10px" }),
      "image": T({ borderRadius: "8px", boxShadow: "0 4px 16px rgba(101, 123, 131, 0.15)" }, { borderRadius: "8px", boxShadow: "0 4px 16px rgba(0, 0, 0, 0.5)" }),
      "embed": T({ backgroundColor: "#fdf6e3", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#268bd2", borderRadius: "8px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }, { backgroundColor: "#002b36", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#268bd2", borderRadius: "8px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }),
      "properties": T({ backgroundColor: "#eee8d5", borderRadius: "8px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }, { backgroundColor: "#073642", borderRadius: "8px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }),
    } },

  { id: "nord", name: "Nord", builtin: true,
    description: "Arctic, north-bluish palette. Complete coverage: headings, lists, tables, callouts, code.",
    styles: {
      "paragraph": T({ color: "#4c566a", lineHeight: "1.7" }, { color: "#d8dee9", lineHeight: "1.7" }),
      "bold": T({ color: "#bf616a", fontWeight: "700" }, { color: "#bf616a", fontWeight: "700" }),
      "italic": T({ color: "#b48ead" }, { color: "#b48ead" }),
      "bold-italic": T({ color: "#b48ead", fontWeight: "700" }, { color: "#b48ead", fontWeight: "700" }),
      "strikethrough": T({ color: "#7b88a1", textDecorationLine: "line-through" }, { color: "#616e88", textDecorationLine: "line-through" }),
      "highlight": T({ backgroundColor: "#ebcb8b", color: "#2e3440", borderRadius: "3px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "4px", paddingRight: "4px" }, { backgroundColor: "#ebcb8b", color: "#2e3440", borderRadius: "3px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "4px", paddingRight: "4px" }),
      "inline-math": T({ color: "#5e81ac" }, { color: "#88c0d0" }),
      "footnote-ref": T({ color: "#5e81ac", fontSize: "0.75em" }, { color: "#88c0d0", fontSize: "0.75em" }),
      "heading-1": T({ color: "#5e81ac", fontWeight: "700", fontSize: "1.9em", letterSpacing: "-0.02em", paddingBottom: "0.3em", borderBottomWidth: "2px", borderStyle: "solid", borderColor: "#d8dee9" }, { color: "#88c0d0", fontWeight: "700", fontSize: "1.9em", letterSpacing: "-0.02em", paddingBottom: "0.3em", borderBottomWidth: "2px", borderStyle: "solid", borderColor: "#4c566a" }),
      "heading-2": T({ color: "#81a1c1", fontWeight: "600", fontSize: "1.5em", letterSpacing: "-0.01em", paddingBottom: "0.2em", borderBottomWidth: "1px", borderStyle: "solid", borderColor: "#e5e9f0" }, { color: "#81a1c1", fontWeight: "600", fontSize: "1.5em", letterSpacing: "-0.01em", paddingBottom: "0.2em", borderBottomWidth: "1px", borderStyle: "solid", borderColor: "#434c5e" }),
      "heading-3": T({ color: "#88c0d0", fontWeight: "600", fontSize: "1.25em" }, { color: "#8fbcbb", fontWeight: "600", fontSize: "1.25em" }),
      "heading-4": T({ color: "#5e81ac", fontWeight: "600", fontSize: "1.1em" }, { color: "#88c0d0", fontWeight: "600", fontSize: "1.1em" }),
      "heading-5": T({ color: "#4c566a", fontWeight: "600", fontSize: "1em" }, { color: "#d8dee9", fontWeight: "600", fontSize: "1em" }),
      "heading-6": T({ color: "#7b88a1", fontWeight: "600", fontSize: "0.9em", textTransform: "uppercase", letterSpacing: "0.08em" }, { color: "#a3be8c", fontWeight: "600", fontSize: "0.9em", textTransform: "uppercase", letterSpacing: "0.08em" }),
      "blockquote": T({ borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#88c0d0", fontStyle: "italic", color: "#5e81ac", paddingLeft: "1em", paddingTop: "0.3em", paddingBottom: "0.3em", backgroundColor: "#e5e9f0", backgroundOpacity: 40, borderRadius: "0 6px 6px 0" }, { borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#88c0d0", fontStyle: "italic", color: "#81a1c1", paddingLeft: "1em", paddingTop: "0.3em", paddingBottom: "0.3em", backgroundColor: "#3b4252", backgroundOpacity: 40, borderRadius: "0 6px 6px 0" }),
      "callout": T({ backgroundColor: "#eceff4", borderRadius: "10px", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#d8dee9", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }, { backgroundColor: "#2e3440", borderRadius: "10px", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#434c5e", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }),
      "callout-title": T({ color: "#5e81ac", fontWeight: "700" }, { color: "#88c0d0", fontWeight: "700" }),
      "code-block": T(Object.assign(allSides("1px"), { borderStyle: "solid", backgroundColor: "#eceff4", borderColor: "#d8dee9", color: "#4c566a", borderRadius: "8px", paddingTop: "0.8em", paddingBottom: "0.8em" }), Object.assign(allSides("1px"), { borderStyle: "solid", backgroundColor: "#2e3440", borderColor: "#3b4252", color: "#d8dee9", borderRadius: "8px", paddingTop: "0.8em", paddingBottom: "0.8em" })),
      "math-block": T({ backgroundColor: "#eceff4", color: "#5e81ac", borderRadius: "8px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }, { backgroundColor: "#2e3440", color: "#88c0d0", borderRadius: "8px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }),
      "horizontal-rule": T({ borderTopWidth: "2px", borderStyle: "solid", borderColor: "#d8dee9" }, { borderTopWidth: "2px", borderStyle: "solid", borderColor: "#4c566a" }),
      "bullet-list": T({ lineHeight: "1.7" }, { lineHeight: "1.7" }),
      "numbered-list": T({ lineHeight: "1.7" }, { lineHeight: "1.7" }),
      "nested-list": T({ color: "#7b88a1" }, { color: "#a3be8c" }),
      "task-list": T({ lineHeight: "1.7" }, { lineHeight: "1.7" }),
      "task-checked": T({ color: "#7b88a1", textDecorationLine: "line-through" }, { color: "#616e88", textDecorationLine: "line-through" }),
      "task-unchecked": T({ color: "#4c566a" }, { color: "#d8dee9" }),
      "list-marker": T({ color: "#88c0d0", fontWeight: "700" }, { color: "#88c0d0", fontWeight: "700" }),
      "table": T({ borderRadius: "8px", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "1px", borderStyle: "solid", borderColor: "#d8dee9" }, { borderRadius: "8px", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "1px", borderStyle: "solid", borderColor: "#434c5e" }),
      "table-header": T({ backgroundColor: "#e5e9f0", color: "#5e81ac", fontWeight: "700", paddingTop: "8px", paddingBottom: "8px", paddingLeft: "10px", paddingRight: "10px" }, { backgroundColor: "#3b4252", color: "#88c0d0", fontWeight: "700", paddingTop: "8px", paddingBottom: "8px", paddingLeft: "10px", paddingRight: "10px" }),
      "table-cell": T({ paddingTop: "6px", paddingBottom: "6px", paddingLeft: "10px", paddingRight: "10px" }, { paddingTop: "6px", paddingBottom: "6px", paddingLeft: "10px", paddingRight: "10px" }),
      "table-row-alt": T({ backgroundColor: "#f4f6fa" }, { backgroundColor: "#343b4a" }),
      "table-row-hover": T({ backgroundColor: "#e5e9f0" }, { backgroundColor: "#434c5e" }),
      "inline-code": T({ backgroundColor: "#e5e9f0", color: "#bf616a", fontSize: "0.9em", borderRadius: "4px", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "6px", paddingRight: "6px" }, { backgroundColor: "#3b4252", color: "#bf616a", fontSize: "0.9em", borderRadius: "4px", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "6px", paddingRight: "6px" }),
      "link": T({ color: "#5e81ac", textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#81a1c1" }, { color: "#88c0d0", textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#5e81ac" }),
      "internal-link": T({ color: "#5e81ac", fontWeight: "600" }, { color: "#88c0d0", fontWeight: "600" }),
      "external-link": T({ color: "#b48ead", textDecorationLine: "underline" }, { color: "#b48ead", textDecorationLine: "underline" }),
      "tag": T({ backgroundColor: "#5e81ac", color: "#eceff4", borderRadius: "999px", fontSize: "0.85em", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "10px", paddingRight: "10px" }, { backgroundColor: "#88c0d0", color: "#2e3440", borderRadius: "999px", fontSize: "0.85em", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "10px", paddingRight: "10px" }),
      "image": T({ borderRadius: "8px", boxShadow: "0 4px 16px rgba(46, 52, 64, 0.15)" }, { borderRadius: "8px", boxShadow: "0 4px 16px rgba(0, 0, 0, 0.5)" }),
      "embed": T({ backgroundColor: "#eceff4", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#5e81ac", borderRadius: "8px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }, { backgroundColor: "#2e3440", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#88c0d0", borderRadius: "8px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }),
      "properties": T({ backgroundColor: "#eceff4", borderRadius: "8px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }, { backgroundColor: "#2e3440", borderRadius: "8px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }),
    } },

  { id: "gruvbox", name: "Gruvbox", builtin: true,
    description: "Retro warm palette. Cream, orange, aqua, red.",
    styles: {
      "paragraph": T({ color: "#3c3836", lineHeight: "1.7" }, { color: "#ebdbb2", lineHeight: "1.7" }),
      "bold": T({ color: "#9d0006", fontWeight: "700" }, { color: "#fb4934", fontWeight: "700" }),
      "italic": T({ color: "#8f3f71" }, { color: "#d3869b" }),
      "bold-italic": T({ color: "#8f3f71", fontWeight: "700" }, { color: "#d3869b", fontWeight: "700" }),
      "strikethrough": T({ color: "#928374", textDecorationLine: "line-through" }, { color: "#928374", textDecorationLine: "line-through" }),
      "highlight": T({ backgroundColor: "#fabd2f", color: "#282828", borderRadius: "3px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "4px", paddingRight: "4px" }, { backgroundColor: "#d79921", color: "#fbf1c7", borderRadius: "3px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "4px", paddingRight: "4px" }),
      "inline-math": T({ color: "#076678" }, { color: "#83a598" }),
      "footnote-ref": T({ color: "#076678", fontSize: "0.75em" }, { color: "#83a598", fontSize: "0.75em" }),
      "heading-1": T({ color: "#d65d0e", fontWeight: "700", fontSize: "1.9em", letterSpacing: "-0.02em", paddingBottom: "0.3em", borderBottomWidth: "2px", borderStyle: "solid", borderColor: "#ebdbb2" }, { color: "#fe8019", fontWeight: "700", fontSize: "1.9em", letterSpacing: "-0.02em", paddingBottom: "0.3em", borderBottomWidth: "2px", borderStyle: "solid", borderColor: "#504945" }),
      "heading-2": T({ color: "#af3a03", fontWeight: "700", fontSize: "1.5em", paddingBottom: "0.2em", borderBottomWidth: "1px", borderStyle: "solid", borderColor: "#ebdbb2" }, { color: "#d65d0e", fontWeight: "700", fontSize: "1.5em", paddingBottom: "0.2em", borderBottomWidth: "1px", borderStyle: "solid", borderColor: "#504945" }),
      "heading-3": T({ color: "#79740e", fontWeight: "600", fontSize: "1.25em" }, { color: "#b8bb26", fontWeight: "600", fontSize: "1.25em" }),
      "heading-4": T({ color: "#076678", fontWeight: "600", fontSize: "1.1em" }, { color: "#83a598", fontWeight: "600", fontSize: "1.1em" }),
      "heading-5": T({ color: "#8f3f71", fontWeight: "600", fontSize: "1em" }, { color: "#d3869b", fontWeight: "600", fontSize: "1em" }),
      "heading-6": T({ color: "#b57614", fontWeight: "600", fontSize: "0.9em", textTransform: "uppercase", letterSpacing: "0.08em" }, { color: "#fabd2f", fontWeight: "600", fontSize: "0.9em", textTransform: "uppercase", letterSpacing: "0.08em" }),
      "blockquote": T({ borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#d79921", backgroundColor: "#f2e5bc", backgroundOpacity: 60, paddingLeft: "1em", paddingTop: "0.3em", paddingBottom: "0.3em", fontStyle: "italic", color: "#7c6f64" }, { borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#d79921", backgroundColor: "#3c3836", backgroundOpacity: 60, paddingLeft: "1em", paddingTop: "0.3em", paddingBottom: "0.3em", fontStyle: "italic", color: "#a89984" }),
      "callout": T({ backgroundColor: "#f2e5bc", borderRadius: "8px", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#d5c4a1", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }, { backgroundColor: "#3c3836", borderRadius: "8px", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#504945", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }),
      "callout-title": T({ color: "#af3a03", fontWeight: "700" }, { color: "#fe8019", fontWeight: "700" }),
      "code-block": T(Object.assign(allSides("1px"), { borderStyle: "solid", backgroundColor: "#fbf1c7", borderColor: "#ebdbb2", borderRadius: "8px", color: "#3c3836", paddingTop: "0.8em", paddingBottom: "0.8em" }), Object.assign(allSides("1px"), { borderStyle: "solid", backgroundColor: "#282828", borderColor: "#3c3836", borderRadius: "8px", color: "#ebdbb2", paddingTop: "0.8em", paddingBottom: "0.8em" })),
      "math-block": T({ backgroundColor: "#fbf1c7", color: "#076678", borderRadius: "8px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }, { backgroundColor: "#282828", color: "#83a598", borderRadius: "8px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }),
      "horizontal-rule": T({ borderTopWidth: "2px", borderStyle: "solid", borderColor: "#d5c4a1" }, { borderTopWidth: "2px", borderStyle: "solid", borderColor: "#504945" }),
      "bullet-list": T({ lineHeight: "1.7" }, { lineHeight: "1.7" }),
      "numbered-list": T({ lineHeight: "1.7" }, { lineHeight: "1.7" }),
      "nested-list": T({ color: "#7c6f64" }, { color: "#a89984" }),
      "task-list": T({ lineHeight: "1.7" }, { lineHeight: "1.7" }),
      "task-checked": T({ color: "#928374", textDecorationLine: "line-through" }, { color: "#928374", textDecorationLine: "line-through" }),
      "task-unchecked": T({ color: "#3c3836" }, { color: "#ebdbb2" }),
      "list-marker": T({ color: "#d65d0e", fontWeight: "700" }, { color: "#fe8019", fontWeight: "700" }),
      "table": T({ borderRadius: "8px", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "1px", borderStyle: "solid", borderColor: "#ebdbb2" }, { borderRadius: "8px", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "1px", borderStyle: "solid", borderColor: "#504945" }),
      "table-header": T({ backgroundColor: "#f2e5bc", color: "#af3a03", fontWeight: "700", paddingTop: "8px", paddingBottom: "8px", paddingLeft: "10px", paddingRight: "10px" }, { backgroundColor: "#3c3836", color: "#fe8019", fontWeight: "700", paddingTop: "8px", paddingBottom: "8px", paddingLeft: "10px", paddingRight: "10px" }),
      "table-cell": T({ paddingTop: "6px", paddingBottom: "6px", paddingLeft: "10px", paddingRight: "10px" }, { paddingTop: "6px", paddingBottom: "6px", paddingLeft: "10px", paddingRight: "10px" }),
      "table-row-alt": T({ backgroundColor: "#f9f5d7" }, { backgroundColor: "#32302f" }),
      "table-row-hover": T({ backgroundColor: "#f2e5bc" }, { backgroundColor: "#504945" }),
      "inline-code": T({ backgroundColor: "#f2e5bc", color: "#af3a03", fontSize: "0.9em", borderRadius: "4px", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "6px", paddingRight: "6px" }, { backgroundColor: "#3c3836", color: "#fe8019", fontSize: "0.9em", borderRadius: "4px", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "6px", paddingRight: "6px" }),
      "link": T({ color: "#076678", textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#427b58" }, { color: "#83a598", textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#458588" }),
      "internal-link": T({ color: "#076678", fontWeight: "600" }, { color: "#83a598", fontWeight: "600" }),
      "external-link": T({ color: "#8f3f71", textDecorationLine: "underline" }, { color: "#d3869b", textDecorationLine: "underline" }),
      "tag": T({ backgroundColor: "#d65d0e", color: "#fbf1c7", borderRadius: "999px", fontSize: "0.85em", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "10px", paddingRight: "10px" }, { backgroundColor: "#d65d0e", color: "#fbf1c7", borderRadius: "999px", fontSize: "0.85em", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "10px", paddingRight: "10px" }),
      "image": T({ borderRadius: "8px", boxShadow: "0 4px 16px rgba(60, 56, 54, 0.15)" }, { borderRadius: "8px", boxShadow: "0 4px 16px rgba(0, 0, 0, 0.5)" }),
      "embed": T({ backgroundColor: "#fbf1c7", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#d65d0e", borderRadius: "8px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }, { backgroundColor: "#282828", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#fe8019", borderRadius: "8px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }),
      "properties": T({ backgroundColor: "#f2e5bc", borderRadius: "8px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }, { backgroundColor: "#3c3836", borderRadius: "8px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }),
    } },

  { id: "tokyo", name: "Tokyo Night", builtin: true,
    description: "Neon-lit dark theme. Deep navy, electric blue, hot pink.",
    styles: {
      "paragraph": T({ color: "#343b58", lineHeight: "1.7" }, { color: "#a9b1d6", lineHeight: "1.7" }),
      "bold": T({ color: "#8c4351", fontWeight: "700" }, { color: "#f7768e", fontWeight: "700" }),
      "italic": T({ color: "#5a4a78" }, { color: "#bb9af7" }),
      "bold-italic": T({ color: "#5a4a78", fontWeight: "700" }, { color: "#bb9af7", fontWeight: "700" }),
      "strikethrough": T({ color: "#9699a3", textDecorationLine: "line-through" }, { color: "#565f89", textDecorationLine: "line-through" }),
      "highlight": T({ backgroundColor: "#f7d7a8", color: "#343b58", borderRadius: "3px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "4px", paddingRight: "4px" }, { backgroundColor: "#e0af68", color: "#1a1b26", borderRadius: "3px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "4px", paddingRight: "4px" }),
      "inline-math": T({ color: "#0f4b6e" }, { color: "#7dcfff" }),
      "footnote-ref": T({ color: "#0f4b6e", fontSize: "0.75em" }, { color: "#7dcfff", fontSize: "0.75em" }),
      "heading-1": T({ color: "#34548a", fontWeight: "800", fontSize: "1.9em", letterSpacing: "-0.02em", paddingBottom: "0.3em", borderBottomWidth: "2px", borderStyle: "solid", borderColor: "#c4c8da" }, { color: "#7aa2f7", fontWeight: "800", fontSize: "1.9em", letterSpacing: "-0.02em", paddingBottom: "0.3em", borderBottomWidth: "2px", borderStyle: "solid", borderColor: "#414868" }),
      "heading-2": T({ color: "#5a4a78", fontWeight: "700", fontSize: "1.5em", paddingBottom: "0.2em", borderBottomWidth: "1px", borderStyle: "solid", borderColor: "#c4c8da" }, { color: "#bb9af7", fontWeight: "700", fontSize: "1.5em", paddingBottom: "0.2em", borderBottomWidth: "1px", borderStyle: "solid", borderColor: "#414868" }),
      "heading-3": T({ color: "#0f4b6e", fontWeight: "600", fontSize: "1.25em" }, { color: "#7dcfff", fontWeight: "600", fontSize: "1.25em" }),
      "heading-4": T({ color: "#33635c", fontWeight: "600", fontSize: "1.1em" }, { color: "#73daca", fontWeight: "600", fontSize: "1.1em" }),
      "heading-5": T({ color: "#8f5e15", fontWeight: "600", fontSize: "1em" }, { color: "#e0af68", fontWeight: "600", fontSize: "1em" }),
      "heading-6": T({ color: "#5a4a78", fontWeight: "600", fontSize: "0.9em", textTransform: "uppercase", letterSpacing: "0.08em" }, { color: "#bb9af7", fontWeight: "600", fontSize: "0.9em", textTransform: "uppercase", letterSpacing: "0.08em" }),
      "blockquote": T({ borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#34548a", backgroundColor: "#e1e2e7", backgroundOpacity: 60, paddingLeft: "1em", paddingTop: "0.3em", paddingBottom: "0.3em", fontStyle: "italic", color: "#5a4a78" }, { borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#7aa2f7", backgroundColor: "#1a1b26", backgroundOpacity: 60, paddingLeft: "1em", paddingTop: "0.3em", paddingBottom: "0.3em", fontStyle: "italic", color: "#bb9af7" }),
      "callout": T({ backgroundColor: "#e1e2e7", borderRadius: "10px", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#c4c8da", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }, { backgroundColor: "#1a1b26", borderRadius: "10px", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#414868", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }),
      "callout-title": T({ color: "#5a4a78", fontWeight: "700" }, { color: "#bb9af7", fontWeight: "700" }),
      "code-block": T(Object.assign(allSides("1px"), { borderStyle: "solid", backgroundColor: "#e1e2e7", borderColor: "#c4c8da", borderRadius: "10px", color: "#343b58", paddingTop: "0.8em", paddingBottom: "0.8em" }), Object.assign(allSides("1px"), { borderStyle: "solid", backgroundColor: "#1a1b26", borderColor: "#414868", borderRadius: "10px", color: "#a9b1d6", paddingTop: "0.8em", paddingBottom: "0.8em" })),
      "math-block": T({ backgroundColor: "#e1e2e7", color: "#0f4b6e", borderRadius: "10px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }, { backgroundColor: "#1a1b26", color: "#7dcfff", borderRadius: "10px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }),
      "horizontal-rule": T({ borderTopWidth: "2px", borderStyle: "solid", borderColor: "#c4c8da" }, { borderTopWidth: "2px", borderStyle: "solid", borderColor: "#414868" }),
      "bullet-list": T({ lineHeight: "1.7" }, { lineHeight: "1.7" }),
      "numbered-list": T({ lineHeight: "1.7" }, { lineHeight: "1.7" }),
      "nested-list": T({ color: "#5a4a78" }, { color: "#bb9af7" }),
      "task-list": T({ lineHeight: "1.7" }, { lineHeight: "1.7" }),
      "task-checked": T({ color: "#9699a3", textDecorationLine: "line-through" }, { color: "#565f89", textDecorationLine: "line-through" }),
      "task-unchecked": T({ color: "#343b58" }, { color: "#a9b1d6" }),
      "list-marker": T({ color: "#34548a", fontWeight: "700" }, { color: "#7aa2f7", fontWeight: "700" }),
      "table": T({ borderRadius: "10px", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "1px", borderStyle: "solid", borderColor: "#c4c8da" }, { borderRadius: "10px", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "1px", borderStyle: "solid", borderColor: "#414868" }),
      "table-header": T({ backgroundColor: "#e1e2e7", color: "#34548a", fontWeight: "700", paddingTop: "8px", paddingBottom: "8px", paddingLeft: "10px", paddingRight: "10px" }, { backgroundColor: "#1a1b26", color: "#7aa2f7", fontWeight: "700", paddingTop: "8px", paddingBottom: "8px", paddingLeft: "10px", paddingRight: "10px" }),
      "table-cell": T({ paddingTop: "6px", paddingBottom: "6px", paddingLeft: "10px", paddingRight: "10px" }, { paddingTop: "6px", paddingBottom: "6px", paddingLeft: "10px", paddingRight: "10px" }),
      "table-row-alt": T({ backgroundColor: "#f0f1f5" }, { backgroundColor: "#16161e" }),
      "table-row-hover": T({ backgroundColor: "#e1e2e7" }, { backgroundColor: "#292e42" }),
      "inline-code": T({ backgroundColor: "#e9e9ed", color: "#8c4351", fontSize: "0.9em", borderRadius: "4px", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "6px", paddingRight: "6px" }, { backgroundColor: "#1a1b26", color: "#f7768e", fontSize: "0.9em", borderRadius: "4px", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "6px", paddingRight: "6px" }),
      "link": T({ color: "#0f4b6e", textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#34548a" }, { color: "#7dcfff", textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#7aa2f7" }),
      "internal-link": T({ color: "#0f4b6e", fontWeight: "600" }, { color: "#7dcfff", fontWeight: "600" }),
      "external-link": T({ color: "#5a4a78", textDecorationLine: "underline" }, { color: "#bb9af7", textDecorationLine: "underline" }),
      "tag": T({ backgroundColor: "#5a4a78", color: "#ffffff", borderRadius: "999px", fontSize: "0.85em", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "10px", paddingRight: "10px" }, { backgroundColor: "#bb9af7", color: "#1a1b26", borderRadius: "999px", fontSize: "0.85em", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "10px", paddingRight: "10px" }),
      "image": T({ borderRadius: "10px", boxShadow: "0 4px 16px rgba(52, 59, 88, 0.15)" }, { borderRadius: "10px", boxShadow: "0 4px 16px rgba(0, 0, 0, 0.6)" }),
      "embed": T({ backgroundColor: "#e1e2e7", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#5a4a78", borderRadius: "10px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }, { backgroundColor: "#1a1b26", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#bb9af7", borderRadius: "10px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }),
      "properties": T({ backgroundColor: "#e1e2e7", borderRadius: "10px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }, { backgroundColor: "#1a1b26", borderRadius: "10px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }),
    } },

  { id: "glass", name: "Glass", builtin: true,
    description: "Translucent frosted-glass surfaces with gradients and soft shadows.",
    styles: {
      "paragraph": T({ lineHeight: "1.7", color: "#334155" }, { lineHeight: "1.7", color: "#cbd5e1" }),
      "bold": T({ color: "#1e293b", fontWeight: "700" }, { color: "#f1f5f9", fontWeight: "700" }),
      "italic": T({ color: "#475569" }, { color: "#94a3b8" }),
      "bold-italic": T({ color: "#1e293b", fontWeight: "700" }, { color: "#f1f5f9", fontWeight: "700" }),
      "strikethrough": T({ color: "#94a3b8", textDecorationLine: "line-through" }, { color: "#64748b", textDecorationLine: "line-through" }),
      "highlight": T({ backgroundGradient: "linear-gradient(135deg, #fde68a, #fca5a5)", color: "#7c2d12", borderRadius: "4px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "5px", paddingRight: "5px" }, { backgroundGradient: "linear-gradient(135deg, #fbbf24, #f472b6)", color: "#1e1b4b", borderRadius: "4px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "5px", paddingRight: "5px" }),
      "inline-math": T({ color: "#7c3aed" }, { color: "#a78bfa" }),
      "footnote-ref": T({ color: "#7c3aed", fontSize: "0.75em" }, { color: "#a78bfa", fontSize: "0.75em" }),
      "heading-1": T({ backgroundGradient: "linear-gradient(90deg, #7c3aed, #06b6d4)", color: "#ffffff", fontSize: "1.9em", fontWeight: "700", paddingLeft: "14px", paddingRight: "14px", paddingTop: "6px", paddingBottom: "6px", borderRadius: "10px" }, { backgroundGradient: "linear-gradient(90deg, #a78bfa, #22d3ee)", color: "#0f172a", fontSize: "1.9em", fontWeight: "700", paddingLeft: "14px", paddingRight: "14px", paddingTop: "6px", paddingBottom: "6px", borderRadius: "10px" }),
      "heading-2": T({ color: "#6d28d9", fontWeight: "700", fontSize: "1.5em", paddingBottom: "0.2em", borderBottomWidth: "2px", borderStyle: "solid", borderColor: "#ddd6fe" }, { color: "#c4b5fd", fontWeight: "700", fontSize: "1.5em", paddingBottom: "0.2em", borderBottomWidth: "2px", borderStyle: "solid", borderColor: "#4c1d95" }),
      "heading-3": T({ color: "#0891b2", fontWeight: "600", fontSize: "1.25em" }, { color: "#67e8f9", fontWeight: "600", fontSize: "1.25em" }),
      "heading-4": T({ color: "#7c3aed", fontWeight: "600", fontSize: "1.1em" }, { color: "#a78bfa", fontWeight: "600", fontSize: "1.1em" }),
      "heading-5": T({ color: "#475569", fontWeight: "600", fontSize: "1em" }, { color: "#cbd5e1", fontWeight: "600", fontSize: "1em" }),
      "heading-6": T({ color: "#64748b", fontWeight: "600", fontSize: "0.9em", textTransform: "uppercase", letterSpacing: "0.08em" }, { color: "#94a3b8", fontWeight: "600", fontSize: "0.9em", textTransform: "uppercase", letterSpacing: "0.08em" }),
      "blockquote": T({ backgroundGradient: "linear-gradient(90deg, rgba(120,180,255,0.15), rgba(180,120,255,0.05))", borderRadius: "12px", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#7aa2f7", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px", fontStyle: "italic", color: "#475569" }, { backgroundGradient: "linear-gradient(90deg, rgba(120,180,255,0.15), rgba(180,120,255,0.05))", borderRadius: "12px", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#7aa2f7", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px", fontStyle: "italic", color: "#cbd5e1" }),
      "callout": T(Object.assign(allSides("1px"), { borderStyle: "solid", backgroundGradient: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,240,255,0.75))", borderRadius: "16px", borderColor: "rgba(180,180,220,0.4)", boxShadow: "0 8px 32px rgba(31,38,135,0.15)", paddingTop: "12px", paddingBottom: "12px", paddingLeft: "16px", paddingRight: "16px" }), Object.assign(allSides("1px"), { borderStyle: "solid", backgroundGradient: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(120,120,255,0.05))", borderRadius: "16px", borderColor: "rgba(255,255,255,0.18)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)", paddingTop: "12px", paddingBottom: "12px", paddingLeft: "16px", paddingRight: "16px" })),
      "callout-title": T({ color: "#6d28d9", fontWeight: "700" }, { color: "#c4b5fd", fontWeight: "700" }),
      "code-block": T(Object.assign(allSides("1px"), { borderStyle: "solid", backgroundGradient: "linear-gradient(135deg, #f8fafc, #eef2f7)", borderRadius: "12px", borderColor: "rgba(0,0,0,0.06)", color: "#334155", paddingTop: "0.8em", paddingBottom: "0.8em" }), Object.assign(allSides("1px"), { borderStyle: "solid", backgroundGradient: "linear-gradient(135deg, #0f172a, #1a2332)", borderRadius: "12px", borderColor: "rgba(255,255,255,0.08)", color: "#cbd5e1", paddingTop: "0.8em", paddingBottom: "0.8em" })),
      "math-block": T({ backgroundGradient: "linear-gradient(135deg, #f8fafc, #eef2f7)", color: "#7c3aed", borderRadius: "12px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }, { backgroundGradient: "linear-gradient(135deg, #0f172a, #1a2332)", color: "#a78bfa", borderRadius: "12px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }),
      "horizontal-rule": T({ borderTopWidth: "2px", borderStyle: "solid", borderColor: "#ddd6fe" }, { borderTopWidth: "2px", borderStyle: "solid", borderColor: "#4c1d95" }),
      "bullet-list": T({ lineHeight: "1.7" }, { lineHeight: "1.7" }),
      "numbered-list": T({ lineHeight: "1.7" }, { lineHeight: "1.7" }),
      "nested-list": T({ color: "#475569" }, { color: "#94a3b8" }),
      "task-list": T({ lineHeight: "1.7" }, { lineHeight: "1.7" }),
      "task-checked": T({ color: "#94a3b8", textDecorationLine: "line-through" }, { color: "#64748b", textDecorationLine: "line-through" }),
      "task-unchecked": T({ color: "#334155" }, { color: "#cbd5e1" }),
      "list-marker": T({ color: "#7c3aed", fontWeight: "700" }, { color: "#a78bfa", fontWeight: "700" }),
      "table": T({ backgroundGradient: "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(240,245,255,0.6))", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }, { backgroundGradient: "linear-gradient(135deg, rgba(15,23,42,0.6), rgba(30,41,59,0.4))", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }),
      "table-header": T({ backgroundColor: "rgba(124,58,237,0.12)", color: "#6d28d9", fontWeight: "700", paddingTop: "8px", paddingBottom: "8px", paddingLeft: "10px", paddingRight: "10px" }, { backgroundColor: "rgba(167,139,250,0.18)", color: "#c4b5fd", fontWeight: "700", paddingTop: "8px", paddingBottom: "8px", paddingLeft: "10px", paddingRight: "10px" }),
      "table-cell": T({ paddingTop: "6px", paddingBottom: "6px", paddingLeft: "10px", paddingRight: "10px" }, { paddingTop: "6px", paddingBottom: "6px", paddingLeft: "10px", paddingRight: "10px" }),
      "table-row-alt": T({ backgroundColor: "rgba(124,58,237,0.05)" }, { backgroundColor: "rgba(167,139,250,0.08)" }),
      "table-row-hover": T({ backgroundColor: "rgba(124,58,237,0.1)" }, { backgroundColor: "rgba(167,139,250,0.15)" }),
      "inline-code": T({ backgroundGradient: "linear-gradient(135deg, #eff6ff, #e0e7ff)", color: "#3730a3", fontSize: "0.9em", borderRadius: "999px", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "10px", paddingRight: "10px" }, { backgroundGradient: "linear-gradient(135deg, #1e293b, #312e81)", color: "#a5b4fc", fontSize: "0.9em", borderRadius: "999px", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "10px", paddingRight: "10px" }),
      "link": T({ color: "#7c3aed", textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#c4b5fd" }, { color: "#a78bfa", textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#7c3aed" }),
      "internal-link": T({ color: "#7c3aed", fontWeight: "600" }, { color: "#a78bfa", fontWeight: "600" }),
      "external-link": T({ color: "#0891b2", textDecorationLine: "underline" }, { color: "#22d3ee", textDecorationLine: "underline" }),
      "tag": T({ backgroundGradient: "linear-gradient(135deg, #7c3aed, #06b6d4)", color: "#ffffff", borderRadius: "999px", fontSize: "0.85em", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "12px", paddingRight: "12px" }, { backgroundGradient: "linear-gradient(135deg, #a78bfa, #22d3ee)", color: "#0f172a", borderRadius: "999px", fontSize: "0.85em", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "12px", paddingRight: "12px" }),
      "image": T({ borderRadius: "16px", boxShadow: "0 12px 40px rgba(0,0,0,0.18)" }, { borderRadius: "16px", boxShadow: "0 12px 40px rgba(0,0,0,0.6)" }),
      "embed": T({ backgroundGradient: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,240,255,0.75))", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#7c3aed", borderRadius: "16px", paddingTop: "12px", paddingBottom: "12px", paddingLeft: "16px", paddingRight: "16px" }, { backgroundGradient: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(120,120,255,0.05))", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#a78bfa", borderRadius: "16px", paddingTop: "12px", paddingBottom: "12px", paddingLeft: "16px", paddingRight: "16px" }),
      "properties": T({ backgroundGradient: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,240,255,0.75))", borderRadius: "16px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }, { backgroundGradient: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(120,120,255,0.05))", borderRadius: "16px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }),
    } },

  { id: "neon", name: "Neon", builtin: true,
    description: "Cyberpunk glow. Hot pink, electric cyan, text-shadow glow.",
    styles: {
      "paragraph": T({ color: "#1e1b4b", lineHeight: "1.7" }, { color: "#e0e7ff", lineHeight: "1.7" }),
      "bold": T({ color: "#db2777", fontWeight: "700", textShadow: "0 0 6px rgba(219,39,119,0.4)" }, { color: "#f472b6", fontWeight: "700", textShadow: "0 0 8px rgba(244,114,182,0.7)" }),
      "italic": T({ color: "#7c3aed", textShadow: "0 0 6px rgba(124,58,237,0.4)" }, { color: "#a78bfa", textShadow: "0 0 8px rgba(167,139,250,0.7)" }),
      "bold-italic": T({ color: "#db2777", fontWeight: "700", textShadow: "0 0 6px rgba(219,39,119,0.4)" }, { color: "#f472b6", fontWeight: "700", textShadow: "0 0 8px rgba(244,114,182,0.7)" }),
      "strikethrough": T({ color: "#6b7280", textDecorationLine: "line-through" }, { color: "#6b7280", textDecorationLine: "line-through" }),
      "highlight": T({ backgroundGradient: "linear-gradient(135deg, #fde68a, #fca5a5)", color: "#7c2d12", borderRadius: "4px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "5px", paddingRight: "5px" }, { backgroundGradient: "linear-gradient(135deg, #fbbf24, #f472b6)", color: "#1e1b4b", borderRadius: "4px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "5px", paddingRight: "5px" }),
      "inline-math": T({ color: "#0891b2", textShadow: "0 0 6px rgba(8,145,178,0.4)" }, { color: "#22d3ee", textShadow: "0 0 8px rgba(34,211,238,0.7)" }),
      "footnote-ref": T({ color: "#7c3aed", fontSize: "0.75em" }, { color: "#a78bfa", fontSize: "0.75em" }),
      "heading-1": T({ color: "#db2777", fontWeight: "800", fontSize: "1.9em", letterSpacing: "-0.02em", paddingBottom: "0.3em", textShadow: "0 0 12px rgba(219,39,119,0.5), 0 0 24px rgba(219,39,119,0.3)", borderBottomWidth: "2px", borderStyle: "solid", borderColor: "#f9a8d4" }, { color: "#f472b6", fontWeight: "800", fontSize: "1.9em", letterSpacing: "-0.02em", paddingBottom: "0.3em", textShadow: "0 0 12px rgba(244,114,182,0.8), 0 0 24px rgba(244,114,182,0.5)", borderBottomWidth: "2px", borderStyle: "solid", borderColor: "#831843" }),
      "heading-2": T({ color: "#7c3aed", fontWeight: "700", fontSize: "1.5em", paddingBottom: "0.2em", textShadow: "0 0 10px rgba(124,58,237,0.5)", borderBottomWidth: "1px", borderStyle: "solid", borderColor: "#ddd6fe" }, { color: "#a78bfa", fontWeight: "700", fontSize: "1.5em", paddingBottom: "0.2em", textShadow: "0 0 10px rgba(167,139,250,0.8)", borderBottomWidth: "1px", borderStyle: "solid", borderColor: "#4c1d95" }),
      "heading-3": T({ color: "#0891b2", fontWeight: "600", fontSize: "1.25em", textShadow: "0 0 8px rgba(8,145,178,0.4)" }, { color: "#22d3ee", fontWeight: "600", fontSize: "1.25em", textShadow: "0 0 8px rgba(34,211,238,0.7)" }),
      "heading-4": T({ color: "#7c3aed", fontWeight: "600", fontSize: "1.1em" }, { color: "#a78bfa", fontWeight: "600", fontSize: "1.1em" }),
      "heading-5": T({ color: "#1e1b4b", fontWeight: "600", fontSize: "1em" }, { color: "#e0e7ff", fontWeight: "600", fontSize: "1em" }),
      "heading-6": T({ color: "#6b7280", fontWeight: "600", fontSize: "0.9em", textTransform: "uppercase", letterSpacing: "0.08em" }, { color: "#9ca3af", fontWeight: "600", fontSize: "0.9em", textTransform: "uppercase", letterSpacing: "0.08em" }),
      "blockquote": T({ backgroundGradient: "linear-gradient(90deg, rgba(219,39,119,0.12), rgba(124,58,237,0.06))", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#db2777", paddingLeft: "1em", paddingTop: "0.3em", paddingBottom: "0.3em", borderRadius: "8px", fontStyle: "italic", color: "#4c1d95" }, { backgroundGradient: "linear-gradient(90deg, rgba(219,39,119,0.25), rgba(124,58,237,0.1))", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#f472b6", paddingLeft: "1em", paddingTop: "0.3em", paddingBottom: "0.3em", borderRadius: "8px", fontStyle: "italic", color: "#e9d5ff" }),
      "callout": T(Object.assign(allSides("1px"), { borderStyle: "solid", backgroundGradient: "linear-gradient(135deg, #fdf4ff, #eef2ff)", borderRadius: "12px", borderColor: "#e9d5ff", boxShadow: "0 0 20px rgba(124,58,237,0.15)", paddingTop: "12px", paddingBottom: "12px", paddingLeft: "16px", paddingRight: "16px" }), Object.assign(allSides("1px"), { borderStyle: "solid", backgroundGradient: "linear-gradient(135deg, #0f0a1e, #1e1b4b)", borderRadius: "12px", borderColor: "#6d28d9", boxShadow: "0 0 20px rgba(124,58,237,0.3)", paddingTop: "12px", paddingBottom: "12px", paddingLeft: "16px", paddingRight: "16px" })),
      "callout-title": T({ color: "#db2777", fontWeight: "700" }, { color: "#f472b6", fontWeight: "700" }),
      "code-block": T(Object.assign(allSides("1px"), { borderStyle: "solid", backgroundGradient: "linear-gradient(135deg, #fdf4ff, #eef2ff)", borderRadius: "12px", borderColor: "#e9d5ff", color: "#4c1d95", paddingTop: "0.8em", paddingBottom: "0.8em" }), Object.assign(allSides("1px"), { borderStyle: "solid", backgroundGradient: "linear-gradient(135deg, #0f0a1e, #1e1b4b)", borderRadius: "12px", borderColor: "#6d28d9", color: "#e9d5ff", boxShadow: "0 0 20px rgba(124,58,237,0.3)", paddingTop: "0.8em", paddingBottom: "0.8em" })),
      "math-block": T({ backgroundGradient: "linear-gradient(135deg, #fdf4ff, #eef2ff)", color: "#0891b2", borderRadius: "12px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }, { backgroundGradient: "linear-gradient(135deg, #0f0a1e, #1e1b4b)", color: "#22d3ee", borderRadius: "12px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }),
      "horizontal-rule": T({ borderTopWidth: "2px", borderStyle: "solid", borderColor: "#ddd6fe" }, { borderTopWidth: "2px", borderStyle: "solid", borderColor: "#4c1d95" }),
      "bullet-list": T({ lineHeight: "1.7" }, { lineHeight: "1.7" }),
      "numbered-list": T({ lineHeight: "1.7" }, { lineHeight: "1.7" }),
      "nested-list": T({ color: "#4c1d95" }, { color: "#e9d5ff" }),
      "task-list": T({ lineHeight: "1.7" }, { lineHeight: "1.7" }),
      "task-checked": T({ color: "#6b7280", textDecorationLine: "line-through" }, { color: "#6b7280", textDecorationLine: "line-through" }),
      "task-unchecked": T({ color: "#1e1b4b" }, { color: "#e0e7ff" }),
      "list-marker": T({ color: "#db2777", fontWeight: "700", textShadow: "0 0 6px rgba(219,39,119,0.4)" }, { color: "#f472b6", fontWeight: "700", textShadow: "0 0 8px rgba(244,114,182,0.7)" }),
      "table": T({ backgroundGradient: "linear-gradient(135deg, #fdf4ff, #eef2ff)", borderRadius: "12px", boxShadow: "0 4px 20px rgba(124,58,237,0.1)" }, { backgroundGradient: "linear-gradient(135deg, #0f0a1e, #1e1b4b)", borderRadius: "12px", boxShadow: "0 4px 20px rgba(124,58,237,0.3)" }),
      "table-header": T({ backgroundGradient: "linear-gradient(135deg, #db2777, #7c3aed)", color: "#ffffff", fontWeight: "700", paddingTop: "8px", paddingBottom: "8px", paddingLeft: "10px", paddingRight: "10px" }, { backgroundGradient: "linear-gradient(135deg, #f472b6, #a78bfa)", color: "#1e1b4b", fontWeight: "700", paddingTop: "8px", paddingBottom: "8px", paddingLeft: "10px", paddingRight: "10px" }),
      "table-cell": T({ paddingTop: "6px", paddingBottom: "6px", paddingLeft: "10px", paddingRight: "10px" }, { paddingTop: "6px", paddingBottom: "6px", paddingLeft: "10px", paddingRight: "10px" }),
      "table-row-alt": T({ backgroundColor: "rgba(219,39,119,0.05)" }, { backgroundColor: "rgba(244,114,182,0.08)" }),
      "table-row-hover": T({ backgroundColor: "rgba(219,39,119,0.1)" }, { backgroundColor: "rgba(244,114,182,0.15)" }),
      "inline-code": T({ backgroundGradient: "linear-gradient(135deg, #fce7f3, #ede9fe)", color: "#be185d", fontSize: "0.9em", borderRadius: "6px", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "6px", paddingRight: "6px" }, { backgroundGradient: "linear-gradient(135deg, #831843, #4c1d95)", color: "#f9a8d4", fontSize: "0.9em", borderRadius: "6px", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "6px", paddingRight: "6px" }),
      "link": T({ color: "#0891b2", textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#67e8f9" }, { color: "#22d3ee", textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#0891b2" }),
      "internal-link": T({ color: "#db2777", fontWeight: "600" }, { color: "#f472b6", fontWeight: "600" }),
      "external-link": T({ color: "#0891b2", textDecorationLine: "underline" }, { color: "#22d3ee", textDecorationLine: "underline" }),
      "tag": T({ backgroundGradient: "linear-gradient(135deg, #db2777, #7c3aed)", color: "#ffffff", borderRadius: "999px", fontSize: "0.85em", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "12px", paddingRight: "12px" }, { backgroundGradient: "linear-gradient(135deg, #f472b6, #a78bfa)", color: "#1e1b4b", borderRadius: "999px", fontSize: "0.85em", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "12px", paddingRight: "12px" }),
      "image": T({ borderRadius: "12px", boxShadow: "0 8px 32px rgba(124,58,237,0.25)" }, { borderRadius: "12px", boxShadow: "0 8px 32px rgba(124,58,237,0.5)" }),
      "embed": T({ backgroundGradient: "linear-gradient(135deg, #fdf4ff, #eef2ff)", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#db2777", borderRadius: "12px", paddingTop: "12px", paddingBottom: "12px", paddingLeft: "16px", paddingRight: "16px" }, { backgroundGradient: "linear-gradient(135deg, #0f0a1e, #1e1b4b)", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#f472b6", borderRadius: "12px", paddingTop: "12px", paddingBottom: "12px", paddingLeft: "16px", paddingRight: "16px" }),
      "properties": T({ backgroundGradient: "linear-gradient(135deg, #fdf4ff, #eef2ff)", borderRadius: "12px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }, { backgroundGradient: "linear-gradient(135deg, #0f0a1e, #1e1b4b)", borderRadius: "12px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }),
    } },

  { id: "ocean", name: "Ocean", builtin: true,
    description: "Deep blue gradient theme.",
    styles: {
      "paragraph": T({ color: "#0c4a6e", lineHeight: "1.7" }, { color: "#bae6fd", lineHeight: "1.7" }),
      "bold": T({ color: "#0369a1", fontWeight: "700" }, { color: "#7dd3fc", fontWeight: "700" }),
      "italic": T({ color: "#0e7490" }, { color: "#67e8f9" }),
      "bold-italic": T({ color: "#0369a1", fontWeight: "700" }, { color: "#7dd3fc", fontWeight: "700" }),
      "strikethrough": T({ color: "#64748b", textDecorationLine: "line-through" }, { color: "#64748b", textDecorationLine: "line-through" }),
      "highlight": T({ backgroundColor: "#a5f3fc", color: "#0c4a6e", borderRadius: "3px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "4px", paddingRight: "4px" }, { backgroundColor: "#06b6d4", color: "#082f49", borderRadius: "3px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "4px", paddingRight: "4px" }),
      "inline-math": T({ color: "#0284c7" }, { color: "#38bdf8" }),
      "footnote-ref": T({ color: "#0284c7", fontSize: "0.75em" }, { color: "#38bdf8", fontSize: "0.75em" }),
      "heading-1": T({ backgroundGradient: "linear-gradient(90deg, #0369a1, #06b6d4)", fontSize: "1.9em", fontWeight: "800", borderRadius: "8px", paddingLeft: "14px", paddingRight: "14px", paddingTop: "6px", paddingBottom: "6px", color: "#ffffff" }, { backgroundGradient: "linear-gradient(90deg, #0ea5e9, #22d3ee)", fontSize: "1.9em", fontWeight: "800", borderRadius: "8px", paddingLeft: "14px", paddingRight: "14px", paddingTop: "6px", paddingBottom: "6px", color: "#082f49" }),
      "heading-2": T({ color: "#0284c7", fontWeight: "700", fontSize: "1.5em", paddingBottom: "0.2em", borderBottomWidth: "2px", borderStyle: "solid", borderColor: "#bae6fd" }, { color: "#38bdf8", fontWeight: "700", fontSize: "1.5em", paddingBottom: "0.2em", borderBottomWidth: "2px", borderStyle: "solid", borderColor: "#0c4a6e" }),
      "heading-3": T({ color: "#0e7490", fontWeight: "600", fontSize: "1.25em" }, { color: "#67e8f9", fontWeight: "600", fontSize: "1.25em" }),
      "heading-4": T({ color: "#0369a1", fontWeight: "600", fontSize: "1.1em" }, { color: "#7dd3fc", fontWeight: "600", fontSize: "1.1em" }),
      "heading-5": T({ color: "#0c4a6e", fontWeight: "600", fontSize: "1em" }, { color: "#bae6fd", fontWeight: "600", fontSize: "1em" }),
      "heading-6": T({ color: "#64748b", fontWeight: "600", fontSize: "0.9em", textTransform: "uppercase", letterSpacing: "0.08em" }, { color: "#94a3b8", fontWeight: "600", fontSize: "0.9em", textTransform: "uppercase", letterSpacing: "0.08em" }),
      "blockquote": T({ backgroundGradient: "linear-gradient(90deg, #e0f2fe, transparent)", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#0ea5e9", paddingLeft: "1em", paddingTop: "0.3em", paddingBottom: "0.3em", borderRadius: "6px", fontStyle: "italic", color: "#0c4a6e" }, { backgroundGradient: "linear-gradient(90deg, #0c4a6e, transparent)", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#22d3ee", paddingLeft: "1em", paddingTop: "0.3em", paddingBottom: "0.3em", borderRadius: "6px", fontStyle: "italic", color: "#bae6fd" }),
      "callout": T(Object.assign(allSides("1px"), { borderStyle: "solid", backgroundColor: "#f0f9ff", borderRadius: "10px", borderColor: "#bae6fd", paddingTop: "12px", paddingBottom: "12px", paddingLeft: "16px", paddingRight: "16px" }), Object.assign(allSides("1px"), { borderStyle: "solid", backgroundColor: "#082f49", borderRadius: "10px", borderColor: "#0369a1", paddingTop: "12px", paddingBottom: "12px", paddingLeft: "16px", paddingRight: "16px" })),
      "callout-title": T({ color: "#0369a1", fontWeight: "700" }, { color: "#38bdf8", fontWeight: "700" }),
      "code-block": T(Object.assign(allSides("1px"), { borderStyle: "solid", backgroundGradient: "linear-gradient(180deg, #f0f9ff, #e0f2fe)", borderRadius: "10px", borderColor: "#bae6fd", color: "#0c4a6e", paddingTop: "0.8em", paddingBottom: "0.8em" }), Object.assign(allSides("1px"), { borderStyle: "solid", backgroundGradient: "linear-gradient(180deg, #082f49, #0c4a6e)", borderRadius: "10px", borderColor: "#0369a1", color: "#bae6fd", paddingTop: "0.8em", paddingBottom: "0.8em" })),
      "math-block": T({ backgroundGradient: "linear-gradient(180deg, #f0f9ff, #e0f2fe)", color: "#0369a1", borderRadius: "10px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }, { backgroundGradient: "linear-gradient(180deg, #082f49, #0c4a6e)", color: "#38bdf8", borderRadius: "10px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }),
      "horizontal-rule": T({ borderTopWidth: "2px", borderStyle: "solid", borderColor: "#bae6fd" }, { borderTopWidth: "2px", borderStyle: "solid", borderColor: "#0369a1" }),
      "bullet-list": T({ lineHeight: "1.7" }, { lineHeight: "1.7" }),
      "numbered-list": T({ lineHeight: "1.7" }, { lineHeight: "1.7" }),
      "nested-list": T({ color: "#0c4a6e" }, { color: "#bae6fd" }),
      "task-list": T({ lineHeight: "1.7" }, { lineHeight: "1.7" }),
      "task-checked": T({ color: "#64748b", textDecorationLine: "line-through" }, { color: "#64748b", textDecorationLine: "line-through" }),
      "task-unchecked": T({ color: "#0c4a6e" }, { color: "#bae6fd" }),
      "list-marker": T({ color: "#0369a1", fontWeight: "700" }, { color: "#38bdf8", fontWeight: "700" }),
      "table": T({ backgroundGradient: "linear-gradient(180deg, #f0f9ff, #e0f2fe)", borderRadius: "10px", boxShadow: "0 4px 20px rgba(3,105,161,0.1)" }, { backgroundGradient: "linear-gradient(180deg, #082f49, #0c4a6e)", borderRadius: "10px", boxShadow: "0 4px 20px rgba(3,105,161,0.3)" }),
      "table-header": T({ backgroundGradient: "linear-gradient(180deg, #0284c7, #0369a1)", color: "#ffffff", fontWeight: "700", paddingTop: "8px", paddingBottom: "8px", paddingLeft: "10px", paddingRight: "10px" }, { backgroundGradient: "linear-gradient(180deg, #0ea5e9, #0284c7)", color: "#082f49", fontWeight: "700", paddingTop: "8px", paddingBottom: "8px", paddingLeft: "10px", paddingRight: "10px" }),
      "table-cell": T({ paddingTop: "6px", paddingBottom: "6px", paddingLeft: "10px", paddingRight: "10px" }, { paddingTop: "6px", paddingBottom: "6px", paddingLeft: "10px", paddingRight: "10px" }),
      "table-row-alt": T({ backgroundColor: "rgba(3,105,161,0.05)" }, { backgroundColor: "rgba(14,165,233,0.1)" }),
      "table-row-hover": T({ backgroundColor: "rgba(3,105,161,0.1)" }, { backgroundColor: "rgba(14,165,233,0.18)" }),
      "inline-code": T({ backgroundColor: "#e0f2fe", color: "#0369a1", fontSize: "0.9em", borderRadius: "6px", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "6px", paddingRight: "6px" }, { backgroundColor: "#082f49", color: "#7dd3fc", fontSize: "0.9em", borderRadius: "6px", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "6px", paddingRight: "6px" }),
      "link": T({ color: "#0891b2", textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#67e8f9" }, { color: "#22d3ee", textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#0891b2" }),
      "internal-link": T({ color: "#0369a1", fontWeight: "600" }, { color: "#38bdf8", fontWeight: "600" }),
      "external-link": T({ color: "#0891b2", textDecorationLine: "underline" }, { color: "#22d3ee", textDecorationLine: "underline" }),
      "tag": T({ backgroundColor: "#0ea5e9", color: "#ffffff", borderRadius: "999px", fontSize: "0.85em", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "10px", paddingRight: "10px" }, { backgroundColor: "#22d3ee", color: "#082f49", borderRadius: "999px", fontSize: "0.85em", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "10px", paddingRight: "10px" }),
      "image": T({ borderRadius: "10px", boxShadow: "0 8px 32px rgba(3,105,161,0.2)" }, { borderRadius: "10px", boxShadow: "0 8px 32px rgba(3,105,161,0.5)" }),
      "embed": T({ backgroundGradient: "linear-gradient(180deg, #f0f9ff, #e0f2fe)", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#0369a1", borderRadius: "10px", paddingTop: "12px", paddingBottom: "12px", paddingLeft: "16px", paddingRight: "16px" }, { backgroundGradient: "linear-gradient(180deg, #082f49, #0c4a6e)", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#22d3ee", borderRadius: "10px", paddingTop: "12px", paddingBottom: "12px", paddingLeft: "16px", paddingRight: "16px" }),
      "properties": T({ backgroundGradient: "linear-gradient(180deg, #f0f9ff, #e0f2fe)", borderRadius: "10px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }, { backgroundGradient: "linear-gradient(180deg, #082f49, #0c4a6e)", borderRadius: "10px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }),
    } },

  { id: "dark", name: "Dark", builtin: true,
    description: "Deep charcoal surfaces for dark mode.",
    styles: {
      "paragraph": T(undefined, { color: "#c9d1d9", lineHeight: "1.7" }),
      "bold": T(undefined, { color: "#f0f6fc", fontWeight: "700" }),
      "italic": T(undefined, { color: "#a5d6ff" }),
      "bold-italic": T(undefined, { color: "#f0f6fc", fontWeight: "700" }),
      "strikethrough": T(undefined, { color: "#8b949e", textDecorationLine: "line-through" }),
      "highlight": T(undefined, { backgroundColor: "#5c4a10", color: "#fde68a", borderRadius: "3px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "4px", paddingRight: "4px" }),
      "inline-math": T(undefined, { color: "#79c0ff" }),
      "footnote-ref": T(undefined, { color: "#79c0ff", fontSize: "0.75em" }),
      "heading-1": T(undefined, { color: "#58a6ff", fontWeight: "700", fontSize: "1.9em", letterSpacing: "-0.02em", paddingBottom: "0.3em", borderBottomWidth: "2px", borderStyle: "solid", borderColor: "#30363d" }),
      "heading-2": T(undefined, { color: "#79c0ff", fontWeight: "600", fontSize: "1.5em", paddingBottom: "0.2em", borderBottomWidth: "1px", borderStyle: "solid", borderColor: "#30363d" }),
      "heading-3": T(undefined, { color: "#a5d6ff", fontWeight: "600", fontSize: "1.25em" }),
      "heading-4": T(undefined, { color: "#c9d1d9", fontWeight: "600", fontSize: "1.1em" }),
      "heading-5": T(undefined, { color: "#c9d1d9", fontWeight: "600", fontSize: "1em" }),
      "heading-6": T(undefined, { color: "#8b949e", fontWeight: "600", fontSize: "0.9em", textTransform: "uppercase", letterSpacing: "0.08em" }),
      "blockquote": T(undefined, { backgroundColor: "#161b22", borderLeftWidth: "3px", borderStyle: "solid", borderColor: "#30363d", paddingLeft: "1em", paddingTop: "0.3em", paddingBottom: "0.3em", borderRadius: "0 6px 6px 0", fontStyle: "italic", color: "#8b949e" }),
      "callout": T(undefined, { backgroundColor: "#161b22", borderRadius: "10px", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#30363d", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }),
      "callout-title": T(undefined, { color: "#58a6ff", fontWeight: "700" }),
      "code-block": T(undefined, Object.assign(allSides("1px"), { borderStyle: "solid", backgroundColor: "#0d1117", borderRadius: "8px", borderColor: "#30363d", color: "#c9d1d9", paddingTop: "0.8em", paddingBottom: "0.8em" })),
      "math-block": T(undefined, { backgroundColor: "#0d1117", color: "#79c0ff", borderRadius: "8px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }),
      "horizontal-rule": T(undefined, { borderTopWidth: "2px", borderStyle: "solid", borderColor: "#30363d" }),
      "bullet-list": T(undefined, { lineHeight: "1.7" }),
      "numbered-list": T(undefined, { lineHeight: "1.7" }),
      "nested-list": T(undefined, { color: "#8b949e" }),
      "task-list": T(undefined, { lineHeight: "1.7" }),
      "task-checked": T(undefined, { color: "#8b949e", textDecorationLine: "line-through" }),
      "task-unchecked": T(undefined, { color: "#c9d1d9" }),
      "list-marker": T(undefined, { color: "#58a6ff", fontWeight: "700" }),
      "table": T(undefined, { borderRadius: "8px", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "1px", borderStyle: "solid", borderColor: "#30363d" }),
      "table-header": T(undefined, { backgroundColor: "#161b22", color: "#58a6ff", fontWeight: "700", paddingTop: "8px", paddingBottom: "8px", paddingLeft: "10px", paddingRight: "10px" }),
      "table-cell": T(undefined, { paddingTop: "6px", paddingBottom: "6px", paddingLeft: "10px", paddingRight: "10px" }),
      "table-row-alt": T(undefined, { backgroundColor: "#161b22" }),
      "table-row-hover": T(undefined, { backgroundColor: "#21262d" }),
      "inline-code": T(undefined, { backgroundColor: "#161b22", color: "#e6edf3", fontSize: "0.9em", borderRadius: "6px", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "6px", paddingRight: "6px" }),
      "link": T(undefined, { color: "#58a6ff", textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#1f6feb" }),
      "internal-link": T(undefined, { color: "#58a6ff", fontWeight: "600" }),
      "external-link": T(undefined, { color: "#a5d6ff", textDecorationLine: "underline" }),
      "tag": T(undefined, { backgroundColor: "rgba(56,139,253,0.18)", color: "#79c0ff", borderRadius: "999px", fontSize: "0.85em", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "10px", paddingRight: "10px" }),
      "image": T(undefined, { borderRadius: "10px", boxShadow: "0 8px 32px rgba(0,0,0,0.6)" }),
      "embed": T(undefined, { backgroundColor: "#0d1117", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#58a6ff", borderRadius: "8px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }),
      "properties": T(undefined, { backgroundColor: "#0d1117", borderRadius: "8px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }),
    } },

  { id: "light", name: "Light", builtin: true,
    description: "Clean light surfaces for light mode.",
    styles: {
      "paragraph": T({ color: "#1f2328", lineHeight: "1.7" }, undefined),
      "bold": T({ color: "#0a0c10", fontWeight: "700" }, undefined),
      "italic": T({ color: "#57606a" }, undefined),
      "bold-italic": T({ color: "#0a0c10", fontWeight: "700" }, undefined),
      "strikethrough": T({ color: "#6e7781", textDecorationLine: "line-through" }, undefined),
      "highlight": T({ backgroundColor: "#fff3c4", color: "#4a3b00", borderRadius: "3px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "4px", paddingRight: "4px" }, undefined),
      "inline-math": T({ color: "#0550ae" }, undefined),
      "footnote-ref": T({ color: "#0550ae", fontSize: "0.75em" }, undefined),
      "heading-1": T({ color: "#0550ae", fontWeight: "700", fontSize: "1.9em", letterSpacing: "-0.02em", paddingBottom: "0.3em", borderBottomWidth: "2px", borderStyle: "solid", borderColor: "#d0d7de" }, undefined),
      "heading-2": T({ color: "#0969da", fontWeight: "600", fontSize: "1.5em", paddingBottom: "0.2em", borderBottomWidth: "1px", borderStyle: "solid", borderColor: "#d0d7de" }, undefined),
      "heading-3": T({ color: "#218bff", fontWeight: "600", fontSize: "1.25em" }, undefined),
      "heading-4": T({ color: "#1f2328", fontWeight: "600", fontSize: "1.1em" }, undefined),
      "heading-5": T({ color: "#1f2328", fontWeight: "600", fontSize: "1em" }, undefined),
      "heading-6": T({ color: "#6e7781", fontWeight: "600", fontSize: "0.9em", textTransform: "uppercase", letterSpacing: "0.08em" }, undefined),
      "blockquote": T({ backgroundColor: "#f6f8fa", borderLeftWidth: "3px", borderStyle: "solid", borderColor: "#d0d7de", paddingLeft: "1em", paddingTop: "0.3em", paddingBottom: "0.3em", borderRadius: "0 6px 6px 0", fontStyle: "italic", color: "#57606a" }, undefined),
      "callout": T({ backgroundColor: "#f6f8fa", borderRadius: "10px", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#d0d7de", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }, undefined),
      "callout-title": T({ color: "#0550ae", fontWeight: "700" }, undefined),
      "code-block": T(Object.assign(allSides("1px"), { borderStyle: "solid", backgroundColor: "#f6f8fa", borderRadius: "8px", borderColor: "#d0d7de", color: "#1f2328", paddingTop: "0.8em", paddingBottom: "0.8em" }), undefined),
      "math-block": T({ backgroundColor: "#f6f8fa", color: "#0550ae", borderRadius: "8px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }, undefined),
      "horizontal-rule": T({ borderTopWidth: "2px", borderStyle: "solid", borderColor: "#d0d7de" }, undefined),
      "bullet-list": T({ lineHeight: "1.7" }, undefined),
      "numbered-list": T({ lineHeight: "1.7" }, undefined),
      "nested-list": T({ color: "#57606a" }, undefined),
      "task-list": T({ lineHeight: "1.7" }, undefined),
      "task-checked": T({ color: "#6e7781", textDecorationLine: "line-through" }, undefined),
      "task-unchecked": T({ color: "#1f2328" }, undefined),
      "list-marker": T({ color: "#0550ae", fontWeight: "700" }, undefined),
      "table": T({ borderRadius: "8px", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "1px", borderStyle: "solid", borderColor: "#d0d7de" }, undefined),
      "table-header": T({ backgroundColor: "#f6f8fa", color: "#0550ae", fontWeight: "700", paddingTop: "8px", paddingBottom: "8px", paddingLeft: "10px", paddingRight: "10px" }, undefined),
      "table-cell": T({ paddingTop: "6px", paddingBottom: "6px", paddingLeft: "10px", paddingRight: "10px" }, undefined),
      "table-row-alt": T({ backgroundColor: "#f6f8fa" }, undefined),
      "table-row-hover": T({ backgroundColor: "#eaeef2" }, undefined),
      "inline-code": T({ backgroundColor: "#eff1f3", color: "#1f2328", fontSize: "0.9em", borderRadius: "6px", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "6px", paddingRight: "6px" }, undefined),
      "link": T({ color: "#0969da", textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#54aeff" }, undefined),
      "internal-link": T({ color: "#0969da", fontWeight: "600" }, undefined),
      "external-link": T({ color: "#218bff", textDecorationLine: "underline" }, undefined),
      "tag": T({ backgroundColor: "rgba(9,105,218,0.12)", color: "#0969da", borderRadius: "999px", fontSize: "0.85em", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "10px", paddingRight: "10px" }, undefined),
      "image": T({ borderRadius: "10px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }, undefined),
      "embed": T({ backgroundColor: "#f6f8fa", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#0969da", borderRadius: "8px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }, undefined),
      "properties": T({ backgroundColor: "#f6f8fa", borderRadius: "8px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }, undefined),
    } },

  { id: "academic", name: "Academic", builtin: true,
    description: "Paper-like. Serif body, ruled headings, italic quotes.",
    styles: {
      "paragraph": T({ lineHeight: "1.7", color: "#1a1a1a" }, { lineHeight: "1.7", color: "#e5e5e5" }),
      "bold": T({ color: "#000000", fontWeight: "700" }, { color: "#ffffff", fontWeight: "700" }),
      "italic": T({ color: "#333333" }, { color: "#cccccc" }),
      "bold-italic": T({ color: "#000000", fontWeight: "700" }, { color: "#ffffff", fontWeight: "700" }),
      "strikethrough": T({ color: "#737373", textDecorationLine: "line-through" }, { color: "#737373", textDecorationLine: "line-through" }),
      "highlight": T({ backgroundColor: "#fef3c7", color: "#4a3b00", borderRadius: "2px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "4px", paddingRight: "4px" }, { backgroundColor: "#78350f", color: "#fef3c7", borderRadius: "2px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "4px", paddingRight: "4px" }),
      "inline-math": T({ color: "#1a1a1a", fontStyle: "italic" }, { color: "#e5e5e5", fontStyle: "italic" }),
      "footnote-ref": T({ fontSize: "0.75em", color: "#52525b" }, { fontSize: "0.75em", color: "#a1a1aa" }),
      "heading-1": T({ fontSize: "1.7em", fontWeight: "600", borderBottomWidth: "2px", borderStyle: "solid", borderColor: "#1a1a1a", paddingBottom: "0.3em", color: "#1a1a1a" }, { fontSize: "1.7em", fontWeight: "600", borderBottomWidth: "2px", borderStyle: "solid", borderColor: "#e5e5e5", paddingBottom: "0.3em", color: "#e5e5e5" }),
      "heading-2": T({ fontSize: "1.4em", fontWeight: "600", borderBottomWidth: "1px", borderStyle: "solid", borderColor: "#d4d4d8", paddingBottom: "0.2em", color: "#1a1a1a" }, { fontSize: "1.4em", fontWeight: "600", borderBottomWidth: "1px", borderStyle: "solid", borderColor: "#3f3f46", paddingBottom: "0.2em", color: "#e5e5e5" }),
      "heading-3": T({ fontSize: "1.15em", fontWeight: "600", fontStyle: "italic", color: "#1a1a1a" }, { fontSize: "1.15em", fontWeight: "600", fontStyle: "italic", color: "#e5e5e5" }),
      "heading-4": T({ fontSize: "1.05em", fontWeight: "600", color: "#333333" }, { fontSize: "1.05em", fontWeight: "600", color: "#cccccc" }),
      "heading-5": T({ fontSize: "1em", fontWeight: "600", color: "#52525b" }, { fontSize: "1em", fontWeight: "600", color: "#a1a1aa" }),
      "heading-6": T({ fontSize: "0.9em", fontWeight: "600", color: "#737373", textTransform: "uppercase", letterSpacing: "0.08em" }, { fontSize: "0.9em", fontWeight: "600", color: "#737373", textTransform: "uppercase", letterSpacing: "0.08em" }),
      "blockquote": T({ borderLeftWidth: "3px", borderStyle: "solid", borderColor: "#a1a1aa", fontStyle: "italic", color: "#52525b", paddingLeft: "1.2em", paddingTop: "0.3em", paddingBottom: "0.3em" }, { borderLeftWidth: "3px", borderStyle: "solid", borderColor: "#71717a", fontStyle: "italic", color: "#a1a1aa", paddingLeft: "1.2em", paddingTop: "0.3em", paddingBottom: "0.3em" }),
      "callout": T({ backgroundColor: "#fafafa", borderRadius: "4px", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "3px", borderStyle: "solid", borderColor: "#d4d4d8", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }, { backgroundColor: "#18181b", borderRadius: "4px", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "3px", borderStyle: "solid", borderColor: "#3f3f46", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }),
      "callout-title": T({ color: "#1a1a1a", fontWeight: "700" }, { color: "#e5e5e5", fontWeight: "700" }),
      "code-block": T(Object.assign(allSides("1px"), { borderStyle: "solid", backgroundColor: "#fafafa", borderRadius: "4px", borderColor: "#e4e4e7", color: "#1a1a1a", paddingTop: "0.8em", paddingBottom: "0.8em" }), Object.assign(allSides("1px"), { borderStyle: "solid", backgroundColor: "#18181b", borderRadius: "4px", borderColor: "#27272a", color: "#e5e5e5", paddingTop: "0.8em", paddingBottom: "0.8em" })),
      "math-block": T({ backgroundColor: "#fafafa", color: "#1a1a1a", borderRadius: "4px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px", fontStyle: "italic" }, { backgroundColor: "#18181b", color: "#e5e5e5", borderRadius: "4px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px", fontStyle: "italic" }),
      "horizontal-rule": T({ borderTopWidth: "2px", borderStyle: "solid", borderColor: "#1a1a1a" }, { borderTopWidth: "2px", borderStyle: "solid", borderColor: "#e5e5e5" }),
      "bullet-list": T({ lineHeight: "1.7" }, { lineHeight: "1.7" }),
      "numbered-list": T({ lineHeight: "1.7" }, { lineHeight: "1.7" }),
      "nested-list": T({ color: "#52525b" }, { color: "#a1a1aa" }),
      "task-list": T({ lineHeight: "1.7" }, { lineHeight: "1.7" }),
      "task-checked": T({ color: "#737373", textDecorationLine: "line-through" }, { color: "#737373", textDecorationLine: "line-through" }),
      "task-unchecked": T({ color: "#1a1a1a" }, { color: "#e5e5e5" }),
      "list-marker": T({ fontWeight: "700", color: "#1a1a1a" }, { fontWeight: "700", color: "#e5e5e5" }),
      "table": T({ borderRadius: "4px", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "1px", borderStyle: "solid", borderColor: "#d4d4d8" }, { borderRadius: "4px", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "1px", borderStyle: "solid", borderColor: "#3f3f46" }),
      "table-header": T({ fontWeight: "700", borderBottomWidth: "2px", borderStyle: "solid", borderColor: "#1a1a1a", color: "#1a1a1a", paddingTop: "8px", paddingBottom: "8px", paddingLeft: "10px", paddingRight: "10px" }, { fontWeight: "700", borderBottomWidth: "2px", borderStyle: "solid", borderColor: "#e5e5e5", color: "#e5e5e5", paddingTop: "8px", paddingBottom: "8px", paddingLeft: "10px", paddingRight: "10px" }),
      "table-cell": T({ paddingTop: "6px", paddingBottom: "6px", paddingLeft: "10px", paddingRight: "10px" }, { paddingTop: "6px", paddingBottom: "6px", paddingLeft: "10px", paddingRight: "10px" }),
      "table-row-alt": T({ backgroundColor: "#fafafa" }, { backgroundColor: "#18181b" }),
      "table-row-hover": T({ backgroundColor: "#f4f4f5" }, { backgroundColor: "#27272a" }),
      "inline-code": T({ backgroundColor: "#f4f4f5", color: "#1a1a1a", fontSize: "0.9em", borderRadius: "3px", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "5px", paddingRight: "5px" }, { backgroundColor: "#27272a", color: "#e5e5e5", fontSize: "0.9em", borderRadius: "3px", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "5px", paddingRight: "5px" }),
      "link": T({ color: "#1a1a1a", textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#52525b" }, { color: "#e5e5e5", textDecorationLine: "underline", textDecorationStyle: "solid", textDecorationColor: "#a1a1aa" }),
      "internal-link": T({ color: "#1a1a1a", fontWeight: "600" }, { color: "#e5e5e5", fontWeight: "600" }),
      "external-link": T({ color: "#52525b", textDecorationLine: "underline" }, { color: "#a1a1aa", textDecorationLine: "underline" }),
      "tag": T({ backgroundColor: "#f4f4f5", color: "#52525b", borderRadius: "3px", fontSize: "0.85em", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "8px", paddingRight: "8px" }, { backgroundColor: "#27272a", color: "#a1a1aa", borderRadius: "3px", fontSize: "0.85em", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "8px", paddingRight: "8px" }),
      "image": T({ borderRadius: "4px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }, { borderRadius: "4px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.5)" }),
      "embed": T({ backgroundColor: "#fafafa", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "3px", borderStyle: "solid", borderColor: "#1a1a1a", borderRadius: "4px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }, { backgroundColor: "#18181b", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "3px", borderStyle: "solid", borderColor: "#e5e5e5", borderRadius: "4px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }),
      "properties": T({ backgroundColor: "#fafafa", borderRadius: "4px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }, { backgroundColor: "#18181b", borderRadius: "4px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }),
    } },

  { id: "developer", name: "Developer", builtin: true,
    description: "Terminal-inspired. Monospace vibes, GitHub colors, badge tags.",
    styles: {
      "paragraph": T({ color: "#24292f", lineHeight: "1.6" }, { color: "#c9d1d9", lineHeight: "1.6" }),
      "bold": T({ color: "#cf222e", fontWeight: "700" }, { color: "#ff7b72", fontWeight: "700" }),
      "italic": T({ color: "#bc4c00" }, { color: "#ffa657" }),
      "bold-italic": T({ color: "#cf222e", fontWeight: "700" }, { color: "#ff7b72", fontWeight: "700" }),
      "strikethrough": T({ color: "#6e7781", textDecorationLine: "line-through" }, { color: "#8b949e", textDecorationLine: "line-through" }),
      "highlight": T({ backgroundColor: "#fff8c5", color: "#4d2d00", borderRadius: "3px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "4px", paddingRight: "4px" }, { backgroundColor: "#9e6a03", color: "#fff8c5", borderRadius: "3px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "4px", paddingRight: "4px" }),
      "inline-math": T({ color: "#0969da" }, { color: "#58a6ff" }),
      "footnote-ref": T({ color: "#0969da", fontSize: "0.75em" }, { color: "#58a6ff", fontSize: "0.75em" }),
      "heading-1": T({ color: "#0969da", fontWeight: "700", letterSpacing: "-0.01em", fontSize: "1.9em", paddingBottom: "0.3em", borderBottomWidth: "2px", borderStyle: "solid", borderColor: "#d0d7de" }, { color: "#58a6ff", fontWeight: "700", letterSpacing: "-0.01em", fontSize: "1.9em", paddingBottom: "0.3em", borderBottomWidth: "2px", borderStyle: "solid", borderColor: "#30363d" }),
      "heading-2": T({ color: "#1f6feb", fontWeight: "600", fontSize: "1.5em", paddingBottom: "0.2em", borderBottomWidth: "1px", borderStyle: "solid", borderColor: "#d0d7de" }, { color: "#79c0ff", fontWeight: "600", fontSize: "1.5em", paddingBottom: "0.2em", borderBottomWidth: "1px", borderStyle: "solid", borderColor: "#30363d" }),
      "heading-3": T({ color: "#218bff", fontWeight: "600", fontSize: "1.25em" }, { color: "#a5d6ff", fontWeight: "600", fontSize: "1.25em" }),
      "heading-4": T({ color: "#24292f", fontWeight: "600", fontSize: "1.1em" }, { color: "#c9d1d9", fontWeight: "600", fontSize: "1.1em" }),
      "heading-5": T({ color: "#24292f", fontWeight: "600", fontSize: "1em" }, { color: "#c9d1d9", fontWeight: "600", fontSize: "1em" }),
      "heading-6": T({ color: "#6e7781", fontWeight: "600", fontSize: "0.9em", textTransform: "uppercase", letterSpacing: "0.08em" }, { color: "#8b949e", fontWeight: "600", fontSize: "0.9em", textTransform: "uppercase", letterSpacing: "0.08em" }),
      "blockquote": T({ borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#d0d7de", color: "#57606a", paddingLeft: "1em", paddingTop: "0.3em", paddingBottom: "0.3em", fontStyle: "italic" }, { borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#30363d", color: "#8b949e", paddingLeft: "1em", paddingTop: "0.3em", paddingBottom: "0.3em", fontStyle: "italic" }),
      "callout": T(Object.assign(allSides("1px"), { borderStyle: "solid", backgroundColor: "#f6f8fa", borderRadius: "8px", borderColor: "#d0d7de", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }), Object.assign(allSides("1px"), { borderStyle: "solid", backgroundColor: "#161b22", borderRadius: "8px", borderColor: "#30363d", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" })),
      "callout-title": T({ color: "#0969da", fontWeight: "700" }, { color: "#58a6ff", fontWeight: "700" }),
      "code-block": T(Object.assign(allSides("1px"), { borderStyle: "solid", backgroundColor: "#f6f8fa", color: "#24292f", borderRadius: "8px", borderColor: "#d0d7de", paddingTop: "0.8em", paddingBottom: "0.8em" }), Object.assign(allSides("1px"), { borderStyle: "solid", backgroundColor: "#161b22", color: "#c9d1d9", borderRadius: "8px", borderColor: "#30363d", paddingTop: "0.8em", paddingBottom: "0.8em" })),
      "math-block": T({ backgroundColor: "#f6f8fa", color: "#0969da", borderRadius: "8px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }, { backgroundColor: "#161b22", color: "#58a6ff", borderRadius: "8px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "14px", paddingRight: "14px" }),
      "horizontal-rule": T({ borderTopWidth: "2px", borderStyle: "solid", borderColor: "#d0d7de" }, { borderTopWidth: "2px", borderStyle: "solid", borderColor: "#30363d" }),
      "bullet-list": T({ lineHeight: "1.6" }, { lineHeight: "1.6" }),
      "numbered-list": T({ lineHeight: "1.6" }, { lineHeight: "1.6" }),
      "nested-list": T({ color: "#57606a" }, { color: "#8b949e" }),
      "task-list": T({ lineHeight: "1.6" }, { lineHeight: "1.6" }),
      "task-checked": T({ color: "#6e7781", textDecorationLine: "line-through" }, { color: "#8b949e", textDecorationLine: "line-through" }),
      "task-unchecked": T({ color: "#24292f" }, { color: "#c9d1d9" }),
      "list-marker": T({ color: "#0969da", fontWeight: "700" }, { color: "#58a6ff", fontWeight: "700" }),
      "table": T({ borderRadius: "6px", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "1px", borderStyle: "solid", borderColor: "#d0d7de" }, { borderRadius: "6px", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "1px", borderStyle: "solid", borderColor: "#30363d" }),
      "table-header": T({ backgroundColor: "#f6f8fa", fontWeight: "700", borderBottomWidth: "1px", borderStyle: "solid", borderColor: "#d0d7de", color: "#24292f", paddingTop: "8px", paddingBottom: "8px", paddingLeft: "10px", paddingRight: "10px" }, { backgroundColor: "#21262d", fontWeight: "700", borderBottomWidth: "1px", borderStyle: "solid", borderColor: "#30363d", color: "#c9d1d9", paddingTop: "8px", paddingBottom: "8px", paddingLeft: "10px", paddingRight: "10px" }),
      "table-cell": T({ paddingTop: "6px", paddingBottom: "6px", paddingLeft: "10px", paddingRight: "10px" }, { paddingTop: "6px", paddingBottom: "6px", paddingLeft: "10px", paddingRight: "10px" }),
      "table-row-alt": T({ backgroundColor: "#f6f8fa" }, { backgroundColor: "#161b22" }),
      "table-row-hover": T({ backgroundColor: "#eaeef2" }, { backgroundColor: "#21262d" }),
      "inline-code": T({ backgroundColor: "#eff1f3", color: "#cf222e", fontSize: "0.9em", borderRadius: "6px", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "6px", paddingRight: "6px" }, { backgroundColor: "#161b22", color: "#ff7b72", fontSize: "0.9em", borderRadius: "6px", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "6px", paddingRight: "6px" }),
      "link": T({ color: "#0969da", textDecorationLine: "underline", textDecorationStyle: "dotted", textDecorationColor: "#54aeff" }, { color: "#58a6ff", textDecorationLine: "underline", textDecorationStyle: "dotted", textDecorationColor: "#1f6feb" }),
      "internal-link": T({ color: "#0969da", fontWeight: "600" }, { color: "#58a6ff", fontWeight: "600" }),
      "external-link": T({ color: "#218bff", textDecorationLine: "underline" }, { color: "#79c0ff", textDecorationLine: "underline" }),
      "tag": T({ backgroundColor: "#ddf4ff", color: "#0969da", borderRadius: "999px", fontSize: "0.85em", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "10px", paddingRight: "10px" }, { backgroundColor: "#1f6feb", color: "#ffffff", borderRadius: "999px", fontSize: "0.85em", paddingTop: "2px", paddingBottom: "2px", paddingLeft: "10px", paddingRight: "10px" }),
      "image": T({ borderRadius: "8px", boxShadow: "0 4px 16px rgba(9, 105, 218, 0.12)" }, { borderRadius: "8px", boxShadow: "0 4px 16px rgba(0, 0, 0, 0.5)" }),
      "embed": T({ backgroundColor: "#f6f8fa", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#0969da", borderRadius: "6px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }, { backgroundColor: "#161b22", borderTopWidth: "1px", borderRightWidth: "1px", borderBottomWidth: "1px", borderLeftWidth: "4px", borderStyle: "solid", borderColor: "#58a6ff", borderRadius: "6px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }),
      "properties": T({ backgroundColor: "#f6f8fa", borderRadius: "6px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }, { backgroundColor: "#161b22", borderRadius: "6px", paddingTop: "10px", paddingBottom: "10px", paddingLeft: "12px", paddingRight: "12px" }),
    } },
];

function allPresets(settings) { return BUILTIN_PRESETS.concat(settings.customPresets || []); }
/* ================================================================== */
/* [color-presets]                                                     */
/* ================================================================== */
const COLOR_SWATCHES = [
  "#1a1a1a", "#374151", "#6b7280", "#9ca3af", "#e5e7eb", "#ffffff",
  "#dc2626", "#ea580c", "#d97706", "#65a30d", "#16a34a", "#0d9488",
  "#0891b2", "#0284c7", "#2563eb", "#4f46e5", "#7c3aed", "#9333ea",
  "#c026d3", "#db2777", "#e11d48", "#be123c", "#b91c1c", "#92400e",
];
const BACKGROUND_SWATCHES = [
  "#ffffff", "#fafafa", "#f4f4f5", "#e4e4e7", "#d4d4d8", "#a1a1aa",
  "#18181b", "#27272a", "#3f3f46", "#52525b", "#71717a", "transparent",
  "#fef2f2", "#fff7ed", "#fffbeb", "#f7fee7", "#ecfdf5", "#f0fdfa",
  "#ecfeff", "#eff6ff", "#eef2ff", "#f5f3ff", "#faf5ff", "#fdf4ff",
  "#450a0a", "#431407", "#422006", "#1a2e05", "#052e16", "#042f2e",
  "#083344", "#172554", "#1e1b4b", "#2e1065", "#3b0764", "#4a044e",
];
const BORDER_SWATCHES = [
  "#000000", "#374151", "#6b7280", "#9ca3af", "#d1d5db", "#e5e7eb", "transparent",
  "#ef4444", "#f97316", "#f59e0b", "#84cc16", "#22c55e", "#14b8a6",
  "#06b6d4", "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef",
  "#ec4899", "#f43f5e",
];
const GRADIENT_PRESETS = [
  { label: "Sunset",    value: "linear-gradient(135deg, #ff9a9e, #fecfef)" },
  { label: "Ocean",     value: "linear-gradient(135deg, #0369a1, #06b6d4)" },
  { label: "Forest",    value: "linear-gradient(135deg, #16a34a, #84cc16)" },
  { label: "Lavender",  value: "linear-gradient(135deg, #a78bfa, #f0abfc)" },
  { label: "Fire",      value: "linear-gradient(135deg, #f97316, #dc2626)" },
  { label: "Cyberpunk", value: "linear-gradient(135deg, #db2777, #7c3aed)" },
  { label: "Mint",      value: "linear-gradient(135deg, #10b981, #34d399)" },
  { label: "Peach",     value: "linear-gradient(135deg, #fbbf24, #fb7185)" },
  { label: "Midnight",  value: "linear-gradient(135deg, #0f172a, #1e293b)" },
  { label: "Rose",      value: "linear-gradient(135deg, #fda4af, #fecdd3)" },
  { label: "Sky",       value: "linear-gradient(135deg, #38bdf8, #818cf8)" },
  { label: "Gold",      value: "linear-gradient(135deg, #fbbf24, #f59e0b)" },
  { label: "Aurora",    value: "linear-gradient(135deg, #22d3ee, #a78bfa, #f472b6)" },
  { label: "DeepSea",   value: "linear-gradient(180deg, #082f49, #0c4a6e)" },
  { label: "Candy",     value: "linear-gradient(135deg, #fbcfe8, #ddd6fe, #bfdbfe)" },
  { label: "Neon",      value: "linear-gradient(135deg, #f472b6, #22d3ee)" },
];

/* ================================================================== */
/* [preview]                                                           */
/* ================================================================== */
class PreviewRenderer {
  static async renderReading(app, container, categoryId, scopeClass, component) {
    container.className = "uts-preview-content markdown-rendered";
    if (scopeClass) container.classList.add(scopeClass);
    const cat = CATEGORIES.find(function (c) { return c.id === categoryId; });
    const markdown = (cat && cat.preview) || "";
    try {
      await MarkdownRenderer.render(app, markdown, container, "", component);
    } catch (e) {
      console.error("[UTSM] preview render failed", e);
      container.textContent = t("en", "previewFailed");
    }
  }
  static renderEditorSim(container, categoryId, scopeClass, lang) {
    container.empty();
    const root = container.createDiv({ cls: "uts-editor-sim markdown-source-view mod-cm6" });
    if (scopeClass) root.classList.add(scopeClass);
    const content = root.createDiv({ cls: "uts-editor-sim-content" });
    try { PreviewRenderer.buildSim(content, categoryId, lang); }
    catch (e) {
      console.error("[UTSM] editor preview failed", e);
      content.textContent = t(lang || "en", "previewFailed");
    }
  }
  static buildSim(root, categoryId, lang) {
    const line = function (cls, html, text) {
      const l = root.createDiv({ cls: ("cm-line " + (cls || "")).trim() });
      if (html) l.innerHTML = html;
      else if (text != null) l.textContent = text;
      return l;
    };
    const note = function (msg) { root.createDiv({ cls: "uts-sim-note", text: msg }); };
    const L = lang || "en";
    switch (categoryId) {
      case "text":
        line("", null, "The quick brown fox jumps over the lazy dog.");
        line("", '<span class="cm-strong">bold</span> <span class="cm-em">italic</span> <span class="cm-strong cm-em">bold italic</span> <span class="cm-highlight">highlight</span> <span class="cm-strikethrough">strikethrough</span> <span class="cm-inline-code">inline code</span> <span class="cm-comment">%%comment%%</span>');
        line("", '<span class="cm-link">external link</span> <span class="cm-hmd-internal-link">wiki link</span> <span class="cm-hashtag">#tag</span> <span class="cm-footref">[^1]</span>');
        break;
      case "headings":
        for (let n = 1; n <= 6; n++) line("HyperMD-header-" + n, null, "Heading " + n);
        break;
      case "blocks":
        line("HyperMD-quote", null, "A blockquote line.");
        line("", '<div class="callout" data-callout="note"><div class="callout-title"><div class="callout-icon"></div><div class="callout-title-inner">Callout title</div></div><div class="callout-content"><p>Callout body.</p></div></div>');
        line("HyperMD-codeblock HyperMD-codeblock-begin", null, 'const hello = "world";');
        line("HyperMD-codeblock", null, "console.log(hello);");
        line("HyperMD-codeblock HyperMD-codeblock-end", null, "// done");
        line("HyperMD-hr", "<hr>");
        line("", '<span class="math-block">(simulated math block)</span>');
        break;
      case "lists":
        line("HyperMD-list-line", '<span class="list-bullet">*</span> Bullet item');
        line("HyperMD-list-line", '<span class="list-bullet">*</span> Another item');
        line("HyperMD-list-line HyperMD-list-line-2", '<span class="list-bullet" style="margin-left:1.5ch">*</span> Nested item');
        line("HyperMD-list-line HyperMD-list-line-1", '<span class="cm-formatting-list-ol">1.</span> Numbered item');
        line("HyperMD-list-line HyperMD-task-line", '<input type="checkbox"> Unchecked task');
        line("HyperMD-list-line HyperMD-task-line", '<input type="checkbox" checked> Checked task');
        break;
      case "tables":
        root.createDiv().innerHTML = "<table><thead><tr><th>Column A</th><th>Column B</th><th>Column C</th></tr></thead><tbody><tr><td>alpha</td><td>beta</td><td>gamma</td></tr><tr><td>one</td><td>two</td><td>three</td></tr><tr><td>x</td><td>y</td><td>z</td></tr></tbody></table>";
        break;
      case "links":
        line("", '<span class="cm-hmd-internal-link">[[Internal wiki link]]</span> and <span class="cm-hmd-internal-link">[[Aliased link]]</span>');
        line("", '<span class="cm-link">external link</span> and <span class="cm-hashtag">#project/alpha</span>');
        break;
      case "other":
        line("", '<span class="cm-hashtag">#tag</span> <span class="cm-hashtag">#status/active</span> <span class="cm-hashtag">#project/alpha</span>');
        note(t(L, "simPropertiesNote"));
        break;
      case "embeds":
        note(t(L, "simEmbedsNote"));
        break;
      default:
        note(t(L, "simNothing"));
        break;
    }
  }
}
/* ================================================================== */
/* [settings]                                                          */
/* ================================================================== */
function createDefaultSettings() {
  return {
    version: 1,
    scopes: [{ id: VAULT_SCOPE_ID, name: "Entire vault", type: "vault", styles: {} }],
    customPresets: [], customClasses: [],
    showPreviewPanel: true, confirmPresetApply: true,
    activeScopeId: VAULT_SCOPE_ID, lastCategoryId: "text",
    language: "en",
  };
}
function migrateSettings(raw) {
  const defaults = createDefaultSettings();
  if (!raw || typeof raw !== "object") return defaults;
  const data = raw;
  const scopes = [];
  if (Array.isArray(data.scopes)) {
    for (const s of data.scopes) {
      if (!s || typeof s !== "object") continue;
      const type = s.type === "cssclass" ? "cssclass" : "vault";
      const className = typeof s.className === "string" ? s.className.trim() : undefined;
      if (type === "cssclass" && (!className || !isValidClassName(className))) continue;
      scopes.push({
        id: typeof s.id === "string" && s.id ? s.id : uid(),
        name: typeof s.name === "string" && s.name ? s.name : (type === "vault" ? "Entire vault" : className),
        type: type,
        className: type === "cssclass" ? className : undefined,
        styles: s.styles && typeof s.styles === "object" ? s.styles : {},
      });
    }
  }
  if (!scopes.some(function (s) { return s.type === "vault"; })) {
    scopes.unshift({ id: VAULT_SCOPE_ID, name: "Entire vault", type: "vault",
      styles: data.elementStyles && typeof data.elementStyles === "object" ? data.elementStyles : {} });
  }
  const customPresets = [];
  if (Array.isArray(data.customPresets)) {
    for (const p of data.customPresets) {
      if (!p || typeof p !== "object" || typeof p.name !== "string" || !p.name) continue;
      customPresets.push({ id: typeof p.id === "string" && p.id ? p.id : uid(), name: p.name,
        description: typeof p.description === "string" ? p.description : undefined,
        styles: p.styles && typeof p.styles === "object" ? p.styles : {} });
    }
  }
  const customClasses = [];
  if (Array.isArray(data.customClasses)) {
    for (const c of data.customClasses) {
      if (!c || typeof c !== "object" || typeof c.name !== "string" || !isValidClassName(c.name)) continue;
      customClasses.push({ id: typeof c.id === "string" && c.id ? c.id : uid(), name: c.name.trim(),
        styles: c.styles && typeof c.styles === "object" ? c.styles : {} });
    }
  }
  const lastCategoryId = CATEGORIES.some(function (c) { return c.id === data.lastCategoryId; }) ? data.lastCategoryId : "text";
  const activeScopeId = scopes.some(function (s) { return s.id === data.activeScopeId; }) ? data.activeScopeId : scopes[0].id;
  const language = (data.language === "fa" || data.language === "en") ? data.language : "en";
  return { version: 1, scopes: scopes, customPresets: customPresets, customClasses: customClasses,
    showPreviewPanel: data.showPreviewPanel !== false, confirmPresetApply: data.confirmPresetApply !== false,
    activeScopeId: activeScopeId, lastCategoryId: lastCategoryId, language: language };
}

/* ================================================================== */
/* [small modals]                                                      */
/* ================================================================== */
class ConfirmModal extends Modal {
  constructor(app, opts) { super(app); this.opts = opts; }
  onOpen() {
    const lang = this.opts.lang || "en";
    if (dictFor(lang)._dir === "rtl") this.modalEl.setAttribute("dir", "rtl");
    this.titleEl.setText(this.opts.title);
    this.contentEl.createEl("p", { cls: "uts-confirm-message", text: this.opts.message });
    const row = this.contentEl.createDiv({ cls: "uts-confirm-buttons" });
    row.createEl("button", { text: this.opts.cancelText || t(lang, "confirmCancel") }).onclick = () => this.close();
    const btn = row.createEl("button", { text: this.opts.confirmText || t(lang, "confirmOk"), cls: this.opts.danger ? "mod-warning" : "mod-cta" });
    btn.onclick = async () => { this.close(); try { await this.opts.onConfirm(); } catch (e) { console.error(e); } };
  }
}
class InputModal extends Modal {
  constructor(app, opts) { super(app); this.opts = opts; }
  onOpen() {
    const lang = this.opts.lang || "en";
    if (dictFor(lang)._dir === "rtl") this.modalEl.setAttribute("dir", "rtl");
    this.titleEl.setText(this.opts.title);
    const inputs = {};
    for (const f of this.opts.fields) {
      const wrap = this.contentEl.createDiv({ cls: "uts-input-field" });
      wrap.createEl("label", { text: f.label });
      inputs[f.id] = wrap.createEl("input", { type: "text", cls: "uts-input", value: f.value || "", attr: { placeholder: f.placeholder || "" } });
    }
    const submit = () => {
      const values = {};
      for (const k of Object.keys(inputs)) values[k] = inputs[k].value.trim();
      this.close();
      Promise.resolve(this.opts.onSubmit(values)).catch(function (e) { console.error(e); });
    };
    for (const el of Object.values(inputs)) el.addEventListener("keydown", function (e) { if (e.key === "Enter") submit(); });
    const row = this.contentEl.createDiv({ cls: "uts-confirm-buttons" });
    row.createEl("button", { text: t(lang, "confirmCancel") }).onclick = () => this.close();
    row.createEl("button", { text: this.opts.submitText || t(lang, "confirmOk"), cls: "mod-cta" }).onclick = submit;
  }
}
async function applyPresetToScope(plugin, preset, after) {
  const lang = plugin.settings.language;
  const scope = plugin.getCurrentScope();
  const hasStyles = Object.keys(scope.styles || {}).some(function (k) {
    const t2 = scope.styles[k]; return !!(t2 && (t2.light || t2.dark));
  });
  const apply = function () {
    scope.styles = deepClone(preset.styles || {});
    plugin.commit(true);
    new Notice(t(lang, "presetApplied", { name: preset.name, scope: scope.name }));
    if (after) after();
  };
  if (plugin.settings.confirmPresetApply && hasStyles) {
    new ConfirmModal(plugin.app, {
      lang: lang,
      title: t(lang, "applyPresetConfirmTitle"),
      message: t(lang, "applyPresetConfirmMsg", { name: preset.name, scope: scope.name }),
      confirmText: t(lang, "applyPresetConfirmBtn"),
      onConfirm: apply,
    }).open();
  } else apply();
}
class ApplyPresetModal extends Modal {
  constructor(plugin, after) { super(plugin.app); this.plugin = plugin; this.after = after; }
  onOpen() {
    const lang = this.plugin.settings.language;
    if (dictFor(lang)._dir === "rtl") this.modalEl.setAttribute("dir", "rtl");
    this.titleEl.setText(t(lang, "applyPresetTitle"));
    this.contentEl.createEl("p", { cls: "uts-muted", text: t(lang, "applyPresetIntro") + ' ("' + this.plugin.getCurrentScope().name + '").' });
    for (const preset of allPresets(this.plugin.settings)) {
      const row = this.contentEl.createDiv({ cls: "uts-preset-row" });
      const info = row.createDiv({ cls: "uts-preset-info" });
      info.createDiv({ cls: "uts-preset-name", text: preset.name });
      if (preset.description) info.createDiv({ cls: "uts-muted", text: preset.description });
      row.createDiv({ cls: "uts-preset-actions" }).createEl("button", { text: t(lang, "applyPresetBtn"), cls: "mod-cta" })
        .onclick = () => { const after = this.after; applyPresetToScope(this.plugin, preset, after); this.close(); };
    }
  }
}
class ImportPresetModal extends Modal {
  constructor(plugin, after) { super(plugin.app); this.plugin = plugin; this.after = after; }
  onOpen() {
    const lang = this.plugin.settings.language;
    if (dictFor(lang)._dir === "rtl") this.modalEl.setAttribute("dir", "rtl");
    this.titleEl.setText(t(lang, "importPresetTitle"));
    this.contentEl.createEl("p", { cls: "uts-muted", text: t(lang, "importPresetIntro") });
    const ta = this.contentEl.createEl("textarea", { cls: "uts-textarea", attr: { placeholder: '{"name": "My preset", "styles": {}}' } });
    const file = this.contentEl.createEl("input", { type: "file", attr: { accept: ".json,application/json" } });
    file.addEventListener("change", async () => {
      const f = file.files && file.files[0];
      if (!f) return;
      try { ta.value = await f.text(); } catch (e) { new Notice(t(lang, "importPresetReadFail")); }
    });
    const row = this.contentEl.createDiv({ cls: "uts-confirm-buttons" });
    row.createEl("button", { text: t(lang, "confirmCancel") }).onclick = () => this.close();
    row.createEl("button", { text: t(lang, "importPresetBtn"), cls: "mod-cta" }).onclick = () => this.importPreset(ta.value);
  }
  importPreset(raw) {
    const lang = this.plugin.settings.language;
    let data;
    try { data = JSON.parse(raw); } catch (e) { new Notice(t(lang, "importPresetInvalidJson")); return; }
    if (!data || typeof data !== "object" || typeof data.styles !== "object" || data.styles === null) {
      new Notice(t(lang, "importPresetNotPreset")); return;
    }
    this.plugin.settings.customPresets.push({
      id: uid(),
      name: typeof data.name === "string" && data.name.trim() ? data.name.trim() : t(lang, "importPresetNameDefault"),
      description: typeof data.description === "string" ? data.description : undefined,
      styles: data.styles,
    });
    this.plugin.commit(true);
    new Notice(t(lang, "importPresetImported"));
    this.close();
    if (this.after) this.after();
  }
}
function exportPreset(plugin, preset) {
  const lang = plugin.settings.language;
  const m = new Modal(plugin.app);
  if (dictFor(lang)._dir === "rtl") m.modalEl.setAttribute("dir", "rtl");
  m.titleEl.setText(t(lang, "exportPresetTitle", { name: preset.name }));
  m.modalEl.classList.add("uts-wide-modal");
  const json = JSON.stringify({ name: preset.name, description: preset.description || "", styles: preset.styles || {} }, null, 2);
  const ta = m.contentEl.createEl("textarea", { cls: "uts-textarea uts-css-viewer" });
  ta.value = json; ta.readOnly = true;
  const row = m.contentEl.createDiv({ cls: "uts-confirm-buttons" });
  row.createEl("button", { text: t(lang, "exportCopy"), cls: "mod-cta" }).onclick = async function () {
    try { await navigator.clipboard.writeText(json); new Notice(t(lang, "exportCopied")); }
    catch (e) { new Notice(t(lang, "exportClipboardFail")); }
  };
  row.createEl("button", { text: t(lang, "exportSaveFile") }).onclick = function () {
    try {
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = preset.name.replace(/[^a-zA-Z0-9-_]+/g, "-") + ".json";
      document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    } catch (e) { new Notice(t(lang, "exportSaveFail")); }
  };
  row.createEl("button", { text: t(lang, "exportClose") }).onclick = function () { m.close(); };
  m.open();
}

/* ================================================================== */
/* [main modal]                                                        */
/* ================================================================== */
const opt = function (value, label) { return { value: value, label: label }; };
const RESERVED_CLASS_NAMES = ["markdown-rendered", "markdown-source-view", "mod-cm6"];

function buildOptionSets(lang) {
  const L = (k) => t(lang, k);
  return {
    fontWeight: [opt("", L("optDefault")), opt("normal", L("optNormal")), opt("bold", L("optBold")),
      opt("100", "100"), opt("200", "200"), opt("300", "300 " + L("optLight")), opt("400", "400"),
      opt("500", "500 " + L("optMedium")), opt("600", "600 " + L("optSemibold")),
      opt("700", "700"), opt("800", "800"), opt("900", "900")],
    fontStyle: [opt("", L("optDefault")), opt("normal", L("optNormal")), opt("italic", L("optItalic")), opt("oblique", L("optOblique"))],
    borderStyle: [opt("", L("optDefault")), opt("none", L("optNone")), opt("solid", L("optSolid")), opt("dashed", L("optDashed")),
      opt("dotted", L("optDotted")), opt("double", L("optDouble")), opt("groove", L("optGroove")), opt("ridge", L("optRidge")),
      opt("inset", L("optInset")), opt("outset", L("optOutset")), opt("hidden", L("optHidden"))],
    decorLine: [opt("", L("optDefault")), opt("none", L("optNone")), opt("underline", L("optUnderline")),
      opt("line-through", L("optStrikethrough")), opt("overline", L("optOverline")), opt("underline line-through", L("optUnderlineStrike"))],
    decorStyle: [opt("", L("optDefault")), opt("solid", L("optSolid")), opt("wavy", L("optWavy")),
      opt("dotted", L("optDotted")), opt("dashed", L("optDashed")), opt("double", L("optDouble"))],
  };
}

class StyleManagerModal extends Modal {
  constructor(plugin, focusElementId) {
    super(plugin.app);
    this.plugin = plugin;
    const s = plugin.settings;
    this.activeCategoryId = CATEGORIES.some(function (c) { return c.id === s.lastCategoryId; }) ? s.lastCategoryId : "text";
    this.themeTab = "light";
    this.previewMode = "reading";
    this.expanded = new Set();
    this.previewComp = null;
    this.previewToken = 0;
    this._activePopover = null;
    if (focusElementId) {
      const def = ELEMENTS.find(function (e) { return e.id === focusElementId; });
      if (def) { this.activeCategoryId = def.category; this.expanded.add(def.id); }
    }
  }
  get lang() { return this.plugin.settings.language || "en"; }
  get dir() { return dictFor(this.lang)._dir; }
  tr(key, vars) { return t(this.lang, key, vars); }
  elLabel(def) { return this.tr(def.labelKey) + (def.labelSuffix || ""); }

  onOpen() {
    this.modalEl.classList.add("uts-style-manager-modal");
    this.modalEl.setAttribute("dir", this.dir);
    this.titleEl.setText(this.tr("modalTitle"));
    this.renderHeader();
    this.layoutEl = this.contentEl.createDiv({ cls: "uts-sm-layout" });
    this.navEl = this.layoutEl.createDiv({ cls: "uts-sm-sidebar" });
    this.mainEl = this.layoutEl.createDiv({ cls: "uts-sm-main" });
    this.previewPanelEl = this.layoutEl.createDiv({ cls: "uts-sm-preview" });
    this.renderNav();
    this.renderMain();
    this.renderPreview();
  }
  onClose() {
    if (this._activePopover) { this._activePopover.remove(); this._activePopover = null; }
    if (this.previewComp) { this.previewComp.unload(); this.previewComp = null; }
    if (this.plugin.styleManagerModal === this) this.plugin.styleManagerModal = null;
    this.plugin.commit();
    super.onClose();
  }
  getScope() { return this.plugin.getCurrentScope(); }
  refreshAll() { this.rebuildScopeOptions(); this.renderNav(); this.renderMain(); this.renderPreview(); }

  renderHeader() {
    const header = this.contentEl.createDiv({ cls: "uts-sm-header" });
    const scopeWrap = header.createDiv({ cls: "uts-sm-scope" });
    scopeWrap.createSpan({ cls: "uts-sm-scope-label", text: this.tr("headerScope") });
    this.scopeSelectEl = scopeWrap.createEl("select", { cls: "uts-select" });
    this.rebuildScopeOptions();
    this.scopeSelectEl.addEventListener("change", () => {
      this.plugin.settings.activeScopeId = this.scopeSelectEl.value;
      this.plugin.commit();
      this.renderNav(); this.renderMain(); this.renderPreview();
    });
    const addScopeBtn = header.createEl("button", { cls: "uts-icon-btn", attr: { title: this.tr("headerAddScope"), "aria-label": this.tr("headerAddScope") } });
    setIcon(addScopeBtn, "plus");
    addScopeBtn.onclick = () => this.addScopeFlow();
    header.createDiv({ cls: "uts-sm-header-spacer" });
    const presetBtn = header.createEl("button", { cls: "uts-chip-btn" });
    setIcon(presetBtn.createSpan(), "palette");
    presetBtn.createSpan({ text: this.tr("headerPresets") });
    presetBtn.onclick = (ev) => this.showPresetMenu(ev);
    const previewBtn = header.createEl("button", { cls: "uts-chip-btn" });
    const pvIcon = previewBtn.createSpan();
    setIcon(pvIcon, this.plugin.settings.showPreviewPanel ? "eye" : "eye-off");
    previewBtn.createSpan({ text: this.tr("headerPreview") });
    previewBtn.onclick = () => {
      this.plugin.settings.showPreviewPanel = !this.plugin.settings.showPreviewPanel;
      this.plugin.commit();
      setIcon(pvIcon, this.plugin.settings.showPreviewPanel ? "eye" : "eye-off");
      this.renderPreview();
    };
  }
  rebuildScopeOptions() {
    if (!this.scopeSelectEl) return;
    this.scopeSelectEl.empty();
    for (const scope of this.plugin.settings.scopes) {
      const label = scope.type === "cssclass" ? scope.name + " (." + scope.className + ")" : this.tr("scopeVaultName");
      this.scopeSelectEl.createEl("option", { value: scope.id, text: label });
    }
    this.scopeSelectEl.value = this.plugin.settings.activeScopeId;
  }
  showPresetMenu(ev) {
    const menu = new Menu();
    const plugin = this.plugin;
    const modal = this;
    for (const preset of allPresets(plugin.settings)) {
      const p = preset;
      menu.addItem((item) => {
        item.setTitle(p.name).onClick(() => { applyPresetToScope(plugin, p, () => modal.refreshAll()); });
      });
    }
    menu.addSeparator();
    menu.addItem((item) => {
      item.setTitle(modal.tr("advSaveCurrentAsPreset")).onClick(() => { modal.saveCurrentAsPreset(); });
    });
    menu.addItem((item) => {
      item.setTitle(modal.tr("advPresetsTitle")).onClick(() => {
        modal.activeCategoryId = "advanced";
        modal.plugin.settings.lastCategoryId = "advanced";
        modal.plugin.commit();
        modal.renderNav(); modal.renderMain();
      });
    });
    menu.showAtMouseEvent(ev);
  }
  addScopeFlow() {
    new InputModal(this.app, {
      lang: this.lang,
      title: this.tr("scopeAddTitle"),
      fields: [
        { id: "name", label: this.tr("scopeNameLabel"), placeholder: "My style" },
        { id: "className", label: this.tr("scopeClassName"), placeholder: "my-style" },
      ],
      submitText: this.tr("scopeAddBtn"),
      onSubmit: (v) => {
        const className = v.className;
        if (!className || !isValidClassName(className)) { new Notice(this.tr("scopeInvalidClass")); return; }
        if (RESERVED_CLASS_NAMES.includes(className)) { new Notice(this.tr("scopeReserved")); return; }
        if (this.plugin.settings.scopes.some(function (s) { return s.className === className; })) { new Notice(this.tr("scopeDuplicate")); return; }
        const scope = { id: uid(), name: v.name || className, type: "cssclass", className: className, styles: {} };
        this.plugin.settings.scopes.push(scope);
        this.plugin.settings.activeScopeId = scope.id;
        this.plugin.commit(true);
        new Notice(this.tr("scopeCreated", { name: scope.name }));
        this.refreshAll();
      },
    }).open();
  }

  renderNav() {
    if (!this.navEl) return;
    this.navEl.empty();
    const scope = this.getScope();
    for (const cat of CATEGORIES) {
      const count = cat.id === "advanced" ? 0 : ELEMENTS.filter(function (e) {
        const ts = scope.styles[e.id];
        return e.category === cat.id && ts && (ts.light || ts.dark);
      }).length;
      const item = this.navEl.createDiv({ cls: "uts-sm-nav-item" + (cat.id === this.activeCategoryId ? " is-active" : "") });
      setIcon(item.createSpan({ cls: "uts-nav-icon" }), cat.icon);
      item.createSpan({ text: this.tr(cat.labelKey) });
      if (count > 0) item.createSpan({ cls: "uts-nav-count", text: String(count) });
      item.onclick = () => {
        this.activeCategoryId = cat.id;
        this.plugin.settings.lastCategoryId = cat.id;
        this.plugin.commit();
        this.renderNav(); this.renderMain(); this.renderPreview();
      };
    }
  }

  renderMain() {
    if (!this.mainEl) return;
    this.mainEl.empty();
    const cat = CATEGORIES.find((c) => c.id === this.activeCategoryId);
    if (!cat) return;
    const head = this.mainEl.createDiv({ cls: "uts-cat-head" });
    head.createDiv({ cls: "uts-cat-title", text: this.tr(cat.labelKey) });
    head.createDiv({ cls: "uts-cat-desc", text: this.tr(cat.descKey) });
    if (cat.id !== "advanced") {
      head.createDiv({ cls: "uts-cat-actions" }).createEl("button", { text: this.tr("catResetBtn") }).onclick = () => this.resetCategory(cat.id);
    }
    if (cat.id === "advanced") { this.renderAdvanced(this.mainEl); return; }
    const scope = this.getScope();
    for (const def of ELEMENTS.filter((e) => e.category === cat.id)) {
      this.renderElementCard(this.mainEl, def, scope);
    }
  }
  resetCategory(catId) {
    const scope = this.getScope();
    new ConfirmModal(this.app, {
      lang: this.lang,
      title: this.tr("catResetTitle"),
      message: this.tr("catResetMsg"),
      confirmText: this.tr("catResetConfirm"), danger: true,
      onConfirm: () => {
        for (const e of ELEMENTS.filter(function (x) { return x.category === catId; })) delete scope.styles[e.id];
        this.plugin.commit(true);
        this.renderNav(); this.renderMain();
      },
    }).open();
  }
  ensureThemeStyles(scope, elementId) {
    if (!scope.styles) scope.styles = {};
    let ts = scope.styles[elementId];
    if (!ts) { ts = {}; scope.styles[elementId] = ts; }
    return ts;
  }
  renderElementCard(parent, def, scope) {
    const ts = scope.styles[def.id];
    const customized = !!(ts && (ts.light || ts.dark));
    const expanded = this.expanded.has(def.id);
    const card = parent.createDiv({ cls: "uts-card" + (expanded ? " is-expanded" : "") + (customized ? " is-customized" : "") });
    const header = card.createDiv({ cls: "uts-card-header" });
    const titleWrap = header.createDiv({ cls: "uts-card-title-wrap" });
    titleWrap.createSpan({ cls: "uts-dot" });
    titleWrap.createSpan({ cls: "uts-card-title", text: this.elLabel(def) });
    const actions = header.createDiv({ cls: "uts-card-actions" });
    if (ts && ts.separate) {
      const seg = actions.createDiv({ cls: "uts-seg" });
      for (const mode of ["light", "dark"]) {
        const label = mode === "light" ? this.tr("modeLight") : this.tr("modeDark");
        const b = seg.createEl("button", { cls: "uts-seg-btn" + (this.themeTab === mode ? " is-active" : ""), text: label });
        b.onclick = (ev) => { ev.stopPropagation(); this.themeTab = mode; this.renderMain(); };
      }
    }
    if (customized) {
      const rb = actions.createEl("button", { cls: "uts-icon-btn", attr: { title: this.tr("cardResetTitle"), "aria-label": this.tr("cardResetTitle") } });
      setIcon(rb, "rotate-ccw");
      rb.onclick = (ev) => {
        ev.stopPropagation();
        delete scope.styles[def.id];
        this.plugin.commit(true);
        this.renderNav(); this.renderMain();
      };
    }
    const chevron = actions.createSpan({ cls: "uts-chevron" });
    setIcon(chevron, "chevron-down");
    header.onclick = () => {
      if (expanded) this.expanded.delete(def.id); else this.expanded.add(def.id);
      this.renderMain();
    };
    if (!expanded) return;

    const body = card.createDiv({ cls: "uts-card-body" });
    const sepRow = body.createDiv({ cls: "uts-sep-row" });
    const cb = sepRow.createEl("input", { type: "checkbox", attr: { id: "uts-sep-" + def.id } });
    cb.checked = !!ts && !!ts.separate;
    const cbLabel = sepRow.createEl("label", { text: this.tr("cardSeparate") });
    cbLabel.setAttribute("for", "uts-sep-" + def.id);
    cb.onclick = () => {
      const t2 = this.ensureThemeStyles(scope, def.id);
      if (cb.checked) t2.separate = true;
      else { t2.separate = false; delete t2.dark; }
      this.plugin.commit(true);
      this.renderMain();
    };

    const getStyle = () => {
      const t2 = this.ensureThemeStyles(scope, def.id);
      const bucket = (t2.separate && this.themeTab === "dark") ? "dark" : "light";
      if (!t2[bucket]) t2[bucket] = {};
      return t2[bucket];
    };
    const warn = body.createDiv({ cls: "uts-warning" });
    setIcon(warn.createSpan(), "alert-triangle");
    warn.createSpan({ text: this.tr("cardLowContrast") });
    const updateWarn = function () {
      const s = getStyle();
      const fg = parseColor(s.color);
      const bg = parseColor(s.backgroundColor);
      warn.classList.toggle("is-visible", !!(fg && bg && contrastRatio(fg, bg) < 3));
    };
    updateWarn();
    const mutate = (fn) => {
      fn(getStyle());
      updateWarn();
      if (!card.classList.contains("is-customized")) { card.classList.add("is-customized"); this.renderNav(); }
      this.plugin.commit();
    };
    for (const gid of def.groups) {
      this.renderGroup(body, gid, getStyle, mutate, { allowBlur: def.allowBlur });
    }
  }

  renderGroup(parent, gid, getStyle, mutate, opts) {
    const group = parent.createDiv({ cls: "uts-group" });
    const groupKey = { text: "groupText", background: "groupBackground", border: "groupBorder", spacing: "groupSpacing", effects: "groupEffects" }[gid];
    group.createDiv({ cls: "uts-group-title", text: this.tr(groupKey) });
    const options = buildOptionSets(this.lang);
    switch (gid) {
      case "text":
        this.addColorField(group, this.tr("ctrlTextColor"), function () { return getStyle().color; }, function (v) { mutate(function (s) { if (v) s.color = v; else delete s.color; }); }, "text");
        this.addGradientField(group, this.tr("ctrlTextGradient"), function () { return getStyle().textGradient; }, function (v) { mutate(function (s) { if (v) s.textGradient = v; else delete s.textGradient; }); }, this.tr("phTextGradient"));
        this.addSliderField(group, this.tr("ctrlTextOpacity"), function () { return getStyle().opacity; }, function (v) { mutate(function (s) { if (v >= 100) delete s.opacity; else s.opacity = v; }); });
        this.addSelectField(group, this.tr("ctrlFontWeight"), function () { return getStyle().fontWeight; }, function (v) { mutate(function (s) { if (v) s.fontWeight = v; else delete s.fontWeight; }); }, options.fontWeight);
        this.addSelectField(group, this.tr("ctrlFontStyle"), function () { return getStyle().fontStyle; }, function (v) { mutate(function (s) { if (v) s.fontStyle = v; else delete s.fontStyle; }); }, options.fontStyle);
        this.addTextField(group, this.tr("ctrlFontSize"), function () { return getStyle().fontSize; }, function (v) { mutate(function (s) { if (v) s.fontSize = v; else delete s.fontSize; }); }, { placeholder: this.tr("phFontSize") });
        this.addTextField(group, this.tr("ctrlLetterSpacing"), function () { return getStyle().letterSpacing; }, function (v) { mutate(function (s) { if (v) s.letterSpacing = v; else delete s.letterSpacing; }); }, { placeholder: this.tr("phLetterSpacing") });
        this.addTextField(group, this.tr("ctrlLineHeight"), function () { return getStyle().lineHeight; }, function (v) { mutate(function (s) { if (v) s.lineHeight = v; else delete s.lineHeight; }); }, { placeholder: this.tr("phLineHeight") });
        this.addSelectField(group, this.tr("ctrlDecoration"), function () { return getStyle().textDecorationLine; }, function (v) { mutate(function (s) { if (v) s.textDecorationLine = v; else delete s.textDecorationLine; }); }, options.decorLine);
        this.addSelectField(group, this.tr("ctrlDecorationStyle"), function () { return getStyle().textDecorationStyle; }, function (v) { mutate(function (s) { if (v) s.textDecorationStyle = v; else delete s.textDecorationStyle; }); }, options.decorStyle);
        this.addColorField(group, this.tr("ctrlDecorationColor"), function () { return getStyle().textDecorationColor; }, function (v) { mutate(function (s) { if (v) s.textDecorationColor = v; else delete s.textDecorationColor; }); }, "border");
        break;
      case "background":
        this.addColorField(group, this.tr("ctrlBackgroundColor"), function () { return getStyle().backgroundColor; }, function (v) { mutate(function (s) { if (v) s.backgroundColor = v; else delete s.backgroundColor; }); }, "background");
        this.addSliderField(group, this.tr("ctrlBackgroundOpacity"), function () { return getStyle().backgroundOpacity; }, function (v) { mutate(function (s) { if (v >= 100) delete s.backgroundOpacity; else s.backgroundOpacity = v; }); });
        this.addGradientField(group, this.tr("ctrlGradient"), function () { return getStyle().backgroundGradient; }, function (v) { mutate(function (s) { if (v) s.backgroundGradient = v; else delete s.backgroundGradient; }); }, this.tr("phGradient"));
        break;
      case "border":
        this.addSelectField(group, this.tr("ctrlBorderStyle"), function () { return getStyle().borderStyle; }, function (v) { mutate(function (s) { if (v) s.borderStyle = v; else delete s.borderStyle; }); }, options.borderStyle);
        this.addColorField(group, this.tr("ctrlBorderColor"), function () { return getStyle().borderColor; }, function (v) { mutate(function (s) { if (v) s.borderColor = v; else delete s.borderColor; }); }, "border");
        this.addTextField(group, this.tr("ctrlBorderRadius"), function () { return getStyle().borderRadius; }, function (v) { mutate(function (s) { if (v) s.borderRadius = v; else delete s.borderRadius; }); }, { placeholder: this.tr("phBorderRadius") });
        this.addSidesField(group, this.tr("ctrlBorderWidth"), ["borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth"], getStyle, mutate);
        break;
      case "spacing":
        this.addSidesField(group, this.tr("ctrlPadding"), ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"], getStyle, mutate);
        this.addSidesField(group, this.tr("ctrlMargin"), ["marginTop", "marginRight", "marginBottom", "marginLeft"], getStyle, mutate);
        break;
      case "effects":
        this.addTextField(group, this.tr("ctrlBoxShadow"), function () { return getStyle().boxShadow; }, function (v) { mutate(function (s) { if (v) s.boxShadow = v; else delete s.boxShadow; }); }, { placeholder: this.tr("phBoxShadow"), mono: true });
        this.addTextField(group, this.tr("ctrlTextShadow"), function () { return getStyle().textShadow; }, function (v) { mutate(function (s) { if (v) s.textShadow = v; else delete s.textShadow; }); }, { placeholder: this.tr("phTextShadow"), mono: true });
        if (opts.allowBlur) {
          this.addTextField(group, this.tr("ctrlBlur"), function () { return getStyle().blur; }, function (v) { mutate(function (s) { if (v) s.blur = v; else delete s.blur; }); }, { placeholder: this.tr("phBlur") });
        }
        break;
    }
  }

  // ★ NEW: helper برای ساخت popover
  createSwatchPopover(anchorEl, buildContent) {
    // بستن popover قبلی
    if (this._activePopover) {
      this._activePopover.remove();
      this._activePopover = null;
    }
    const pop = document.createElement("div");
    pop.className = "uts-swatch-popover";
    const rect = anchorEl.getBoundingClientRect();
    pop.style.position = "fixed";
    pop.style.top = (rect.bottom + 6) + "px";
    pop.style.left = Math.max(8, Math.min(rect.left, window.innerWidth - 340)) + "px";
    pop.style.zIndex = "9999";
    document.body.appendChild(pop);
    buildContent(pop);

    const close = (ev) => {
      if (ev && pop.contains(ev.target)) return;
      pop.remove();
      document.removeEventListener("mousedown", close);
      if (this._activePopover === pop) this._activePopover = null;
    };
    setTimeout(() => document.addEventListener("mousedown", close), 0);
    this._activePopover = pop;
    return pop;
  }

  // ★ MODIFIED: پاپ‌اور سواچ‌ها به جای grid همیشه‌نمایان
  addColorField(parent, label, get, set, kind) {
    const self = this;
    const row = parent.createDiv({ cls: "uts-control" });
    row.createDiv({ cls: "uts-control-label", text: label });
    const wrap = row.createDiv({ cls: "uts-color-wrap" });
    const field = wrap.createDiv({ cls: "uts-color-field" });

    const picker = field.createEl("input", { type: "color", cls: "uts-color-picker" });
    const hexInput = field.createEl("input", {
      type: "text", cls: "uts-input uts-grow uts-color-hex",
      value: get() || "", attr: { placeholder: self.tr("phColor") }
    });

    // ★ آیکون پالت
    const paletteBtn = field.createEl("button", {
      cls: "uts-icon-btn uts-palette-btn",
      attr: { title: self.tr("ctrlSuggestions"), "aria-label": self.tr("ctrlSuggestions") }
    });
    setIcon(paletteBtn, "palette");

    const resetBtn = field.createEl("button", {
      cls: "uts-icon-btn",
      attr: { title: self.tr("cardReset"), "aria-label": self.tr("cardReset") }
    });
    setIcon(resetBtn, "x");

    const syncPicker = function () {
      const v = get();
      picker.value = v && /^#[0-9a-fA-F]{6}$/.test(v) ? v : "#000000";
    };
    syncPicker();

    picker.addEventListener("input", function () {
      set(picker.value); hexInput.value = picker.value;
    });

    hexInput.addEventListener("change", function () {
      const v = hexInput.value.trim();
      if (!v) { set(undefined); syncPicker(); return; }
      if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v)) {
        const hex = expandHex(v);
        set(hex); hexInput.value = hex; syncPicker();
      } else if (/^(rgba?|hsla?)\(.*\)$/i.test(v) && sanitizeCssValue(v)) {
        set(v);
      } else {
        hexInput.classList.add("uts-invalid");
        setTimeout(function () { hexInput.classList.remove("uts-invalid"); }, 900);
      }
    });

    resetBtn.onclick = function () { set(undefined); hexInput.value = ""; syncPicker(); };

    paletteBtn.onclick = (ev) => {
      ev.stopPropagation();
      self.createSwatchPopover(paletteBtn, (pop) => {
        const swatchSet = kind === "background" ? BACKGROUND_SWATCHES
          : (kind === "border" ? BORDER_SWATCHES : COLOR_SWATCHES);
        pop.createDiv({ cls: "uts-swatch-popover-title", text: self.tr("ctrlSuggestions") });
        const grid = pop.createDiv({ cls: "uts-swatch-grid" });
        for (const c of swatchSet) {
          const sw = grid.createEl("button", {
            cls: "uts-swatch" + (c === "transparent" ? " is-transparent" : ""),
            attr: { title: c, "aria-label": c }
          });
          if (c !== "transparent") sw.style.background = c;
          sw.onclick = () => {
            set(c); hexInput.value = c;
            if (/^#[0-9a-fA-F]{6}$/.test(c)) syncPicker();
            pop.remove();
            self._activePopover = null;
          };
        }
      });
    };
  }

  // ★ MODIFIED: پاپ‌اور گرادیانت‌ها به جای grid همیشه‌نمایان
  addGradientField(parent, label, get, set, placeholder) {
    const self = this;
    const row = parent.createDiv({ cls: "uts-control" });
    row.createDiv({ cls: "uts-control-label", text: label });
    const wrap = row.createDiv({ cls: "uts-color-wrap" });

    const field = wrap.createDiv({ cls: "uts-color-field" });
    const input = field.createEl("input", {
      type: "text", cls: "uts-input uts-grow uts-mono",
      value: get() || "", attr: { placeholder: placeholder || "linear-gradient(...)" }
    });

    const paletteBtn = field.createEl("button", {
      cls: "uts-icon-btn uts-palette-btn",
      attr: { title: self.tr("ctrlGradientSuggestions"), "aria-label": self.tr("ctrlGradientSuggestions") }
    });
    setIcon(paletteBtn, "palette");

    const resetBtn = field.createEl("button", {
      cls: "uts-icon-btn",
      attr: { title: self.tr("cardReset"), "aria-label": self.tr("cardReset") }
    });
    setIcon(resetBtn, "x");

    const preview = wrap.createDiv({ cls: "uts-gradient-preview" });
    const renderPreview = () => {
      const v = input.value.trim();
      preview.style.background = v || "";
      preview.classList.toggle("is-empty", !v);
    };

    input.addEventListener("input", function () {
      set(input.value.trim() || undefined); renderPreview();
    });
    input.addEventListener("blur", function () {
      const v = input.value.trim();
      if (v && !sanitizeCssValue(v)) {
        input.classList.add("uts-invalid");
        setTimeout(function () { input.classList.remove("uts-invalid"); }, 900);
      }
    });
    resetBtn.onclick = function () { set(undefined); input.value = ""; renderPreview(); };

    paletteBtn.onclick = (ev) => {
      ev.stopPropagation();
      self.createSwatchPopover(paletteBtn, (pop) => {
        pop.createDiv({ cls: "uts-swatch-popover-title", text: self.tr("ctrlGradientSuggestions") });
        const grid = pop.createDiv({ cls: "uts-gradient-grid" });
        for (const g of GRADIENT_PRESETS) {
          const cell = grid.createDiv({ cls: "uts-gradient-cell" });
          const sw = cell.createEl("button", { cls: "uts-swatch is-gradient", attr: { title: g.label } });
          sw.style.background = g.value;
          sw.onclick = () => {
            input.value = g.value; set(g.value); renderPreview();
            pop.remove();
            self._activePopover = null;
          };
          cell.createDiv({ cls: "uts-gradient-cell-label", text: g.label });
        }
      });
    };

    renderPreview();
  }

  addSliderField(parent, label, get, set) {
    const self = this;
    const row = parent.createDiv({ cls: "uts-control" });
    row.createDiv({ cls: "uts-control-label", text: label });
    const wrap = row.createDiv({ cls: "uts-slider" });
    const range = wrap.createEl("input", { type: "range", attr: { min: "0", max: "100", step: "1" } });
    range.value = String(get() != null ? get() : 100);
    const val = wrap.createSpan({ cls: "uts-slider-value", text: (get() != null ? get() : 100) + "%" });
    const reset = wrap.createEl("button", { cls: "uts-icon-btn", attr: { title: self.tr("cardReset"), "aria-label": self.tr("cardReset") } });
    setIcon(reset, "rotate-ccw");
    range.addEventListener("input", function () {
      const v = parseInt(range.value, 10);
      val.setText(v + "%");
      set(v);
    });
    reset.onclick = function () { range.value = "100"; val.setText("100%"); set(100); };
  }
  addSelectField(parent, label, get, set, options) {
    const row = parent.createDiv({ cls: "uts-control" });
    row.createDiv({ cls: "uts-control-label", text: label });
    const select = row.createEl("select", { cls: "uts-select uts-grow" });
    for (const o of options) select.createEl("option", { value: o.value, text: o.label });
    select.value = get() || "";
    select.addEventListener("change", function () { set(select.value || undefined); });
  }
  addTextField(parent, label, get, set, opts) {
    const row = parent.createDiv({ cls: "uts-control" });
    row.createDiv({ cls: "uts-control-label", text: label });
    const input = row.createEl("input", { type: "text", cls: "uts-input uts-grow" + (opts && opts.mono ? " uts-mono" : ""), value: get() || "", attr: { placeholder: (opts && opts.placeholder) || "" } });
    input.addEventListener("input", function () { set(input.value.trim() || undefined); });
    input.addEventListener("blur", function () {
      const v = input.value.trim();
      if (v && !sanitizeCssValue(v)) {
        input.classList.add("uts-invalid");
        setTimeout(function () { input.classList.remove("uts-invalid"); }, 900);
      }
    });
  }
  addSidesField(parent, label, keys, getStyle, mutate) {
    const self = this;
    const row = parent.createDiv({ cls: "uts-control" });
    row.createDiv({ cls: "uts-control-label", text: label });
    const wrap = row.createDiv({ cls: "uts-sides" });
    const read = function () { return keys.map(function (k) { return getStyle()[k] || ""; }); };
    const initial = read();
    let linked = initial.every(function (x) { return x === initial[0]; });
    const linkBtn = wrap.createEl("button", { cls: "uts-icon-btn", attr: { title: "Link or unlink", "aria-label": "Link or unlink" } });
    const updateLinkIcon = function () { setIcon(linkBtn, linked ? "link" : "unlink"); };
    updateLinkIcon();
    const inputsWrap = wrap.createDiv({ cls: "uts-sides-inputs" });
    const renderInputs = () => {
      inputsWrap.empty();
      if (linked) {
        const input = inputsWrap.createEl("input", { type: "text", cls: "uts-input", value: read()[0], attr: { placeholder: self.tr("phSide") } });
        input.addEventListener("input", function () {
          const v = input.value.trim() || undefined;
          mutate(function (s) { keys.forEach(function (k) { if (v) s[k] = v; else delete s[k]; }); });
        });
      } else {
        const labels = ["T", "R", "B", "L"];
        keys.forEach(function (k, i) {
          const cell = inputsWrap.createDiv({ cls: "uts-side-cell" });
          cell.createSpan({ cls: "uts-side-label", text: labels[i] });
          const input = cell.createEl("input", { type: "text", cls: "uts-input", value: getStyle()[k] || "" });
          input.addEventListener("input", function () {
            const v = input.value.trim() || undefined;
            mutate(function (s) { if (v) s[k] = v; else delete s[k]; });
          });
        });
      }
    };
    renderInputs();
    linkBtn.onclick = function () { linked = !linked; updateLinkIcon(); renderInputs(); };
  }

  renderPreview() {
    if (!this.previewPanelEl || !this.layoutEl) return;
    const show = this.plugin.settings.showPreviewPanel;
    this.layoutEl.classList.toggle("no-preview", !show);
    this.previewPanelEl.empty();
    if (!show) return;
    const head = this.previewPanelEl.createDiv({ cls: "uts-preview-head" });
    head.createSpan({ cls: "uts-preview-title", text: this.tr("previewTitle") });
    const seg = head.createDiv({ cls: "uts-seg" });
    const modes = [
      { id: "reading", label: this.tr("previewModeReading"), tip: this.tr("previewReadingTip") },
      { id: "editor", label: this.tr("previewModeEditor"), tip: this.tr("previewEditorTip") },
    ];
    for (const m of modes) {
      const b = seg.createEl("button", { cls: "uts-seg-btn" + (this.previewMode === m.id ? " is-active" : ""), text: m.label, attr: { title: m.tip } });
      b.onclick = () => { this.previewMode = m.id; this.renderPreview(); };
    }
    const bodyEl = this.previewPanelEl.createDiv({ cls: "uts-preview-body" });
    if (this.activeCategoryId === "advanced") {
      bodyEl.createDiv({ cls: "uts-sim-note", text: this.tr("previewNoAdvanced") });
      return;
    }
    const scope = this.getScope();
    const scopeClass = scope.type === "cssclass" ? (scope.className || null) : null;
    if (this.previewMode === "reading") {
      if (this.previewComp) { this.previewComp.unload(); this.previewComp = null; }
      const comp = new Component();
      comp.load();
      this.previewComp = comp;
      const token = ++this.previewToken;
      const holder = document.createElement("div");
      PreviewRenderer.renderReading(this.app, holder, this.activeCategoryId, scopeClass, comp).then(() => {
        if (token !== this.previewToken) return;
        bodyEl.empty();
        bodyEl.appendChild(holder);
      });
    } else {
      PreviewRenderer.renderEditorSim(bodyEl, this.activeCategoryId, scopeClass, this.lang);
    }
  }

  section(parent, title, desc) {
    const s = parent.createDiv({ cls: "uts-section" });
    s.createDiv({ cls: "uts-section-title", text: title });
    if (desc) s.createDiv({ cls: "uts-section-desc", text: desc });
    return s;
  }
  saveCurrentAsPreset() {
    const self = this;
    const scope = this.getScope();
    new InputModal(this.app, {
      lang: this.lang,
      title: this.tr("advSaveCurrentTitle"),
      fields: [
        { id: "name", label: this.tr("advPresetNameField"), placeholder: this.tr("advPresetNamePlaceholder") },
        { id: "description", label: this.tr("advPresetDescField"), placeholder: this.tr("advPresetDescPlaceholder") },
      ],
      submitText: this.tr("advSavePresetBtn"),
      onSubmit: (v) => {
        if (!v.name) { new Notice(self.tr("advPresetNameRequired")); return; }
        self.plugin.settings.customPresets.push({ id: uid(), name: v.name, description: v.description || undefined, styles: deepClone(scope.styles || {}) });
        self.plugin.commit(true);
        new Notice(self.tr("advPresetSaved", { name: v.name }));
        if (self.activeCategoryId === "advanced") self.renderMain();
      },
    }).open();
  }

  renderAdvanced(main) {
    const self = this;
    const plugin = this.plugin;
    const scopesSec = this.section(main, this.tr("advScopesTitle"), this.tr("advScopesDesc"));
    for (const scope of plugin.settings.scopes) {
      const row = scopesSec.createDiv({ cls: "uts-scope-row" });
      const info = row.createDiv({ cls: "uts-preset-info" });
      info.createDiv({ cls: "uts-preset-name", text: scope.type === "vault" ? this.tr("scopeVaultName") : scope.name });
      info.createDiv({ cls: "uts-muted", text: scope.type === "vault" ? this.tr("scopeVaultDesc") : this.tr("scopeClassDesc", { cls: scope.className }) });
      const actions = row.createDiv({ cls: "uts-preset-actions" });
      if (scope.id !== plugin.settings.activeScopeId) {
        actions.createEl("button", { text: this.tr("scopeSelect") }).onclick = () => {
          plugin.settings.activeScopeId = scope.id;
          plugin.commit();
          self.refreshAll();
        };
      } else actions.createSpan({ cls: "uts-badge", text: this.tr("scopeActive") });
      if (scope.type === "cssclass") {
        actions.createEl("button", { text: this.tr("scopeRename") }).onclick = () => {
          new InputModal(self.app, {
            lang: self.lang, title: self.tr("scopeRenameTitle"),
            fields: [
              { id: "name", label: self.tr("scopeNameField"), value: scope.name },
              { id: "className", label: self.tr("scopeClassField"), value: scope.className || "" },
            ],
            onSubmit: (v) => {
              if (!v.className || !isValidClassName(v.className) || RESERVED_CLASS_NAMES.includes(v.className)) {
                new Notice(self.tr("scopeInvalidClass")); return;
              }
              scope.name = v.name || v.className; scope.className = v.className;
              plugin.commit(true); self.refreshAll();
            },
          }).open();
        };
        actions.createEl("button", { text: this.tr("scopeDelete") }).onclick = () => {
          new ConfirmModal(self.app, {
            lang: self.lang, title: self.tr("scopeDeleteTitle"),
            message: self.tr("scopeDeleteMsg", { name: scope.name, cls: scope.className }),
            confirmText: self.tr("scopeDeleteBtn"), danger: true,
            onConfirm: () => {
              plugin.settings.scopes = plugin.settings.scopes.filter(function (x) { return x.id !== scope.id; });
              if (plugin.settings.activeScopeId === scope.id) plugin.settings.activeScopeId = VAULT_SCOPE_ID;
              plugin.commit(true); self.refreshAll();
            },
          }).open();
        };
      }
    }
    scopesSec.createEl("button", { text: this.tr("scopeAdd") }).onclick = () => this.addScopeFlow();

    const ccSec = this.section(main, this.tr("advCustomClassesTitle"), this.tr("advCustomClassesDesc"));
    for (const cc of plugin.settings.customClasses) {
      const card = ccSec.createDiv({ cls: "uts-card" });
      const head = card.createDiv({ cls: "uts-card-header" });
      const titleWrap = head.createDiv({ cls: "uts-card-title-wrap" });
      titleWrap.createSpan({ cls: "uts-card-title", text: cc.name });
      head.createDiv({ cls: "uts-chip", text: "." + cc.name });
      const actions = head.createDiv({ cls: "uts-card-actions" });
      const del = actions.createEl("button", { cls: "uts-icon-btn", attr: { title: this.tr("advDeleteClassBtn"), "aria-label": this.tr("advDeleteClassBtn") } });
      setIcon(del, "trash-2");
      del.onclick = (ev) => {
        ev.stopPropagation();
        new ConfirmModal(self.app, {
          lang: self.lang, title: self.tr("advDeleteClassTitle"),
          message: self.tr("advDeleteClassMsg", { name: cc.name }),
          confirmText: self.tr("advDeleteClassBtn"), danger: true,
          onConfirm: () => {
            plugin.settings.customClasses = plugin.settings.customClasses.filter(function (x) { return x.id !== cc.id; });
            plugin.commit(true); self.renderMain();
          },
        }).open();
      };
      const chev = actions.createSpan({ cls: "uts-chevron" });
      setIcon(chev, "chevron-down");
      const key = "cc:" + cc.id;
      head.onclick = () => {
        if (self.expanded.has(key)) self.expanded.delete(key); else self.expanded.add(key);
        self.renderMain();
      };
      if (!this.expanded.has(key)) continue;
      const body = card.createDiv({ cls: "uts-card-body" });
      const noteEl = body.createDiv({ cls: "uts-note" });
      noteEl.createSpan({ text: this.tr("advUseInNote") + "  " });
      noteEl.createEl("code", { text: "cssclasses: [" + cc.name + "]" });
      const getStyle = function () { if (!cc.styles) cc.styles = {}; return cc.styles; };
      const mutate = (fn) => { fn(getStyle()); plugin.commit(); };
      for (const gid of ALL_GROUPS) this.renderGroup(body, gid, getStyle, mutate, { allowBlur: false });
    }
    ccSec.createEl("button", { text: this.tr("advAddClassBtn") }).onclick = () => {
      new InputModal(self.app, {
        lang: self.lang, title: self.tr("advAddClassTitle"),
        fields: [{ id: "name", label: self.tr("advAddClassField"), placeholder: self.tr("advAddClassPlaceholder") }],
        submitText: self.tr("advAddClassBtnShort"),
        onSubmit: (v) => {
          if (!v.name || !isValidClassName(v.name) || RESERVED_CLASS_NAMES.includes(v.name)) {
            new Notice(self.tr("scopeInvalidClass")); return;
          }
          if (plugin.settings.customClasses.some(function (c) { return c.name === v.name; }) ||
              plugin.settings.scopes.some(function (s) { return s.className === v.name; })) {
            new Notice(self.tr("advClassNameInUse")); return;
          }
          const cc = { id: uid(), name: v.name, styles: {} };
          plugin.settings.customClasses.push(cc);
          self.expanded.add("cc:" + cc.id);
          plugin.commit(true); self.renderMain();
        },
      }).open();
    };

    const presetSec = this.section(main, this.tr("advPresetsTitle"), this.tr("advPresetsDesc"));
    presetSec.createEl("button", { text: this.tr("advSaveCurrentAsPreset") }).onclick = () => this.saveCurrentAsPreset();
    presetSec.createEl("button", { text: this.tr("advImportPreset") }).onclick = () => {
      new ImportPresetModal(plugin, () => self.renderMain()).open();
    };
    for (const preset of allPresets(plugin.settings)) {
      const row = presetSec.createDiv({ cls: "uts-preset-row" });
      const info = row.createDiv({ cls: "uts-preset-info" });
      const nameRow = info.createDiv({ cls: "uts-preset-name-row" });
      nameRow.createSpan({ cls: "uts-preset-name", text: preset.name });
      nameRow.createSpan({ cls: "uts-badge", text: preset.builtin ? this.tr("advBuiltIn") : this.tr("advCustom") });
      if (preset.description) info.createDiv({ cls: "uts-muted", text: preset.description });
      const actions = row.createDiv({ cls: "uts-preset-actions" });
      actions.createEl("button", { text: this.tr("applyPresetBtn"), cls: "mod-cta" }).onclick = () => {
        applyPresetToScope(plugin, preset, () => self.refreshAll());
      };
      actions.createEl("button", { text: this.tr("advDuplicateBtn") }).onclick = () => {
        plugin.settings.customPresets.push({ id: uid(), name: preset.name + " copy", description: preset.description, styles: deepClone(preset.styles || {}) });
        plugin.commit(true); self.renderMain();
      };
      actions.createEl("button", { text: this.tr("advExportBtn") }).onclick = () => { exportPreset(plugin, preset); };
      if (!preset.builtin) {
        actions.createEl("button", { text: this.tr("scopeRename") }).onclick = () => {
          new InputModal(self.app, {
            lang: self.lang, title: self.tr("advRenamePresetTitle"),
            fields: [
              { id: "name", label: self.tr("advPresetNameLabel"), value: preset.name },
              { id: "description", label: self.tr("advPresetDescLabel"), value: preset.description || "" },
            ],
            onSubmit: (v) => {
              if (!v.name) return;
              preset.name = v.name; preset.description = v.description || undefined;
              plugin.commit(true); self.renderMain();
            },
          }).open();
        };
        actions.createEl("button", { text: this.tr("advDeletePresetBtn") }).onclick = () => {
          new ConfirmModal(self.app, {
            lang: self.lang, title: self.tr("advDeletePresetTitle"),
            message: self.tr("advDeletePresetMsg", { name: preset.name }),
            confirmText: self.tr("advDeletePresetBtn"), danger: true,
            onConfirm: () => {
              plugin.settings.customPresets = plugin.settings.customPresets.filter(function (p) { return p.id !== preset.id; });
              plugin.commit(true); self.renderMain();
            },
          }).open();
        };
      }
    }

    const cssSec = this.section(main, this.tr("advGeneratedCssTitle"), this.tr("advGeneratedCssDesc"));
    const ta = cssSec.createEl("textarea", { cls: "uts-textarea uts-css-viewer" });
    ta.value = generateCss(plugin.settings); ta.readOnly = true;
    const cssBtns = cssSec.createDiv({ cls: "uts-confirm-buttons" });
    cssBtns.createEl("button", { text: this.tr("advCopyCssBtn") }).onclick = async function () {
      try { await navigator.clipboard.writeText(ta.value); new Notice(t(plugin.settings.language, "advCssCopied")); }
      catch (e) { new Notice(t(plugin.settings.language, "exportClipboardFail")); }
    };
    cssBtns.createEl("button", { text: this.tr("advRefreshCssBtn") }).onclick = () => { ta.value = generateCss(plugin.settings); };

    const danger = this.section(main, this.tr("advDangerTitle"), this.tr("advDangerDesc"));
    danger.createEl("button", { text: this.tr("advResetScopeBtn"), cls: "mod-warning" }).onclick = () => {
      const scope = self.getScope();
      new ConfirmModal(self.app, {
        lang: self.lang, title: self.tr("advResetScopeTitle"),
        message: self.tr("advResetScopeMsg", { name: scope.name }),
        confirmText: self.tr("advResetScopeConfirm"), danger: true,
        onConfirm: () => { scope.styles = {}; plugin.commit(true); self.refreshAll(); },
      }).open();
    };
    danger.createEl("button", { text: this.tr("advResetEverythingBtn"), cls: "mod-warning" }).onclick = () => {
      new ConfirmModal(self.app, {
        lang: self.lang, title: self.tr("advResetEverythingTitle"),
        message: self.tr("advResetEverythingMsg"),
        confirmText: self.tr("advResetEverythingConfirm"), danger: true,
        onConfirm: () => {
          plugin.settings.scopes.forEach(function (s) { s.styles = {}; });
          plugin.settings.customClasses = [];
          plugin.commit(true);
          new Notice(self.tr("advAllReset"));
          self.refreshAll();
        },
      }).open();
    };
  }
}

/* ================================================================== */
/* [settings tab]                                                      */
/* ================================================================== */
class UTSSettingTab extends PluginSettingTab {
  constructor(app, plugin) { super(app, plugin); this.plugin = plugin; }
display() {
  const plugin = this.plugin;
  const lang = plugin.settings.language || "en";
  const tr = (k, v) => t(lang, k, v);
  const containerEl = this.containerEl;
  containerEl.empty();
  containerEl.setAttribute("dir", dictFor(lang)._dir);

  new Setting(containerEl).setName(tr("settingsHeading")).setHeading();
  containerEl.createEl("p", { text: tr("settingsIntro") });

  new Setting(containerEl).setName(tr("langLabel"))
    .addDropdown((d) => {
      d.addOption("en", tr("langEnglish"));
      d.addOption("fa", tr("langPersian"));
      d.setValue(lang);
      d.onChange((v) => {
        plugin.settings.language = v;
        plugin.commit(true);
        this.display();
      });
    });

  new Setting(containerEl).setName(tr("settingsStyleManager")).setDesc(tr("settingsStyleManagerDesc"))
    .addButton(function (b) { b.setButtonText(tr("settingsOpenBtn")).setCta().onClick(function () { plugin.openStyleManager(); }); });

  new Setting(containerEl).setName(tr("settingsShowPreview")).setDesc(tr("settingsShowPreviewDesc"))
    .addToggle((t2) => t2.setValue(plugin.settings.showPreviewPanel).onChange((v) => { plugin.settings.showPreviewPanel = v; plugin.commit(); }));

  new Setting(containerEl).setName(tr("settingsConfirmPreset")).setDesc(tr("settingsConfirmPresetDesc"))
    .addToggle((t2) => t2.setValue(plugin.settings.confirmPresetApply).onChange((v) => { plugin.settings.confirmPresetApply = v; plugin.commit(); }));

  new Setting(containerEl).setName(tr("settingsApplyPreset")).setDesc(tr("settingsApplyPresetDesc"))
    .addButton(function (b) { b.setButtonText(tr("settingsChoosePresetBtn")).onClick(function () { new ApplyPresetModal(plugin).open(); }); });

  new Setting(containerEl).setName(tr("settingsDangerZone")).setHeading();
  new Setting(containerEl).setName(tr("settingsResetEverything")).setDesc(tr("settingsResetEverythingDesc"))
    .addButton(function (b) {
      b.setWarning().setButtonText(tr("settingsResetEverythingBtn")).onClick(function () {
        new ConfirmModal(plugin.app, {
          lang: lang,
          title: tr("advResetEverythingTitle"),
          message: tr("advResetEverythingMsg"),
          confirmText: tr("advResetEverythingConfirm"), danger: true,
          onConfirm: function () {
            plugin.settings.scopes.forEach(function (s) { s.styles = {}; });
            plugin.settings.customClasses = [];
            plugin.commit(true);
            new Notice(tr("advAllReset"));
          },
        }).open();
      });
    });

  /* ============ ★ بخش تبلیغ کانال‌ها (اضافه شده) ★ ============ */
  this.renderChannelPromo(containerEl, tr);
  /* ========================================================== */
}
  renderChannelPromo(containerEl, tr) {
    const plugin = this.plugin;
    const lang = plugin.settings.language || "en";

    const heading = lang === "fa" ? "ارتباط با ما" : "Connect with us";
    new Setting(containerEl).setName(heading).setHeading();

    const desc = lang === "fa"
      ? "برای دریافت آخرین اخبار، آموزش‌ها و پشتیبانی، ما را در کانال‌های زیر دنبال کنید."
      : "Follow us for the latest news, tutorials and support.";
    const introEl = containerEl.createEl("p", { text: desc });
    introEl.style.color = "var(--text-muted)";
    introEl.style.marginBottom = "12px";

    const wrap = containerEl.createDiv({ cls: "uts-channel-promo-wrap" });

       const channels = [
      {
        id: "bale",
        label: lang === "fa" ? "کانال بله" : "Bale Channel",
        handle: "@obsidiantut",
        url: "https://ble.ir/obsidiantut",
        color: "#22A06B",
        svg: `<svg viewBox="0 0 64 64" width="20" height="20" aria-hidden="true"><defs><linearGradient id="hmBaleGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#3ED598"/><stop offset="100%" stop-color="#22A06B"/></linearGradient></defs><circle cx="32" cy="32" r="30" fill="url(#hmBaleGrad)"/><path d="M20 33 L28 41 L46 23" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      },
      {
        id: "telegram",
        label: lang === "fa" ? "کانال تلگرام" : "Telegram Channel",
        handle: "@obsidiantut",
        url: "https://t.me/obsidiantut",
        color: "#229ED9",
        svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/></svg>`,
      },
      {
        id: "youtube",
        label: lang === "fa" ? "کانال یوتیوب" : "YouTube Channel",
        handle: "@obsidiantut",
        url: "https://youtube.com/@obsidiantut",
        color: "#FF0000",
        svg: `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>`,
      },
    ];

    for (const ch of channels) {
      const card = wrap.createDiv({ cls: "uts-channel-card" });
      card.style.borderLeft = "4px solid " + ch.color;

          const iconWrap = card.createDiv({ cls: "uts-channel-icon" });
    iconWrap.style.background = ch.color + "1a";
    iconWrap.style.color = ch.color;
    iconWrap.innerHTML = ch.svg;

      const info = card.createDiv({ cls: "uts-channel-info" });
      info.createDiv({ cls: "uts-channel-name", text: ch.label });
      info.createDiv({ cls: "uts-channel-handle", text: ch.handle });

      const btn = card.createEl("button", {
        text: lang === "fa" ? "عضویت" : "Join",
        cls: "mod-cta",
      });
      btn.style.background = ch.color;
      btn.style.color = "#ffffff";
      btn.style.borderColor = ch.color;
      btn.onclick = () => {
        window.open(ch.url, "_blank");
      };
    }
  }
}

/* ================================================================== */
/* [main]                                                              */
/* ================================================================== */
module.exports = class UniversalTextStyleManagerPlugin extends Plugin {
  async onload() {
    this.settings = migrateSettings(await this.loadData());
    this.styleManager = new StyleManager();
    this.styleManager.apply(this.settings);
    this.styleManagerModal = null;

    // Inline UI CSS — no external style.css needed.
    this.uiStyleEl = document.createElement("style");
    this.uiStyleEl.id = "universal-text-style-manager-ui";
    this.uiStyleEl.textContent = UTS_PLUGIN_UI_CSS;
    document.head.appendChild(this.uiStyleEl);

    this._debouncedCommit = debounce(() => {
      this.styleManager.apply(this.settings);
      void this.saveData(this.settings);
    }, 250);

    const plugin = this;
    const tr = (k, v) => t(plugin.settings.language || "en", k, v);

    this.addRibbonIcon("palette", tr("ribbonTitle"), () => this.openStyleManager());

    this.addCommand({ id: "open-style-manager", name: tr("cmdOpenStyleManager"), callback: () => this.openStyleManager() });
    this.addCommand({
      id: "toggle-style-manager", name: tr("cmdToggleStyleManager"),
      checkCallback: (checking) => {
        if (!checking) {
          if (this.styleManagerModal) this.styleManagerModal.close();
          else this.openStyleManager();
        }
        return true;
      },
    });
    this.addCommand({
      id: "reset-current-style", name: tr("cmdResetCurrentStyle"),
      callback: () => {
        const scope = this.getCurrentScope();
        new ConfirmModal(this.app, {
          lang: this.settings.language,
          title: tr("cmdResetTitle"),
          message: tr("cmdResetMsg", { name: scope ? scope.name : "-" }),
          confirmText: tr("cmdResetConfirm"), danger: true,
          onConfirm: () => { if (scope) scope.styles = {}; this.commit(true); new Notice(tr("cmdResetDone")); },
        }).open();
      },
    });
    this.addCommand({ id: "apply-preset", name: tr("cmdApplyPreset"), callback: () => new ApplyPresetModal(this).open() });

    this.addSettingTab(new UTSSettingTab(this.app, this));

    this.registerEvent(this.app.workspace.on("editor-menu", (menu, editor) => {
      try {
        if (!menu) return;
        menu.addSeparator();
        menu.addItem((item) => {
          item.setTitle(tr("cmdOpenStyleManager")).setIcon("palette").onClick(() => { plugin.openStyleManager(); });
        });
        const hasSelection = !!(editor && typeof editor.somethingSelected === "function" && editor.somethingSelected());
        if (hasSelection) {
          const targets = [
            ["Bold", "bold"], ["Italic", "italic"], ["Highlight", "highlight"],
            ["Inline code", "inline-code"], ["Link", "link"], ["Tag", "tag"]
          ];
          for (const tg of targets) {
            menu.addItem((item) => {
              item.setTitle(tr("cmdStyleText", { what: tg[0] })).onClick(() => { plugin.openStyleManager(tg[1]); });
            });
          }
        }
      } catch (e) {
        console.error("[UTSM] context menu failed", e);
      }
    }));
  }

  commit(immediate) {
    if (immediate) {
      if (this._debouncedCommit) this._debouncedCommit.cancel();
      this.styleManager.apply(this.settings);
      void this.saveData(this.settings);
    } else {
      this._debouncedCommit();
    }
  }

  openStyleManager(focusElementId) {
    if (this.styleManagerModal) this.styleManagerModal.close();
    const modal = new StyleManagerModal(this, focusElementId);
    this.styleManagerModal = modal;
    modal.open();
  }

  getCurrentScope() {
    const scopes = this.settings.scopes || [];
    return scopes.find((s) => s.id === this.settings.activeScopeId)
        || scopes.find((s) => s.type === "vault")
        || scopes[0];
  }

  onunload() {
    if (this._debouncedCommit && this._debouncedCommit.cancel) this._debouncedCommit.cancel();
    if (this.styleManagerModal) { this.styleManagerModal.close(); this.styleManagerModal = null; }
    if (this.styleManager) this.styleManager.unload();
    if (this.uiStyleEl && this.uiStyleEl.parentNode) {
      this.uiStyleEl.parentNode.removeChild(this.uiStyleEl);
      this.uiStyleEl = null;
    }
  }
};