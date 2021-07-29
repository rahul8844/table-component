import React, { useState } from "react";
import DateRangePicker from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import './styles.css';

const moment = extendMoment(originalMoment);

const DateRange = (props)=>{
  const [isOpen,setIsOpen] = useState(false);
  const [value,setValue] = useState(moment.range(moment().clone().subtract(1, "months"), moment().clone()));

  const onSelect = (value, states) => {
    setValue(value);
  };

  const onToggle = () => {
    setIsOpen(!isOpen);
    if(isOpen){
      props.dateChange(value);
    }
  };
  return (
    <div>
      <div style={{display:'flex'}}>
        <div className ="date-toggler button" onClick={onToggle}>
          <img src="/icons/calenderi.svg" style={{ marginRight: '2px'}} alt={""}/>
          {value.start.format("MMM DD")}
          {" - "}
          {value.end.format("MMM DD, YYYY")}
        </div>
      {isOpen && (<button className="date-apply button" onClick={onToggle}>Apply</button>)}
      </div>  
      {isOpen && (
        <div className="date-range">
          <DateRangePicker
            value={value}
            onSelect={onSelect}
            singleDateRange={true}
          />
        </div>
      )}
    </div>
  );
}

export default DateRange;
