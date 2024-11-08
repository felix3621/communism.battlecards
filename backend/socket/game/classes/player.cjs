const logger = require("../../../modules/logger.cjs");

const c_stone = require("./stone.cjs");
const utilFunc = require("../utilFunc.cjs");

class player {
    constructor(userName, match, playerType) {
        this.UserName = userName;
        this.PlayerType = playerType;
        this.DisplayName = null;
        this.Deck = null;
        this.Avatar = null;

        this.title = "";

        this.Hand = [];
        this.Field = [];
        this.Energy = 4;
        this.match = match;

        utilFunc.getPlayerInfo(userName,this, match);
    }
    UpdateStones() {
        for (let i = 0; i < this.Field.length; i++) {
            if (this.Field[i].Card.Attacker) {
                this.Field[i].Card.Attacker = false;
            }
            if (this.Field[i].Card.Attacked) {
                this.Field[i].Card.Attacked = false;
            }
            if (this.Field[i].Card.New) {
                this.Field[i].Card.New = null;
            }
            if (this.Field[i].Card.Health<=0 && this.Field[i].Card.Death) {
                this.Field.splice(i,1);
                i--;
            } else if (!this.Field[i].Card.Death && this.Field[i].Card.Health<=0) {
                this.Field[i].Card.Death = true;
            }
        }
        if (this.Avatar && this.Avatar.Card.Health<=0 && this.match.active) {
            this.match.SendInfo();
            if (Object.is(this.match.p1, this)) {
                this.match.EndGame(this.match.p1.UserName);
            } else {
                this.match.EndGame(this.match.p2.UserName);
            }
        }
        if (this.Avatar && this.Avatar.Card.Attacker) {
            this.Avatar.Card.Attacker = false;
        }
        if (this.Avatar && this.Avatar.Card.Attacked) {
            this.Avatar.Card.Attacked = false;
        }
    }
    UseCard(input) {
        if (Object.is(this.match.currentPlayer, this.PlayerType)) {
            let Enemy;
            if (Object.is(this.PlayerType, "p1")) {
                Enemy = this.match.p2;
            } else {
                Enemy = this.match.p1;
            }
            let SelectedCardIndex = input.SelectedCardIndex;
            if (this.Hand[SelectedCardIndex] && this.Hand[SelectedCardIndex].Cost <= this.Energy)
                if (Object.is(this.Hand[SelectedCardIndex].Type, "Projectile")) {
                    let SelectedTargetIndex = input.SelectedTargetIndex;
                    let TargetStone;
                    if (Object.is(input.EnemyType, "Avatar") && Object.is(Enemy.Field.length, 0)) {
                        TargetStone = Enemy.Avatar;
                    } else if (input.SelectedTargetIndex!=null) {
                        TargetStone = Enemy.Field[input.SelectedTargetIndex];
                    }
                    if (TargetStone) {
                        logger.debug(`'${this.match.code}': '${this.UserName}' used projectile '${this.Hand[SelectedCardIndex].Name}' on enemy's '${TargetStone.Card.Name}', dealing ${this.Hand[SelectedCardIndex].Attack} dmg, now at ${TargetStone.Card.Health - this.Hand[SelectedCardIndex].Attack} hp`, "socket/game/classes/player");

                        TargetStone.TakeDMG(this.Hand[SelectedCardIndex].Attack);

                        this.Energy -= this.Hand[SelectedCardIndex].Cost;
                        this.match.Projectiles.push({From:this.PlayerType,EnemyType:input.EnemyType,Texture:this.Hand[SelectedCardIndex].Texture,SelectedTargetIndex:SelectedTargetIndex});
                        this.Hand.splice(SelectedCardIndex,1);
                    }
                } else if (Object.is(this.Hand[SelectedCardIndex].Type, "Consumable")) {
                    logger.debug(`'${this.match.code}': '${this.UserName}' used a consumable: ${this.Hand[SelectedCardIndex].Name}`, "socket/game/classes/player")

                    if (this.Hand[SelectedCardIndex].DrawAmount && this.Hand[SelectedCardIndex].DrawAmount>0)
                        this.match.DrawCardsToPlayer(this,this.Hand[SelectedCardIndex].DrawAmount);
                    this.Energy -= this.Hand[SelectedCardIndex].Cost;
                    this.Hand.splice(SelectedCardIndex,1);
                }
        }
    }
    PlaceCard(input) {
        if (Object.is(this.match.currentPlayer, this.PlayerType)) {
            let SelectedIndex = input.SelectedIndex;
            let SelectedCardIndex = input.SelectedCardIndex;
            if (this.Hand[SelectedCardIndex] && this.Hand[SelectedCardIndex].Type && Object.is(this.Hand[SelectedCardIndex], "Projectile")) {
                return;
            }
            if (this.Hand[SelectedCardIndex] && this.Field.length<6 && this.Energy >= this.Hand[SelectedCardIndex].Cost) {
                logger.debug(`'${this.match.code}': '${this.UserName}' placed out '${this.Hand[SelectedCardIndex].Name}', atk: ${this.Hand[SelectedCardIndex].Attack}, hp: ${this.Hand[SelectedCardIndex].Health}`, "socket/game/classes/player");
                this.Field = [
                    ...this.Field.slice(0, SelectedIndex),
                    new c_stone.stone({...this.Hand[SelectedCardIndex], New: true}),
                    ...this.Field.slice(SelectedIndex)
                ];
                this.Energy -= this.Hand[SelectedCardIndex].Cost;
                this.Hand.splice(SelectedCardIndex,1);
            }
        }
    }
    SelectStoneTarget(input) {
        let Enemy;
        if (Object.is(this.PlayerType, "p1")) {
            Enemy = this.match.p2;
        } else {
            Enemy = this.match.p1;
        }
        if (Object.is(this.match.currentPlayer, this.PlayerType)) {
            let AttackingStone;
            let isAttackerAvatar = false;

            if (Object.is(input.Type, "Avatar")) {
                AttackingStone = this.Avatar;
                isAttackerAvatar = true;
            } else if (input.SelectedStoneIndex!=null) {
                AttackingStone = this.Field[input.SelectedStoneIndex];
            }
            if (Object.is(input.EnemyType, "Avatar") && Object.is(Enemy.Field.length, 0)) {
                logger.debug(`'${this.match.code}': '${this.UserName}' attacks opponents '${Enemy.Avatar.Card.Name}' (avatar) with their '${AttackingStone.Card.Name}'${isAttackerAvatar ? " avatar" : ""}, dealing ${AttackingStone.Card.Attack} dmg, now at ${Enemy.Avatar.Card.Health - AttackingStone.Card.Attack} hp`, "socket/game/classes/player");

                AttackingStone.AttackStone(null,null,Enemy.Avatar);
                if (Enemy.Avatar.Card.Health<=0) {
                    this.match.SendInfo();
                    if (Object.is(this.match.p1, this)) {
                        this.match.EndGame(this.match.p2.UserName);
                    } else {
                        this.match.EndGame(this.match.p1.UserName);
                    }
                }
            } else if (input.SelectedAttackIndex!=null && Enemy.Field[input.SelectedAttackIndex] != null && AttackingStone != null) {
                logger.debug(`'${this.match.code}': '${this.UserName}' attacks opponents '${Enemy.Field[input.SelectedAttackIndex].Card.Name}' with their '${AttackingStone.Card.Name}'${isAttackerAvatar ? " avatar" : ""}, dealing ${AttackingStone.Card.Attack} dmg, now at ${Enemy.Field[input.SelectedAttackIndex].Card.Health - AttackingStone.Card.Attack} hp`, "socket/game/classes/player");

                AttackingStone.AttackStone(input.SelectedAttackIndex,Enemy.Field);
            }
        }
    }
    EndTurn(Input) {
        if (Object.is(this.match.currentPlayer, this.PlayerType)) {
            this.match.EndTurn();
        }
    }
    Surrender(Input) {
        this.match.PlayerDisconnected(this.UserName);
    }
}

module.exports = {
    player
}