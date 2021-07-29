import moment from 'moment';
import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Settings from './components/Settings/Settings';
import Table from './components/Table/Table';
import { API_APP_URL, API_REPORT_URL } from './utils/apiUrl';

function App() {
  const [columns,setColumns] = useState([]);
  const [tableData,setTableData] = useState([]);
  const [apps,setApps] = useState([]);
  const [showSettings,setShowSettings]=useState(true);
  const [startDate,setStartDate] = useState(moment().subtract(1, "months").format('YYYY-MM-DD'));
  const [endDate,setEndDate] = useState(moment().format('YYYY-MM-DD'));

  const fetchData = async(apps)=>{
    const res = await fetch(`${API_REPORT_URL}?startDate=${startDate}&endDate=${endDate}`);
    const results = await res.json();
    if(results.data){
      let tableData = results.data.map(obj=>{
        obj['fill_rate'] = (obj['requests']/obj['responses'] *100).toFixed(2);
        obj['ctr'] = (obj['clicks']/obj['impressions'] *100).toFixed(2);
        obj['app'] = apps.filter(app=>app.app_id===obj['app_id'])[0]?.app_name;
        return obj;
      });
      setTableData(tableData);
    }
  }

  const fetchApps = async()=>{
    const res = await fetch(`${API_APP_URL}`);
    const results = await res.json();
    if(results.data){
      setApps(results.data);
      fetchData(results.data);
    }
  }

  const onDateChange =(val)=>{
    setStartDate(val.start.format("YYYY-MM-DD"));
    setEndDate(val.end.format("YYYY-MM-DD"));
  }

  useEffect(()=>{
    fetchApps();
  },[endDate]);

  useEffect(()=>{
    fetchApps();
  },[]);
  return (
    <div className="App">
      <div className="w-5 side-panel"></div>
      <div style={{width: '93vw'}}>
        <Header changeSettingsView={()=>setShowSettings(!showSettings)} dateChange={onDateChange}/>
        {showSettings && <Settings applyChanges={setColumns} close={()=>setShowSettings(!showSettings)}/>}
        <Table columns={columns} data ={tableData}/>
      </div>
    </div>
  );
}

export default App;
