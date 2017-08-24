'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './poll.events';

var PollSchema = new mongoose.Schema({
  name: String,
  options: [{name: String, votes: Number}],
  creator: String,
  creatorName: String,
  voters: [String]
});

registerEvents(PollSchema);
export default mongoose.model('Poll', PollSchema);
