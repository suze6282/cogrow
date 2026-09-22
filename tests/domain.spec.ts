import { expect, test } from '@playwright/test'
import { seedState } from '../src/domain/seed'
import { productReducer } from '../src/domain/reducer'

test('business events are idempotent and redemption updates attributable revenue', () => {
  const claimed = productReducer(seedState, {
    type: 'coupon.claimed',
    code: 'TEST-001',
    holder: '13800138000',
    eventId: 'claim-001',
  })
  const duplicateClaim = productReducer(claimed, {
    type: 'coupon.claimed',
    code: 'TEST-001',
    holder: '13800138000',
    eventId: 'claim-001',
  })
  expect(duplicateClaim).toEqual(claimed)

  const redeemed = productReducer(claimed, {
    type: 'coupon.redeemed',
    code: 'TEST-001',
    orderValue: 68,
    eventId: 'redeem-001',
  })
  expect(redeemed.campaigns[0].redemptions).toBe(claimed.campaigns[0].redemptions + 1)
  expect(redeemed.campaigns[0].attributableRevenue).toBe(
    claimed.campaigns[0].attributableRevenue + 68,
  )
})
