/** @type {import('next').NextConfig} */
const nextConfig = {
  // Указываем правильную корневую директорию для Next.js
  outputFileTracingRoot: __dirname,
  // Конфигурация для изображений (убираем неподдерживаемый localPatterns)
  images: {
    remotePatterns: [],
    // localPatterns не поддерживается в Next.js 15
    // Статические файлы в /public работают автоматически
  },
};

module.exports = nextConfig;