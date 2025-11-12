// منع القائمة الافتراضية والكليك اليمين واللمسات المتعددة
document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("mousedown", e => e.button === 2 && e.preventDefault());
document.addEventListener("touchstart", e => e.touches.length > 1 && e.preventDefault());

// ملاحظة: بتتعامل مع عنصر واحد فقط في كل استدعاء
function onElementInOutScreenCenter(element, onEnter, onExit, visibilityRatio = 0.5) {
 let wasVisible = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const isVisible = entry.intersectionRatio >= visibilityRatio;

        if (isVisible && !wasVisible) {
          wasVisible = true;
          onEnter?.(entry.target);
        } else if (!isVisible && wasVisible) {
          wasVisible = false;
          onExit?.(entry.target);
        }
      });
    },
    {
      threshold: Array.from({ length: 101 }, (_, i) => i / 100) // من 0 إلى 1 بـ 0.01
    }
  );

  observer.observe(element);
}


// التعامل مع عناصر البورتفوليو
document.querySelectorAll(".portfolio-item").forEach((item) => {
  const img = item.querySelector("img");
  const staticImage = item.getAttribute("data-static-image");
  const gifImage = item.getAttribute("data-gif");

  // تعيين الصورة الثابتة كبداية
  img.src = staticImage;

  // تغيير الصورة عند الدخول أو الخروج من منتصف الشاشة
  onElementInOutScreenCenter(
    img,
    () => img.src = gifImage,
    () => img.src = staticImage
  );

  // تغييرات الصورة على hover
  img.addEventListener("mouseover", () => img.src = gifImage);
  img.addEventListener("mouseout", () => img.src = staticImage);
});

// النص الذي سيتم كتابته بشكل تدريجي
const text = "Ahmed Topy";
const typingElement = document.getElementById("typing");
let index = 0;

// دالة الكتابة التدريجية للنص
function type() {
  if (index < text.length) {
    typingElement.textContent += text.charAt(index);
    index++;
    setTimeout(type, 150); // سرعة الكتابة
  }
}

// دالة التمرير البطيء مع الأنيميشن
function smoothScrollTo(element, duration) {
  const start = window.pageYOffset; // الموضع الحالي
  const end = element.getBoundingClientRect().top + start - 10; // الموضع المستهدف
  const distance = end - start;
  let startTime = null;

  // التحقق إذا كان قد تم التمرير قبل بدء الأنيميشن
  if (start !== window.pageYOffset) {
    return; // إلغاء الأنيميشن إذا تم التمرير بالفعل
  }

  // دالة الأنيميشن الخاصة بالتمرير
  function animationScroll(currentTime) {
    if (!startTime) startTime = currentTime;

    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1); // نسبة التقدم (0 إلى 1)
    const ease = easeInOutQuad(progress); // دالة تسهيل للحركة

    window.scrollTo(0, start + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(animationScroll); // استمر بالأنيميشن
    }
  }

  // دالة تسهيل (Ease In-Out)
  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  // بدء الأنيميشن
  requestAnimationFrame(animationScroll);
}

// تنفيذ التمرير البطيء بعد تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0, 0); // التمرير إلى أعلى الصفحة عند تحميلها

  const targetElement = document.querySelector(".desc");

  // تأكد من عدم حدوث تمرير قبل بدء الأنيميشن
  setTimeout(() => {
    if (window.pageYOffset === 0) {
      smoothScrollTo(targetElement, 3000); // مدة التمرير 3 ثوانٍ
    }
  }, 2000); // تأخير 2 ثانية قبل بدء التمرير

  // بدء الكتابة التدريجية للنص
  type();
});

// إنشاء دوائر متحركة بشكل عشوائي في الصفحة
document.querySelectorAll(".circle").forEach((circle) => {
  let randomX1 = Math.random() * 100; /* نقطة بداية عشوائية */
  let randomY1 = Math.random() * 100;
  let randomX2 = Math.random() * 100; /* نقطة منتصف عشوائية */
  let randomY2 = Math.random() * 100;
  let randomX3 = Math.random() * 100; /* نقطة نهاية عشوائية */
  let randomY3 = Math.random() * 100;
  let randoms = Math.random() * 2; /* نقطة نهاية عشوائية */

  // تعيين قيم العشوائية لمواقع حركة الدوائر
  circle.style.setProperty("--start-x", randomX1 + "vw");
  circle.style.setProperty("--start-y", randomY1 + "vh");
  circle.style.setProperty("--mid-x", randomX2 + "vw");
  circle.style.setProperty("--mid-y", randomY2 + "vh");
  circle.style.setProperty("--end-x", randomX3 + "vw");
  circle.style.setProperty("--end-y", randomY3 + "vh");
  circle.style.setProperty("--scale", randoms);
});
window.addEventListener('load', () => {
  // استدعاء الحدث بعد تحميل الصفحة بالكامل
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (event) => {
      if (event.button === 2) { // تحقق من أن الزر الذي تم الضغط عليه هو الزر الأيمن
        event.preventDefault(); // منع السلوك الافتراضي (ظهور قائمة السياق)
      }
    });
  });
});
const base = window.location.pathname.includes('portfolio-1.2-topy13.github.io')
    ? '/portfolio-1.2-topy13.github.io/'
    : '/';

  function goToProject(folder) {
    window.location.href = base + 'Projects/' + folder + '/index.html';
  }