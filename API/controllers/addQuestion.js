const addQuestion = (knex) => (req,res) => {
  const checkExist = (elem) => Object.keys(req.body).includes(elem);

  if (Object.keys(req.body).length !== 3) {
    console.log(req.body);
    res.status(400).json(req.body)
  } else {
    ['cau_hoi','cau_tra_loi','phan_thi'].forEach(elem => {
      if (!checkExist(elem)) {
        res.status(400).json('Còn bỏ trống')
      }
    })
  }

  knex('cau_hoi').insert(req.body).then(res.status(200).json('Thêm câu hỏi mới thành công!'))
}

module.exports = {
  addQuestion: addQuestion
}
