export type Platform = '小红书' | '抖音' | '朋友圈'
export type CampaignStatus = '草稿' | '进行中' | '已暂停' | '已结束'
export type ReviewStatus = '待审核' | '已通过' | '待修改'
export type AuthorizationStatus = '等待授权' | '已授权'
export type PublishStatus = '未发布' | '已发布'
export type RewardStatus = '待核验' | '可使用' | '已核销' | '风险审核'

export type Campaign = { id:string; name:string; product:string; status:CampaignStatus; period:string; participantCount:number; contentCount:number; couponClaims:number; redemptions:number; attributableRevenue:number; budget:number; spent:number }
export type ExperienceFacts = { product:string; feeling:string; scene:string; audience:string }
export type Contribution = {
  id:string; customer:string; avatar:string; platform:Platform; title:string; body:string; image:string
  reviewStatus:ReviewStatus; authorizationStatus:AuthorizationStatus; publishStatus:PublishStatus
  facts:ExperienceFacts; originalAnswers:string[]; aiChanges:string[]; authorizationScope:string; authorizationTerm:string
  risk?:string; potential:'高'|'中'|'低'; reviewSuggestion:string; claims:number; redemptions:number; createdAt:string; historicalImpact?:string
}
export type Contributor = { id:string; name:string; level:string; contributions:number; qualified:number; claims:number; redemptions:number; reward:number; lastActive:string }
export type RewardEntry = { id:string; customer:string; reason:string; amount:number; status:RewardStatus; createdAt:string; contentTitle:string; orderId?:string; auditStatus:'已通过'|'待核验'; payoutStatus:'待发放'|'已发放'|'已使用'; risk?:string }
export type Coupon = { code:string; campaignId:string; referrer:string; holder:string; status:'可使用'|'已核销'; claimedAt:string; redeemedAt?:string }
export type AttributionEvent = { id:string; type:'content_submitted'|'content_approved'|'coupon_claimed'|'coupon_redeemed'; campaignId:string; createdAt:string; value?:number }
export type ProductState = { version:3; campaigns:Campaign[]; contributions:Contribution[]; contributors:Contributor[]; rewards:RewardEntry[]; coupons:Coupon[]; events:AttributionEvent[] }
export type CampaignPlan = { name:string; goal:string; mission:string; audience:string; platforms:Platform[]; platformReasons:Record<Platform,string>; questions:string[]; reward:string; budget:number; budgetAllocation:{base:number;growth:number;reserve:number}; estimates:{participants:number;qualified:number;claims:number;redemptions:number}; risks:string[]; rationale:string; endDate?:string; authorizationTerm?:string }
export type ContentDraft = Record<Platform, { title:string; body:string; structure:string[] }>
