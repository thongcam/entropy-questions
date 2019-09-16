$('input').val('');

const checkEmpty = () => {
  let ok = true;
  $('input').each((index,elem) => {
    if ($('input').eq(index).val() === "") {
      ok = false;
    }
  })
  return ok;
}

const showSpinner = (text) => {
  $('#spinner').show();
  $('#spinner-backdrop').show();
  $('#spinner-text').text(text);
}

const hideSpinner = () => {
  $('#spinner').hide();
  $('#spinner-backdrop').hide();
}

hideSpinner();

$("input").on("input", () => {
  if(!checkEmpty()){
    $(".login").attr("class","button login deactivated");
  } else {
    $(".login").attr("class","button login activated");
  }
})

$(".login").click(() => {
  if (!checkEmpty()) {
    alert("Còn bỏ trống");
  } else {
    showSpinner('Logging in...');
    fetch("https://stark-waters-92757.herokuapp.com/auth/login", {
      method:"post",
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        username: $("#username").val(),
        password: $("#password").val(),
      })})
    .then(response => response.json())
    .then(data => {
      if (data === 'Failed') {
        hideSpinner();
        $('input').val('');
        $(".login").attr("class","button login deactivated");
        alert('Đăng nhập không thành công.');
      } else {
        window.location.assign('https://thongcam.github.io/entropy-questions/UI/index.html');
      }
    })
    .catch(err => {
      console.log(err);
      $('input').val('');
      $(".login").attr("class","button login deactivated");
      alert('Lỗi đăng nhập')
    })
  }
})
