import { useEffect, useState } from 'react';

export const useRenderClient = () => {
  const [isRenderClient, setIsRenderClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !isRenderClient && setIsRenderClient(true);
  }, [isRenderClient]);

  return { isRenderClient };
};
