"use client";

import { useEffect, useRef, useState } from "react";

export default function Cam() {
  const [hydrate, setHydrate] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (hydrate === false) {
      setHydrate(true);
    }
  }, [hydrate]);

  useEffect(() => {
    const getVideoStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };
    getVideoStream();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  if (hydrate == false) {
    return <div>loading camera</div>;
  }
  return (
    <div>
      <video ref={videoRef} autoPlay muted />
    </div>
  );
}
