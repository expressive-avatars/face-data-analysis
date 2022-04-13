import Plotly from "plotly.js-dist"
import face_data from "../data/face_data.json"
import qualtrics_data from "../data/qualtrics_data.json"

const root = document.createElement("div")
root.style.width = "800px"
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

/**
 *
 * @param {string} expression A-G
 * @param {number} trial 1-3
 */
function getExpressionRatings(expression, trial) {
  return Object.values(qualtrics_data).map((row) => row[`Expression ${expression}_${trial}`])
}

const data = trials.map(({ name, n }) => ({
  x: getExpressionRatings("A", n),
  name,
  type: "box",
  boxpoints: false,
}))

Plotly.newPlot(root, data, {
  showlegend: false,
  yaxis: {
    automargin: true,
  },
})
