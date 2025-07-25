import { useState, useCallback } from 'react';
import {
  fetchAds,
  createAd,
  editAd,
  deleteAd
} from '../services/adService';

export default function useAds() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadAds = useCallback(async (filters) => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAds(filters);
      setAds(data);
    } catch (err) {
      setError('Failed to load ads');
    }
    setLoading(false);
  }, []);

  const create = useCallback(async (ad) => {
    setLoading(true);
    setError('');
    try {
      await createAd(ad);
      await loadAds();
    } catch (err) {
      setError('Failed to create ad');
    }
    setLoading(false);
  }, [loadAds]);

  const edit = useCallback(async (adId, updates) => {
    setLoading(true);
    setError('');
    try {
      await editAd(adId, updates);
      await loadAds();
    } catch (err) {
      setError('Failed to edit ad');
    }
    setLoading(false);
  }, [loadAds]);

  const remove = useCallback(async (adId) => {
    setLoading(true);
    setError('');
    try {
      await deleteAd(adId);
      await loadAds();
    } catch (err) {
      setError('Failed to delete ad');
    }
    setLoading(false);
  }, [loadAds]);

  return {
    ads,
    loading,
    error,
    loadAds,
    create,
    editAd: edit,
    removeAd: remove
  };
} 