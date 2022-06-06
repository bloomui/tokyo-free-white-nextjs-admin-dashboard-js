import { useState, useEffect, useCallback } from 'react';

import { Card } from '@mui/material';

import { useRefMounted } from 'src/hooks/useRefMounted';
import RecentOrdersTable from './RecentOrdersTable';
import { cryptoOrdersApi } from 'src/mocks/crypto_orders';

function RecentOrders() {
  const isMountedRef = useRefMounted();
  const [cryptoOrders, setCryptoOrders] = useState([]);

  const getCryptoOrders = useCallback(async () => {
    try {
      const response = await cryptoOrdersApi.getCryptoOrders();

      if (isMountedRef()) {
        setCryptoOrders(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getCryptoOrders();
  }, [getCryptoOrders]);

  return (
    <Card>
      <RecentOrdersTable cryptoOrders={cryptoOrders} />
    </Card>
  );
}

export default RecentOrders;
