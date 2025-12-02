import React, { useState, useEffect } from 'react';
import { Download, CheckCircle, Clock, FileText, Mail } from 'lucide-react';

interface LicenseRequest {
  id: string;
  snippetId: string;
  snippetTitle: string;
  artist: string;
  buyerEmail: string;
  price: number;
  status: 'processing' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
  downloadUrl?: string;
  licenseUrl?: string;
}

interface AutomatedLicensingProps {
  snippetId: string;
  onLicenseComplete: (licenseId: string) => void;
}

export default function AutomatedLicensing({ snippetId, onLicenseComplete }: AutomatedLicensingProps) {
  const [licenseRequest, setLicenseRequest] = useState<LicenseRequest | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (licenseRequest && licenseRequest.status === 'processing') {
      simulateLicenseGeneration();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [licenseRequest]);

  const simulateLicenseGeneration = () => {
    const steps = [
      { progress: 20, message: 'Validating payment...' },
      { progress: 40, message: 'Generating license agreement...' },
      { progress: 60, message: 'Applying watermark protection...' },
      { progress: 80, message: 'Creating download package...' },
      { progress: 100, message: 'License ready!' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].progress);
        currentStep++;
      } else {
        clearInterval(interval);
        setLicenseRequest(prev => prev ? {
          ...prev,
          status: 'completed',
          completedAt: new Date().toISOString(),
          downloadUrl: `https://www.V3BMusic.Ai/downloads/${prev.id}`,
          licenseUrl: `https://www.V3BMusic.Ai/licenses/${prev.id}.pdf`
        } : null);
        onLicenseComplete(licenseRequest?.id || '');
      }
    }, 800);
  };

  const startLicenseProcess = (buyerEmail: string, price: number) => {
    const newRequest: LicenseRequest = {
      id: `lic_${Date.now()}`,
      snippetId,
      snippetTitle: 'Summer Vibes',
      artist: 'DJ Alex',
      buyerEmail,
      price,
      status: 'processing',
      createdAt: new Date().toISOString()
    };
    
    setLicenseRequest(newRequest);
    setProgress(0);
  };

  if (!licenseRequest) {
    return (
      <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Automated Licensing System</h3>
        <p className="text-gray-400 mb-6">
          Our automated system generates licenses instantly upon payment completion.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="h-6 w-6 text-green-400" />
            </div>
            <h4 className="font-semibold text-white mb-1">Instant Processing</h4>
            <p className="text-sm text-gray-400">Licenses generated in under 10 seconds</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Mail className="h-6 w-6 text-blue-400" />
            </div>
            <h4 className="font-semibold text-white mb-1">Email Delivery</h4>
            <p className="text-sm text-gray-400">Automatic email with download links</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="h-6 w-6 text-purple-400" />
            </div>
            <h4 className="font-semibold text-white mb-1">Legal Protection</h4>
            <p className="text-sm text-gray-400">Complete license documentation</p>
          </div>
        </div>

        <button
          onClick={() => startLicenseProcess('demo@example.com', 0.15)}
          className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-200"
        >
          Demo License Generation
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          {licenseRequest.status === 'completed' ? (
            <CheckCircle className="h-8 w-8 text-white" />
          ) : (
            <Clock className="h-8 w-8 text-white animate-spin" />
          )}
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">
          {licenseRequest.status === 'completed' ? 'License Ready!' : 'Generating License...'}
        </h2>
        
        <p className="text-gray-400">
          {licenseRequest.status === 'completed' 
            ? 'Your license has been generated and is ready for download'
            : 'Please wait while we process your license'
          }
        </p>
      </div>

      {/* Progress Bar */}
      {licenseRequest.status === 'processing' && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Progress</span>
            <span className="text-sm text-white">{progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* License Details */}
      <div className="bg-white/5 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-white mb-3">License Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Snippet:</span>
            <span className="text-white">{licenseRequest.snippetTitle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Artist:</span>
            <span className="text-white">{licenseRequest.artist}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Price:</span>
            <span className="text-white">${licenseRequest.price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">License ID:</span>
            <span className="text-white font-mono">{licenseRequest.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Email:</span>
            <span className="text-white">{licenseRequest.buyerEmail}</span>
          </div>
        </div>
      </div>

      {/* Completion Actions */}
      {licenseRequest.status === 'completed' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a 
              href={licenseRequest.downloadUrl || '#'}
              download={`${licenseRequest.snippetTitle} - Licensed Audio.mp3`}
              className="flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200"
              onClick={() => console.log('Downloading audio file:', licenseRequest.snippetTitle)}
            >
              <Download className="h-5 w-5" />
              <span>Download Audio</span>
            </a>
            
            <a 
              href={licenseRequest.licenseUrl || '#'}
              download={`${licenseRequest.snippetTitle} - License Agreement.pdf`}
              className="flex items-center justify-center space-x-2 py-3 px-4 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-200"
              onClick={() => console.log('Downloading license PDF:', licenseRequest.snippetTitle)}
            >
              <FileText className="h-5 w-5" />
              <span>Download License</span>
            </a>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Mail className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-green-300 mb-1">Email Sent!</h4>
                <p className="text-sm text-green-200">
                  License and download links have been automatically sent to {licenseRequest.buyerEmail}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <h4 className="font-semibold text-blue-300 mb-2">What's Included:</h4>
            <ul className="text-sm text-blue-200 space-y-1">
              <li>• High-quality audio file (320kbps MP3)</li>
              <li>• Legal license agreement (PDF)</li>
              <li>• Usage guidelines and attribution requirements</li>
              <li>• Copyright protection certificate</li>
              <li>• 24/7 support for license questions</li>
            </ul>
          </div>
        </div>
      )}

      {/* Processing Steps */}
      {licenseRequest.status === 'processing' && (
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm">
            <div className={`w-2 h-2 rounded-full ${progress >= 20 ? 'bg-green-400' : 'bg-gray-600'}`}></div>
            <span className={progress >= 20 ? 'text-white' : 'text-gray-400'}>Validating payment</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className={`w-2 h-2 rounded-full ${progress >= 40 ? 'bg-green-400' : 'bg-gray-600'}`}></div>
            <span className={progress >= 40 ? 'text-white' : 'text-gray-400'}>Generating license agreement</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className={`w-2 h-2 rounded-full ${progress >= 60 ? 'bg-green-400' : 'bg-gray-600'}`}></div>
            <span className={progress >= 60 ? 'text-white' : 'text-gray-400'}>Applying watermark protection</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className={`w-2 h-2 rounded-full ${progress >= 80 ? 'bg-green-400' : 'bg-gray-600'}`}></div>
            <span className={progress >= 80 ? 'text-white' : 'text-gray-400'}>Creating download package</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className={`w-2 h-2 rounded-full ${progress >= 100 ? 'bg-green-400' : 'bg-gray-600'}`}></div>
            <span className={progress >= 100 ? 'text-white' : 'text-gray-400'}>Sending email notification</span>
          </div>
        </div>
      )}
    </div>
  );
}