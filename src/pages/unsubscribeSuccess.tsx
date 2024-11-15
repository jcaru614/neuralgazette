import { NextPage } from 'next';

const UnsubscribeSuccess: NextPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Successfully Unsubscribed</h1>
        <p>You have been removed from our mailing list.</p>
      </div>
    </div>
  );
};

export default UnsubscribeSuccess;
