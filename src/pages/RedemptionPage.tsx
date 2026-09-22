import { CheckCircle2, CircleAlert, ScanLine, Store } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../app/routes'
import { useProduct } from '../app/product-context'
import { MobileLayout } from '../layouts/MobileLayout'

const code='WT-AUTUMN-0926'
export function RedemptionPage(){const{state,dispatch}=useProduct();const coupon=state.coupons.find(item=>item.code===code);const[done,setDone]=useState(coupon?.status==='已核销');function redeem(){dispatch({type:'coupon.redeemed',code,orderValue:68,eventId:`redeem-${code}`});setDone(true)}return <MobileLayout backTo={routes.claim}><section className="redemption-page"><div className="mobile-body"><header className="mobile-title"><div className="round-icon"><Store/></div><h1>门店券码核销</h1><p>梧桐咖啡 · 科技园店</p></header>{!coupon?<section className="redemption-alert"><CircleAlert/><h2>未找到可用优惠券</h2><p>请先完成领券，再由门店员工核验。</p><Link to={routes.claim}>返回领券页面</Link></section>:!done?<><section className="redemption-card"><span>待核销券码</span><strong>{code}</strong><dl><div><dt>顾客</dt><dd>{coupon.holder}</dd></div><div><dt>优惠内容</dt><dd>¥20 到店券</dd></div><div><dt>适用商品</dt><dd>秋日桂花拿铁</dd></div><div><dt>订单金额</dt><dd>¥68.00</dd></div></dl></section><button className="mobile-primary" onClick={redeem}><ScanLine/>确认核销</button></>:<><section className="redemption-success"><CheckCircle2/><h2>核销成功</h2><p>订单已计入「秋日桂花拿铁共创」的可归因收入。</p><div><span>本次订单</span><strong>¥68.00</strong></div><div><span>推荐共创者</span><strong>林小雨</strong></div><small>增长奖励 10 积分已进入共创者账户</small></section><Link className="mobile-primary" to={routes.workbench}>完成并返回工作台</Link></>}</div></section></MobileLayout>}
