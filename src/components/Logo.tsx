import { Leaf } from 'lucide-react'

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="brand-logo" aria-label="共创增长 CoGrow">
      <span className="brand-logo__mark"><Leaf size={compact ? 17 : 21} strokeWidth={1.8} /></span>
      <span><strong>共创增长</strong>{!compact && <small>CoGrow</small>}</span>
    </div>
  )
}
