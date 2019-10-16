import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
  originalUrl: String,
  urlCode: String,
  shortUrl: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Urls = mongoose.model('UrlShorten', UrlSchema);
