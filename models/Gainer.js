const gainerSchema = new mongoose.Schema({
  start: Date,
  end: Date,
  top: Array,
});

export default mongoose.model("Gainer", gainerSchema);