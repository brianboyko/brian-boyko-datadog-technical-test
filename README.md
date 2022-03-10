# Brian Boyko Technical Test Datadog

## Technical Requirements

A user should be able to view your application to answer the following questions about their computer:

- [ ] What is my computer's current average CPU load?
- [✔] How did the average CPU load change over a 10 minute window?
- [✔] Has my computer been under heavy CPU load for 2 minutes or more? When? How many times?
- [✔] Has my computer recovered from heavy CPU load? When? How many times?

## Product requirements:

- [✔] The front-end application should communicate with a local back-end service to retrieve CPU load average information from your computer (see below).
- [✔] The front-end application should retrieve CPU load information every 10 seconds.
- [✔] The front-end application should maintain a 10 minute window of historical CPU load information.
- [✔] The front-end application should alert the user to high CPU load.
- [ ] The front-end application should alert the user when CPU load has recovered.

## Engineering requirements:

- [ ] The alerting logic in your application should have tests.
- [✔] The back-end service does not need to persist data.
- [ ] Please write up a small explanation of how you would extend or improve your application design if you were building this for production.

### A small explaination of how I would extend or improve the application design if I was building this for production

This is probably the biggest thing I would have done differently - I probably would have spent more time clarifying the requirements with the client.

Lincoln was reported as saying: "Give me six hours to chop down a tree, and I'll spend five hours sharpening the axe."

Because this was "just a technical test" I rushed into it, hoping to get you an answer as soon as possible.

In this case, the alerting functionality may not be what you may have expected, now that I think about it.

The alerting logic is not that sophisticated. It merely informs you that periods of recovery and high load _have happened_, not _are happening._ What might have been a better solution would be to set up some sort of websocket service on the backend and frontend where the backend could send push alerts in the form of toasts, rather than sending data to the front-end to be calculated in the browser.

Right now, the alerting logic is not that sophisticated; rather than waiting for an event to happen, it creates responses out of the data that is already present.

First, I would probably suggest that the back-end be made an independent microservice, and that it did contain stateful data. Next.js was a good choice for a simple proof of concept design and got up and running very quickly, but ideally the server logging the data should not be the same server that displays the front-end. If nothing else, hot-refresh means that when I would change code in the browser, it would often mean a server restart.

I chose recharts as a quick solution to getting the info displayed in a line graph but there are some nagging visual bugs that may crop up even in this small test - and that, I will admit, does not look good on an application! The time it would take to debug this "heisenbug" error (sometimes it shows up, sometimes it doesn't) in recharts would likely take up more time than the actual test.

## Technical Decisions

- Next.js - As the solution requires both backend and frontend code, Next.js was an ideal solution.

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
