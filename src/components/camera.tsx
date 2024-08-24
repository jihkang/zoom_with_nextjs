"use client";

import { MutableRefObject, useEffect, useRef, useState } from "react";

const getVideoStream = async (
  videoRef: MutableRefObject<HTMLVideoElement | null>
) => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });

  if (videoRef.current) {
    videoRef.current.srcObject = stream;
  }
};

const videoStreamCleanup = (
  videoRef: MutableRefObject<HTMLVideoElement | null>
) => {
  if (videoRef.current && videoRef.current.srcObject) {
    const stream = videoRef.current.srcObject as MediaStream;
    const tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
  }
};

export default function Cam() {
  const [hydrate, setHydrate] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoOffRecordRef = useRef<boolean>(false);
  useEffect(() => {
    if (hydrate === false) {
      setHydrate(true);
    }
  }, [hydrate]);

  useEffect(() => {
    getVideoStream(videoRef);
    return () => {
      videoStreamCleanup(videoRef);
    };
  }, []);

  if (hydrate == false) {
    return <div>loading camera</div>;
  }
  return (
    <div className="W-full h-full">
      <video
        ref={videoRef}
        autoPlay
        muted
        onDoubleClick={() => {
          if (videoOffRecordRef.current === false) {
            videoStreamCleanup(videoRef);
            videoOffRecordRef.current = true;
          } else {
            getVideoStream(videoRef);
            videoOffRecordRef.current = false;
          }
        }}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
