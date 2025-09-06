'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import PostCard from '@/components/features/PostCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { usePosts } from '@/hooks';
import { useAuth } from '@/contexts/AuthContext';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { isAuthenticated } = useAuth();
  const { posts, loading, likePost, unlikePost } = usePosts();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setHasSearched(true);
    
    // Filter posts based on search query
    const filtered = posts.filter(post => 
      post.caption?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const handleLikeChange = async (postId, reactionType, isActive) => {
    if (isActive) {
      await likePost(postId, reactionType);
    } else {
      await unlikePost(postId, reactionType);
    }
  };

  const handleCommentAdd = (postId, comment) => {
    console.log('Comment added:', postId, comment);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Discover
            </h1>
            <p className="text-muted-foreground">
              Find amazing posts and connect with creators
            </p>
          </div>

          {/* Search form */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search posts, captions, or descriptions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit" disabled={loading || !searchQuery.trim()}>
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </form>

          {/* Search results */}
          {hasSearched && (
            <div className="space-y-6">
              {loading ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p>Searching...</p>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                    <Search className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">No results found</h2>
                  <p className="text-muted-foreground">
                    Try searching with different keywords
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Found {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''}
                    </p>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                  <div className="space-y-8">
                    {filteredPosts.map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        onLikeChange={handleLikeChange}
                        onCommentAdd={handleCommentAdd}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Empty state when no search has been performed */}
          {!hasSearched && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Start exploring</h2>
              <p className="text-muted-foreground">
                Search for posts, captions, or descriptions to discover amazing content
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
