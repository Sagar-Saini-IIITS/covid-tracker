import './App.css';
import CovidDashboard from './components/CovidDashboard';
import LineGraph from './components/LineGraph';
import react, { useState,useEffect } from 'react';
import axios from './axios';

function App() {
   
  const [totalConfirmed,setTotalConfirmed]= useState(0);
  const [totalRecovered,setTotalRecovered]= useState(0);
  const [totalDeaths,setTotalDeaths]= useState(0);
  const [loading,setLoading]= useState(false);
  const [covidSummary,setCovidSummary] = useState({});
  const [days,setDays] = useState(720);
  const [country,setCountry] = useState('');
  const [CoronaCountA,setCoronaCountA]= useState([]);
  const [label,setLabel] = useState([]);


  useEffect(() => {
    setLoading(true);
   axios.get('/summary').then(res => {
     console.log(res);
     setLoading(false);
     if(res.status===200){
       setTotalConfirmed(res.data.Global.TotalConfirmed);
       setTotalRecovered((res.data.Global.TotalRecovered));
       setTotalDeaths(res.data.Global.TotalDeaths);
       setCovidSummary(res.data);
     }
   }).catch(error => {
     console.log(error);
   })
  }, [])
  const formatDate = (date)=>{
    const d= new Date(date);
    const year=d.getFullYear();
    const month=`${d.getMonth()+1}`.slice(-2);
    const _date=d.getDate();
    return `${year}-${month}-${_date}`;
  }
  const countryHandler = (e)=>{
    
    if(e.target.value=="global"){
      window.location.reload(true);
    }
    else{
    setCountry(e.target.value);
    const d = new Date();
    const to = formatDate(d);
    const from = formatDate(d.setDate(d.getDate()-days));
    getCoronaReportByDateRange(e.target.value,from,to);
    }
  }
  const daysHandler = (e)=>{
      setDays(e.target.value);
      const d = new Date();
    const to = formatDate(d);
    const from = formatDate(d.setDate(d.getDate()-e.target.value));
      getCoronaReportByDateRange(country,from,to);
  }
  const getCoronaReportByDateRange = (countrySlug,from,to) => {
    axios.get(`/country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`)
    .then(res =>{
      console.log(res);
      const yAxisCoronaCount=res.data.map(d => d.Cases);
      const xAxisLabel=res.data.map(d => d.Date);
      setCoronaCountA(yAxisCoronaCount);
      const covidDetails=covidSummary.Countries.find(country => country.Slug===countrySlug);
      setTotalConfirmed(covidDetails.TotalConfirmed);
      setTotalRecovered(covidDetails.TotalRecovered);
      setTotalDeaths(covidDetails.TotalDeaths);
      setLabel(xAxisLabel);
    })
    .catch(error =>{
      console.log(error);
    })
  }
  if(loading){
    return <p> Fetching Data.....</p>
  }
  return (
    <div className="App">
      <CovidDashboard
      totalConfirmed={totalConfirmed} 
      totalRecovered={totalRecovered}
      totalDeaths={totalDeaths}
      country={country} />
      <br></br>
      <div>
        Country: <select value={country} onChange={countryHandler} style={{marginRight:'15px'}}>
          <option value="global"> Global </option>
          {
          covidSummary.Countries && covidSummary.Countries.map(country =>
          <option key={country.Slug} value={country.Slug}>{country.Country}</option>)
          }
        </select>
        <br></br>
        <div style={{width:'50%',margin:'10px auto',marginTop:'50px',backgroundColor:'skyblue'}}> <h5> Select Country from above to view graphical Representation</h5> </div>
        Duration: <select value={days} onChange={daysHandler}>
          <option value="7"> Last 7 days</option>
          <option value="30"> Last 30 days </option>
          <option value="90"> Last 3 months</option>
          <option value="180"> Last 6 months</option>
          <option value="360"> Last 1 year</option>
          <option value="720"> Last 2 years</option>
          <option value="2880"> From the Start</option>
        </select>
      </div>
     <LineGraph yAxis={CoronaCountA} label={label} />
    
    </div>
  );
}

export default App;
