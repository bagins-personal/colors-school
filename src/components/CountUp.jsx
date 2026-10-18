import { useEffect, useRef, useState } from 'react'

export default function CountUp({ to, duration = 1400 }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    let raf
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (t) => {
        const p = Math.min(1, (t - start) / duration)
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [to, duration])

  return <span ref={ref}>{n}</span>
}
