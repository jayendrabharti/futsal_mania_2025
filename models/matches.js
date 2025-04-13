import { Schema, model, models } from "mongoose";

const MatchesSchema = new Schema({
  data: {
    type: String
  },
},
{ 
  timestamps: true 
}
);

const Matches = models.Matches || model("Matches", MatchesSchema);

export default Matches;