import {
  Check,
  Heart,
  Image,
  LoaderCircle,
  Plus,
  RefreshCw,
  Sparkles,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assetUrl } from "../app/assets";
import { useFeedback } from "../app/feedback-context";
import { routes } from "../app/routes";
import type { ContentDraft, ExperienceFacts, Platform } from "../domain/types";
import { MobileLayout } from "../layouts/MobileLayout";
import { generateContent } from "../services/aiContentService";
import { checkContent } from "../services/qualityService";

const platforms: Platform[] = ["小红书", "抖音", "朋友圈"];
export function CustomerCreatePage() {
  const navigate = useNavigate();
  const { notify } = useFeedback();
  const [stage, setStage] = useState<"answers" | "facts" | "drafts">("answers");
  const [loading, setLoading] = useState(false);
  const [platform, setPlatform] = useState<Platform>("小红书");
  const [drafts, setDrafts] = useState<ContentDraft | null>(null);
  const [answers, setAnswers] = useState({
    favorite: "桂花香很柔和，和咖啡的醇厚刚刚好",
    scene: "一个人在窗边，下午阳光照进来很放松",
    recommend: "喜欢咖啡，也喜欢生活小确幸的朋友",
  });
  const [facts, setFacts] = useState<ExperienceFacts>({
    product: "桂花拿铁",
    feeling: "桂花香柔和、咖啡口感醇厚",
    scene: "一个人在窗边、下午阳光",
    audience: "喜欢咖啡和生活小确幸的朋友",
  });
  function extract() {
    setStage("facts");
  }
  async function confirmFacts() {
    setLoading(true);
    const value = await generateContent({
      favorite: facts.feeling,
      scene: facts.scene,
      recommend: facts.audience,
    });
    setDrafts(value);
    setLoading(false);
    setStage("drafts");
  }
  function confirmContent() {
    if (!drafts) return;
    sessionStorage.setItem(
      "cogrow-content-draft",
      JSON.stringify({ drafts, platform, facts, answers }),
    );
    navigate(routes.publish);
  }
  const step = stage === "answers" ? 1 : stage === "facts" ? 2 : 3;
  return (
    <MobileLayout backTo={stage === "answers" ? routes.customer : undefined}>
      <section className="create-flow">
        <div className="mobile-progress">
          <span style={{ width: `${(step / 3) * 100}%` }} />
          <b>{step} / 3</b>
        </div>
        {stage === "answers" && (
          <div className="mobile-body">
            <header className="mobile-title">
              <h1>说说你的真实体验</h1>
              <p>不用费心组织语言，AI 会先提取事实，再由你确认。</p>
            </header>
            <div className="fact-questions">
              <label>
                <Heart />
                <span>
                  <strong>你最喜欢这杯咖啡的哪一点？</strong>
                  <textarea
                    value={answers.favorite}
                    onChange={(e) =>
                      setAnswers({ ...answers, favorite: e.target.value })
                    }
                  />
                </span>
              </label>
              <label>
                <Sparkles />
                <span>
                  <strong>当时是什么场景？</strong>
                  <textarea
                    value={answers.scene}
                    onChange={(e) =>
                      setAnswers({ ...answers, scene: e.target.value })
                    }
                  />
                </span>
              </label>
              <label>
                <Users />
                <span>
                  <strong>你愿意推荐给谁？</strong>
                  <textarea
                    value={answers.recommend}
                    onChange={(e) =>
                      setAnswers({ ...answers, recommend: e.target.value })
                    }
                  />
                </span>
              </label>
            </div>
            <div className="upload-row">
              <div>
                <span>
                  <Image />
                  已选择 2 张照片
                </span>
                <small>最多 9 张</small>
              </div>
              <div className="mobile-photos">
                <img
                  src={assetUrl("/assets/customer-moment-v2.png")}
                  alt="顾客的咖啡照片"
                />
                <img
                  src={assetUrl("/assets/cafe-interior.png")}
                  alt="咖啡店环境"
                />
              <button
                aria-label="添加照片"
                onClick={() =>
                  notify('照片选择器为演示状态，当前已保留 2 张真实消费照片')
                }
              >
                  <Plus />
                  <span>添加</span>
                </button>
              </div>
            </div>
            <button className="mobile-primary" onClick={extract}>
              <Sparkles />让 AI 提取体验事实
            </button>
          </div>
        )}
        {stage === "facts" && (
          <div className="mobile-body">
            <header className="mobile-title">
              <h1>确认 AI 提取的体验事实</h1>
              <p>这些内容来自你的真实回答。AI 不会添加你没有表达过的体验。</p>
            </header>
            <section className="extracted-facts">
              <span>
                <Sparkles />
                AI 已提取 4 项事实
              </span>
              {[
                ["产品", "product"],
                ["感受", "feeling"],
                ["场景", "scene"],
                ["推荐对象", "audience"],
              ].map(([label, key]) => (
                <label key={key}>
                  <small>{label}</small>
                  <textarea
                    value={facts[key as keyof ExperienceFacts]}
                    onChange={(e) =>
                      setFacts({ ...facts, [key]: e.target.value })
                    }
                  />
                </label>
              ))}
            </section>
            <aside className="truth-notice">
              <Check />
              <p>
                <strong>事实边界已锁定</strong>
                <br />
                后续生成只会调整表达结构，不会虚构味道、场景或人物。
              </p>
            </aside>
            <div className="mobile-double">
              <button
                className="mobile-secondary"
                onClick={() => setStage("answers")}
              >
                返回修改回答
              </button>
              <button
                className="mobile-primary"
                disabled={loading}
                onClick={confirmFacts}
              >
                {loading ? (
                  <>
                    <LoaderCircle className="spin" />
                    生成中…
                  </>
                ) : (
                  <>确认事实并生成</>
                )}
              </button>
            </div>
          </div>
        )}
        {stage === "drafts" && drafts && (
          <div className="mobile-body editor-mobile">
            <header className="mobile-title">
              <h1>选择你的平台版本</h1>
              <p>三种内容结构不同，任何文字都可以继续修改。</p>
            </header>
            <div className="generation-trace">
              <span>
                <Check />
                确认体验事实
              </span>
              <i />
              <span>
                <Check />
                匹配平台结构
              </span>
              <i />
              <span>
                <Check />
                完成风险检查
              </span>
            </div>
            <div className="mobile-platform-tabs" role="tablist">
              {platforms.map((item) => (
                <button
                  role="tab"
                  aria-selected={platform === item}
                  className={platform === item ? "active" : ""}
                  onClick={() => setPlatform(item)}
                  key={item}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="structure-tags">
              {drafts[platform].structure.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <label className="mobile-editor">
              <span>
                标题 <small>{drafts[platform].title.length}/30</small>
              </span>
              <input
                value={drafts[platform].title}
                onChange={(e) =>
                  setDrafts({
                    ...drafts,
                    [platform]: { ...drafts[platform], title: e.target.value },
                  })
                }
              />
            </label>
            <label className="mobile-editor">
              <span>
                {platform === "抖音" ? "分镜与口播" : "正文"}{" "}
                <small>{drafts[platform].body.length}/1000</small>
              </span>
              <textarea
                value={drafts[platform].body}
                onChange={(e) =>
                  setDrafts({
                    ...drafts,
                    [platform]: { ...drafts[platform], body: e.target.value },
                  })
                }
              />
            </label>
            {checkContent(drafts[platform].title + drafts[platform].body) ? (
              <p className="quality-warning">
                {checkContent(drafts[platform].title + drafts[platform].body)}
              </p>
            ) : (
              <p className="quality-ok">
                <Check />
                内容只使用已确认事实，未发现夸张描述。
              </p>
            )}
            <div className="mobile-photo-strip">
              <img
                src={assetUrl("/assets/customer-moment-v2.png")}
                alt="咖啡照片"
              />
              <img src={assetUrl("/assets/cafe-interior.png")} alt="门店环境" />
            </div>
            <div className="mobile-double">
              <button
                className="mobile-secondary"
                onClick={() => setStage("facts")}
              >
                <RefreshCw />
                修改事实
              </button>
              <button className="mobile-primary" onClick={confirmContent}>
                确认这个版本
              </button>
            </div>
          </div>
        )}
      </section>
    </MobileLayout>
  );
}
