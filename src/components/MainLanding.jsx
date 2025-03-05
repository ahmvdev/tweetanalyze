import { Gbutton } from "./button-demo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function MainLanding() {
  function handleGoogle() {
    console.log("clicked google");
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-5 w-full max-w-sm">
        <h1 className="font-semibold text-3xl text-white">Login to Viralyze</h1>
        <Gbutton onClick={handleGoogle} />
        <p className="text-xs text-zinc-600">OR CONTINUE WITH EMAIL</p>
        <Input placeholder="Email" className="max-w-sm bg-zinc-950" />
        <Input placeholder="Password" className="max-w-sm bg-zinc-950" />
        <Button className="w-full hover:cursor-pointer hover:bg-[#2a2a2a] bg-neutral-900">
          Login
        </Button>
        <Button className="w-full bg-black border-0 hover:cursor-pointer hover:bg-[#2a2a2a] ">
          Don't have an account? Sign up
        </Button>
      </div>
    </div>
  );
}

export default MainLanding;
