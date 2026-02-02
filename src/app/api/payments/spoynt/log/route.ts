import { NextRequest, NextResponse } from 'next/server';

/**
 * API endpoint для сохранения логов оплаты в Vercel
 * Все логи будут видны в Vercel Dashboard → Logs
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event, referenceId, amount, timestamp, logs, error } = body;

    // Логируем в формате, который хорошо читается в Vercel
    console.log('═══════════════════════════════════════════════════════');
    console.log(`🟡 [PAYMENT EVENT] ${event}`);
    console.log('───────────────────────────────────────────────────────');
    console.log('Reference ID:', referenceId);
    console.log('Amount:', amount);
    console.log('Timestamp:', timestamp);
    
    if (error) {
      console.error('Error:', error);
    }
    
    if (logs && Array.isArray(logs)) {
      console.log('───────────────────────────────────────────────────────');
      console.log('Detailed logs:');
      logs.forEach((log: string) => console.log('  ', log));
    }
    
    console.log('═══════════════════════════════════════════════════════');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Failed to process log:', error);
    return NextResponse.json(
      { error: 'Failed to process log' },
      { status: 500 }
    );
  }
}
