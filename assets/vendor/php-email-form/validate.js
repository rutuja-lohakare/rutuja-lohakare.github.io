(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (e) {
    e.addEventListener('submit', function (event) {
      event.preventDefault();

      let thisForm = this;

      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData(thisForm);

      email_form_submit(thisForm, formData);
    });
  });

  function email_form_submit(thisForm, formData) {
    (function () {
      emailjs.init("dES8ue1t0xD_QRrqf")
    })();

    var params = {
      name: document.querySelector("#name").value,
      email: document.querySelector("#email").value,
      subject: document.querySelector("#subject").value,
      message: document.querySelector("#message").value,

    }

    var serviceID = "service_ze46w6j";
    var templateID = "template_megt9pi";

    emailjs.send(serviceID, templateID, params).then(data => {
      thisForm.querySelector('.loading').classList.remove('d-block');
      if (data.text.trim() == 'OK') {
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset();
      } else {
        throw new Error(data ? data : 'Form submission failed');
      }
    }).catch((error) => {
      displayError(thisForm, error);
    });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
