import { Console, Random } from '@woowacourse/mission-utils';

class App {
  async play() {
    const computer = [];
    Console.print("숫자 야구 게임을 시작합니다");
    this.random(computer);

    let gameOver = false;
    while (!gameOver) {
      Console.print("숫자를 입력해주세요 : ");
      const input = await Console.readLineAsync();
      Console.print(`${input}`);
      if (input.length !== 3) {
        throw new Error(" 숫자를 3개만 입력해야 합니다.");
      }

      const numbers = input.split('').map(Number);
      if ( (numbers[0]==numbers[1]) ||(numbers[1]==numbers[2]) || (numbers[0]==numbers[2])) {
        throw new Error("서로 다른 숫자를 입력해야 합니다");
      }
      const score = this.guess(computer, numbers);
      if (score == 3){
        Console.print("게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.");
        const choice = await Console.readLineAsync();
        Console.print(`${choice}`);
        if (choice == 1) {
          gameOver = false;
        } else if (choice == 2) {
          gameOver = true;
        } else {
          throw new Error("잘못 입력하셨습니다. 게임을 종료합니다.");
        }
      }
    }
  }

  random(computer) {
    while (computer.length < 3) {
      const number = Random.pickNumberInRange(1, 9);
      if (!computer.includes(number)) {
        computer.push(number);
      }
    }
  }

  guess(computer, numbers) {
    let strike = 0;
    let ball = 0;

    for (let i=0; i<3; i++) {
      if(computer[i] === numbers[i]) {
        strike++;
      } else if (computer.includes(numbers[i])) {
        ball++;
      }
    }
    if (strike === 0 && ball === 0) {
      Console.print("낫싱");
    } else if (strike === 3) {
      Console.print(`${strike}스트라이크`);
      Console.print("3개의 숫자를 모두 맞히셨습니다! 게임 종료");
    } else if (strike === 0 && ball != 0) {
      Console.print(`${ball}볼`);
    } else if (ball === 0 && strike != 0) {
      Console.print(`${strike}스트라이크`);
    } else {
      Console.print(`${ball}볼 ${strike}스트라이크`);
    }

    return strike;
  }
}

export default App;