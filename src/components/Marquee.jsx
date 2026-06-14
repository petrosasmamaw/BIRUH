export default function Marquee({
  children,
  speed = 35,
  direction = 'left',
  className = '',
  pauseOnHover = false,
}) {
  return (
    <div
      className={`marquee ${pauseOnHover ? 'marquee--pause-hover' : ''} ${className}`}
      data-direction={direction}
    >
      <div
        className="marquee__track"
        style={{ '--marquee-duration': `${speed}s` }}
      >
        <div className="marquee__group">{children}</div>
        <div className="marquee__group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
