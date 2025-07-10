import React from 'react';

export default function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Your App
        </h1>
        <p className="text-center text-muted-foreground">
          This is the main page of your application.
        </p>
      </div>
    </div>
  );
}