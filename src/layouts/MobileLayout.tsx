import { ArrowLeft, Leaf } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function MobileLayout({ children, backTo }: { children: React.ReactNode; backTo?: string }) {
  const navigate = useNavigate()
  return <div className="mobile-stage"><main className="mobile-app"><header className="mobile-header"><button aria-label="返回" onClick={() => backTo ? navigate(backTo) : navigate(-1)}><ArrowLeft size={19} /></button><div><Leaf size={17} /><strong>梧桐咖啡</strong></div><span>CoGrow</span></header>{children}</main></div>
}
