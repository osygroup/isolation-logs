import React from 'react';

import {
  isolationDetails,
  transmission,
  recording,
  recordingDot,
  isolationStatus,
  profileTag,
  profilePicture,
  level,
  levelBatch,
  contamination,
  log
} from './IsolationDetails.module.scss'
import MDSIcon from '../../vectors/MDSIcon';
import ProfileLines from '../../vectors/ProfileLines';

import { getCurrentDate } from '../../shared/utils'

const IsolationDetails = () => {
  return (
    <div className={isolationDetails}>
      <div>
        <div className={transmission}>
          TRANSMISSION: <strong>LIVE</strong>
        </div>
        <div className={recording}>
          REC <span className={recordingDot} />
        </div>
      </div>
      <div>
        <div className={isolationStatus}>
          <MDSIcon />
          <span>STATUS: SELF-ISOLATION ENABLED</span>
        </div>
        <div className={profileTag}>
          <div className={profilePicture}>
            <ProfileLines />
          </div>
          <div>
            <h3>ISOLATION</h3>
            <div className={level}>
              <span className={levelBatch}>
                LEVEL 1
              </span>
              <span className={contamination}>
                NOT <br /> CONTAMINATED
              </span>
            </div>
          </div>
        </div>
        <div className={log}>
          <div>
            <div>AGENT: SMITH, MATT D.</div>
            <div>LOG ENTRY: 0001</div>
            <div>LOCATION: SITE 706</div>
            <div>SPOUSE: SMITH, S</div>
          </div>
          <div>
            <div>COVID-19 ISOLATION</div>
            <div>DATE: <time>{getCurrentDate()}</time></div>
          </div>
          <div>
            <div>SQUAD UNIT 7:</div>
            <div>SHANA, NOAH, JUSTICE, ISA, NIXON, SALVADORE</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IsolationDetails;