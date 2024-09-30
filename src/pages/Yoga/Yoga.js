import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs';
import React, { useRef, useState, useEffect } from 'react'
import backend from '@tensorflow/tfjs-backend-webgl'
import Webcam from 'react-webcam'
import { count } from '../../utils/music'; 
 
import Instructions from '../../components/Instrctions/Instructions';

import './Yoga.css'
 
import DropDown from '../../components/DropDown/DropDown';
import { poseImages } from '../../utils/pose_images';
import { POINTS, keypointConnections } from '../../utils/data';
import { drawPoint, drawSegment } from '../../utils/helper'



let skeletonColor = 'rgb(255,255,255)'
let poseList = [
  'Tree', 'Chair', 'Cobra', 'Warrior', 'Dog',
  'Shoulderstand', 'Traingle'
]

let interval

// flag variable is used to help capture the time when AI just detect 
// the pose as correct(probability more than threshold)
let flag = false


function Yoga() {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)


  const [startingTime, setStartingTime] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [poseTime, setPoseTime] = useState(0)
  const [bestPerform, setBestPerform] = useState(0)
  const [currentPose, setCurrentPose] = useState('Tree')
  const [isStartPose, setIsStartPose] = useState(false)

  
  useEffect(() => {
    const timeDiff = (currentTime - startingTime)/1000
    if(flag) {
      setPoseTime(timeDiff)
    }
    if((currentTime - startingTime)/1000 > bestPerform) {
      setBestPerform(timeDiff)
    }
  }, [currentTime])


  useEffect(() => {
    setCurrentTime(0)
    setPoseTime(0)
    setBestPerform(0)
  }, [currentPose])

  const CLASS_NO = {
    Chair: 0,
    Cobra: 1,
    Dog: 2,
    No_Pose: 3,
    Shoulderstand: 4,
    Traingle: 5,
    Tree: 6,
    Warrior: 7,
  }

  const startYoga = ()=>{
         console.log("Started");
  }
  return (
    <div
      className="yoga-container"
    >
      <DropDown
        poseList={poseList}
        currentPose={currentPose}
        setCurrentPose={setCurrentPose}
      />
      <Instructions
          currentPose={currentPose}
        />
      <button
          onClick={startYoga}
          className="secondary-btn"    
        >Start Pose</button>
    </div>
  )
}

export default Yoga