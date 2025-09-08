'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MessageCircle, Share, MoreHorizontal, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { updatePost, deletePost } from '@/services';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import LikeButton from './LikeButton';
import CommentSection from './CommentSection';
import { cn } from '@/utils';
import { useComments } from '@/hooks';

const PostCard = ({ 
  post, 
  onLikeChange, 
  onCommentAdd,
  className,
  showOwnerActions = false,
  currentUserId,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [caption, setCaption] = useState(post.caption || '');
  const [description, setDescription] = useState(post.description || '');

  const handleLikeChange = (postId, reactionType, isActive) => {
    setIsLiked(isActive);
    onLikeChange?.(postId, reactionType, isActive);
  };

  

  const postId = post._id;

  // Comments hook bound to this post
  const {
    createComment,
    updateComment,
  } = useComments(postId);

  const handleCommentAdd = async (commentObj) => {
    // Ensure payload contains the target post
    const payload = { ...commentObj, commentableId: postId };
    const response = await createComment(payload);
  };

  const handleToggleComments = async () => {
    const next = !showComments;
    setShowComments(next);
    if (next) {
      // Fetch comments when opening the section
      // await fetchComments();
    }
  };

  const handleEditSubmit = async (e) => {
    e?.preventDefault?.();
    try {
      setIsSubmitting(true);
      const result = await updatePost(postId, { caption, description });
      if (result?.success) {
        // Optimistically reflect local changes
        setIsEditOpen(false);
        setIsMenuOpen(false);
      }
    } catch (err) {
      // no-op: follow existing minimal error handling style
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsSubmitting(true);
      const result = await deletePost(postId);
      if (result?.success) {
        setIsDeleteOpen(false);
        setIsMenuOpen(false);
      }
    } catch (err) {
      // no-op
    } finally {
      setIsSubmitting(false);
    }
  };

  const isOwner = post?.user?._id && currentUserId ? post.user._id === currentUserId : false;
  const canShowOwnerActions = showOwnerActions && isOwner;

  return (
    <Card className={cn("w-full max-w-2xl mx-auto", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={post.user?.avatar} alt={post.user?.name} />
              <AvatarFallback>
                <User className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-sm">{post.user?.username || 'Anonymous'}</h3>
              <p className="text-xs text-muted-foreground">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          {canShowOwnerActions && (
            <div className="relative">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen((v) => !v)}>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 rounded-md border bg-background shadow-md z-10">
                  <button
                    className="w-full text-left px-3 py-2 text-sm hover:bg-accent"
                    onClick={() => { setIsEditOpen(true); }}
                  >
                    Edit
                  </button>
                  <button
                    className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-accent"
                    onClick={() => { setIsDeleteOpen(true); }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Image */}
        <div className="relative w-full aspect-square">
          <Image
            src={post.image}
            alt={post.caption}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Actions */}
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <LikeButton
                postId={post.id}
                initialReactions={post.reactions || {}}
                onReactionChange={handleLikeChange}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleComments}
                className="flex items-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">
                  {post.comments?.length || 0}
                </span>
              </Button>
              <Button variant="ghost" size="sm">
                <Share className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Caption */}
          {caption && (
            <div className="space-y-1">
              <p className="text-sm">
                <span className="font-semibold">{post.user?.username || 'Anonymous'}</span>
                {' '}
                <span>{caption}</span>
              </p>
              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>
          )}

          {/* Comments Section */}
          {showComments && (
            <CommentSection
              postId={postId}
              comments={post.comments || []}
              onCommentAdd={handleCommentAdd}
            />
          )}
        </div>
      </CardContent>
      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit post</DialogTitle>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleEditSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium">Caption</label>
              <Input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Update caption" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="flex h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add an optional description"
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setIsEditOpen(false)} disabled={isSubmitting}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save changes'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete post?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setIsDeleteOpen(false)} disabled={isSubmitting}>Cancel</Button>
            <Button type="button" variant="destructive" onClick={handleDelete} disabled={isSubmitting}>{isSubmitting ? 'Deleting...' : 'Delete'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PostCard;
