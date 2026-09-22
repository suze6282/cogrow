import type { Dispatch } from 'react'
import type { CampaignPlan, Contribution, ProductState } from './types'

export type ProductAction =
  | { type:'campaign.created'; plan:CampaignPlan }
  | { type:'campaign.statusChanged'; campaignId:string; status:'进行中'|'已暂停' }
  | { type:'contribution.submitted'; contribution:Contribution; eventId:string }
  | { type:'contribution.approved'; contributionId:string; eventId:string }
  | { type:'contribution.revisionRequested'; contributionId:string; reason:string; eventId:string }
  | { type:'coupon.claimed'; code:string; holder:string; eventId:string }
  | { type:'coupon.redeemed'; code:string; orderValue:number; eventId:string }
  | { type:'rewards.batchApproved'; rewardIds:string[] }

export type ProductContext = { state:ProductState; dispatch:Dispatch<ProductAction> }
