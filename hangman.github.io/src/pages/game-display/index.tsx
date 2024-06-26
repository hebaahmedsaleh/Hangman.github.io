import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { data } from "../../../data";

import BackLogo from "@assets/images/icon-back.svg";
import CategoryLogo from "@assets/images/pick_category.svg";

import "./index.scss";

function GameDisplay() {
  const catObjects = Object.keys(data.categories).map((name, index) => ({
    name,
    id: index,
  }));

  const [categories] = useState(catObjects);
  let [lifes, setLifes] = useState(5);
  const { id } = useParams();

  const category_name = catObjects.find((elem) => elem.id === Number(id))?.name;
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  const [selectedAlphabets, setSelectedAlphabets] = useState([]);
  /* tslint:disable-next-line */
  const options = data.categories[category_name];

  const randomOption =
    options[Math.floor(Math.random() * options.length)]?.name?.split("");

  const randomElement = randomOption.map((char: string) => ({
    char: char.toLowerCase(),
    guessed: false,
  }));

  const [words, setWords] = useState(randomElement);

  console.log({ randomOption });

  function onClick(char: string) {
    // both scenario
    if (selectedAlphabets.includes(char)) {
      return;
    }
    setSelectedAlphabets([...selectedAlphabets, char]);
    // good scenario
    if (words?.find((elem) => elem.char.toLowerCase() === char.toLowerCase())) {
      console.log("s");

      const test = words.map((elem) => {
        if (elem.char === char) {
          return {
            char,
            guessed: true,
          };
        } else return elem;
      });
      setWords(test);
    }
    // bad scenario
    else {
      setLifes(lifes - 1);
    }
    console.log({ selectedAlphabets });
  }
  // this.randomElement = test.map((char: string) => ({
  //   char: char.toLowerCase(),
  //   guessed: false,
  // }));
  // }

  const listItems = alphabet.map((char) => (
    <button
      onClick={() => onClick(char)}
      className="word__container"
      disabled={!!selectedAlphabets.includes(char)}
      key={char}
    >
      {char}
    </button>
  ));

  return (
    <div style={{ display: "flex" }}>
      <div style={{ color: "#fff", fontSize: 50 }}>{lifes} </div>
      <section className="alphabet__container"> {listItems}</section>
    </div>
  );
}

export default GameDisplay;

// <div *ngFor="let item of randomElement; let i = index">
//   <div *ngIf="item.char !== ' '" class="char__container">
//     {{ item.guessed ? item.char : "" }}
//   </div>

//   <div
//     *ngIf="item.char === ' '"
//     class="word__container"
//     style="background-color: transparent"
//   ></div>
// </div>