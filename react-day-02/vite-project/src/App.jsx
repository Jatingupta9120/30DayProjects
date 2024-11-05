import { useState } from "react";
import PostHandler from "./posts";

export default function App() {
  const [posts, setPosts] = useState([]); 

  const postComponents = posts.map((p, index) => (
    <PostHandler 
      key={index}
      name={p.name}
      subtitle={p.subtitle}
      time={p.time}
      image={p.image} 
    />
  ));

  function addPost() {
    setPosts([...posts, {
      name: "lksdnflnsvd Gupta",
      subtitle: "Main hun Jatin",
      time: "20s ago",
      image: "/dsnvkjvbksnlvbsbvs/"
    },{
      name: "dsjfkbvkjsbjkvsdn",
      subtitle: "Main hun Jatin",
      time: "20s ago",
      image: "/dsnvkjvbksnlvbsbvs/"
    },
    {
      name: "ghjkl;kjhgjhk Gupta",
      subtitle: "Main hun Jatin",
      time: "20s ago",
      image: "/dsnvkjvbksnlvbsbvs/"
    }]);
  }

  return (
    <>
      <div style={{ background: "#dfe6e9", height: "100vh" }}>
        <button onClick={addPost}>Add Posts</button>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            {postComponents}
          </div>
        </div>
      </div>
    </>
  );
}
