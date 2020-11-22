# 팀섞봇
팀섞을 위한 간단한 봇입니다. 음챗에 없는 사람도 함께 섞어주는 봇이 없길래 직접 만들었습니다.

## 명령어

**!사용법**

사용법과 함께 샘플 명령어 몇 개를 제공합니다.

**!팀섞**

배정할 인원 이름을 공백으로 구분하여 입력하면 자동으로 2개 팀에 배정합니다.  
ex : !팀섞 산림청 해수부 기상청 질병청

2개 이상의 팀으로 나누는 경우 !팀섞 다음 단어로 숫자를 입력합니다. (인원수가 팀 수로 나누어 떨어지지 않는 경우 남는 인원을 랜덤으로 배정)  
ex : !팀섞 3 산림청 해수부 기상청 질병청

남는 인원을 깍두기로 만들어 수동 배정하거나 제외하고 싶은 경우 마지막 단어로 '*깍두기'를 입력합니다.  
ex : !팀섞 3 산림청 해수부 기상청 질병청 *깍두기