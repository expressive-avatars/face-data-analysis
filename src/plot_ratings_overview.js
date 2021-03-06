import Plotly from "plotly.js-dist"
import face_data from "../data/face_data.json"
import qualtrics_data from "../data/qualtrics_data.json"

const root = document.createElement("div")
root.style.width = "1000px"
root.style.height = "500px"
document.body.appendChild(root)

const trials = [
  {
    name: "Mesh (iOS)",
    n: 2,
  },
  {
    name: "Avatar (iOS)",
    n: 3,
  },
  {
    name: "Avatar (webcam)",
    n: 1,
  },
]

const expressions = ["A", "B", "C", "D", "E", "F", "G"]

/**
 *
 * @param {string} expression A-G
 * @param {number} trial 1-3
 */
function getExpressionRatings(expression, trial) {
  return Object.values(qualtrics_data).map((row) => row[`Expression ${expression}_${trial}`])
}

const data = trials.map(({ name, n }) => {
  let x = []
  let y = []

  for (let expression of expressions) {
    const ratings = getExpressionRatings(expression, n)
    x.push(...ratings.map(() => expression))
    y.push(...ratings)
  }

  const trace = {
    x,
    y,
    name,
    type: "box",
  }
  return trace
})

const layout = {
  showlegend: true,
  yaxis: {
    title: "Rating",
    ticklabelstep: 1,
    automargin: true,
  },
  xaxis: {
    title: "Expression",
  },
  boxmode: "group",
}

console.log(data)
Plotly.newPlot(root, data, layout)
