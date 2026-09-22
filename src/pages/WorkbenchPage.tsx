import { ArrowRight, CircleDollarSign, FileCheck2, Lightbulb, Plus, UserRoundPlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { assetUrl } from '../app/assets'
import { useFeedback } from '../app/feedback-context'
import { routes } from '../app/routes'
import { useProduct } from '../app/product-context'
import { Metric } from '../components/ui/Metric'
import { selectActiveCampaign, selectPendingContributions, selectPendingTotal, selectRewardPending, selectRoi } from '../domain/selectors'

const journey=[['活动访问',196],['开始共创',74],['内容发布',31],['朋友领券',126],['到店核销',38]] as const
export function WorkbenchPage(){
  const{state}=useProduct();const{notify}=useFeedback();const campaign=selectActiveCampaign(state);const pending=selectPendingContributions(state);const rewardPending=selectRewardPending(state);const roi=selectRoi(state).toFixed(1)
  return <div className="page-canvas workbench"><header className="welcome-row"><div><h1>早上好，梧桐咖啡</h1><p>今天有 {selectPendingTotal(state)} 项待处理：{pending} 条内容待审核，{rewardPending} 笔奖励待核验。</p></div><Link className="primary-button" to={routes.studio}><Plus size={17}/>用 AI 创建活动</Link></header>
    <section className="ai-decision"><div><span><Lightbulb/>AI 经营判断</span><h2>桂花拿铁活动运行健康，但内容审核正在成为增长瓶颈。</h2><p>2 条高潜力内容等待审核，预计审核后可新增约 11 次领券。</p></div><div><Link className="primary-button" to={`${routes.content}?filter=pending`}>立即审核</Link><a className="secondary-button" href="#ai-actions">查看 AI 建议</a></div></section>
    <section className="campaign-hero"><img src={assetUrl('/assets/campaign-hero-v2.png')} alt="秋日桂花拿铁"/><div className="campaign-hero__content"><span>本月主推活动 · {campaign.period}</span><h2>{campaign.name}</h2><p>已有 {campaign.participantCount} 位真实顾客参与，共创内容持续带来到店消费。</p><div><Link to={routes.campaign}>查看活动详情 <ArrowRight size={15}/></Link><Link to={routes.customer}>打开顾客活动页</Link></div></div><aside><small>活动带来核销收入</small><strong>¥{campaign.attributableRevenue.toLocaleString()}</strong><span>当前 ROI {roi}</span></aside></section>
    <section className="open-metrics"><Metric label="今日待办" value={selectPendingTotal(state)} note="2 条内容 · 1 笔奖励" tone="clay"/><Metric label="提交并通过内容" value={campaign.contentCount} note="统一数据口径"/><Metric label="活动 ROI" value={roi} note="收入 ÷ 已承诺奖励"/><Metric label="剩余预算" value={`¥${(campaign.budget-campaign.spent).toLocaleString()}`} note="总预算 ¥2,000"/></section>
    <section className="surface growth-journey"><header><div><h3>共创增长链路</h3><p>从真实消费体验到可归因订单</p></div><Link to={routes.analytics}>查看完整归因</Link></header><div>{journey.map(([label,value],index)=><article key={label}><span>{index+1}</span><small>{label}</small><strong>{value}</strong>{index<journey.length-1&&<ArrowRight/>}</article>)}</div><footer>平均每条已发布内容带来 <strong>1.23 次核销</strong>，不将内容数与核销数误作漏斗转化率。</footer></section>
    <section className="ai-actions" id="ai-actions"><header><div><span>AI 推荐的下一步动作</span><h2>把数据判断转成今天能完成的行动</h2></div><small>基于过去 30 天活动数据</small></header><div><article><FileCheck2/><div><strong>优先审核 2 条高潜力内容</strong><p>推荐原因：两条内容事实完整且场景具体。</p><b>预计影响：新增约 11 次领券</b></div><Link to={routes.content}>去审核</Link></article><article><CircleDollarSign/><div><strong>追加 ¥300 朋友圈奖励预算</strong><p>推荐原因：朋友圈核销效率高于活动平均水平。</p><b>预计影响：增加约 9 次有效核销</b></div><button onClick={()=>notify('预算建议已加入下一轮活动草稿')}>加入草稿</button></article><article><UserRoundPlus/><div><strong>邀请 18 位高意向复购顾客</strong><p>推荐原因：近 30 天复购两次以上且未参与本轮活动。</p><b>预计影响：产出约 12 条合格内容</b></div><button onClick={()=>notify('已生成 18 位建议邀请名单')}>生成名单</button></article></div></section>
  </div>
}
