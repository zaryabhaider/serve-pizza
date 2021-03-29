import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import VictimsInput from "./components/VictimsInput";
import PizzaSpinner from "./components/PizzaSpinner";
import Typography from "@material-ui/core/Typography";
import pizzaIcon from './images/pizza.svg';
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';

const App = (props) => {
  const [victims, setVictims] = useState([]);
  const [danger, setDanger] = useState(false);

  useEffect(() => {
    if (danger) {
      setTimeout(() => {
        setDanger(false);
      }, 2000);
    }
  }, [danger]);

  function generateVictimsData() {
    let totalVictims = victims.length;
    let victimsDataArray = victims.map((victim, i) => {
      return {
        name: victim,
        weight: 1,
        start: (360 / totalVictims) * i + 1,
        end: (360 / totalVictims) * (i + 1)
      };
    });
    return victimsDataArray;
  }

  console.log("MITHAI BATT RAI HA IDR???")

  const instructions = () => "khali jaga me awam ke naam dalein (ak wakt me 1 naam), darj zeil ak pheeta bna aega jis mein naam darj hojaengey, ghomany k lye battan dabein, phr pheeta apni marzi se kisi bi naam par ruk jaega ar wo pizza khilane ka zimadar hoga"




  return (
    <Grid container justify="center" item xs={12} style={{padding: '25px', position: 'relative'}}>
      <Tooltip arrow title={instructions()}>
        <Typography variant="subtitle2" style={{position: 'absolute', top: '5%', right: '10%', color: '#5c5c5c', display: 'flex', cursor: 'pointer'}}>
          kch pallay nai para
          <HelpIcon fontSize="small"/>
        </Typography>
      </Tooltip>
      <Typography>Naam Likhein Ar Jadoo Dekhein</Typography>
      <VictimsInput
        emptyCheck={Boolean(victims.length > 0)}
        setDanger={setDanger}
        victims={victims}
        setVictims={setVictims}
      />
      <Grid container justify="center" item xs={12} style={{ overflow: "hidden", position: 'relative', padding: '50px' }}>
      <img alt="pointer" src={pizzaIcon} style={{height: '70px', width: '70px', position: 'absolute', top: '0px', zIndex: '5'}}></img>
        {Boolean(victims.length > 0) && (
          <PizzaSpinner chartData={generateVictimsData()} />
        )}
      </Grid>
      {danger && <Typography style={{ color: "red" }}>maafi</Typography>}
    </Grid>
  );
}

export default App
