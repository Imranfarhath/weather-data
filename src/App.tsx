import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import cloud from '../images/cloudy_1163661.png'
import wind from '../images/wind_2676047.png'
import weather from '../images/weather_12481595.png'
function App() {
  const [place, setplace] = useState('');
  const [city,setcity]=useState({})
  const [data,setdata]=useState([])
  useEffect(()=>{
    async function fetchdata()
    {
      try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=26143d277cebd0cceea96bde3933ffee`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const json = await response.json();
        setdata(json.list);
        setcity(json.city);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setdata([]);
      }
    }
    fetchdata();
  },[])
  async function handlesubmit(e)
  {
    e.preventDefault();
    try {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=26143d277cebd0cceea96bde3933ffee&q=${place}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const json = await response.json();
      setdata(json.list);
      setcity(json.city);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setdata([]);
    }
  }
  return (
    <>
      <div className='mt-5 container d-flex justify-content-center'>
  <div className='col-4'>
    <form onSubmit={handlesubmit} className='d-flex align-items-center'>
      <input 
        className='form-control rounded-4 me-2' 
        type='text' 
        name='place' 
        value={place} 
        onChange={(e) => setplace(e.target.value)} 
        placeholder='Enter your location'
      />
      <button type='submit' className='btn btn-primary'>SUBMIT</button>
    </form>
  </div>
</div>

{data.length>0?<div className='container col-4 text-center border border-5 border-dark rounded-5 mt-5'>
   <div className='row'>
   <div className='col'>
      <h4>City</h4>
    </div>
    <div className='col'>
      <h4>-</h4>
    </div>
    <div className='col'>
      <h4>{city.name}</h4>
    </div>
    </div>
    <div className='row'>
    <div className='col'>
      <h4>Country</h4>
    </div>
    <div className='col'>
      <h4>-</h4>
    </div>
    <div className='col'>
      <h4>{city.country}</h4>
    </div>
   </div>
   <div className='row'>
    <div className='col'>
      <h4>Latitude</h4>
    </div>
    <div className='col'>
      <h4>-</h4>
    </div>
    <div className='col'>
      <h4>{city.coord.lon}</h4>
    </div>
   </div>
   <div className='row'>
    <div className='col'>
      <h4>Longitude</h4>
    </div>
    <div className='col'>
      <h4>-</h4>
    </div>
    <div className='col'>
      <h4>{city.coord.lat}</h4>
    </div>
   </div>
</div>:null}


{data.length>0?data.map((d, index) => (
  <div className="container pb-5" key={index}>
    <div className='text-center mt-5 pb-4 border border-5 border-dark rounded-5'>
      <h1 className='text-danger'>City - {d.dt}</h1> 
    <div className="row">
      <div className="col-lg-8 col-md-12 pe-sm-5">
        <div className="bg-light p-3 h-100 rounded-3 border border-dark ms-5">
          <h1 className='text-primary'>Main</h1>
          <img src={weather} alt='api img' className="img-fluid" style={{ width: "250px", height: "250px" }}></img>
          <div className=''>
            <br/><br/>
            <div className='row'>
              <div className='col-6'>
                <h3>temp</h3>
              </div>
              <div className='col'>
                <h3>-</h3>
              </div>
              <div className='col'>
                <h3>{d.main.temp}</h3>
              </div>
            </div>

            <div className='row'>
              <div className='col-6'>
                <h3>pressure</h3>
              </div>
              <div className='col'>
                <h3>-</h3>
              </div>
              <div className='col'>
                <h3>{d.main.pressure}</h3>
              </div>
            </div>

            <div className='row'>
              <div className='col-6'>
                <h3>Minimum temperatue</h3>
              </div>
              <div className='col'>
                <h3>-</h3>
              </div>
              <div className='col'>
                <h3>{d.main.temp_min}</h3>
              </div>
            </div>

            <div className='row'>
              <div className='col-6'>
                <h3>Maximum temperature</h3>
              </div>
              <div className='col'>
                <h3>-</h3>
              </div>
              <div className='col'>
                <h3>{d.main.temp_max}</h3>
              </div>
            </div>

            <div className='row'>
              <div className='col-6'>
                <h3>Sea level</h3>
              </div>
              <div className='col'>
                <h3>-</h3>
              </div>
              <div className='col'>
                <h3>{d.main.sea_level}</h3>
              </div>
            </div>

            <div className='row'>
              <div className='col-6'>
                <h3>Ground level</h3>
              </div>
              <div className='col'>
                <h3>-</h3>
              </div>
              <div className='col'>
                <h3>{d.main.grnd_level}</h3>
              </div>
            </div>

            <div className='row'>
              <div className='col-6'>
                <h3>Humidity</h3>
              </div>
              <div className='col'>
                <h3>-</h3>
              </div>
              <div className='col'>
                <h3>{d.main.humidity}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-12 mt-5">
        <div className="h-100 d-flex flex-column justify-content-between p-3">
          <div className="mb-3 p-2 bg-light rounded-3 border border-dark">
            <h1 className='text-primary text-center'>Weather</h1>
            <div className="row">
              <div className="col-4">
                <img src={"http://openweathermap.org/img/wn/"+d.weather[0].icon+".png"} alt="Weather" className="img-fluid bg-dark" style={{ width: "100px", height: "100px" }} />
              </div>
              <div className="col-8 text-start">
                <h3>Main - {d.weather[0].main}</h3>
                <h3>Description - {d.weather[0].description}</h3>
              </div>
            </div>
          </div>
          <div className="mb-3 p-2 bg-light rounded-3 border border-dark">
            <h1 className='text-primary text-center'>Clouds</h1>
            <div className="row">
              <div className="col-4">
                <img src={cloud} alt="Clouds" className="img-fluid" style={{ width: "100px", height: "100px" }} />
              </div>
              <div className="col-8 text-start">
                <h3>all - {d.clouds.all}</h3>
              </div>
            </div>
          </div>
          <div className="mb-3 p-2 bg-light rounded-3 border border-dark">
            <h1 className='text-primary text-center'>Wind</h1>
            <div className="row">
              <div className="col-4">
                <img src={wind} alt="Wind" className="img-fluid" style={{ width: "100px", height: "100px" }} />
              </div>
              <div className="col-8 text-start">
                <h3>Speed - {d.wind.speed}</h3>
                <h3>deg - {d.wind.deg}</h3>
                <h3>gust - {d.wind.gust}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
)):<h1 className='text-center vh-100 mt-5'>No data Available</h1>}


    



 


    </>
  )
}

export default App
