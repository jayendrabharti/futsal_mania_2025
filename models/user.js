import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  phone: {
    type: String,
    default: "",
  },
  name: {
    type: String,
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
  },
  image: {
    type: String,
  },
  isRegistered: {
    type: Boolean,
    default: false
  }
},
{ 
  timestamps: true 
}
);

const User = models.User || model("User", UserSchema);

export default User;