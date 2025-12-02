import { useAuthStore } from '../stores/auth.store';

export const useAuth = () => {
  const {
    isAuthenticated,
    user,
    token,
    requestOtp,
    verifyOtp,
    updateProfile,
    logout,
  } = useAuthStore();

  return {
    isAuthenticated,
    user,
    token,
    requestOtp,
    verifyOtp,
    updateProfile,
    logout,
  };
};
