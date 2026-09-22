import { expect, test } from '@playwright/test'
import { planCampaign } from '../src/services/aiCampaignService'
import { generateContent } from '../src/services/aiContentService'
import { checkContent } from '../src/services/qualityService'

test('AI services return executable campaign and platform-specific drafts', async () => {
  const plan = await planCampaign({
    product: '桂花拿铁',
    goal: '提升新品认知并带来到店消费',
    audience: '近 90 天到店会员',
    budget: 2000,
  })
  expect(plan.name).toContain('桂花拿铁')
  expect(plan.platforms).toEqual(['小红书', '朋友圈', '抖音'])
  expect(plan.questions).toHaveLength(3)

  const drafts = await generateContent({
    favorite: '桂花香轻盈',
    scene: '在窗边度过下午',
    recommend: '喜欢低甜咖啡的朋友',
  })
  expect(drafts['小红书'].body).not.toEqual(drafts['抖音'].body)
  expect(checkContent(drafts['朋友圈'].body)).toBe('')
  expect(checkContent('全网第一、百分百有效')).toContain('绝对化')
})
