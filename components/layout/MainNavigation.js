import { useState } from "react";
import classes from "./MainNavigation.module.css";
import Link from "next/link";

function MainNavigation() {
  const [highlighNav, setHighLightNav] = useState(0);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <Link
              href="/"
              onClick={() => setHighLightNav(0)}
              className={`${highlighNav === 0 ? classes.highlighted : ""}`}
            >
              All Meetups
            </Link>
          </li>
          <li>
            <Link
              href="/new-meetup"
              onClick={() => setHighLightNav(1)}
              className={`${highlighNav === 1 ? classes.highlighted : ""}`}
            >
              Add New Meetup
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
