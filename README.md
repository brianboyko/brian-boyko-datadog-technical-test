# Brian Boyko Technical Test Datadog

## Installing and running

```bash
$ npm run install
$ npm run build
$ npm run start
```

Then browse to http://localhost:3000/ for live data,
or http://localhost:3000/debug for some pre-captured data.

## PLEASE NOTE - KNOWN ISSUE

I normally like to put a lot of spit and polish on technical tests like this, but I've noticed a "sometimes it happens, sometimes it doesn't" bug on recharts where the X-axis is incorrectly formatted on the Debug page on the debug page. This is a known issue, and is one of the things I would fix if this was in production.

## Technical Requirements

A user should be able to view your application to answer the following questions about their computer:

- [✔] What is my computer's current average CPU load?
- [✔] How did the average CPU load change over a 10 minute window?
- [✔] Has my computer been under heavy CPU load for 2 minutes or more? When? How many times?
- [✔] Has my computer recovered from heavy CPU load? When? How many times?

## Product requirements:

- [✔] The front-end application should communicate with a local back-end service to retrieve CPU load average information from your computer (see below).
- [✔] The front-end application should retrieve CPU load information every 10 seconds.
- [✔] The front-end application should maintain a 10 minute window of historical CPU load information.
- [✔] The front-end application should alert the user to high CPU load.
- [✔] The front-end application should alert the user when CPU load has recovered.

## Engineering requirements:

- [✔] The alerting logic in your application should have tests.
- [✔] The back-end service does not need to persist data.
- [✔] Please write up a small explanation of how you would extend or improve your application design if you were building this for production.

## A small explaination of how I would extend or improve the application design if I was building this for production

### Clarify the requirements better.

This is probably the biggest thing I would have done differently - I probably would have spent more time clarifying the requirements with the client.

Lincoln was reported as saying: "Give me six hours to chop down a tree, and I'll spend five hours sharpening the axe."

Because this was "just a technical test" I rushed into it, hoping to get you an answer as soon as possible. It was a tradeoff, but hopefully not one I would have made in the real world. 

### Create a seperate daemon, use websockets.

In this case, the alerting functionality may not be what you may have expected, now that I think about it.

The alerting logic is not that sophisticated. It merely informs you that periods of recovery and high load _have happened_, not _are happening._

And like a **ton of bricks** in hindsight, it turns out what what I _really, really_ should have used was a seperate Node.js server that runs as a daemon, which used websockets to push alert messages to the browser. (Instead, I thought: well, this will need an API as well as a front-end, so start with Next.js as a starting point and just go from there.)

### Do more research on a charting library.

Recharts seems to be a bit buggy - you may experience a visual bug with the chart. I don't think the problem lives in my code, I just wanted a quick and simple charting library. 

### Use Axios, not fetch.

While fetch is great and having something you can use natively is also super, the problem is that it's easier to mock Axios, a library, than it is to mock fetch, which is really two libraries - fetch for node and fetch for the browser. This made unit testing useProbe such a pain that I decided to abandon that custom hook.

### Integration Testing (Cypress)

In a production build, I'd probably want to have some form of integration testing with a library like Cypress or Playwright

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
