# Online Editor

A editor to write and share code snippets with your friends

## Installation

Clone the repo, install the dependencies, run using npm

```bash
git clone https://github.com/ItzShubhamDev/online-editor
cd online-editor
npm install
npm run dev
```

## Prerequisites

For self hosting you need

-   Node.Js >= 20
-   MySQL Server - For storing codes

## Deployment

To build for production

```bash
npm run build
npm run start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_HOST`

`DB_PORT`

`DB_USER`

`DB_PASSWORD`

`DB_NAME`

## Features

-   Light/dark mode toggle
-   Multiple Themes
-   Multiple Languages
-   Save & share
-   Read Only Mode

## Tech Stack

**Client:** React, TailwindCSS, Codemirror 5, Lucide React Icons

**Server:** Node, Next.Js

**Database** MySQL
