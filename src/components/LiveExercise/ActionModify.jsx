import React, { useEffect, useState } from 'react';
import { FaCircleArrowLeft, FaCircleArrowRight } from 'react-icons/fa6';

export default function ActionModify({
  routine,
  selectedAction,
  socketModifyComplete,
  socketDecrease,
  isDecrease,
  socketIncrease,
  isIncrease,
  setIsModify,
  isModifySend,
  setIsModifySend,
  socketRoutineChange,
}) {
  const { ex, time, count, type } = selectedAction;

  const [timecount, setTimeCount] = useState(0);
  const [liveRoutine, setLiveRoutine] = useState(routine);

  useEffect(() => {
    if (type) {
      setTimeCount(time);
    } else {
      setTimeCount(count);
    }
  }, [selectedAction]);

  useEffect(() => {
    console.log('is decrease: ', isDecrease);
    setTimeCount((prev) => prev - 1);
  }, [isDecrease]);

  useEffect(() => {
    console.log('is increase: ', isIncrease);
    setTimeCount((prev) => prev + 1);
  }, [isIncrease]);

  useEffect(() => {
    if (isModifySend) {
      console.log(routine);
      console.log(liveRoutine);
      socketRoutineChange(liveRoutine);
      setIsModify(false);
    }
  }, [isModifySend]);

  const handleModifyButton = () => {
    if (type) {
      setLiveRoutine((routine) => ({
        ...routine,
        routineDetails: routine.routineDetails.map((action) => {
          if (action.id === selectedAction.id) {
            return {
              ...action,
              time: timecount,
            };
          } else {
            return action;
          }
        }),
      }));
    } else {
      setLiveRoutine((routine) => ({
        ...routine,
        routineDetails: routine.routineDetails.map((action) => {
          if (action.id === selectedAction.id) {
            return {
              ...action,
              count: timecount,
            };
          } else {
            return action;
          }
        }),
      }));
    }

    socketModifyComplete();
  };

  const handleDecrease = () => {
    socketDecrease();
  };

  const handleIncrease = () => {
    socketIncrease();
  };

  // console.log('selected action: ', selectedAction);

  return (
    <div>
      {/* <h1>수정 컴포넌트</h1> */}
      <div>
        <h2>수정 전 동작 정보</h2>
        <span>동작 이름 : {ex.name}</span>
        {type ? <span>타임 : {time}s</span> : <span>횟수 : {count}</span>}
      </div>

      {type ? (
        <div>
          <h2>타임 수정</h2>
          <button onClick={handleDecrease}>
            <FaCircleArrowLeft />
          </button>
          <span>{timecount}s</span>
          <button onClick={handleIncrease}>
            <FaCircleArrowRight />
          </button>
        </div>
      ) : (
        <div>
          <h2>횟수 수정</h2>
          <button onClick={handleDecrease}>
            <FaCircleArrowLeft />
          </button>
          <span>{timecount}회</span>
          <button onClick={handleIncrease}>
            <FaCircleArrowRight />
          </button>
        </div>
      )}
      <button onClick={handleModifyButton}>수정 완료</button>
    </div>
  );
}