import type { ElementType } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Zap, AlertTriangle, Lightbulb } from 'lucide-react';
import { projects } from '../data/projects';
import { Reveal } from '../components/Animations';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  if (!project) return <Navigate to="/projects" replace />;

  const others = projects.filter((p) => p.id !== id).slice(0, 2);

  return (
    <div className="w-full pt-24 bg-[#f2f2f2]">
      {/* Back link */}
      <div className="max-w-4xl mx-auto px-8 pt-12">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-zinc-400 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> BACK TO PROJECTS
        </Link>
      </div>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-8 pt-10 pb-12">
        <Reveal>
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.stack.map((t) => (
              <span key={t} className="text-[10px] font-bold tracking-wider uppercase bg-zinc-200 px-2 py-1">{t}</span>
            ))}
          </div>
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.9] mb-4">
            {project.title}
          </h1>
          <p className="text-lg text-zinc-500 font-medium mb-8">{project.subtitle}</p>

          <div className="flex items-center gap-4">
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-2.5 text-xs font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors">
                <Github className="w-4 h-4" /> GITHUB
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 border border-black text-black px-6 py-2.5 text-xs font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-colors">
                <ExternalLink className="w-4 h-4" /> LIVE SITE
              </a>
            )}
            <span className="ml-auto text-xs font-bold tracking-widest text-zinc-400 uppercase">{project.year}</span>
          </div>
        </Reveal>
      </div>

      {/* Cover Image */}
      <Reveal className="max-w-5xl mx-auto px-8 mb-16">
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="overflow-hidden border border-zinc-200"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-[40vh] md:h-[55vh] object-cover"
          />
        </motion.div>
      </Reveal>

      {/* Article Body */}
      <article className="max-w-3xl mx-auto px-8 space-y-20 pb-24">

        {/* Overview */}
        <Reveal>
          <section>
            <SectionLabel icon={Zap} label="Overview" />
            <p className="text-base md:text-lg text-zinc-700 leading-[1.85] mt-4">{project.overview}</p>
          </section>
        </Reveal>

        {/* How I Built It */}
        <Reveal>
          <section>
            <SectionLabel icon={Zap} label="How I Built It" />
            <ol className="mt-6 space-y-8">
              {project.howIBuilt.map((step, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-5%' }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: 'easeOut' }}
                  className="flex gap-5"
                >
                  <span className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-black">
                    {i + 1}
                  </span>
                  <p className="text-sm md:text-base text-zinc-700 leading-[1.85] pt-1">{step}</p>
                </motion.li>
              ))}
            </ol>
          </section>
        </Reveal>

        {/* Features */}
        <Reveal>
          <section>
            <SectionLabel icon={CheckCircle2} label="Key Features" />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-5%' }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="flex items-start gap-3 border border-zinc-200 p-4 hover:border-black/30 transition-colors group"
                >
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-zinc-300 group-hover:text-black transition-colors" />
                  <span className="text-sm text-zinc-700 leading-relaxed">{feature}</span>
                </motion.div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Challenges */}
        <Reveal>
          <section>
            <SectionLabel icon={AlertTriangle} label="Challenges I Faced" />
            <div className="mt-6 space-y-5">
              {project.challenges.map((challenge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-5%' }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="border-l-2 border-black pl-5 py-1"
                >
                  <p className="text-sm md:text-base text-zinc-700 leading-[1.85]">{challenge}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Learnings */}
        <Reveal>
          <section className="bg-black text-[#F5F4E8] p-10">
            <SectionLabel icon={Lightbulb} label="What I Learned" light />
            <p className="text-base md:text-lg leading-[1.85] mt-4 text-[#F5F4E8]/80">{project.learnings}</p>
          </section>
        </Reveal>
      </article>

      {/* More Projects */}
      {others.length > 0 && (
        <section className="max-w-4xl mx-auto px-8 py-16 border-t border-black/5">
          <Reveal>
            <p className="text-xs font-bold tracking-widest uppercase text-zinc-400 mb-8">More Projects</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {others.map((p) => (
                <Link key={p.id} to={`/projects/${p.id}`} className="group block border border-zinc-200 hover:border-black/40 transition-colors overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <div className="p-5">
                    <h4 className="font-black tracking-tight">{p.title}</h4>
                    <p className="text-xs text-zinc-400 mt-1">{p.subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </section>
      )}
    </div>
  );
}

function SectionLabel({ icon: Icon, label, light = false }: { icon: ElementType; label: string; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 mb-2 ${light ? 'text-[#F5F4E8]/60' : 'text-zinc-400'}`}>
      <Icon className="w-4 h-4" />
      <span className="text-[10px] font-black tracking-widest uppercase">{label}</span>
      <div className={`flex-1 h-px ${light ? 'bg-[#F5F4E8]/10' : 'bg-black/5'}`} />
    </div>
  );
}
