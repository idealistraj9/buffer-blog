// components/PostList.tsx
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

interface Post {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
}

export default function PostList() {
  const { data, error } = useSWR<Post[]>('/api/posts', fetcher);

  if (error) return <div>Failed to load posts</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      {data.map(post => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
        </div>
      ))}
    </div>
  );
}
