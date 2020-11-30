const Discord = require(`discord.js`);
const client = new Discord.Client();
const token = require(`./token.json`);

client.on(`message`, message => {
    let syntaxs = message.content.split(` `);
    let command = syntaxs.shift()
    if (command === `!팀섞`) {
        message.reply(assignRandomizedTeam(syntaxs));
    } else if (command === `!사용법`) {
        message.reply(manual)
    }
})

assignRandomizedTeam = syntaxs => {
    let result = ''
    let numberOfTeam = checkNumberOfTeam(syntaxs);
    if (syntaxs.length === 0) {
        return '\n게임 참가자가 없습니다!'
    }
    let hasKakdugi = checkHasKakdugi(syntaxs);
    let teams = makeTeam(numberOfTeam, syntaxs, hasKakdugi);
    for (let i = 0; i < numberOfTeam; i++) {
        let line = `\n${i + 1}팀 : `
        teams[i].forEach(mem => {
            line += mem + ', ';
        })
        result += line.slice(0, -2);
    }
    if (hasKakdugi) {
        let line = `\n깍두기 : `;
        teams.pop().forEach(mem => {
            line += mem + ', ';
        })
        result += line.slice(0, -2);
    }
    return result;
}

checkNumberOfTeam = syntaxs => {
    result = 2;
    if (!isNaN(+syntaxs[0])) {
        result = +syntaxs.shift();
    }
    return result;
}

checkHasKakdugi = syntaxs => {
    let result = true;
    let lastElem = syntaxs.pop()
    if (lastElem !== `*깍두기`) {
        syntaxs.push(lastElem);
        result = false;
    }
    return result;
}

makeTeam = (numberOfTeam, members, hasKakdugi) => {
    let result = [];
    let shuffledMembers = members.sort(() => {return Math.random() - Math.random()});
    let membersOfTeam = Math.floor(members.length / numberOfTeam);
    let index = 0;
    for (let i = 0; i < numberOfTeam; i++) {
        result.push(shuffledMembers.slice(index, index + membersOfTeam));
        index += membersOfTeam;
    }
    let residueCount = members.length - index;
    if (residueCount > 0) {
        let residueMembers = shuffledMembers.slice(index);
        assignResidueMembers(result, numberOfTeam, residueCount, residueMembers, hasKakdugi);
    }
    return result;
}

assignResidueMembers = (teams, numberOfTeam, residueCount, residueMembers, hasKakdugi) => {
    if (hasKakdugi) {
        teams.push(residueMembers);
    } else {
        teamIndexes = []
        while (teamIndexes.length < residueCount) {
            teamIndex = Math.floor(Math.random() * numberOfTeam);
            if (teamIndexes.indexOf(teamIndex) === -1) {
                teamIndexes.push(teamIndex);
            }
        }
        residueMembers.forEach((mem, idx) => {
            teams[teamIndexes[idx]].push(mem);
        });
    }
    return teams;
}

const manual = `
!팀섞 명령어를 입력한 후 대상 팀원 이름을 공백으로 구분하여 입력합니다.
ex : !팀섞 산림청 해수부 기상청 질병청

2개 이상의 팀으로 나누는 경우 !팀섞 다음 단어로 숫자를 입력합니다. (인원수가 팀 수로 나누어 떨어지지 않는 경우 남는 인원을 랜덤으로 배정)
ex : !팀섞 3 산림청 해수부 기상청 질병청

남는 인원을 깍두기로 만들어 수동 배정하거나 제외하고 싶은 경우 마지막 단어로 '*깍두기'를 입력합니다.
ex : !팀섞 3 산림청 해수부 기상청 질병청 *깍두기
`

client.login(token[`token`]);