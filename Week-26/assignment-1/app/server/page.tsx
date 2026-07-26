export default function Server() {
  return (
    <div className="flex flex-col m-10 text-base/6">
      <h1 className="flex justify-center font-bold text-4xl m-4">Welcome to the <span className="text-purple-600 ml-2">Server Page</span></h1>
      <p className="flex justify-center font-lg">This page is statically generated using <span className="font-bold ml-1">Next.js</span> The content is </p>
      <p className="flex justify-center font-lg">**pre-rendered on the server** and then sent the client for a fast </p> 
      <p className="flex justify-center font-lg">and efficient user experience.</p>

    </div>
  );
}
