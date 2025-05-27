let suppressAutoCollapse = false;

document.addEventListener("DOMContentLoaded", () => {
  const detailsList = document.querySelectorAll("details");

  detailsList.forEach((detail) => {
    detail.addEventListener("toggle", () => {
      if (suppressAutoCollapse) return;
      if (detail.open) {
        detailsList.forEach((d) => {
          if (d !== detail) d.removeAttribute("open");
        });
      }
    });
  });

  const darkToggle = document.getElementById("toggleDark");
  darkToggle.setAttribute("aria-pressed", "false");

  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    darkToggle.setAttribute("aria-pressed", isDark.toString());
  });

  const tocLinks = document.querySelectorAll(".toc a");
  tocLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl && targetEl.tagName === "DETAILS") {
        e.preventDefault();
        suppressAutoCollapse = true;

        document.querySelectorAll("details").forEach((d) => {
          if (d !== targetEl) d.removeAttribute("open");
        });
        targetEl.setAttribute("open", true);
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => (suppressAutoCollapse = false), 300);
        history.pushState(null, "", `#${targetId}`);
      }
    });
  });
});

function expandAll() {
  suppressAutoCollapse = true;
  document
    .querySelectorAll("details")
    .forEach((d) => d.setAttribute("open", true));
  setTimeout(() => (suppressAutoCollapse = false), 300);
}

function collapseAll() {
  document
    .querySelectorAll("details")
    .forEach((d) => d.removeAttribute("open"));
}

function showTab(tabId) {
  document.querySelectorAll(".tab-content").forEach((tab) => {
    tab.style.display = "none";
  });
  document.querySelectorAll(".tab-buttons button").forEach((btn) => {
    btn.classList.remove("active");
  });

  document.getElementById(tabId).style.display = "block";
  document.getElementById(`tab-${tabId}`).classList.add("active");
}
