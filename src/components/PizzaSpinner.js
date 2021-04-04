import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Pie } from "react-chartjs-2";
import { chartColors } from "./colors";
import { random, find } from "lodash";
import "./styles.css";
import "chartjs-plugin-labels";


var resultDegree = 0;

const PizzaSpinner = (props) => {
  const { chartData } = props;
  const [spin, setSpin] = useState("stationary");

  useEffect(() => {
    setTimeout(() => {
      if (spin === "spinning") {
        setSpin("stopped");
      }
    }, 6000);
  }, [spin]);

  const pieOptions = {
    legend: {
      display: false,
      position: "right"
    },
    plugins: {
      labels: {
        render: "label",
        arc: true,
        position: "border",
        fontSize: 14,
        fontStyle: "bold",
        fontColor: "#000"
      }
    },
    elements: {
      arc: {
        borderWidth: 3,
        borderColor: "black"
      }
    },
    tooltips: {
      enabled: false
    }
  };

  const data = {
    maintainAspectRatio: false,
    responsive: false,
    labels: chartData.map((i) => i.name),
    datasets: [
      {
        data: chartData.map((i) => i.weight),
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors
      }
    ]
  };


  function startRotation() {
    resultDegree = random(1, 359)
    if (spin === "stationary" || spin === "stopped") {
      setSpin("spinning");
    }
  }

  function getResult() {
    let targetDegree = 360 - resultDegree;
    let result = find(chartData, function (o) {
      return targetDegree >= o.start && targetDegree <= o.end;
    });
    return result["name"];
  }

  return (
    <Grid
      container
      direction="column"
      item
      xs={12}
      alignItems="center"
      justify="center"
    >
      {console.log(spin)}
      <Grid
        item
        xs={false}
        className={"spinner-wrapper"}
        style={
          spin === "spinning"
            ? {
                transition: 'transform 6s cubic-bezier(0.59, 0.01, 0.05, 1)',
                transform: `rotate(${resultDegree+(360*9)}deg)`
              }
            : spin === "stopped"
              ? {
                transform: `rotate(${resultDegree}deg)`
              }
              : {}
        }
      >
        <div
          className={'stationary'}
        >
          <Pie data={data} options={pieOptions} height={200} width={200} />
        </div>
      </Grid>
      {chartData.length > 0 && (
        <Button
          variant="contained"
          style={{ zIndex: "5", margin: "20px", backgroundColor: "#21ce99" }}
          onClick={startRotation}
          disabled={(spin === "spinning")}
        >
          {
            spin === "stationary" ? "ghomaya jaye" : "ye tou chuss ha"
          }
        </Button>
      )}
      {spin === "stopped" && (
        <div style={{ margin: "10px" }}>
          {getResult()} will serve pizza today
        </div>
      )}
    </Grid>
  );
};

export default PizzaSpinner;
