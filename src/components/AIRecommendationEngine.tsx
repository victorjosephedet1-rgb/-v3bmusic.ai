import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Zap, Music, Users, DollarSign, Clock } from 'lucide-react';
import { useNotifications } from './NotificationSystem';

interface AIRecommendation {
  id: string;
  type: 'pricing' | 'timing' | 'audience' | 'platform' | 'collaboration';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  expectedIncrease: string;
  actionable: boolean;
}

interface AIRecommendationEngineProps {
  userId: string;
  userType: 'artist' | 'creator';
}

export default function AIRecommendationEngine({ userId, userType }: AIRecommendationEngineProps) {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotifications();
  const [activeTab, setActiveTab] = useState<'all' | 'pricing' | 'timing' | 'audience'>('all');

  useEffect(() => {
    generateAIRecommendations();
  }, [userId, userType]);

  const generateAIRecommendations = async () => {
    setLoading(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockRecommendations: AIRecommendation[] = [
        {
          id: '1',
          type: 'pricing',
          title: 'Optimize Pricing Strategy',
          description: 'Based on market analysis, increasing your snippet prices by 15% could boost revenue by 23% without affecting demand.',
          impact: 'high',
          confidence: 0.87,
          expectedIncrease: '+23% revenue',
          actionable: true
        },
        {
          id: '2',
          type: 'timing',
          title: 'Peak Upload Window',
          description: 'Upload new content between 2-4 PM EST on Tuesdays for 40% higher initial engagement.',
          impact: 'medium',
          confidence: 0.92,
          expectedIncrease: '+40% engagement',
          actionable: true
        },
        {
          id: '3',
          type: 'audience',
          title: 'Target Emerging Creators',
          description: 'Focus on creators with 10K-100K followers - they have 3x higher licensing conversion rates.',
          impact: 'high',
          confidence: 0.89,
          expectedIncrease: '+3x conversions',
          actionable: true
        },
        {
          id: '4',
          type: 'platform',
          title: 'TikTok Trend Opportunity',
          description: 'Your "Urban Flow" style is trending on TikTok. Create 5 similar snippets in the next 48 hours.',
          impact: 'high',
          confidence: 0.94,
          expectedIncrease: '+150% visibility',
          actionable: true
        },
        {
          id: '5',
          type: 'collaboration',
          title: 'Collaboration Opportunity',
          description: 'Artist "Luna Beats" has complementary style. Collaboration could increase both audiences by 35%.',
          impact: 'medium',
          confidence: 0.78,
          expectedIncrease: '+35% audience',
          actionable: true
        }
      ];
      
      setRecommendations(mockRecommendations);
      setLoading(false);
    }, 2000);
  };

  const filteredRecommendations = activeTab === 'all' 
    ? recommendations 
    : recommendations.filter(r => r.type === activeTab);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pricing': return <DollarSign className="h-5 w-5" />;
      case 'timing': return <Clock className="h-5 w-5" />;
      case 'audience': return <Users className="h-5 w-5" />;
      case 'platform': return <TrendingUp className="h-5 w-5" />;
      case 'collaboration': return <Music className="h-5 w-5" />;
      default: return <Brain className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">AI Analyzing Your Performance</h3>
          <p className="text-gray-400">Processing market data, trends, and user behavior...</p>
          <div className="mt-4 flex justify-center space-x-1">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">AI Recommendation Engine</h2>
            <p className="text-gray-400">Powered by machine learning and market intelligence</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 overflow-x-auto">
          {[
            { id: 'all', label: 'All Insights', count: recommendations.length },
            { id: 'pricing', label: 'Pricing', count: recommendations.filter(r => r.type === 'pricing').length },
            { id: 'timing', label: 'Timing', count: recommendations.filter(r => r.type === 'timing').length },
            { id: 'audience', label: 'Audience', count: recommendations.filter(r => r.type === 'audience').length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AIRecommendation['type'] | 'all')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className="px-2 py-0.5 bg-purple-500/30 text-purple-200 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="p-6">
        <div className="space-y-4">
          {filteredRecommendations.map((recommendation) => (
            <div key={recommendation.id} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    {getTypeIcon(recommendation.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{recommendation.title}</h3>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className={`px-2 py-1 rounded text-xs ${getImpactColor(recommendation.impact)}`}>
                        {recommendation.impact} impact
                      </span>
                      <span className="text-sm text-gray-400">
                        {Math.round(recommendation.confidence * 100)}% confidence
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-400">{recommendation.expectedIncrease}</div>
                  <div className="text-xs text-gray-400">Expected increase</div>
                </div>
              </div>

              <p className="text-gray-300 mb-4">{recommendation.description}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full" 
                      style={{ width: `${recommendation.confidence * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-400">AI Confidence</span>
                </div>
                
                {recommendation.actionable && (
                  <button 
                    onClick={() => {
                      console.log('Applying AI recommendation:', recommendation.title);
                      addNotification({
                        type: 'success',
                        title: 'Recommendation Applied',
                        message: `"${recommendation.title}" has been applied to your account`
                      });
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-white hover:from-green-600 hover:to-blue-600 transition-all duration-200"
                  >
                    <Zap className="h-4 w-4" />
                    <span>Apply Now</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredRecommendations.length === 0 && (
          <div className="text-center py-8">
            <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No recommendations yet</h3>
            <p className="text-gray-400">Upload more content to get AI-powered insights</p>
          </div>
        )}
      </div>

      {/* AI Stats Footer */}
      <div className="p-6 border-t border-white/10 bg-white/5">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-purple-400">47</div>
            <div className="text-sm text-gray-400">Data Points Analyzed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-cyan-400">92%</div>
            <div className="text-sm text-gray-400">Prediction Accuracy</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">+156%</div>
            <div className="text-sm text-gray-400">Avg Revenue Increase</div>
          </div>
        </div>
      </div>
    </div>
  );
}