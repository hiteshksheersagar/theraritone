import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Smartphone, Monitor, TrendingUp, Download, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ToastContainer';
import Navbar from '@/components/Navbar';

const ScanReports = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const [scanHistory] = useState([
    {
      id: 'scan_003',
      date: '2024-01-20',
      measurements: { 
        height: 175, 
        chest: 98, 
        waist: 82, 
        shoulders: 45,
        hips: 95
      },
      accuracy: 96,
      device: 'mobile',
      recommendations: 5,
      tryOns: 12
    },
    {
      id: 'scan_002', 
      date: '2024-01-15',
      measurements: { 
        height: 175, 
        chest: 97, 
        waist: 81,
        shoulders: 44,
        hips: 94
      },
      accuracy: 94,
      device: 'desktop',
      recommendations: 8,
      tryOns: 15
    },
    {
      id: 'scan_001',
      date: '2024-01-10',
      measurements: { 
        height: 175, 
        chest: 96, 
        waist: 80,
        shoulders: 44,
        hips: 93
      },
      accuracy: 92,
      device: 'mobile',
      recommendations: 3,
      tryOns: 8
    }
  ]);

  const handleDownloadReport = (scanId: string) => {
    showToast({
      type: 'success',
      title: 'Download Started',
      message: `Downloading detailed report for ${scanId}`
    });
  };

  const handleViewDetails = (scanId: string) => {
    showToast({
      type: 'info',
      title: 'Scan Details',
      message: `Viewing detailed analysis for ${scanId}`
    });
  };

  return (
    <div className="min-h-screen relative" style={{ 
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #1e3a8a 100%)'
    }}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-500/8 to-blue-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Navbar 
        onSearchOpen={() => {}}
        onCartOpen={() => {}}
        pageTitle="Scan Reports"
        showBackButton={true}
      />
      
      <div className="pt-20 max-w-6xl mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-light text-[#FFFFFF] mb-2">Scan Reports & Analytics</h1>
          <p className="text-[#C0C0C0]">Track your body scan history and measurement progress</p>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="rounded-lg p-6 border border-[#B0EEFF]/20 text-center"
               style={{ 
                 backgroundColor: 'rgba(176, 238, 255, 0.05)',
                 backdropFilter: 'blur(20px)',
                 boxShadow: '0 8px 32px rgba(176, 238, 255, 0.1)'
               }}>
            <div className="text-2xl font-bold text-[#B0EEFF] mb-1">{scanHistory.length}</div>
            <div className="text-sm text-[#C0C0C0]">Total Scans</div>
          </div>
          
          <div className="rounded-lg p-6 border border-[#FFD700]/20 text-center"
               style={{ 
                 backgroundColor: 'rgba(255, 215, 0, 0.05)',
                 backdropFilter: 'blur(20px)',
                 boxShadow: '0 8px 32px rgba(255, 215, 0, 0.1)'
               }}>
            <div className="text-2xl font-bold text-[#FFD700] mb-1">
              {Math.round(scanHistory.reduce((acc, scan) => acc + scan.accuracy, 0) / scanHistory.length)}%
            </div>
            <div className="text-sm text-[#C0C0C0]">Avg Accuracy</div>
          </div>
          
          <div className="rounded-lg p-6 border border-[#FF7E79]/20 text-center"
               style={{ 
                 backgroundColor: 'rgba(255, 126, 121, 0.05)',
                 backdropFilter: 'blur(20px)',
                 boxShadow: '0 8px 32px rgba(255, 126, 121, 0.1)'
               }}>
            <div className="text-2xl font-bold text-[#FF7E79] mb-1">
              {scanHistory.reduce((acc, scan) => acc + scan.recommendations, 0)}
            </div>
            <div className="text-sm text-[#C0C0C0]">Recommendations</div>
          </div>
          
          <div className="rounded-lg p-6 border border-[#B88FFF]/20 text-center"
               style={{ 
                 backgroundColor: 'rgba(184, 143, 255, 0.05)',
                 backdropFilter: 'blur(20px)',
                 boxShadow: '0 8px 32px rgba(184, 143, 255, 0.1)'
               }}>
            <div className="text-2xl font-bold text-[#B88FFF] mb-1">
              {scanHistory.reduce((acc, scan) => acc + scan.tryOns, 0)}
            </div>
            <div className="text-sm text-[#C0C0C0]">Virtual Try-Ons</div>
          </div>
        </motion.div>

        {/* Scan History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-semibold text-[#FFFFFF] mb-4">Scan History</h2>
          
          {scanHistory.map((scan, index) => (
            <motion.div
              key={scan.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="rounded-lg p-6 border border-[#C0C0C0]/20"
              style={{ 
                backgroundColor: 'rgba(224, 224, 224, 0.05)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(176, 238, 255, 0.1)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {scan.device === 'mobile' ? (
                      <Smartphone size={20} className="text-[#B0EEFF]" />
                    ) : (
                      <Monitor size={20} className="text-[#B0EEFF]" />
                    )}
                    <span className="font-medium text-[#FFFFFF]">{scan.id}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-[#C0C0C0]">
                    <Calendar size={16} />
                    <span className="text-sm">{new Date(scan.date).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <TrendingUp size={16} className="text-[#FFD700]" />
                    <span className="text-sm text-[#FFD700] font-medium">{scan.accuracy}% accuracy</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleViewDetails(scan.id)}
                    variant="outline"
                    size="sm"
                    className="border-[#B0EEFF]/50 text-[#B0EEFF] hover:bg-[#B0EEFF]/10"
                  >
                    <Eye size={16} className="mr-1" />
                    View
                  </Button>
                  
                  <Button
                    onClick={() => handleDownloadReport(scan.id)}
                    variant="outline"
                    size="sm"
                    className="border-[#FFD700]/50 text-[#FFD700] hover:bg-[#FFD700]/10"
                  >
                    <Download size={16} className="mr-1" />
                    Download
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-[#FFFFFF]">{scan.measurements.height}cm</div>
                  <div className="text-xs text-[#C0C0C0]">Height</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-[#FFFFFF]">{scan.measurements.chest}cm</div>
                  <div className="text-xs text-[#C0C0C0]">Chest</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-[#FFFFFF]">{scan.measurements.waist}cm</div>
                  <div className="text-xs text-[#C0C0C0]">Waist</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-[#FFFFFF]">{scan.measurements.shoulders}cm</div>
                  <div className="text-xs text-[#C0C0C0]">Shoulders</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-[#FFFFFF]">{scan.measurements.hips}cm</div>
                  <div className="text-xs text-[#C0C0C0]">Hips</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center space-y-4"
        >
          <Button
            onClick={() => navigate('/scan')}
            className="bg-[#FFD700] text-[#121212] hover:bg-[#B0EEFF] px-8 py-3 rounded-xl"
          >
            Take New Scan
          </Button>
          
          <div className="text-sm text-[#C0C0C0]">
            Regular scans help us provide better size recommendations
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScanReports;