import { useEffect, useState } from 'react';
import PostController from '../../service/controllers/PostController';
import { Post } from '../../service/models/Post';
import './styles.scss' 

export function NewsFeed() {

  const [posts, setPosts] = useState<Post[]>([]);
  let cards: JSX.Element[] = [];

  useEffect(() => {
    PostController.read().then((dados) => {
      if (dados) {
        setPosts(dados || []);
      }
    });
  }, []);

  for (let i=1; i<posts.length; i=i+4) {
    cards.push(
      <div key={i} className="cards">
        {posts[i] ? (
          <a className="card" href={posts[i].link}>
            <img src={posts[i].image} alt="Logo"/>
            <h2>{posts[i].title}</h2>
            <div className="separator" ></div>
            <label>{posts[i].subtitle}</label>
          </a>
        ) : false}
        {posts[i+1] ? (
          <a className="card" href={posts[i+1].link}>
            <img src={posts[i+1].image} alt="Logo"/>
            <h2>{posts[i+1].title}</h2>
            <div className="separator" ></div>
            <label>{posts[i+1].subtitle}</label>
          </a>
        ) : false}
        {posts[i+2] ? (
          <a className="card" href={posts[i+2].link}>
            <img src={posts[i+2].image} alt="Logo"/>
            <h2>{posts[i+2].title}</h2>
            <div className="separator" ></div>
            <label>{posts[i+2].subtitle}</label>
          </a>
        ) : false}
        {posts[i+3] ? (
          <a className="card" href={posts[i+3].link}>
            <img src={posts[i+3].image} alt="Logo"/>
            <h2>{posts[i+3].title}</h2>
            <div className="separator" ></div>
            <label>{posts[i+3].subtitle}</label>
          </a>
        ) : false}
      </div>
    );
  }

  return(
    <div id="news-feed">
      <div className="header">
        <h1><b>✚</b> Mural de Notícias</h1>
      </div>

      {posts.length > 0 ? (
        <a className="featured"  href={posts[0].link}>
          <img src={posts[0].image} alt="Logo"/>
          <div className="infos">
            <h2>{posts[0].title}</h2>
            <div className="separator" ></div>
            <label>{posts[0].subtitle}</label>
          </div>
        </a>
      ) : false }

      {cards}

    </div>
  );
}