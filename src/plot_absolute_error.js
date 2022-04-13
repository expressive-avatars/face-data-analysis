import Plotly from "plotly.js-dist"
import face_data from "../data/face_data.json"
import qualtrics_data from "../data/qualtrics_data.json"

const expressions = ["A", "B", "C", "D", "E", "F", "G"]

const iosBlendShapeNames = Object.keys(face_data["2731"]["A"]["iosBlendShapes"])
const hallwayBlendShapeNames = Object.keys(face_data["2731"]["A"]["hallwayBlendShapes"])

const sharedBlendShapes = iosBlendShapeNames
  .filter((name) => hallwayBlendShapeNames.includes(name))
  .filter((name) => !name.startsWith("eyeLook"))

function getMeanAbsoluteError(listA, listB) {
  let absoluteErrors = []
  let totalAbsoluteError = 0
  for (let i = 0; i < listA.length; ++i) {
    const absoluteError = Math.abs(listA[i] - listB[i])
    absoluteErrors.push(absoluteError)
    totalAbsoluteError += absoluteError
  }
  return totalAbsoluteError / listA.length
}

function getPairedValues(expression) {
  let iosBlendShapes = []
  let hallwayBlendShapes = []

  for (let id in face_data) {
    const captures = face_data[id]
    for (let name of sharedBlendShapes) {
      iosBlendShapes.push(captures[expression]["iosBlendShapes"][name])
      hallwayBlendShapes.push(captures[expression]["hallwayBlendShapes"][name])
    }
  }
  return { iosBlendShapes, hallwayBlendShapes }
}

function getExpressionMAE(expression) {
  const { iosBlendShapes, hallwayBlendShapes } = getPairedValues(expression)
  return getMeanAbsoluteError(iosBlendShapes, hallwayBlendShapes)
}

function getExpressionErrors(expression) {
  let errors = []

  for (let id in face_data) {
    const captures = face_data[id]
    for (let name of sharedBlendShapes) {
      const error = captures[expression]["iosBlendShapes"][name] - captures[expression]["hallwayBlendShapes"][name]
      errors.push(error)
      // errorDict[name] = captures['iosBlendShapes'][name] - captures['hallwayBlendShapes'][name]
    }
  }
  return errors
}

const root = document.createElement("div")
root.style.width = "1000px"
root.style.height = "500px"
document.body.appendChild(root)

// const data = [
//   {
//     x: ["A", "B"],
//     y: [
//       [1, 2],
//       [3, 4],
//     ],
//     type: "box",
//   },
// ]

const data = expressions
  .map((exp) => ({
    x: getExpressionErrors(exp),
    type: "box",
    name: exp,
  }))
  .reverse()

const layout = {
  showlegend: false,
  yaxis: {
    automargin: true,
    title: "Expression",
  },
  xaxis: {
    title: "Error (iOS - Hallway)",
    automargin: true,
  },
}

console.log(data)
Plotly.newPlot(root, data, layout)
