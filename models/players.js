import { Schema, model, models } from "mongoose";

const PlayersSchema = new Schema({
  category: {
    type: String,
    default: false,
  },
  isIndividual: {
    type: Boolean,
    default: false,
  }, 
  team: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    default: null,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true
  },
  phone:{
    type: String,
    required: true
  },
  stats: {
    type: Schema.Types.Mixed,
    default: {},
  },
  info:{
    type: Schema.Types.Mixed,
    default: {},
  },
  payment:{
    type: Schema.Types.ObjectId,
    ref: "Payments"
  }
}, {
  timestamps: true,
});
 
const Players = models.Players || model("Players", PlayersSchema);

export default Players;
