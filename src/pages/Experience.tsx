import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Users, ExternalLink } from 'lucide-react';
import { Reveal } from '../components/Animations';

const experiences = [
  {
    company: 'Veterans India',
    role: 'Backend Developer Intern',
    period: 'Oct 2025 – Dec 2025',
    type: 'Internship · Remote, India',
    color: 'bg-emerald-400',
    bullets: [
      'Built REST APIs with Spring Boot, standardising DTO validation and response structures; integrated with the frontend to deliver volunteer onboarding ahead of sprint deadlines.',
      'Hardened APIs with authentication filters, request validation, and sanitised data flows to mitigate injection and unauthorized-access risks.',
    ],
    stack: ['Spring Boot', 'REST APIs', 'JWT', 'Java'],
  },
  {
    company: 'SkyInvestments',
    role: 'Freelance Full-Stack Developer',
    period: 'Jan 2026',
    type: 'Freelance · Live Production',
    color: 'bg-blue-400',
    bullets: [
      'Delivered a production-ready investment consulting web platform from concept to deployment within a 5-day stakeholder turnaround.',
      'Configured role-based session workflows with NextAuth and eliminated redundant DB lookups via an in-memory Redis caching layer.',
    ],
    stack: ['Next.js', 'TypeScript', 'NextAuth', 'Redis', 'PostgreSQL'],
    liveUrl: 'https://skyinvestments.live',
  },
];

const skills = {
  Backend: ['Spring Boot', 'REST APIs', 'Microservices', 'Java 21'],
  Frontend: ['React', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS'],
  'Data & Messaging': ['PostgreSQL', 'Redis', 'Apache Kafka', 'Flyway'],
  'DevOps & Tools': ['Docker', 'Docker Compose', 'Nginx', 'GitHub Actions', 'Testcontainers', 'Swagger / OpenAPI'],
  Foundations: ['Data Structures & Algorithms', 'Operating Systems', 'OOP', 'Computer Networks'],
  Languages: ['Java', 'JavaScript', 'TypeScript', 'Python', 'C'],
};

const achievements = [
  {
    icon: Award,
    title: '+600 Algorithmic Problems',
    desc: 'Solved across LeetCode and other competitive platforms, covering arrays, graphs, DP, trees, and systems.',
  },
  {
    icon: Users,
    title: 'Google Developer Groups on Campus (GDGC)',
    desc: 'Core contributor in OS and CP tracks; mentored students and led workshops on OS internals and algorithmic problem-solving.',
  },
];

export default function Experience() {
  const location = useLocation();

  useEffect(() => {
    // When navigated from ALL SKILLS button, scroll to the skills section
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!target) return;
    // Give the page a moment to paint before scrolling
    const t = setTimeout(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
    return () => clearTimeout(t);
  }, [location.state]);

  return (
    <div className="w-full pt-24">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-8 pt-20 pb-16 border-b border-black/5">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.4em] text-zinc-400 uppercase mb-4">Career Journey</p>
          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.88]">
            EXPERIENCE
          </h1>
        </Reveal>
      </div>

      {/* Experience Timeline */}
      <section className="max-w-6xl mx-auto px-8 py-20">
        <Reveal>
          <div className="flex items-center gap-3 mb-12">
            <Briefcase className="w-5 h-5" />
            <span className="text-xs font-bold tracking-widest uppercase">Work Experience</span>
          </div>
        </Reveal>

        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 0.15}>
              <motion.div
                whileHover={{ x: 6 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 border border-zinc-200 p-8 hover:border-black/30 transition-colors bg-[#f2f2f2] group"
              >
                {/* Left meta */}
                <div className="md:col-span-3">
                  <div className={`inline-block w-2.5 h-2.5 rounded-full ${exp.color} mb-4`} />
                  <p className="text-xs font-bold tracking-widest text-zinc-400 uppercase">{exp.period}</p>
                  <p className="text-[10px] tracking-wide text-zinc-400 mt-1">{exp.type}</p>
                </div>

                {/* Right content */}
                <div className="md:col-span-9">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-black tracking-tight">{exp.company}</h3>
                      <p className="text-sm font-medium text-zinc-500 mt-0.5">{exp.role}</p>
                    </div>
                    {exp.liveUrl && (
                      <a href={exp.liveUrl} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase border border-black/20 px-3 py-1.5 hover:bg-black hover:text-white transition-colors">
                        LIVE <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <ul className="mt-5 space-y-3">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className="flex gap-3 text-sm text-zinc-600 leading-relaxed">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black/30 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {exp.stack.map((t) => (
                      <span key={t} className="text-[10px] font-bold tracking-wider uppercase bg-zinc-200 px-2 py-1">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Skills Grid */}
      <section id="skills-section" className="max-w-6xl mx-auto px-8 py-16 border-t border-black/5">
        <Reveal>
          <div className="flex items-center gap-3 mb-12">
            <span className="text-xs font-bold tracking-widest uppercase">Technical Skills</span>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, items], i) => (
            <Reveal key={category} delay={i * 0.08}>
              <div className="border border-zinc-200 p-6 hover:border-black/30 transition-colors">
                <p className="text-[10px] font-black tracking-widest uppercase text-zinc-400 mb-4">{category}</p>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05, backgroundColor: '#000', color: '#fff' }}
                      className="text-xs font-medium bg-zinc-100 px-3 py-1.5 cursor-default transition-colors"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="max-w-6xl mx-auto px-8 py-16 border-t border-black/5">
        <Reveal>
          <div className="flex items-center gap-3 mb-12">
            <GraduationCap className="w-5 h-5" />
            <span className="text-xs font-bold tracking-widest uppercase">Education</span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <motion.div
            whileHover={{ x: 6 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 border border-zinc-200 p-8 hover:border-black/30 transition-colors"
          >
            <div className="md:col-span-3">
              <div className="inline-block w-2.5 h-2.5 rounded-full bg-violet-400 mb-4" />
              <p className="text-xs font-bold tracking-widest text-zinc-400 uppercase">2023 – 2027</p>
              <p className="text-[10px] text-zinc-400 mt-1">Bilaspur, Chhattisgarh</p>
            </div>
            <div className="md:col-span-9">
              <h3 className="text-2xl font-black tracking-tight">Guru Ghasidas University</h3>
              <p className="text-sm font-medium text-zinc-500 mt-0.5">B.Tech in Computer Science Engineering</p>
              <div className="flex items-center gap-6 mt-4">
                <div>
                  <p className="text-3xl font-black tracking-tight">8.44</p>
                  <p className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">CGPA</p>
                </div>
                <div className="w-px h-12 bg-zinc-200" />
                <div>
                  <p className="text-xs font-medium text-zinc-600 leading-relaxed">Data Structures & Algorithms · OOP<br />Operating Systems · Computer Networks</p>
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </section>

      {/* Achievements */}
      <section className="max-w-6xl mx-auto px-8 py-16 border-t border-black/5 mb-8">
        <Reveal>
          <div className="flex items-center gap-3 mb-12">
            <Award className="w-5 h-5" />
            <span className="text-xs font-bold tracking-widest uppercase">Achievements & Leadership</span>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <div className="border border-zinc-200 p-8 hover:border-black/30 transition-colors">
                <Icon className="w-8 h-8 mb-4 text-zinc-400" />
                <h4 className="text-base font-black tracking-tight mb-2">{title}</h4>
                <p className="text-sm text-zinc-500 leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
