import csv from "./data/qualtrics_export.csv"
const capture_data_files = import.meta.globEager("./data/face_data/*.json")

const capture_data = Object.fromEntries(
  Object.entries(capture_data_files).map(([filename, module]) => {
    const id = filename.match(/\/(\d+)\.json$/)[1]
    const { captures } = module
    return [id, captures]
  })
)

const responses = csv.slice(2).filter((row) => row["Q33"].length > 0 && row["Q33"] !== "301007")

console.log(capture_data)

Object.assign(window, { csv, responses, capture_data_files, capture_data })
