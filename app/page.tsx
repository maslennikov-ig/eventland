'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { Brain, Sparkles, Mic, Settings, BarChart3, ChevronRight, PlayCircle, Zap, ArrowRight, Users, X } from 'lucide-react';
import Link from 'next/link';
import TiltCard from './components/TiltCard';
import InfiniteMarquee from './components/InfiniteMarquee';

export default function LandingPage() {
  const heroRef = useRef<HTMLElement>(null);
  const helixaRef = useRef<HTMLDivElement>(null);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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
      photo: '/speakers/andrew.jpg',
    },
    {
      name: 'Игорь Масленников',
      bio: 'AI-визионер, архитектор интеллектуальных систем, создатель ИИ-операционки Helixa.',
      achievements: ['Создатель Helixa OS', 'AI-архитектор с 15+ лет опыта', 'Основатель AI Dev Team'],
      gradient: 'from-blue-500 via-cyan-500 to-emerald-500',
      photo: '/speakers/igor.png',
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-zinc-950 selection:bg-white/20">
      {/* ===== Scroll Progress Bar ===== */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-white/60 via-[#ffcd75]/80 to-white/40 z-[60] scroll-progress"
        style={{ scaleX: scrollYProgress }}
      />

      <main className="pb-20">
        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen">
          {/* ── Background image with gradient mask (from reference) ── */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center opacity-35"
            style={{
              backgroundImage: `url('https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/a72ca2f3-9dd1-4fe4-84ba-fe86468a5237_3840w.webp?w=1200&q=80')`,
              maskImage: 'linear-gradient(180deg, transparent, black 8%, black 72%, transparent)',
              WebkitMaskImage: 'linear-gradient(180deg, transparent, black 8%, black 72%, transparent)',
            }}
          />

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 flex items-center min-h-screen">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">

              {/* ── LEFT: Content ── */}
              <div className="flex flex-col items-start text-left pt-8">
                {/* Badge */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-md mb-8 transition-colors hover:bg-white/10"
                >
                  <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                    Бесплатный онлайн-мастер-класс
                  </span>
                </motion.div>

                {/* Heading — white-to-gold gradient + bottom mask */}
                <motion.h1
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tighter leading-[0.92] mb-8"
                  style={{
                    maskImage: 'linear-gradient(180deg, black 0%, black 82%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(180deg, black 0%, black 82%, transparent 100%)',
                  }}
                >
                  Как конвертировать ИИ в деньги:<br />
                  <span className="bg-gradient-to-br from-white via-white to-[#ffcd75] bg-clip-text text-transparent">
                    реальные инструменты,
                  </span><br />
                  которые работают.
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  className="text-lg text-zinc-400 mb-10 leading-relaxed max-w-xl"
                >
                  ИИ без выстроенных процессов ускоряет хаос, а не результат.
                  Узнайте, как правильно заложить AI-фундамент и обойти конкурентов.
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link
                    href="#register"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-zinc-950 transition-all hover:scale-[1.02] hover:bg-zinc-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                  >
                    Иду на вебинар и хочу разбор
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="#speakers"
                    className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 hover:border-white/20 focus:outline-none"
                  >
                    <PlayCircle className="w-4 h-4" />
                    Посмотреть спикеров
                  </Link>
                </motion.div>
              </div>

              {/* ── RIGHT: Stats Card + Marquee ── */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                className="hidden md:flex flex-col gap-6 lg:mt-12"
              >
                {/* Stats Card */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">
                  {/* White glow (from reference) */}
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />

                  <div className="relative z-10">
                    {/* Top stat */}
                    <div className="flex items-center gap-4 mb-8">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                        <BarChart3 className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold tracking-tight text-white">500+</div>
                        <div className="text-sm text-zinc-400">Внедрений ИИ в бизнес</div>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="space-y-3 mb-8">
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-400">Бизнес-сценариев с AI</span>
                        <span className="text-white font-medium">8 направлений</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800/50">
                        <div className="h-full w-full rounded-full bg-gradient-to-r from-white to-zinc-400" />
                      </div>
                    </div>

                    <div className="h-px w-full bg-white/10 mb-6" />

                    {/* Mini stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1 cursor-default">
                        <span className="text-xl font-bold text-white sm:text-2xl">1ч</span>
                        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium sm:text-xs">Эфир</span>
                      </div>
                      <div className="w-px h-full bg-white/10 mx-auto" />
                      <div className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1 cursor-default">
                        <span className="text-xl font-bold text-white sm:text-2xl">0₽</span>
                        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium sm:text-xs">Стоимость</span>
                      </div>
                      <div className="w-px h-full bg-white/10 mx-auto" />
                      <div className="flex flex-col items-center justify-center transition-transform hover:-translate-y-1 cursor-default">
                        <span className="text-xl font-bold text-white sm:text-2xl">15+</span>
                        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-medium sm:text-xs">Кейсов</span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mt-8 flex flex-wrap gap-2">
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-zinc-300">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        РЕГИСТРАЦИЯ ОТКРЫТА
                      </div>
                      <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium tracking-wide text-zinc-300">
                        <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        БЕСПЛАТНО
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tools Marquee Card */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 py-6 backdrop-blur-xl">
                  <p className="mb-4 px-8 text-xs font-medium uppercase tracking-wider text-zinc-500">Что разберём на практике</p>
                  <div
                    className="relative flex overflow-hidden"
                    style={{
                      maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
                      WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
                    }}
                  >
                    <div
                      className="flex gap-10 whitespace-nowrap px-4"
                      style={{ animation: 'marquee 30s linear infinite' }}
                    >
                      {[
                        { name: 'ChatGPT', icon: Brain },
                        { name: 'Маркетинг', icon: Zap },
                        { name: 'Claude Code', icon: Sparkles },
                        { name: 'Продажи', icon: BarChart3 },
                        { name: 'Gemini', icon: Brain },
                        { name: 'Аналитика', icon: Settings },
                        { name: 'Битрикс24', icon: Settings },
                        { name: 'Автоматизация', icon: Zap },
                        { name: 'amoCRM', icon: BarChart3 },
                        { name: 'Контент', icon: Sparkles },
                        { name: 'ChatGPT', icon: Brain },
                        { name: 'Маркетинг', icon: Zap },
                        { name: 'Claude Code', icon: Sparkles },
                        { name: 'Продажи', icon: BarChart3 },
                        { name: 'Gemini', icon: Brain },
                        { name: 'Аналитика', icon: Settings },
                        { name: 'Битрикс24', icon: Settings },
                        { name: 'Автоматизация', icon: Zap },
                        { name: 'amoCRM', icon: BarChart3 },
                        { name: 'Контент', icon: Sparkles },
                      ].map((tool, i) => (
                        <div key={i} className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-all cursor-default grayscale hover:grayscale-0">
                          <tool.icon className="h-5 w-5 text-white fill-current" />
                          <span className="text-base font-bold text-white tracking-tight">{tool.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Storytelling Section */}
        <section className="max-w-[1400px] mx-auto px-6 py-24 relative z-10">
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
        <section className="max-w-[1400px] mx-auto px-6 py-24 relative z-10">
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
        <section className="max-w-[1400px] mx-auto px-6 py-24 relative z-10">
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
        <section className="max-w-[1400px] mx-auto px-6 py-24 relative z-10">
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
        <section id="speakers" className="max-w-[1400px] mx-auto px-6 py-24 relative z-10 scroll-mt-20">
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
            className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto"
          >
            {speakers.map((speaker, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="relative p-12 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 flex flex-col items-center text-center cursor-pointer"
                onMouseEnter={() => setActiveSpeaker(i)}
                onMouseLeave={() => setActiveSpeaker(null)}
              >
                <div className={`w-48 h-48 rounded-full mb-6 bg-gradient-to-tr ${speaker.gradient} p-1 transition-transform duration-300 ${activeSpeaker === i ? 'scale-110' : ''}`}>
                  <div className="w-full h-full rounded-full bg-[#0B0F19] overflow-hidden relative">
                    <img src={speaker.photo} alt={speaker.name} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-2 font-display">{speaker.name}</h3>
                <p className="text-lg text-gray-400 leading-relaxed">{speaker.bio}</p>

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

            <form className="space-y-6" onSubmit={async (e) => {
              e.preventDefault();
              setFormStatus('loading');
              const form = e.currentTarget;
              const data = {
                name: (form.elements.namedItem('name') as HTMLInputElement).value,
                telegram: (form.elements.namedItem('telegram') as HTMLInputElement).value,
                niche: (form.elements.namedItem('niche') as HTMLInputElement).value,
                routine: (form.elements.namedItem('routine') as HTMLTextAreaElement).value,
              };
              try {
                const res = await fetch('/api/register', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data),
                });
                if (res.ok) {
                  setFormStatus('success');
                } else {
                  setFormStatus('error');
                }
              } catch {
                setFormStatus('error');
              }
            }}>
              {formStatus === 'success' ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-white mb-2">Спасибо!</h3>
                  <p className="text-gray-400">Ваша заявка принята. Мы свяжемся с вами в Telegram.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Имя</label>
                      <input
                        type="text"
                        id="name"
                        required
                        className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                        placeholder="Иван Иванов"
                      />
                    </div>
                    <div>
                      <label htmlFor="telegram" className="block text-sm font-medium text-gray-400 mb-2">Telegram</label>
                      <input
                        type="text"
                        id="telegram"
                        required
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

                  {formStatus === 'error' && (
                    <p className="text-red-400 text-sm text-center">Ошибка при отправке. Попробуйте ещё раз.</p>
                  )}

                  <button
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="w-full py-5 px-8 text-lg font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {formStatus === 'loading' ? 'Отправка...' : 'Забронировать место'}
                  </button>
                </>
              )}
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
        <div className="max-w-[1400px] mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <p className="text-gray-500 text-sm">
              © 2026 AI Dev Team. Все права защищены.
            </p>
            <a href="https://aidevteam.ru/" target="_blank" rel="noopener noreferrer" className="text-gray-500 text-sm hover:text-gray-300 transition-colors block">
              Официальный сайт: aidevteam.ru
            </a>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center md:items-start text-center md:text-left">
            <button onClick={() => setLegalModal('privacy')} className="text-gray-500 text-sm hover:text-gray-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded-sm cursor-pointer">
              Политика конфиденциальности
            </button>
            <button onClick={() => setLegalModal('terms')} className="text-gray-500 text-sm hover:text-gray-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 rounded-sm cursor-pointer">
              Пользовательское соглашение
            </button>
          </div>
        </div>
      </footer>

      {/* Legal Modal */}
      {legalModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setLegalModal(null)}
          onKeyDown={(e) => e.key === 'Escape' && setLegalModal(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#0B0F19] border border-white/10 p-8 md:p-12 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLegalModal(null)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>

            {legalModal === 'privacy' ? (
              <article className="prose prose-invert prose-sm max-w-none text-gray-300">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 font-display">Политика конфиденциальности</h2>
                <p className="text-gray-500 text-sm mb-6">Последнее обновление: {new Date().toLocaleDateString('ru-RU')}</p>
                <h3 className="text-lg font-bold text-white mt-6 mb-3">1. Общие положения</h3>
                <p>Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. №152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые Оператором (AI Dev Team).</p>
                <p>1.1. Оператор ставит своей важнейшей целью и условием осуществления своей деятельности соблюдение прав и свобод человека и гражданина при обработке его персональных данных.</p>
                <p>1.2. Настоящая политика применяется ко всей информации, которую Оператор может получить о посетителях веб-сайта https://aidevteam.ru/.</p>
                <h3 className="text-lg font-bold text-white mt-6 mb-3">2. Основные понятия</h3>
                <ul className="list-disc pl-6 space-y-1.5 mb-4">
                  <li><strong>Автоматизированная обработка ПДн</strong> — обработка персональных данных с помощью средств вычислительной техники.</li>
                  <li><strong>Веб-сайт</strong> — совокупность графических и информационных материалов, обеспечивающих их доступность в сети интернет.</li>
                  <li><strong>Оператор</strong> — юридическое или физическое лицо, организующее обработку персональных данных.</li>
                  <li><strong>Персональные данные</strong> — любая информация, относящаяся к определённому Пользователю веб-сайта.</li>
                  <li><strong>Пользователь</strong> — любой посетитель веб-сайта.</li>
                </ul>
                <h3 className="text-lg font-bold text-white mt-6 mb-3">3. Обрабатываемые данные</h3>
                <ul className="list-disc pl-6 space-y-1.5 mb-4">
                  <li>Фамилия, Имя, Отчество (по желанию)</li>
                  <li>Никнейм или идентификатор в Telegram</li>
                  <li>Сфера деятельности (ниша бизнеса)</li>
                  <li>Описание бизнес-процессов (рутины)</li>
                </ul>
                <h3 className="text-lg font-bold text-white mt-6 mb-3">4. Цели обработки</h3>
                <p>Информирование Пользователя посредством отправки сообщений; предоставление доступа к сервисам и материалам веб-сайта.</p>
                <h3 className="text-lg font-bold text-white mt-6 mb-3">5. Правовые основания</h3>
                <p>Оператор обрабатывает ПДн только в случае их заполнения и/или отправки Пользователем самостоятельно через формы на веб-сайте.</p>
                <h3 className="text-lg font-bold text-white mt-6 mb-3">6. Порядок хранения и защиты</h3>
                <p>Оператор обеспечивает сохранность ПДн и принимает все возможные меры, исключающие доступ к данным неуполномоченных лиц. ПДн никогда не будут переданы третьим лицам, за исключением случаев, связанных с исполнением действующего законодательства.</p>
                <h3 className="text-lg font-bold text-white mt-6 mb-3">7. Заключительные положения</h3>
                <p>Пользователь может получить любые разъяснения, обратившись к Оператору. Политика действует бессрочно до замены её новой версией.</p>
              </article>
            ) : (
              <article className="prose prose-invert prose-sm max-w-none text-gray-300">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 font-display">Пользовательское соглашение (Публичная оферта)</h2>
                <p className="text-gray-500 text-sm mb-6">Последнее обновление: {new Date().toLocaleDateString('ru-RU')}</p>
                <h3 className="text-lg font-bold text-white mt-6 mb-3">1. Общие положения</h3>
                <p>1.1. Настоящее Пользовательское соглашение регулирует отношения между проектом &quot;AI Dev Team&quot; (далее — Администрация) и любым лицом, посещающим веб-сайт или использующим его сервисы (далее — Пользователь).</p>
                <p>1.2. Использование сервисов означает безоговорочное согласие Пользователя с настоящим Соглашением. Настоящее Соглашение является публичной офертой согласно ст. 437 ГК РФ.</p>
                <h3 className="text-lg font-bold text-white mt-6 mb-3">2. Предмет соглашения</h3>
                <p>Администрация предоставляет Пользователю доступ к бесплатным или платным материалам, вебинарам и прочей информации. Заполнение любой формы означает акцепт настоящей оферты и согласие на обработку ПДн.</p>
                <h3 className="text-lg font-bold text-white mt-6 mb-3">3. Права и обязанности</h3>
                <p><strong>Пользователь обязуется:</strong></p>
                <ul className="list-disc pl-6 space-y-1.5 mb-4">
                  <li>Предоставлять достоверные данные при заполнении форм.</li>
                  <li>Не использовать автоматизированные скрипты для сбора информации.</li>
                  <li>Соблюдать имущественные и неимущественные права авторов.</li>
                </ul>
                <p><strong>Администрация вправе:</strong></p>
                <ul className="list-disc pl-6 space-y-1.5 mb-4">
                  <li>Изменять оформление, содержание или приостанавливать работу сайта.</li>
                  <li>Посылать информационные сообщения по оставленным реквизитам.</li>
                  <li>Модерировать и отклонять заявки без объяснения причин.</li>
                </ul>
                <h3 className="text-lg font-bold text-white mt-6 mb-3">4. Согласие на обработку ПДн</h3>
                <p>В соответствии со ст. 9 №152-ФЗ, Пользователь, нажимая кнопку &quot;Забронировать место&quot;, свободно даёт согласие на обработку своих персональных данных. Согласие действует бессрочно и может быть отозвано.</p>
                <h3 className="text-lg font-bold text-white mt-6 mb-3">5. Ответственность</h3>
                <p>Администрация не несёт ответственности за убытки, возникшие в связи с использованием материалов. Все материалы носят информационно-консультационный характер.</p>
                <h3 className="text-lg font-bold text-white mt-6 mb-3">6. Заключительные положения</h3>
                <p>Все споры подлежат разрешению в соответствии с законодательством РФ. Соглашение может быть изменено без специального уведомления.</p>
              </article>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
