import { Console, Random } from '@woowacourse/mission-utils';

class App {
    async play() {
        let isPlaying = true;   // 게임 제어할 변수

        Console.print("숫자 야구 게임을 시작합니다.\n");

        while (isPlaying) {
            const answer = this.generateNum();  // 정답 숫자 3개 생성
            await this.playGame(answer);  // 게임 실행하기. playGame은 async 함수
            isPlaying = await this.askRestart(); // 사용자 입력에 따라 실행/종료
        }
    }

    generateNum() {
        const num = [];
        while (num.length < 3) {    // 숫자 3개 될 때까지 숫자 뽑기
            const number = Random.pickNumberInRange(1, 9);
            if (!num.includes(number)) { // 중복되지 않는지 확인
                num.push(number);
            }
        }
        return num.join('');    // 컴퓨터가 생성한 배열을 문자열로 바꿔서 리턴
    }

    async playGame(answer) {
        let isCorrect = false;  // 사용자가 정답 맞췄는지 제어할 변수
        while (isCorrect == false) { // 정답 못 맞췄으면 계속 입력 받아서 돈다
            const input = await this.getUserInput();
            const result = this.compareNums(input, answer);
            Console.print(result);
            if (result == '3스트라이크') {
                Console.print('3개의 숫자를 모두 맞히셨습니다! 게임 종료')
                isCorrect = true;
            }
        }
    }

    async getUserInput() {
        const input = await Console.readLineAsync("숫자를 입력해주세요 : ");  // 사용자한테 숫자 입력 받기
        if (!input) {
            throw new Error("[ERROR] 입력이 비었습니다.");
        } else {    // 입력이 들어온 경우 조건에 맞는지 확인 -> 유효한 입력인지 확인하는 함수를 만들어도 괜찮
            const set = new Set(input); // set으로 바꿔서 중복 처리
            if (set.size != 3) {    // 숫자 3개를 입력하지 않은 경우
                throw new Error("[ERROR] 중복되지 않는 숫자 3개를 입력해야 합니다.");
            } else if (!/^[1-9]{3}$/.test(input)) {
                throw new Error("[ERROR] 1~9 사이의 숫자 3개를 입력해야 합니다.");
            } else {
                return input;
            }
        }
    }

    compareNums(input, answer) {
        let strike = 0;
        let ball = 0;

        for (let i = 0; i < 3; i++) {
            if (input[i] === answer[i]) strike ++;
            else if (answer.includes(input[i])) ball++;
        } 

        if (strike === 0 && ball === 0) return '낫싱';
        if (strike === 3) return '3스트라이크';
        return `${ball ? `${ball}볼 ` : ''}${strike ? `${strike}스트라이크` : ''}`.trim();
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