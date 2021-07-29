import React, { useEffect, useState } from "react";
import { COLUMNS } from "../../utils/constants";
import './styles.css';

const activeStyle={
  borderLeft: '5px solid #3B6FED'
}

const Settings =(props)=>{
  const [columns,setColumns] = useState([]);

  const allowDrop = (ev) =>{
    ev.preventDefault();
  }
  
  const drag =(ev,col,ind)=> {
    ev.dataTransfer.setData("columnData", JSON.stringify({...col,ind}));
  }
  
  const drop = (ev)=> {
    ev.preventDefault();
    var data = JSON.parse(ev.dataTransfer.getData("columnData"));
    if(ev.target.id){
      let draggedPosition = ev.target.id.split('-');
      // let draggedPosition = ;      
      let col = [...columns].filter((val,ind)=>ind!==data['ind']);
      delete data['ind'];
      col.splice(parseInt(draggedPosition[1]),0,data);
      setColumns(col);
    }
  }

  const changeActive =(col)=>{
    if(col.key !== 'date' && col.key !== 'app'){
      let colm = [...columns];
      colm = colm.map(obj=>{
        if(obj.key === col.key){
          obj['isActive'] = !obj['isActive'];
        }
        return obj;
      });
      setColumns(colm);
    }
  }

  useEffect(()=>{
    setColumns(COLUMNS);
  },[])

  return (
    <div className="setting-wrapper">
      <div className="setting-heading">{'Dimentions and Metrics'}</div>
      <div className="setting-div" onDragOver={allowDrop} onDrop={drop}>
        {
          columns.map((col,ind)=>(
            <div 
              className="setting-columns button" id={`${col.label}-${ind}`}
              draggable={true}
              onDragStart={(ev)=>drag(ev,col,ind)}
              onClick={(e)=>changeActive(col)}
              style={col.isActive ?activeStyle:{}}
            >{col.label}</div>
          ))
        }
      </div>
      <div className="action">
        <button className="close button" onClick={props.close}>Close</button>
        <button className="apply button" onClick={()=>props.applyChanges(columns)}>Apply Changes</button>
      </div>
    </div>
  );
}

export default Settings;