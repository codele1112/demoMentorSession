const $ = document.querySelector.bind(document);
const animalListDiv = $("#animal-list");
const animalAddInput = $("#animal");
const animalAddBtn = $("#add-animal-btn");
const animalAddFilterInput = $("#data-filter");
const animalAddFilterBtn = $("#filter-btn");
const animalFilteredDiv = $("#animal-list-filter");

/**
 * 1.create an abstractived function
 * 2.closure
 * 3.scope
 * 4.De quy
 * 5.closest
 * 6.dataset
 * 7.push()
 * 8.splice()
 * 9.bind()
 */
function Animal() {
  const animalList = [
    {
      name: "Dog",
      age: 1,
    },
    {
      name: "Cat",
      age: 2,
    },
  ];

  const obj = {
    init: function () {
      this.list();
      animalAddInput.addEventListener("keyup", this.inputData.bind(obj));

      animalAddBtn.addEventListener("click", () => {
        const animalName = animalAddInput.value;
        this.askAge(animalName);
      });

      animalListDiv.addEventListener("click", (e) => {
        // closest
        const deleteBtn = e.target.closest(".delete");
        console.log("deleteBtn", deleteBtn);

        if (deleteBtn) {
          // dataset
          const index = deleteBtn.dataset.index;
          console.log("index", index);
          this.delete(index);
        }
      });
      this.initFilter();
    },
    inputData: function (e) {
      console.log("inputData", this);
      if (e.keyCode == 13) {
        const animalName = e.target.value;
        this.askAge(animalName);
      }
    },

    askAge: function (name) {
      const age = prompt(`Please enter ${name} age!`);

      if (age == null) {
        // de quy
        return this.askAge(name);
      }

      const animalTmp = {
        name: name,
        age: age,
      };

      this.add(animalTmp);

      animalAddInput.value = "";
    },
    list: function (overwriteAnimalList = null) {
      animalListDiv.innerHTML = "";
      const renderList = !overwriteAnimalList
        ? animalList
        : overwriteAnimalList;
      renderList.forEach((an, idx) => {
        const animalItem = document.createElement("li");

        animalItem.innerHTML = `
        <div class="animalItem">
        <div>
        <p>Name: ${an.name}</p>
        <p>Age: ${an.age}</p>
        </div>
        <span class="delete" data-index ='${idx}'>x</span>
        </div>`;

        animalListDiv.appendChild(animalItem);
      });
    },
    add: function (animal) {
      animalList.push(animal);
      this.list();
    },
    delete: function (index) {
      animalList.splice(index, 1);
      this.list();
    },
    initFilter: function () {
      animalAddFilterInput.addEventListener(
        "keyup",
        this.inputDataFilter.bind(obj)
      );
      animalAddFilterBtn.addEventListener("click", () => {
        const keyword = animalAddFilterInput.value;
        this.filter(keyword);
      });
    },
    inputDataFilter: function (e) {
      console.log("inputDataFilter", this);
      if (e.keyCode == 13) {
        const key = e.target.value;
        this.filter(key);
      }
    },
    filter: function () {
      const filterAnimalList = animalList.filter((item) => {
        if (
          item.name == animalAddFilterInput.value ||
          item.age == animalAddFilterInput.value
        ) {
          return item;
        }
      });
      this.list(filterAnimalList);
    },
  };
  return obj;
}

const animal = new Animal();
animal.init();
