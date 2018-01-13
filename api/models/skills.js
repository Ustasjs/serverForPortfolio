const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const SkillsSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Укажите наименование навыка']
  },
  percents: {
    type: String,
    required: [true, 'Укажите уровень владения в процентах']
  },
  type: {
    type: String,
    required: [true, 'Укажите тип навыка.']
  }
});

mongoose.model('skill', SkillsSchema);