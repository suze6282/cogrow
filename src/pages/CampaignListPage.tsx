import { ArrowRight, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { assetUrl } from '../app/assets'
import { routes } from '../app/routes'
import { useProduct } from '../app/product-context'
import { PageHeader } from '../components/ui/PageHeader'
import { StatusTag } from '../components/ui/StatusTag'

export function CampaignListPage() {
  const { state } = useProduct()
  return <div className="page-canvas"><PageHeader title="共创活动" description="用清晰的任务和回报，持续激活真实顾客参与品牌内容。" action={<Link className="primary-button" to={routes.studio}><Plus size={17} />创建活动</Link>} /><section className="campaign-list">{state.campaigns.map((campaign,index) => <article key={campaign.id} className={index === 0 ? 'featured' : ''}>{index === 0 && <img src={assetUrl('/assets/campaign-hero-v2.png')} alt="桂花拿铁活动" />}<div className="campaign-list__main"><div><StatusTag>{campaign.status}</StatusTag><span>{campaign.period}</span></div><h2>{campaign.name}</h2><p>围绕「{campaign.product}」邀请顾客分享真实体验，并连接内容传播与到店转化。</p><dl><div><dt>参与顾客</dt><dd>{campaign.participantCount}</dd></div><div><dt>合格内容</dt><dd>{campaign.contentCount}</dd></div><div><dt>核销收入</dt><dd>¥{campaign.attributableRevenue.toLocaleString()}</dd></div><div><dt>预算进度</dt><dd>{Math.round(campaign.spent/campaign.budget*100)}%</dd></div></dl><Link to={`/campaigns/${campaign.id}`}>管理活动 <ArrowRight size={15} /></Link></div></article>)}</section></div>
}
