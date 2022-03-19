import React from 'react'
import Card from './Card'
import NumberFormat from 'react-number-format'

export default function CovidDashboard(props) {
   const {
    totalConfirmed,
    totalRecovered,
    totalDeaths,
    country
   } = props;
     return (
    <div>
        <div>
        <h1 style={{textTransform:'capitalize'}}> {country===''?'World Covid Report':country+' Covid Reports'} </h1>
        <div style={{display:'flex', justifyContent:'center'}}>
          <Card className="cardcon">
          <span> Total Confirmed </span> <br></br>
          <span> <NumberFormat value={totalConfirmed}
                                displayType={'text'}
                                thousandSeparator={true}
                                />
          </span>
          </Card>
          <Card>
          <span> Total Recovered </span> <br></br>
          <span> {totalRecovered} </span>
          </Card>
          <Card>
          <span> Total Deaths </span> <br></br>
          <span> {totalDeaths} </span>
          </Card>
        </div>
      </div>

    </div>
  )
}
