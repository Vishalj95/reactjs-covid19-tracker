import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import './InfoBox.css'

function InfoBox({ title, cases, isRed, active, total, ...props }) {
    return (
        <Card onClick={props.onClick} className={`infoBox ${active && 'infoBox--active'} ${isRed ? 'infoBox--red' : 'infoBox--green'}`}>
            <CardContent className={`${isRed ? 'infoBox__bg--red' : 'infoBox__bg--green'}`}>
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>

                <h2 className={`infoBox__cases font-mono ${!isRed && 'infoBox__cases--green'}`}>{cases}</h2>

                <Typography className="infoBox__total font-mono" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
