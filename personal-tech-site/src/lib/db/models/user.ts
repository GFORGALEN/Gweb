// src/lib/db/models/user.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  emailVerified: Date,
  image: String,
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', userSchema);

// src/lib/db/models/english-learning-session.ts
import mongoose from 'mongoose';

const englishLearningSessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  analysis: { type: mongoose.Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const EnglishLearningSession = mongoose.models.EnglishLearningSession || 
  mongoose.model('EnglishLearningSession', englishLearningSessionSchema);

// src/lib/db/models/english-vocabulary.ts
import mongoose from 'mongoose';

const englishVocabularySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  word: { type: String, required: true },
  definition: { type: String, required: true },
  example: String,
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

export const EnglishVocabulary = mongoose.models.EnglishVocabulary || 
  mongoose.model('EnglishVocabulary', englishVocabularySchema);

// src/lib/db/models/index.ts
export * from './user';
export * from './english-learning-session';
export * from './english-vocabulary';