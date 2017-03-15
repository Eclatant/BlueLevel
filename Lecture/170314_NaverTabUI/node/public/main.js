function loadContent() {
  const oReq = new XMLHttpRequest();

  function makeView(number) {
    let template = document.querySelector("#peopleTemplate").innerHTML;
    let peopleData = "";

    data[number].peoplelist.forEach((element) => {
      peopleData += `<ul>${element}</ul>`;
    })
    template = template.replace("{peopleList}", peopleData);
    template = template.replace("{title}", `${data[number].title}`);
    template = template.replace("{imgurl}", `${data[number].imgurl}`);
    document.querySelector(".content").innerHTML = template;

    if (document.querySelectorAll("nav > li > ul").length === 0) {
      let templateData = "";
      data.forEach((element) => {
        templateData += `<ul>${element.title}</ul>`;
      })
      document.querySelector("nav > li").innerHTML = templateData;
    }
  }

  oReq.addEventListener("load", (evt) => {
    // TODO: 전역변수를 만들기 좋은 방법인 것인가?
    data = JSON.parse(oReq.responseText);
    const randomNumber = Math.floor(Math.random() * data.length);
    makeView(randomNumber);

    // X버튼 클릭시 작동할 코드
    document.querySelector(".content").addEventListener("click", (evt) => {
      if (evt.target.innerText !== "X") { return; }

      let number = getSelectedNumber(evt.target.parentNode.previousSibling.previousSibling.innerText);

      data.splice(number, 1);
      document.querySelector(".navList > li").childNodes[number].remove()

      if (number === 0) { number = 0; }
      else if (number === data.length) { number -= 1; }

      changeContent(number);
    })
  });

  oReq.open("GET", "peoplelist.json"); // 요청 설정
  oReq.send(); // 서버에게 요청하는 순간

  // number에 해당하는 데이터 가져오기
  function changeContent(number) {
    document.querySelector(".content > .title").remove();
    document.querySelector(".content > .peopleList").remove();

    if (data.length === 0) { return; }
    makeView(number)
  }

  // 이름 클릭시 작동할 코드
  document.querySelector(".navList").addEventListener("click", (evt) => {
    changeContent(getSelectedNumber(evt.target.innerText));
  });

  function getSelectedNumber(peopleName) {
    for (let i = 0, max = data.length; i < max; i++) {
      if (data[i].title === peopleName) {
        return i;
      }
    }
  }

  // 화살표 클릭시 작동할 코드
  document.querySelector(".arrow").addEventListener("click", (evt) => {
    let number = getSelectedNumber(document.querySelector(".peopleName").innerText);

    if (number === 0 && evt.target.parentNode.parentNode.className === "left") { number = data.length - 1; }
    else if (number === data.length - 1 && evt.target.parentNode.parentNode.className === "right") { number = 0; }
    else if (evt.target.parentNode.parentNode.className === "left") { number -= 1; }
    else if (evt.target.parentNode.parentNode.className === "right") { number += 1; }

    changeContent(number);
  })

  document.querySelector(".allMember").addEventListener("click", (evt) => {
    data = JSON.parse(oReq.responseText);
    const randomNumber = Math.floor(Math.random() * data.length);
    makeView(randomNumber);
  })

  document.querySelector(".president").addEventListener("click", (evt) => {
    data = JSON.parse(oReq.responseText);
    document.querySelector(".content > .title").remove();
    document.querySelector(".content > .peopleList").remove();
    for (let i = 0, max = document.querySelectorAll("nav > li > ul").length; i < max; i++) {
      document.querySelector(".navList > li").removeChild(i);
    }
    // document.querySelector(".navList > li").removeChild()

    makeView(getSelectedNumber("유시민")); // 의도적 하드코딩
  })
}

document.addEventListener("DOMContentLoaded", () => {
  loadContent();
});

// -----------------------------------------------------------------

// var source = document.querySelector("#peopleTemplate").innerHTML;;
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
// [].forEach.call(document.querySelector(".navList > li").childNodes, (v, i, o) => {
//   console.log(o);
//   [].slice.call(o).splice(i, 1);
// })
