// postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

// # 1. حذف Tailwind الحالي
// npm uninstall tailwindcss @tailwindcss/postcss

// # 2. تثبيت Tailwind v3
// npm install -D tailwindcss@^3.4.0 postcss autoprefixer

// # 3. إنشاء ملفات config جديدة (إذا حُذفت)
// npx tailwindcss init -p

// export default {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// }