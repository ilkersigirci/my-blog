(function () {
  "use strict";

  const IDS = {
    searchButton: "dock-search",
    backButton: "dock-back",
    tocButton: "dock-toc",
    tocDivider: "dock-toc-divider",
    centerToggle: "toc-center-toggle",
    sideIndicator: "toc-side-indicator",
  };

  const BOUND_FLAG = "dockTocBound";

  function hasTOC() {
    return Boolean(document.querySelector("#toc-container nav#TableOfContents a"));
  }

  function ensureClass(className, requiredClass) {
    return className.includes(requiredClass)
      ? className
      : `${className} ${requiredClass}`.trim();
  }

  function getLabel() {
    return (
      document.querySelector("#toc-side-dropdown .font-bold span")?.textContent?.trim() ||
      document.getElementById("toc-center-title")?.textContent?.trim() ||
      "Table of contents"
    );
  }

  function cleanupInjectedElements() {
    document.getElementById(IDS.tocButton)?.remove();
    document.getElementById(IDS.tocDivider)?.remove();
  }

  function closeSearch() {
    const detail = { origin: "dock-toc", handled: false };
    document.dispatchEvent(new CustomEvent("search:close", { detail }));
    if (!detail.handled) window.Search?.hide?.();
  }

  function toggleTOC() {
    const centerToggle = document.getElementById("toc-center-toggle");
    if (centerToggle) {
      centerToggle.click();
      return;
    }

    const sideIndicator = document.getElementById(IDS.sideIndicator);
    if (sideIndicator) {
      sideIndicator.click();
      return;
    }

    window.TOC?.toggle?.();
  }

  function bindButton(button) {
    if (!button || button.dataset[BOUND_FLAG] === "1") return;
    button.dataset[BOUND_FLAG] = "1";
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      closeSearch();
      toggleTOC();
    });
  }

  function createButton(searchButton) {
    const templateButton = document.getElementById(IDS.backButton) || searchButton;
    const button = document.createElement("button");
    button.id = IDS.tocButton;
    button.type = "button";
    button.className = ensureClass(templateButton.className, "md:hidden");
    button.innerHTML =
      '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"></path></svg><span class="hidden sm:inline"></span>';
    return button;
  }

  function createDivider(searchButton) {
    const templateDivider =
      searchButton.previousElementSibling &&
      searchButton.previousElementSibling.tagName === "DIV" &&
      searchButton.previousElementSibling.classList.contains("h-6")
        ? searchButton.previousElementSibling
        : null;

    const divider = document.createElement("div");
    divider.id = IDS.tocDivider;
    divider.className = ensureClass(
      templateDivider?.className || "bg-border mx-2 h-6 w-px",
      "md:hidden",
    );
    return divider;
  }

  function syncLabel(button) {
    const label = getLabel();
    button.title = label;
    button.setAttribute("aria-label", label);
    const text = button.querySelector("span");
    if (text) text.textContent = label;
  }

  function mountButton() {
    const searchButton = document.getElementById(IDS.searchButton);
    const parent = searchButton?.parentElement;
    if (!searchButton || !parent) return;

    if (!hasTOC()) {
      cleanupInjectedElements();
      return;
    }

    let button = document.getElementById(IDS.tocButton);
    if (!button) {
      button = createButton(searchButton);
      parent.insertBefore(button, searchButton);
      parent.insertBefore(createDivider(searchButton), searchButton);
    }

    syncLabel(button);
    bindButton(button);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountButton);
  } else {
    mountButton();
  }

  document.addEventListener("pjax:complete", mountButton);
})();
