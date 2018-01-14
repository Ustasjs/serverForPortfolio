const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PortfolioSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Укажите наименование работы']
  },
  stack: {
    type: String,
    required: [true, 'Укажите используемые технологии']
  },
  link: {
    type: String,
    required: [true, 'Укажите ссылку на проект']
  },
  description: {
    type: String,
    required: [true, 'Укажите описание проекта']
  },
  path: {
    type: String
  }
});

mongoose.model('work', PortfolioSchema);