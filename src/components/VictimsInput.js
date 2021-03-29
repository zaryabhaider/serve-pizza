import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./styles.css";

const VictimsInput = (props) => {
  const { emptyCheck, setDanger, victims, setVictims } = props;

  function handleChange(e) {
    let code = e.keyCode ? e.keyCode : e.which;
    let victim = e.target.value.toLowerCase();
    if (code === 13) {
      if (victim === "army" || victim === "jawad" || victim === "jawwad" || victim === "jawaad" || victim === "military") {
        setDanger(true);
      } else {
        setVictims([...victims, victim]);
      }
      e.target.value = "";
    }
  }

  function spareVictims() {
    setVictims([]);
  }

  function arshadLabs() {
    let arshadBiradran = ['anas', 'usama', 'haseeb']
    setVictims(arshadBiradran)
  }

  return (
    <Grid container justify="center" item xs={12} style={{ margin: "30px" }}>
      <TextField
        label="mujrim ki shanakht"
        variant="outlined"
        onKeyUp={(e) => handleChange(e)}
      />
      {emptyCheck && (
        <Button
          style={{ margin: "0px 10px" }}
          variant="outlined"
          color="secondary"
          onClick={spareVictims}
        >
          Spare Victims
        </Button>
      )}
      <Button
        id="arshad-labs"
        style={{ margin: "0px 10px", display: 'none' }}
        variant="outlined"
        color="secondary"
        onClick={arshadLabs}
      >
        Arshad Labs
      </Button>
    </Grid>
  );
};

export default VictimsInput;
