import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
    >
      <Link to={`/projects/${project.id}`} className="group block">
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative overflow-hidden border border-zinc-200 hover:border-black/30 transition-colors"
        >
          {/* Image */}
          <div className="relative overflow-hidden aspect-[4/3]">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full opacity-100 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <span className="flex items-center gap-2 text-white font-bold tracking-widest text-xs uppercase border border-white px-4 py-2">
                READ CASE STUDY <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase">{project.year}</span>
                <h3 className="text-lg font-black tracking-tight mt-1">{project.title}</h3>
                <p className="text-xs text-zinc-500 mt-1">{project.subtitle}</p>
              </div>
              <motion.div
                animate={{ rotate: 0 }}
                whileHover={{ rotate: 45 }}
                className="w-8 h-8 flex items-center justify-center border border-black/20 group-hover:bg-black group-hover:border-black transition-colors"
              >
                <ArrowUpRight className="w-4 h-4 group-hover:text-white transition-colors" />
              </motion.div>
            </div>

            {/* Stack Pills */}
            <div className="flex flex-wrap gap-1.5 mt-4">
              {project.stack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] font-bold tracking-wider uppercase bg-zinc-200 px-2 py-1"
                >
                  {tech}
                </span>
              ))}
              {project.stack.length > 4 && (
                <span className="text-[10px] font-bold tracking-wider uppercase bg-zinc-200 px-2 py-1">
                  +{project.stack.length - 4}
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
