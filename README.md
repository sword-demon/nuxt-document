# nuxt-document

一个基于 `Nuxt 4` 和 `Nuxt UI` 的文档站/展示页项目，当前已搭建首页、文档页、登录/注册页、全局布局、页头页脚、主题色和基础工程化配置，适合作为文档站、产品介绍页或内容站的起点。

## 项目概览

| 维度 | 当前实现 |
| --- | --- |
| 框架 | Nuxt 4 |
| UI | Nuxt UI 4 |
| 样式 | Tailwind CSS 4 + `@nuxt/ui` |
| 语言 | TypeScript |
| 代码质量 | ESLint 10 + Nuxt ESLint |
| 字体/主题 | `@nuxt/fonts`(local) + 自定义主色/中性色 + 中文字体 |
| 页面状态 | 首页 + 文档页 + 登录/注册 + Header/Footer |

## 当前页面结构

```text
default layout
├─ Header
├─ 页面内容
│  ├─ /                          首页
│  │  ├─ Hero
│  │  └─ Section
│  ├─ /auth/login                登录页
│  ├─ /auth/register             注册页
│  └─ /docs/getting-started      文档页
│     ├─ index                   入门指南
│     ├─ theme/design-system     设计系统
│     └─ integrations/
│        ├─ color-mode           色彩模式
│        ├─ fonts                字体
│        └─ icons                图标
└─ Footer
```

## 目录结构

```text
.
├─ app/
│  ├─ app.config.ts                  # Nuxt UI 主题配置
│  ├─ app.vue                        # 应用入口
│  ├─ assets/css/main.css            # Tailwind 与主题变量入口
│  ├─ components/
│  │  ├─ docs-page-shell.vue         # 文档页面通用外壳
│  │  ├─ header.vue                  # 全局页头
│  │  └─ footer.vue                  # 全局页脚
│  ├─ layouts/
│  │  └─ default.vue                 # 默认布局
│  └─ pages/
│     ├─ auth/
│     │  ├─ login.vue                # 登录页
│     │  └─ register.vue             # 注册页
│     ├─ docs/
│     │  └─ getting-started/
│     │     ├─ index.vue             # 文档入门页
│     │     ├─ theme/
│     │     │  └─ design-system.vue  # 设计系统
│     │     └─ integrations/
│     │        ├─ color-mode.vue     # 色彩模式
│     │        ├─ fonts.vue          # 字体
│     │        └─ icons.vue          # 图标
│     └─ index/
│        ├─ index.vue                # 首页入口
│        └─ components/
│           ├─ hero.vue              # 首页 Hero 区块
│           └─ section.vue           # 首页功能区块
├─ eslint.config.mjs                 # ESLint flat config
├─ nuxt.config.ts                    # Nuxt 配置
└─ .prettierrc.json                  # Prettier 配置
```

## 关键实现

### 1. 页面组件自动加载

项目不仅加载 `app/components` 下的全局组件，也额外把 `app/pages/**/components/**/*.vue` 纳入自动注册范围，便于按页面就近组织组件。

```text
组件来源
├─ ~/components
└─ ~/pages/**/components/**/*.vue
```

### 2. 首页由两个区块组成

- `Hero`：展示标题、说明、CTA 按钮和预览图
- `Section`：展示能力点卡片

### 3. 文档页面使用统一外壳

- `docs-page-shell.vue`：提供文档页面通用布局（标题、描述、要点卡片）
- 文档路由：`/docs/getting-started` 及其子页面

### 4. 默认布局包含统一头尾

- `Header`：站点品牌、登录/注册按钮
- `Footer`：版权、导航菜单、GitHub 按钮

### 5. 认证页面

- `登录页`：`/auth/login`，使用 Zod 表单校验
- `注册页`：`/auth/register`，使用 Zod 表单校验
- 使用 `UAuthForm` 组件构建统一风格的认证表单

### 6. 主题已做基础定制

- 主色：`green`
- 中性色：`slate`
- 默认无衬线字体：`Public Sans`
- 中文字体：`Liu Jian Mao Cao`、`ZCOOL QingKe HuangYou`

## 开发命令

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
pnpm preview
```

## 本地开发

开发服务器默认启动在 `http://localhost:3000`：

```bash
pnpm dev
```

## 工程约定

| 项目 | 约定 |
| --- | --- |
| 包管理器 | `pnpm` |
| 格式化 | `Prettier` |
| 静态检查 | `ESLint` |
| 类型检查 | `nuxt typecheck` |
| 页面组件组织 | 页面目录内可拆分 `components/` |

## 当前已启用的 Nuxt 模块

- `@nuxt/eslint`
- `@nuxt/ui`
- `@nuxt/fonts`

## 主要依赖

- `nuxt`: ^4.4.2
- `@nuxt/ui`: ^4.6.0
- `tailwindcss`: ^4.2.2
- `zod`: ^4.3.6（表单校验）
- `@iconify-json/lucide`: ^1.2.100
- `@iconify-json/simple-icons`: ^1.2.75

## 后续可继续扩展的方向

- 补充真实文档内容与 MDX/Content 支持
- 替换首页示例文案和示意图
- 接入后端鉴权 API，实现真实登录/注册
- 完善 SEO、站点信息和部署说明
- 添加搜索功能
- 接入内容管理系统

