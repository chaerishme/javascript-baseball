import { Console, Random } from '@woowacourse/mission-utils';

// 예외 처리할 때는 try catch 쓰지 말자..

class App {
  async play() {
    Console.print('숫자 야구 게임을 시작합니다.');
    let userNumber;
    
    // 반복
    while (true) {
      let win = false;
      // 컴퓨터 랜덤 숫자 생성
      const computer = [];
      while (computer.length < 3) {
        const number = Random.pickNumberInRange(1, 9);
        if (!computer.includes(number)) { // 중복 제거 위해
          computer.push(number);
        }
      }
      // 반복(win=true될때까지)
      while (!win) {
        // 유저 숫자 입력
        userNumber = await Console.readLineAsync('숫자를 입력해주세요: ');
        // 예외 처리
        if (!/^[1-9]{3}$/.test(userNumber)) { // 처음에는 || 로 일일이 했다가 정규표현식 사용
          throw new Error("[ERROR]");
        }
        userNumber = userNumber.split('').map((num) => parseInt(num));
        // 비교
        let strike=0, ball=0;
        for (let i=0;i<3;i++) {
          if (computer[i]==userNumber[i]) {
            strike++;
          }
          if (computer.includes(userNumber[i])) {
            ball++;
          }
        }
        ball -= strike; // ball 중복 제거
        // 메세지 출력
        if (strike==3) {
          Console.print(`${strike}스트라이크`);
          Console.print('3개의 숫자를 모두 맞히셨습니다! 게임 종료');
          win = true;
        } else if (strike>0 && ball>0) {
          Console.print(`${ball}볼 ${strike}스트라이크`);
        } else if (strike > 0) {
          Console.print(`${strike}스트라이크`);
        } else if (ball > 0) {
          Console.print(`${ball}볼`);
        } else {
          Console.print('낫싱');
        }
      }
      // 게임 재시작 여부
      Console.print('게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.')
      let userDecision = await Console.readLineAsync('');
      if (userDecision == 2) {break;}
      else if (userDecision != 1) {throw new Error("[ERROR]")} // 예외 처리
    }
  }
}

export default App;
