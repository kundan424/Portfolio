import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ─────────────────────────────────────────────────────────────────
   Real glass magnifier — tracks mouse, renders a circular lens
   with a zoomed clone of the text inside it. Native cursor hidden.
───────────────────────────────────────────────────────────────── */
const LENS_RADIUS = 66;   // px — radius of the glass circle
const ZOOM        = 2.4;  // zoom factor

function MagnifyName() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive]   = useState(false);
  const [mouse,  setMouse]    = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const D  = LENS_RADIUS * 2;
  // Top-left corner of the lens in container-local coords
  const lx = mouse.x - LENS_RADIUS;
  const ly = mouse.y - LENS_RADIUS;

  // Inside the lens the clone must be positioned so that
  // the original point (mouse.x, mouse.y) appears at (LENS_R, LENS_R).
  // With transformOrigin:'0 0' and scale(ZOOM):
  //   left + mouse.x * ZOOM = LENS_R  →  left  = LENS_R - mouse.x * ZOOM
  //   top  + mouse.y * ZOOM = LENS_R  →  top   = LENS_R - mouse.y * ZOOM
  const cloneLeft = LENS_RADIUS - mouse.x * ZOOM;
  const cloneTop  = LENS_RADIUS - mouse.y * ZOOM;

  return (
    <div
      ref={containerRef}
      className="relative inline-block select-none"
      style={{ cursor: active ? 'none' : 'default' }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onMouseMove={handleMouseMove}
    >
      {/* ── Real text ── */}
      <h2
        className="font-serif italic leading-none text-[#F5F4E8] relative z-10"
        style={{ fontSize: 'clamp(2.5rem, 10vw, 9rem)' }}
      >
        Kundan Kumar
      </h2>

      {active && (
        <>
          {/* ── Lens body (overflow:hidden clips the zoomed clone) ── */}
          <div
            aria-hidden
            style={{
              position:     'absolute',
              left:         lx,
              top:          ly,
              width:        D,
              height:       D,
              borderRadius: '50%',
              overflow:     'hidden',
              pointerEvents:'none',
              zIndex:        50,
            }}
          >
            {/* Dark tinted background so the magnified text pops */}
            <div
              style={{
                position:       'absolute',
                inset:          0,
                background:     'rgba(5,5,5,0.78)',
                backdropFilter: 'blur(0.4px)',
              }}
            />

            {/* Zoomed text clone */}
            <h2
              aria-hidden
              className="font-serif italic text-[#F5F4E8] absolute whitespace-nowrap"
              style={{
                fontSize:        'clamp(2.5rem, 10vw, 9rem)',
                lineHeight:      1,
                transform:       `scale(${ZOOM})`,
                transformOrigin: '0 0',
                left:            cloneLeft,
                top:             cloneTop,
                userSelect:      'none',
              }}
            >
              Kundan Kumar
            </h2>

            {/* Inner top-left glass shine */}
            <div
              style={{
                position:     'absolute',
                inset:        0,
                borderRadius: '50%',
                background:   'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 35%, transparent 65%)',
                pointerEvents:'none',
              }}
            />

            {/* Inner bottom-right shadow gradient (depth) */}
            <div
              style={{
                position:     'absolute',
                inset:        0,
                borderRadius: '50%',
                background:   'radial-gradient(circle at 70% 72%, rgba(0,0,0,0.35) 0%, transparent 55%)',
                pointerEvents:'none',
              }}
            />
          </div>

          {/* ── Glass ring border (separate so it's not clipped) ── */}
          <div
            aria-hidden
            style={{
              position:     'absolute',
              left:          lx,
              top:           ly,
              width:         D,
              height:        D,
              borderRadius: '50%',
              border:        '2.5px solid rgba(255,255,255,0.28)',
              boxShadow:     '0 8px 40px rgba(0,0,0,0.6), inset 0 0 18px rgba(255,255,255,0.06)',
              pointerEvents: 'none',
              zIndex:         51,
            }}
          />

          {/* ── Magnifier handle ── */}
          <div
            aria-hidden
            style={{
              position:        'absolute',
              left:             mouse.x + LENS_RADIUS * 0.62,
              top:              mouse.y + LENS_RADIUS * 0.62,
              width:            6,
              height:           36,
              borderRadius:    '0 0 4px 4px',
              background:      'linear-gradient(to bottom, rgba(255,255,255,0.55), rgba(255,255,255,0.25))',
              transform:       'rotate(45deg)',
              transformOrigin: 'top center',
              pointerEvents:   'none',
              zIndex:           51,
              boxShadow:       '0 2px 8px rgba(0,0,0,0.5)',
            }}
          />
        </>
      )}
    </div>
  );
}

/* ─── Footer ────────────────────────────────────────────────────── */
export default function Footer() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <footer ref={ref} className="relative bg-[#000000] text-[#F5F4E8] overflow-hidden mt-32">

      {/* Wave divider */}
      <div className="absolute top-0 left-0 w-full z-30 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none"
          className="w-full h-[8vw] min-h-[60px] fill-[#f2f2f2] block">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>

      {/* Full-bleed background portrait — blended, full size */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/assets/footer_image.jpg"
          alt=""
          className="w-full h-full object-cover object-top"
          style={{
            mixBlendMode:         'luminosity',
            opacity:               0.8,
            maskImage:            'linear-gradient(to bottom, transparent 0%, black 22%, black 68%, transparent 100%)',
            WebkitMaskImage:      'linear-gradient(to bottom, transparent 0%, black 22%, black 68%, transparent 100%)',
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center pt-40 pb-0 px-4">
        {/* Giant name with magnify-glass effect */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 1.1, ease: 'easeOut', delay: 0.2 }}
          className="w-full text-center mb-4 overflow-visible"
        >
          <MagnifyName />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-[#F5F4E8]/90 text-xs font-bold tracking-[0.35em] uppercase mb-20"
        >
          Full-Stack Engineer · Java &amp; TypeScript · Open to Opportunities
        </motion.p>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8
                      flex flex-col md:flex-row justify-between items-center gap-6
                      border-t border-[#F5F4E8]/10 pt-8 pb-12">
        <p className="text-xs font-bold tracking-widest text-[#F5F4E8]/90 uppercase">
          © 2026 React + Framer Motion
        </p>

        <nav className="flex items-center gap-6 text-xs font-bold tracking-widest text-[#F5F4E8]/90 uppercase">
          {[['/', 'Home'], ['/experience', 'Experience'], ['/projects', 'Projects'], ['/contact', 'Contact']].map(([to, label]) => (
            <Link key={to} to={to} className="hover:text-[#F5F4E8] transition-colors duration-200">{label}</Link>
          ))}
        </nav>

        <div className="flex items-center gap-5 text-[#F5F4E8]/90">
          {[
            { href: 'https://github.com/kundan424', Icon: Github },
            { href: 'https://www.linkedin.com/in/kundan-kumar-9455b42b1/', Icon: Linkedin },
            { href: 'mailto:kundankumar64355@gmail.com', Icon: Mail },
          ].map(({ href, Icon }) => (
            <a key={href} href={href} target="_blank" rel="noreferrer"
              className="hover:text-[#F5F4E8] transition-colors duration-200 hover:scale-110 transform">
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
