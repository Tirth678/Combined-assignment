import { Counter } from "@/components/Count";
export default function Client() {
  return (
    <div className="flex flex-col m-10 text-base/6">
      <h1 className="flex justify-center font-bold text-4xl m-4">Welcome to the <span className="text-purple-600 ml-2">Client Page</span></h1>
      <p className="flex justify-center">This page is generated on the client side and provides interactive</p>
      <p className="flex justify-center">features.</p>
      <div className="flex justify-center mt-10">
        <Counter />
      </div>
    </div>
  );
}
