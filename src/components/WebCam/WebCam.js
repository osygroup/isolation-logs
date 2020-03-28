import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

import { camContainer, camPlayer, camGrid, encodedTexts } from './WebCam.module.scss';
import RandomTexts from '../RandomTexts';

const WebCam = () => {
  const videoPlayer = useRef(null);
  const grid = useRef(null);
  const gridBoxes = Array(24).fill()
  const gridEase = 0.2;
  let gridPositionX = 0;
  let gridPositionY = 0;
  let gridTargetX = 0;
  let gridTargetY = 0;

  const onVideoPlay = () => {
    requestAnimationFrame(animatePosition);
    const player = videoPlayer.current;

    setInterval(async () => {
      const detection = await faceapi.detectSingleFace(player, new faceapi.TinyFaceDetectorOptions());
      const { box } = detection || {};
      if (box) {
        const { x, y } = box;
        const boxDim = window.innerHeight * 0.1;
        gridTargetX = x - boxDim * 2.5;
        gridTargetY = y - boxDim * 2.8
        // gridLines.style.transform = `translate3d(${Math.round(x) - boxDim * 2.5}px, ${Math.round(y) - boxDim * 2.8}px, 0)`;
      }
    }, 50)
  }

  const loadFaceApi = async () => {
    const constraints = { audio: false, video: { width: window.innerWidth, height: window.innerHeight } }; 
    const openCam = () => {
      const player = videoPlayer.current;
      navigator.mediaDevices.getUserMedia(constraints)
      .then(function(mediaStream) {
        player.srcObject = mediaStream;
        player.onloadedmetadata = function(e) {
          player.play();
        };
      })
      .catch(function(err) { console.log(err.name + ": " + err.message); });
    }
  
    await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    openCam();
  }

  const animatePosition = () => {
    requestAnimationFrame(animatePosition);
    const gridLines = grid.current;

    gridPositionX += (gridTargetX - gridPositionX) * gridEase;
    const translateX = parseFloat(gridPositionX.toFixed(2));
    gridPositionY += (gridTargetY - gridPositionY) * gridEase;
    const translateY = parseFloat(gridPositionY.toFixed(2));
    const translate = `translate3d(${translateX}px, ${translateY}px, 0)`;
    gridLines.style.transform = translate;

  };
  
  useEffect(() => {
    loadFaceApi();
  }, [])

  return (
    <div className={camContainer}>
      <video ref={videoPlayer} className={camPlayer} onPlay={onVideoPlay} />
      <div ref={grid} className={camGrid}>
        {gridBoxes.map((val, index) => (
          <span key={index} />
        ))}
        <div className={encodedTexts}>
          <div><RandomTexts length={45}/></div>
          <div><RandomTexts length={27}/></div>
          <div><RandomTexts length={16}/></div>
          <div><RandomTexts length={10}/> / <RandomTexts length={10}/></div>
          <div><RandomTexts length={13}/></div>
        </div>
      </div>
    </div>
  )
}

export default WebCam;