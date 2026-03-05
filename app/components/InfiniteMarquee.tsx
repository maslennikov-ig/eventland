'use client';

const keywords = [
    'AI', 'Automation', 'Deep Think', 'ROI', 'Helixa', 'Efficiency',
    'NLP', 'Agents', 'LLM', 'Качество', 'Прибыль', 'Масштаб',
];

export default function InfiniteMarquee() {
    const items = keywords.map((word, i) => (
        <span key={i} className="flex items-center gap-6 mx-6">
            <span className="text-2xl md:text-3xl font-display font-bold text-white/[0.07] uppercase tracking-widest whitespace-nowrap select-none">
                {word}
            </span>
            <span className="w-2 h-2 rounded-full bg-purple-500/20 shrink-0" />
        </span>
    ));

    return (
        <div className="relative w-full overflow-hidden py-10 -my-4" aria-hidden="true">
            <div className="flex animate-marquee w-max">
                {/* Duplicate for seamless loop */}
                {items}
                {items}
            </div>
        </div>
    );
}
