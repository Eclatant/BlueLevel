// TODO: 동일 작업을 줄여볼 수 있도록 캐싱을 하든, 중복을 없애든 하고,
// TODO: 콜백을 밖으로 빼낼 것

function loadContent() {
  function $(target) {
    return document.querySelector(target);
  }

  const oReq = new XMLHttpRequest();

  function makeView(number) {
    let template = $("#peopleTemplate").innerHTML;
    let peopleData = "";

    data[number].peoplelist.forEach((element) => {
      peopleData += `<ul>${element}</ul>`;
    })
    template = template.replace("{peoplelist}", peopleData);
    template = template.replace("{title}", `${data[number].title}`);
    template = template.replace("{imgurl}", `${data[number].imgurl}`);
    $(".content").innerHTML = template;
  }

  // number에 해당하는 데이터 가져오기
  function changeContent(number) {
    $(".content > .title").remove();
    $(".content > .peoplelist").remove();

    if (data.length === 0) { return; }
    makeView(number)
  }

  function getSelectedNumber(peopleName) {
    for (let i = 0, max = data.length; i < max; i++) {
      if (data[i].title === peopleName) {
        return i;
      }
    }
  }

  oReq.addEventListener("load", (evt) => {
    // TODO: 전역변수를 만들기 좋은 방법인 것인가?
    data = JSON.parse(oReq.responseText);
    const randomNumber = Math.floor(Math.random() * data.length);
    makeView(randomNumber);

    let templateData = "";
    data.forEach((element) => {
      templateData += `<ul>${element.title}</ul>`;
      $("nav > li").innerHTML = templateData;
    })

    // X버튼 클릭시 작동할 코드
    $(".content").addEventListener("click", (evt) => {
      if (evt.target.innerText !== "X") { return; }

      let number = getSelectedNumber(evt.target.parentNode.previousSibling.previousSibling.innerText);

      data.splice(number, 1);
      $(".navList > li").childNodes[number].remove()

      if (number === 0) { number = 0; }
      else if (number === data.length) { number -= 1; }

      changeContent(number);
    })

    // 이름 클릭시 작동할 코드
    $(".navList").addEventListener("click", (evt) => {
      changeContent(getSelectedNumber(evt.target.innerText));
    });

    // 화살표 클릭시 작동할 코드
    $(".arrow").addEventListener("click", (evt) => {
      let number = getSelectedNumber($(".peopleName").innerText);

      if (number === 0 && evt.target.parentNode.parentNode.className === "left") { number = data.length - 1; }
      else if (number === data.length - 1 && evt.target.parentNode.parentNode.className === "right") { number = 0; }
      else if (evt.target.parentNode.parentNode.className === "left") { number -= 1; }
      else if (evt.target.parentNode.parentNode.className === "right") { number += 1; }

      changeContent(number);
    })

    // 전체 대선후보 클릭
    $(".allMember").addEventListener("click", (evt) => {
      data = JSON.parse(oReq.responseText);
      const randomNumber = Math.floor(Math.random() * data.length);
      makeView(randomNumber);

      let templateData = "";
      data.forEach((element) => {
        templateData += `<ul>${element.title}</ul>`;
        $("nav > li").innerHTML = templateData;
      })
    })

    // Captain 클릭
    $(".president").addEventListener("click", (evt) => {
      data = JSON.parse(oReq.responseText);
      $(".content > .title").remove();
      $(".content > .peoplelist").remove();

      const memberList = document.querySelectorAll("nav > li > ul")
      for (let i = 0, max = memberList.length; i < max; i++) {
        memberList[i].remove();
      }

      const ryusNumber = getSelectedNumber("유시민"); // 의도적 하드코딩;
      makeView(ryusNumber)

      let templateData = "";
      templateData += `<ul>${data[ryusNumber].title}</ul>`;
      $("nav > li").innerHTML = templateData;
      // TODO: 화살표도 작동하지 못하도록 수정 필요
    })
  });
  oReq.open("GET", "peoplelist.json"); // 요청 설정
  oReq.send(); // 서버에게 요청하는 순간
}

document.addEventListener("DOMContentLoaded", () => {
  loadContent();
});

// -----------------------------------------------------------------

// var source = $("#peopleTemplate").innerHTML;;
// var template = Handlebars.compile(source);
// Handlebars.registerHelper('title', (title) => {
//   return `${data[randomNumber].title}`;
// });
// Handlebars.registerHelper('imgurl', (imgurl) => {
//   return `${data[randomNumber].imgurl}`;
// });
// Handlebars.registerHelper('peopleList', (peopleData) => {
//   return `${peopleData}`;
// });
// var html = template(data);
// [].forEach.call($(".navList > li").childNodes, (v, i, o) => {
//   console.log(o);
//   [].slice.call(o).splice(i, 1);
// })

// let mainTemplate = $("#peopleTemplate").innerText;
// const template = Handlebars.compile(mainTemplate);
//
// Handlebars.registerHelper("title", () => {
//     return data.title;
// });
//
// Handlebars.registerHelper("imgurl", () => {
//     return data.imgurl;
// });
//
// Handlebars.registerHelper("peoplelist", () => {
//     return data.peoplelist;
// });
//
// mainTemplate = template(data);
// console.log(mainTemplate);

// let template = $("#peopleTemplate").innerHTML;
// let peopleData = ""
// data[ryusNumber].peoplelist.forEach((element) => {
//   peopleData += `<ul>${element}</ul>`;
// })
//
// template = template.replace("{peoplelist}", peopleData);
// template = template.replace("{title}", `${data[ryusNumber].title}`);
// template = template.replace("{imgurl}", `${data[ryusNumber].imgurl}`);
// $(".content").innerHTML = template;
