import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../../css/LivePage/LivePage.module.css';
import LiveExStart from '../../components/LiveExercise/LiveExStart';
import LiveReadyTimer from '../../components/LiveExercise/LiveReadyTimer';
import LiveInfo from '../../components/LivePage/LiveInfo';
import Videos from '../../components/LivePage/Videos';
import AllRoutine from '../../components/LivePage/AllRoutine';
import Bottom from '../../components/LivePage/Bottom';
import useSocket from '../../hooks/useSocket';
import AllRoutineWide from '../../components/LivePage/AllRoutineWide';
import { getCookieToken } from '../../store/Cookie';
import axios from 'axios';

export default function LivePage() {
  const { liveId, liveTitle, camera, audio, isOwner } = useParams();

  const [
    participateNum,
    myMedia,
    myInfo,
    streams,
    nicknames,
    isownerbtn,
    handleStart,
    readyTimer,
    getReadyTimer,
    currentEx,
    getTimer,
    onRest,
    onNoRest,
    onNoRestSetDone,
    finish,
    setFinish,
    plusset,
    setPlusset,
    routine,
    handleAudio,
    audioOn,
    handleExit,
    handleCamera,
    cameraOn,
    isModify,
    setIsModify,
    socketSetModify,
    modifyActionId,
    socketModifyComplete,
    socketDecrease,
    isDecrease,
    socketIncrease,
    isIncrease,
    isModifySend,
    setIsModifySend,
    socketRoutineChange,
    exFinish,
    isParticipate,
    showBtn,
    setStopbutton,
    stopbutton,
    socketTimerStop,
    socketTimerReset,
    socketRoutineFinish,
    participateNickname,
    leaveNickname,
  ] = useSocket({ liveId, camera, audio, isOwner });

  const [openAllRoutine, setOpenAllRoutine] = useState(false);

  const [partialert, setPartialert] = useState(true);
  const [leavealert, setLeavealert] = useState(true);

  useEffect(() => {
    setPartialert(true);
    let timer = setTimeout(() => {
      setPartialert(false);
    }, 3000);
  }, [participateNickname]);

  useEffect(() => {
    setLeavealert(true);
    let timer = setTimeout(() => {
      setLeavealert(false);
    }, 3000);
  }, [leaveNickname]);
  useEffect(() => {
    if (exFinish === true) {
      axios
        .post(
          `https://52.78.0.53.sslip.io/api/calendars `,
          {
            localDate: new Date(),
            routId: routine.routId,
            check: true,
          },
          {
            headers: { Authorization: `Bearer ${getCookieToken()}` },
          }
        )
        .then((res) => {});
    }
  }, [exFinish]);

  const CalendarCreate = (date, routineid) => {
    axios
      .post(
        `https://52.78.0.53.sslip.io/api/calendars `,
        {
          localDate: date,
          routId: routineid,
          check: true,
        },
        {
          headers: { Authorization: `Bearer ${getCookieToken()}` },
        }
      )
      .then((res) => {});
  };
  return (
    <div className={styles.root}>
      <div className={styles.cover}>
        {partialert && participateNickname ? (
          <div className={styles.blink}>{participateNickname} 입장</div>
        ) : null}
        {leavealert && leaveNickname ? (
          <div className={styles.blink}>{leaveNickname} 퇴장</div>
        ) : null}
        {isModify && !isModifySend ? (
          <div className={styles.blink}>수정 중..</div>
        ) : null}
        <LiveInfo
          liveTitle={liveTitle}
          participateNum={participateNum}
          setOpenAllRoutine={setOpenAllRoutine}
        />
        <div className={styles.middle}>
          <div className={styles.actionVideo}>
            <div className={styles.currentActionBox}>
              {routine?.routineDetails?.map(
                (detail, index) =>
                  currentEx &&
                  !exFinish &&
                  detail.id === currentEx.ex.routinneDetailResult.id &&
                  !readyTimer && (
                    <div className={styles.sequenceBox}>
                      <div
                        key={detail.order}
                        className={`${styles.sequence} ${
                          currentEx &&
                          currentEx.ex.routinneDetailResult.order ===
                            index + 1 &&
                          styles.nowSequence
                        }`}
                      >
                        {detail.order}
                      </div>
                      <div className={styles.actionName}>{detail.ex.name}</div>
                      <div className={styles.actionSet}>
                        set {plusset}/{detail.set}
                      </div>
                    </div>
                  )
              )}

              <div className={styles.currentActionDetailBox}>
                {isownerbtn ? (
                  <div className={styles.startButtonBox}>
                    <button
                      className={styles.startButton}
                      onClick={handleStart}
                    >
                      START
                    </button>
                  </div>
                ) : null}
                {isParticipate ? (
                  <div className={styles.startButtonBox}>
                    <div className={styles.endMassage}>{`Ready`}</div>
                  </div>
                ) : null}
                {readyTimer && currentEx ? (
                  <LiveReadyTimer
                    getReadyTimer={getReadyTimer}
                    time={10}
                    currentEx={currentEx}
                  />
                ) : null}
                {currentEx && !readyTimer && !exFinish ? (
                  <LiveExStart
                    currentEx={currentEx}
                    getTimer={getTimer}
                    onRest={onRest}
                    onNoRest={onNoRest}
                    onNoRestSetDone={onNoRestSetDone}
                    finish={finish}
                    setFinish={setFinish}
                    plusset={plusset}
                    setPlusset={setPlusset}
                    showBtn={showBtn}
                    setStopbutton={setStopbutton}
                    stopbutton={stopbutton}
                    socketTimerStop={socketTimerStop}
                    socketTimerReset={socketTimerReset}
                    socketRoutineFinish={socketRoutineFinish}
                  />
                ) : null}
                {exFinish && (
                  <div className={styles.startButtonBox}>
                    <div
                      className={styles.endMassage}
                    >{`${myInfo.nickname}님, 수고하셨어요!`}</div>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.bottomVideo}>
              <Bottom
                handleAudio={handleAudio}
                audioOn={audioOn}
                handleExit={handleExit}
                handleCamera={handleCamera}
                cameraOn={cameraOn}
              />
              <Videos
                myMedia={myMedia}
                myInfo={myInfo}
                streams={streams}
                nicknames={nicknames}
              />
            </div>
          </div>
          <AllRoutineWide
            routine={routine}
            currentEx={currentEx}
            isModify={isModify}
            setIsModify={setIsModify}
            socketSetModify={socketSetModify}
            modifyActionId={modifyActionId}
            socketModifyComplete={socketModifyComplete}
            socketDecrease={socketDecrease}
            isDecrease={isDecrease}
            socketIncrease={socketIncrease}
            isIncrease={isIncrease}
            isModifySend={isModifySend}
            setIsModifySend={setIsModifySend}
            socketRoutineChange={socketRoutineChange}
            setOpenAllRoutine={setOpenAllRoutine}
            openAllRoutine={openAllRoutine}
            showBtn={showBtn}
          />
        </div>
        {openAllRoutine ? (
          <AllRoutine
            routine={routine}
            currentEx={currentEx}
            isModify={isModify}
            setIsModify={setIsModify}
            socketSetModify={socketSetModify}
            modifyActionId={modifyActionId}
            socketModifyComplete={socketModifyComplete}
            socketDecrease={socketDecrease}
            isDecrease={isDecrease}
            socketIncrease={socketIncrease}
            isIncrease={isIncrease}
            isModifySend={isModifySend}
            setIsModifySend={setIsModifySend}
            socketRoutineChange={socketRoutineChange}
            setOpenAllRoutine={setOpenAllRoutine}
            showBtn={showBtn}
          />
        ) : null}
      </div>
    </div>
  );
}
