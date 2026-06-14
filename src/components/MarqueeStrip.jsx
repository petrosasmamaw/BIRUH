import Marquee from './Marquee'
import { productMarqueeImages, techStack } from '../data/siteContent'

function ProductMarquee() {
  return (
    <Marquee speed={36} className="marquee-strip__row marquee-strip__row--products">
      {productMarqueeImages.map((item) => (
        <div key={item.alt} className="marquee-strip__product">
          <img src={item.src} alt={item.alt} loading="lazy" />
        </div>
      ))}
    </Marquee>
  )
}

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
    <section className="marquee-strip relative z-10" aria-label="Products and technology">
      <div className="marquee-strip__inner space-y-4 sm:space-y-5">
        <div>
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-text-muted mb-2 text-center">
            Our Products
          </p>
          <ProductMarquee />
        </div>
        <div>
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-text-muted mb-2 text-center">
            Tech We Use
          </p>
          <TechMarquee />
        </div>
      </div>
    </section>
  )
}
