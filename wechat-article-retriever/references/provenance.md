# Source

- Author: MrQ / mr-q526.
- Skill page: https://clawhub.ai/mr-q526/skills/wechat-toolkit
- Retrieved package: https://clawhub.ai/api/v1/download?slug=wechat-toolkit&version=1.0.2
- Registry API reported 1.0.2 as latest at retrieval on 2026-10-06; the web page showed different version metadata, so this installation explicitly pins the downloaded package.
- License: MIT-0; preserved in LICENSE.md.
- An independent Hermes port was inspected at https://github.com/QUSEIT/skill-wechat-toolkit/tree/0f895c236061b47645b86d3aba135619fbe10572 . Its search script matches this package byte-for-byte before local edits.

# Codex adaptation

- Local skill: wechat-article-retriever.
- Maintained package: https://github.com/cqh6666/hai-skills/tree/master/wechat-article-retriever
- Local version: 1.0.2-codex.4, focused on article search and retrieval.
- Native SKILL.md and agents/openai.yaml routing, with a short search and retrieval guide.
- Cheerio and Puppeteer Core are installed locally and locked with package-lock.json.
- Search resolves original article links and optionally retrieves result text.
- Search reports access/parse failures explicitly and checks article redirects.
- The downloader uses a fresh Chrome profile with the browser sandbox, workspace output paths and bounded requests.

This is a local adaptation of the author's public package, not a verified byte-for-byte export of the WorkBuddy marketplace edition. Updating from upstream may overwrite the adaptation; preserve it before upgrades.
