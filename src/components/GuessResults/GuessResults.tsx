import {range} from "../../utils";

function GuessResults({guessesList}:{guessesList:string[]} ) {
  //Нужно сделать массив из 5 элементов. Каждый элемент - это строка.
  const matrix = [...guessesList];
  for (let i=0; i < 5 - guessesList.length; i++) {
    matrix.push('');
  }
  const emptyWordArray = range(0, 5).map(() => '');

  const getArrayFromWord = (word:string) => {
    const array = word.length === 0 ?
        emptyWordArray :
        word.split('');

    return array.map((letter, i) =>
        <span key={i} className="cell">{letter}</span>);
  }

  return (
      <div className="guess-results">
        {matrix.map((word, i) =>
            <p key={i} className="guess">
              { getArrayFromWord(word) }
            </p>)}
      </div>
  );
}

export default GuessResults;
