import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Terminal, Database, Server, ArrowRight, Code, GitBranch, Layers, Award } from 'lucide-react';
import { Reveal } from '../components/Animations';
import { projects } from '../data/projects';

const stats = [
  { value: '+600', label: 'LeetCode Solved', icon: Code },
  { value: '04', label: 'Featured Projects', icon: Layers },
  { value: '02', label: 'Experience Roles', icon: GitBranch },
  { value: '8.44', label: 'CGPA — GGU', icon: Award },
];

const services = [
  { icon: null, label: 'Spring Boot', dot: true },
  { icon: Terminal, label: 'React & TS' },
  { icon: Database, label: 'PostgreSQL' },
  { icon: Server, label: 'Docker / CI-CD' },
];

export default function Home() {
  const navigate = useNavigate();

  const goToSkills = () => {
    navigate('/experience', { state: { scrollTo: 'skills-section' } });
  };

  return (
    <div className="w-full">
      {/* ── HERO ── */}
      <section className="relative min-h-screen pt-24 overflow-hidden flex items-center justify-center">
        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-y-0 left-[10%] w-px bg-black/5" />
          <div className="absolute inset-y-0 left-[75%] w-px bg-black/5" />
          <div className="absolute inset-x-0 top-[30%] h-px bg-black/5" />
        </div>

        {/* Pulsing circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] pointer-events-none z-0">
          {[300, 400, 510].map((size, i) => (
            <motion.div
              key={size}
              animate={{ scale: [0.95, 1.1], opacity: [0.08, 0.22] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.3, repeatType: 'mirror', ease: 'easeInOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/20"
              style={{ width: size, height: size }}
            />
          ))}
        </div>

        {/* Spinning badge */}
        <Reveal className="absolute top-32 right-[12%] lg:right-[20%] z-20 rotate-12 bg-black text-white rounded-full w-28 h-28 flex items-center justify-center">
          <svg className="animate-spin-slow w-full h-full" viewBox="0 0 100 100">
            <path id="curve" d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
            <text fill="currentColor" fontSize="9.5" fontWeight="700" letterSpacing="2">
              <textPath href="#curve" startOffset="0%">CODE IS ARCHITECTURE • CODE IS ARCHITECTURE •</textPath>
            </text>
          </svg>
          <Code2 className="absolute w-5 h-5 text-white" />
        </Reveal>

        {/* Barcode */}
        <Reveal delay={0.2} className="absolute bottom-24 left-[10%] z-20 flex flex-col gap-1">
          <div className="barcode w-20 h-10 opacity-70" />
          <span className="font-mono text-[10px] font-bold tracking-[0.2em]">CS-2027</span>
        </Reveal>

        {/* Hero typography */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 flex flex-col items-center text-center mt-8">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.4em] text-zinc-500 uppercase mb-6">
              Final-Year CS Undergraduate · Full-Stack Engineer
            </p>
            <h1 className="text-6xl lg:text-[7.5rem] font-black leading-[0.88] tracking-tighter text-black mix-blend-multiply">
              <span className="block">FULL-STACK</span>
              <span className="block text-transparent" style={{ WebkitTextStroke: '2px black' }}>ENGINEER</span>
              
            </h1>
          </Reveal>

          <Reveal delay={0.3} className="flex items-center gap-6 mt-10">
            <Link
              to="/projects"
              className="bg-black text-white px-8 py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors"
            >
              VIEW PROJECTS
            </Link>
            <Link
              to="/contact"
              className="border border-black text-black px-8 py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
            >
              GET IN TOUCH
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── EXPERTISE BANNER ── */}
      <section className="relative z-20 border-y border-zinc-300 bg-[#f2f2f2]">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-zinc-300 text-xs font-bold tracking-widest uppercase">
          {services.map(({ icon: Icon, label, dot }, i) => (
            <Reveal
              key={label}
              delay={i * 0.08}
              className="p-8 flex items-center justify-center gap-3 hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              {dot ? <div className="w-2.5 h-2.5 rounded-full bg-current" /> : Icon && <Icon className="w-5 h-5" />}
              {label}
            </Reveal>
          ))}

          {/* ── ALL SKILLS: real button, navigates to Experience → skills section ── */}
          <motion.button
            onClick={goToSkills}
            whileHover={{ backgroundColor: '#18181b' }}
            className="p-8 flex items-center justify-center gap-3 bg-black text-bla hover:text-white
                       col-span-2 md:col-span-1 waveform-bg
                       text-xs font-bold tracking-widest uppercase cursor-pointer
                       border-none outline-none"
          >
            ALL SKILLS <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </section>

      {/* ── STATS & PROJECTS ── */}
      <section className="py-32 px-8 max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Stats */}
        <div className="lg:col-span-3 flex flex-col justify-center gap-12 pr-8 border-r border-black/5">
          {stats.map(({ value, label, icon: Icon }, i) => (
            <Reveal key={label} delay={i * 0.1}>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-5xl font-black tracking-tighter">{value}</span>
                <Icon className="w-8 h-8 text-zinc-300" />
              </div>
              <p className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">{label}</p>
            </Reveal>
          ))}
        </div>

        {/* Project cards grid */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-6 items-center">
          {projects.slice(0, 4).map((project, idx) => {
            const offsets = ['mt-12', '-mt-12', 'mt-4', '-mt-4'];
            return (
              <Reveal key={project.id} delay={idx * 0.1} className={offsets[idx]}>
                <motion.div
                  animate={{ y: [-5, 5] }}
                  transition={{ repeat: Infinity, duration: 3 + idx * 0.4, repeatType: 'mirror', ease: 'easeInOut' }}
                >
                  <Link to={`/projects/${project.id}`} className="group block relative aspect-square overflow-hidden cursor-pointer">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover  opacity-100 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-end justify-end p-4">
                      <span className="text-white font-black text-xs tracking-widest uppercase">{project.title}</span>
                    </div>
                  </Link>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        {/* Quote */}
        <div className="lg:col-span-4">
          <Reveal delay={0.4} className="relative bg-zinc-100 p-10 h-full flex flex-col justify-center min-h-[320px] overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=600&q=80"
                alt=""
                className="w-full h-full object-cover mix-blend-multiply grayscale opacity-15"
              />
            </div>
            <div className="relative z-10 flex flex-col gap-5">
              <span className="text-5xl font-serif text-black/20 leading-none select-none">&ldquo;</span>
              <p className="text-base font-medium leading-relaxed">
                Experienced across the full delivery lifecycle — Spring Boot services, React frontends,
                Docker containers, database migrations, and CI/CD pipelines.
              </p>
              <div className="flex items-center gap-3 mt-2">
                <div className="w-8 h-[2px] bg-black" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Kundan Kumar</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
