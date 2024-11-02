// src/pages/test-db.tsx
import { trpc } from '../lib/trpc';

export default function TestDB() {
  const { data: users, isLoading: usersLoading } = trpc.user.getAll.useQuery();
  const { data: posts, isLoading: postsLoading } = trpc.post.getAll.useQuery();

  if (usersLoading || postsLoading) return <div>Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Database Test Page</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <div className="grid gap-4">
          {users?.map((user) => (
            <div key={user.id} className="p-4 border rounded-lg shadow">
              <h3 className="font-bold">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-sm">Stage: {user.stage}</p>
              {user.bio && <p className="text-sm mt-2">{user.bio}</p>}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Posts</h2>
        <div className="grid gap-4">
          {posts?.map((post) => (
            <div key={post.id} className="p-4 border rounded-lg shadow">
              <h3 className="font-bold">{post.title}</h3>
              <p className="text-sm text-gray-600">{post.type}</p>
              <p className="mt-2">{post.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
