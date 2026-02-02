# Настройка Vercel для проекта Ventira

## Проблема
Vercel получает ошибку "Pull Vercel Environment Information Process completed with exit code 1" при попытке получить информацию о среде.

## Решение

### 1. Проверьте подключение репозитория в Vercel
Убедитесь, что в Vercel подключен правильный репозиторий:
- **Правильный URL**: `https://github.com/viargamingkhaled/invoice.git`
- **Ветка**: `main`

### 2. Настройте переменные окружения в Vercel
Перейдите в настройки проекта Vercel → Environment Variables и добавьте:

```
NEXT_PUBLIC_APP_URL=https://your-project-name.vercel.app
NEXT_PUBLIC_APP_NAME=Ventira
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=https://your-project-name.vercel.app
```

### 3. Проверьте статус деплоя
После настройки переменных окружения:
1. Перейдите в панель Vercel
2. Найдите ваш проект
3. Проверьте статус последнего деплоя
4. Если есть ошибки, проверьте логи сборки

### 4. Возможные проблемы и решения

#### Проблема: "Pull Vercel Environment Information" ошибка
**Решение**: 
- Проверьте права доступа к репозиторию GitHub
- Убедитесь, что репозиторий публичный или Vercel имеет доступ к приватному репозиторию
- Пересоздайте подключение репозитория в Vercel

#### Проблема: Ошибки сборки
**Решение**:
- Проверьте, что все зависимости установлены в `package.json`
- Убедитесь, что файл `src/lib/currency.ts` существует
- Проверьте экспорты в `src/components/ui/Button.tsx` и `src/components/ui/Input.tsx`

### 5. Файлы, которые должны быть в репозитории
```
src/lib/currency.ts - файл с экспортом TOKENS_PER_GBP
src/components/ui/Button.tsx - с экспортом { Button }
src/components/ui/Input.tsx - с экспортом { Input }
src/lib/plans.ts - с экспортом типа Currency
```

### 6. Команды для проверки
```bash
# Проверить подключение к репозиторию
git remote -v

# Проверить статус
git status

# Проверить последние коммиты
git log --oneline -5

# Проверить наличие файлов
git ls-files | grep -E "(currency|button|input)"
```

## Контакты
Если проблемы persist, проверьте:
1. Логи сборки в Vercel
2. Настройки репозитория GitHub
3. Переменные окружения в Vercel

