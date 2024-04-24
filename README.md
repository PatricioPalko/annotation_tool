This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Before running the app, make sure you have Docker and Docker Compose installed on your system. You can download and install Docker from [https://www.docker.com/get-started](https://www.docker.com/get-started), and Docker Compose is typically installed along with Docker.

You can run the development server **locally:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

...or can run the app with **Docker:**

To run the app with Docker Compose:

1. Clone this repository: git clone https://github.com/PatricioPalko/annotation_tool.git
2. Navigate to the project directory:

```bash
cd annotation_tool
```

3. Build and start the Docker containers:

```bash
docker-compose build
docker-compose up
```

4. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to view the app.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
