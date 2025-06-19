/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",          // 根目录 App 文件
    "./src/**/*.{js,jsx,ts,tsx}",     // 你源码目录
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins')
}

