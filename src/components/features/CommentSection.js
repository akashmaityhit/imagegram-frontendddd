"use client";

import { useEffect, useState } from "react";
import { Send, User, Reply, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import LikeButton from "./LikeButton";
import { cn } from "@/utils";
import { useComments } from "@/hooks";

const CommentSection = ({ postId, initialComments = [], className, currentUserId }) => {
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { comments, replyToCommentHandler, createCommentHandler, fetchPaginatedComments, hasMore, loadMoreComments, loading, deleteComment } = useComments(postId, initialComments);

  useEffect(() => {
    const fetchInitial = async () => {
      const payload = { onModel: "Post", commentableId: postId };
      await fetchPaginatedComments(payload);
    };

    fetchInitial();
  }, [postId, fetchPaginatedComments]);

  const handleLoadMoreComments = async () => {
    const payload = { onModel: "Post", commentableId: postId };
    await loadMoreComments(payload);
  }

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const payload = {
      content: newComment,
      commentableId: postId,
      onModel: "Post",
    };
    await createCommentHandler(payload);
    setNewComment("")
  };

  const handleAddReply = async (commentId) => {
    if (!replyText.trim()) return;

    const payload = {
      content: replyText,
      commentableId: commentId,
      onModel: "Comment",
    };
    await replyToCommentHandler(commentId, payload);

    setReplyText("");
    setReplyingTo(null);
  };

  const handleLikeChange = (commentId, reactionType, isActive) => {
    // Handle comment like changes
    console.log("Comment like changed:", commentId, reactionType, isActive);
  };

  const renderComment = (comment, isReply = false) => (
    <div
      key={comment._id}
      className={cn(
        "space-y-2 pb-3 border-b border-border/60 last:border-b-0",
        isReply && "ml-8 border-none pb-2"
      )}
    >
      <div className="flex items-start gap-3">
        <Avatar className="w-8 h-8 ring-2 ring-border/60">
          <AvatarImage
            src={comment.userId?.avatar}
            alt={comment.userId?.name}
          />
          <AvatarFallback>
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm hover:text-foreground transition-colors">
              {comment.userId?.username || "Anonymous"}
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date(comment.updatedAt).toLocaleDateString()}
            </span>
            {currentUserId && (comment.userId?._id === currentUserId) && (
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded-full"
                title="Delete comment"
                onClick={() => { setCommentToDelete(comment); setIsDeleteOpen(true); }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {comment.content}
          </p>
          <div className="flex items-center gap-3">
            <LikeButton
              postId={comment._id}
              initialReactions={comment?.reactions || {}}
              onReactionChange={handleLikeChange}
              className="text-xs transform scale-90 origin-left md:scale-100 opacity-90 hover:opacity-100"
            />
            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReplyingTo(comment._id)}
                className="h-7 px-2 text-[11px] gap-1 hover:bg-accent/80 rounded-full"
              >
                <Reply className="w-3 h-3" />
                Reply
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Reply form */}
      {replyingTo === comment._id && (
        <div className="ml-11 space-y-2">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Write a reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="flex-1"
              onKeyPress={(e) =>
                e.key === "Enter" && handleAddReply(comment._id)
              }
            />
            <Button
              size="sm"
              onClick={() => handleAddReply(comment._id)}
              disabled={!replyText.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setReplyingTo(null);
                setReplyText("");
              }}
              className="hover:bg-accent/80 rounded-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Render replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-2">
          {comment.replies.map((reply) => renderComment(reply, true))}
        </div>
      )}
    </div>
  );

  return (
    <div className={cn("space-y-4", className)}>
      {/* Comments list */}
      <div className="space-y-4 max-h-96 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-border/60 scrollbar-track-transparent">
        {comments.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => renderComment(comment))
        )}


        {/* Load More Comments Button */}
        {hasMore && (
          <div className="text-center py-8">
            <Button
              onClick={handleLoadMoreComments}
              disabled={loading}
              variant="outline"
              className="w-full hover:bg-accent/80"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                'See More Comments'
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Add comment form */}
      <form onSubmit={handleAddComment} className="flex items-center space-x-2">
        <Input
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="sm" disabled={!newComment.trim()} className="hover:bg-accent/80">
          <Send className="w-4 h-4" />
        </Button>
      </form>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete comment?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => { setIsDeleteOpen(false); setCommentToDelete(null); }} disabled={isDeleting}>Cancel</Button>
            <Button
              type="button"
              variant="destructive"
              disabled={isDeleting}
              onClick={async () => {
                if (!commentToDelete) return;
                try {
                  setIsDeleting(true);
                  await deleteComment(commentToDelete._id);
                } finally {
                  setIsDeleting(false);
                  setIsDeleteOpen(false);
                  setCommentToDelete(null);
                }
              }}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommentSection;
