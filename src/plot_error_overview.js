import Plotly from "plotly.js-dist"
import face_data from "../data/face_data.json"
import qualtrics_data from "../data/qualtrics_data.json"

const expressions = ["A", "B", "C", "D", "E", "F", "G"]

const iosBlendShapeNames = Object.keys(face_data["2731"]["A"]["iosBlendShapes"])
const hallwayBlendShapeNames = Object.keys(face_data["2731"]["A"]["hallwayBlendShapes"])

const sharedBlendShapes = iosBlendShapeNames
  .filter((name) => hallwayBlendShapeNames.includes(name))
  .filter((name) => !name.startsWith("eyeLook"))

function getExpressionErrors(expression) {
  /** @type {{[blendShape: string]: number[]}} */
  let errorDict = {}

  let x = []
  let y = []

  for (let id in face_data) {
    const captures = face_data[id]
    for (let name of sharedBlendShapes) {
      const error = captures[expression]["iosBlendShapes"][name] - captures[expression]["hallwayBlendShapes"][name]
      x.push(name)
      y.push(error)
      // errorDict[name] = captures['iosBlendShapes'][name] - captures['hallwayBlendShapes'][name]
    }
  }
  return [x, y]
}

const expression = "F"

const [x, y] = getExpressionErrors(expression)

console.log(face_data)
Object.assign(window, { face_data, iosBlendShapeNames, hallwayBlendShapeNames, sharedBlendShapes, x, y })

const root = document.createElement("div")
root.style.width = "1000px"
root.style.height = "1000px"
document.body.appendChild(root)

const data = [
  {
    x: y,
    y: x,
    type: "box",
    orientation: "h",
  },
]

const layout = {
  showlegend: false,
  yaxis: {
    ticklabelstep: 1,
    automargin: true,
    title: "Blend Shape",
  },
  xaxis: {
    title: "Error (iOS - Webcam)",
    automargin: true,
  },
  orientation: "h",
  title: "Expression " + expression,
}

console.log(data)
Plotly.newPlot(root, data, layout)
