# 微信公众号文章搜索与抓取

搜索公众号文章、读取全文，并保存正文、图片和来源信息。搜索基于搜狗微信，下载使用本机 Chrome。

## 在另一台电脑安装

把下面这句话发给 Windows 或 macOS 上的 Codex：

> 请用 skill-installer 安装 https://github.com/cqh6666/hai-skills/tree/master/wechat-article-retriever 这个 Skill，并按 references/install.md 完成依赖配置和环境检查；缺少 Node.js 或 Chrome 时请帮我安装。

Skill 安装与 npm 依赖配置是两步，以上提示会让 Codex 完成两步。环境需要 **Node.js 22.12+**；下载正文和图片还需要 **Google Chrome**。没有 Chrome 时仍可搜索和通过 HTTP 读取正文。

详细步骤和 PowerShell 命令见 [安装说明](references/install.md)。安装完成后可说：

> 用 $wechat-article-retriever 搜索 5 篇关于 AI 编程的公众号文章，并把前 2 篇的正文和图片保存到本地。

也可直接给文章地址：

> 用 $wechat-article-retriever 抓取这篇文章：https://mp.weixin.qq.com/s/文章地址

## 保存内容

每篇文章保存到独立目录，包含 `article.md`、`article.html`、`metadata.json`、`images/`；按需尝试保存可访问的视频或音频。默认输出目录是当前工作区的 `outputs/wechat-articles`。

搜狗收录并不完整；微信验证码、删除或访问限制可能导致抓取失败。正文中的图片链接仍可能指向网络资源，下载器会另外保存图片文件。下载到的 m3u8 清单不等于完整视频。

## 检查与维护

在本目录运行 `npm ci --ignore-scripts`、`npm test`、`npm run doctor`。用 `npm run check:browser` 验证 Chrome 能否启动；该检查只操作空白页，不请求微信。

[自动检查](https://github.com/cqh6666/hai-skills/actions/workflows/wechat-article-retriever.yml)覆盖 Windows 和 Ubuntu 的依赖安装、离线回归与 Chrome 启动。通过这些检查不代表任何微信文章都可以抓取。

使用入口是 [SKILL.md](SKILL.md)，命令参数见 [commands](references/commands.md)，路由示例见 `evals/`。基于 MrQ 的公开 wechat-toolkit 包改编，来源见 [provenance](references/provenance.md)，许可证为 [MIT-0](LICENSE.md)。
