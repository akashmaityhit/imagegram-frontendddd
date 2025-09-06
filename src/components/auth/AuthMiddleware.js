'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

const AuthMiddleware = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Routes that don't require authentication
  const publicRoutes = ['/signin', '/signup'];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    // Don't redirect if still loading or on public routes
    if (loading || isPublicRoute) return;

    // Redirect to signin if not authenticated
    if (!isAuthenticated) {
      router.push('/signin');
    }
  }, [isAuthenticated, loading, isPublicRoute, router, pathname]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show children if authenticated or on public route
  if (isAuthenticated || isPublicRoute) {
    return children;
  }

  // Show nothing while redirecting
  return null;
};

export default AuthMiddleware;
