window.addEventListener('load', () => {
  document.querySelectorAll('.nav-block button').forEach((srcElement) => {
    srcElement.addEventListener('click', (eve) => {
      // Hide all the forms at first
      document.querySelectorAll('input[name^="attr_show_view').forEach((ele) => {
        ele.checked = false;
      });

      document.querySelector(`input[name="attr_show_view_${eve.srcElement.dataset['view']}"`).checked = true;
    });
  });

  document.querySelectorAll('input[name=selected_theme_val').forEach((ele) => {
    ele.addEventListener('click', (eve) => {
      if (eve.srcElement.value == 1) {
        document.querySelector('input[name=attr_show_darkly').checked = true;
        document.querySelector('input[name=attr_show_minty').checked = false;
      } else {
        document.querySelector('input[name=attr_show_darkly').checked = false;
        document.querySelector('input[name=attr_show_minty').checked = true;
      }
    });
  });
});
