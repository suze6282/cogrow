import {
  CheckCircle2,
  ChevronRight,
  Clock3,
  Gift,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { routes } from "../app/routes";
import { assetUrl } from "../app/assets";
import { MobileLayout } from "../layouts/MobileLayout";

export function CustomerLandingPage() {
  return (
    <MobileLayout backTo={routes.campaign}>
      <section className="customer-landing">
        <div className="mobile-hero">
          <img
            src={assetUrl("/assets/campaign-hero-v2.png")}
            alt="秋日桂花拿铁"
          />
          <div>
            <span>梧桐咖啡 · 秋日限定</span>
            <h1>
              分享你的
              <br />
              秋日咖啡时刻
            </h1>
            <p>让真实体验被更多人看见</p>
          </div>
        </div>
        <div className="mobile-body">
          <section className="reward-callout">
            <Gift />
            <div>
              <strong>完成真实共创，可得 ¥20 到店券</strong>
              <p>朋友通过你的内容领券并到店，还可获得额外积分。</p>
            </div>
          </section>
          <section className="verified-purchase">
            <img
              src={assetUrl("/assets/osmanthus-latte.png")}
              alt="桂花拿铁订单"
            />
            <div>
              <span>
                <CheckCircle2 />
                订单已验证
              </span>
              <strong>秋日桂花拿铁 × 1</strong>
              <small>今天 14:32 · 科技园店</small>
            </div>
            <ChevronRight />
          </section>
          <h2>参与方式</h2>
          <ol className="participation-steps">
            <li>
              <b>1</b>
              <div>
                <strong>回答 3 个体验问题</strong>
                <span>只需要分享你真实的感受</span>
              </div>
            </li>
            <li>
              <b>2</b>
              <div>
                <strong>AI 帮你整理成内容</strong>
                <span>适配小红书、抖音和朋友圈</span>
              </div>
            </li>
            <li>
              <b>3</b>
              <div>
              <strong>确认授权并提交审核</strong>
              <span>审核通过后由你自行发布</span>
              </div>
            </li>
          </ol>
          <div className="trust-row">
            <span>
              <ShieldCheck />
              不虚构体验
            </span>
            <span>
              <Sparkles />
              AI 辅助标识
            </span>
            <span>
              <Clock3 />约 3 分钟
            </span>
          </div>
          <Link className="mobile-primary" to={routes.create}>
            开始我的共创 <ChevronRight />
          </Link>
          <p className="terms">继续即表示你同意活动规则与素材使用说明</p>
        </div>
      </section>
    </MobileLayout>
  );
}
