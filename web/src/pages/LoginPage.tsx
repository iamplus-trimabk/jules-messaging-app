import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@simflo/common';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const { requestOtp, verifyOtp } = useAuth();
  const navigate = useNavigate();

  const handleRequestOtp = async () => {
    await requestOtp(mobileNumber);
    setOtpSent(true);
  };

  const handleVerifyOtp = async () => {
    await verifyOtp(mobileNumber, otp);
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-xs">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        {!otpSent ? (
          <div className="flex flex-col space-y-4">
            <Input
              type="text"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            <Button onClick={handleRequestOtp}>Request OTP</Button>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            <Input
              type="text"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button onClick={handleVerifyOtp}>Verify OTP</Button>
          </div>
        )}
      </div>
    </div>
  );
}
