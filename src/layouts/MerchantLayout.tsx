import { BarChart3, Bell, FileCheck2, FileText, Gift, LayoutDashboard, Lightbulb, Megaphone, Sparkles, Store, Users, WalletCards } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { routes } from '../app/routes'
import { Logo } from '../components/Logo'

const nav=[[routes.workbench,'经营工作台',LayoutDashboard],[routes.analytics,'增长分析',BarChart3],[routes.campaigns,'共创活动',Megaphone],[routes.content,'内容中心',FileText],[routes.contributors,'共创者中心',Users],[routes.rewards,'奖励与归因',Gift]] as const
export function MerchantLayout(){
  const[open,setOpen]=useState(false);const ref=useRef<HTMLDivElement>(null)
  useEffect(()=>{function close(event:MouseEvent){if(ref.current&&!ref.current.contains(event.target as Node))setOpen(false)}document.addEventListener('mousedown',close);return()=>document.removeEventListener('mousedown',close)},[])
  return <div className="app-shell"><aside className="app-sidebar"><Logo/><nav aria-label="主要导航">{nav.map(([to,label,Icon])=><NavLink key={to} to={to} end={to==='/' }><Icon size={18}/><span>{label}</span></NavLink>)}</nav><div className="sidebar-create"><Sparkles size={16}/><div><strong>让真实顾客成为品牌共创者</strong><NavLink to={routes.studio}>创建新活动 →</NavLink></div></div><small>© 2026 CoGrow</small></aside><main className="app-main"><header className="app-topbar"><span>梧桐咖啡 · 科技园店</span><div className="topbar-actions" ref={ref}><button className="notification-trigger" aria-label="通知" aria-expanded={open} onClick={()=>setOpen(!open)}><Bell size={18}/><b>4</b></button>{open&&<section className="notification-panel" role="dialog" aria-label="通知面板"><header><h2>通知</h2><span>4 条新消息</span></header><Link to={routes.content} onClick={()=>setOpen(false)}><FileCheck2/><div><strong>2 条内容等待审核</strong><small>高潜力内容预计可新增 11 次领券</small></div></Link><Link to={routes.rewards} onClick={()=>setOpen(false)}><WalletCards/><div><strong>1 笔奖励等待核验</strong><small>王雅婷 · 基础贡献奖励 ¥20</small></div></Link><Link to={routes.workbench} onClick={()=>setOpen(false)}><Lightbulb/><div><strong>AI 经营建议</strong><small>朋友圈核销效率高，建议追加奖励预算</small></div></Link></section>}<i><Store size={15}/></i><strong>店铺管理员</strong></div></header><Outlet/></main></div>
}
