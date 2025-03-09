import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import InputCard from "@/components/ui/inputcard";
import { Image, FileText, MapPin, Bold, Italic } from "lucide-react";
import ChartComparison from "./chart";
import { analyzeTweet } from "@/lib/azure";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [err, setErr] = useState("");
  const [tweetOne, setTweetOne] = useState(
    "built an ai app that leverages openai api to check tweets for virality"
  );
  const [tweetTwo, setTweetTwo] = useState("working with ai is pretty fun");
  const [cumEngA, setCumEngA] = useState(0);
  const [cumEngB, setCumEngB] = useState(0);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [retweets, setRetweets] = useState(0);
  const [quotes, setQuotes] = useState(0);

  const resTweet = async () => {
    try {
      const res = await analyzeTweet(tweetOne, tweetTwo);
      if (res && res.code === "429") {
        setErr("You will cause me generational debt, stop clicking the button");
        setTimeout(() => setErr(""), 5000);
      }
      if (res) {
        const woah = res.choices[0].message.content;
        const resJson = JSON.parse(woah);
        console.log(woah);
        const resA = resJson.versiona.cumeng;
        const resB = resJson.versionb.cumeng;
        setCumEngB(resB);
        setCumEngA(resA);
        setLikes(resJson.versiona.likes);
        setComments(resJson.versionb.comments);
        setRetweets(resJson.versiona.retweets);
        setQuotes(resJson.versionb.quotes);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const unmount = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/");
      }
      setUser(currentUser);
    });

    return () => unmount();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-2">
        <div className="p-2 grid justify-items-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer h-8 w-8">
                <AvatarImage src={user?.photoURL} />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 border-0">
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer bg-[#0e0f11] ring-0  focus:bg-red-950 border-0 outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span className="text-red-900 text-sm">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-gray-800">
          <InputCard
            value={tweetOne}
            placeholder="tweet here"
            title="Version A"
            color="blue"
            onChange={(e) => setTweetOne(e.target.value)}
          />
          <InputCard
            value={tweetTwo}
            onChange={(e) => setTweetTwo(e.target.value)}
            placeholder="tweet here"
            title="Version B"
            color="green"
          />
        </div>

        <div className="flex items-center gap-3 p-2 border-b border-gray-800">
          <button className="text-gray-400 hover:text-gray-200">
            <Image size={16} />
          </button>
          <button className="text-gray-400 hover:text-gray-200">
            <FileText size={16} />
          </button>
          <button className="text-gray-400 hover:text-gray-200">
            <MapPin size={16} />
          </button>
          <button className="text-gray-400 hover:text-gray-200">
            <Bold size={16} />
          </button>
          <button className="text-gray-400 hover:text-gray-200">
            <Italic size={16} />
          </button>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={resTweet}
              className="bg-white text-black font-bold rounded-full px-3 py-1 text-sm hover:cursor-pointer"
            >
              Predict
            </button>
          </div>
        </div>
        {err && (
          <p className="text-base text-red-900 flex justify-center">{err}</p>
        )}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">Cumulative Engagement</h2>
          <ChartComparison cumEngA={cumEngA} cumEngB={cumEngB} />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">Statistical Confidence</h2>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Likes", value: likes, version: "A" },
              { label: "Comments", value: comments, version: "B" },
              { label: "Retweets", value: retweets, version: "A" },
              { label: "Quotes", value: quotes, version: "B" },
            ].map((metric) => (
              <div key={metric.label} className="bg-zinc-900/50 p-3 rounded">
                <div className="text-gray-400 text-sm">{metric.label}</div>
                <div className="text-xl font-bold">{metric.value}</div>
                <div className="text-[10px] text-gray-500">
                  Version {metric.version}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
