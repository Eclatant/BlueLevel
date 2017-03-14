function loadContent() {
  const oReq = new XMLHttpRequest();

  function makeView(data) {
    let templateData = "";

    data.forEach((element) => {
      templateData += `<ul>${element.title}</ul>`;
    })
    document.querySelector("nav > li").innerHTML = templateData;

    let template = document.querySelector("#peopleTemplate").innerHTML;

    randomNumber = Math.floor(Math.random() * data.length);

    template = template.replace("{title}", `${data[randomNumber].title}`);
    template = template.replace("{imgurl}", `${data[randomNumber].imgurl}`);

    let peopleData = "";
    for (value of data[randomNumber].peoplelist) {
      peopleData += `<ul>${value}</ul>`;
    }
    template = template.replace("{peopleList}", peopleData);

    document.querySelector(".content").innerHTML = template;
  }

  oReq.addEventListener("load", (evt) => {
    // TODO: 전역변수를 만들기 좋은 방법인 것인가?
    data = JSON.parse(oReq.responseText);

    let templateData = "";

    data.forEach((element) => {
      templateData += `<ul>${element.title}</ul>`;
    })
    document.querySelector("nav > li").innerHTML = templateData;


    let template = document.querySelector("#peopleTemplate").innerHTML;

    // var source = document.querySelector("#peopleTemplate").innerHTML;;
    // var template = Handlebars.compile(source);

    randomNumber = Math.floor(Math.random() * data.length);

    template = template.replace("{title}", `${data[randomNumber].title}`);
    template = template.replace("{imgurl}", `${data[randomNumber].imgurl}`);

    // Handlebars.registerHelper('title', (title) => {
    //   return `${data[randomNumber].title}`;
    // });

    // Handlebars.registerHelper('imgurl', (imgurl) => {
    //   return `${data[randomNumber].imgurl}`;
    // });

    let peopleData = "";
    for (value of data[randomNumber].peoplelist) {
      peopleData += `<ul>${value}</ul>`;
    }
    template = template.replace("{peopleList}", peopleData);

    // Handlebars.registerHelper('peopleList', (peopleData) => {
    //   return `${peopleData}`;
    // });
    // var html = template(data);

    document.querySelector(".content").innerHTML = template;

    // X버튼 클릭시 작동할 코드
    document.querySelector(".content").addEventListener("click", (evt) => {
      if (evt.target.innerText !== "X") { return; }

      let num = getSelectedNumber(evt.target.parentNode.previousSibling.previousSibling.innerText);

      data.splice(num, 1);
      document.querySelector(".navList > li").childNodes[num].remove()

      if (num === 0) { num = 0; }
      else if (num === data.length) { num -= 1; }

      getContent(num);
    })
  });

  oReq.open("GET", "peoplelist.json"); // 요청 설정
  oReq.send(); // 서버에게 요청하는 순간

  // number에 해당하는 데이터 가져오기
  function getContent(number) {
    if (data.length === 0) {
      document.querySelector(".content > .title").remove();
      document.querySelector(".content > .peopleList").remove();
      return;
    }

    let template = document.querySelector("#peopleTemplate").innerHTML;

    document.querySelector(".content > .title").remove();
    document.querySelector(".content > .peopleList").remove();

    template = template.replace("{title}", `${data[number].title}`);
    template = template.replace("{imgurl}", `${data[number].imgurl}`);

    let peopleData = "";

    data[number].peoplelist.forEach((element) => {
      peopleData += `<ul>${element}</ul>`;
    })
    template = template.replace("{peopleList}", peopleData);

    document.querySelector(".content").innerHTML = template;
  }

  // 이름 클릭시 작동할 코드
  document.querySelector(".navList").addEventListener("click", (evt) => {
    getContent(getSelectedNumber(evt.target.innerText));
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
    let num = getSelectedNumber(document.querySelector(".peopleName").innerText);

    if (num === 0 && evt.target.parentNode.parentNode.className === "left") { num = data.length - 1; }
    else if (num === data.length - 1 && evt.target.parentNode.parentNode.className === "right") { num = 0; }
    else if (evt.target.parentNode.parentNode.className === "left") { num -= 1; }
    else if (evt.target.parentNode.parentNode.className === "right") { num += 1; }

    getContent(num);
  })

  document.querySelector(".allMember").addEventListener("click", (evt) => {
    // TODO: 전역변수를 만들기 좋은 방법인 것인가?
    data = JSON.parse(oReq.responseText);

    makeView(data);
  })
}

document.addEventListener("DOMContentLoaded", () => {
  loadContent();
});
