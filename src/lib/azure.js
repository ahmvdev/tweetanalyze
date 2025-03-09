const ENDPOINT = import.meta.env.VITE_AZURE_API_ENDPOINT;
const KEY = import.meta.env.VITE_AZURE_API_KEY;

export async function analyzeTweet(tweetOne, tweetTwo) {
  const url = `${ENDPOINT}?api-version=2024-10-21`;

  const headers = {
    "Content-Type": "application/json",
    "api-key": KEY,
  };

  const data = {
    messages: [
      {
        role: "user",
        content: `Analyze these two tweets for X.com viral potential:
- '${tweetOne}' (versiona)
- '${tweetTwo}' (versionb)
values could be any number btw NOT multiples of 10s,100s or 1000s
Guidelines:
- Predicted values within ranges:
  - Low: 222-379
  - Mid: 439-4966
  - High: 10574-20456
- "cumeng" is the sum of all metrics
- Output JSON only—no extra text
Rules:
If not empty, predict engagement using X trends as of March 9, 2025 (emotion, trends, clarity, questions, hashtags, peak hours 7-9 PM EST)
Output must be in this JSON format:
{
  "versiona": {
    "likes": X,
    "comments": X,
    "retweets": X,
    "quotes": X,
    "cumeng": X
  },
  "versionb": {
    "likes": X,
    "comments": X,
    "retweets": X,
    "quotes": X,
    "cumeng": X
  }
}
  only if tweetOne and tweetTwo are empty the above json values 0 otherwise they will not and they will use X data to check tweets for virality
`,
      },
    ],
    max_tokens: 200,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorCode = errorData.error;
      return errorCode;
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.error("Request Error:", err);
    return null;
  }
}
