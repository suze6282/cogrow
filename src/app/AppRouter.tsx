import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MerchantLayout } from '../layouts/MerchantLayout'
import { AnalyticsPage } from '../pages/AnalyticsPage'
import { CampaignDetailPage } from '../pages/CampaignDetailPage'
import { CampaignListPage } from '../pages/CampaignListPage'
import { CampaignStudioPage } from '../pages/CampaignStudioPage'
import { ContentCenterPage } from '../pages/ContentCenterPage'
import { ContributorsPage } from '../pages/ContributorsPage'
import { CouponClaimPage } from '../pages/CouponClaimPage'
import { CustomerCreatePage } from '../pages/CustomerCreatePage'
import { CustomerLandingPage } from '../pages/CustomerLandingPage'
import { CustomerPublishPage } from '../pages/CustomerPublishPage'
import { RedemptionPage } from '../pages/RedemptionPage'
import { RewardsPage } from '../pages/RewardsPage'
import { WorkbenchPage } from '../pages/WorkbenchPage'
import { ScrollToTop } from './ScrollToTop'

export function AppRouter() {
  const Router = import.meta.env.BASE_URL === '/' ? BrowserRouter : HashRouter
  return <Router><ScrollToTop/><Routes>
    <Route element={<MerchantLayout />}>
      <Route path="/" element={<WorkbenchPage />} /><Route path="/analytics" element={<AnalyticsPage />} /><Route path="/campaigns" element={<CampaignListPage />} /><Route path="/campaigns/new" element={<CampaignStudioPage />} /><Route path="/campaigns/:campaignId" element={<CampaignDetailPage />} /><Route path="/content" element={<ContentCenterPage />} /><Route path="/contributors" element={<ContributorsPage />} /><Route path="/rewards" element={<RewardsPage />} />
    </Route>
    <Route path="/c/:campaignId" element={<CustomerLandingPage />} /><Route path="/c/:campaignId/create" element={<CustomerCreatePage />} /><Route path="/c/:campaignId/publish" element={<CustomerPublishPage />} /><Route path="/share/:code" element={<CouponClaimPage />} /><Route path="/redeem/:code" element={<RedemptionPage />} /><Route path="*" element={<Navigate to="/" replace />} />
  </Routes></Router>
}
