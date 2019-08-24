const deleteQuestion = (knex) => (req,res) => {
  knex.select('*').from('cau_hoi').where('question_id','=',Number(req.params.question_id))
  .del()
  .then(res.json('Đã xóa câu hỏi.'))
  .catch(err => {
    res.status(400).json('Không xóa được câu hỏi.')
  })
}

module.exports = {
  deleteQuestion: deleteQuestion
}
