import { Console, Random } from '@woowacourse/mission-utils';

class App {
  async play() {
    console.log("게임 시작!");

    Console.print('숫자 야구 게임을 시작합니다.');
    let isPlaying = true;

    while (isPlaying) {
      const computerNumber = this.generateNumber();
      await this.playRound(computerNumber);
      isPlaying = await this.askRestart();
    }
  }

  generateNumber() {
    const numbers = [];
    while (numbers.length < 3) {
      const number = Random.pickNumberInRange(1, 9);
      if (!numbers.includes(number)) {
        numbers.push(number);
      }
    }
    return numbers.join('');
  }

  async playRound(computerNumber) {
    let isCorrect = false;
    while (!isCorrect) {
      const userInput = await this.getUserInput();
      if (!this.isValidInput(userInput)) {
        Console.print('잘못된 입력입니다. 1부터 9까지의 서로 다른 3자리 수를 입력해주세요.');
        continue;
      }
      const result = this.compareNumbers(computerNumber, userInput);
      Console.print(result);
      if (result === '3스트라이크') {
        Console.print('3개의 숫자를 모두 맞히셨습니다! 게임 종료');
        isCorrect = true;
      }
    }
  }

  async getUserInput() {
    const input = await Console.readLineAsync('숫자를 입력해주세요: ');
    if (!input) {
      throw new Error('[ERROR] 입력이 비어 있습니다.');
    }
    return input.trim();
  }

  isValidInput(input) {
    if (input.length !== 3) return false;
    if (!/^[1-9]{3}$/.test(input)) return false;
    const [a, b, c] = input;
    return a !== b && b !== c && a !== c;
  }

  compareNumbers(computer, user) {
    let strikes = 0;
    let balls = 0;
    for (let i = 0; i < 3; i++) {
      if (computer[i] === user[i]) {
        strikes++;
      } else if (computer.includes(user[i])) {
        balls++;
      }
    }
    if (strikes === 0 && balls === 0) return '낫싱';
    if (strikes === 3) return '3스트라이크';
    return `${balls ? `${balls}볼 ` : ''}${strikes ? `${strikes}스트라이크` : ''}`.trim();
  }

  async askRestart() {
    while (true) {
      const input = await Console.readLineAsync('게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요: ');
      if (input === '1') return true;
      if (input === '2') return false;
      Console.print('잘못된 입력입니다. 1 또는 2를 입력해주세요.');
    }
  }
}

export default App;