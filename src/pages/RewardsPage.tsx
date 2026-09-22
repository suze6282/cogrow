import { AlertTriangle, CheckSquare, CircleDollarSign, Download, ReceiptText, ShieldCheck, TicketCheck } from 'lucide-react'
import { useState } from 'react'
import { useFeedback } from '../app/feedback-context'
import { useProduct } from '../app/product-context'
import { Metric } from '../components/ui/Metric'
import { PageHeader } from '../components/ui/PageHeader'
import { selectActiveCampaign } from '../domain/selectors'

export function RewardsPage(){
  const{state,dispatch}=useProduct();const{notify,confirm}=useFeedback();const c=selectActiveCampaign(state);const[selected,setSelected]=useState<string[]>([])
  function toggle(id:string){setSelected(value=>value.includes(id)?value.filter(item=>item!==id):[...value,id])}
  function batch(){confirm({title:`确认发放 ${selected.length} 笔奖励？`,description:'系统会再次校验订单唯一性、顾客奖励上限和授权状态，通过后模拟发放。',confirmLabel:'确认发放',onConfirm:()=>{dispatch({type:'rewards.batchApproved',rewardIds:selected});setSelected([]);notify('奖励核验完成，已模拟发放')}})}
  return <div className="page-canvas"><PageHeader title="奖励与归因" description="每一份奖励都能解释触发原因、对应内容和核销订单。" action={<button className="secondary-button" onClick={()=>notify('奖励账本已导出')}><Download/>导出账本</button>}/><section className="open-metrics"><Metric label="奖励预算" value={`¥${c.budget.toLocaleString()}`} note="当前活动"/><Metric label="已承诺奖励" value={`¥${c.spent.toLocaleString()}`} note="统一口径 57%" tone="clay"/><Metric label="待核验奖励" value={state.rewards.filter(item=>item.status==='待核验').length} note="1 笔需要处理" tone="clay"/><Metric label="核销带来收入" value={`¥${c.attributableRevenue.toLocaleString()}`} note="ROI 3.0"/></section>
    <div className="reward-grid"><section className="surface reward-budget"><header><h3>三层奖励机制</h3><span>奖励真实贡献，而不是单纯发帖</span></header><article><ReceiptText/><div><strong>基础贡献奖励</strong><p>合格内容并完成授权</p></div><b>¥20 到店券</b></article><article><TicketCheck/><div><strong>内容质量奖励</strong><p>真实完整、表达清晰</p></div><b>追加积分</b></article><article><CircleDollarSign/><div><strong>增长奖励</strong><p>朋友完成有效核销</p></div><b>10 积分/次</b></article></section><section className="surface reward-rules"><header><h3>风险控制规则</h3><button onClick={()=>notify('规则编辑器已载入当前活动配置')}>编辑规则</button></header><ul><li><ShieldCheck/>单个订单只能归因一次</li><li><ShieldCheck/>单个顾客存在活动奖励上限</li><li><ShieldCheck/>重复账号或异常订单进入人工核验</li><li><ShieldCheck/>被退回或撤销授权的内容停止新增奖励</li></ul><aside><AlertTriangle/><p>当前没有高风险奖励，1 笔基础奖励等待授权核验。</p></aside></section></div>
    <section className="surface ledger enhanced-ledger"><header><div><h3>奖励账本</h3><p>选择待核验账目后进行批量发放</p></div><button className="primary-button" disabled={selected.length===0} onClick={batch}><CheckSquare/>批量发放 {selected.length?`(${selected.length})`:''}</button></header><div className="table-scroll"><table><thead><tr><th>选择</th><th>共创者</th><th>触发原因</th><th>对应内容</th><th>订单/核销</th><th>审核</th><th>发放</th><th>金额</th><th>风险</th></tr></thead><tbody>{state.rewards.map(item=><tr key={item.id}><td><input aria-label={`选择 ${item.customer} 的奖励`} type="checkbox" checked={selected.includes(item.id)} disabled={item.status!=='待核验'} onChange={()=>toggle(item.id)}/></td><td><strong>{item.customer}</strong></td><td>{item.reason}</td><td>{item.contentTitle}</td><td>{item.orderId||'—'}</td><td>{item.auditStatus}</td><td>{item.payoutStatus}</td><td>¥{item.amount}</td><td>{item.risk||'正常'}</td></tr>)}</tbody></table></div></section>
  </div>
}
