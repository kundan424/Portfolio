import { Reveal } from '../components/Animations';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

export default function Projects() {
  return (
    <div className="w-full pt-24">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-8 pt-20 pb-16 border-b border-black/5">
        <Reveal>
          <p className="text-xs font-bold tracking-[0.4em] text-zinc-400 uppercase mb-4">Selected Work</p>
          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.88]">
            PROJECTS
          </h1>
          <p className="text-sm text-zinc-500 mt-6 max-w-xl leading-relaxed">
            Production systems built with a focus on resilience, clean architecture, and real-world constraints.
            Click any project to read the full case study.
          </p>
        </Reveal>
      </div>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
