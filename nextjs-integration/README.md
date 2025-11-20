# 🗺️ Dream Palaces Map - Next.js Iframe Integration

Clean and efficient integration of the Dream Palaces interactive map into your Next.js application using iframe embedding.

## 🚀 Quick Start

### 1. Start the Map Server

```bash
# Navigate to the Dream Palaces directory
cd /path/to/DreamPalaceWebMap

# Start the server (will auto-detect Python/Node.js)
./start-server.sh

# Or specify a custom port
./start-server.sh 3001
```

### 2. Copy Integration Files

```bash
# Copy the React component to your Next.js project
cp nextjs-integration/DreamPalacesMap.js /path/to/your-nextjs-app/components/
# OR for TypeScript projects
cp nextjs-integration/DreamPalacesMap.tsx /path/to/your-nextjs-app/components/

# Copy example page (optional)
cp nextjs-integration/example-page.js /path/to/your-nextjs-app/pages/dream-palaces.js
```

### 3. Use in Your Next.js App

```jsx
import DreamPalacesMap from '../components/DreamPalacesMap';

export default function MyPage() {
  return (
    <div>
      <h1>My Application</h1>
      
      <DreamPalacesMap
        width="100%"
        height="600px"
        serverUrl="http://localhost:3001"
        onLoad={() => console.log('Map loaded!')}
        onError={(error) => console.error('Map error:', error)}
      />
    </div>
  );
}
```

## 📋 Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | string/number | `"100%"` | Width of the map container |
| `height` | string/number | `"600px"` | Height of the map container |
| `className` | string | `""` | Additional CSS class |
| `serverUrl` | string | `"http://localhost:3001"` | URL where the map server is running |
| `onLoad` | function | `undefined` | Callback when map loads successfully |
| `onError` | function | `undefined` | Callback when map fails to load |

## 🔧 Server Configuration

### Default Server Script

The `start-server.sh` script automatically:
- Detects available HTTP servers (Python 3, Python 2, or Node.js)
- Enables CORS for iframe embedding
- Serves on configurable port (default: 3001)
- Provides network access URLs

### Manual Server Setup

#### Using Python 3:
```bash
cd /path/to/DreamPalaceWebMap
python3 -m http.server 3001
```

#### Using Node.js:
```bash
cd /path/to/DreamPalaceWebMap
npx http-server -p 3001 -c-1 --cors
```

## 🌐 Production Deployment

### 1. Deploy Map Application
Deploy the Dream Palaces map to your preferred hosting service:
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect to your Git repository
- **AWS S3 + CloudFront**: Upload static files
- **Traditional hosting**: Upload via FTP/SSH

### 2. Update Server URL
```jsx
<DreamPalacesMap
  serverUrl="https://your-dream-palaces-map.netlify.app"
  // ... other props
/>
```

### 3. Environment Variables (Recommended)
```javascript
// next.config.js
module.exports = {
  env: {
    DREAM_PALACES_MAP_URL: process.env.DREAM_PALACES_MAP_URL || 'http://localhost:3001'
  }
}

// In your component
<DreamPalacesMap
  serverUrl={process.env.DREAM_PALACES_MAP_URL}
  // ... other props
/>
```

## 🎨 Styling and Customization

### CSS Customization
```css
/* Add to your global CSS or component styles */
.dream-palaces-container {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.dream-palaces-error {
  font-family: 'Inter', sans-serif;
}
```

### Responsive Design
```jsx
<DreamPalacesMap
  width="100%"
  height={{ 
    base: "400px",    // Mobile
    md: "600px",      // Tablet
    lg: "800px"       // Desktop
  }}
/>
```

## 🔒 Security Considerations

### CSP Headers
Add to your Next.js configuration:
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' http://localhost:3001 https://your-map-domain.com"
          }
        ]
      }
    ]
  }
}
```

### HTTPS in Production
Ensure both your Next.js app and the map server use HTTPS in production to avoid mixed content issues.

## 🐛 Troubleshooting

### Map Not Loading
1. **Check server status**: Visit the server URL directly in browser
2. **CORS issues**: Ensure server enables CORS headers
3. **Port conflicts**: Try different port numbers
4. **Firewall**: Check if port is accessible

### Performance Optimization
1. **Lazy loading**: Component includes `loading="lazy"` by default
2. **Preload**: Add `<link rel="preload" href="http://localhost:3001" as="document">` to page head
3. **CDN**: Use CDN for production deployment

### Error Handling
```jsx
const handleMapError = (error) => {
  // Log to your error tracking service
  console.error('Dream Palaces Map Error:', error);
  
  // Show user-friendly message
  toast.error('Map temporarily unavailable. Please try again later.');
};
```

## 📱 Mobile Considerations

The iframe automatically handles:
- Touch interactions
- Responsive scaling
- Mobile-optimized controls

For better mobile experience:
```jsx
<DreamPalacesMap
  height={window.innerWidth < 768 ? "50vh" : "600px"}
  // ... other props
/>
```

## 🔄 Updates and Maintenance

### Updating the Map
1. Update files in the original Dream Palaces directory
2. Restart the server
3. Clear browser cache if needed
4. No changes needed in your Next.js application

### Version Pinning
For production, consider:
- Hosting specific version of the map
- Using Git tags/branches for version control
- Implementing health checks

## 📞 Support

- **Original codebase**: No modifications needed
- **Zero dependencies**: Uses standard HTML iframe
- **Framework agnostic**: Works with any React-based framework
- **TypeScript**: Full TypeScript support available