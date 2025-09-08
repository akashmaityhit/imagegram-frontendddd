'use client';

import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import PostCard from '@/components/features/PostCard';
import { useComments, usePosts } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';

export default function HomePage() {
  const { 
    posts, 
    loading, 
    error, 
    hasMore, 
    fetchPosts, 
    loadMorePosts, 
    likePost, 
    unlikePost 
  } = usePosts();
  const { createComment } = useComments();

  const handleLikeChange = async (postId, reactionType, isActive) => {
    if (isActive) {
      await likePost(postId, reactionType);
    } else {
      await unlikePost(postId, reactionType);
    }
  };


  const handleRefresh = () => {
    fetchPosts();
  };

  if (loading && posts.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen bg-background">
          <div className="max-w-2xl mx-auto py-8 px-4">
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading posts...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-background">
          <div className="max-w-2xl mx-auto py-8 px-4">
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-destructive/10 rounded-full flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-destructive" />
              </div>
              <h3 className="text-xl font-bold mb-2">Failed to load posts</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={handleRefresh} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto py-8 px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-2">
                Your Feed
              </h1>
              <p className="text-muted-foreground">
                Discover amazing moments from the community
              </p>
            </div>
            <Link href="/upload">
              <Button size="sm" className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>New Post</span>
              </Button>
            </Link>
          </div>

          {/* Posts */}
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Plus className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">No posts yet</h3>
              <p className="text-muted-foreground mb-4">
                Be the first to share something amazing!
              </p>
              <Link href="/upload">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Post
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  onLikeChange={handleLikeChange}
                />
              ))}
              
              {/* Load More Button */}
              {hasMore && (
                <div className="text-center py-8">
                  <Button 
                    onClick={loadMorePosts} 
                    disabled={loading}
                    variant="outline"
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      'Load More Posts'
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
