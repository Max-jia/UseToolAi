# UseToolAI Affiliate 接入方案

> 目标：工具页「Visit」按钮接入 affiliate 链接，在不影响用户体验的前提下赚钱

---

## 一、你需要做的事情（注册平台）

### 第1步：注册 Impact.com

👉 `https://impact.com`

这是最大的 affiliate 平台，覆盖以下工具：

| 工具 | 佣金 | 优先级 |
|------|------|--------|
| Semrush | 30-40% 循环，单笔佣金最高可到 $200+ | 🔴 最高 |
| Grammarly | $0.20/免费注册 + $20/付费用户 | 🔴 |
| Midjourney | 30%+ | 🟡 |
| Descript | 佣金制 | 🟡 |
| ChatGPT (via OpenAI) | 需申请，20-30% 循环 | 🔴 |

> 注册后去 Brands → Search → 搜上面这些工具名 → Apply。大部分会自动批准，少数（ChatGPT、Grammarly）可能人工审核。

---

### 第2步：注册 PartnerStack

👉 `https://partnerstack.com`

覆盖以下工具：

| 工具 | 佣金 | 优先级 |
|------|------|--------|
| Jasper | 30% 循环 | 🟡 |
| Writesonic | 25-30% 循环 | 🟡 |
| Copy.ai | 20-30% 循环 | 🟡 |
| Notion | $10/付费用户 | 🟡 |

> PartnerStack 注册比 Impact 简单。搜品牌名 → Join Program → 拿到你的专属链接。

---

### 第3步：拿到链接后，给我以下信息

格式：
```
工具名: 你的 affiliate 链接
```

例如：
```
Semrush: https://semrush.sjv.io/xxxxx
Grammarly: https://grammarly.go2cloud.org/xxxxx
```

我帮你接入代码。

---

## 二、我会做的事情（代码方案）

### 方案：工具页自动使用 affiliate 链接

**逻辑：**
- 工具 markdown 文件新增可选 `affiliateUrl` 字段
- 如果有 `affiliateUrl`，`Visit` 按钮用 affiliate 链接
- 如果没有，继续用原始 `url`
- 自动加 `rel="sponsored"`（Google 要求的 affiliate 声明）

**效果：**
```
之前：Visit Semrush → semrush.com
之后：Visit Semrush → semrush.sjv.io/你的ID（用户无感）
```

**改动量：** 2 个文件，5 行代码。你拿到链接后 5 分钟接好。

---

## 三、优先级策略

| 优先级 | 工具 | 为什么 |
|--------|------|--------|
| 🔴 第1 | **Semrush** | 你的站 Google 已经关联 Semrush，每天 2,349 次展示。排名上去后点击最多的就是它。而且 Semrush 佣金最高（$200+/单） |
| 🔴 第2 | **ChatGPT** | 你 25 篇文章里提到 ChatGPT 次数最多，流量最大 |
| 🟡 第3 | **Grammarly, Jasper, Writesonic** | 写作工具合集流量大，conversion 高 |
| 🟢 第4 | **Midjourney, Notion, Descript** | 长尾但值得接 |

---

## 四、FAQ

### Q: 用户点击 affiliate 链接后需要马上购买我才有佣金吗？

**A:** 不一定。大部分平台有 cookie 窗口（30-90 天）。用户点你的链接后，30 天内注册/购买都算你的。这就是为什么即使免费试用也有价值 — 用户试用后转付费也算你的。

### Q: 需要披露 affiliate 关系吗？

**A:** 是的。我们在 footer 已经写了"We may earn affiliate commissions from some links." 符合 FTC 要求。每个 affiliate 链接会加 `rel="sponsored"` 属性，满足 Google SEO 要求。

### Q: 多久能见到收入？

**A:** 取决于流量。按目前的 zero traffic，先别想收入。等 Reddit/SEO 开始来流量后，预计第 1-3 个月 $50-200/月，第 4-6 个月 $200-1,000/月。
