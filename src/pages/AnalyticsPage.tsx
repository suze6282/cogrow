import {
  ArrowRight,
  Download,
  Link2,
  ReceiptText,
  ShoppingBag,
  Ticket,
  X,
} from "lucide-react";
import { useState } from "react";
import { useFeedback } from "../app/feedback-context";
import { PageHeader } from "../components/ui/PageHeader";
import { useProduct } from "../app/product-context";
import { selectActiveCampaign, selectRoi } from "../domain/selectors";

const rows = [
  {
    title: "秋天的第一杯桂花拿铁",
    customer: "林小雨",
    platform: "小红书",
    claims: 18,
    redemptions: 8,
    revenue: 720,
    reward: 100,
    roi: 7.2,
    code: "WT-LXY-0926",
    order: "ORDER-0915-0720",
  },
  {
    title: "15 秒记录秋天的桂花香",
    customer: "陈思远",
    platform: "抖音",
    claims: 14,
    redemptions: 6,
    revenue: 510,
    reward: 80,
    roi: 6.4,
    code: "WT-CSY-0918",
    order: "ORDER-0914-0510",
  },
  {
    title: "咖啡控的秋日限定测评",
    customer: "张子豪",
    platform: "小红书",
    claims: 12,
    redemptions: 5,
    revenue: 430,
    reward: 70,
    roi: 6.1,
    code: "WT-ZZH-0912",
    order: "ORDER-0913-0430",
  },
];
export function AnalyticsPage() {
  const { state } = useProduct();
  const { notify } = useFeedback();
  const campaign = selectActiveCampaign(state);
  const [mode, setMode] = useState<"收入" | "核销">("收入");
  const [selected, setSelected] = useState<(typeof rows)[number] | null>(null);
  const values =
    mode === "收入"
      ? [280, 360, 420, 390, 510, 620, 840]
      : [3, 4, 5, 4, 6, 7, 9];
  const max = Math.max(...values);
  return (
    <div className="page-canvas">
      <PageHeader
        title="增长分析"
        description="从顾客共创到到店核销，解释每一笔增长为什么可信。"
        action={
          <button
            className="secondary-button"
            onClick={() => notify("月报已生成，可在下载中心查看")}
          >
            <Download size={16} />
            导出月报
          </button>
        }
      />
      <section className="attribution-chain">
        <header>
          <span>统一归因口径</span>
          <strong>领券后 7 天</strong>
        </header>
        <div>
          {[
            ["内容", ShoppingBag],
            ["专属分享链接", Link2],
            ["朋友领券", Ticket],
            ["到店订单", ReceiptText],
            ["奖励结算", ArrowRight],
          ].map(([label, Icon], index) => (
            <article key={label as string}>
              <i>
                <Icon size={18} />
              </i>
              <span>{label as string}</span>
              {index < 4 && <ArrowRight />}
            </article>
          ))}
        </div>
      </section>
      <section className="surface analytics-main enhanced-chart">
        <header>
          <div>
            <h3>增长趋势</h3>
            <p>09.09 – 09.15 · 按实际核销时间统计</p>
          </div>
          <div className="segmented" role="group" aria-label="图表指标">
            <button
              className={mode === "收入" ? "active" : ""}
              aria-pressed={mode === "收入"}
              onClick={() => setMode("收入")}
            >
              收入
            </button>
            <button
              className={mode === "核销" ? "active" : ""}
              aria-pressed={mode === "核销"}
              onClick={() => setMode("核销")}
            >
              核销
            </button>
          </div>
        </header>
        <div className="chart-layout">
          <ol className="chart-axis">
            {(mode === "收入"
              ? ["¥900", "¥600", "¥300", "¥0"]
              : ["9 次", "6 次", "3 次", "0"]
            ).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ol>
          <div className="interactive-bars">
            {values.map((value, index) => (
              <div key={index}>
                <button
                  style={{ height: `${Math.max(12, (value / max) * 100)}%` }}
                  aria-label={`${["周一", "周二", "周三", "周四", "周五", "周六", "今天"][index]} ${mode}${mode === "收入" ? ` ¥${value}` : ` ${value} 次`}`}
                >
                  <span>{mode === "收入" ? `¥${value}` : `${value} 次`}</span>
                </button>
                <small>
                  {
                    ["周一", "周二", "周三", "周四", "周五", "周六", "今天"][
                      index
                    ]
                  }
                </small>
              </div>
            ))}
          </div>
        </div>
        <footer>
          <span>
            单位：{mode === "收入" ? "人民币（元）" : "有效核销（次）"}
          </span>
          <span>数据口径：独立券码在归因窗口内产生的已完成订单</span>
        </footer>
      </section>
      <section className="surface attribution-table">
        <header>
          <div>
            <h3>内容归因明细</h3>
            <p>点击任意内容查看从分享链接到奖励结算的完整证据</p>
          </div>
          <span>
            活动总收入 ¥{campaign.attributableRevenue.toLocaleString()} · ROI{" "}
            {selectRoi(state).toFixed(1)}
          </span>
        </header>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>内容标题</th>
                <th>共创者</th>
                <th>平台</th>
                <th>领券</th>
                <th>核销</th>
                <th>可归因收入</th>
                <th>已发奖励</th>
                <th>ROI</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.title}
                  tabIndex={0}
                  onClick={() => setSelected(row)}
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") && setSelected(row)
                  }
                  className={selected?.title === row.title ? "selected" : ""}
                >
                  <td>
                    <strong>{row.title}</strong>
                  </td>
                  <td>{row.customer}</td>
                  <td>{row.platform}</td>
                  <td>{row.claims}</td>
                  <td>{row.redemptions}</td>
                  <td>¥{row.revenue}</td>
                  <td>¥{row.reward}</td>
                  <td>{row.roi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {selected && (
        <div className="attribution-drawer" role="dialog" aria-label="归因详情">
          <button aria-label="关闭归因详情" onClick={() => setSelected(null)}>
            <X />
          </button>
          <span>完整归因详情</span>
          <h2>{selected.title}</h2>
          <p>
            {selected.customer} · {selected.platform}
          </p>
          <ol>
            <li>
              <b>01</b>
              <div>
                <strong>{selected.customer} 完成内容发布</strong>
                <small>内容已通过审核并授权</small>
              </div>
            </li>
            <li>
              <b>02</b>
              <div>
                <strong>{selected.claims} 人领取专属券</strong>
                <small>独立券码 {selected.code}</small>
              </div>
            </li>
            <li>
              <b>03</b>
              <div>
                <strong>{selected.redemptions} 人完成到店核销</strong>
                <small>示例订单 {selected.order}</small>
              </div>
            </li>
            <li>
              <b>04</b>
              <div>
                <strong>可归因收入 ¥{selected.revenue}</strong>
                <small>
                  已发奖励 ¥{selected.reward} · 内容 ROI {selected.roi}
                </small>
              </div>
            </li>
          </ol>
          <aside>
            <strong>归因规则</strong>
            <p>
              每条内容绑定独立链接或券码；归因窗口为领券后 7
              天；单个订单只归因一次；重复账号、订单和异常核销进入人工审核。
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
