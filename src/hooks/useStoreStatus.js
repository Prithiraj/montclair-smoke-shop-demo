import { useEffect, useState } from 'react';
import { getStoreStatus } from '../lib/storeStatus.js';

export function useStoreStatus(store) {
  const [status, setStatus] = useState(() => getStoreStatus(store));

  useEffect(() => {
    const update = () => setStatus(getStoreStatus(store));
    update();
    const interval = window.setInterval(update, 30_000);
    return () => window.clearInterval(interval);
  }, [store]);

  return status;
}
