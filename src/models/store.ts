import { makeAutoObservable } from "mobx";

export interface IUser {
    id: string
    name: string
}
export interface IPlayer {
    id: string
    name: string
    seat: number
    role?: ERole
    disqualification?: boolean
    enemiesWin?: boolean
}
export interface IMaster {
    id: string
    name: string
}
export enum ERole {
    civilian,
    sheriff,
    mafia,
    don
}
export enum EState {
    initial,
    startAndGettingRole,
    preparationContract,
    acquaintanceDon,
    acquaintanceSheriff,
    day,
    discussion,
    voting,
    night,
    shooting,
    wakeUpDon,
    wakeUpSheriff,
    finish
}

export enum EEvent {
    toStartAndGettingRole,
    toPreparationContract,
    toAcquaintanceDon,
    toAcquaintanceSheriff,
    toDay,
    toDiscussion,
    toVoting,
    toNight,
    toShooting,
    toWakeUpDon,
    toWakeUpSheriff,
    toFinish,
    toBack
}

export class Store {
    constructor() {
        makeAutoObservable(this)
    }

    games: Array<Game> = [new Game()]
    users: IUser[] = [
        { id: '13', name: 'Yo' },
        { id: '14', name: 'Max' },
        { id: '15', name: 'Ветер' },
        { id: '16', name: 'Mr_Krabs' },
        { id: '100', name: 'Омка' },
        { id: '101', name: 'Ирбис' },
        { id: '102', name: 'Diablo' },
        { id: '103', name: 'Анатолич' },
        { id: '104', name: 'Балерина' },
        { id: '105', name: 'Чизкейк' },
        { id: '106', name: 'Кибердемон' },
        { id: '107', name: 'Alonso' },
        { id: '108', name: 'Panter' },
        { id: '109', name: 'Asti' },
        { id: '110', name: 'Героин' },
        { id: '111', name: 'Vip13' },
    ];
}

export class Game {
    constructor() {
        makeAutoObservable(this)

        this.shuffle(this.freeSeats)
        this.shuffle(this.roles)
    }

    state: EState = 0

    id: string | null = null
    master: IMaster | null = null
    createDate: Date | null = null
    startDate: Date | null = null
    finishDate: Date | null = null
    comment: string | null = null
    players: IPlayer[] = []
    freeSeats: Array<number> = Array.from({ length: 10 }, (_, i) => i + 1)
    roles: Array<ERole> = [0, 0, 0, 0, 0, 0, 1, 2, 2, 3]
    showRole = Array.from({ length: 10 }).fill(false)
    isShowed = false

    shuffle(source: Array<any>) {
        for (let i = 1; i < source.length; ++i) {
            let j = Math.floor(Math.random() * (i + 1));
            [source[i], source[j]] = [source[j], source[i]];
        }
    }

    addPlayers(currentUsers: IUser[]) {
        const newPlayers: IPlayer[] = []
        this.players.forEach(player => {
            let currentUser = currentUsers.find(user => user.id === player.id)
            if (!currentUser && player.seat) {
                this.freeSeats.push(player.seat)
                this.shuffle(this.freeSeats)
            }
        })

        currentUsers.forEach(user => {
            let alredyAddPlayer = this.players.find(player => player.id === user.id)
            if (!!alredyAddPlayer) {
                newPlayers.push(alredyAddPlayer)
            } else {
                newPlayers.push({
                    id: user.id,
                    name: user.name,
                    seat: this.freeSeats[0]
                })
                this.freeSeats.splice(0, 1)
            }
        })

        this.players = newPlayers
    }

    start() {
        this.players.sort((a, b) => (a.seat ?? 0) - (b.seat ?? 0));
        for (let index = 0; index < this.players.length; index++) {
            this.players[index].role = this.roles[index]
        }
        this.state = EState.startAndGettingRole
    }

    showCurrentRole() {
        this.isShowed = true
    }

    showNextRole() {
        this.isShowed = false
        //this.showRole++
    }
}