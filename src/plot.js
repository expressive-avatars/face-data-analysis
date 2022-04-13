import Plotly from "plotly.js-dist"
import face_data from "../data/face_data.json"
import qualtrics_data from "../data/qualtrics_data.json"

const root = document.createElement("div")
root.style.width = "800px"
root.style.height = "500px"
document.body.appendChild(root)

/**
 *
 * @param {string} expression A-G
 * @param {number} trial 1-3
 */
function getExpressionRatings(expression, trial) {
  return Object.values(qualtrics_data).map((row) => row[`Expression ${expression}_${trial}`])
}

const data = [
  {
    x: getExpressionRatings("A", 1),
    name: "Avatar (webcam)",
    type: "box",
  },
  {
    x: getExpressionRatings("A", 3),
    name: "Avatar (iOS)",
    type: "box",
  },
  {
    x: getExpressionRatings("A", 2),
    name: "Mesh (iOS)",
    type: "box",
  },
]

Plotly.newPlot(root, data, {
  showlegend: false,
  yaxis: {
    automargin: true,
  },
})
