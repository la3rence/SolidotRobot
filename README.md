# Solidot Fanfou Robot

【非官方机器人】每 10 分钟我就去 solidot 看看有没有新闻，然后将新的消息发到 [饭否](https://fanfou.com/jayonit)。

## Serverless Fuction

使用 Vercel 提供的 Node.js Runtime 暴露一个 HTTP API，同时使用第三方定时任务（Easy Cron）去触发。