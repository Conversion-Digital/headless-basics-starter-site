var element = document.getElementById("site-key-holder")
element.setAttribute("data-script-file-loaded", "true")

if (!isCaptchaLoaded) {
  var isCaptchaLoaded = {}
}
var onloadCallback = function () {
  loadCaptcha()
}
function loadCaptcha() {
  const ataCaptchas = document.getElementsByClassName("g-recaptcha")
  if (!ataCaptchas || ataCaptchas.length === 0) {
    return
  }
  for (let i = 0; i < ataCaptchas.length; i++) {
    const ataCaptcha = ataCaptchas[i]
    if (isCaptchaLoaded[ataCaptcha.id]) {
      continue
    }
    try {
      if (
        ataCaptcha &&
        grecaptcha &&
        grecaptcha !== "undefined" &&
        typeof grecaptcha.render === "function"
      ) {
        let siteKey = ataCaptcha.getAttribute("data-sitekey")
        const siteKeyHolder = document.getElementById("site-key-holder")
        if (!siteKey) {
          siteKey = siteKeyHolder.getAttribute("data-value")
        }
        if (siteKey) {
          grecaptcha.render(ataCaptcha, {
            sitekey: siteKey,
          })
          isCaptchaLoaded[ataCaptcha.id] = true
        }
      }
    } catch (error) {
      console.error(error)
      isCaptchaLoaded[ataCaptcha.id] = false
    }
  }
}

function updateTimestamp(node) {
  if (!node || !(node instanceof Element)) {
    console.error("Invalid node provided");
    return;
  }
  var response = node.querySelector("#g-recaptcha-response")
  var settingsElement = node?.closest("form")?.querySelector("input[name='captcha_settings']")
  if (settingsElement && settingsElement.value) {
    if (response == null || response.value.trim() == "") {
      var elems = JSON.parse(settingsElement.value)
      elems["ts"] = JSON.stringify(new Date().getTime())
      settingsElement.value = JSON.stringify(elems)
      setTimeout(() => updateTimestamp(node), 500)
    } else {
      setTimeout(() => updateTimestamp(node), 500)
    }
  }
}

function timestamp() {
  loadCaptcha()

  const ataCaptchas = document.getElementsByClassName("g-recaptcha")
  if (!ataCaptchas || ataCaptchas.length === 0) {
    setTimeout(timestamp, 500)
    return
  }
  for (let i = 0; i < ataCaptchas.length; i++) {
    const ataCaptcha = ataCaptchas[i]
    updateTimestamp(ataCaptcha)
  }
}
setTimeout(timestamp, 500)
