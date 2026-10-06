# 安装和环境检查

使用 Codex 的 skill-installer 安装这个 GitHub 子目录：

https://github.com/cqh6666/hai-skills/tree/master/wechat-article-retriever

安装器通常会将它放入 `$CODEX_HOME/skills`（默认 `~/.codex/skills`）。也可放入官方支持的用户技能目录 `~/.agents/skills`。以安装器返回的实际路径为准，不在多个目录重复安装同名技能。

## 依赖配置

1. 确认 `node --version` 为 22.12.0 或更高版本，且 npm 可运行。若 Node.js 尚未安装，按用户的安装请求安装 Node.js LTS；新装后重开终端或重启 Codex，让 PATH 生效。
2. 在 Skill 目录安装锁定依赖。Windows 使用 `npm.cmd`，避免 PowerShell 对 npm.ps1 的执行策略限制；macOS/Linux 使用 `npm`。
3. 用户需要下载文章和图片时，确认 Google Chrome 已安装。若用户已授权安装所需软件，可继续安装 Chrome。
4. 运行 `scripts/doctor.cjs`。`searchReady` 表示搜索环境，`downloadReady` 表示下载依赖；检测不包含联网和浏览器启动验证。
5. 运行 `scripts/check-browser.cjs` 验证 Chrome 启动。该检查只打开空白页。遇到权限限制时遵循 Codex 的权限设置。

Windows PowerShell 示例，路径应替换为实际安装目录：

```powershell
$skillDir = Join-Path $env:USERPROFILE '.codex\skills\wechat-article-retriever'
npm.cmd ci --ignore-scripts --prefix "$skillDir"
node "$skillDir\scripts\doctor.cjs"
node "$skillDir\scripts\check-browser.cjs"
```

macOS/Linux 示例：

```sh
npm ci --ignore-scripts --prefix "<skill-dir>"
node "<skill-dir>/scripts/doctor.cjs"
node "<skill-dir>/scripts/check-browser.cjs"
```

脚本会查找 Windows 的 Program Files、Program Files (x86) 和 LocalAppData 中的 Chrome，macOS 的 Applications，以及 Linux 的常见安装路径。找不到时，在 Codex 执行命令的环境中设置 `PUPPETEER_EXECUTABLE_PATH` 为浏览器可执行文件的完整路径，再执行检查。Windows 的环境变量必须在运行脚本的同一环境生效。

搜索及下载需要访问搜狗和微信公众号网站，并允许写入目标输出目录；下载还需要启动本机 Chrome。验证码或微信访问限制应如实报告。WSL 内运行时应配置 WSL 内的 Node.js 和 Linux Chrome/Chromium，不假定能直接复用 Windows 的浏览器路径。

## 验证安装

```sh
node "<skill-dir>/scripts/search/search_wechat.js" "AI 编程" -n 3 -r
```

确认返回文章列表。需要进一步验证抓取时，选择可访问的原文链接运行下载器。遇到验证码即停止该次验证，不报告为安装成功后的完整抓取测试。

Codex 通常自动发现新技能；若列表未更新，重启 Codex。依赖配置成功后，直接用 `$wechat-article-retriever` 或自然语言提出搜索、抓取请求。
