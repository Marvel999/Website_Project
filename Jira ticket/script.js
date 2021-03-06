let addBtn = document.querySelector(".add");
let body = document.querySelector("body");

let grid = document.querySelector(".grid");

let colors = ["pink", "blue", "green", "black"];

addBtn.addEventListener("click", function () {
  let preModal = document.querySelector(".modal");

  if (preModal != null) return;

  let div = document.createElement("div"); //<div></div>

  div.classList.add("modal"); //<div class="modal"></div>

  div.innerHTML = ` <div class="task-section">
  <div class="task-inner-container" contenteditable="true"></div>
</div>
<div class="modal-priority-section">
  <div class="priority-inner-container">
    <div class="modal-priority pink"></div>
    <div class="modal-priority blue"></div>
    <div class="modal-priority green"></div>
    <div class="modal-priority black selected"></div>
  </div>
</div>`;

  let ticketColor = "black";

  let allModalPriority = div.querySelectorAll(".modal-priority");
  for (let i = 0; i < allModalPriority.length; i++) {
    allModalPriority[i].addEventListener("click", function (e) {
      for (let j = 0; j < allModalPriority.length; j++) {
        allModalPriority[j].classList.remove("selected");
      }

      e.currentTarget.classList.add("selected");

      ticketColor = e.currentTarget.classList[1];
    });
  }

  let taskInnerContainer = div.querySelector(".task-inner-container");

  taskInnerContainer.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
      let ticketDiv = document.createElement("div");
      ticketDiv.classList.add("ticket");

      ticketDiv.innerHTML = ` <div class="ticket-color ${ticketColor}"></div>
        <div class="ticket-id">
          #aeD34
        </div>
        <div class="actual-task">
          ${e.currentTarget.innerText}
        </div>`;

      let ticketColorDiv = ticketDiv.querySelector(".ticket-color");
      ticketDiv.addEventListener("dblclick",function(){
        ticketDiv.remove();
      })
     
      ticketColorDiv.addEventListener("click", function (e) {
        // let colors = ["pink", "blue", "green", "black"];

        let currColor = e.currentTarget.classList[1]; //green

        let index = -1;
        for (let i = 0; i < colors.length; i++) {
          if (colors[i] == currColor) index = i;
        }

        index++;
        index = index % 4;

        let newColor = colors[index];

        ticketColorDiv.classList.remove(currColor);
        ticketColorDiv.classList.add(newColor);
      });

      grid.append(ticketDiv);
      
      div.remove();
    } else if(e.key === "Escape"){
        div.remove()
    }
  });

  body.append(div);
});