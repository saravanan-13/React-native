import React, { Component } from "react";
import FontAwesome, { Icons } from "react-native-fontawesome";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity
} from "react-native";

const backspace = <FontAwesome>{Icons.chevronLeft}</FontAwesome>;

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      resultText: "",
      calculatedText: ""
    };
    this.operations = [{ backspace }, "+", "-", "*", "/"];
  }

  calculateText = () => {
    const text = this.state.resultText;
    console.log("Result", eval(text));
    this.setState({ calculatedText: eval(text) });
  };

  validate = () => {
    const text = this.state.resultText;
    switch (text.slice(-1)) {
      case "+":
      case "-":
      case "*":
      case "/":
        return false;
    }
    return true;
  };

  buttonPressed = text => {
    //console.log(text);
    if (text === "=") {
      this.validate() && this.calculateText();
    } else
      this.setState({
        resultText: this.state.resultText + text
      });
  };

  operate = operation => {
    switch (operation) {
      case "D":
        if (this.state.resultText === "") return;
        // console.log(this.state.resultText);
        let resultText = this.state.resultText.slice(0, -1);
        this.setState({ resultText });
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        const lastChar = this.state.resultText.split("").pop();
        if (
          this.operations.indexOf(lastChar) > 0 ||
          this.state.resultText === ""
        )
          return;
        this.setState({ resultText: this.state.resultText + operation });
    }
  };

  render() {
    let rows = [];
    let nums = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [0, ".", "="]];
    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity
            key={nums[i][j]}
            style={styles.btn}
            onPress={() => this.buttonPressed(nums[i][j])}
          >
            <Text style={styles.btnText}>{nums[i][j]}</Text>
          </TouchableOpacity>
        );
      }

      rows.push(
        <View key={nums[i]} style={styles.row}>
          {row}
        </View>
      );
    }

    this.operations = ["D", "+", "-", "*", "/"];
    let ops = [];

    for (let i = 0; i < 5; i++) {
      ops.push(
        <TouchableOpacity
          key={this.operations[i]}
          style={[styles.btn, styles.ops]}
          onPress={() => this.operate(this.operations[i])}
        >
          <Text style={[styles.btnText, styles.opsText]}>
            {this.operations[i]}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>
            {this.state.calculatedText}
          </Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>{rows}</View>
          <View style={styles.operations}>{ops}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  row: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch"
  },
  ops: {},
  opsText: {
    color: "white",
    fontSize: 25
  },
  btnText: {
    fontSize: 20,
    color: "white"
  },
  result: {
    flex: 2,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  resultText: {
    fontSize: 90,
    color: "#8b8b8b"
  },
  calculation: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  calculationText: {
    fontSize: 50,
    color: "black"
  },
  buttons: {
    flex: 7,
    flexDirection: "row"
  },
  numbers: {
    flex: 3,
    backgroundColor: "#434343"
  },
  operations: {
    flex: 1,
    backgroundColor: "#636363",
    justifyContent: "space-around",
    alignItems: "center"
  }
});
