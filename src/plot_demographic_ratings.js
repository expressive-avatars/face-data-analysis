import Plotly from "plotly.js-dist"
import face_data from "../data/face_data.json"
import qualtrics_data from "../data/qualtrics_data.json"
import { getMean } from "./stats"

const root = document.createElement("div")
root.style.width = "600px"
root.style.height = "500px"
document.body.appendChild(root)

const responses_race = Object.values(qualtrics_data).map((row) => row.Race)
const set_race = new Set(responses_race)
const arr_race = [...set_race]

const responses_gender = Object.values(qualtrics_data).map((row) => row.Gender)
const set_gender = new Set(responses_gender)
const arr_gender = [...set_gender]

const expressions = ["A", "B", "C", "D", "E", "F", "G"]

function getRaceRatings(expression, trial) {
  return Object.values(qualtrics_data).map((row) => row[`Expression ${expression}_${trial}`])
}

/**
 *
 * @param {qualtrics_data[keyof qualtrics_data]} row
 */
function getRowRatings(row, trial) {
  const ratings = expressions.map((expression) => row[`Expression ${expression}_${trial}`])
  return ratings
}

const race_means_ios = arr_race.map((race) =>
  getMean(
    Object.values(qualtrics_data)
      .filter((row) => row.Race === race)
      .map((row) => getMean(getRowRatings(row, 3)))
  )
)
const race_means_webcam = arr_race.map((race) =>
  getMean(
    Object.values(qualtrics_data)
      .filter((row) => row.Race === race)
      .map((row) => getMean(getRowRatings(row, 1)))
  )
)

const race_counts = arr_race.map((race) => Object.values(qualtrics_data).filter((row) => row.Race === race).length)
const race_counts_obj = Object.fromEntries(arr_race.map((race, i) => [race, race_counts[i]]))

const gender_counts = arr_gender.map((gender) => Object.values(qualtrics_data).filter((row) => row.Gender === gender).length)
const gender_counts_obj = Object.fromEntries(arr_gender.map((gender, i) => [gender, gender_counts[i]]))

const gender_means_ios = arr_gender.map((gender) =>
  getMean(
    Object.values(qualtrics_data)
      .filter((row) => row.Gender === gender)
      .map((row) => getMean(getRowRatings(row, 3)))
  )
)
const gender_means_webcam = arr_gender.map((gender) =>
  getMean(
    Object.values(qualtrics_data)
      .filter((row) => row.Gender === gender)
      .map((row) => getMean(getRowRatings(row, 1)))
  )
)

console.log({ race_means_ios, race_means_webcam, race_counts_obj, gender_counts_obj })

const layout = {
  showlegend: true,
  yaxis: {
    title: "Mean Overall Rating",
    ticklabelstep: 1,
    dtick: 1,
    automargin: true,
    range: [1, 5],
  },
  xaxis: {
    title: "Gender",
  },
}

const trace1 = {
  x: arr_gender,
  y: gender_means_ios,
  type: "bar",
  name: "iOS avatar",
}

const trace2 = {
  x: arr_gender,
  y: gender_means_webcam,
  type: "bar",
  name: "Webcam avatar",
}

const data = [trace1, trace2]

console.log(data)

Plotly.newPlot(root, data, layout)
