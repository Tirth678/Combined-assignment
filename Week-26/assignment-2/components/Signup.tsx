"use client"
export default function SignUpBtn(){
    return (
        <>
        <button className="bg-purple-500 flex justify-center mt-12 rounded-lg px-44 wx-52 py-2" onClick={() => {
            alert('Sign Up was clicked')
        }}>Sign Up</button>
        </>
    )
}