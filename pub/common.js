const publish = {
  init: function () {
    this.include();
  },
  include: function (callback) {
    var allElements = document.getElementsByTagName("*");
    Array.prototype.forEach.call(allElements, function (el) {
      var includePath = el.dataset.includePath;
      if (includePath) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState === 4 && this.status === 200) {
            el.outerHTML = this.responseText;
            callback && callback();
          }
        };
        xhttp.open("GET", includePath, true);
        xhttp.send();
      }
    });
    setTimeout(() => {
      publish.menuOpenToggle();
      if (document.querySelectorAll(".btn_select").length) {
        this.selectToggle();
      }
      if (document.querySelectorAll(".box_file_upload").length) {
        this.fileAdd();
      }
    }, "1000");
  },
  menuOpenToggle: function () {
    const btnMenuToggle = document.querySelector(".btn_ctrl_sidebar");
    const sideBar = document.querySelector(".side_bar");
    if (btnMenuToggle && sideBar) {
      btnMenuToggle.addEventListener("click", (e) => {
        sideBar.classList.toggle("open");
      });
    }
    publish.menuItemActive();
  },
  menuItemActive: function () {
    const menuItems = document.querySelectorAll(".side_bar .menu_item");
    const btnAnchors = document.querySelectorAll(".side_bar .menu_anchor");

    btnAnchors.forEach((btnAnchor, idx) => {
      btnAnchor.addEventListener("click", (e) => {
        menuItems.forEach((item, index) => {
          idx === index ? item.classList.toggle("active") : item.classList.remove("active");
        });
      });
    });
  },
  selectToggle: function () {
    const selectItem = document.querySelectorAll(".btn_select");

    selectItem.forEach((el, idx) => {
      el.addEventListener("click", (e) => {
        const curr = e.currentTarget;
        const doHeight = document.body.scrollHeight;
        const elTop = curr.getBoundingClientRect().top;
        const elHeight = curr.clientHeight;

        selectItem.forEach((item, index) => {
          idx === index ? item.closest(".box_select").classList.add("active") : item.closest(".box_select").classList.remove("active");
        });
        const optionHeight = curr.closest(".box_select").querySelector(".options").clientHeight;

        if (doHeight < elTop + elHeight + optionHeight + 200 || curr.closest(".page_total")) {
          curr.closest(".box_select").classList.add("top");
        } else {
          curr.closest(".box_select").classList.remove("top");
        }

        document.body.addEventListener("click", (elem) => {
          if (elem.target.closest(".box_select") === null && curr.closest(".box_select.active")) {
            curr.parentElement.classList.remove("active");
          }
        });
      });
    });
  },
  fileAdd: function () {
    const uploadBox = document.querySelector(".box_file_upload");
    const inputFiles = document.querySelector("#inputFiles");
    const fileBox = document.querySelector(".box_file_upload .file_list");

    /* 박스 안에 Drag를 하고 있을 때 */
    uploadBox.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    const onFileHandler = (file) => {
      fileBox.innerHTML += `<p>${file}</p>`;
    };

    uploadBox.addEventListener("drop", (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0].name;
      onFileHandler(file);
    });
    inputFiles.addEventListener("change", (e) => {
      const file = e.target.files[0].name;
      onFileHandler(file);
      fileBox.querySelectorAll("p").length ? fileBox.classList.add("upload") : fileBox.classList.remove("upload");
    });
  },
};
window.addEventListener("load", function () {
  publish.init();
});
