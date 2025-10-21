/** @type {import('next').NextConfig} */
const nextConfig = {
  // Указываем правильную корневую директорию для Next.js
  outputFileTracingRoot: __dirname,
  // Явно включаем бинарники Chromium/puppeteer в серверлес-функции для PDF
  experimental: {
    outputFileTracingIncludes: {
      'src/app/api/pdf/**': [
        'node_modules/@sparticuz/chromium/**',
        'node_modules/puppeteer-core/**'
      ],
      'src/app/api/invoices/send/**': [
        'node_modules/@sparticuz/chromium/**',
        'node_modules/puppeteer-core/**'
      ]
    }
  },
  // Конфигурация для изображений (убираем неподдерживаемый localPatterns)
  images: {
    remotePatterns: [],
    // localPatterns не поддерживается в Next.js 15
    // Статические файлы в /public работают автоматически
  },
};

module.exports = nextConfig;