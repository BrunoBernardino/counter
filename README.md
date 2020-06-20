# Counter

[![](https://github.com/BrunoBernardino/counter/workflows/Run%20Tests/badge.svg)](https://github.com/BrunoBernardino/counter/actions?workflow=Run+Tests)

This is the Counter app, built with Next.js and deployed with Vercel.

The app will allow you to type any number and try to give you a perspective of how big it is, by estimating how long it would take a human to count to it.

Calculations are loosely based on the math at http://www.blog.republicofmath.com/how-long-does-it-take-to-count-to-one-trillion/.

https://news.brn.sh/putting-numbers-in-perspective explains more about it.

## Development

```bash
make install # installs dependencies
make start # starts the app
make pretty # prettifies the code
make test # runs linting and tests
make deploy # deploys to beta.counter.brn.sh (requires `vercel` to be installed globally)
make deploy/prod # promotes beta to prod at counter.brn.sh (requires `vercel` to be installed globally)
```

### Some tech acknowledgments:

- [TypeScript](https://www.typescriptlang.org)
- [Node.js](https://nodejs.org/)
- [React](https://reactjs.org)
- [Sass](https://sass-lang.com)
- [Next.js](https://nextjs.org)
- [Jest](https://jestjs.io)
- [number-to-words](https://github.com/marlun78/number-to-words)
- [Moment.js](https://momentjs.com)

## TODOs:

- [ ] Generate/update sitemap automatically when deploying
- [ ] Deploy via CI with Github Actions (when merged to master)
