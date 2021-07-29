import React, { useEffect, useState } from "react";
import { formatDate } from "../../utils/util";
import './styles.css';

const Table =(props)=>{
  const {columns, data} =props;
  const [tableData,setTableData] = useState([]);

  const switchFilter =(ind)=>{
    const elm =document.getElementById(`input-${ind}`);
    if(elm.style.display && elm.style.display !== 'none'){
      elm.style.display= 'none';
    }else{
      elm.style.display= 'block';
    }
  }

  const onSearch = (e,col,ind)=>{
    const filterData = data.filter(obj=>obj[col['key']].toString().includes(e.target.value));
    setTableData(filterData);
  }

  const onSort =(e,col)=>{
    const sortedData = [...data].sort((a,b)=>a[col['key']]-b[col['key']]);
    setTableData(sortedData);
  }

  useEffect(()=>{
    setTableData(data);
  },[data]);

  return (
    <React.Fragment>
      <div className="table-page">
        <table>
          <thead>
            <tr>
              {columns.map((col,i)=>{
                return(
                  col.isActive && 
                  <th>
                    <div style={{display:'flex'}}>
                      <img src="/icons/filter.png" id={`filter-${i}`} onClick={(e)=>switchFilter(i)}/>
                      <input id={`input-${i}`} style={{display:'none'}} onChange={(e)=>onSearch(e,col,i)}/>
                    </div>
                    <div onClick={(e)=>onSort(e,col)}>{col.label}</div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
          {tableData?.map(obj=>{
            return (
              <tr>
              {
                columns.map(col=>{
                  return (
                      col.isActive &&
                      <td>
                        {
                          col.key=='app_id'?<img src="/icons/app.png" style={{height: '14px'}}/>:null
                        }
                        {
                          col.key!=='date'?obj[col.key]:formatDate(new Date(obj[col.key]))
                        }
                      </td>
                  );
                })
              }
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}
export default Table;