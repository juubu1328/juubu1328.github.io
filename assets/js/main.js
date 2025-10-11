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

// 공유하기 버튼 구현
$(document).ready(function () {
  $("#shareBtn").on("click", async function (e) {
    e.preventDefault();

    const shareUrl = window.location.href;
    const shareTitle = document.title;

    // 1️. Web Share API (모바일/신형 브라우저)
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          url: shareUrl,
        });
      } catch (err) {
        console.error("Copy failed: " + err);
      }
    }

    // 2️. Clipboard API (HTTPS 환경 필요)
    else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("링크가 복사되었습니다! 🎉");
      } catch (err) {
        console.error("Copy failed: " + err);
      }
    }

    // 3️. 완전 구형 브라우저 fallback (최신 브라우저에서는 deprecated)
    else {
      const tempInput = $("<input>");
      $("body").append(tempInput);
      tempInput.val(shareUrl).select();
      document.execCommand("copy"); // deprecated !!
      tempInput.remove();
      alert("링크가 복사되었습니다! 🎉");
    }
  });
});
