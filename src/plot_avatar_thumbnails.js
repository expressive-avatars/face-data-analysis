import Plotly from "plotly.js-dist"
import face_data from "../data/face_data.json"
import qualtrics_data from "../data/qualtrics_data.json"
import { participantAvatars } from "./constants"
const expressions = ["A", "B", "C", "D", "E", "F", "G"]

const root = document.createElement("div")
root.style.width = "1500px"
root.style.height = "1500px"
document.body.appendChild(root)

Object.assign(window, { qualtrics_data })
console.log(participantAvatars)

// I need list of [x, y, thumbnail] for each id
// x: average iOS rating
// y: average hallway rating

// Compute average rating for each participant

const participantIds = Object.keys(participantAvatars)

function getAverageRating(id, trial) {
  const keys = expressions.map((expression) => `Expression ${expression}_${trial}`)
  let totalRating = 0
  let numRatings = 0
  for (let key of keys) {
    const rating = qualtrics_data[id][key]
    if (rating) {
      totalRating += rating
      numRatings++
    }
  }
  return totalRating / numRatings
}

const averageIOSRatings = participantIds.map((id) => getAverageRating(id, 3))
const averageHallwayRatings = participantIds.map((id) => getAverageRating(id, 1))

const images = participantIds.map((id, i) => {
  return {
    source: `/thumbnails/${participantAvatars[id]}.png`,
    xref: "x",
    yref: "y",
    x: averageIOSRatings[i],
    y: averageHallwayRatings[i],
    sizex: 0.5,
    sizey: 0.5,
    xanchor: "center",
    yanchor: "middle",
  }
})

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

const layout = {
  showlegend: false,
  yaxis: {
    title: "Mean Rating (Webcam)",
    automargin: true,
    range: [1, 5],
    ticklabelstep: 1,
  },
  xaxis: {
    title: "Mean Rating (iOS)",
    range: [1, 5],
    ticklabelstep: 1,
  },
  images,
}

Plotly.newPlot(root, [{ x: [0, 5], y: [0, 5] }], layout)
