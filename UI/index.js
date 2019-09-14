let original = {};
let currentID = 0;

const reqInfo = () => {
  showSpinner('Loading');
  fetch("https://stark-waters-92757.herokuapp.com/",{
  method: 'get',
  headers: {'Content-Type':  'application/json'},
  credentials: 'include'
})
  .then(response => response.json())
  .then(data => {
    if (data !== 'Authentication required') {
      const questions= data.questions;
      original = questions;
      $('.dropdownName').text('Ban Nội Dung');
      questions.sort((a, b) => (a.question_id > b.question_id) ? 1 : -1);
      questions.reverse().forEach((question,i) => {
          $(".question-list").prepend(`
          <div class="question-item" id="${question.question_id}">
            <p class="item-heading">Câu hỏi ${questions.length-i}</p>
            <p class="item-question">${question.cau_hoi}</p>
          </div>`);
          $('#'+question.question_id).click(() => {
            currentID = question.question_id;
            $(".placeholder").hide();
            $(".main").show();
            $(".title").text("Câu hỏi " + String(questions.length-i));
            $("#cau-hoi").val(question.cau_hoi);
            $("#cau-tra-loi").val(question.cau_tra_loi);
            $("#phan-thi").val(question.phan_thi);
            if ($(".create").is(":visible")) {
              $(".create").hide();
            }
            if ($(".discard").is(":visible")) {
              $(".discard").hide();
            }
            $(".edit").show();
            $(".edit").attr("class","button edit deactivated");
            $(".delete").show();
          })
      })
      if ($(".create").is(":visible")) {
        $(".placeholder").hide();
      } else if (!$(".edit").is(":visible")){
        $(".placeholder").show();
      } else {
        $(".edit").attr("class","button edit deactivated");
      }
    } else {
      showSpinner('Redirecting to login');
      window.location.replace('https://thongcam.github.io/entropy-questions/Authentication/index.html')
    }
  }).finally(hideSpinner())
  }

const checkEmpty = () => {
  let ok = true;
  $('textarea').each((index,elem) => {
    if ($('textarea').eq(index).val() === "") {
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

const rerender = () => {
  $(".question-item").remove();
  reqInfo();
}

const clearScr = () => {
  $("textarea").val("");
  $(".main").hide();
  $(".placeholder").show();
}

reqInfo();

$(".toggler").click(() => {
  $(".menu").animate({"left":"0"},200)
  $(".main").animate({width:"70vw","margin-left":"30vw"},200);
  $(".plus").animate({"margin-left":"30vw"},200);
  $(".toggler").text("");
});

$(".back-button").click(() => {
  $(".menu").animate({"left":"-30vw"},200);
  $(".main").animate({'width':'100vw','margin-left':'0'},200);
  $(".plus").animate({"margin-left":"0"},50);
  $(".toggler").text("< CÁC CÂU HỎI");
})

$(".plus").click(() => {
  $(".placeholder").hide();
  $("textarea").val("");
  $(".main").show()
  $(".title").text("Tạo câu hỏi mới");
  $(".discard").show();
  $(".create").show();
  if ($(".delete").is(":visible")) {
    $(".delete").hide();
  }
  if ($(".edit").is(":visible")) {
    $(".edit").hide();
  }
})

$("textarea").on("input", () => {
  if ($(".title").text() === "Tạo câu hỏi mới") {
    $(".create").attr("class","button create activated");
  }
  if ($("#cau-hoi").val() === ""||$("#cau-tra-loi").val() === ""||$("#phan-thi").val() === "") {
    $(".create").attr("class", "button create deactivated");
  }
  if ($(".edit").is(":visible")) {
    $(".edit").attr("class","button edit deactivated");
    const originalItem = original.filter(elem => elem.question_id === currentID)[0];
    $('textarea').each((index,elem) => {
      if ($('textarea').eq(index).val() !== originalItem[Object.keys(originalItem)[index+1]]) {
        $(".edit").attr("class","button edit activated")
      }
    })
    if(!checkEmpty()){
      $(".edit").attr("class","button edit deactivated");
    }
  }
})

$(".create").click(() => {
  if (!checkEmpty()) {
    alert("Còn bỏ trống");
  }
  if ($(".create").css("filter") === "saturate(0.7)") {
    showSpinner('Đang tạo câu hỏi');
    fetch("https://stark-waters-92757.herokuapp.com/add-question", {
      method:"post",
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        cau_hoi: $("#cau-hoi").val(),
        cau_tra_loi: $("#cau-tra-loi").val(),
        phan_thi: $("#phan-thi").val()
      })})
    .then(response => {return response.json()})
    .then(response => {
      $(".question-item").remove();
      $("textarea").val("");
      reqInfo();
      alert(response);
    }).finally(hideSpinner())
  }
})

$(".discard").click(() => {
  clearScr();
})

$(".delete").click(() => {
  showSpinner('Đang xóa câu hỏi');
  fetch("https://stark-waters-92757.herokuapp.com/delete-question/"+currentID,{
    method: 'delete',
    headers: {'Content-Type':  'application/json'},
    credentials: 'include',
  }).then(response => response.json()).then(response => {
    clearScr();
    rerender();
    alert(response);
  }).finally(hideSpinner())
})

$(".edit").click(() => {
  showSpinner('Đang chỉnh sửa câu hỏi');
  if (!checkEmpty()) {
    alert("Còn bỏ trống");
  } else if ($(".edit").css("filter") === "saturate(0.7)") {
    console.log('heyyy');
    fetch("https://stark-waters-92757.herokuapp.com/edit-question/"+currentID, {
      method:"put",
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        cau_hoi: $("#cau-hoi").val(),
        cau_tra_loi: $("#cau-tra-loi").val(),
        phan_thi: $("#phan-thi").val()
      })})
      .then(response => {return response.json()})
      .then(response => {
        rerender();
        alert(response);
      }).finally(hideSpinner())
  }
})

$('.profilepic').click(() => {
  $('.dropdown-content').toggleClass("show")
})

$('body').click((event) => {
  if($(event.target).attr('class') !== 'dropdownName' && $(event.target).attr('class') !== 'profilepic') {
    $('.dropdown').removeClass("show");
  }
})

$('.logout').click(() => {
  var mydate = new Date();
  mydate.setTime(mydate.getTime() - 1);
  document.cookie = "username=; expires=" + mydate.toGMTString();
  showSpinner('Redirecting to login');
  window.location.replace('https://stark-waters-92757.herokuapp.com/auth/logout')
})
