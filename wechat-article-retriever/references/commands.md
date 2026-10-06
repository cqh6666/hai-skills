# 搜索与抓取命令

将 `<skill-dir>` 替换为包含 SKILL.md 的目录。

- 关键词搜索：`node "<skill-dir>/scripts/search/search_wechat.js" "关键词" -n 5`
- 解析原文链接：加 `-r`。
- 按需读取搜索结果正文：加 `-c`，自动包含链接解析。
- 保存 JSON：加 `-o "/absolute/path/search.json"`。
- 下载正文和图片：`node "<skill-dir>/scripts/downloader/download.js" "https://mp.weixin.qq.com/s/..." --output "/absolute/path/articles" --no-video`。
- 只保存正文：下载命令加 `--no-image`；需要视频或音频时省略 `--no-video`。
- 检查运行环境：`node "<skill-dir>/scripts/doctor.cjs"`。

搜索需要 Node.js 22.12 或更新版本及本地 Cheerio。下载还需要 Puppeteer Core 和已安装的 Chrome；可通过 `PUPPETEER_EXECUTABLE_PATH` 指定 Chrome 路径。缺少依赖时按 [安装说明](install.md) 配置。

`url_resolved` 和 `content_fetched` 分别表示链接解析和正文读取状态。HTTP 请求成功不等于已取得正文。日期和公众号名称来自搜索页，缺失日期应标为未知。搜狗临时跳转链接可能失效。

验证码、访问限制和无法识别的页面应报告为检索失败。可以稍后重试；使用替代检索来源时说明来源。某篇正文读取失败时保留其搜索结果和链接，并如实说明失败。

下载结果位于 `<标题>/article.md`、`article.html`、`metadata.json`、`images/` 和 `videos/`。嵌入或受保护的视频可能不可下载，保存的 m3u8 清单也不等于完整视频。逐项报告素材下载失败。

浏览器使用独立配置，不自动继承现有登录。下载遇到验证时停止并报告；用户可以自行打开原文确认是否可访问。
