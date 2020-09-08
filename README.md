# Solidot Fanfou Robot

![cron](https://github.com/Lonor/SolidotRobot/workflows/cron/badge.svg?event=schedule)

【非官方机器人】每 10 分钟我就去 solidot 看看有没有新闻，然后将新的消息发到 [饭否](https://fanfou.com/jayonit)。

## Serverless Function

使用 Vercel 提供的 Node.js Runtime 暴露一个 HTTP API，使用 GitHub Actions 提供的 schedule 来定时触发。也可以使用第三方定时任务（如 Easy Cron）去触发。
