import { useState } from 'react';
import html2canvas from 'html2canvas';
import './App.css';

function App() {
  const [postText, setPostText] = useState("Naija to the world! 🇳🇬🔥");
  const [username, setUsername] = useState("@soft");
  const [likes, setLikes] = useState(12400);
  const [reposts, setReposts] = useState(2340);
  const [replies, setReplies] = useState(456);
  const [time, setTime] = useState("3h");
  const [platform, setPlatform] = useState<"twitter" | "linkedin">("twitter");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isDark, setIsDark] = useState(false);

  const emojis = ["😂", "🔥", "🇳🇬", "❤️", "🙌", "💰", "🚀", "😭", "🎉", "💯"];
  const templates = [
    { name: "Naija Wahala", text: "This country ehn... one day you’re rich, next day NEPA takes everything 😭🇳🇬" },
    { name: "Afrobeats Vibes", text: "New Wizkid drop loading... who else dey feel this energy? 🔥🇳🇬" },
    { name: "Lagos Traffic", text: "Left house at 6am, still stuck in traffic at 10am. Lagos na scam 😂🚗" },
    { name: "Crypto King", text: "Bought BTC at 2021 price, now I’m a Naija millionaire 🤑💰" },
    { name: "Relationship Drama", text: "She said she loves me but blocked me after I asked for her account number 😭" },
    { name: "Grind Mode", text: "From Abeokuta to Lagos... small boy doing big things 💪 #NaijaToTheWorld" },
  ];

  const addEmoji = (emoji: string) => setPostText(prev => prev + emoji);
  const loadTemplate = (text: string) => setPostText(text);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setAvatarUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleDownload = () => {
    const preview = document.getElementById("post-preview");
    if (preview) {
      html2canvas(preview, { scale: 3, backgroundColor: null }).then(canvas => {
        const link = document.createElement("a");
        link.download = `fake-${platform}-post.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  };

  return (
    <div className={`app ${isDark ? "dark" : ""}`}>
      <div className="header-bar">
        <h1>Fake Social Media Post Generator</h1>
        <button className="dark-toggle" onClick={() => setIsDark(!isDark)}>
          {isDark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      <section className="inputs">
        <label>Username: <input type="text" value={username} onChange={e => setUsername(e.target.value)} /></label>
        <label>Post Text: <textarea value={postText} onChange={e => setPostText(e.target.value)} /></label>

        <div className="emoji-picker">
          <p>Quick Emojis:</p>
          {emojis.map(emo => (
            <button key={emo} onClick={() => addEmoji(emo)} className="emoji-btn">{emo}</button>
          ))}
        </div>

        <div className="templates">
          <p>Naija Templates:</p>
          {templates.map((t, i) => (
            <button key={i} onClick={() => loadTemplate(t.text)} className="template-btn">
              {t.name}
            </button>
          ))}
        </div>

        <label>Likes: <input type="number" value={likes} onChange={e => setLikes(Number(e.target.value))} /></label>
        <label>Reposts: <input type="number" value={reposts} onChange={e => setReposts(Number(e.target.value))} /></label>
        <label>Replies: <input type="number" value={replies} onChange={e => setReplies(Number(e.target.value))} /></label>
        <label>Time: <input type="text" value={time} onChange={e => setTime(e.target.value)} placeholder="3h" /></label>

        <label>Platform:
          <select value={platform} onChange={e => setPlatform(e.target.value as any)}>
            <option value="twitter">Twitter / X</option>
            <option value="linkedin">LinkedIn</option>
          </select>
        </label>

        <label>Avatar: <input type="file" accept="image/*" onChange={handleAvatarChange} /></label>
      </section>

      <section className="preview-section">
        <h2>Live Preview ({platform === "twitter" ? "Twitter/X" : "LinkedIn"})</h2>
        <div id="post-preview" className={`post ${platform} ${isDark ? "dark-preview" : ""}`}>
          <div className="post-header">
            {avatarUrl && <img src={avatarUrl} alt="Avatar" className="avatar" />}
            <div className="user-info">
              <span className="display-name">{username.replace('@', '')}</span>
              <span className="username">@{username.replace('@', '')}</span>
              <span className="verified">
                <svg viewBox="0 0 22 22" className="verified-badge">
                  <path fill="#1d9bf0" d="M20.396 11c-.018-.646-.215-1.275-.57-1.82-.354-.546-.87-.984-1.47-1.29l-.002-.001c-.6-.306-1.26-.45-1.92-.45-.66 0-1.32.144-1.92.45l-.002.001c-.6.306-1.116.744-1.47 1.29-.355.545-.552 1.174-.57 1.82-.018.646.197 1.275.552 1.82.354.546.87.984 1.47 1.29l.002.001c.6.306 1.26.45 1.92.45.66 0 1.32-.144 1.92-.45l.002-.001c.6-.306 1.116-.744 1.47-1.29.355-.545.552-1.174.57-1.82zM8 14.59l-3.59-3.59L3 12l5 5 9-9-1.41-1.41L8 14.59z"/>
                </svg>
              </span>
            </div>
          </div>

          <div className="post-content">{postText}</div>

          <div className="post-footer">
            <span className="timestamp">{time}</span>
            <div className="engagement">
              <span className="reply">↩️ {replies}</span>
              <span className="repost">🔁 {reposts}</span>
              <span className="like">❤️ {likes}</span>
            </div>
          </div>
        </div>
      </section>

      <button onClick={handleDownload} className="download-btn">Download as Image 📸</button>

      <footer className="footer-credit">
        Built by <a href="https://x.com/soft_tech008?s=21" target="_blank" rel="noopener noreferrer">Toluwani (@soft)</a> • {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;