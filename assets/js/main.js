// --- Lenis 등록 ---
const lenis = new Lenis();
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// --- 스크롤 애니메이션 적용 ---
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

const productCards = document.querySelectorAll(".product-card");
productCards.forEach((card) => {
  observer.observe(card);
});

// --- 제품 검색 구현 (jQuery) ---
$(document).ready(function () {
  $("#product-search").on("keyup", function () {
    const value = $(this).val().toLowerCase();
    $(".product-card").filter(function () {
      const productName = $(this).find(".product-name").text().toLowerCase();
      const isVisible = productName.indexOf(value) > -1;
      $(this).toggle(isVisible);
      // toggle 대신 slideToggle을 사용하면 애니메이션 효과가 들어갑니다.
      // FIXME: 이거 slideToggle하면 맛탱이 가니까 수정 좀ㅠㅠㅠㅠㅠ
      // if (isVisible) $(this).slideDown(); else $(this).slideUp();
    });
  });
});

// 공유하기 버튼용 함수
// HTML 코드에서 onclick으로 해당 함수 호출

// https://abangpa1ace.tistory.com/entry/JS-Web공통-링크복사-및-공유버튼-만들기

const openClipboard = () => {
  navigator.clipboard.writeText(window.location.href);
};
