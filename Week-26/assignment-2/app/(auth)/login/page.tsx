import SignInBtn from "@/components/Signin";
import Button from "@/components/Signin";

export default function Authpage(){
  return (
    <>
    <div className="bg-white w-123 h-102 self-center place-items-center m-50 rounded-2xl border-4">
        <h1 className="text-black place-items-center m-5 text-3xl font-bold ">Sign In</h1>
        <label htmlFor="mail" className="text-black pl-8">Email</label>
        <input id="mail" className="bg-blue-300 text-left flex px-30 py-2 justify-center mb-8" type="text"/>
        <label htmlFor="pass" className="text-black pl-8">Password</label>
        <input id="pass" className="bg-blue-300 text-left flex px-30 py-2 justify-center" type="text"/>
        <SignInBtn />
        <p className="text-black mt-9">Don't have an account? <a className="text-blue-400" href="/signup">Sign Up</a> </p>
    </div>
    </>
  )
}