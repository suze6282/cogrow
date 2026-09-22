import { CheckCircle2, Clock3, MapPin, Ticket, UserRound } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { assetUrl } from '../app/assets'
import { routes } from '../app/routes'
import { useProduct } from '../app/product-context'
import { MobileLayout } from '../layouts/MobileLayout'

const couponCode='WT-AUTUMN-0926'
export function CouponClaimPage(){const{state,dispatch}=useProduct();const existing=state.coupons.find(item=>item.code===couponCode);const[phone,setPhone]=useState('138 0013 8000');const[claimed,setClaimed]=useState(Boolean(existing));function claim(){dispatch({type:'coupon.claimed',code:couponCode,holder:phone,eventId:`claim-${phone}`});setClaimed(true)}return <MobileLayout backTo={routes.publish}><section className="claim-page"><div className="recommendation-photo"><img src={assetUrl('/assets/customer-moment-v2.png')} alt="林小雨分享的桂花拿铁"/><div><span>林小雨的真实推荐</span><blockquote>桂花香很轻，和咖啡的醇厚刚刚好。窗边的下午也很舒服。</blockquote></div></div><div className="mobile-body"><section className="coupon-offer"><span>梧桐咖啡 · 秋日限定</span><div><small>¥</small><strong>20</strong><em>到店券</em></div><p>购买秋日桂花拿铁可用 · 满 38 元使用</p><ul><li><MapPin/>科技园店及南山门店可用</li><li><Clock3/>领取后 14 天内有效</li></ul></section>{!claimed?<><label className="phone-field"><UserRound/><input value={phone} onChange={e=>setPhone(e.target.value)} aria-label="手机号"/></label><button className="mobile-primary" onClick={claim}><Ticket/>立即领取</button><p className="terms">同一手机号限领 1 张，优惠券不可兑换现金</p></>:<><section className="claim-success"><CheckCircle2/><h2>领取成功</h2><p>到店消费时向店员出示以下券码</p><strong>{couponCode}</strong></section><Link className="mobile-primary" to={routes.redeem}>出示门店核销码</Link></>}</div></section></MobileLayout>}
