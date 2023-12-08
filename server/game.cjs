//The Game Class Player 1 is the player Class where the client is saved and the same whit player 2
class Game { 
    constructor(Player1, Player2, TurnTime, StarterEnergy) {
        this.Player1 = Player1;
        this.Player2 = Player2;
        this.TurnTime = TurnTime;
        this.MaxEnergy = StarterEnergy;
    }

    Update() {

    }
}

//The Card Class where the card info is saved
class Card {
    constructor(Name, Description, Cost, Attack, Health, Texture) {
        this.Name = Name;
        this.Description = Description;
        this.Cost = Cost;
        this.Attack = Attack;
        this.Health = Health;
        this.Texture = Texture;
    }
}

//The Stone Class where the stone info is saved
class Stone {
    constructor(Attack, Health, Texture) {
        this.Attack = Attack;
        this.Health = Health;
        this.Texture = Texture;
    }
}
//The Avatar Class
class Avatar {
    constructor(Attack, Health, Texture, AttackCost) {
        this.Attack = Attack;
        this.Health = Health;
        this.Texture = Texture;
        this.AttackCost = AttackCost;
    }
}

//Player Class
class Player {
    constructor(Client, PlayerName, PlayerAvatar, _Game) {
        this.Client = Client;
        this.PlayerName = PlayerName;
        this.PlayerAvatar = PlayerAvatar;
        this.Game = _Game;
        this.Energy = _Game.MaxEnergy;

        this.PlayerDeck = new Array();
        this.PlayerHand = new Array();
        this.PlayerOnField = new Array(); 
    }
    DrawCards(Amount) {
        var DrawableCards = new Array();
        for (let i = 0; i < this.PlayerDeck.length; i++) { // Get all cards from deck that has the same or les cost as MaxEnergy this turn
            if (this.PlayerDeck[i].Cost <= this.Game.MaxEnergy) {
                DrawableCards.push(this.PlayerDeck[i]);  
            }
        }
        for (let i = 0; i < Amount; i++) {
            this.PlayerHand.push(DrawableCards[Math.floor(Math.random() * DrawableCards.length)]); //Get a random Card in Drawable Cards
        }
        
    }
    StartTurn() {

    }

}