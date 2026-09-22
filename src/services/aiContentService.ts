import type { ContentDraft } from '../domain/types'
export type CustomerFacts={favorite:string;scene:string;recommend:string}
export async function generateContent(facts:CustomerFacts):Promise<ContentDraft>{await new Promise(resolve=>setTimeout(resolve,950));return{
  小红书:{title:'被桂花香接住的秋日午后',body:`【真实体验】${facts.favorite}\n【当时场景】${facts.scene}\n【推荐给】${facts.recommend}\n\n#深圳咖啡店 #桂花拿铁 #秋日限定`,structure:['标题','体验正文','场景描述','话题标签']},
  抖音:{title:'15 秒记录桂花香',body:`0–3 秒｜门店窗边，推镜进入\n3–8 秒｜桂花拿铁近景，字幕“${facts.favorite}”\n8–12 秒｜${facts.scene}，保留环境声\n12–15 秒｜口播：推荐给${facts.recommend}`,structure:['15 秒分镜','镜头时间','画面建议','字幕/口播']},
  朋友圈:{title:'今天的秋日小确幸',body:`${facts.scene}。${facts.favorite}。想推荐给${facts.recommend}。\n\n图片顺序：咖啡近景 → 窗边环境\n朋友可从下方入口领取 ¥20 到店券。`,structure:['简短自然文案','图片排序建议','领券入口提示']},
}}
