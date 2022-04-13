import face_data from "../data/face_data.json"
import qualtrics_data from "../data/qualtrics_data.json"

export const expressions = ["A", "B", "C", "D", "E", "F", "G"]

export const iosBlendShapeNames = Object.keys(face_data["2731"]["A"]["iosBlendShapes"])
export const hallwayBlendShapeNames = Object.keys(face_data["2731"]["A"]["hallwayBlendShapes"])

export const filteredBlendShapeNames = iosBlendShapeNames
  .filter((name) => hallwayBlendShapeNames.includes(name))
  .filter((name) => !name.startsWith("eyeLook"))

export const particpantIds = Object.keys(face_data)
export const participantAvatars = Object.fromEntries(particpantIds.map((id) => [id, face_data[id]["A"]["avatar"]]))
