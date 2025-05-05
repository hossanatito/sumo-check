# SumoCheck - AppSumo Deal Details at a Glance

SumoCheck is a Next.js application that allows you to quickly retrieve and review details of AppSumo deals. Simply provide the AppSumo deal URL, and SumoCheck will display the deal's title, description, available plans, and terms.

## Features

*   **Quick Deal Information:** Fetch key deal details like title, description, and vendor email.
*   **Plan Details:**  Displays available plans, pricing, features, and code allocations.
*   **Terms Overview:** Lists the terms and conditions associated with the deal.
*   **Dark Mode:**  A clean and modern dark mode interface for comfortable viewing.
*   **Error Handling:** Gracefully handles invalid URLs and webhook errors, providing informative messages.
*   **Loading State:** Visual loading indicators using React skeletons.

## Technologies Used

*   [Next.js](https://nextjs.org/) - React framework for building performant web applications.
*   [React](https://reactjs.org/) - JavaScript library for building user interfaces.
*   [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling.
*   [Lucide React](https://lucide.dev/) - Beautifully simple icons.
*   [Zod](https://zod.dev/) - TypeScript-first schema validation with Zod.
*   [Firebase Studio](https://studio.firebase.google.com/) - Cloud services platform.

## Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Environment Variables:**
    *   Create a `.env.local` file in the root directory.
    *   Add your Google Generative AI API key

    ```bash
    GOOGLE_GENAI_API_KEY=<your_google_genai_api_key>
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

    Open [http://localhost:9002](http://localhost:9002) (or the port shown in your terminal) in your browser.

## Usage

1.  Enter an AppSumo deal URL in the provided form.
2.  Click the "Check Deal" button.
3.  The deal information will be displayed, including plan details and terms.

## Deployment

This Next.js application can be deployed to various platforms, including:

*   [Vercel](https://vercel.com/)
*   [Netlify](https://www.netlify.com/)
*   [Firebase Hosting](https://firebase.google.com/docs/hosting)

## Contributing

Contributions are welcome! Feel free to submit a pull request.

## License

[MIT](LICENSE)
