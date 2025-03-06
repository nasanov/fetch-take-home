# Fetch Take Home Exercise

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

#### First, clone the repository:

```bash
git clone https://github.com/your-username/fetch-take-home.git
cd fetch-take-home

Install the dependencies:
```

#### Then, install the dependencies:

```bash
npm install
# or
yarn install
```

#### Next, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

## Assessment Link

You can find the assessment details [here](https://frontend-take-home.fetch.com/).

## Features implemented
- Authorization - `/login` route
  - `Login` form
  - `Logout` button
- Search dogs - `/search` route
- Sorting and Filtering:
  - Filter by `breed`, `zip_code`, `minAge`, `maxAge`
  - Sorting by `breed`, `age`, `name`
- Pagination
  - Results per page (10, 20, 50, 100)
- Favorite dogs:
  - Marking a dog as favorite (storing in local storage)
  - `Find match` button, makes a call to find a match from the favorite dogs
  - `Find closest match` button, finds the closed dog from the favorite dogs
    - I wasn't able to test this in Arc Browser (share location prompt didn't show up, works fine in Google Chrome)
    - Used `Haversine Distance` algorithm to find the closest location to the location of the current user (didn't know the algorithm, found it [online](https://www.geeksforgeeks.org/haversine-formula-to-find-distance-between-two-points-on-a-sphere/)).
  - `Found match` modal
  - Showing `city` and `state` instead of `zip_code` in the `MatchedDogModal`


## File structure

```
fetch-take-home/
├── app/
│   ├── login/
│   │   ├── page.tsx
│   ├── search/
│   │   ├── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
├── components/
│   ├── Card.tsx
│   ├── LogoutButton.tsx
│   ├── MatchedDogModal.tsx
│   ├── Modal.tsx
│   ├── PaginationControls.tsx
│   ├── SearchFilters.tsx
├── context/
│   ├── auth-context.tsx
├── hooks/
│   ├── useFetchBreeds.ts
│   ├── useFetchDogs.ts
│   ├── useFindMatch.ts
├── styles/
│   ├── Card.css
│   ├── Search.css
├── types/
│   ├── index.ts
├── README.md
├── package.json
```
