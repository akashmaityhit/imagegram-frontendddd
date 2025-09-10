"use client";

import { Suspense, use, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PostCard from "@/components/features/PostCard";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Mail, User, Camera } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { usePosts } from "@/hooks";
import { getCurrentUser } from "@/utils";

function ProfileSkeleton() {
  return (
    <Card className="mb-8">
      <CardContent className="p-6 animate-pulse">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-muted" />
          <div className="space-y-2 w-full">
            <div className="h-5 bg-muted rounded w-1/3" />
            <div className="h-4 bg-muted rounded w-1/4" />
            <div className="h-3 bg-muted rounded w-2/3" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="h-12 bg-muted rounded" />
          <div className="h-12 bg-muted rounded" />
          <div className="h-12 bg-muted rounded" />
        </div>
      </CardContent>
    </Card>
  );
}

function PostsSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(2)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="w-full aspect-square bg-muted animate-pulse" />
          <div className="p-4 space-y-2">
            <div className="h-4 w-1/3 bg-muted rounded" />
            <div className="h-3 w-2/3 bg-muted rounded" />
          </div>
        </Card>
      ))}
    </div>
  );
}

function ProfileSection({ user }) {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user?.avatar} alt={user?.username} />
              <AvatarFallback>
                <User className="w-10 h-10" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{user?.username || "User"}</h1>
              <p className="text-muted-foreground">
                {user?.fullName || user?.username}
              </p>
              {user?.bio && (
                <p className="text-sm text-muted-foreground mt-1">{user.bio}</p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold">{user?.posts ?? 0}</div>
            <div className="text-sm text-muted-foreground">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{user?.followers ?? 0}</div>
            <div className="text-sm text-muted-foreground">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{user?.following ?? 0}</div>
            <div className="text-sm text-muted-foreground">Following</div>
          </div>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          {user?.email && (
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>{user.email}</span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>
              Joined{" "}
              {user?.joinDate
                ? new Date(user.joinDate).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })
                : "Recently"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PostsSection({ posts = [], currentUser}) {
  if (posts?.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <Camera className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-2">No posts yet</h3>
          <p className="text-muted-foreground">No shared posts available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          showOwnerActions={true}
          currentUserId={currentUser?._id}
        />
      ))}
    </div>
  );
}

export default function UserPage({ params }) {
  const { id } = use(params);
  const userId = id;

  const { fetchUserDetails, loading: userLoading, error: userError, user } = useUser(userId);
  const { fetchPosts, posts, loading: postLoading, error: postError } = usePosts(userId);

  const currentUser = getCurrentUser();

  useEffect(() => {
    if (!userId) return;
    fetchUserDetails(userId);
    fetchPosts(userId);
  }, [userId, fetchUserDetails, fetchPosts]);

 
 

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto py-8 px-4">
          {userLoading ? (
            <ProfileSkeleton />
          ) : userError ? (
            <Card className="mb-8">
              <CardContent className="p-6">
                <p className="text-sm text-red-500">No user found</p>
              </CardContent>
            </Card>
          ) : (
            <ProfileSection user={user} />
          )}

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Posts</h2>
            </div>
            {postLoading ? (
              <PostsSkeleton />
            ) : postError ? (
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm text-red-500">No posts</p>
                </CardContent>
              </Card>
            ) : (
              <PostsSection posts={posts} currentUser={currentUser}/>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
