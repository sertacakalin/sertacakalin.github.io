import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import './FloatingDock.css'

const MotionLink = motion.a
const MotionBox = motion.div
const MotionSpan = motion.span

function DockIcon({ mouseX, item, isActive }) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const sizeTransform = useTransform(distance, [-120, 0, 120], [44, 62, 44])
  const iconTransform = useTransform(distance, [-120, 0, 120], [18, 26, 18])
  const size = useSpring(sizeTransform, { mass: 0.1, stiffness: 180, damping: 14 })
  const iconSize = useSpring(iconTransform, { mass: 0.1, stiffness: 180, damping: 14 })

  const Icon = item.icon

  return (
    <MotionLink
      ref={ref}
      href={item.href}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
      aria-label={item.label}
      className={`dock-icon${isActive ? ' dock-icon--active' : ''}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <MotionSpan
          className="dock-tooltip"
          initial={{ opacity: 0, y: 6, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0 }}
        >
          {item.label}
        </MotionSpan>
      )}
      <MotionSpan className="dock-icon__glyph" style={{ width: iconSize, height: iconSize }}>
        <Icon />
      </MotionSpan>
    </MotionLink>
  )
}

export default function FloatingDock({ items, activeSection }) {
  const mouseX = useMotionValue(Infinity)

  return (
    <nav className="dock-wrapper" aria-label="Ana menü">
      <MotionBox
        className="dock"
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {items.map((item) => (
          <DockIcon
            key={item.label}
            mouseX={mouseX}
            item={item}
            isActive={!item.external && item.href === `#${activeSection}`}
          />
        ))}
      </MotionBox>
    </nav>
  )
}
