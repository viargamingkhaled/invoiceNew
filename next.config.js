/** @type {import('next').NextConfig} */
const nextConfig = {
  // Указываем правильную корневую директорию для Next.js
  outputFileTracingRoot: __dirname,
  // Убираем экспериментальные флаги, чтобы не затягивать билд
  // Конфигурация для изображений (убираем неподдерживаемый localPatterns)
  images: {
    remotePatterns: [],
    // localPatterns не поддерживается в Next.js 15
    // Статические файлы в /public работают автоматически
  },
};

module.exports = nextConfig;