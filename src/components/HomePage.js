'use client';

import Layout from '@/components/Layout';
import PostCard from '@/components/features/PostCard';
import { usePosts } from '@/hooks';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const { posts, loading, error, likePost, unlikePost } = usePosts();

  const handleLikeChange = async (postId, reactionType, isActive) => {
    if (isActive) {
      await likePost(postId, reactionType);
    } else {
      await unlikePost(postId, reactionType);
    }
  };

  const handleCommentAdd = (postId, comment) => {
    // This would be handled by the comment service in a real app
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex items-center space-x-2">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Loading posts...</span>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Try Again
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto py-8 px-4">
          <div className="space-y-8">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-4xl">📸</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">No posts yet</h2>
                <p className="text-muted-foreground mb-6">
                  Be the first to share something amazing!
                </p>
                <a
                  href="/upload"
                  className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Create your first post
                </a>
              </div>
            ) : (
              posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  onLikeChange={handleLikeChange}
                  onCommentAdd={handleCommentAdd}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
