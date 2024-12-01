const mongoose = require("mongoose");

let counterSchema = new mongoose.Schema({
    modelName: { type: String, required: true, unique: true },
    seq: { type: Number, default: 1 },
});
const Counter = mongoose.model("Counter", counterSchema);

const AutoIncrement = function (schema, options) {
    schema.pre('save', async function (next) {
        const doc = this;

        if (doc.isNew) {
            try {
                // Increment the counter for the specific model
                const counter = await Counter.findOneAndUpdate(
                    { modelName: options.modelName },
                    { $inc: { seq: 1 } },
                    { new: true, upsert: true } // Create a new counter if not exists
                );

                // Set the auto-incremented id for the document
                doc[options.field] = counter.seq;
                next();
            } catch (err) {
                next(err); // If it's a different error, pass it to the next middleware
            }
        } else {
            next();
        }
    });
};

module.exports = AutoIncrement;
