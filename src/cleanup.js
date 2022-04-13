import csv from "/data/qualtrics_export.csv"
const capture_data_files = import.meta.globEager("/data/face_data/*.json")

const capture_data = Object.fromEntries(
  Object.entries(capture_data_files).map(([filename, module]) => {
    const id = filename.match(/\/(\d+)\.json$/)[1]
    const { captures } = module
    return [id, captures]
  })
)

const rating_labels = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]

function remapRatings(row) {
  for (const key in row) {
    if (key.startsWith("Expression")) {
      row[key] = rating_labels.indexOf(row[key]) + 1
    }
  }
}

let responses = csv.slice(2).filter((row) => row["Q33"].length > 0 && row["Q33"] !== "301007")
responses.map((row) => remapRatings(row))
const responesObj = Object.fromEntries(responses.map((row) => [row["Q33"], row]))

console.log(responesObj)

Object.assign(window, { csv, responses, responesObj, capture_data_files, capture_data })
