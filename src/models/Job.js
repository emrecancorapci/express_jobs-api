import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Company name cannot be empty.'],
      maxlength: 60,
    },
    position: {
      type: String,
      required: [true, 'Position cannot be empty.'],
      maxlength: 120,
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'User cannot be empty.'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Job', JobSchema);
