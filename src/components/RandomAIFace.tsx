import React from 'react';

const getRandomFace = () => {
  const numberOfFaces = 25; // UPDATE THIS: Change to match your actual number of images
  const randomIndex = Math.floor(Math.random() * numberOfFaces) + 1;
  return `/brand-assets/ai-faces/ai-face-${randomIndex}.jpg`;
};

interface RandomAIFaceProps {
  className?: string;
}

const RandomAIFace: React.FC<RandomAIFaceProps> = ({ 
  className = "w-12 h-12 rounded-full" 
}) => {
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);
  const [showFallback, setShowFallback] = React.useState(false);

  React.useEffect(() => {
    const randomFaceSrc = getRandomFace();
    setImageSrc(randomFaceSrc);
  }, []);

  if (showFallback || !imageSrc) {
    return (
      <div className={`${className} bg-gradient-to-br from-v3b-purple to-v3b-blue flex items-center justify-center text-white font-bold text-xs object-cover`}>
        AI
      </div>
    );
  }

  return (
    <>
      <img 
        src={imageSrc} 
        alt="AI-generated avatar representing our global community" 
        className={`${className} object-cover`}
        onError={() => setShowFallback(true)}
        onLoad={() => setShowFallback(false)}
      />
    </>
  );
};

export default RandomAIFace;