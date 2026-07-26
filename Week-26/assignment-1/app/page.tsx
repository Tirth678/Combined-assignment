export default function Home() {
  return (
    <div className="flex flex-col m-10 line text-base/8">
      <h1 className="flex justify-center font-bold text-4xl m-4">Welcome to the <span className="text-purple-600 ml-2">Home Page</span></h1>
      <p className="flex justify-center font-lg">Explore different pages built with Next.js</p>
      <p className="flex justify-center"><span className="font-bold">Server Page: </span>Optimised for SEO with pre-rendered content.</p>
      <p className="flex justify-center"><span className="font-bold">Client Page: </span>Provides Client-side interactivity.</p>
    </div>
  );
}
