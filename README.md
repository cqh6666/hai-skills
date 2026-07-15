# hai-skill
个人的 skill 收集

## 目录

| Skill | 说明 | 来源 |
| --- | --- | --- |
| [architecture-diagram](./architecture-diagram) | 生成独立 HTML 文件形式的专业系统架构图（内联 SVG），默认浅色主题，可按需切换深色主题。适用于系统架构图、基础设施图、云架构图、安全架构图、网络拓扑图等技术图示。 | [Cocoon-AI/architecture-diagram-generator](https://github.com/Cocoon-AI/architecture-diagram-generator)（MIT） |
| [drawio-skill](./drawio-skill) | 生成 `.drawio` XML 并通过本地 draw.io 桌面客户端 CLI 导出 PNG/SVG/PDF/JPG。适用于流程图、架构图、ER 图、UML（时序图/类图）、网络拓扑、由 Terraform/Kubernetes 清单生成的云架构图、ML/DL 模型结构图、思维导图等，支持自定义样式、泳道和丰富图形库。需要本机安装 draw.io 桌面应用 CLI。 | [Agents365-ai/drawio-skill](https://github.com/Agents365-ai/drawio-skill)（MIT） |
| [archscribe](./archscribe) | 生成岚叔 / DailyDoseOfDS 风格的手绘动态架构图、流程图、泳道图，支持暗色霓虹与浅色纸张两种主题，可导出 PNG/SVG/GIF/MP4、可编辑 Excalidraw 源文件及交互式 HTML。通过 JSON spec 描述 + 本地渲染管线生成，需要 Python 环境（Pillow、svg.path），高级动画/GIF/MP4 需 Playwright + Chromium（MP4 另需 ffmpeg）。 | [lazypay/Archscribe](https://github.com/lazypay/Archscribe)（MIT） |

每个 skill 目录下的 `SKILL.md` 是入口文件，包含完整的使用说明；`LICENSE` 为原仓库的版权声明。
