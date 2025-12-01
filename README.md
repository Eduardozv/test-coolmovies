# Important Note

When submitting, please add the following user(s) as collaborators to your **private** repo:

- GitHub `@SamuelCarlos`
- Gitlab `@samuel.xavier`

# Coolmovies web challenge

You have to add the cool movies review feature to the existing `coolmovies-frontend`. You are required to add a new `/reviews` endpoint to the application that renders a list of movies. A user should be able to add a new review with a rating.

We have created a basic app for you to get started in.

What tooling has been setup for you: **You must use these tools to complete the test.**

- [Next.js](https://nextjs.org/) (Build Framework)
- [MUI](https://mui.com/) (Component Library)
- [Redux Toolkit](https://redux-toolkit.js.org/) (State Management)
- [Redux-Observable](https://redux-observable.js.org/) (State Side-effect Middleware)
- [Apollo GraphQL](https://www.apollographql.com/) (GraphQL Query Client)

If you're unfamiliar with any of these, please read their documentation. We have also added some example code for the ideal patterns we would like to see. Have a look at `src/pages/index.tsx`.

We are providing you a GraphQL API mock application to consume. We have also setup [GraphQL Codegen](https://the-guild.dev/graphql/codegen) for you. This will automatically generate graphql documents and hooks for you. To run this run `yarn graphql-types` with the backend running. To add more queries for this test just add more `*.graphql` files.

## Acceptance Criteria

**You will be evaluated on your UI/UX. We expect this to be at the level of a basic prototype; clean and clear flow.**

**You will be evaluated on critical thinking and decision making, so be mindful of any direction you take**

**You will be evaluated against your ability to understand and use the tooling provided and mimic existing patterns that are shown in the examples.**

There are 2 main components for this feature, they **MUST** be completed and working:

1. Listing of the movie reviews.
2. Adding additional reviews.

Additional things we would like to see:

1. Our designers don't like the default MUI blue. Change this.
2. Make the proxied GraphQL URL an environment variable.
3. Add a few unit tests to your code. (These must pass).
4. Acessibility is important, [ARC Toolkit](https://chromewebstore.google.com/detail/arc-toolkit/chdkkkccnlfncngelccgbgfmjebmkmce?hl=en) extension is a good companion on this. Configure it to WCAG 2.1 and focus on **errors**.
