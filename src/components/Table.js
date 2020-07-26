import React from 'react'

import numeral from 'numeral'
import './Table.css'

function Table({ countries }) {
    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        <td>
                            <strong>Countries</strong>
                        </td>
                        <td>
                            <strong>Total Cases</strong>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {countries.map(({ country, cases }) => (
                        <tr key={country}>
                            <td>{country}</td>
                            <td>
                                <strong className="font-mono">{numeral(cases).format("0,0")}</strong>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot></tfoot>
            </table>
        </div>
    );
}

export default Table;
