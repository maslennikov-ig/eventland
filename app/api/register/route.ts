import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, telegram, niche, routine } = body;

        // Validate required fields
        if (!name || !telegram) {
            return NextResponse.json(
                { success: false, error: 'Пожалуйста, заполните имя и Telegram' },
                { status: 400 }
            );
        }

        // Prepare Telegram message
        const message = `
🎯 *Новая заявка на вебинар (event.aidevteam.ru)*

👤 *Имя:* ${name}
📱 *Telegram:* ${telegram}
${niche ? `🏢 *Ниша:* ${niche}` : ''}
${routine ? `⏳ *Главная рутина:*\n${routine}` : ''}

🕒 *Время:* ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}
`.trim();

        // Send to Telegram
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!botToken || !chatId) {
            console.error('Telegram credentials not configured');
            return NextResponse.json(
                { success: false, error: 'Сервис временно недоступен.' },
                { status: 500 }
            );
        }

        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

        let telegramSuccess = false;
        try {
            const telegramResponse = await fetch(telegramUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'Markdown',
                }),
            });

            if (!telegramResponse.ok) {
                const errorData = await telegramResponse.json();
                console.error('Telegram API error:', errorData);
            } else {
                telegramSuccess = true;
            }
        } catch (telegramError) {
            console.error('Telegram send failed:', telegramError);
        }

        return NextResponse.json({
            success: true,
            message: 'Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.',
            _debug: process.env.NODE_ENV === 'development' ? { telegramSuccess } : undefined,
        });
    } catch (error) {
        console.error('Error in register API:', error);
        return NextResponse.json(
            { success: false, error: 'Произошла ошибка. Попробуйте позже.' },
            { status: 500 }
        );
    }
}
