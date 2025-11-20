import { useState, useEffect, useRef } from 'react';

interface DreamPalacesMapProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  serverUrl?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

const DreamPalacesMap: React.FC<DreamPalacesMapProps> = ({
  width = '100%',
  height = '600px',
  className = '',
  serverUrl = 'http://localhost:3001',
  onLoad,
  onError
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      setIsLoading(false);
      onLoad?.();
    };

    const handleError = () => {
      const errorMsg = `Failed to load Dream Palaces Map from ${serverUrl}`;
      setError(errorMsg);
      setIsLoading(false);
      onError?.(new Error(errorMsg));
    };

    iframe.addEventListener('load', handleLoad);
    iframe.addEventListener('error', handleError);

    return () => {
      iframe.removeEventListener('load', handleLoad);
      iframe.removeEventListener('error', handleError);
    };
  }, [serverUrl, onLoad, onError]);

  if (error) {
    return (
      <div 
        className={`dream-palaces-error ${className}`}
        style={{ 
          width, 
          height, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          border: '1px solid #ddd',
          borderRadius: '8px'
        }}
      >
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h3>🗺️ Map Loading Error</h3>
          <p>{error}</p>
          <p style={{ fontSize: '14px', color: '#666' }}>
            Make sure the Dream Palaces server is running on {serverUrl}
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007cba',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`dream-palaces-container ${className}`} style={{ width, height, position: 'relative' }}>
      {isLoading && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            zIndex: 1000
          }}
        >
            <div style={{ textAlign: 'center' }}>
            <div 
              className="loading-spinner"
              style={{
                width: '40px',
                height: '40px',
                border: '3px solid #f3f3f3',
                borderTop: '3px solid #007cba',
                borderRadius: '50%',
                margin: '0 auto 10px'
              }}
            />
            <p>Loading Dream Palaces Map...</p>
            <style dangerouslySetInnerHTML={{
              __html: `
                .loading-spinner {
                  animation: spin 1s linear infinite;
                }
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `
            }} />
          </div>
        </div>
      )}
      
      <iframe
        ref={iframeRef}
        src={serverUrl}
        width="100%"
        height="100%"
        style={{ 
          border: 'none',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
        title="Dream Palaces Interactive Map"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
};

export default DreamPalacesMap;