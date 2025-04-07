import { Schema, models, model } from "mongoose";

const TeamsSchema = new Schema({
  teamName: {
    type: String,
    required: true,
  },
  captain: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  players: {
    type: [{
      type: Schema.Types.ObjectId,
      ref: "Players"
    }],
    default: []
  },
  isGeneratedTeam: {
    type: Boolean,
    default: false, // true for teams made from individual registrations
  },
}, {
  timestamps: true,
});

const Teams = models.Teams || model("Teams", TeamsSchema);

export default Teams;
