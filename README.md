# Solidot Fanfou Robot

[![cron](https://github.com/Lonor/SolidotRobot/workflows/cron/badge.svg?event=schedule)](https://github.com/Lonor/SolidotRobot/actions)

【非官方机器人】每 10 分钟我就去 [solidot](https://www.solidot.org) 看看有没有新闻，然后将新的消息发到 [饭否](https://fanfou.com/jayonit)。

## Serverless Function

使用 [Vercel 提供的 Node.js Runtime 暴露一个 HTTP API](https://vercel.com/guides/deploying-a-mongodb-powered-api-with-node-and-vercel)，使用 [GitHub Actions 提供的 schedule](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#onschedule) 来定时触发，也可以使用第三方定时任务（如 EasyCron）去触发。
