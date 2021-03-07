function ClickTitle(e) {
  var olstyle = e.nextElementSibling.style
  olstyle.display = olstyle.display == "none" ? "block" : "none"
}
function ClearCheckbox(e) {
  var es = e.parentNode.getElementsByTagName("INPUT");
  for (var idx = 0; es.length > idx; idx++) {
    var i = es[idx]
    if (i.type == "checkbox" && i.checked) {
      i.click();
    }
  }
}
function ClickCheckbox(t, id) {
  localStorage.setItem(id, t.checked)
}
addEventListener("click", function (e) {
  var t = e.target, n = t.tagName;
  if (n == "P") {
    ClickTitle(t);
  } else if (n == "INPUT") {
    var id = t.id
    if (id == "") {
      ClearCheckbox(t);
    } else {
      ClickCheckbox(t, id);
    }
  }
});
addEventListener("DOMContentLoaded", function () {
  const d = document, e_body = d.getElementsByTagName("body")[0]
  fetch("data.json").then(function (res) {
    return res.ok ? res.json() : [];
  }).then(function (json) {
    for (var i of json) {
      var e_ol = d.createElement("ol")
      for (var j of i.data) {
        if (j.id == "hr") {
          e_ol.appendChild(d.createElement("hr"))
          continue
        }
        var e_input = d.createElement("input")
        e_input.setAttribute("type", "checkbox")
        e_input.setAttribute("id", j.id)
        if (localStorage[j.id] == "true") {
          e_input.setAttribute("checked", "checked")
        }
        var e_li = d.createElement("li")
        var e_label = d.createElement("label")
        e_ol.appendChild(e_label)
        e_label.appendChild(e_li)
        e_li.appendChild(e_input)
        e_li.appendChild(d.createTextNode(j.title))
      }
      var e_p = d.createElement("p")
      e_p.appendChild(d.createTextNode(i.text))
      var e_form = d.createElement("form")
      e_form.appendChild(e_p);
      e_form.appendChild(e_ol)
      var e_button = d.createElement("input")
      e_button.type = "button"
      e_button.value = "クリア"
      e_ol.appendChild(e_button)
      e_body.appendChild(e_form);
    }
  });
});