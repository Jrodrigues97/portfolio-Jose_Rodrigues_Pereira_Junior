import { useEffect, useRef, useState } from 'react';
import QRCodeStyling, { Options } from 'qr-code-styling';
import { QROptions } from '@/src/types';
import { Button } from '@/components/ui/button';
import { Download, ZoomIn, ZoomOut } from 'lucide-react';

interface QRPreviewProps {
  options: QROptions;
}

export function QRPreview({ options }: QRPreviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling | null>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const qrOptions: Options = {
      width: options.width,
      height: options.height,
      data: options.data,
      margin: options.margin,
      image: options.image || undefined,
      dotsOptions: {
        type: options.dotsOptions.type as any,
        color: options.dotsOptions.colorType === 'single' ? options.dotsOptions.color1 : undefined,
        gradient: options.dotsOptions.colorType === 'gradient' ? {
          type: options.dotsOptions.gradientType as any,
          colorStops: [
            { offset: 0, color: options.dotsOptions.color1 },
            { offset: 1, color: options.dotsOptions.color2 }
          ]
        } : undefined
      },
      backgroundOptions: {
        color: options.backgroundOptions.colorType === 'single' ? options.backgroundOptions.color : undefined,
        gradient: options.backgroundOptions.colorType === 'gradient' ? {
          type: options.backgroundOptions.gradientType as any,
          colorStops: [
            { offset: 0, color: options.backgroundOptions.color },
            { offset: 1, color: '#ffffff' } // Default secondary for background gradient if needed
          ]
        } : undefined
      },
      cornersSquareOptions: {
        color: options.cornersSquareOptions.colorType === 'single' ? options.cornersSquareOptions.color : undefined,
        gradient: options.cornersSquareOptions.colorType === 'gradient' ? {
          type: options.cornersSquareOptions.gradientType as any,
          colorStops: [
            { offset: 0, color: options.cornersSquareOptions.color },
            { offset: 1, color: '#000000' }
          ]
        } : undefined
      },
      imageOptions: {
        crossOrigin: 'anonymous',
        margin: 10
      }
    };

    if (!qrCode.current) {
      qrCode.current = new QRCodeStyling(qrOptions);
      if (ref.current) {
        qrCode.current.append(ref.current);
      }
    } else {
      qrCode.current.update(qrOptions);
    }
  }, [options]);

  const handleDownload = (extension: 'png' | 'jpeg' | 'svg') => {
    if (qrCode.current) {
      qrCode.current.download({ name: 'qr-code', extension });
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-2 sm:gap-4">
      <div className="bg-white p-2 sm:p-4 rounded-xl border-2 border-blue-100 shadow-lg w-full flex items-center justify-center aspect-square overflow-hidden relative group">
        <div className="absolute inset-0 bg-blue-50/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <div 
          ref={ref} 
          className="max-w-full max-h-full relative z-10 transition-transform duration-200 ease-out" 
          style={{ transform: `scale(${zoom})` }}
        />
        
        {/* Zoom Controls */}
        <div className="absolute bottom-2 right-2 flex flex-col gap-1 z-20">
          <Button 
            variant="secondary" 
            size="icon" 
            className="w-6 h-6 sm:w-8 sm:h-8 bg-white/80 backdrop-blur-sm border border-blue-100 hover:bg-white"
            onClick={() => setZoom(prev => Math.min(prev + 0.1, 2))}
          >
            <ZoomIn className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
          </Button>
          <Button 
            variant="secondary" 
            size="icon" 
            className="w-6 h-6 sm:w-8 sm:h-8 bg-white/80 backdrop-blur-sm border border-blue-100 hover:bg-white"
            onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.5))}
          >
            <ZoomOut className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
          </Button>
        </div>
      </div>
      
      <div className="w-full grid grid-cols-1 gap-1.5">
        <Button 
          onClick={() => handleDownload('png')}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow-sm transition-all active:scale-[0.98] text-[10px] sm:text-xs h-8 sm:h-10"
        >
          <Download className="w-3 h-3 mr-1" />
          Baixar PNG
        </Button>
        <div className="grid grid-cols-2 gap-1.5">
          <Button 
            variant="outline"
            onClick={() => handleDownload('svg')}
            className="h-7 sm:h-9 border-blue-100 hover:bg-blue-50 text-blue-700 font-semibold rounded-md transition-all text-[9px] sm:text-[10px]"
          >
            Baixar SVG
          </Button>
          <Button 
            variant="outline"
            onClick={() => handleDownload('jpeg')}
            className="h-7 sm:h-9 border-blue-100 hover:bg-blue-50 text-blue-700 font-semibold rounded-md transition-all text-[9px] sm:text-[10px]"
          >
            Baixar JPEG
          </Button>
        </div>
      </div>
    </div>
  );
}
