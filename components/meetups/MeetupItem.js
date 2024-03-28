import { useRouter } from 'next/router';

import Card from '../ui/Card';
import classes from './MeetupItem.module.css';
import { useState } from 'react';

function MeetupItem(props) {
  const [loader,setLoader] = useState(false)
  const router = useRouter();

  const showDetailsHandler =()=>{
    setLoader(true)
    router.push('/' + props.id)
    setLoader(false)
  }
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details {loader && '...'} </button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
