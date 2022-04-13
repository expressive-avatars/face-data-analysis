import Plotly from "plotly.js-dist"

const root = document.createElement("div")
root.style.width = "800px"
root.style.height = "500px"
document.body.appendChild(root)

Plotly.newPlot(
  root,
  [
    {
      x: [1, 2, 3, 4, 5],

      y: [1, 2, 4, 8, 16],
    },
  ],
  {
    margin: { t: 0 },
  }
)
