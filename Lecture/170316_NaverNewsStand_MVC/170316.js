// 개인적으로 MVC보다 MTV를 선호하므로 MTV로 설계 (https://goo.gl/YcRj9E)
// MVC : MTV
// Model : Model
// View : Template
// Controller : View

// 재미를 위해 뉴스를 대선후보로 변경해서 코딩
// 요구사항은 아래와 같음.
// 1. HTML,CSS를 만들기.
// 2. 화면이 로딩될때 데이터를 가져와서 좌측에 리스트를 나열하고, 우측에 첫번째 언론사의 기사를 노출한다.
// 3. 주요언론사,종합/경제,방송/통신이 있는 좌측영역을 마우스 선택하면 본문이 변경된다.
// (ajax로 json데이터를 받아서 처리되야 함. json 형태는 제공된 .json참고)
// 선택된 좌측메뉴는 하이라이트 된다.
// 4. 우측 상단에 '<', '>' 버튼을 마우스로 선택하면 다른 언론사 뉴스가 노출되야 하고, 동시에 1/25 내용이 2/25로 번호가 변경돼야 한다.
// 5. 코드의 형태는 자유롭게 사용할 수 있다.
// 6. 한번 가져온 ajax데이터는 일정시간동안 메모리에 저장해서 ajax요청없이 바로 노출하도록 한다.
// 7. (스위치) 화면에 추가할때는 handlebar 라이브러리를 사용한다.
// 8. x버튼을 누르면 해당 뉴스리스트가 삭제된다.

// 해결하지 못한 요구사항
// 1. HTML,CSS를 만들기. => 샘플로 제공받은 코드를 그대로 사용
// 7. (스위치) 화면에 추가할때는 handlebar 라이브러리를 사용한다. => 적용하는 방법을 잘 모르겠음

// 지시사항
// 코드를 객체지향을 활용해보라
// -> 학습을 위해 View를 3등분하여 코딩해보라 (+ MVC패턴 사용)
// -> MVC를 하나의 객체가 아닌 각기 다른 객체로 나누어보라
// -> innerHTML은 덮어쓰기된다

const env = {
  jsonUrl : "peoplelist170316.json",
  // 유시민은 대선 후보가 아니지만, 좋으니까 특별출연
  president : "유시민"
};

function Model() { this.data = []; }
function Template() {}
function View(model, template) {
  this.model = model;
  this.template = template;
}

document.addEventListener("DOMContentLoaded", () => {
  const model = Object.create(Model);
  const template = Object.create(Template);
  const view = new View(model, template);
  view.eventListen(); // 이벤트 리스닝 설정
  oReq.open("GET", env.jsonUrl); // 요청 설정
  oReq.send(); // 서버에게 요청하는 순간
});

function $(target) { return document.querySelector(target); }

const oReq = new XMLHttpRequest();

Model.prototype = {
  // Ajax로 받아온 Data를 Array에 담아주는 메소드
  ajaxToData: function(inputData) {
    this.data = inputData;
  },
  // Array에 담겨있는 데이터중 특정 인덱스 데이터 삭제
  deleteData: function(number) {
    this.data.splice(number, 1);
  },
  // 데이터중에서 이름 속성만 모아서 리턴
  returnNameList: function() {
    acc = [];
    this.data.forEach((v, i, o) => {
      acc.push(v.name);
    })
    return acc;
  },
  // 전체 또는 한 명의 데이터만 리턴
  returnPeopleData: function(req) {
    if (req === "all") { return this.data; }
    else { return this.data[req]; }
  },
  // 현재 Array에 담긴 데이터 개수를 리턴
  returnDataLength: function() {
    return this.data.length;
  }
}

Template.prototype = {
  // 상단 우측 상태표시를 위한 템플릿
  firstTemplate: {
    // Length와 Index간의 차이값(1) 보정
    draw: (number, length) => {
      $(".status").innerHTML = `${number + 1} / ${length}`;
    }
  },
  // 좌측의 후보 명단과 관련한 템플릿
  secondTemplate: {
    draw: (data) => {
      let nameList = "";
      data.forEach((element) => {
        nameList += `<li>${element}</li>`;
      })
      $("nav > ul").innerHTML = nameList;
    },
    erase: (number) => {
      $(".navList > ul").childNodes[number].remove()
    },
    // 후보 이름에 녹색 글씨 효과
    highlight: (number) => {
      const highlightedNode = $(".highlight");
      if (highlightedNode !== null) { highlightedNode.classList.remove("highlight"); }
      $(".navList > ul").childNodes[number].classList.add("highlight");
    }
  },
  // 우측의 후보 정보를 보여주는 템플릿
  thirdTemplate: {
    draw: (data) => {
      let readyMadeTemplate = $("#peopleTemplate").innerHTML;
      let peopleData = "";

      data.peoplelist.forEach((element) => {
        peopleData += `<li>${element}</li>`;
      })

      readyMadeTemplate = readyMadeTemplate.replace("{peoplelist}", peopleData).replace("{name}", `${data.name}`).replace("{imgurl}", `${data.imgurl}`);
      $(".content").innerHTML = readyMadeTemplate;
    },
    erase: () => {
      $(".content .peopleName").remove();
      $(".content > .peoplelist").remove();
    }
  }
}

View.prototype = {
  // 전체대선후보 클릭시 발동할 메소드
  showAllMembers: function() {
    const modelCache = this.model.prototype;
    const templateCache = this.template.prototype;

    let currentDataLength = modelCache.returnDataLength();

    // 기존에 담겨있는 데이터를 모두 지우는 과정
    while (currentDataLength > 0) {
      modelCache.deleteData(0);
      currentDataLength -= 1;
    }
    const jsonData = JSON.parse(oReq.responseText);
    modelCache.ajaxToData(jsonData);

    const nameList = modelCache.returnNameList();
    const allData = modelCache.returnPeopleData("all");
    const dataLength = modelCache.returnDataLength();
    const randomNumber = Math.floor(Math.random() * dataLength);

    templateCache.secondTemplate.draw(nameList);
    templateCache.thirdTemplate.draw(allData[randomNumber]);
    templateCache.secondTemplate.highlight(randomNumber);
    templateCache.firstTemplate.draw(randomNumber, dataLength);
  },
  // "Oh! My Captain!" 클릭시 유시민만 보여지도록 하는 메소드
  showPresident: function() {
    const modelCache = this.model.prototype;
    const templateCache = this.template.prototype;
    const max = document.querySelectorAll(".navList > ul > li").length;

    if (max === 0) { return; }

    const dataLength = modelCache.returnDataLength();
    const allData = modelCache.returnPeopleData("all");

    for (let i = 0, j = 0; i < dataLength; i++) {
      if (allData[j].name !== env.president) {
        modelCache.deleteData(j);
        // Array 삭제시 index 차이 보정
        j -= 1;
      }
      j += 1;
    }

    const nameList = modelCache.returnNameList();

    const arr = [];
    arr.push(nameList);
    templateCache.secondTemplate.draw(arr);

    const presidentNumber = this.getSelectedNumber(env.president);
    const presidentData = modelCache.returnPeopleData(presidentNumber)
    templateCache.secondTemplate.highlight(presidentNumber);
    templateCache.thirdTemplate.draw(presidentData);
    templateCache.firstTemplate.draw(presidentNumber, modelCache.returnDataLength());
  },
  // 현재 후보가 데이터에서 몇 번째 후보인지 알려주는 메소드
  getSelectedNumber: function (peopleName) {
    const modelCache = this.model.prototype;
    const allData = modelCache.returnPeopleData("all");
    for (let i = 0, max = allData.length; i < max; i++) {
      if (allData[i].name === peopleName) { return i; }
    }
  },
  // 화살표 클릭시 앞 또는 뒤로 화면을 변경해주는 메소드
  arrowSlide: function(evt) {
    const modelCache = this.model.prototype;
    const templateCache = this.template.prototype;

    let number = this.getSelectedNumber($(".peopleName").innerText);

    if (document.querySelectorAll(".navList > ul > ul").length === 1) { return; }
    else if (number === 0 && evt.target.parentNode.parentNode.className === "left") { number = modelCache.returnDataLength() - 1; }
    else if (number === modelCache.returnDataLength() - 1 && evt.target.parentNode.parentNode.className === "right") { number = 0; }
    else if (evt.target.parentNode.parentNode.className === "left") { number -= 1; }
    else if (evt.target.parentNode.parentNode.className === "right") { number += 1; }

    templateCache.thirdTemplate.draw(modelCache.returnPeopleData(number));
    templateCache.secondTemplate.highlight(number);
    templateCache.firstTemplate.draw(number, modelCache.returnDataLength());
  },
  // X버튼 클릭시 해당 후보가 사라지는 메소드
  XButton: function(evt) {
    const modelCache = this.model.prototype;
    const templateCache = this.template.prototype;

    if (evt.target.innerText !== "X") { return; }

    let number = this.getSelectedNumber($(".peopleName").innerText);
    modelCache.deleteData(number);
    templateCache.secondTemplate.erase(number);

    if (document.querySelector("nav > ul").innerText === "") {
      templateCache.thirdTemplate.erase(); return;
    }

    if (number === 0) { number = 0; }
    else if (number === modelCache.returnDataLength()) { number -= 1; }

    const selectedPeopleData = modelCache.returnPeopleData(number);
    templateCache.thirdTemplate.draw(selectedPeopleData);
    templateCache.secondTemplate.highlight(number);
    templateCache.firstTemplate.draw(number, modelCache.returnDataLength());
  },
  // 이름 선택시 해당 후보를 보여주는 메소드
  nameSelect: function(evt) {
    const modelCache = this.model.prototype;
    const templateCache = this.template.prototype;
    const number = this.getSelectedNumber(evt.target.innerText);

    templateCache.thirdTemplate.draw(modelCache.returnPeopleData(number));
    templateCache.secondTemplate.highlight(number);
    templateCache.firstTemplate.draw(number, modelCache.returnDataLength());
  },
  // 이벤트 리스닝용 메소드
  eventListen: function() {
    // 전체 대선후보 클릭
    $(".allMember").addEventListener("click", this.showAllMembers.bind(this));
    // Captain 클릭
    $(".president").addEventListener("click", this.showPresident.bind(this));
    // 화살표 클릭시 작동할 코드
    $(".arrow").addEventListener("click", (evt) => this.arrowSlide(evt));
    // X버튼 클릭시 작동할 코드
    $(".content").addEventListener("click", (evt) => this.XButton(evt));
    // 이름 클릭시 작동할 코드
    $(".navList").addEventListener("click", (evt) => this.nameSelect(evt));

    // Ajax 통신완료 후 작동할 초기화 메소드
    oReq.addEventListener("load", (evt) => {
      const modelCache = this.model.prototype;
      const templateCache = this.template.prototype;
      const jsonData = JSON.parse(oReq.responseText);

      this.model.prototype.ajaxToData(jsonData);
      const randomNumber = Math.floor(Math.random() * modelCache.returnDataLength());

      templateCache.secondTemplate.draw(modelCache.returnNameList());
      templateCache.thirdTemplate.draw(modelCache.returnPeopleData(randomNumber));
      templateCache.secondTemplate.highlight(randomNumber);
      templateCache.firstTemplate.draw(randomNumber, modelCache.returnDataLength());
    })
  }
}
