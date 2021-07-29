import React, { useState } from "react";
import DateRange from "../DateRange/DateRangePicker";
import './styles.css';

const Header =(props)=>{
  const [date,setDate] = useState();
  return (
    <React.Fragment>
      <div className="heading">Analytics</div>
      <div className="header">
        <div>
          <div>
            <DateRange dateChange={props.dateChange}/>
          </div>
        </div>
        <div className="settings button" onClick={props.changeSettingsView}>
          <img src="/icons/settings.png" style={{height: '14px',marginRight: '8px'}}/>
          <span>Settings</span>
        </div>  
      </div>
    </React.Fragment>
  );
}
export default Header;