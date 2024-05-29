// models/Post.js
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,  // Clerk user ID
  }
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
