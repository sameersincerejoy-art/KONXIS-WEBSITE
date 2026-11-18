/* Konxis Engineering — minimal site behaviour */
(function () {
  "use strict";

  // Header: subtle opacity change on scroll
  var header = document.querySelector(".header");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Mobile navigation
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  var header = document.querySelector(".header");
  if (toggle && nav) {
    // Expand/collapse
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close on Escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        if (toggle) toggle.focus();
      }
    });
    // Close on outside click
    document.addEventListener("click", function (e) {
      if (e.target === toggle || e.target.closest(".nav-toggle")) return;
      if (nav.classList.contains("is-open") && e.target !== nav && !e.target.closest(".nav")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    // Set initial aria-controls
    toggle.setAttribute("aria-controls", "primary-nav");
    nav.setAttribute("id", "primary-nav");
  }

  // Engineering intake form: validate, then compose an email to Konxis.
  var form = document.getElementById("intake-form");
  if (form) {
    var status = document.getElementById("form-status");
    var EMAIL = "consult@konxis.com";

    var setStatus = function (msg, isError, invalidEl) {
      if (!status) return;
      status.textContent = msg;
      status.style.color = isError ? "#8A5318" : "#285B78";
      if (invalidEl) {
        invalidEl.setAttribute("aria-invalid", "true");
        var described = invalidEl.getAttribute("aria-describedby");
        if (!described) {
          invalidEl.setAttribute("aria-describedby", "form-status");
        }
      }
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Required-field validation
      var missing = [];
      var firstInvalid = null;
      Array.prototype.forEach.call(form.querySelectorAll("[required]"), function (el) {
        el.style.borderColor = "";
        var ok = el.value.trim() !== "";
        if (ok && el.type === "email") {
          ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim());
        }
        if (!ok) {
          el.style.borderColor = "#B7792B";
          if (!firstInvalid) firstInvalid = el;
          missing.push(el.name);
        }
      });

      if (missing.length) {
        setStatus("Please complete: " + missing.join(" · "), true, firstInvalid);
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      // Build the enquiry
      var data = new FormData(form);
      var lines = [];
      var evidence = [];
      data.forEach(function (val, key) {
        if (key === "Evidence") {
          evidence.push(val);
        } else if (typeof val === "string" && val.trim() !== "") {
          lines.push(key + ":\n" + val.trim() + "\n");
        }
      });
      if (evidence.length) {
        lines.push("Evidence already available:\n" + evidence.map(function (v) { return " - " + v; }).join("\n") + "\n");
      }

      var subject = "Engineering enquiry — " + (data.get("Company") || data.get("Name") || "Konxis website");
      var body = lines.join("\n") + "\n---\nSent from the Konxis Engineering contact form";
      var mailto = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

      setStatus("Opening your email client with the enquiry prepared for " + EMAIL + ". If nothing opens, email us directly.", false);
      window.location.href = mailto;
    });
  }

  // Legacy case-study anchors (#case-NN) no longer exist. If an old link
  // lands here, clear the fragment rather than leaving the visitor stranded.
  if (/^#case-\d+$/i.test(window.location.hash)) {
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    window.scrollTo(0, 0);
  }

  // Mark the active nav item from the current page path
  var here = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (here === "") here = "index.html";
  Array.prototype.forEach.call(document.querySelectorAll(".nav a[href]"), function (a) {
    var target = a.getAttribute("href").split("#")[0].toLowerCase();
    if (target === here) {
      a.classList.add("is-active");
      a.setAttribute("aria-current", "page");
    }
  });
})();
