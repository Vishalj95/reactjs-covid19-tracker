import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from '@material-ui/core';
import './App.css';
import coronaicon from './images/corona-icon.png'
import InfoBox from './components/InfoBox'
import Map from './components/Map'
import Table from './components/Table'
import { sortData, prettyPrintStat } from './components/util'
import LineGraph from './components/LineGraph'
import 'leaflet/dist/leaflet.css'

function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('worldwide');
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);
    const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
    const [mapZoom, setMapZoom] = useState(3);
    const [mapCountries, setMapCountries] = useState([]);
    const [casesType, setCasesType] = useState("cases");

    // https://disease.sh/v3/covid-19/all
    // https://disease.sh/v3/covid-19/countries
    // https://disease.sh/v3/covid-19/countries/{COUNTRY_CODE}

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/all')
        .then((response) => response.json())
        .then((data) => {
            setCountryInfo(data);
        });
    }, []);

    useEffect(() => {
        const getCountriesData = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries")
            .then((response) => response.json())
            .then((data) => {
                const countries = data.map((country) => ({
                    name: country.country,
                    value: country.countryInfo.iso2
                }));

                const sortedData = sortData(data);
                setTableData(sortedData);
                setMapCountries(data);
                setCountries(countries);
            });
        }
        // call it
        getCountriesData();
    }, []);

    const onCountryChange = async (event) => {
        const countryCode = event.target.value;
        const url = countryCode === 'worldwide' ? `https://disease.sh/v3/covid-19/all` : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        await fetch(url)
        .then(response => response.json())
        .then((data) => {
            setCountry(countryCode)
            setCountryInfo(data);
            if(countryCode !== 'worldwide') {
                setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
            } else {
                setMapCenter({ lat: 34.80746, lng: -40.4796 });
            }
            setMapZoom(4);
        });
    } 

    return (
        <div className="app">
            <div className="app__left">
                <div className="app__header">
                    <h1>
                        <img src={coronaicon} alt="Corona" height="32" width="32" loading="auto"/>
                        Covid-19 Tracker
                    </h1>
                    <FormControl className="app__dropdown">
                        <Select variant="outlined" value={country} onChange={onCountryChange}>
                            <MenuItem value="worldwide">Worldwide</MenuItem>
                            {countries.map((country, index) => (
                                <MenuItem key={index} value={country.value}>{country.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <div className="app_stats">
                    <InfoBox isRed active={casesType === "cases"} onClick={(e) => setCasesType("cases")} title="Coronavirus Cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)} />
                    <InfoBox active={casesType === "recovered"} onClick={(e) => setCasesType("recovered")} title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)} />
                    <InfoBox isRed active={casesType === "deaths"} onClick={(e) => setCasesType("deaths")} title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)} />
                </div>

                <Map countries={mapCountries} casesType={casesType} center={mapCenter} zoom={mapZoom} />
            </div>

            <Card className="app__right">
                <CardContent>
                    <h3>Live Cases by Country</h3>
                    <Table countries={tableData} />
                    
                    <div className="app__right_grapbox">
                        <h3>Worldwide new {casesType}</h3>
                        <LineGraph casesType={casesType} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default App;
