# FindJobsZA Blog

Welcome to the FindJobsZA blog, a platform powered by Next.js, Tailwind CSS, and Firebase. This blog is hosted on Vercel and can be accessed at [https://findjobs-za.vercel.app/](https://findjobs-za.vercel.app/).

## Technologies Used

- **Next.js**: A React framework for building server-rendered applications.
- **Tailwind CSS**: A utility-first CSS framework for quickly styling your applications.
- **Firebase**: A platform for building web and mobile applications with a serverless backend.
- **Vercel**: A cloud platform for static sites and serverless functions.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

2. Install dependencies:

```bash
npm install
```

3. Set up Firebase:

   - Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
   - Obtain your Firebase configuration.
   - Add the configuration to a `.env` file:

     ```env
     NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
     NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
     ```

4. Start the development server:

```bash
npm run dev
```

Visit [http://localhost:3000/](http://localhost:3000/) to view your blog.

## Deployment

This blog is automatically deployed to Vercel on each push to the main branch. You can access the hosted site at [https://findjobs-za.vercel.app/](https://findjobs-za.vercel.app/). You can also configure your deployment settings in the Vercel dashboard.

## Contributing

If you'd like to contribute to the development of this blog, please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
