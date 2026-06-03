import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Icon from "@/components/ui/icon";

const STARS_COUNT = 160;
const SHOOTING_STARS_COUNT = 6;

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

const stars = Array.from({ length: STARS_COUNT }, (_, i) => ({
  id: i,
  x: randomBetween(0, 100),
  y: randomBetween(0, 100),
  r: randomBetween(0.4, 1.6),
  opacity: randomBetween(0.3, 1),
  delay: randomBetween(0, 6),
  duration: randomBetween(2, 5),
}));

const shootingStars = Array.from({ length: SHOOTING_STARS_COUNT }, (_, i) => ({
  id: i,
  startX: randomBetween(10, 70),
  startY: randomBetween(5, 45),
  angle: randomBetween(25, 45),
  length: randomBetween(120, 220),
  delay: randomBetween(0, 14),
  duration: randomBetween(1.2, 2.2),
}));

const Index = () => {
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});


  useEffect(() => {
    const observers: Record<string, IntersectionObserver> = {};

    const sectionIds = ["hero", "features", "how", "pricing", "cta"];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      observers[id] = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [id]: true }));
            observers[id].unobserve(element);
          }
        },
        { threshold: 0.15 }
      );

      observers[id].observe(element);
    });

    return () => {
      Object.values(observers).forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-2xl border-b border-accent/20 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center">
            <div className="font-display font-bold text-2xl tracking-tighter bg-gradient-to-r from-white via-accent to-accent/80 bg-clip-text text-transparent">
              Бортовой журнал
            </div>
          </div>
          <nav className="hidden md:flex gap-10 text-sm font-medium">
            <a href="#features" className="text-muted-foreground hover:text-white transition-colors">
              Возможности
            </a>
            <a href="#how" className="text-muted-foreground hover:text-white transition-colors">
              Как это работает
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-white transition-colors">
              Тарифы
            </a>
          </nav>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 text-sm font-medium border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all">
              Войти
            </button>
            <button className="px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-accent via-accent to-accent/80 text-white rounded-full hover:shadow-lg hover:shadow-accent/40 transition-all font-semibold">
              Начать
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-32 px-6 min-h-screen flex items-center overflow-hidden">


        {/* Static SVG stars */}
        <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
          {stars.map((s) => (
            <circle
              key={s.id}
              cx={`${s.x}%`}
              cy={`${s.y}%`}
              r={s.r}
              fill="white"
              opacity={s.opacity}
              style={{
                animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
              }}
            />
          ))}
        </svg>

        {/* Shooting stars */}
        <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: "none" }}>
          {shootingStars.map((ss) => {
            const rad = (ss.angle * Math.PI) / 180;
            const dx = Math.cos(rad) * ss.length;
            const dy = Math.sin(rad) * ss.length;
            const x2 = ss.startX + (dx / window.innerWidth) * 100;
            const y2 = ss.startY + (dy / window.innerHeight) * 100;
            return (
              <line
                key={ss.id}
                x1={`${ss.startX}%`}
                y1={`${ss.startY}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="url(#shootGrad)"
                strokeWidth="1.5"
                strokeLinecap="round"
                style={{
                  animation: `shoot ${ss.duration}s ${ss.delay}s ease-in infinite`,
                  opacity: 0,
                }}
              />
            );
          })}
          <defs>
            <linearGradient id="shootGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="60%" stopColor="white" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Nebula glow blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-700/20 rounded-full blur-3xl animate-nebula" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-700/15 rounded-full blur-3xl animate-nebula" style={{ animationDelay: "4s" }} />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-indigo-600/10 rounded-full blur-2xl animate-nebula" style={{ animationDelay: "8s" }} />
        </div>

        {/* Rotating planet */}
        <div className="absolute pointer-events-none" style={{ bottom: "-80px", right: "-80px", width: "420px", height: "420px" }}>
          <div className="relative w-full h-full">
            <svg viewBox="0 0 420 420" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="planetGrad" cx="38%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="40%" stopColor="#4f46e5" />
                  <stop offset="80%" stopColor="#1e1b4b" />
                  <stop offset="100%" stopColor="#0f0c29" />
                </radialGradient>
                <radialGradient id="shinGrad" cx="30%" cy="28%" r="40%">
                  <stop offset="0%" stopColor="white" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </radialGradient>
                {/* Затемнение правой половины (ночная сторона) */}
                <radialGradient id="nightGrad" cx="72%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#000" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#000" stopOpacity="0" />
                </radialGradient>
                <clipPath id="planetClip">
                  <circle cx="210" cy="210" r="180" />
                </clipPath>
              </defs>

              {/* Planet base */}
              <circle cx="210" cy="210" r="180" fill="url(#planetGrad)" />

              {/* Текстура поверхности — горизонтальное вращение через animateTransform */}
              <g clipPath="url(#planetClip)" opacity="0.4">
                {/* Полосы — удвоены по ширине для бесшовного цикла */}
                <g>
                  <animateTransform attributeName="transform" type="translate" from="0 0" to="-360 0" dur="20s" repeatCount="indefinite" />
                  {[140, 168, 192, 215, 238, 262, 285, 308].map((cy, i) => (
                    <ellipse key={i} cx="570" cy={cy} rx="570" ry={10 + (i % 3) * 5}
                      fill={["#a78bfa","#6d28d9","#818cf8","#4f46e5","#7c3aed","#a78bfa","#6366f1","#818cf8"][i]}
                    />
                  ))}
                </g>
                {/* Континентальные пятна */}
                <g>
                  <animateTransform attributeName="transform" type="translate" from="0 0" to="-360 0" dur="20s" repeatCount="indefinite" />
                  <ellipse cx="300" cy="190" rx="55" ry="30" fill="#c4b5fd" opacity="0.3" />
                  <ellipse cx="500" cy="230" rx="40" ry="22" fill="#c4b5fd" opacity="0.25" />
                  <ellipse cx="700" cy="200" rx="35" ry="18" fill="#c4b5fd" opacity="0.2" />
                  <ellipse cx="150" cy="260" rx="30" ry="16" fill="#818cf8" opacity="0.2" />
                  <ellipse cx="620" cy="270" rx="45" ry="20" fill="#7c3aed" opacity="0.2" />
                </g>
              </g>

              {/* Дневной свет */}
              <circle cx="210" cy="210" r="180" fill="url(#shinGrad)" />
              {/* Ночная сторона */}
              <circle cx="210" cy="210" r="180" fill="url(#nightGrad)" clipPath="url(#planetClip)" />
              {/* Атмосфера */}
              <circle cx="210" cy="210" r="180" fill="none" stroke="#a78bfa" strokeWidth="5" opacity="0.3" />
              <circle cx="210" cy="210" r="187" fill="none" stroke="#7c3aed" strokeWidth="10" opacity="0.12" />
            </svg>
          </div>
          {/* Planet glow */}
          <div className="absolute inset-0 rounded-full bg-violet-600/20 blur-3xl scale-90" />
        </div>

        <div className="absolute inset-0 bg-background/40" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div
              className={`transition-all duration-1000 ${visibleSections["hero"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="mb-8 inline-block">
                <span className="text-xs font-medium tracking-widest text-accent/80 uppercase">
                  Ваше личное пространство для мыслей
                </span>
              </div>
              <h1 className="text-6xl lg:text-7xl font-display font-black leading-tight mb-8 tracking-tighter">
                <span className="bg-gradient-to-br from-white via-white to-accent/40 bg-clip-text text-transparent">
                  Пиши. Храни.
                </span>
                <br />
                <span className="text-accent">Помни всё.</span>
              </h1>
              <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-xl font-light">
                Личный дневник с единой базой для всех записей. До 200 пользователей — каждый видит только своё, всё надёжно хранится в одном месте.
              </p>
              <div className="flex gap-4 mb-12 flex-col sm:flex-row">
                <button className="group px-8 py-4 bg-gradient-to-r from-accent to-accent/90 text-white rounded-full hover:shadow-2xl hover:shadow-accent/50 transition-all font-semibold text-lg flex items-center gap-3 justify-center">
                  Начать вести дневник
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </button>
                <button className="px-8 py-4 border border-accent/40 rounded-full hover:border-accent/70 hover:bg-accent/10 transition-all font-medium text-lg text-white">
                  Смотреть демо
                </button>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                <div>
                  <div className="text-2xl font-bold text-accent mb-2">200</div>
                  <p className="text-sm text-white/60">Пользователей</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-2">∞</div>
                  <p className="text-sm text-white/60">Записей в дневнике</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent mb-2">100%</div>
                  <p className="text-sm text-white/60">Конфиденциально</p>
                </div>
              </div>
            </div>

            <div
              className={`relative h-96 lg:h-[550px] transition-all duration-1000 flex items-center justify-center ${visibleSections["hero"] ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-transparent to-transparent rounded-3xl blur-3xl animate-pulse" />
              <div className="relative z-10 w-full max-w-sm lg:max-w-md">
                <div className="bg-card/80 backdrop-blur-sm border border-accent/20 rounded-2xl p-8 shadow-2xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-accent/60" />
                    <div className="text-sm text-muted-foreground">3 июня 2026</div>
                  </div>
                  <p className="text-white/90 text-lg leading-relaxed mb-6 font-light italic">
                    "Сегодня был удивительный день. Наконец решился записать то, что давно хотел сказать..."
                  </p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 text-xs bg-accent/20 text-accent rounded-full">настроение</span>
                    <span className="px-3 py-1 text-xs bg-white/10 text-white/60 rounded-full">размышления</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["features"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Возможности</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4 mb-6">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Всё для ваших мыслей
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "BookOpen",
                title: "Личные записи",
                desc: "Каждый пользователь видит только свои записи — полная конфиденциальность",
              },
              {
                icon: "Search",
                title: "Быстрый поиск",
                desc: "Найдите любую запись по дате, тегу или ключевому слову за секунду",
              },
              {
                icon: "Tag",
                title: "Теги и категории",
                desc: "Организуйте записи по темам: настроение, события, идеи, цели",
              },
              {
                icon: "Shield",
                title: "Приватность",
                desc: "Единая база, но каждый пользователь изолирован — никто не видит чужого",
              },
              {
                icon: "Calendar",
                title: "Хронология",
                desc: "Листайте записи по датам и вспоминайте прошедшие моменты",
              },
              {
                icon: "Smartphone",
                title: "Везде с вами",
                desc: "Открывайте дневник с телефона, планшета или компьютера",
              },
            ].map((item, i) => {
              const isVisible = visibleSections["features"];
              return (
                <div
                  key={i}
                  className={`group p-8 border border-accent/10 hover:border-accent/40 rounded-2xl bg-card/50 hover:bg-card/80 transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/20 group-hover:bg-accent/30 flex items-center justify-center mb-6 transition-colors">
                    <Icon name={item.icon} size={22} className="text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["how"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Процесс</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Просто начни писать
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Регистрация", desc: "Создайте аккаунт за 30 секунд — только email и пароль" },
              { num: "02", title: "Первая запись", desc: "Открывайте пустую страницу и пишите всё что думаете" },
              { num: "03", title: "Организация", desc: "Добавляйте теги и настроение, чтобы легче находить записи" },
              { num: "04", title: "Возвращайтесь", desc: "Листайте историю и наблюдайте за своим ростом" },
            ].map((step, i) => {
              const isVisible = visibleSections["how"];
              return (
                <div
                  key={i}
                  className={`relative transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="group bg-accent/10 hover:bg-accent/20 border border-accent/20 hover:border-accent/40 rounded-2xl p-8 h-full flex flex-col justify-between transition-all backdrop-blur-sm cursor-pointer">
                    <div>
                      <div className="text-5xl font-display font-black text-accent mb-4 group-hover:scale-110 transition-transform">
                        {step.num}
                      </div>
                      <h3 className="font-display font-bold text-xl mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-accent/40 to-transparent" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-6 bg-accent/5">
        <div className="max-w-5xl mx-auto">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${visibleSections["pricing"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <span className="text-xs font-medium tracking-widest text-accent/60 uppercase">Тарифы</span>
            <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mt-4">
              <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
                Простые цены
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Базовый",
                price: "Бесплатно",
                features: ["До 50 записей", "Поиск по тексту", "Базовые теги", "Доступ с любого устройства"],
                highlight: false,
              },
              {
                name: "Полный доступ",
                price: "299 ₽/мес",
                features: ["Неограниченные записи", "Расширенный поиск", "Теги и категории", "История настроений и аналитика"],
                highlight: true,
              },
            ].map((plan, i) => {
              const isVisible = visibleSections["pricing"];
              return (
                <div
                  key={i}
                  className={`group relative transition-all duration-700 ${
                    isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                  } ${plan.highlight ? "md:scale-105" : ""}`}
                  style={{ transitionDelay: `${i * 200}ms` }}
                >
                  {plan.highlight && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent via-accent to-accent/60 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition" />
                  )}
                  <div
                    className={`relative p-10 border rounded-2xl h-full flex flex-col justify-between backdrop-blur-sm transition-all ${
                      plan.highlight ? "border-accent/40 bg-accent/10" : "border-accent/10 bg-card/50 hover:bg-card/80"
                    }`}
                  >
                    <div>
                      <h3 className="font-display font-bold text-2xl mb-2">{plan.name}</h3>
                      <p className="text-4xl font-black text-accent mb-8">{plan.price}</p>
                      <ul className="space-y-4 mb-10">
                        {plan.features.map((f, j) => (
                          <li key={j} className="flex gap-3 text-sm items-start">
                            <ArrowRight className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                            <span className="text-foreground/80">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      className={`w-full px-6 py-4 rounded-xl font-semibold transition-all ${
                        plan.highlight
                          ? "bg-gradient-to-r from-accent to-accent/80 text-white hover:shadow-xl hover:shadow-accent/40"
                          : "border border-accent/20 hover:border-accent/40 hover:bg-accent/5"
                      }`}
                    >
                      {plan.highlight ? "Попробовать 7 дней бесплатно" : "Начать бесплатно"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-32 px-6">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${visibleSections["cta"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2 className="text-5xl lg:text-6xl font-display font-black tracking-tighter mb-6">
            <span className="bg-gradient-to-r from-white via-white to-accent/40 bg-clip-text text-transparent">
              Готовы начать?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 font-light max-w-2xl mx-auto">
            Присоединяйтесь и начните фиксировать важные моменты своей жизни уже сегодня.
          </p>
          <button className="group px-10 py-5 bg-gradient-to-r from-accent to-accent/90 text-white rounded-full hover:shadow-2xl hover:shadow-accent/40 transition-all font-bold text-lg flex items-center gap-3 mx-auto">
            Создать свой дневник
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-accent/10 py-12 px-6 bg-background/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <p>© 2026 Личный дневник — Ваше приватное пространство</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">
              Конфиденциальность
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Условия
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Поддержка
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Контакты
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;