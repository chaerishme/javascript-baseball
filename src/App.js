import { Console, Random } from '@woowacourse/mission-utils';

class App {

    async play() {
        let isPlaying = true;
        Console.print("숫자 야구 게임을 시작합니다.");

        while (isPlaying) {
            const ANSWER = await this.getRandomNumbers();       //정답숫자3개 배열로 생성
            await this.playGame(ANSWER);                        //게임실행
            isPlaying = await this.askRestart();                //다시 게임 시작할지 여부 결정
        }
    }
  /* 정답숫자 생성함수, 숫자배열 리턴 */
    async getRandomNumbers() {
        let numbers = [0, 0, 0];    //크기 3으로 정함

        for(let i=0 ; i<3 ; i++){
            let num;
            num = Random.pickNumberInRange(1,9);
            if(!numbers.includes(num))    //중복되지 않는지 검사
                numbers[i]=num;
        }

        return numbers;
    }

  /* 게임시작함수,  리턴X */
    async playGame(answer){
        let isCorrect = false;

        /* 맞출 때 까지 반복*/
        while(!isCorrect){
        const INPUT = await Console.readLineAsync("숫자를 입력해주세요 : ");    // 숫자입력받기

        if (!/^[1-9]{3}$/.test(INPUT))
            throw new Error("[ERROR] 1~9 사이의 숫자 3개를 입력해야 합니다.");    // 예외처리 : 입력값 1~9 사이인지, 3자리 숫자인지

        const DIGITS = INPUT.split("");         //DIGITS배열에 입력배열 값들을 쪼개서 저장장
        const SET = new Set(DIGITS);

        if(SET.size!=DIGITS.length)
            throw new Error("[ERROR] 중복된 값이 없도록 입력해야 합니다.");       // 예외처리 : 입력값에 중복이 있는지

        const INPUT_NUMBERS = INPUT.split("").map(Number);
    
        const SCORE = this.contrastTwoNumbers(answer, INPUT_NUMBERS);       //두 배열 비교해서 스트라이크,볼 갯수 배열 저장

        isCorrect = await this.scorePrint(SCORE);       //점수 출력하고 정답 맞췄는지 저장
        }
    }

  /* 세자리 숫자 비교 함수, [스트라이크, 볼] 숫자배열 리턴 */
    contrastTwoNumbers(answer, inputNumbers){
        let strike=0, ball=0

        for(let i = 0; i<answer.length ; i++){
        if(answer[i]==inputNumbers[i])
            strike++;

        else if(answer.includes(inputNumbers[i]))
            ball++;
        }

        return [strike, ball];
    }

/* 점수 출력함수,  정답여부 리턴*/
    async scorePrint(score){
        let correct = false;
        let message = "";
        if(score[0]==3){
            message = "3스트라이크\n3개의 숫자를 모두 맞히셨습니다! 게임종료";
            correct = true;
        }

        else if(score[1] > 0 && score[0] ==0)
            message = `${score[1]}볼`;      //스트라이크 없고 볼만 있으면 볼만 출력
        
        else{
            if(score[0]>0)
                message += `${score[0]}스트라이크 `;
            if(score[1]>0)
                message += `${score[1]}볼`;     //스트라이크, 볼 있으면 둘 다 출력
        }

        if(score[0]==0&&score[1]==0)
            message = "낫싱";

        Console.print(message);
        return correct;
    }

  /* 게임 재시작 여부 묻는함수, 재시작 여부 리턴*/
    async askRestart(){
        const INPUT = await Console.readLineAsync("게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.");      //재시작여부 입력

        if(INPUT==1)
            return true;

        else if(INPUT==2)
            return false;

        else if (!/^[1-2]$/.test(INPUT))
            throw new Error("[ERROR] 1~2 사이의 숫자를 입력해야 합니다.");    // 예외처리 : 입력값이 1 또는 2인지
    }
}

export default App;
