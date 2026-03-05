'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { Brain, Sparkles, Mic, Settings, BarChart3, ChevronRight, PlayCircle, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import TiltCard from './components/TiltCard';
import InfiniteMarquee from './components/InfiniteMarquee';

export default function LandingPage() {
  const heroRef = useRef<HTMLElement>(null);
  const helixaRef = useRef<HTMLDivElement>(null);
  const [showStickyCta, setShowStickyCta] = useState(false);

  /* ===== Scroll progress bar ===== */
  const { scrollYProgress } = useScroll();

  /* ===== Sticky CTA: show after hero scrolls out ===== */
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  useMotionValueEvent(heroProgress, 'change', (v) => {
    setShowStickyCta(v > 0.8);
  });

  /* ===== Helixa parallax: scale + opacity driven by scroll ===== */
  const { scrollYProgress: helixaProgress } = useScroll({
    target: helixaRef,
    offset: ['start end', 'end start'],
  });
  const helixaScale = useTransform(helixaProgress, [0, 0.5, 1], [0.92, 1, 1.02]);
  const helixaOpacity = useTransform(helixaProgress, [0, 0.3, 1], [0.5, 1, 1]);

  /* ===== Speaker tooltip state ===== */
  const [activeSpeaker, setActiveSpeaker] = useState<number | null>(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const speakers = [
    {
      name: 'Андрей Горбунов',
      bio: '10 лет в автоматизации бизнеса. Расскажет реальные истории внедрения.',
      achievements: ['Автоматизировал 200+ бизнесов', 'CTO в AI-консалтинге', 'Эксперт в Битрикс24 + ИИ'],
      gradient: 'from-purple-500 via-fuchsia-500 to-orange-500',
      seed: 'speaker1',
    },
    {
      name: 'Игорь Масленников',
      bio: 'AI-визионер, архитектор интеллектуальных систем, создатель ИИ-операционки Helixa.',
      achievements: ['Создатель Helixa OS', 'AI-архитектор с 15+ лет опыта', 'Основатель AI Dev Team'],
      gradient: 'from-blue-500 via-cyan-500 to-emerald-500',
      seed: 'speaker2',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden selection:bg-purple-500/30">
      {/* ===== Scroll Progress Bar ===== */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-500 via-fuchsia-500 to-blue-500 z-[60] scroll-progress"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Background Neon Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] bg-indigo-600/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[800px] h-[400px] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0B0F19]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <span className="font-display font-bold text-white text-lg">AI</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight">Dev Team</span>
          </div>
          <Link
            href="#register"
            className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-medium text-sm hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 cursor-pointer"
          >
            Занять место
          </Link>
        </div>
      </header>

      <main className="pt-32 pb-20">
        {/* Hero Section */}
        <section ref={heroRef} className="max-w-7xl mx-auto px-6 pt-12 pb-24 flex flex-col items-center text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
          >
            <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium text-gray-300">Бесплатный онлайн-мастер-класс</span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8 max-w-5xl"
          >
            Как конвертировать ИИ в деньги: <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-blue-400 shimmer-text">
              реальные инструменты,
            </span>
            <br className="hidden md:block" /> эффективность которых можно посчитать.
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mb-12 leading-relaxed"
          >
            ИИ встраивается только в выстроенные процессы. Если процессов нет — он ускорит ваш хаос.
            Узнайте, как правильно заложить AI-фундамент, избавиться от рутины и обойти конкурентов.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <Link
              href="#register"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-5 text-lg font-semibold text-white transition-all duration-300 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl hover:scale-105 hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] active:scale-95 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 cursor-pointer"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10">Иду на вебинар и хочу разбор</span>
              <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </section>

        {/* Storytelling Section */}
        <section className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">Почему внедрение ИИ часто проваливается?</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/50 to-orange-500/50" />
              <div className="text-red-400 font-semibold mb-4 text-sm uppercase tracking-wider">Миф</div>
              <p className="text-xl text-gray-300 leading-relaxed">
                Купили подписку за $20, думали нейросеть заменит сотрудников и сделает всё сама.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500/50 to-teal-500/50" />
              <div className="text-emerald-400 font-semibold mb-4 text-sm uppercase tracking-wider">Реальность</div>
              <p className="text-xl text-gray-300 leading-relaxed">
                ИИ — это инструмент автоматизации. Невозможно автоматизировать бардак. Начните с оцифровки знаний.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Cases Section — with TiltCard */}
        <section className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
              Боль <span className="text-purple-400">➔</span> AI-Автоматизация <span className="text-blue-400">➔</span> Результат
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            <motion.div variants={fadeInUp}>
              <TiltCard className="h-full p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 border border-purple-500/30">
                  <Mic className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-display">Голосовой ИИ &quot;Речка&quot;</h3>
                <p className="text-gray-400 leading-relaxed">
                  Как анализ звонков вскрывает, где менеджеры реально сливают деньги.
                </p>
              </TiltCard>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <TiltCard className="h-full p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 border border-blue-500/30">
                  <Settings className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-display">SEO-мультиагентка</h3>
                <p className="text-gray-400 leading-relaxed">
                  Как мы запустили конвейер контента без штата копирайтеров.
                </p>
              </TiltCard>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <TiltCard className="h-full p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10">
                <div className="w-14 h-14 rounded-2xl bg-fuchsia-500/20 flex items-center justify-center mb-6 border border-fuchsia-500/30">
                  <BarChart3 className="w-7 h-7 text-fuchsia-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 font-display">Аналитика без IT-отдела</h3>
                <p className="text-gray-400 leading-relaxed">
                  Дашборд в Битриксе за 30 минут своими руками без долгих интеграций.
                </p>
              </TiltCard>
            </motion.div>
          </motion.div>
        </section>

        {/* ===== Infinite Marquee ===== */}
        <InfiniteMarquee />

        {/* Helixa & FOMO Section — with parallax */}
        <section className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">
              Helixa — «Второй мозг» вашей компании
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Точечные инструменты работают, только если ими управлять системно. Helixa собирает регламенты, знания и процессы в единый ИИ-хаб.
            </p>
          </motion.div>

          <motion.div
            ref={helixaRef}
            style={{ scale: helixaScale, opacity: helixaOpacity }}
            className="relative p-1 rounded-3xl bg-gradient-to-r from-red-500 via-orange-500 to-red-500 shadow-[0_0_40px_rgba(239,68,68,0.3)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 blur-xl opacity-50 rounded-3xl" />
            <div className="relative bg-[#0B0F19] p-8 md:p-12 rounded-[22px] text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 font-display uppercase tracking-wide">
                ПОЧЕМУ НАЧИНАТЬ НУЖНО УЖЕ СЕГОДНЯ?
              </h3>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Нейросети развиваются с бешеной скоростью. Связанность знаний не формируется за один день. Тот, кто заложит фундамент сейчас — сможет завтра в 1 клик подключать новые AI-модели. <span className="text-red-400 font-semibold">Кто будет ждать — безнадежно отстанет.</span>
              </p>
            </div>
          </motion.div>
        </section>

        {/* Live Razbor Section */}
        <section className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="p-10 md:p-16 rounded-[40px] bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-white/10 backdrop-blur-xl text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px]" />

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 text-red-500 mb-8 motion-safe:animate-pulse">
                <PlayCircle className="w-8 h-8" />
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-8">
                <span className="relative inline-flex h-4 w-4 mr-2 align-middle"><span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span></span> Прямо в эфире: Live-разбор вашего бизнеса
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                Оставьте заявку ниже. Мы выберем зрителя, загрузим его проблему в наш Deep Think ИИ &quot;Арина&quot; и прямо на вебинаре выдадим пошаговый план AI-трансформации. Пишите в чате трансляции <strong className="text-white">«РАЗБОР»!</strong>
              </p>
            </div>
          </motion.div>
        </section>

        {/* Speakers Section — with hover tooltips */}
        <section className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold">Спикеры</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {speakers.map((speaker, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 flex flex-col items-center text-center cursor-pointer"
                onMouseEnter={() => setActiveSpeaker(i)}
                onMouseLeave={() => setActiveSpeaker(null)}
              >
                <div className={`w-32 h-32 rounded-full mb-6 bg-gradient-to-tr ${speaker.gradient} p-1 transition-transform duration-300 ${activeSpeaker === i ? 'scale-110' : ''}`}>
                  <div className="w-full h-full rounded-full bg-[#0B0F19] overflow-hidden relative">
                    <div className={`absolute inset-0 opacity-50 bg-[url('https://picsum.photos/seed/${speaker.seed}/200/200')] bg-cover bg-center mix-blend-luminosity`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] to-transparent" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2 font-display">{speaker.name}</h3>
                <p className="text-gray-400 leading-relaxed">{speaker.bio}</p>

                {/* Achievements tooltip */}
                <div
                  className={`absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full w-72 p-4 rounded-2xl bg-[#161B2E]/95 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300 z-20 ${activeSpeaker === i
                    ? 'opacity-100 pointer-events-auto translate-y-[calc(100%+8px)]'
                    : 'opacity-0 pointer-events-none translate-y-[calc(100%+20px)]'
                    }`}
                >
                  <div className="text-xs text-purple-400 font-semibold uppercase tracking-wider mb-2">Достижения</div>
                  <ul className="space-y-1.5">
                    {speaker.achievements.map((a, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                        <Sparkles className="w-3.5 h-3.5 text-purple-400 mt-0.5 shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Registration Form */}
        <section id="register" className="max-w-3xl mx-auto px-6 py-24 relative z-10 scroll-mt-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="p-8 md:p-12 rounded-[40px] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl relative"
          >
            <div className="absolute -top-px left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />

            <div className="text-center mb-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Оставьте заявку на участие и шанс на бесплатный разбор
              </h2>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Имя</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                    placeholder="Иван Иванов"
                  />
                </div>
                <div>
                  <label htmlFor="telegram" className="block text-sm font-medium text-gray-400 mb-2">Telegram</label>
                  <input
                    type="text"
                    id="telegram"
                    className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                    placeholder="@username"
                  />
                </div>
                <div>
                  <label htmlFor="niche" className="block text-sm font-medium text-gray-400 mb-2">Ваша Ниша</label>
                  <input
                    type="text"
                    id="niche"
                    className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500/50 transition-all"
                    placeholder="Например: E-commerce"
                  />
                </div>
                <div>
                  <label htmlFor="routine" className="block text-sm font-medium text-gray-400 mb-2">Какая главная рутина сжирает ваше время?</label>
                  <textarea
                    id="routine"
                    rows={4}
                    className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all resize-none"
                    placeholder="Опишите процесс, который отнимает больше всего времени..."
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-5 px-8 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 cursor-pointer"
              >
                Забронировать место
              </button>
            </form>
          </motion.div>
        </section>
      </main>

      {/* ===== Sticky CTA (appears after scrolling past hero) ===== */}
      <motion.div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={showStickyCta ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <Link
          href="#register"
          className="group flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-[0_8px_32px_rgba(139,92,246,0.4)] hover:shadow-[0_8px_48px_rgba(139,92,246,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50"
        >
          Занять место
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </motion.div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0B0F19]/80 backdrop-blur-lg relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <p className="text-gray-500 text-sm">
              © 2026 AI Dev Team. Все права защищены.
            </p>
            <a href="https://aidevteam.ru/" target="_blank" rel="noopener noreferrer" className="text-gray-500 text-sm hover:text-gray-300 transition-colors block">
              Официальный сайт: aidevteam.ru
            </a>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center md:items-start text-center md:text-left">
            <Link href="/privacy" className="text-gray-500 text-sm hover:text-gray-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded-sm">
              Политика конфиденциальности
            </Link>
            <Link href="/terms" className="text-gray-500 text-sm hover:text-gray-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded-sm">
              Пользовательское соглашение
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
