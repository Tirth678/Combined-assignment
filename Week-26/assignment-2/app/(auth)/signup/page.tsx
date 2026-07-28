import Button from '@/components/Signin'
import SignUpBtn from '@/components/Signup'
export default function Signup(){
    return (
        <>
        <div className="bg-white w-123 h-130 self-center place-items-center m-50 rounded-2xl border-4">
                <h1 className="text-black place-items-center m-5 text-3xl font-bold ">Sign Up</h1>
                <label htmlFor="mail" className="text-black pl-8">Name</label>
                <input id="mail" className="bg-blue-300 text-left flex px-30 py-2 justify-center mb-8" type="text"/>
                <label htmlFor="mail" className="text-black pl-8">Email</label>
                <input id="mail" className="bg-blue-300 text-left flex px-30 py-2 justify-center mb-8" type="text"/>
                <label htmlFor="pass" className="text-black pl-8">Password</label>
                <input id="pass" className="bg-blue-300 text-left flex px-30 py-2 justify-center" type="text"/>
                <SignUpBtn/>
                <p className="text-black mt-9">Have an account? <a className="text-blue-400" href="/login">Sign In</a> </p>
            </div>
        </>
    )
}