import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSignup() {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
          setError("Invalid email or password");
          break;
        case "auth/missing-password":
          setError("Invalid email or password");
          break;
        case "auth/email-already-in-use":
          setError("Email is already registered");
          break;
        default:
          setError(err.message);
      }
    }
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-5 w-full max-w-sm">
        <h1 className="font-semibold text-3xl text-white">Signup</h1>
        <Input
          type="email"
          placeholder="Email"
          className="max-w-sm bg-zinc-950"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          className="max-w-sm bg-zinc-950"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-900">{error}</p>}
        <Button
          onClick={handleSignup}
          className="w-full hover:cursor-pointer hover:bg-[#2a2a2a] bg-neutral-900"
        >
          Signup
        </Button>
        <Link to="/">
          <Button className="w-full bg-black border-0 hover:cursor-pointer hover:bg-[#2a2a2a] ">
            Already have an account? Login
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Signup;
