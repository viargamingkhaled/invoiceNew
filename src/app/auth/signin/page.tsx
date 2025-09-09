import { Suspense } from 'react';
import SignInClient from './SignInClient'; // <-- Мы импортируем ВАШ компонент

export const metadata = { title: 'Sign in' };

// Это простая заглушка, которая будет показываться на мгновение
// пока загружается основной компонент формы
function LoadingSkeleton() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md p-6 space-y-4 bg-white border rounded-lg shadow-lg animate-pulse">
                <div className="h-8 bg-slate-200 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-slate-200 rounded w-full mx-auto"></div>
                <div className="pt-6 space-y-4">
                    <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                    <div className="h-10 bg-slate-200 rounded"></div>
                    <div className="h-12 bg-slate-300 rounded"></div>
                </div>
            </div>
        </div>
    );
}

export default function SignInPage() {
  return (
    // Suspense говорит Next.js: "Покажи LoadingSkeleton,
    // а когда браузер будет готов, загрузи SignInClient"
    <Suspense fallback={<LoadingSkeleton />}>
      <SignInClient />
    </Suspense>
  );
}
