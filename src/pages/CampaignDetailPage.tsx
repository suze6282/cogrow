import { ExternalLink, Pause, Play, QrCode, Settings2 } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { assetUrl } from '../app/assets'
import { useFeedback } from '../app/feedback-context'
import { routes } from '../app/routes'
import { useProduct } from '../app/product-context'
import { Metric } from '../components/ui/Metric'
import { PageHeader } from '../components/ui/PageHeader'
import { selectActiveCampaign, selectRoi } from '../domain/selectors'

export function CampaignDetailPage(){
  const{state,dispatch}=useProduct();const{campaignId}=useParams();const{notify,confirm}=useFeedback();const c=state.campaigns.find(item=>item.id===campaignId)??selectActiveCampaign(state)
  function toggle(){const next=c.status==='已暂停'?'进行中':'已暂停';confirm({title:next==='已暂停'?'确认暂停活动？':'确认恢复活动？',description:next==='已暂停'?'暂停后将停止新增邀请和奖励累计，已有数据不会被删除。':'恢复后顾客入口与奖励累计将重新生效。',confirmLabel:next==='已暂停'?'确认暂停':'确认恢复',onConfirm:()=>{dispatch({type:'campaign.statusChanged',campaignId:c.id,status:next});notify(next==='已暂停'?'活动已暂停，可随时恢复':'活动已恢复运行')}})}
  return <div className="page-canvas"><PageHeader title={c.name} description={`${c.period} · ${c.status} · 面向近 90 天活跃会员`} action={<div className="button-row"><Link className="secondary-button" to={routes.customer}><ExternalLink/>打开顾客页面</Link><button className="secondary-button" onClick={()=>notify('活动设置已载入：人群、预算、奖励和授权')}><Settings2/>活动设置</button></div>}/><section className="detail-banner"><img src={assetUrl('/assets/campaign-hero-v2.png')} alt="桂花拿铁活动"/><div><span>活动目标</span><h2>让真实顾客讲述属于自己的秋日咖啡时刻</h2><p>通过小红书、抖音和朋友圈连接新品认知、朋友领券与到店消费。</p></div><aside><QrCode/><span>桌贴与订单页入口</span></aside></section><section className="open-metrics"><Metric label="活动访问" value={196} note="统一数据口径"/><Metric label="开始共创" value={74} note="访问后行动"/><Metric label="提交并通过内容" value={c.contentCount} note="不含待审核内容"/><Metric label="活动 ROI" value={selectRoi(state).toFixed(1)} note="收入 ÷ 已承诺奖励"/></section><div className="detail-grid"><section className="surface journey"><header><h3>参与路径</h3><span>实时更新</span></header>{[['活动访问',196,100],['开始共创',74,38],['内容发布',c.contentCount,16],['朋友领券',c.couponClaims,64],['到店核销',c.redemptions,19]].map(([label,value,width])=><div key={label}><span>{label}</span><b>{value}</b><i><em style={{width:`${width}%`}}/></i></div>)}</section><section className="surface campaign-settings"><header><h3>活动规则</h3><button onClick={toggle}>{c.status==='已暂停'?<Play/>:<Pause/>}{c.status==='已暂停'?'恢复活动':'暂停活动'}</button></header><dl><div><dt>基础奖励</dt><dd>合格内容并授权 · ¥20 到店券</dd></div><div><dt>质量奖励</dt><dd>真实完整、表达清晰 · 追加积分</dd></div><div><dt>增长奖励</dt><dd>每次有效核销 · 10 积分</dd></div><div><dt>剩余预算</dt><dd>¥{(c.budget-c.spent).toLocaleString()}</dd></div></dl></section></div></div>
}
