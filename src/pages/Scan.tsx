import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Play, Square, Lightbulb, User, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ToastContainer';
import { getUserScans, saveScan, ScanData } from '@/lib/scan';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const Scan = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [scans, setScans] = useState<ScanData[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [scanHistory, setScanHistory] = useState<any[]>([
    {
      id: 'scan_001',
      date: '2024-01-15',
      measurements: { height: 175, chest: 98, waist: 82 },
      accuracy: 95,
      device: 'mobile'
    },
    {
      id: 'scan_002', 
      date: '2024-01-10',
      measurements: { height: 175, chest: 97, waist: 81 },
      accuracy: 92,
      device: 'desktop'
    }
  ]);

  useEffect(() => {
    if (user) {
      loadScans();
    }
  }, [user]);

  const loadScans = async () => {
    if (user) {
      try {
        const userScans = await getUserScans(user.uid);
        setScans(userScans);
      } catch (error) {
        console.error('Error loading scans:', error);
      }
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
      setStream(mediaStream);
    } catch (error) {
      console.error('Error accessing camera:', error);
      showToast({
        type: 'error',
        title: 'Camera Access Denied',
        message: 'Please allow camera access to use body scan feature.'
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const startScan = async () => {
    if (!user) {
      showToast({
        type: 'warning',
        title: 'Login Required',
        message: 'Please login to use the body scan feature.'
      });
      return;
    }

    if (!stream) {
      await startCamera();
      return;
    }

    setIsScanning(true);
    setCountdown(30);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          completeScan();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const completeScan = async () => {
    setIsScanning(false);
    
    if (user) {
      try {
        const scanData = {
          scanId: `scan_${Date.now()}`,
          height: null,
          weight: null,
          imageURL: null,
          device: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop',
          tryOnCount: 0
        };

        await saveScan(user.uid, scanData);
        await loadScans();
        
        showToast({
          type: 'success',
          title: 'Scan Complete!',
          message: 'Your body scan has been completed successfully.'
        });
      } catch (error) {
        console.error('Error saving scan:', error);
        showToast({
          type: 'error',
          title: 'Error',
          message: 'Failed to save scan. Please try again.'
        });
      }
    }

    stopCamera();
  };

  const cancelScan = () => {
    setIsScanning(false);
    setCountdown(0);
    stopCamera();
    showToast({
      type: 'info',
      title: 'Scan Cancelled',
      message: 'Body scan has been cancelled.'
    });
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="min-h-screen relative" style={{ 
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #1e3a8a 100%)'
    }}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/8 to-blue-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-indigo-500/6 to-purple-500/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
      
      <Navbar 
        onSearchOpen={() => {}}
        onCartOpen={() => {}}
        pageTitle="Body Scan"
        showBackButton={true}
      />
      
      <div className="pt-20 max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-[#FFFFFF] mb-2">AI Body Scan</h1>
          <p className="text-xl text-[#C0C0C0]">Capture your body measurements with AI precision</p>
          <p className="text-[#C0C0C0] mt-2">
            Position yourself 6 feet away from your camera in good lighting. The scan takes about 30 seconds to complete.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Your Progress */}
          <div className="rounded-lg shadow-sm p-6 border border-[#C0C0C0]/20"
               style={{ 
                 backgroundColor: 'rgba(224, 224, 224, 0.05)',
                 backdropFilter: 'blur(20px)',
                 boxShadow: '0 8px 32px rgba(176, 238, 255, 0.1)'
               }}>
            <h2 className="text-xl font-semibold text-[#FFFFFF] mb-6 flex items-center">
              <User className="mr-2" size={20} />
              Your Progress
            </h2>
            <div className="space-y-6">
              <div className="text-center p-4 rounded-lg border border-[#C0C0C0]/20" style={{ backgroundColor: 'rgba(224, 224, 224, 0.05)' }}>
                <div className="text-2xl font-bold text-[#FFFFFF]">{scans.length}</div>
                <div className="text-sm text-[#C0C0C0]">Total Scans</div>
              </div>
              
              <div className="text-center p-4 rounded-lg border border-[#C0C0C0]/20" style={{ backgroundColor: 'rgba(224, 224, 224, 0.05)' }}>
                <div className="text-2xl font-bold text-[#FFFFFF]">
                  {scans.length > 0 
                    ? new Date(scanHistory[0]?.date || Date.now()).toLocaleDateString()
                    : 'Never'
                  }
                </div>
                <div className="text-sm text-[#C0C0C0]">Latest Scan</div>
              </div>
              
              <div className="text-center p-4 rounded-lg border border-[#C0C0C0]/20" style={{ backgroundColor: 'rgba(224, 224, 224, 0.05)' }}>
                <div className="text-2xl font-bold text-[#FFFFFF]">
                  {scanHistory.length > 0 ? scanHistory.reduce((total, scan) => total + (scan.accuracy || 0), 0) / scanHistory.length : 0}%
                </div>
                <div className="text-sm text-[#C0C0C0]">Virtual Try-Ons</div>
              </div>
              
              <Button 
                onClick={() => navigate('/scan-reports')}
                variant="outline" 
                className="w-full border-[#B0EEFF]/50 text-[#B0EEFF] hover:bg-[#B0EEFF]/20 hover:border-[#B0EEFF] transition-all duration-200 bg-[#B0EEFF]/5"
              >
                View Scan Reports
              </Button>
            </div>
          </div>

          {/* Camera Section */}
          <div className="lg:col-span-2 rounded-lg shadow-sm p-6 border border-[#C0C0C0]/20"
               style={{ 
                 backgroundColor: 'rgba(224, 224, 224, 0.05)',
                 backdropFilter: 'blur(20px)',
                 boxShadow: '0 8px 32px rgba(176, 238, 255, 0.1)'
               }}>
            <div className="aspect-video bg-gray-900 rounded-lg mb-6 relative overflow-hidden">
              {stream ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  {countdown > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <div className="text-white text-6xl font-bold">
                        {countdown}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-white">
                  <div className="text-center">
                    <Camera size={48} className="mx-auto mb-4" />
                    <p>Camera Preview</p>
                    <p className="text-sm text-gray-400 mt-2">Click "Start Body Scan" to begin</p>
                  </div>
                </div>
              )}
            </div>

            {/* Tips Section */}
            <div className="border rounded-lg p-6 mb-6" style={{ backgroundColor: 'rgba(224, 224, 224, 0.05)', borderColor: '#C0C0C0' }}>
              <h3 className="font-medium text-[#FFFFFF] mb-4 flex items-center">
                <Lightbulb className="mr-2 text-[#FFD700]" size={20} />
                Scan Tips for Best Results:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-[#C0C0C0]">
                <div className="flex items-start space-x-2">
                  <Lightbulb size={16} className="mt-0.5 flex-shrink-0 text-[#B0EEFF]" />
                  <div>
                    <div className="font-medium text-[#FFFFFF]">Good Lighting</div>
                    <div>Ensure bright, even lighting without shadows</div>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <User size={16} className="mt-0.5 flex-shrink-0 text-[#B0EEFF]" />
                  <div>
                    <div className="font-medium text-[#FFFFFF]">Fitted Clothing</div>
                    <div>Wear form-fitting clothes for accurate measurements</div>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock size={16} className="mt-0.5 flex-shrink-0 text-[#B0EEFF]" />
                  <div>
                    <div className="font-medium text-[#FFFFFF]">Stay Still</div>
                    <div>Keep steady during the 30-second scan</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              {!isScanning ? (
                <Button
                  onClick={startScan}
                  className="flex-1 bg-[#FFD700] text-[#121212] hover:bg-[#B0EEFF] flex items-center justify-center space-x-2 py-3"
                >
                  <Play size={20} />
                  <span>Start Body Scan</span>
                </Button>
              ) : (
                <Button
                  onClick={cancelScan}
                  variant="destructive"
                  className="flex-1 flex items-center justify-center space-x-2 py-3 bg-[#FF7E79] text-[#FFFFFF] hover:bg-[#FF7E79]/80"
                >
                  <Square size={20} />
                  <span>Cancel Scan</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scan;