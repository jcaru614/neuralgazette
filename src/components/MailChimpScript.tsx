import { useEffect } from 'react';

const useMailchimpScript = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src =
      'https://chimpstatic.com/mcjs-connected/js/users/994a355e811dcbf7edd4e6fcb/c172589fae5feb7e4879a4fda.js';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
};

export default useMailchimpScript;
