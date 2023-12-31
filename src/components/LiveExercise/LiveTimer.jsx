import { React, useState, useRef, useEffect } from 'react';
import styles from '../../css/Live/LiveExStart.module.css';

const LiveTimer = (props) => {
  const [seconds, setSeconds] = useState(0);
  const time = useRef(props.time);
  const timerId = useRef(null);

  useEffect(() => {
    time.current = props.time;
  }, [props.time]);

  useEffect(() => {
    if (props.stopbutton) {
      timerId.current = setInterval(() => {
        setSeconds(time.current);
        time.current -= 1;
      }, 1000);
    }

    return () => clearInterval(timerId.current);
  }, [props.stopbutton]);

  useEffect(() => {
    if (time.current <= 0) {
      clearInterval(timerId.current);
      props.getTimer();
    }
  }, [seconds]);

  useEffect(() => {
    if (!props.stopbutton) {
      clearInterval(timerId.current);
    }
  }, [props.stopbutton]);

  const onClickstop = () => {
    props.socketTimerStop();
  };

  const onClickrestart = () => {
    props.socketTimerReset();
  };

  return (
    <div className={styles.liveTimer}>
      <div className={styles.timer}>
        {parseInt(time.current / 60)}:{time.current % 60}
      </div>
      {props.showBtn &&
        (props.stopbutton ? (
          <button onClick={onClickstop} className={styles.button}>
            STOP
          </button>
        ) : (
          <button onClick={onClickrestart} className={styles.button}>
            START
          </button>
        ))}
    </div>
  );
};
export default LiveTimer;
