import mongoose, { Document, Model } from 'mongoose';

export interface IPost extends Document {
    userId: string;
    content: string;
    title: string;
    image: string;
    category: string;
    slug: string;
    claps?: number;
    formatType?: 'standard' | 'poetry' | 'essay' | 'serialized';
    seriesTitle?: string;
    chapterNumber?: number;
    aiSummary?: string;
    aiThemes?: string[];
    createdAt: Date;
    updatedAt: Date;
}

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
    },
    category: {
      type: String,
      default: 'uncategorized',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    claps: {
      type: Number,
      default: 0,
    },
    formatType: {
      type: String,
      enum: ['standard', 'poetry', 'essay', 'serialized'],
      default: 'standard',
    },
    seriesTitle: {
      type: String,
    },
    chapterNumber: {
      type: Number,
    },
    aiSummary: {
      type: String,
    },
    aiThemes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>('Post', postSchema);
export default Post;