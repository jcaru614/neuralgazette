import React from 'react';
import Layout from './Layout';

interface LoadingProps {
  isFullScreen?: boolean; // Whether to show the Loading component or not
}

const Loading: React.FC<LoadingProps> = ({ isFullScreen = false }) => {
  return (
    <>
      {isFullScreen ? (
        <Layout>
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-neural-teal"></div>
          </div>
        </Layout>
      ) : (
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-neural-teal"></div>
      )}
    </>
  );
};

export default Loading;
