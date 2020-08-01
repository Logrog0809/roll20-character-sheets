window.addEventListener('load', () => {
  document.querySelectorAll('.nav-block button').forEach((srcElement) => {
    srcElement.addEventListener('click', (eve) => {
      // Hide all the forms at first
      document.querySelectorAll('input[name^="attr_show-view').forEach((ele) => {
        ele.checked = false;
      });

      document.querySelector(`input[name="attr_show-view-${eve.srcElement.dataset['view']}"`).checked = true;
    });
  });

  document.querySelectorAll('input[name=selected-theme-val').forEach((ele) => {
    ele.addEventListener('click', (eve) => {
      if (eve.srcElement.value == 1) {
        document.querySelector('input[name=attr_show-darkly').checked = true;
        document.querySelector('input[name=attr_show-minty').checked = false;
      } else {
        document.querySelector('input[name=attr_show-darkly').checked = false;
        document.querySelector('input[name=attr_show-minty').checked = true;
      }
    });
  });

  document.querySelectorAll('span[name^=attr_auto-]').forEach((ele) => {
    ele.innerHTML = 2;
  });
});
