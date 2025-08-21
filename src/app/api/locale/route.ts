import { NextResponse } from 'next/server';
import { locales, type Locale } from '@/i18n/config';
import { setUserLocale } from '@/services/locale';

export async function POST(request: Request) {
  try {
    const { locale } = await request.json();
    if (!locales.includes(locale)) {
      return NextResponse.json({ ok: false, error: 'Invalid locale' }, { status: 400 });
    }
    await setUserLocale(locale as Locale);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Malformed request' }, { status: 400 });
  }
}