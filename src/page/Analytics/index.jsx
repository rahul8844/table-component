import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import Settings from "../../components/Settings/Settings";
import Table from "../../components/Table/Table";
import { SET_TABLEDATA } from "../../redux/ActionType";
import { API_REPORT_URL } from "../../utils/apiUrl";

const Analytics =(props)=>{
  const [showSettings,setShowSettings]=useState(true);
  const [startDate,setStartDate] = useState(moment().subtract(1, "months").format('YYYY-MM-DD'));
  const [endDate,setEndDate] = useState(moment().format('YYYY-MM-DD'));
  const {apps, tableData, columns} =
    useSelector(state=>(
      {
        apps: state.apps, 
        tableData: state.tableData, 
        columns: state.columns
      }
    ));

  const dispatch = useDispatch();

  const fetchData = async()=>{
    const res = await fetch(`${API_REPORT_URL}?startDate=${startDate}&endDate=${endDate}`);
    const results = await res.json();
    if(results.data){
      let data = results.data.map(obj=>{
        obj['fill_rate'] = (obj['requests']/obj['responses'] *100).toFixed(2);
        obj['ctr'] = (obj['clicks']/obj['impressions'] *100).toFixed(2);
        obj['app'] = apps.filter(app=>app.app_id===obj['app_id'])[0]?.app_name;
        return obj;
      });
      dispatch({
        type: SET_TABLEDATA,
        tableData: data
      });
    }
  }

  const onDateChange =(val)=>{
    setStartDate(val.start.format("YYYY-MM-DD"));
    setEndDate(val.end.format("YYYY-MM-DD"));
  }

  useEffect(()=>{
    fetchData();
  },[startDate,endDate]);

  return (
    <div>
      <div style={{width: '90vw'}}>
        <Header changeSettingsView={()=>setShowSettings(!showSettings)} dateChange={onDateChange}/>
        {showSettings && <Settings close={()=>setShowSettings(!showSettings)}/>}
        <Table columns={columns} data ={tableData}/>
      </div>
    </div>
  );
}

export default Analytics;