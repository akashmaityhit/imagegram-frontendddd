'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, Heart, Users, Share2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Camera className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ImageGram
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Share your moments, discover amazing content, and connect with a community of creative minds.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="px-8 py-3 text-lg">
                  Get Started
                </Button>
              </Link>
              <Link href="/signin">
                <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Choose ImageGram?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Experience the best of social media with our intuitive platform designed for creators and art lovers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-gray-800/50 border-gray-700">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Share2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Share Moments</h3>
                <p className="text-gray-300">
                  Upload and share your favorite images with the world. Show off your creativity and get inspired by others.
                </p>
              </div>
            </Card>
            
            <Card className="p-6 bg-gray-800/50 border-gray-700">
              <div className="text-center">
                <div className="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Engage & Connect</h3>
                <p className="text-gray-300">
                  Like, comment, and follow your favorite creators. Build meaningful connections in our community.
                </p>
              </div>
            </Card>
            
            <Card className="p-6 bg-gray-800/50 border-gray-700">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Discover Content</h3>
                <p className="text-gray-300">
                  Explore amazing content from talented creators around the world. Find inspiration and new perspectives.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Sharing?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of creators who are already sharing their stories on ImageGram.
          </p>
          <Link href="/signup">
            <Button size="lg" className="px-8 py-3 text-lg">
              Create Your Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
