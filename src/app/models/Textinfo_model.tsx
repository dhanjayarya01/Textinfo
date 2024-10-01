import mongoose, { Document, Schema } from 'mongoose';

interface ITextSubmission extends Document {
    text: string;
    createdAt: Date;
}

const TextSubmissionSchema: Schema = new Schema(
    {
        text: {
            type: String,
            required: true,
        },
        // createdAt: {
        //     type: Date,
        //     default: Date.now,
        // },
    },
    {
        timestamps: true, 
    }
);

const TextSubmission = mongoose.models.TextSubmission || mongoose.model<ITextSubmission>('TextSubmission', TextSubmissionSchema);

export default TextSubmission;
