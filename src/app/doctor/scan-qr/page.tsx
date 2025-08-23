
"use client";

import { AppLayout } from "@/components/app-layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import jsQR from "jsqr";
import { Camera, QrCode, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ScanQrPage() {
  const router = useRouter();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(true);
  const [scannedUrl, setScannedUrl] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let animationFrameId: number;

    const getCameraPermission = async () => {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
           throw new Error('Camera not supported by this browser.');
        }
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          scanQRCode();
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
      }
    };

    const scanQRCode = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            if (context && video.readyState === video.HAVE_ENOUGH_DATA) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height, {
                    inversionAttempts: 'dontInvert',
                });

                if (code) {
                    setScannedUrl(code.data);
                    if (stream) {
                        stream.getTracks().forEach(track => track.stop());
                    }
                    router.push(new URL(code.data).pathname);
                }
            }
        }
        animationFrameId = requestAnimationFrame(scanQRCode);
    }
    
    getCameraPermission();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [router]);


  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            if (context) {
              canvas.width = img.width;
              canvas.height = img.height;
              context.drawImage(img, 0, 0);
              const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
              const code = jsQR(imageData.data, imageData.width, imageData.height);
              if (code) {
                setScannedUrl(code.data);
                router.push(new URL(code.data).pathname);
              } else {
                toast({
                  variant: 'destructive',
                  title: 'QR Code Not Found',
                  description: 'Could not detect a QR code in the uploaded image. Please try another one.',
                });
              }
            }
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AppLayout userType="doctor">
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <QrCode className="w-8 h-8 text-primary" />
            </div>
            <div>
              <CardTitle>Scan Patient QR Code</CardTitle>
              <CardDescription>
                Point your camera at a patient's QR code to instantly access their health profile.
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="relative w-full aspect-video bg-muted rounded-md overflow-hidden flex items-center justify-center">
              <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
              {!hasCameraPermission && (
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4">
                      <Camera className="w-12 h-12 mb-4" />
                      <p className="text-lg font-semibold">Camera Access Denied</p>
                      <p className="text-center text-sm">Please enable camera permissions in your browser settings to use the scanner.</p>
                  </div>
              )}
            </div>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            
            <div className="mt-4 flex flex-col items-center justify-center space-y-4">
                <p className="text-muted-foreground text-sm">Or upload an image of a QR code</p>
                <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef} 
                    onChange={handleFileChange}
                    className="hidden" 
                />
                <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="mr-2"/> Upload Image
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
