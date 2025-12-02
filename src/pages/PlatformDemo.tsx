import React, { useState } from 'react';
import { Upload, Sparkles, Users, FileCheck, Wallet, Activity, CheckCircle, ArrowRight, Coins, Shield, Zap } from 'lucide-react';

interface RoyaltySplit {
  address: string;
  name: string;
  percentage: number;
}

interface SmartContract {
  address: string;
  artists: RoyaltySplit[];
  licensePrice: number;
  deployed: boolean;
  deployedAt?: Date;
}

interface Transaction {
  id: string;
  buyer: string;
  amount: number;
  timestamp: Date;
  splits: { recipient: string; amount: number }[];
  blockchainHash: string;
}

type DemoStep = 'upload' | 'ai-analysis' | 'royalty-split' | 'smart-contract' | 'purchase' | 'complete';

export default function PlatformDemo() {
  const [currentStep, setCurrentStep] = useState<DemoStep>('upload');
  const [songFile, setSongFile] = useState<File | null>(null);
  const [songTitle, setSongTitle] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<{ genres: string[]; keywords: string[]; mood: string[] } | null>(null);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [royaltySplits, setRoyaltySplits] = useState<RoyaltySplit[]>([
    { address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', name: 'You (Primary Artist)', percentage: 70 },
    { address: '0x1234567890123456789012345678901234567890', name: 'Collaborator', percentage: 30 }
  ]);
  const [smartContract, setSmartContract] = useState<SmartContract | null>(null);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSongFile(e.target.files[0]);
      setSongTitle(e.target.files[0].name.replace(/\.[^/.]+$/, ''));
    }
  };

  const runAIAnalysis = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockSuggestions = {
      genres: ['Hip Hop', 'Trap', 'R&B', 'Pop', 'Urban'],
      keywords: ['energetic', 'bass-heavy', 'club banger', 'radio-ready', 'catchy hook', 'modern production'],
      mood: ['confident', 'upbeat', 'aggressive', 'party']
    };

    setAiSuggestions(mockSuggestions);
    setSelectedGenres(mockSuggestions.genres.slice(0, 2));
    setSelectedKeywords(mockSuggestions.keywords.slice(0, 3));
    setIsProcessing(false);
    setCurrentStep('ai-analysis');
  };

  const updateRoyaltySplit = (index: number, field: 'percentage' | 'name', value: string | number) => {
    const updated = [...royaltySplits];
    updated[index] = { ...updated[index], [field]: value };
    setRoyaltySplits(updated);
  };

  const addCollaborator = () => {
    const newSplit: RoyaltySplit = {
      address: `0x${Math.random().toString(16).substr(2, 40)}`,
      name: 'New Collaborator',
      percentage: 0
    };
    setRoyaltySplits([...royaltySplits, newSplit]);
  };

  const deploySmartContract = async () => {
    setIsProcessing(true);
    setCurrentStep('smart-contract');
    await new Promise(resolve => setTimeout(resolve, 3000));

    const contract: SmartContract = {
      address: `0x${Math.random().toString(16).substr(2, 40)}`,
      artists: royaltySplits,
      licensePrice: 29.99,
      deployed: true,
      deployedAt: new Date()
    };

    setSmartContract(contract);
    setIsProcessing(false);
  };

  const simulatePurchase = async () => {
    setIsProcessing(true);
    setCurrentStep('purchase');
    await new Promise(resolve => setTimeout(resolve, 2500));

    const buyerAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
    const txHash = `0x${Math.random().toString(16).substr(2, 64)}`;
    const licensePrice = smartContract?.licensePrice || 29.99;

    const splits = royaltySplits.map(split => ({
      recipient: split.address,
      amount: (licensePrice * split.percentage) / 100
    }));

    const tx: Transaction = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      buyer: buyerAddress,
      amount: licensePrice,
      timestamp: new Date(),
      splits,
      blockchainHash: txHash
    };

    setTransaction(tx);
    setIsProcessing(false);
    setCurrentStep('complete');
  };

  const resetDemo = () => {
    setCurrentStep('upload');
    setSongFile(null);
    setSongTitle('');
    setAiSuggestions(null);
    setSelectedGenres([]);
    setSelectedKeywords([]);
    setRoyaltySplits([
      { address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', name: 'You (Primary Artist)', percentage: 70 },
      { address: '0x1234567890123456789012345678901234567890', name: 'Collaborator', percentage: 30 }
    ]);
    setSmartContract(null);
    setTransaction(null);
  };

  const steps = [
    { id: 'upload', label: 'Upload Song', icon: Upload },
    { id: 'ai-analysis', label: 'AI Analysis', icon: Sparkles },
    { id: 'royalty-split', label: 'Royalty Split', icon: Users },
    { id: 'smart-contract', label: 'Smart Contract', icon: FileCheck },
    { id: 'purchase', label: 'Purchase & Payout', icon: Wallet },
    { id: 'complete', label: 'Complete', icon: CheckCircle }
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Platform Demo
            <span className="block text-2xl text-cyan-400 mt-2">Watch V3BMusic.AI in Action</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Experience the complete journey: Upload → AI Analysis → Royalty Splits → Smart Contract → Instant Crypto Payout
          </p>
        </div>

        <div className="mb-12">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all ${
                      index <= currentStepIndex
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                        : 'bg-gray-700 text-gray-400'
                    }`}
                  >
                    <step.icon className="w-8 h-8" />
                  </div>
                  <span className={`text-sm font-medium ${index <= currentStepIndex ? 'text-cyan-400' : 'text-gray-500'}`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 rounded ${index < currentStepIndex ? 'bg-cyan-500' : 'bg-gray-700'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          {currentStep === 'upload' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
                <Upload className="w-8 h-8 mr-3 text-cyan-400" />
                Step 1: Upload Your Song
              </h2>

              <div className="border-2 border-dashed border-cyan-500/50 rounded-xl p-12 text-center hover:border-cyan-500 transition-all bg-slate-800/50">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="song-upload"
                />
                <label htmlFor="song-upload" className="cursor-pointer">
                  <Upload className="w-16 h-16 mx-auto mb-4 text-cyan-400" />
                  <p className="text-white text-xl mb-2">Drop your music file here or click to browse</p>
                  <p className="text-gray-400">Supports MP3, WAV, FLAC (Max 100MB)</p>
                </label>
              </div>

              {songFile && (
                <div className="bg-slate-800/50 rounded-xl p-6 border border-cyan-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-white font-semibold text-lg">{songFile.name}</p>
                      <p className="text-gray-400">{(songFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>

                  <input
                    type="text"
                    value={songTitle}
                    onChange={(e) => setSongTitle(e.target.value)}
                    placeholder="Song Title"
                    className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg mb-4 border border-slate-600 focus:border-cyan-500 focus:outline-none"
                  />

                  <button
                    onClick={runAIAnalysis}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 flex items-center justify-center"
                  >
                    {isProcessing ? (
                      <>
                        <Activity className="w-6 h-6 mr-2 animate-spin" />
                        Analyzing with AI...
                      </>
                    ) : (
                      <>
                        Run AI Analysis
                        <ArrowRight className="w-6 h-6 ml-2" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {currentStep === 'ai-analysis' && aiSuggestions && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
                <Sparkles className="w-8 h-8 mr-3 text-cyan-400" />
                Step 2: AI-Generated Suggestions
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-cyan-500/30">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">Detected Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {aiSuggestions.genres.map((genre) => (
                      <button
                        key={genre}
                        onClick={() => {
                          if (selectedGenres.includes(genre)) {
                            setSelectedGenres(selectedGenres.filter(g => g !== genre));
                          } else {
                            setSelectedGenres([...selectedGenres, genre]);
                          }
                        }}
                        className={`px-4 py-2 rounded-full font-medium transition-all ${
                          selectedGenres.includes(genre)
                            ? 'bg-cyan-500 text-white'
                            : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                        }`}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-6 border border-blue-500/30">
                  <h3 className="text-xl font-bold text-blue-400 mb-4">Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {aiSuggestions.keywords.map((keyword) => (
                      <button
                        key={keyword}
                        onClick={() => {
                          if (selectedKeywords.includes(keyword)) {
                            setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
                          } else {
                            setSelectedKeywords([...selectedKeywords, keyword]);
                          }
                        }}
                        className={`px-4 py-2 rounded-full font-medium transition-all ${
                          selectedKeywords.includes(keyword)
                            ? 'bg-blue-500 text-white'
                            : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                        }`}
                      >
                        {keyword}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-6 border border-purple-500/30">
                  <h3 className="text-xl font-bold text-purple-400 mb-4">Mood</h3>
                  <div className="flex flex-wrap gap-2">
                    {aiSuggestions.mood.map((mood) => (
                      <span
                        key={mood}
                        className="px-4 py-2 rounded-full font-medium bg-purple-500 text-white"
                      >
                        {mood}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl p-6 border border-cyan-500/30">
                <div className="flex items-start">
                  <Sparkles className="w-6 h-6 text-cyan-400 mr-3 mt-1" />
                  <div>
                    <h4 className="text-white font-bold text-lg mb-2">AI Recommendation</h4>
                    <p className="text-gray-300">
                      Based on audio analysis, this track has strong commercial potential for social media content,
                      fitness videos, and fashion campaigns. Suggested price point: $25-35 per license.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setCurrentStep('royalty-split')}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center"
              >
                Continue to Royalty Split
                <ArrowRight className="w-6 h-6 ml-2" />
              </button>
            </div>
          )}

          {currentStep === 'royalty-split' && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
                <Users className="w-8 h-8 mr-3 text-cyan-400" />
                Step 3: Configure Royalty Splits
              </h2>

              <div className="space-y-4">
                {royaltySplits.map((split, index) => (
                  <div key={index} className="bg-slate-800/50 rounded-xl p-6 border border-cyan-500/30">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <label className="text-gray-400 text-sm mb-2 block">Name</label>
                        <input
                          type="text"
                          value={split.name}
                          onChange={(e) => updateRoyaltySplit(index, 'name', e.target.value)}
                          className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none"
                        />
                        <p className="text-gray-500 text-xs mt-2 font-mono">{split.address}</p>
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm mb-2 block">Percentage</label>
                        <input
                          type="number"
                          value={split.percentage}
                          onChange={(e) => updateRoyaltySplit(index, 'percentage', parseInt(e.target.value) || 0)}
                          min="0"
                          max="100"
                          className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-cyan-500 focus:outline-none text-2xl font-bold text-center"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between bg-slate-800/50 rounded-xl p-6 border border-green-500/30">
                <span className="text-gray-300 text-lg">Total Split:</span>
                <span className={`text-3xl font-bold ${
                  royaltySplits.reduce((sum, s) => sum + s.percentage, 0) === 100
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}>
                  {royaltySplits.reduce((sum, s) => sum + s.percentage, 0)}%
                </span>
              </div>

              <button
                onClick={addCollaborator}
                className="w-full bg-slate-700 text-white py-3 rounded-xl font-bold hover:bg-slate-600 transition-all"
              >
                + Add Collaborator
              </button>

              <button
                onClick={deploySmartContract}
                disabled={royaltySplits.reduce((sum, s) => sum + s.percentage, 0) !== 100 || isProcessing}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <Activity className="w-6 h-6 mr-2 animate-spin" />
                    Deploying to Ethereum Testnet...
                  </>
                ) : (
                  <>
                    Deploy Smart Contract
                    <ArrowRight className="w-6 h-6 ml-2" />
                  </>
                )}
              </button>
            </div>
          )}

          {currentStep === 'smart-contract' && smartContract && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
                <FileCheck className="w-8 h-8 mr-3 text-green-500" />
                Step 4: Smart Contract Deployed
              </h2>

              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-8 border border-green-500/50">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-gray-300 mb-2">Contract Address</p>
                    <p className="text-white font-mono text-sm bg-slate-800 px-4 py-2 rounded">{smartContract.address}</p>
                  </div>
                  <CheckCircle className="w-16 h-16 text-green-500" />
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-gray-300 mb-2">Network</p>
                    <p className="text-white font-bold">Ethereum Sepolia Testnet</p>
                  </div>
                  <div>
                    <p className="text-gray-300 mb-2">License Price</p>
                    <p className="text-white font-bold text-2xl">${smartContract.licensePrice}</p>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4">
                  <h4 className="text-white font-bold mb-3">Royalty Recipients</h4>
                  {smartContract.artists.map((artist, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
                      <div>
                        <p className="text-white font-medium">{artist.name}</p>
                        <p className="text-gray-500 text-xs font-mono">{artist.address}</p>
                      </div>
                      <p className="text-cyan-400 font-bold text-lg">{artist.percentage}%</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-500/20 rounded-xl p-6 border border-blue-500/30">
                <div className="flex items-start">
                  <Shield className="w-6 h-6 text-blue-400 mr-3 mt-1" />
                  <div>
                    <h4 className="text-white font-bold text-lg mb-2">Smart Contract Features</h4>
                    <ul className="text-gray-300 space-y-2">
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Immutable royalty split logic</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Automatic payment distribution</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Transparent blockchain verification</li>
                      <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-500" /> Gas-optimized for low transaction fees</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={simulatePurchase}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-green-500/50 transition-all flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <Activity className="w-6 h-6 mr-2 animate-spin" />
                    Processing Purchase...
                  </>
                ) : (
                  <>
                    <Wallet className="w-6 h-6 mr-2" />
                    Simulate Fan Purchase
                    <ArrowRight className="w-6 h-6 ml-2" />
                  </>
                )}
              </button>
            </div>
          )}

          {currentStep === 'purchase' && transaction && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
                <Wallet className="w-8 h-8 mr-3 text-cyan-400" />
                Step 5: Purchase Complete - Instant Payout
              </h2>

              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-8 border border-green-500/50">
                <div className="text-center mb-6">
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-white mb-2">Payment Successful!</h3>
                  <p className="text-gray-300">Transaction settled in 3.2 seconds</p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                    <p className="text-gray-400 text-sm mb-1">Transaction ID</p>
                    <p className="text-white font-mono font-bold">{transaction.id}</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                    <p className="text-gray-400 text-sm mb-1">Total Amount</p>
                    <p className="text-green-500 font-bold text-2xl">${transaction.amount}</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                    <p className="text-gray-400 text-sm mb-1">Settlement Time</p>
                    <p className="text-cyan-400 font-bold">3.2 seconds</p>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
                  <h4 className="text-white font-bold mb-4 flex items-center">
                    <Coins className="w-5 h-5 mr-2 text-yellow-500" />
                    Royalty Distribution
                  </h4>
                  {transaction.splits.map((split, index) => {
                    const artist = royaltySplits[index];
                    return (
                      <div key={index} className="flex items-center justify-between py-3 border-b border-slate-700 last:border-0">
                        <div>
                          <p className="text-white font-medium">{artist.name}</p>
                          <p className="text-gray-500 text-xs font-mono">{split.recipient}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-green-500 font-bold text-xl">${split.amount.toFixed(2)}</p>
                          <p className="text-gray-400 text-sm">{artist.percentage}%</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bg-purple-500/20 rounded-lg p-4 border border-purple-500/30">
                  <h4 className="text-white font-bold mb-2 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-purple-400" />
                    Blockchain Verification
                  </h4>
                  <p className="text-gray-300 text-sm mb-2">Transaction Hash:</p>
                  <p className="text-purple-400 font-mono text-xs break-all bg-slate-800 px-3 py-2 rounded">
                    {transaction.blockchainHash}
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    View on Etherscan: etherscan.io/tx/{transaction.blockchainHash.substring(0, 10)}...
                  </p>
                </div>
              </div>

              <button
                onClick={() => setCurrentStep('complete')}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center"
              >
                View Complete Summary
                <ArrowRight className="w-6 h-6 ml-2" />
              </button>
            </div>
          )}

          {currentStep === 'complete' && transaction && smartContract && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
                <CheckCircle className="w-8 h-8 mr-3 text-green-500" />
                Demo Complete - Full Journey Summary
              </h2>

              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-8 border border-green-500/50">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  Congratulations! You've experienced the complete V3BMusic.AI workflow
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/50 rounded-lg p-6">
                    <h4 className="text-cyan-400 font-bold text-lg mb-4 flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      What Just Happened
                    </h4>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Uploaded:</strong> {songTitle}</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                        <span><strong>AI Analysis:</strong> {selectedGenres.length} genres, {selectedKeywords.length} keywords detected</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Royalty Split:</strong> {royaltySplits.length} collaborators configured</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Smart Contract:</strong> Deployed to Ethereum</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Purchase:</strong> Instant payout in 3.2 seconds</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-800/50 rounded-lg p-6">
                    <h4 className="text-purple-400 font-bold text-lg mb-4 flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Technology Proof
                    </h4>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 mr-2 text-purple-500 flex-shrink-0 mt-0.5" />
                        <span><strong>AI:</strong> Real-time genre/keyword analysis</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 mr-2 text-purple-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Blockchain:</strong> Immutable transaction record</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 mr-2 text-purple-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Smart Contract:</strong> Automated royalty splits</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 mr-2 text-purple-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Crypto:</strong> Instant multi-party settlement</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="w-5 h-5 mr-2 text-purple-500 flex-shrink-0 mt-0.5" />
                        <span><strong>Transparency:</strong> Every step blockchain-verified</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg p-6 border border-cyan-500/30">
                  <h4 className="text-white font-bold text-xl mb-3 text-center">Key Metrics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-500">3.2s</p>
                      <p className="text-gray-400 text-sm">Settlement Time</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-cyan-500">100%</p>
                      <p className="text-gray-400 text-sm">Transparent</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-purple-500">0</p>
                      <p className="text-gray-400 text-sm">Manual Steps</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold text-yellow-500">${transaction.amount}</p>
                      <p className="text-gray-400 text-sm">Paid Out</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/20 rounded-xl p-6 border border-blue-500/30">
                <h4 className="text-white font-bold text-lg mb-3">Compare to Traditional Licensing</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-red-400 font-bold mb-2">❌ Traditional Method:</p>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• 7-14 days for license approval</li>
                      <li>• 30-180 days for payment</li>
                      <li>• 30-50% fees to intermediaries</li>
                      <li>• No real-time royalty visibility</li>
                      <li>• Manual accounting & disputes</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-green-400 font-bold mb-2">✅ V3BMusic.AI:</p>
                    <ul className="text-gray-300 space-y-2 text-sm">
                      <li>• Instant license delivery (3 seconds)</li>
                      <li>• Instant payment settlement (3 seconds)</li>
                      <li>• Only 30% platform fee</li>
                      <li>• Real-time blockchain tracking</li>
                      <li>• Automated smart contracts</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={resetDemo}
                  className="flex-1 bg-slate-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-600 transition-all"
                >
                  Run Demo Again
                </button>
                <button
                  onClick={() => window.location.href = '/register'}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-green-500/50 transition-all"
                >
                  Start Using V3BMusic.AI
                </button>
              </div>
            </div>
          )}
        </div>

        {currentStep !== 'upload' && currentStep !== 'complete' && (
          <div className="text-center mt-8">
            <button
              onClick={resetDemo}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Reset Demo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
