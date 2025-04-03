import * as MissionUtils from "@woowacourse/mission-utils";

class App {
  async play() {

    
    const getComputerNumber = () => {
      let computerNumbers = [];
      while (computerNumbers.length < 3) {
        const number = MissionUtils.Random.pickNumberInRange(1, 9);
        if (!computerNumbers.includes(number)) {
          computerNumbers.push(number);
        }
      }
      return computerNumbers.join(""); // 문자열 변환
    };

    const getPlayerNumbers = async () => {
      try {
        const answer = await MissionUtils.Console.readLineAsync(
          "숫자를 입력해주세요: "
        );
        if (answer.length !== 3 || !/^\d{3}$/.test(answer)) {
          throw new Error("[ERROR] 올바른 3자리 숫자를 입력하세요.");
        }
        return answer;
      } catch (error) {
        throw error;
      }
    };

    const startGame = async (computerNumbers) => {
      const playerNumbers = await getPlayerNumbers();

      if (computerNumbers === playerNumbers) {
        MissionUtils.Console.print(
          "3스트라이크 \n3개의 숫자를 모두 맞히셨습니다! 게임 종료"
        );
        return await askGameAgain();
      }

      const result = compareNumbers(computerNumbers, playerNumbers);
      MissionUtils.Console.print(result);
      await startGame(computerNumbers);
    };

    const compareNumbers = (computerNumbers, playerNumbers) => {
      let strike = 0;
      let ball = 0;

      for (let i = 0; i < 3; i++) {
        if (computerNumbers[i] === playerNumbers[i]) {
          strike++;
        } else if (computerNumbers.includes(playerNumbers[i])) {
          ball++;
        }
      }

      return printResult(strike, ball);
    };

    const printResult = (strike, ball) => {
      if (strike === 0 && ball === 0) return "낫싱";
      if (strike === 0) return `${ball}볼`;
      if (ball === 0) return `${strike}스트라이크`;
      return `${ball}볼 ${strike}스트라이크`;
    };

    const askGameAgain = async () => {
      try {
        const answer = await MissionUtils.Console.readLineAsync(
          "게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.\n"
        );
        if (answer === "1") {
          return await initialStartGame();
        }
        if (answer === "2") {
          MissionUtils.Console.print("게임 종료");
          return;
        }
        throw new Error("[ERROR] 1 또는 2만 입력하세요.");
      } catch (error) {
        MissionUtils.Console.print(error.message);
        return askGameAgain();
      }
    };


    const initialStartGame = async () => {
      const computerNumbers = getComputerNumber();
      await startGame(computerNumbers);
    };

    MissionUtils.Console.print("숫자 야구 게임을 시작합니다.");
    await initialStartGame();
  }
}

export default App;