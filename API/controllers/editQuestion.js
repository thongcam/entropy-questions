const editQuestion = (knex) => (req,res) => {
  Object.keys(req.body).forEach(key => {
    if (!req.body[key].trim() || !['cau_tra_loi','cau_hoi','phan_thi'].includes(key)) {
      res.status(400).json('Cập nhật lỗi.')
    }
  })

  knex.select('*').from('cau_hoi').where('question_id','=',Number(req.params.question_id)).then(
    data => {
      if(data[0] != null) {
        knex('cau_hoi').where('question_id','=', Number(req.params.question_id))
          .update(req.body)
          .then(res.json('Chỉnh sửa thành công!'))
          .catch(err => {
            res.status(400).json(err)
          })
      } else {
        res.status(404).json('Câu hỏi không tồn tại.')
      }
    }
  ).catch(err => {
    res.status(400).json('Không tải được câu hỏi.')
  })
}

module.exports = {
  editQuestion: editQuestion
}
