import type { ProductAction } from './events'
import type { ProductState } from './types'

const now=()=>new Intl.DateTimeFormat('zh-CN',{hour:'2-digit',minute:'2-digit'}).format(new Date())
export function productReducer(state:ProductState,action:ProductAction):ProductState{
  const eventId='eventId' in action?action.eventId:undefined
  if(eventId&&state.events.some(event=>event.id===eventId))return state
  if(action.type==='campaign.created')return{...state,campaigns:[{id:`campaign-${Date.now()}`,name:action.plan.name,product:'桂花拿铁',status:'草稿',period:`09.15 – ${action.plan.endDate||'10.31'}`,participantCount:0,contentCount:0,couponClaims:0,redemptions:0,attributableRevenue:0,budget:action.plan.budget,spent:0},...state.campaigns]}
  if(action.type==='campaign.statusChanged')return{...state,campaigns:state.campaigns.map(c=>c.id===action.campaignId?{...c,status:action.status}:c)}
  if(action.type==='contribution.submitted')return{...state,campaigns:state.campaigns.map(c=>c.id==='autumn-osmanthus'?{...c,participantCount:c.participantCount+1}:c),contributions:[action.contribution,...state.contributions],events:[...state.events,{id:action.eventId,type:'content_submitted',campaignId:'autumn-osmanthus',createdAt:now()}]}
  if(action.type==='contribution.approved'){
    const target=state.contributions.find(item=>item.id===action.contributionId);if(!target)return state
    return{...state,campaigns:state.campaigns.map(c=>c.id==='autumn-osmanthus'?{...c,contentCount:c.contentCount+1}:c),contributions:state.contributions.map(item=>item.id===action.contributionId?{...item,reviewStatus:'已通过'}:item),events:[...state.events,{id:action.eventId,type:'content_approved',campaignId:'autumn-osmanthus',createdAt:now()}],rewards:[{id:`reward-${action.eventId}`,customer:target.customer,reason:'基础贡献奖励',amount:20,status:'可使用',createdAt:now(),contentTitle:target.title,auditStatus:'已通过',payoutStatus:'已发放'},...state.rewards.filter(r=>!(r.customer===target.customer&&r.status==='待核验'))]}
  }
  if(action.type==='contribution.revisionRequested')return{...state,contributions:state.contributions.map(item=>item.id===action.contributionId?{...item,reviewStatus:'待修改',reviewSuggestion:`退回原因：${action.reason}`}:item),events:[...state.events,{id:action.eventId,type:'content_submitted',campaignId:'autumn-osmanthus',createdAt:now()}]}
  if(action.type==='coupon.claimed'){
    if(state.coupons.some(c=>c.code===action.code||c.holder===action.holder))return state
    return{...state,campaigns:state.campaigns.map(c=>c.id==='autumn-osmanthus'?{...c,couponClaims:c.couponClaims+1}:c),coupons:[...state.coupons,{code:action.code,campaignId:'autumn-osmanthus',referrer:'林小雨',holder:action.holder,status:'可使用',claimedAt:now()}],events:[...state.events,{id:action.eventId,type:'coupon_claimed',campaignId:'autumn-osmanthus',createdAt:now()}]}
  }
  if(action.type==='coupon.redeemed'){
    const coupon=state.coupons.find(c=>c.code===action.code);if(!coupon||coupon.status==='已核销')return state
    return{...state,campaigns:state.campaigns.map(c=>c.id==='autumn-osmanthus'?{...c,redemptions:c.redemptions+1,attributableRevenue:c.attributableRevenue+action.orderValue,spent:c.spent+10}:c),coupons:state.coupons.map(c=>c.code===action.code?{...c,status:'已核销',redeemedAt:now()}:c),contributors:state.contributors.map(c=>c.name===coupon.referrer?{...c,redemptions:c.redemptions+1,reward:c.reward+10}:c),rewards:[{id:`reward-${action.eventId}`,customer:coupon.referrer,reason:'有效核销增长奖励',amount:10,status:'可使用',createdAt:now(),contentTitle:'秋天的第一杯桂花拿铁',orderId:'ORDER-NEW-0068',auditStatus:'已通过',payoutStatus:'已发放'},...state.rewards],events:[...state.events,{id:action.eventId,type:'coupon_redeemed',campaignId:'autumn-osmanthus',createdAt:now(),value:action.orderValue}]}
  }
  if(action.type==='rewards.batchApproved')return{...state,rewards:state.rewards.map(r=>action.rewardIds.includes(r.id)?{...r,status:'可使用',auditStatus:'已通过',payoutStatus:'已发放'}:r)}
  return state
}
