// document.querySelectorAll("nav > li > ul")[0]

// console.log(acc);
// return acc;
// const result = this.data.reduce((acc, item, index) => {
//   acc.push(item.name);
//   return acc;
// }, '');
// return result;

// randomDraw: function() {
//   const allData = this.model.returnPeopleData("all");
//   var randomNumber = Math.floor(Math.random() * allData.length;)
//   this.template.thirdTemplate.draw(allData[randomNumber]);
// },
// arr.push(nameList[presidentNumber]);
// const presidentData = modelCache.returnPeopleData(presidentNumber);


// TODO: 동일 작업을 줄여볼 수 있도록 캐싱을 하든, 중복을 없애든 하고,
// TODO: 콜백을 밖으로 빼낼 것

// function loadContent() {
//
//   function makeTemplate(number) {
//
//   }
//
//   // number에 해당하는 데이터 가져오기
//   function changeContent(number) {
//
//     makeTemplate(number)
//   }
//
//     // X버튼 클릭시 작동할 코드
//     $(".content").addEventListener("click", (evt) => {
//
//     })
//
//     // 이름 클릭시 작동할 코드
//     $(".navList").addEventListener("click", (evt) => {
//       changeContent(getSelectedNumber(evt.target.innerText));
//     });
//
//     // 화살표 클릭시 작동할 코드
//     $(".arrow").addEventListener("click", (evt) => {
//       let number = getSelectedNumber($(".peopleName").innerText);
//
//       if (number === 0 && evt.target.parentNode.parentNode.className === "left") { number = data.length - 1; }
//       else if (number === data.length - 1 && evt.target.parentNode.parentNode.className === "right") { number = 0; }
//       else if (evt.target.parentNode.parentNode.className === "left") { number -= 1; }
//       else if (evt.target.parentNode.parentNode.className === "right") { number += 1; }
//
//       changeContent(number);
//     })
//   });
// }

// -----------------------------------------------------------------

// var source = $("#peopleTemplate").innerHTML;;
// var template = Handlebars.compile(source);
// Handlebars.registerHelper('name', (name) => {
//   return `${data[randomNumber].name}`;
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
// Handlebars.registerHelper("name", () => {
//     return data.name;
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
// template = template.replace("{name}", `${data[ryusNumber].name}`);
// template = template.replace("{imgurl}", `${data[ryusNumber].imgurl}`);
// $(".content").innerHTML = template;
