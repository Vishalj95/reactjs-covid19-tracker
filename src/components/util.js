import React from 'react'
import numeral from 'numeral'
import { Circle, Popup } from 'react-leaflet'

export const sortData = (data) => {
    const sortedData = [...data];
    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1))
}

const casesTypeColor = {
    cases: {
        hex: "#ff073a",
        multiplier: 800
    },
    recovered: {
        hex: "#28a745",
        multiplier: 1200
    },
    deaths: {
        hex: "#fb4443",
        multiplier: 2000
    },
}

export const showDataOnMap = (data, casesType="cases") => 
    data.map(country => (
        <Circle
            key={country.country}
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColor[casesType].hex} 
            fillColor={casesTypeColor[casesType].hex}
            radius={
                Math.sqrt(country[casesType]) * casesTypeColor[casesType].multiplier
            }
        >
            <Popup>
                <div className="info-container">
                    <div className="info-name">
                        <div className="info-flag"
                            style={{ backgroundImage: `url(${country.countryInfo.flag})` }} />
                            <span className="info-country">
                                {country.country}
                            </span>
                    </div>
                    <div className="info-confirmed font-mono">
                        <span className="info-label">Cases:</span> 
                        {numeral(country.cases).format("0,0")}
                    </div>
                    <div className="info-recovered font-mono">
                        <span className="info-label">Recovered:</span> 
                        {numeral(country.recovered).format("0,0")}
                    </div>
                    <div className="info-deaths font-mono">
                        <span className="info-label">Deaths:</span> 
                        {numeral(country.deaths).format("0,0")}
                    </div>
                </div>
            </Popup>
        </Circle>
    ));

export const prettyPrintStat = (stat) => stat ? `+${numeral(stat).format("0.0a")}` : "+0";