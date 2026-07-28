export const Navbar = () => {
    return (
        <>
        <nav className="bg-black text-white flex justify-between p-7 mb-70" suppressHydrationWarning={true}>
        <h1 className="font-bold text-4xl">Welcome</h1>
        <div className="">
        <a className="font-bold text-2xl pr-8" href="./">Home</a>
        <a className="font-bold text-2xl pr-8" href="./server" >Server Page</a>
        <a className="font-bold text-2xl pr-8" href="./client">Client Page</a>
       </div>
      </nav>
        </>
    )
}