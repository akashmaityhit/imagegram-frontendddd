'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import UploadForm from '@/components/features/UploadForm';

export default function UploadPage() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

  const handlePostCreated = (newPost) => {
    // Redirect to home page after successful upload
    router.push('/');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto py-8 px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">
              Share Your Moment
            </h1>
            <p className="text-muted-foreground">
              Upload an image and tell your story to the world
            </p>
          </div>
          
          <UploadForm onPostCreated={handlePostCreated} />
        </div>
      </div>
    </Layout>
  );
}
