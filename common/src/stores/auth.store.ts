import { create } from 'zustand';
import {
  AuthService,
  UsersService,
  BaseService,
  RequestOtpDto,
  VerifyOtpDto,
  UpdateProfileDto,
  User,
} from '@simflo/sdk';
import { socketService } from '../socket.service';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  requestOtp: (mobileNumber: string) => Promise<void>;
  verifyOtp: (mobileNumber: string, otp: string) => Promise<void>;
  updateProfile: (profileData: UpdateProfileDto) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  token: BaseService.getToken(),

  requestOtp: async (mobileNumber: string) => {
    await AuthService.requestOtp({ mobileNumber });
  },

  verifyOtp: async (mobileNumber: string, otp: string) => {
    const response = await AuthService.verifyOtp({ mobileNumber, otp });
    const token = response.accessToken;
    BaseService.setToken(token);
    const user = await UsersService.getProfile();
    set({ isAuthenticated: true, user, token });
    socketService.connect();
  },

  updateProfile: async (profileData: UpdateProfileDto) => {
    const user = await UsersService.updateProfile(profileData);
    set({ user });
  },

  logout: () => {
    BaseService.clearToken();
    socketService.disconnect();
    set({ isAuthenticated: false, user: null, token: null });
  },
}));

// Initialize the store
const token = BaseService.getToken();
if (token) {
  UsersService.getProfile().then(user => {
    useAuthStore.setState({ isAuthenticated: true, user, token });
    socketService.connect();
  });
}
