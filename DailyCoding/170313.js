// includes 사용
function solution(tag) {
  const tagList = document.querySelectorAll(tag);
  let result = 0;

  for (let i = 0, max = tagList.length; i < max; i++) {
    if (tagList[i].className.includes("-") || tagList[i].className.includes("_")) {
      result += 1;
    }
  }

  console.log(result);
}

// 정규표현식 test 사용
function solution(tag) {
  const tagList = document.querySelectorAll(tag);
  let result = 0;

  for (let i = 0, max = tagList.length; i < max; i++) {
    if (/[-_]/g.test(tagList[i].className)) {
      result += 1;
    }
  }

  console.log(result);
}

solution("div");

// 해당 조건에 맞는 ClassName 삭제하기
function solution(tag) {
  const tagList = document.querySelectorAll(tag);

  for (let i = 0, max = tagList.length; i < max; i++) {
    if (/[-_]/g.test(tagList[i].className)) {
      for (let j = 0, maxi = tagList[i].classList.length; j < maxi; j++) {
        if (/[-_]/g.test(tagList[i].classList[j])) {
          tagList[i].classList.remove(tagList[i].classList[j]);
        }
      }
    }
  }
}

solution("div");

// 함수 넘겨주는 버전
function remover(parent, child) {
  parent.classList.remove(child);
}

function solution(tag, remover) {
  const tagList = document.querySelectorAll(tag);

  for (let i = 0, max = tagList.length; i < max; i++) {
    if (/[-_]/g.test(tagList[i].className)) {
      for (let j = 0, maxi = tagList[i].classList.length; j < maxi; j++) {
        if (/[-_]/g.test(tagList[i].classList[j])) {
          remover(tagList[i], tagList[i].classList[j]);
        }
      }
    }
  }
}

solution("div", remover);