import { Schema, model, models } from "mongoose";

const PaymentsSchema = new Schema({
    transactionId: {
        type: String,
        required: true,
    },
    imageUrl: { 
        type: String,
        required: true,
    },
    type: {
        type: String,
    },
    amount: {
        type: Number,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        default: "verification-pending",
    },
}, {
    timestamps: true,
});

const Payments = models.Payments || model("Payments", PaymentsSchema);

export default Payments;