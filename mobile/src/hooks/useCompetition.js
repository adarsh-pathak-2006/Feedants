import { useState, useEffect, useCallback } from 'react';
import { getCompetitionDetails, getRegistrationStatus } from '../api/competitionApi';

/**
 * Custom hook for fetching and managing competition state
 */
export const useCompetition = (competitionId, userId = null) => {
  const [competition, setCompetition] = useState(null);
  const [registration, setRegistration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const fetchCompetition = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await getCompetitionDetails(competitionId);
      setCompetition(response.data);

      // If userId is provided, also fetch registration status
      if (userId) {
        try {
          const regResponse = await getRegistrationStatus(competitionId, userId);
          setRegistration(regResponse.data?.registration || null);
          setIsRegistered(regResponse.data?.isRegistered || false);
        } catch (regError) {
          // Registration status is non-critical
          console.warn('Could not fetch registration status:', regError.message);
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to load competition details');
    } finally {
      setLoading(false);
    }
  }, [competitionId, userId]);

  useEffect(() => {
    if (competitionId) {
      fetchCompetition();
    }
  }, [fetchCompetition]);

  const refetch = useCallback(() => {
    return fetchCompetition();
  }, [fetchCompetition]);

  return {
    competition,
    registration,
    isRegistered,
    loading,
    error,
    refetch,
  };
};

export default useCompetition;
