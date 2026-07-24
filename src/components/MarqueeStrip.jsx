import Marquee from './Marquee'
import { techStack } from '../data/siteContent'

function TechMarquee() {
  return (
    <Marquee speed={44} direction="right" className="marquee-strip__row marquee-strip__row--tech">
      {techStack.map((tech) => (
        <div key={tech.name} className="marquee-strip__tech">
          {tech.icon ? (
            <img src={tech.icon} alt="" className="marquee-strip__tech-icon" loading="lazy" />
          ) : (
            <span className="marquee-strip__tech-dot" aria-hidden="true" />
          )}
          <span className="font-mono text-[11px] sm:text-xs text-text-secondary whitespace-nowrap">
            {tech.name}
          </span>
        </div>
      ))}
    </Marquee>
  )
}

export default function MarqueeStrip() {
  return (
    <section className="marquee-strip relative z-10 pt-2 pb-1" aria-label="Our Roots — technology we use">
      <div className="marquee-strip__inner">
        <p className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-text-muted mb-3 text-center">
          Our Roots
        </p>
        <TechMarquee />
      </div>
    </section>
  )
}
