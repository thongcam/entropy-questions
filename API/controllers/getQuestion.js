const getQuestion = (knex) => (req,res) => {
  knex.select('*').from('cau_hoi').where('question_id','=',Number(req.params.question_id)).then(
    data => {
      if(data[0] != null) {
        res.send(data[0]);
      } else {
        res.status(404).json('Câu hỏi không tồn tại.')
      }
    }
  ).catch(err => {
    res.status(400).json('Không tải được câu hỏi.')
  })
}

module.exports = {
  getQuestion: getQuestion
}
