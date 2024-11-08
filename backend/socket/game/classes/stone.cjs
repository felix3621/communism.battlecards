class stone {
    constructor(Card) {
        this.Card = Card;
        this.attackCooldown = 1;
    }
    TakeDMG(DMG) {
        this.Card.Health -= (Object.is(this.Card.Type,"Tank") ? DMG/2 : DMG);
    }
    AttackStone(StoneIndex, Field, Avatar=null) {
        this.attackCooldown++;
        this.Card.Attacker = true;
        if (Avatar) {
            Avatar.TakeDMG(this.Card.Attack);
            Avatar.Card.Attacked = true;
        } else {
            Field[StoneIndex].TakeDMG(this.Card.Attack);
            Field[StoneIndex].Card.Attacked = true;
        }
        if (Avatar == null && this.Card.AttackType && Object.is(this.Card.AttackType, "Burst")) {
            if (StoneIndex-1>=0) {
                Field[StoneIndex-1].TakeDMG(this.Card.Attack);
            }
            if (StoneIndex+1<Field.length) {
                Field[StoneIndex+1].TakeDMG(this.Card.Attack);
            }
        }
    }
}

module.exports = {
    stone
}