import moment from "moment";
import React, { useEffect, useState } from "react";
import './styles.css';

const Table =(props)=>{
  const {columns, data} =props;
  const [filterColumn, setFilterColumn] = useState({});
  const [tableData, setTableData] = useState([]);

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
                    <div style={{display:'flex',width: 'min-content'}}>
                      <img 
                        src="/icons/filter.png" 
                        id={`filter-${i}`} 
                        onClick={(e)=>setFilterColumn(col)}
                        alt={'Filter'}
                      />
                      {filterColumn.key === col.key &&
                        <input 
                          id={`input-${i}`} 
                          onChange={(e)=>onSearch(e,col,i)}
                          placeholder={'Search'}
                        />
                      }
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
                          col.key!=='date'?obj[col.key]:moment(obj[col.key]).format('DD MMM YYYY')
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