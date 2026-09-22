import { expect, test } from '@playwright/test'
const baseURL='http://127.0.0.1:5173'
test.beforeEach(async({page})=>{await page.addInitScript(()=>{localStorage.removeItem('cogrow-product-v3');sessionStorage.clear()})})

test('AI action center, notifications and campaign creation work',async({page},testInfo)=>{
  const errors:string[]=[];page.on('console',m=>m.type()==='error'&&errors.push(m.text()));page.on('pageerror',e=>errors.push(e.message));await page.setViewportSize({width:1440,height:960});await page.goto(baseURL)
  await expect(page.getByText('今天有 3 项待处理：2 条内容待审核，1 笔奖励待核验。')).toBeVisible()
  await expect(page.getByRole('heading',{name:/内容审核正在成为增长瓶颈/})).toBeVisible()
  await page.getByRole('button',{name:'通知'}).click();await expect(page.getByRole('dialog',{name:'通知面板'})).toBeVisible();await expect(page.getByText('2 条内容等待审核')).toBeVisible();await page.getByRole('heading',{name:'早上好，梧桐咖啡'}).click();await expect(page.getByRole('dialog',{name:'通知面板'})).toBeHidden()
  await page.screenshot({path:testInfo.outputPath('ai-action-center.png'),fullPage:true})
  await page.getByRole('link',{name:/用 AI 创建活动/}).click();await expect.poll(()=>page.evaluate(()=>window.scrollY)).toBe(0);await page.getByRole('button',{name:'生成经营方案'}).click();await expect(page.getByText('方案完整度 92%')).toBeVisible();await page.getByLabel('活动结束时间').fill('2026-10-31');await page.getByLabel('素材授权期限').selectOption({label:'90 天'});await expect(page.getByText('方案完整度 100%')).toBeVisible();await page.getByRole('button',{name:/创建活动/}).click();await expect(page.getByRole('dialog',{name:'创建活动确认'})).toBeVisible();await page.getByRole('button',{name:'确认创建草稿'}).click();await expect(page.getByRole('heading',{name:'共创活动'})).toBeVisible();await expect(page.getByRole('heading',{name:'秋日桂花拿铁真实体验共创'})).toBeVisible();expect(errors).toEqual([])
})

test('analytics toggles, attribution detail, content review and rewards have feedback',async({page})=>{
  const errors:string[]=[];page.on('console',m=>m.type()==='error'&&errors.push(m.text()));page.on('pageerror',e=>errors.push(e.message));await page.setViewportSize({width:1440,height:960});await page.goto(`${baseURL}/analytics`)
  const redemption=page.getByRole('button',{name:'核销',exact:true});await redemption.click();await expect(redemption).toHaveAttribute('aria-pressed','true');await expect(page.getByRole('button',{name:'今天 核销 9 次'})).toBeVisible();await page.getByRole('row',{name:/秋天的第一杯桂花拿铁/}).click();await expect(page.getByRole('dialog',{name:'归因详情'})).toContainText('WT-LXY-0926');await page.getByRole('button',{name:'关闭归因详情'}).click()
  await page.goto(`${baseURL}/content`);await page.getByRole('tab',{name:'待审核'}).click();await expect(page.getByRole('tab',{name:'待审核'})).toHaveAttribute('aria-selected','true');await page.getByRole('button',{name:/查看 我的窗边午后 审核详情/}).click();await expect(page.getByRole('dialog',{name:'内容审核详情'})).toContainText('顾客原始回答');await page.getByRole('button',{name:'审核通过'}).click();await page.getByRole('button',{name:'确认通过'}).click();await expect(page.getByRole('status')).toContainText('审核通过')
  await page.goto(`${baseURL}/rewards`);const batch=page.getByRole('button',{name:/批量发放/});await expect(batch).toBeDisabled();await page.getByRole('checkbox',{name:/选择 王雅婷/}).check();await expect(batch).toBeEnabled();await batch.click();await page.getByRole('button',{name:'确认发放'}).click();await expect(page.getByRole('status')).toContainText('奖励核验完成');expect(errors).toEqual([])
})

test('all merchant routes render their primary page heading',async({page})=>{await page.setViewportSize({width:1440,height:960});for(const[route,heading]of[['/','早上好，梧桐咖啡'],['/analytics','增长分析'],['/campaigns','共创活动'],['/campaigns/autumn-osmanthus','秋日桂花拿铁共创'],['/content','内容中心'],['/contributors','共创者中心'],['/rewards','奖励与归因']]as const){await page.goto(`${baseURL}${route}`);await expect(page.getByRole('heading',{name:heading,exact:true}).first()).toBeVisible()}})
