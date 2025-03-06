import { Gbutton } from "./gbutton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MainLanding() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [googleError, setGoogleError] = useState("");
  const navigate = useNavigate();

  async function handleGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (e) {
      setGoogleError(e.message);
    }
  }

  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
          setError("Invalid email or password");
          break;
        case "auth/invalid-credential":
          setError("User does not exist");
          break;
        default:
          setError(err.message);
      }
    }
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-5 w-full max-w-sm">
        <h1 className="font-semibold text-3xl text-white">Login to Viralyze</h1>
        <Gbutton onClick={handleGoogle} />
        {googleError && <p className="text-red-900">{googleError}</p>}
        <p className="text-xs text-zinc-600">OR CONTINUE WITH EMAIL</p>
        <Input
          type="email"
          placeholder="Email"
          className="max-w-sm bg-zinc-950"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          className="max-w-sm bg-zinc-950"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-900">{error}</p>}
        <Button
          onClick={handleLogin}
          className="w-full hover:cursor-pointer hover:bg-[#2a2a2a] bg-neutral-900"
        >
          Login
        </Button>
        <Link to="/signup">
          <Button className="w-full bg-black border-0 hover:cursor-pointer hover:bg-[#2a2a2a] ">
            Don't have an account? Sign up
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default MainLanding;
