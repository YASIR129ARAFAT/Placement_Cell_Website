const mongoose = require('mongoose')
const { Schema } = mongoose

const SelectionSchema = new Schema(
    {
        studentId: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "User"
        },
        companyId: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "Opening"
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)
SelectionSchema.virtual('formattedDate').get(function () {
    let date = this?.updatedAt;
    date = date.toLocaleDateString('en-GB', { day: 'numeric', month: "short", year: "numeric" })

    return date
})

SelectionSchema.virtual('formattedTime').get(function () {
    let time = this?.updatedAt;
    /**
     * for populating if virtual attribute is not selected then it will give an error
        because mongodb will try to add virtual object from some object which is not present in
        the result
     * to avoid this always add a conditional check in before creating a virtual object
     */
    if (!time) return null;

    time = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })

    return time;
})

exports.Selection = mongoose.model("Selection", SelectionSchema)