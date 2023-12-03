import { React, useState, useRef, useEffect } from 'react';
import styles from '../../css/Timer/readyTimer.module.css';

const ReadyTimer = (props) => {
  const [seconds, setSeconds] = useState(0);
  const time = useRef(10);
  const timerId = useRef(null);

  useEffect(() => {
    timerId.current = setInterval(() => {
      setSeconds(time.current);
      time.current -= 1;
    }, 1000);

    return () => clearInterval(timerId.current);
  }, []);

  useEffect(() => {
    if (time.current <= 0) {
      clearInterval(timerId.current);
      props.getReadyTimer();
    }
  }, [seconds]);

  return (
    <div className={styles.ReadyTimer}>
      <div className={styles.readytimerText}>ready time</div>
      <div className={styles.timer}>
        {parseInt(time.current / 60)}:{time.current % 60}
      </div>
      <div>Up Next</div>
      <div className={styles.actionVideo}>
        <video className={styles.video} width='250' muted autoPlay loop>
          <source src={props.currentexvideo} type='video/mp4' />
        </video>
      </div>
    </div>
  );
};
export default ReadyTimer;
