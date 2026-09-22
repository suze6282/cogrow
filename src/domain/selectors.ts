import type { ProductState } from './types'
export const selectActiveCampaign=(state:ProductState)=>state.campaigns.find(c=>c.id==='autumn-osmanthus')??state.campaigns[0]
export const selectPendingContributions=(state:ProductState)=>state.contributions.filter(c=>c.reviewStatus==='待审核').length
export const selectRewardPending=(state:ProductState)=>state.rewards.filter(r=>r.status==='待核验').length
export const selectPendingTotal=(state:ProductState)=>selectPendingContributions(state)+selectRewardPending(state)
export const selectRoi=(state:ProductState)=>{const c=selectActiveCampaign(state);return c.spent?c.attributableRevenue/c.spent:0}
export const selectGrossProfit=(state:ProductState)=>Math.round(selectActiveCampaign(state).attributableRevenue*.68)
