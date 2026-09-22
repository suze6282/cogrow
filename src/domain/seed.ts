import type { Contribution, ProductState } from './types'

const base = { facts:{product:'桂花拿铁',feeling:'桂花香柔和、咖啡口感醇厚',scene:'一个人在窗边、下午阳光',audience:'喜欢咖啡和生活小确幸的朋友'}, originalAnswers:['桂花香很轻，和咖啡的醇厚刚刚好','一个人在窗边，下午阳光照进来很放松','喜欢咖啡，也喜欢生活小确幸的朋友'], aiChanges:['整理口语表达','补充平台结构与话题标签'], authorizationScope:'梧桐咖啡自有公众号、门店屏幕与活动页面', authorizationTerm:'90 天', potential:'高' as const, reviewSuggestion:'事实完整、场景具体，建议通过' }
const contributions:Contribution[] = [
  { ...base,id:'c1',customer:'林小雨',avatar:'林',platform:'小红书',title:'秋天的第一杯桂花拿铁',body:'桂花香很轻，和咖啡的醇厚刚刚好。坐在窗边，整个下午都慢了下来。\n\n#深圳咖啡店 #桂花拿铁 #秋日限定',image:'/assets/customer-moment-v2.png',reviewStatus:'已通过',authorizationStatus:'已授权',publishStatus:'已发布',claims:18,redemptions:8,createdAt:'今天 09:42'},
  { ...base,id:'c2',customer:'陈思远',avatar:'陈',platform:'抖音',title:'15 秒记录秋天的桂花香',body:'0–3 秒：推开门；3–8 秒：桂花拿铁近景；8–12 秒：窗边光影；12–15 秒：真实推荐。',image:'/assets/osmanthus-latte.png',reviewStatus:'已通过',authorizationStatus:'已授权',publishStatus:'已发布',claims:14,redemptions:6,createdAt:'昨天 18:06'},
  { ...base,id:'c3',customer:'王雅婷',avatar:'王',platform:'朋友圈',title:'我的窗边午后',body:'今天在梧桐咖啡找到一个很舒服的位置，也喝到一杯温柔的桂花拿铁。',image:'/assets/cafe-interior.png',reviewStatus:'待审核',authorizationStatus:'已授权',publishStatus:'未发布',claims:0,redemptions:0,createdAt:'昨天 15:23',historicalImpact:'该共创者过往内容累计带来 7 次领券、3 次核销'},
  { ...base,id:'c4',customer:'张子豪',avatar:'张',platform:'小红书',title:'咖啡控的秋日限定测评',body:'入口先是咖啡香，随后才尝到淡淡桂花，甜度也很克制。',image:'/assets/campaign-hero-v2.png',reviewStatus:'已通过',authorizationStatus:'已授权',publishStatus:'已发布',claims:12,redemptions:5,createdAt:'09.12 20:18'},
  { ...base,id:'c5',customer:'赵可儿',avatar:'赵',platform:'朋友圈',title:'桂花拿铁的治愈时刻',body:'工作间隙下楼喝杯咖啡，这一刻刚好让人慢下来。',image:'/assets/customer-moment-v2.png',reviewStatus:'待审核',authorizationStatus:'等待授权',publishStatus:'未发布',claims:0,redemptions:0,createdAt:'09.12 14:36',potential:'中',reviewSuggestion:'内容真实，建议补齐素材授权后通过',historicalImpact:'该共创者过往内容累计带来 5 次领券、2 次核销'},
  { ...base,id:'c6',customer:'吴佳怡',avatar:'吴',platform:'抖音',title:'全城最好喝的桂花拿铁',body:'绝对不能错过的秋日限定，喝一次就会爱上。',image:'/assets/osmanthus-latte.png',reviewStatus:'待修改',authorizationStatus:'等待授权',publishStatus:'未发布',risk:'“全城最好喝”属于无法验证的极限表达',potential:'低',reviewSuggestion:'退回修改夸张表达',claims:0,redemptions:0,createdAt:'09.11 11:20'},
]

export const seedState:ProductState={version:3,campaigns:[
  {id:'autumn-osmanthus',name:'秋日桂花拿铁共创',product:'秋日桂花拿铁',status:'进行中',period:'09.01 – 10.31',participantCount:48,contentCount:31,couponClaims:126,redemptions:38,attributableRevenue:3420,budget:2000,spent:1140},
  {id:'summer-coldbrew',name:'夏日冷萃随手拍',product:'柑橘冷萃',status:'已结束',period:'06.01 – 07.15',participantCount:36,contentCount:24,couponClaims:82,redemptions:25,attributableRevenue:2160,budget:1600,spent:960},
],contributions,contributors:[
  {id:'u1',name:'林小雨',level:'金叶共创者',contributions:6,qualified:6,claims:42,redemptions:18,reward:236,lastActive:'今天'},
  {id:'u2',name:'陈思远',level:'银叶共创者',contributions:4,qualified:4,claims:31,redemptions:12,reward:164,lastActive:'昨天'},
  {id:'u3',name:'王雅婷',level:'新锐共创者',contributions:3,qualified:2,claims:18,redemptions:7,reward:96,lastActive:'昨天'},
  {id:'u4',name:'赵可儿',level:'新锐共创者',contributions:2,qualified:2,claims:10,redemptions:4,reward:58,lastActive:'3 天前'},
],rewards:[
  {id:'r1',customer:'林小雨',reason:'基础贡献奖励',amount:20,status:'可使用',createdAt:'今天 10:05',contentTitle:'秋天的第一杯桂花拿铁',auditStatus:'已通过',payoutStatus:'已发放'},
  {id:'r2',customer:'陈思远',reason:'3 次有效核销增长奖励',amount:30,status:'已核销',createdAt:'昨天 19:12',contentTitle:'15 秒记录秋天的桂花香',orderId:'ORDER-0914-2381',auditStatus:'已通过',payoutStatus:'已使用'},
  {id:'r3',customer:'王雅婷',reason:'基础贡献奖励待核验',amount:20,status:'待核验',createdAt:'昨天 15:25',contentTitle:'我的窗边午后',auditStatus:'待核验',payoutStatus:'待发放'},
],coupons:[],events:[]}
